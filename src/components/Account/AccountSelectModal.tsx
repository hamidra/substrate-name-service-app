import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSubstrate } from '../../substrate/SubstrateContext';
import { loadExtension } from '../../substrate/extension';
import AccountItem from './AccountItem';
const AccountSelectModal = ({ show, handleHide }) => {
  const { keyring, balances, connectedAccount, dispatch }: any = useSubstrate();
  const accounts = keyring?.getAccounts();
  const getAccountBorder = (account) =>
    account?.address === connectedAccount?.address
      ? `border-primary`
      : `border-light`;
  return (
    <Modal show={show} onHide={() => handleHide()} backdrop={true}>
      <Modal.Body>
        {accounts?.map((account) => (
          <div
            className={`p-2 border ${getAccountBorder(account)}`}
            onClick={() => {
              dispatch({ type: 'CONNECT_ACCOUNT', payload: account });
              handleHide();
            }}
          >
            <AccountItem
              accountName={account?.meta?.name}
              accountAddress={account?.address}
              shortMode={true}
            />
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default AccountSelectModal;
