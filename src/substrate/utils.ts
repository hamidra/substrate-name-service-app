import Keyring from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { web3FromSource } from '@polkadot/extension-dapp';

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

export const getSigningAccount = async (account) => {
  let pairOrAddress = account;
  let signer = null;
  if (account?.meta?.isInjected) {
    pairOrAddress = account.address;
    const injector = await web3FromSource(account.meta.source);
    signer = injector?.signer;
  }
  return { pairOrAddress, signer };
};
