import { Row, Col } from 'react-bootstrap';
import CardHeader from 'components/CardHeader';
import { stringShorten } from '@polkadot/util';

const ADDR_PADDING_LEN = 5;

const RegConfirmCard = ({ regRequest, isProcessing, error }) => {
  const { name, registrant, controller, expiration, fee } = regRequest;
  const registrantStr = registrant
    ? stringShorten(registrant, ADDR_PADDING_LEN)
    : '';
  const controllerStr = controller
    ? stringShorten(controller, ADDR_PADDING_LEN)
    : '';
  const expireBlockStr = expiration ? `#${expiration}` : '';

  return (
    <>
      <CardHeader
        title={name}
        cardText="Please check the details below and confirm to register your domain."
      />
      <Row className="justify-content-center align-items-center my-4 mx-2">
        <Col className="px-0">
          <Row>
            <Col>
              <div className="mb-1">
                <b>Registrant</b>
              </div>
              <div>{registrantStr}</div>
            </Col>
            <Col>
              <div className="mb-1">
                <b>Controller</b>
              </div>
              <div>{controllerStr}</div>
            </Col>
          </Row>
          <div>
            <div className="mb-1">
              <b>Expiring</b>
            </div>
            <div>{expiration}</div>
          </div>
        </Col>
        <div className="border-top w-100 " />
        <Col className="px-0">
          <Row>
            <Col>Registration Fee</Col>
            <Col>
              <div>{fee?.reg}</div>
              <small className="text-muted">
                {`+ ${fee?.tx || ''} transaction fees`}
              </small>
            </Col>
          </Row>
          <Row></Row>
        </Col>
      </Row>
      <Row>
        <Col className="px-5 flex-column flex-md-row d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={(e) => {}}
            disabled={isProcessing}
          >
            {isProcessing && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Confirm
          </button>
        </Col>
        <div className="w-100 m-2" />
        <Col className="d-flex justify-content-end pe-3">
          <div className="text-danger">{error || ''}</div>
        </Col>
      </Row>
    </>
  );
};

export default RegConfirmCard;
