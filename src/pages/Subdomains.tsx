import { useParams } from 'react-router';
import { useNameRegistration } from './NamePage';
const SubdomainsCard = () => {
  let { name } = useParams();
  const { nameRegistration } = useNameRegistration();
  return (
    <>
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
    </>
  );
};

export default SubdomainsCard;
