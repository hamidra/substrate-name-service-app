import { useState } from 'react';
import { useParams } from 'react-router';
import { useNameRegistration } from './NamePage';
import { RegistrationLeasePeriod } from './Registration';
import { useSubstrate } from '../substrate/SubstrateContext';
import { getSigningAccount } from '../substrate/utils';
import BN from 'bn.js';

const ExpirationTimeWithExtend = ({ name, nameRegistration }) => {
  let [leasePeriod, setLeasePeriod] = useState(new BN(1));
  let [editMode, setEditMode] = useState(false);
  let { nameServiceProvider, connectedAccount }: any = useSubstrate();

  let cancelClickHandler = () => {
    setEditMode(false);
  };
  let extendClickHandler = async () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      nameExtensionHandler().then(() => {
        setEditMode(false);
      });
    }
  };

  let nameExtensionHandler = async () => {
    let connectedSigningAccount = await getSigningAccount(connectedAccount);
    return nameServiceProvider.renew(
      connectedSigningAccount,
      name,
      leasePeriod
    );
  };
  return (
    <>
      <div className="mb-3 row">
        <label className="col-sm-4 col-form-label">Expirtion Block</label>
        <div className="col-sm-7 col-form-label">1200</div>
        {!editMode && (
          <button
            className="col-sm-1 btn btn-outline-primary"
            type="button"
            onClick={() => extendClickHandler()}
          >
            Extend
          </button>
        )}
      </div>
      {editMode && (
        <>
          <div className="mb-3 row">
            <div className="col">
              <div>
                <RegistrationLeasePeriod
                  leasePeriod={leasePeriod}
                  setLeasePeriod={(leasePeriod) => setLeasePeriod(leasePeriod)}
                />
              </div>
            </div>
          </div>

          <div className="mb-3 row">
            <div className="col d-flex justify-content-end">
              <button
                className="btn btn-outline-primary mx-3"
                type="button"
                onClick={() => cancelClickHandler()}
              >
                Cancel
              </button>
              <button
                className="btn btn-outline-primary  mx-3"
                type="button"
                onClick={() => extendClickHandler()}
              >
                Extend
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

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
          <div className="col-sm-8 col-form-label">
            <div>
              {nameRegistration
                ? nameRegistration.registrant
                : `Not registered`}
            </div>
          </div>
        </div>
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label">CONTROLLER</label>
          <div className="col-sm-8 col-form-label">
            <div>
              {nameRegistration ? nameRegistration.owner : `Not registered`}
            </div>
          </div>
        </div>
        <ExpirationTimeWithExtend
          name={name}
          nameRegistration={nameRegistration}
        />
      </form>
    </>
  );
};

export default NameDetailsCard;
