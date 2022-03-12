// This component will simply add utility functions to your developer console.
import { useSubstrate } from './';

export default function DeveloperConsole(props) {
  const { state: substrate, dispatch } = useSubstrate();
  if (substrate.apiState === 'READY') {
    window.api = substrate.api;
  }
  window.util = require('@polkadot/util');
  window.utilCrypto = require('@polkadot/util-crypto');

  return null;
}
