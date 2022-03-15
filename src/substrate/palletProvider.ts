import { blake2AsHex } from '@polkadot/util-crypto';
import { numberToU8a, stringToU8a } from '@polkadot/util';

export const getSaltU64 = () => {
  return Math.floor(Math.random() * 2 ** 64);
};

export const generateNameHash = (name: string, secret: number) => {
  const nameU8a: Uint8Array = stringToU8a(name);
  const secretU8a: Uint8Array = numberToU8a(secret);
  const saltedNameU8a: Uint8Array = new Uint8Array(
    nameU8a.length + secretU8a.length
  );
  saltedNameU8a.set(nameU8a);
  saltedNameU8a.set(secretU8a, nameU8a.length);
  const hash = blake2AsHex(saltedNameU8a);
  return hash;
};
