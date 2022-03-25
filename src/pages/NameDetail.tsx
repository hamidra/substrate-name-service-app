import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNameRegistration } from './NamePage';
import { RegistrationLeasePeriod } from './Registration';
import { useSubstrate } from '../substrate/SubstrateContext';
import { getSigningAccount, getBlockTimestampMs } from '../substrate/utils';
import BN from 'bn.js';
import moment from 'moment';
const ExpirationTimeWithExtend = ({ name, nameRegistration }) => {
  let [leasePeriod, setLeasePeriod] = useState(new BN(1));
  let [editMode, setEditMode] = useState(false);
  let expirationBlockNumber = nameRegistration?.expiry;
  let [expirationTimeDisplay, setExpirationTimeDisplay] = useState('');
  let { api, apiState, nameServiceProvider, connectedAccount, chainInfo }: any =
    useSubstrate();

  let { blockTimeMs } = chainInfo || {};
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
    console.log(currentBlock);
    let expirationTimestamp = getBlockTimestampMs(
      currentBlock,
      expirationBlockNumber,
      blockTimeMs
    );
    console.log('timestamp', expirationTimestamp);
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
        <ExpirationTimeWithExtend
          name={name}
          nameRegistration={nameRegistration}
        />
      </form>
    </>
  );
};

export default NameDetailsCard;
