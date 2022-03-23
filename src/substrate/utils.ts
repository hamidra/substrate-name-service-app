import Keyring from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { web3FromSource } from '@polkadot/extension-dapp';
import { BN } from 'bn.js';
import { bnMin } from '@polkadot/util';

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

///
//  ref implementation:
//  https://github.com/polkadot-js/apps/blob/7f0a05ca67bbcda7066892f51118a0db9b232b33/packages/react-hooks/src/useBlockInterval.ts#L14-L38
///
export const calcInterval = (api) => {
  // Some chains incorrectly use these, i.e. it is set to values such as 0 or even 2
  // Use a low minimum validity threshold to check these against
  const THRESHOLD = new BN(1000).divn(2);
  const DEFAULT_TIME = new BN(6_000);
  const A_DAY = new BN(24 * 60 * 60 * 1000);
  return bnMin(
    A_DAY,
    // Babe, e.g. Relay chains (Substrate defaults)
    api.consts.babe?.expectedBlockTime ||
      // POW, eg. Kulupu
      api.consts.difficulty?.targetBlockTime ||
      // Subspace
      api.consts.subspace?.expectedBlockTime ||
      // Check against threshold to determine value validity
      (api.consts.timestamp?.minimumPeriod.gte(THRESHOLD)
        ? // Default minimum period config
          api.consts.timestamp.minimumPeriod.muln(2)
        : api.query.parachainSystem
        ? // default guess for a parachain
          DEFAULT_TIME.muln(2)
        : // default guess for others
          DEFAULT_TIME)
  );
};
