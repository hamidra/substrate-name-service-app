// This component will simply add utility functions to your developer console.
import { useSubstrate } from './';
import * as util from '@polkadot/util';
import * as utilCrypto from '@polkadot/util-crypto';

export default function DeveloperConsole(props) {
  const { state: substrate, dispatch } = useSubstrate();
  if (substrate.apiState === 'READY') {
    window.api = substrate.api;
  }
  window.util = util;
  window.utilCrypto = utilCrypto;

  return null;
}
