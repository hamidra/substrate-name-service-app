import { useParams } from 'react-router';
import { useNameRegistration } from 'layout/hooks';
import { Card } from 'react-bootstrap';
import CardHeader from 'components/CardHeader';
const Subdomains = () => {
  let { name } = useParams();
  const { nameRegistration } = useNameRegistration();
  return (
    <>
      <Card
        style={{ width: '100%', maxWidth: '1000px', minHeight: 540 }}
        className="shadow"
      >
        <Card.Body className="d-flex flex-column">
          <CardHeader title={name} />
          <form>
            <div className="row p-5">
              <div className="col-12 d-flex justify-content-center pe-3">
                <p>{`${name} has no subdomains`}</p>
              </div>
              <div className="col-12 d-flex justify-content-center pe-3">
                <button className="btn btn-outline-primary" type="button">
                  Add subdomains
                </button>
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Subdomains;
