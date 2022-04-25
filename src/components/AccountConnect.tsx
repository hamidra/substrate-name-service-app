import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { loadExtension } from 'substrate/extension';
import AccountItem from 'components/AccountItem';
import AccountSelectModal from 'components/AccountSelectModal';
import { useKeyring } from 'substrate/contexts/KeyringContext';

interface ConnectButtonProps {
  className?: string;
}
const ConnectButton = ({ className }: ConnectButtonProps) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center w-100 ${className}`}
    >
      <div>
        <Row className="flex-column flex-sm-row">
          <Col className="d-flex justify-content-center align-items-center">
            Connect
          </Col>
        </Row>
      </div>
    </div>
  );
};

const AccountConnect = () => {
  let [showModal, setShowModal] = useState(false);
  let { keyringDispatch, connectedAccount }: any = useKeyring();
  const clickHandler = async () => {
    loadExtension(keyringDispatch);
    setShowModal(true);
  };
  return (
    <>
      <div
        className="py-1 px-3 d-flex flex-row"
        onClick={() => clickHandler()}
        style={{ height: 48, fontWeight: 500 }}
      >
        {connectedAccount ? (
          <AccountItem
            accountAddress={connectedAccount?.address}
            shortMode={true}
            size={35}
          />
        ) : (
          <ConnectButton />
        )}
      </div>
      <AccountSelectModal
        show={showModal}
        handleHide={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default AccountConnect;
