import { blake2AsHex } from '@polkadot/util-crypto';
import { numberToU8a, stringToU8a } from '@polkadot/util';
import Keyring from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

export const get32BitSalt = () => {
  return Math.floor(Math.random() * 2 ** 32);
};

export const generateCommitHash = (name: string, secret: number) => {
  const nameU8a: Uint8Array = stringToU8a(name);
  const secretU8a: Uint8Array = numberToU8a(secret);
  const saltedNameU8a: Uint8Array = new Uint8Array(
    nameU8a.length + secretU8a.length
  );
  console.log(secretU8a.forEach((b) => console.log(b.toString(16))));
  console.log(secret);
  console.log(secret.toString(16));
  saltedNameU8a.set(nameU8a);
  saltedNameU8a.set(secretU8a, nameU8a.length);
  console.log(saltedNameU8a);
  const hash = blake2AsHex(saltedNameU8a);
  return hash;
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
  return { addressOrPair: alicePair };
};
