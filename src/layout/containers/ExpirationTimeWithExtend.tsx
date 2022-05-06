import { useEffect, useState } from 'react';
import RegistrationLeasePeriod from 'layout/containers/RegistrationLeasePeriod';
import { useSubstrate, useKeyring } from 'layout/hooks';
import { getSigningAccount, blockNumberToTimeDisplay } from 'substrate/utils';

import { useNameRegistration } from 'layout/hooks';

const ExpirationTimeWithExtend = ({ name }) => {
  let [leaseTime, setLeaseTime] = useState(1);
  let [editMode, setEditMode] = useState(false);
  let { nameRegistration, setNameRegistration } = useNameRegistration();
  let expirationBlockNumber = nameRegistration?.expiry;
  let [expirationTimeDisplay, setExpirationTimeDisplay] = useState('');
  let { api, apiState, nameServiceProvider, chainInfo }: any = useSubstrate();
  let { connectedAccount }: any = useKeyring();
  let [processing, setProcessing] = useState(false);
  let [error, setError] = useState(null);
  let { blockTimeMs } = chainInfo || {};

  const _setError = (errorMessage: string | null) => {
    setProcessing(false);
    setError(errorMessage);
  };

  // leasperiod
  const getLeasePeriod = () => {
    return nameServiceProvider?.getBlockCountFromYears(leaseTime);
  };

  useEffect(() => {
    if (apiState === 'READY' && blockTimeMs && expirationBlockNumber) {
      blockNumberToTimeDisplay(api, blockTimeMs, expirationBlockNumber).then(
        (expirationTimeDisplay) => {
          setExpirationTimeDisplay(expirationTimeDisplay);
        }
      );
    }
  }, [api, apiState, blockTimeMs, expirationBlockNumber]);
  let cancelClickHandler = () => {
    setEditMode(false);
    setProcessing(false);
  };

  let extendClickHandler = () => {
    try {
      _setError(null);
      if (!editMode) {
        setEditMode(true);
      } else {
        setProcessing(true);
        nameExtensionHandler()
          .then(async () => {
            setEditMode(false);
            setProcessing(false);
            let registration = await nameServiceProvider?.getRegistration(name);
            setNameRegistration(registration?.unwrapOr(null)?.toJSON());
          })
          .catch((err) => {
            _setError(err?.message);
          });

        // update the name registration
      }
    } catch (err) {}
  };

  let nameExtensionHandler = async () => {
    if (nameRegistration?.expiry) {
      const leasePeriod = getLeasePeriod();
      const extendedExpiry = nameRegistration?.expiry + leasePeriod;
      let connectedSigningAccount = await getSigningAccount(connectedAccount);

      return nameServiceProvider.renew(
        connectedSigningAccount,
        name,
        extendedExpiry
      );
    }
  };

  return (
    <>
      <div className="mb-3 row">
        <label className="col-md-3 col-form-label">Expirtion Block</label>
        <div className="col-md-9 d-flex flex-column flex-md-row justify-content-between">
          <div className="col-form-label">
            {nameRegistration ? nameRegistration.expiry : `Not registered`}
          </div>
          <div className="col-form-label">{`~ ${expirationTimeDisplay}`}</div>
          {!editMode && (
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={() => extendClickHandler()}
            >
              Extend
            </button>
          )}
        </div>
      </div>
      {editMode && (
        <>
          <div className="mb-3 row">
            <div className="col">
              <div>
                <RegistrationLeasePeriod
                  leaseTime={leaseTime}
                  setLeaseTime={(leaseTime) => setLeaseTime(leaseTime)}
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
                disabled={processing}
              >
                Cancel
              </button>
              <button
                className="btn btn-outline-primary  mx-3"
                type="button"
                onClick={() => extendClickHandler()}
                disabled={processing}
              >
                {processing && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Extend
              </button>
            </div>
            <div className="w-100 m-2" />
            <div className="col d-flex justify-content-end pe-3">
              <div className="text-danger">{error || ''}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ExpirationTimeWithExtend;
