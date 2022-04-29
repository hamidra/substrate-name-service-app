import moment from 'moment';
import CounterInput from 'components/CounterInput';
import { blockCountToTimespanMs, fromChainUnit } from 'substrate/utils';
import { useParams } from 'react-router-dom';
import { useSubstrate } from 'layout/hooks';
import BN from 'bn.js';

const RegistrationLeasePeriod = ({ leaseTime, setLeaseTime }) => {
  let { name } = useParams();
  const { api, nameServiceProvider, connectedAccount, chainInfo }: any =
    useSubstrate();

  const {
    tierThreeLetters,
    tierFourLetters,
    tierDefault,
    registrationFeePerBlock: feePerBlock,
  } = nameServiceProvider?.constants || {};

  const leasePeriodInBlocks =
    nameServiceProvider?.getBlockCountFromYears(leaseTime);

  const getTierFee = (name: string): BN => {
    let charCount = name?.length;
    let fee = new BN(0);
    if (charCount) {
      if (charCount <= 3) {
        fee = tierThreeLetters;
      } else if (charCount === 4) {
        fee = tierFourLetters;
      } else {
        fee = tierDefault;
      }
    }
    return fee;
  };

  const getRegistrationFee = (name: string, blocks: number): BN => {
    let label = name?.split('.')[0];
    if (!label || !blocks || !feePerBlock) {
      return;
    }
    let blocksBN = new BN(blocks);
    let baseFee = getTierFee(label);
    let periodFee = blocksBN.mul(feePerBlock);
    let regFee = baseFee.add(periodFee);
    return regFee;
  };

  const getLeasePeriodDisplay = (leasePeriodInBlocks): string => {
    let leasePeriodDisplay = '';
    if (chainInfo) {
      let { blockTimeMs }: { blockTimeMs: number } = chainInfo;
      let leaseTimespan = blockCountToTimespanMs(
        blockTimeMs,
        leasePeriodInBlocks
      );
      leasePeriodDisplay = moment.duration(leaseTimespan).humanize();
    }
    return leasePeriodDisplay;
  };

  const registrationFee = getRegistrationFee(name, leasePeriodInBlocks);
  const registrationFeeDisplay = fromChainUnit(
    registrationFee,
    chainInfo?.decimals,
    5
  );

  const _setLeaseTime = (years: number) => {
    if (0 < years && years <= 100000) {
      setLeaseTime(years);
    } else {
      setLeaseTime(0);
    }
  };

  return (
    <div className="row justify-content-between">
      <div className="col-12 my-2">
        <div className="form-label">Registration Period</div>
        <CounterInput
          value={leaseTime}
          unit={leaseTime === 1 ? `~ year` : `~ years`}
          step={1}
          setValue={(value) => _setLeaseTime(value)}
        />
        <div className="form-text">{`for registration period of ${leasePeriodInBlocks} blocks`}</div>
      </div>
      <div className="w-100 my-2 border-top"></div>
      <div className="col-12 my-2 d-flex flex-column flex-md-row justify-content-between">
        <div className="form-label">Registration Price</div>
        <div className="d-flex flex-column">
          <div className="fw-light fs-4">{`${registrationFeeDisplay} DOT`}</div>
          <div>{`+ 0.001 DOT tx fees`}</div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationLeasePeriod;
