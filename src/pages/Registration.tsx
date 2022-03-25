import { useState, useRef } from 'react';
import StepProgressBar from '../components/StepProgressBar';
import { useParams } from 'react-router-dom';
import { useSubstrate } from '../substrate/SubstrateContext';
import {
  get32BitSalt,
  getSigningAccount,
  calcBlockTimeMs,
  blockCountToTimespanMs,
  getBlockTimestampMs,
  fromChainUnit,
} from '../substrate/utils';
import { useEffect } from 'react';
import BN from 'bn.js';
import { useNameRegistration } from './NamePage';
import moment from 'moment';

interface CounterInputProps {
  unit?: string;
  value: number;
  step: number;
  setValue: (value: number) => void;
}
const CounterInput = ({ unit, value, step, setValue }: CounterInputProps) => {
  return (
    <div className="input-group">
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => setValue(value - step)}
      >
        -
      </button>
      <input
        type="text"
        className="form-control"
        aria-label="counter input"
        value={value}
        onChange={(e) => setValue(parseInt(e?.target?.value))}
      />
      <span className="input-group-text">{unit}</span>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => setValue(value + step)}
      >
        +
      </button>
    </div>
  );
};

export const RegistrationLeasePeriod = ({ leasePeriod, setLeasePeriod }) => {
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
        <div>{`for estimated lease time of ${_getLeasePeriodDisplay()}`}</div>
        <div className="form-text">Registration Period</div>
      </div>
      <div className="col-12 col-md-6 my-2">
        <div className="fw-light fs-4">{`${registrationFeeDisplay} DOT`}</div>
        <div>{`+ 0.001 DOT tx fees`}</div>
        <div className="form-text">Registration Price</div>
      </div>
    </div>
  );
};

const RegistrationSteps = ({ currentStep, currentStepProgress }) => {
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <hr />
          <div className="fs-4">
            To Register your name you need to complete 3 steps:
          </div>
        </div>

        <div
          className={`col-12 pt-2 col-md-4 pt-md-3 ${
            currentStep === 1 ? 'text-primary' : 'text-muted'
          }`}
        >
          <h4> Step 1 : Request to Register</h4>
          <p>
            Your wallet will open and you will be asked to confirm the first of
            two transactions required for registration. If the second
            transaction is not processed within 7 days of the first, you will
            need to start again from step 1.
          </p>
        </div>
        <div
          className={`col-12 pt-2 col-md-4 pt-md-3 ${
            currentStep === 2 ? 'text-success' : 'text-muted'
          }`}
        >
          <h4> Step 2 : Wait at least for 1 minute</h4>
          <p>
            The waiting period is required to ensure another person hasn’t tried
            to register the same name and protect you after your request.
          </p>
        </div>
        <div
          className={`col-12 pt-2 col-md-4 pt-md-3 ${
            currentStep === 3 ? 'text-success' : 'text-muted'
          }`}
        >
          <h4> Step 3 :Complete your registration</h4>
          <p>
            Click "register" and your wallet will re-open. Only after the 2nd
            transaction is confirmed you'll know if you got the name.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col py-3">
          <StepProgressBar
            currentStep={currentStep}
            totalSteps={3}
            currentNow={currentStepProgress}
          />
        </div>
      </div>
    </div>
  );
};
const RegistrationForm = () => {
  const { nameServiceProvider, connectedAccount }: any = useSubstrate();
  let { name } = useParams();
  let [leasePeriod, setLeasePeriod] = useState(new BN(1));
  let [currentStep, setCurrentStep] = useState(1);
  let [currentStepProgress, setCurrentStepProgress] = useState(0);
  let currentStepProgressRef = useRef(currentStepProgress);
  let [salt, setSalt] = useState(null);

  const loadRegistrationState = async () => {
    const nameSalt = localStorage.getItem(name);
    if (nameSalt) {
      nameSalt && setSalt(nameSalt);
      let commitmentHash = nameServiceProvider.generateCommitmentHashCodec(
        name,
        nameSalt
      );
      let commitment = await nameServiceProvider.getCommitment(commitmentHash);
      // ToDo: match the connected account address with the commentment.who address

      // ToDo: check if commitment is mature if commiment is mature (the wait time is over)

      if (commitment) {
        setCurrentStep(3);
        setCurrentStepProgress(0);
      }
    }
  };

  useEffect(() => {
    loadRegistrationState();
  }, []);

  const getRegistrationButtonState = (step) => {
    let state = {
      title: 'Request to Register',
      disabled: false,
      clickHandler: () => handleRegistrationCommit(),
    };
    switch (step) {
      case 1:
        break;
      case 2:
        state = {
          title: 'Register',
          disabled: true,
          clickHandler: () => {
            return null;
          },
        };
        break;
      case 3:
        state = {
          title: 'Register',
          disabled: false,
          clickHandler: () => handleRegistrationReveal(),
        };
        break;
    }
    return state;
  };

  const {
    title: btnTitle,
    disabled: btnDisabled,
    clickHandler: btnClickHandler,
  } = getRegistrationButtonState(currentStep);

  const handleRegistrationReveal = async () => {
    let connectedSigningAccount = await getSigningAccount(connectedAccount);
    nameServiceProvider
      .reveal(connectedSigningAccount, name, salt, leasePeriod)
      .then(() => {
        setCurrentStep(3);
        setCurrentStepProgress(100);
      });
    setCurrentStep(3);
    setCurrentStepProgress(50);
  };

  const handleRegistrationCommit = async () => {
    let connectedSigningAccount = await await getSigningAccount(
      connectedAccount
    );
    const salt = get32BitSalt();
    setSalt(salt);
    const commitHash = nameServiceProvider.generateCommitmentHashCodec(
      name,
      salt
    );
    nameServiceProvider.commit(connectedSigningAccount, commitHash).then(() => {
      setCurrentStep(2);
      setCurrentStepProgress(0);
      let timer = setInterval(() => {
        let newProgress = currentStepProgressRef.current + 10;
        console.log(newProgress);
        if (newProgress < 100) {
          setCurrentStepProgress(newProgress);
          currentStepProgressRef.current = newProgress;
        } else {
          setCurrentStep(3);
          setCurrentStepProgress(0);
          clearInterval(timer);
        }
      }, 60);
    });

    setCurrentStep(1);
    setCurrentStepProgress(50);
  };

  return (
    <>
      <form className="px-2">
        <RegistrationLeasePeriod
          leasePeriod={leasePeriod}
          setLeasePeriod={(leasePeriod) => setLeasePeriod(leasePeriod)}
        />
        <RegistrationSteps
          currentStep={currentStep}
          currentStepProgress={currentStepProgress}
        />
        <div className="row">
          <div className="col d-flex justify-content-end pe-3">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={(e) => btnClickHandler()}
              disabled={btnDisabled}
            >
              {btnTitle}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

const RegistrationCard = () => {
  const { nameServiceProvider, connectedAccount }: any = useSubstrate();
  const { name } = useParams();
  const { nameRegistration } = useNameRegistration();

  return (
    <>
      {!nameRegistration ? (
        <RegistrationForm />
      ) : (
        <div>{`${name} is already registered.`}</div>
      )}
    </>
  );
};
export default RegistrationCard;
