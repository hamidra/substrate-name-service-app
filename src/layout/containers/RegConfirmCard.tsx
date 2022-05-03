import { Row, Col, Card } from 'react-bootstrap';
import CardHeader from 'components/CardHeader';
import { stringShorten } from '@polkadot/util';

const ADDR_PADDING_LEN = 5;

const RegConfirmCard = ({
  regRequest,
  handleConfirmation,
  isProcessing,
  error,
}) => {
  const { name, owner, controller, leasePeriod, fee } = regRequest;
  const ownertStr = owner ? stringShorten(owner, ADDR_PADDING_LEN) : 'N/A';
  const controllerStr = controller
    ? stringShorten(controller, ADDR_PADDING_LEN)
    : 'N/A';
  const leaseUnitStr =
    leasePeriod?.years && leasePeriod?.years > 1 ? 'years' : 'year';
  const leasePeriodYearsStr = leasePeriod?.years
    ? `~ ${leasePeriod?.years} ${leaseUnitStr}`
    : 'N/A';
  const leasePeriodBlocksStr = leasePeriod?.blocks
    ? `Equals registration period of ${leasePeriod?.blocks} blocks`
    : '';

  return (
    <>
      <CardHeader
        title={name}
        cardText="Please check the details below and confirm to register your domain."
      />
      <div className="container border rounded p-4">
        <Row className="justify-content-center align-items-center">
          <Col>
            <Row className="mb-2">
              <Col>
                <div className="mb-1">
                  <b>Owner</b>
                </div>
                <div>{ownertStr}</div>
              </Col>
              <Col>
                <div className="mb-1">
                  <b>Controller</b>
                </div>
                <div>{controllerStr}</div>
              </Col>
            </Row>
            <div>
              <div className="mt-3">
                <b>Registration Period</b>
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-between">
                <div>{leasePeriodYearsStr} </div>
                <div className="form-text">{leasePeriodBlocksStr}</div>
              </div>
            </div>
          </Col>
          <div className="border-top w-100 my-3" />
          <Col>
            <Row>
              <Col>
                <b>Registration Fee</b>
              </Col>
              <Col>
                <div>{fee?.reg}</div>
                <small className="text-muted">
                  {`+ ${fee?.tx || ''} transaction fees`}
                </small>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="flex-grow-1" />
      <Row className="mt-3">
        <Col className="px-5 flex-column flex-md-row d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              handleConfirmation();
            }}
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
