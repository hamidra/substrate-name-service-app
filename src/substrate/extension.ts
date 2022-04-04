import config from 'config';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import Keyring from '@polkadot/keyring';

export const getKeyring = () => {
  return new Keyring({ type: 'sr25519' });
};

///
// get test accounts if needed
export const getTestPairs = () => {
  const keyring = getKeyring();
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
export const loadBalances = async (api, addresses, keyringDispatch) => {
  for (let address of addresses) {
    const unsub = await api.query.system.account(
      address,
      ({ data: balance }) => {
        keyringDispatch({
          type: 'BALANCE_UPDATE',
          payload: { [address]: { balance, unsub } },
        });
      }
    );
  }
};

export const loadAccounts = (pairs, keyringDispatch) => {
  let accounts = {};
  pairs?.forEach((pair) => {
    if (pair?.address) {
      accounts[pair.address] = pair;
    }
  });
  // load accounts
  accounts &&
    keyringDispatch({ type: 'LOAD_ACCOUNTS', payload: { ...accounts } });
};

export const loadExtension = async (keyringDispatch) => {
  try {
    // load extension only once, when api and keyring-ui are ready
    const keyring = getKeyring();
    keyringDispatch({ type: 'LOAD_EXTENSION' });
    const injectedExt = await web3Enable(config.APP_NAME);
    console.log(injectedExt);
    if (injectedExt.length === 0) {
      // no extension installed, or the user did not accept the authorization
      // in this case we should inform the use and give a link to the extension
      keyringDispatch({ type: 'NO_EXTENSION' });
      return;
    }
    const extAccounts = await web3Accounts();

    console.log(extAccounts);
    const pairs = [];
    for (const account of extAccounts) {
      const injectedAcct = {
        address: account.address,
        meta: {
          ...account.meta,
          isInjected: true,
        },
        type: account.type,
      };
      const pair = keyring.addFromAddress(
        injectedAcct.address,
        injectedAcct.meta,
        null,
        injectedAcct.type
      );
      // load the balance for the new pair
      pairs.push(pair);
    }
    pairs && loadAccounts(pairs, keyringDispatch);
    keyringDispatch({ type: 'SET_EXTENSION' });
  } catch (e) {
    keyringDispatch({ type: 'EXTENSION_ERROR' });
  }
};
