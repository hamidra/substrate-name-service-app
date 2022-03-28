import React, { useReducer, useContext, useMemo, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import queryString from 'query-string';
import config from '../config';
import BN from 'bn.js';
import NameServiceProvider from './nsPalletProvider';
import keyring from '@polkadot/ui-keyring';
import { calcBlockTimeMs } from './utils';

const parsedQuery = queryString.parse(window.location.search);
const connectedSocket = parsedQuery.rpc || config.PROVIDER_SOCKET;
console.log(`Connected socket: ${connectedSocket}`);

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
  socket: connectedSocket,
  jsonrpc: {},
  types: config.types,
  api: null,
  apiError: null,
  apiState: null,
  chainInfo: null,
  nameServiceProvider: null,
  keyring: null,
  keyringState: null,
  extensionState: null,
  balances: null,
  connectedAccount: null,
};

///
// Reducer function for `useReducer`
const reducer = (state, action) => {
  switch (action.type) {
    case 'CONNECT_INIT':
      return { ...state, apiState: 'CONNECT_INIT' };
    case 'CONNECT':
      return { ...state, api: action.payload, apiState: 'CONNECTING' };
    case 'CONNECT_SUCCESS': {
      const chainInfo = action.payload;
      return {
        ...state,
        apiState: 'READY',
        chainInfo: chainInfo,
      };
    }
    case 'CONNECT_ERROR':
      return { ...state, apiState: 'ERROR', apiError: action.payload };
    case 'SET_NS_PALLET':
      return { ...state, nameServiceProvider: action.payload };
    case 'LOAD_KEYRING':
      return { ...state, keyringState: 'LOADING' };
    case 'SET_KEYRING':
      return { ...state, keyring: action.payload, keyringState: 'READY' };
    case 'KEYRING_ERROR':
      return { ...state, keyring: null, keyringState: 'ERROR' };
    case 'LOAD_EXTENSION':
      return { ...state, extensionState: 'LOADING' };
    case 'NO_EXTENSION':
      return { ...state, extensionState: 'NOT_AVAILABLE' };
    case 'EXTENSION_ERROR':
      return { ...state, extensionState: 'ERROR' };
    case 'SET_EXTENSION':
      return { ...state, extensionState: 'READY' };
    case 'BALANCE_UPDATE':
      const { address, balance } = action.payload;
      return { ...state, balances: { ...state?.balances, [address]: balance } };
    case 'CONNECT_ACCOUNT':
      const connectedAccount = action?.payload;
      return { ...state, connectedAccount };
    default:
      throw new Error(`Unknown type: ${action.type}`);
  }
};

///
// Connecting to the Substrate node
const connect = (state, dispatch) => {
  try {
    const { apiState, socket, jsonrpc, types } = state;

    // We only want this function to be performed once
    if (apiState) return;

    dispatch({ type: 'CONNECT_INIT' });

    const provider = new WsProvider(socket);
    const _api = new ApiPromise({ provider, types, rpc: jsonrpc });

    // Set listeners for disconnection and reconnection event.
    _api.on('connected', () => {
      dispatch({ type: 'CONNECT', payload: _api });
      // `ready` event is not emitted upon reconnection and is checked explicitly here.
      _api.isReady.then((_api) => queryChainInfo(_api, dispatch));
    });
    _api.on('ready', () => queryChainInfo(_api, dispatch));
    _api.on('error', (err) =>
      dispatch({ type: 'CONNECT_ERROR', payload: err })
    );
  } catch (err) {
    console.error(err);
    dispatch({ type: 'CONNECT_ERROR', payload: err });
  }
};

const queryChainInfo = async (api, dispatch) => {
  const chainInfo = {
    decimals: api.registry?.chainDecimals[0] || 12,
    token: (api.registry?.chainTokens[0] || 'DOT')?.toUpperCase(),
    genesisHash: api.genesisHash,
    ss58Format:
      api.registry?.chainSS58 || api.registry?.chainSS58 === 0
        ? api.registry?.chainSS58
        : 42,
    existentialDeposit:
      api.consts?.balances?.existentialDeposit || new BN(0, 10),
    chainName: await api.rpc.system.chain(),
    blockTimeMs: calcBlockTimeMs(api),
  };

  // ToDo: remove this when the pallet is deployed on polkadot
  // default substrate token to Dot for demo purpose
  if (chainInfo?.token === 'UNIT') {
    chainInfo.token = 'DOT';
  }
  console.log(chainInfo);
  dispatch({ type: 'CONNECT_SUCCESS', payload: chainInfo });
};

///
// Loading accounts from dev and polkadot-js extension
let accountsLoaded = false;
const loadKeyring = (state, dispatch) => {
  const asyncLoadAccounts = async () => {
    dispatch({ type: 'LOAD_KEYRING' });
    try {
      keyring.loadAll({
        genesisHash: state.chainInfo?.genesisHash,
        isDevelopment: config.DEVELOPMENT_KEYRING,
        ss58Format: state.chainInfo?.ss58Format,
      });

      dispatch({ type: 'SET_KEYRING', payload: keyring });
    } catch (e) {
      console.error(e);
      dispatch({ type: 'KEYRING_ERROR' });
    }
  };
  const { keyringState } = state;
  // If `keyringState` is not null `asyncLoadAccounts` is running.
  if (keyringState) return;
  // If `accountsLoaded` is true, the `asyncLoadAccounts` has been run once.
  if (accountsLoaded)
    return dispatch({ type: 'SET_KEYRING', payload: keyring });

  // This is the heavy duty work
  accountsLoaded = true;
  asyncLoadAccounts();
};

///
// Load balances
let balancesLoaded = false;
const loadBalances = (state, dispatch) => {
  // balances should only be loaded once, and then updates are happened through subscription
  if (!balancesLoaded) {
    balancesLoaded = true;
    // get the balance for all addresses in keyring:
    state.keyring.getAccounts().forEach(({ address }) => {
      state.api.query.system.account(address, ({ data: balance }) => {
        dispatch({ type: 'BALANCE_UPDATE', payload: { address, balance } });
      });
    });
  }
};

const SubstrateContext = React.createContext({});

const SubstrateContextProvider = (props) => {
  // filtering props and merge with default param value
  const initState = { ...INIT_STATE };
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    if (state.apiState === 'READY') {
      // load pallet
      let nameServiceProvider = new NameServiceProvider(state.api);
      nameServiceProvider?.initialize();
      dispatch({ type: 'SET_NS_PALLET', payload: nameServiceProvider });
    }
  }, [state?.apiState, state?.api]);

  connect(state, dispatch);

  // load accounts when api is ready
  if (state.apiState === 'READY') {
    loadKeyring(state, dispatch);
  }

  if (state.apiState === 'READY' && state.keyringState === 'READY') {
    loadBalances(state, dispatch);
  }
  console.log(state);

  const contextValue = { ...state, dispatch };
  return (
    <SubstrateContext.Provider value={contextValue}>
      {props.children}
    </SubstrateContext.Provider>
  );
};

const useSubstrate = () => ({ ...useContext(SubstrateContext) });

export { SubstrateContextProvider, useSubstrate };
