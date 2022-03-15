import { blake2AsHex } from '@polkadot/util-crypto';

export const generateNameHash = (name: string, secret: Number) => {
  const hash = blake2AsHex(name);
  console.log(hash);
};
