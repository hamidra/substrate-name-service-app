import Keyring from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { web3FromSource } from '@polkadot/extension-dapp';
import { BN } from 'bn.js';
import { bnMin } from '@polkadot/util';
import { timeStamp } from 'console';

/**
 * trims the specified character from the end of the string.
 * @param str the input string to be trimmed
 * @param char the character that is going to be trimmed
 * @returns the final trimmed string by removing all occurances of the char from the end of input string
 */
const trimEnd = (str, char) => {
  if (!str) {
    return str;
  }
  let i = str.length;
  while (i > 0 && str.charAt(i - 1) === char) {
    i -= 1;
  }
  return str.substring(0, i);
};

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
export const calcBlockTimeMs = (api): number => {
  // Some chains incorrectly use these, i.e. it is set to values such as 0 or even 2
  // Use a low minimum validity threshold to check these against
  const THRESHOLD = new BN(1000).divn(2);
  const DEFAULT_TIME = new BN(6_000);
  const A_DAY = new BN(24 * 60 * 60 * 1000);
  const blockTimeBN = bnMin(
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
  return blockTimeBN.toNumber();
};

export const blockCountToTimespanMs = (
  blockTimeMs: number,
  blockCount: number
): number => {
  return blockTimeMs * blockCount;
};

export const timestampMsToBlockCount = (
  timestampMs: number,
  blockTimeMs: number
): number => {
  return Math.floor(timestampMs / blockTimeMs);
};

export const getBlockTimestampMs = (
  currentBlock: { number: number; timestamp: number },
  blockNumber: number,
  blockTimeMs: number
): number => {
  let blockCount = blockNumber - currentBlock.number;
  return currentBlock.timestamp + blockCount * blockTimeMs;
};

/**
 * convert a value from chain unit to a base 10 decimal number
 * @param {*} value the value in chain unit (in string or BN)
 * @param {*} chainDecimal chain token decimals
 * @param {*} decimalPoints number of digits to keep after decimal points
 * @returns  the value in base 10 decimal format in string
 */
export const fromChainUnit = (value, chainDecimal, decimalPoints) => {
  if ((!value && value != 0) || !chainDecimal) {
    return null;
  }
  chainDecimal = parseInt(chainDecimal);
  value = new BN(value);
  const B10 = new BN(10);
  const BChainUnit = B10.pow(new BN(chainDecimal));
  const dm = value.divmod(BChainUnit);
  const wholeStr = dm.div.toString();
  let decimalStr = dm.mod.toString().padStart(chainDecimal, '0');
  if (decimalPoints || decimalPoints === 0) {
    decimalStr = decimalStr?.slice(0, decimalPoints);
  }
  decimalStr = trimEnd(decimalStr, '0');
  let result = wholeStr;

  if (decimalStr) {
    result += `.${decimalStr}`;
  }
  return result;
};

export const toChainUnit = (value, chainDecimal) => {
  if ((!value && value != 0) || !chainDecimal) {
    return null;
  }
  value = value.toString();
  chainDecimal = parseInt(chainDecimal);
  const B10 = new BN(10);
  let [wholeVal, decimalVal] = value.split('.');
  decimalVal = decimalVal && decimalVal.substr(0, chainDecimal);
  const decimalValLen = decimalVal?.length || 0;
  const BWholeVal = new BN(wholeVal);
  const BDecimalVal = new BN(decimalVal || 0);

  const BChainWholeVal = BWholeVal.mul(B10.pow(new BN(chainDecimal)));
  const BChainDecimalVal = BDecimalVal.mul(
    B10.pow(new BN(chainDecimal - decimalValLen))
  );
  return BChainWholeVal.add(BChainDecimalVal);
};
