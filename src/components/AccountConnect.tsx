import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { loadExtension } from 'substrate/extension';
import AccountItem from 'components/AccountItem';
import AccountSelectModal from 'components/AccountSelectModal';
import { useKeyring } from 'substrate/contexts/KeyringContext';

const ConnectButton = () => {
  return (
    <div className="d-flex align-items-center">
      <div>
        <Row className="flex-column flex-sm-row">
          <Col>
            <div>Connect</div>
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
      <div className="d-flex flex-row ">
        <div onClick={() => clickHandler()}>
          {connectedAccount ? (
            <AccountItem
              accountAddress={connectedAccount?.address}
              shortMode={true}
            />
          ) : (
            <ConnectButton />
          )}
        </div>
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
