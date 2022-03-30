import moment from 'moment';
import CounterInput from 'components/CounterInput';
import { blockCountToTimespanMs, fromChainUnit } from 'substrate/utils';
import { useParams } from 'react-router-dom';
import { useSubstrate } from 'substrate/SubstrateContext';
import BN from 'bn.js';

const RegistrationLeasePeriod = ({ leasePeriod, setLeasePeriod }) => {
  let { name } = useParams();
  const { api, nameServiceProvider, connectedAccount, chainInfo }: any =
    useSubstrate();
  const {
    tierThreeLetters,
    tierFourLetters,
    tierDefault,
    blocksPerRegistrationPeriod: blocksPerPeriod,
    feePerRegistrationPeriod: feePerPeriod,
  } = nameServiceProvider?.constants || {};

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
  const getRegistrationFee = (name: string, periods: BN): BN => {
    let label = name?.split('.')[0];
    if (!label || !periods || !feePerPeriod) {
      return;
    }
    let baseFee = getTierFee(label);
    let periodFee = periods.mul(feePerPeriod);
    let regFee = baseFee.add(periodFee);
    return regFee;
  };

  const registrationFee = getRegistrationFee(name, leasePeriod);
  const registrationFeeDisplay = fromChainUnit(
    registrationFee,
    chainInfo?.decimals,
    5
  );

  const _setLeasePeriod = (periods: number) => {
    setLeasePeriod(new BN(periods));
  };
  const _getLeasePeriod = (): number => {
    return leasePeriod.toNumber();
  };

  const _getLeasePeriodInBlocks = (): number => {
    let blockCount;
    if (leasePeriod && blocksPerPeriod) {
      blockCount = leasePeriod.mul(blocksPerPeriod).toNumber();
    }
    return blockCount;
  };

  const _getLeasePeriodDisplay = (): string => {
    let leasePeriodDisplay = '';
    if (chainInfo) {
      let leaseBlockCount = _getLeasePeriodInBlocks();
      let { blockTimeMs }: { blockTimeMs: number } = chainInfo;
      let leaseTimespan = blockCountToTimespanMs(blockTimeMs, leaseBlockCount);
      leasePeriodDisplay = moment.duration(leaseTimespan).humanize();
    }
    return leasePeriodDisplay;
  };

  return (
    <div className="row justify-content-between">
      <div className="col-12 col-md-6 my-2">
        <CounterInput
          value={_getLeasePeriod()}
          unit={`x ${blocksPerPeriod} blocks`}
          step={1}
          setValue={(value) => _setLeasePeriod(value)}
        />
        <div className="mb-2 form-text">Registration Period</div>
        <div>{`for estimated registration period of ${_getLeasePeriodDisplay()}`}</div>
      </div>
      <div className="col-12 col-md-6 my-2">
        <div className="fw-light fs-4">{`${registrationFeeDisplay} DOT`}</div>
        <div className="mb-2 form-text">Registration Price</div>
        <div>{`+ 0.001 DOT tx fees`}</div>
      </div>
    </div>
  );
};

export default RegistrationLeasePeriod;
