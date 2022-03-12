import React, { useReducer, useContext, useMemo, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import BN from 'bn.js';

///
// Initial state for `useReducer`
const INIT_STATE = {
  socket: 'wss://rpc.polkadot.io',
  jsonrpc: {},
  types: {},
  api: null,
  apiError: null,
  apiState: null,
  chainInfo: null,
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
      _api.isReady.then((_api) => queryChainInfo(_api, state, dispatch));
    });
    _api.on('ready', () => queryChainInfo(_api, state, dispatch));
    _api.on('error', (err) =>
      dispatch({ type: 'CONNECT_ERROR', payload: err })
    );
  } catch (err) {
    console.error(err);
    dispatch({ type: 'CONNECT_ERROR', payload: err });
  }
};

const queryChainInfo = async (api, state, dispatch) => {
  const chainInfo = {
    decimals: api.registry?.chainDecimals[0] || 12,
    token: (api.registry?.chainTokens[0] || 'DOT')?.toUpperCase(),
    genesisHash: api.genesisHash,
    ss58Format:
      api.registry?.chainSS58 || api.registry?.chainSS58 == 0
        ? api.registry?.chainSS58
        : 42,
    existentialDeposit:
      api.consts?.balances?.existentialDeposit || new BN(0, 10),
    chainName: await api.rpc.system.chain(),
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

const SubstrateContext = React.createContext({});

const SubstrateContextProvider = (props) => {
  // filtering props and merge with default param value
  const initState = { ...INIT_STATE };
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    connect(state, dispatch);
  }, [connect]);

  const contextValue = { state, dispatch };
  return (
    <SubstrateContext.Provider value={contextValue}>
      {props.children}
    </SubstrateContext.Provider>
  );
};

const useSubstrate = () => ({ ...useContext(SubstrateContext) });

export { SubstrateContextProvider, useSubstrate };
