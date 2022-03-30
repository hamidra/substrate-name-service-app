import { useContext } from 'react';
import { SubstrateContext } from 'substrate/SubstrateContext';

export { useNameRegistration } from 'layout/NamePage';
export const useSubstrate = () => ({ ...useContext(SubstrateContext) });
