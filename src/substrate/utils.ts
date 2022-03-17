import Keyring from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

export const get32BitSalt = () => {
  return Math.floor(Math.random() * 2 ** 32);
};

export const getAccountAddress = (account) => {
  const { pairOrAddress } = account || {};
  if (typeof pairOrAddress === 'string' || pairOrAddress instanceof String) {
    // the stored value is an address
    return pairOrAddress;
  } else {
    // the stored value is an account
    return pairOrAddress?.address;
  }
};

export const getAlice = async () => {
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
  const alicePair = keyring.addFromUri('//Alice');
  return { pairOrAddress: alicePair };
};
