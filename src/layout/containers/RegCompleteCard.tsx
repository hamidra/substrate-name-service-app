import { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import CardHeader from 'components/CardHeader';
import { siteMap } from 'layout/routes/NameServiceRoutes';
import GreenTick from 'images/green-tick.svg';
import { blockNumberToTimeDisplay } from 'substrate/utils';
import { useSubstrate } from 'layout/hooks';

const RegCompleteCard = () => {
  const { name } = useParams();
  const { api, chainInfo }: any = useSubstrate();
  let { blockTimeMs } = chainInfo || {};
  const navigate = useNavigate();
  const namePageMatch = useMatch(siteMap.NamePage.path);
  const [expirationTimeDisplay, setExpirationTimeDisplay] = useState('');

  const gotoMainPage = () => {
    navigate(siteMap.MainPage.path);
  };

  const gotoDetails = () => {
    // generate the path to details tab
    const detailsPath = `${namePageMatch.pathnameBase}/${siteMap.NamePage.Details.path}`;
    navigate(detailsPath);
  };

  return (
    <>
      <Card.Body className="d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-center my-3">
          <img
            src={GreenTick}
            alt="green tick"
            style={{ width: '100px', margin: 'auto' }}
          />
        </div>
        <CardHeader
          title={'Congratulations!'}
          cardText={['You successfully registered ', <b>{name}</b>]}
        />
        <Row>
          <Col className="px-5 flex-column flex-md-row d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={(e) => gotoMainPage()}
            >
              New Name
            </button>
          </Col>
          <Col className="px-5 flex-column flex-md-row d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={(e) => gotoDetails()}
            >
              See Details
            </button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
};

export default RegCompleteCard;
