import { Row, Col, Card } from 'react-bootstrap';
import { useState } from 'react';
import CardHeader from 'components/CardHeader';
import RegistrationLeasePeriod from './RegistrationLeasePeriod';

const RegRequestCard = ({
  name,
  initLeasetime,
  handleRegistration,
  isProcessing,
  error,
}) => {
  let [leaseTime, setLeaseTime] = useState(initLeasetime || 1); // in years
  return (
    <>
      <CardHeader
        title={name}
        cardText="The registration process includes two transactions. After the first transactions there is a waiting period, which ensures no other user has tried to register the same name."
      />
      <Row className="justify-content-center align-items-center my-4 mx-2">
        <Col className="px-0">
          <RegistrationLeasePeriod
            leaseTime={leaseTime}
            setLeaseTime={setLeaseTime}
          />
        </Col>
      </Row>
      <Row>
        <Col className="px-5 flex-column flex-md-row d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={(e) => handleRegistration()}
            disabled={isProcessing}
          >
            {isProcessing && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Register
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

export default RegRequestCard;
