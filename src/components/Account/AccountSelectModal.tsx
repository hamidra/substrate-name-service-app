import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSubstrate } from '../../substrate/SubstrateContext';
import { loadExtension } from '../../substrate/extension';
import AccountItem from './AccountItem';
const AccountSelectModal = ({ show, handleHide }) => {
  const { keyring, balances, connectedAccount, dispatch }: any = useSubstrate();
  const accounts = keyring?.getPairs();
  const logout = () => {
    dispatch({ type: 'CONNECT_ACCOUNT', payload: null });
  };
  const getAccountBorder = (account) =>
    account?.address === connectedAccount?.address
      ? `border-primary`
      : `border-light`;
  return (
    <Modal show={show} onHide={() => handleHide()} backdrop={true}>
      <Modal.Body>
        <div
          className="p-3 d-flex justify-content-end"
          onClick={() => {
            logout();
            handleHide();
          }}
        >
          <i className="bi bi-box-arrow-right" /> Exit
        </div>
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
