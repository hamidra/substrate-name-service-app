import CardHeader from 'components/CardHeader';
import { Row, Col } from 'react-bootstrap';
import CountdownTimer from 'components/CountdownTimer';
const RegWaitCard = ({ name, waitPeriod, passedPeriod }) => {
  return (
    <>
      <CardHeader
        title={name}
        cardText="Let’s make sure no one else is trying to register the same domain name at this point in time."
      />
      <Row className="justify-content-center align-items-center my-4 mx-2">
        <Col className="px-0">
          <CountdownTimer
            seconds={waitPeriod}
            passed={passedPeriod}
            size={200}
            strokeBgColor="grey"
            strokeColor="red"
            strokeWidth={12}
          />
        </Col>
      </Row>
    </>
  );
};

export default RegWaitCard;
