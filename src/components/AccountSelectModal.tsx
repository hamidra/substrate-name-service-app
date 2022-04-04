import { Modal } from 'react-bootstrap';
import AccountItem from 'components/AccountItem';
import { useKeyring } from 'substrate/contexts/KeyringContext';

const AccountSelectModal = ({ show, handleHide }) => {
  const { keyringDispatch, connectedAccount, accounts }: any = useKeyring();
  const accountList = accounts ? Object.values<any>(accounts) : [];
  const logout = () => {
    keyringDispatch({ type: 'CONNECT_ACCOUNT', payload: null });
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
        {accountList?.map((account) => (
          <div
            className={`p-2 border ${getAccountBorder(account)}`}
            onClick={() => {
              keyringDispatch({ type: 'CONNECT_ACCOUNT', payload: account });
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
