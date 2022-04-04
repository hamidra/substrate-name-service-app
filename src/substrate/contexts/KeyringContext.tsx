import { balances } from '@polkadot/types/interfaces/definitions';
import { connect } from 'http2';
import React, { useContext, useReducer, useEffect } from 'react';
import { useSubstrate } from 'substrate/contexts/SubstrateContext';
import { getTestPairs, loadBalances, loadAccounts } from 'substrate/extension';

const getStoredAccountAddr = () => {
  try {
    const account = JSON.parse(localStorage.getItem('connectedAccount'));
    return account;
  } catch (err) {
    console.log(err);
  }
};
const setStoredAccountAddr = (account) => {
  localStorage.setItem('connectedAccount', JSON.stringify(account));
};

///
// Initial state for `useReducer`
const INIT_STATE = {
  extensionState: null,
  accounts: {},
  balances: {},
  connectedAddress: getStoredAccountAddr(),
};

///
// Reducer function for `useReducer`
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_EXTENSION':
      return { ...state, extensionState: 'LOADING' };
    case 'SET_EXTENSION':
      return { ...state, extensionState: 'READY' };
    case 'NO_EXTENSION':
      return { ...state, extensionState: 'NOT_AVAILABLE' };
    case 'EXTENSION_ERROR':
      return { ...state, extensionState: 'ERROR' };
    case 'LOAD_ACCOUNTS':
      let accounts = action.payload;
      return { ...state, accounts: { ...state?.accounts, ...accounts } };
    case 'BALANCE_UPDATE':
      const balance = action.payload;
      return { ...state, balances: { ...state?.balances, ...balance } };
    case 'CONNECT_ACCOUNT':
      const connectedAddress = action?.payload;
      setStoredAccountAddr(connectedAddress);
      return { ...state, connectedAddress };
    default:
      throw new Error(`Unknown type: ${action.type}`);
  }
};

const KeyringContext = React.createContext({});

const KeyringContextProvider = (props) => {
  // filtering props and merge with default param value
  const initState = { ...INIT_STATE };
  const [keyringState, keyringDispatch] = useReducer(reducer, initState);
  const { api, apiState }: any = useSubstrate();

  useEffect(() => {
    if (apiState === 'READY') {
      let testPairs = getTestPairs();
      loadAccounts(testPairs, keyringDispatch);
    }
  }, [apiState]);

  useEffect(() => {
    // load balances for new accounts
    if (keyringState?.accounts) {
      let addresses = Object.keys(keyringState?.accounts);
      addresses = addresses.filter(
        (address) => !(address in keyringState?.balances)
      );
      console.log('balances', addresses);
      loadBalances(api, addresses, keyringDispatch);
    }
  }, [keyringState?.accounts]);

  useEffect(() => {
    return () => {
      // unsubscribe all balance subscriptions
      const balanceList = keyringState?.balances
        ? Object.values<any>(keyringState?.balances)
        : [];
      balanceList?.forEach((balance) => {
        console.log('unsub');
        balance?.unsub && balance?.unsub();
      });
    };
  }, []);
  console.log(keyringState);
  const { accounts, connectedAddress } = keyringState || {};
  const connectedAccount =
    accounts && connectedAddress ? accounts[connectedAddress] : null;
  const contextValue = { ...keyringState, connectedAccount, keyringDispatch };
  return (
    <KeyringContext.Provider value={contextValue}>
      {props.children}
    </KeyringContext.Provider>
  );
};

const useKeyring = () => ({ ...useContext(KeyringContext) });
export { KeyringContextProvider, KeyringContext, useKeyring };
