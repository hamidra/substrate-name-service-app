import { Row, Col, Card } from 'react-bootstrap';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import CardHeader from 'components/CardHeader';
import { siteMap } from 'layout/routes/NameServiceRoutes';

const NotAvailableCard = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const namePageMatch = useMatch(siteMap.NamePage.path);

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
        <CardHeader
          title={'Not available'}
          cardText={[
            <b>{name}</b>,
            ' is not available. Try searching for a different domain.',
          ]}
        />
        <Row>
          <Col className="px-5 flex-column flex-md-row d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={(e) => gotoMainPage()}
            >
              Try Again
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

export default NotAvailableCard;
