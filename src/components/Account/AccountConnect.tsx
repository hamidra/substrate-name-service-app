import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSubstrate } from '../../substrate/SubstrateContext';
import { loadExtension } from '../../substrate/extension';
import AccountItem from './AccountItem';
import AccountSelectModal from './AccountSelectModal';

const ConnectButton = () => {
  return (
    <div className="d-flex align-items-center">
      <div>
        <Row className="flex-column flex-sm-row">
          <Col>
            <button className="btn btn-primary">Connect</button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const AccountConnect = () => {
  let [showModal, setShowModal] = useState(false);
  let { dispatch, ...state }: any = useSubstrate();
  let account = state?.connectedAccount;
  const clickHandler = async () => {
    //loadExtension(state, dispatch);
    setShowModal(true);
  };
  return (
    <>
      <div onClick={() => clickHandler()}>
        {account ? (
          <AccountItem accountAddress={account?.address} shortMode={true} />
        ) : (
          <ConnectButton />
        )}
      </div>
      <AccountSelectModal
        show={showModal}
        handleHide={() => {
          console.log('hide');
          setShowModal(false);
        }}
      />
    </>
  );
};

export default AccountConnect;
