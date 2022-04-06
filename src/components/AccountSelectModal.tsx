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
          <div>
            <i className="bi bi-box-arrow-right me-1" />
          </div>
          <div>Exit</div>
        </div>
        {accountList?.map((account) => (
          <div
            className={`p-2 border rounded m-2 ${getAccountBorder(account)}`}
            onClick={() => {
              keyringDispatch({
                type: 'CONNECT_ACCOUNT',
                payload: account?.address,
              });
              handleHide();
            }}
          >
            <AccountItem
              accountName={account?.meta?.name}
              accountAddress={account?.address}
              shortMode={true}
              size={40}
            />
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default AccountSelectModal;
