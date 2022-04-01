import React, { useContext, useReducer, useEffect } from 'react';
import config from 'config';
import BN from 'bn.js';
import Keyring from '@polkadot/keyring';
import { useSubstrate } from './SubstrateContext';

const getStoredAccount = () => {
  try {
    const account = JSON.parse(localStorage.getItem('connectedAccount'));
    return account;
  } catch (err) {
    console.log(err);
  }
};
const setStoredAccount = (account) => {
  localStorage.setItem('connectedAccount', JSON.stringify(account));
};

///
// Initial state for `useReducer`
const INIT_STATE = {
  extensionState: null,
  accounts: {},
  balances: {},
  connectedAccount: null,
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
      const connectedAccount = action?.payload;
      return { ...state, connectedAccount };
    default:
      throw new Error(`Unknown type: ${action.type}`);
  }
};

///
// get test accounts if needed
const getTestPairs = () => {
  const keyring = new Keyring({ type: 'sr25519' });
  const testUris: Array<{ name: string; uri: string }> = [
    { name: 'alice', uri: '//Alice' },
    { name: 'bob', uri: '//Bob' },
    { name: 'charlie', uri: '//Charlie' },
    { name: 'dave', uri: '//Dave' },
    { name: 'eve', uri: '//Eve' },
    { name: 'fredie', uri: '//Fredie' },
  ];
  const testPairs = testUris.map((uri) =>
    keyring.createFromUri(uri.uri, { isTest: true, name: uri.name })
  );
  return testPairs;
};

///
// Load balances
const loadBalances = (api, addresses, dispatch) => {
  addresses?.forEach((address) => {
    api.query.system.account(address, ({ data: balance }) => {
      dispatch({ type: 'BALANCE_UPDATE', payload: { [address]: balance } });
    });
  });
};

const loadAccounts = (pairs, dispatch) => {
  let accounts = {};
  pairs?.forEach((pair) => {
    if (pair?.address) {
      accounts[pair.address] = pair;
    }
  });
  // load accounts
  accounts && dispatch({ type: 'LOAD_ACCOUNTS', payload: { ...accounts } });
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

  console.log(keyringState);

  const contextValue = { ...keyringState, keyringDispatch };
  return (
    <KeyringContext.Provider value={contextValue}>
      {props.children}
    </KeyringContext.Provider>
  );
};

const useKeyring = () => ({ ...useContext(KeyringContext) });
export { KeyringContextProvider, KeyringContext, useKeyring };
