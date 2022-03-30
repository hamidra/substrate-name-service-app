import { useParams } from 'react-router';
import { useNameRegistration } from 'layout/hooks';
import ExpirationTimeWithExtend from 'layout/containers/ExpirationTimeWithExtend';

const NameDetail = () => {
  const { name } = useParams();
  const { nameRegistration } = useNameRegistration();
  return (
    <>
      <form className="p-3">
        <div className="mb-3 row">
          <label className="col-md-3 col-form-label">Parent</label>
          <div className="col-md-9">
            <div>.dot</div>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-md-3 col-form-label">REGISTRANT</label>
          <div className="col-md-9 col-form-label">
            <div>
              {nameRegistration
                ? nameRegistration.registrant
                : `Not registered`}
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-md-3 col-form-label">CONTROLLER</label>
          <div className="col-md-9 col-form-label">
            <div>
              {nameRegistration ? nameRegistration.owner : `Not registered`}
            </div>
          </div>
        </div>
        <ExpirationTimeWithExtend name={name} />
      </form>
    </>
  );
};

export default NameDetail;
