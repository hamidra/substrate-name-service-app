import { useParams } from 'react-router';
import { useNameRegistration } from './NamePage';

const NameDetailsCard = () => {
  const { name } = useParams();
  const { nameRegistration } = useNameRegistration();
  return (
    <>
      <form className="p-3">
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label">Parent</label>
          <div className="col-sm-8">
            <div>.dot</div>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label">REGISTRANT</label>
          <div className="col-sm-8">
            <div>
              {nameRegistration
                ? nameRegistration.registrant
                : `Not registered`}
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label">CONTROLLER</label>
          <div className="col-sm-8">
            <div>
              {nameRegistration ? nameRegistration.owner : `Not registered`}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default NameDetailsCard;
