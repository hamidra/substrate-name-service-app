import { useEffect, useState } from 'react';
import RegistrationLeasePeriod from 'layout/containers/RegistrationLeasePeriod';
import { useSubstrate, useKeyring } from 'layout/hooks';
import { getSigningAccount, getBlockTimestampMs } from 'substrate/utils';
import BN from 'bn.js';
import moment from 'moment';
import { useNameRegistration } from 'layout/hooks';

const ExpirationTimeWithExtend = ({ name }) => {
  let [leaseTime, setLeaseTime] = useState(1);
  let [editMode, setEditMode] = useState(false);
  let { nameRegistration, setNameRegistration } = useNameRegistration();
  let expirationBlockNumber = nameRegistration?.expiry;
  let [expirationTimeDisplay, setExpirationTimeDisplay] = useState('');
  let { api, apiState, nameServiceProvider, chainInfo }: any = useSubstrate();
  let { connectedAccount }: any = useKeyring();
  let { blockTimeMs } = chainInfo || {};

  // leasperiod
  const getLeasePeriod = () => {
    return nameServiceProvider?.getPeriodsFromYears(leaseTime);
  };

  const getExpirationTimeDisplay = async (
    api,
    blockTimeMs,
    expirationBlockNumber
  ): Promise<string> => {
    let expirationTimeDisplay = '';
    let getCurrentTimestamp = api.query.timestamp.now();
    let getCurrentBlockHeader = api.rpc.chain.getHeader();
    let [currentTimestamp, currentHeader] = await Promise.all([
      getCurrentTimestamp,
      getCurrentBlockHeader,
    ]);
    let currentBlock = {
      number: currentHeader?.toJSON()?.number,
      timestamp: currentTimestamp?.toJSON(),
    };
    let expirationTimestamp = getBlockTimestampMs(
      currentBlock,
      expirationBlockNumber,
      blockTimeMs
    );
    expirationTimeDisplay = moment(expirationTimestamp).format(
      'dddd, MMMM Do YYYY, h:mm a'
    );
    return expirationTimeDisplay;
  };

  useEffect(() => {
    if (apiState === 'READY' && blockTimeMs && expirationBlockNumber) {
      getExpirationTimeDisplay(api, blockTimeMs, expirationBlockNumber).then(
        (expirationTimeDisplay) => {
          setExpirationTimeDisplay(expirationTimeDisplay);
        }
      );
    }
  }, [api, apiState, blockTimeMs, expirationBlockNumber]);
  let cancelClickHandler = () => {
    setEditMode(false);
  };

  let extendClickHandler = async () => {
    try {
      if (!editMode) {
        setEditMode(true);
      } else {
        await nameExtensionHandler();
        setEditMode(false);
        // update the name registration
        let registration = await nameServiceProvider?.getRegistration(name);
        setNameRegistration(registration?.unwrapOr(null)?.toJSON());
      }
    } catch (err) {}
  };

  let nameExtensionHandler = async () => {
    const leasePeriod = getLeasePeriod();
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
        <label className="col-md-3 col-form-label">Expirtion Block</label>
        <div className="col-md-9 d-flex flex-column flex-md-row justify-content-between">
          <div className="col-form-label">
            {nameRegistration ? nameRegistration.expiry : `Not registered`}
          </div>
          <div className="col-form-label">{expirationTimeDisplay}</div>
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

export default ExpirationTimeWithExtend;
