// This component will simply add utility functions to your developer console.
import { useSubstrate } from 'layout/hooks';
import * as util from '@polkadot/util';
import * as utilCrypto from '@polkadot/util-crypto';

export default function DeveloperConsole(props) {
  const { api, apiState, keyring, keyringState } = useSubstrate();
  if (apiState === 'READY') {
    window.api = api;
  }
  if (keyringState === 'READY') {
    window.keyring = keyring;
  }

  return null;
}
