import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSubstrate, useKeyring } from 'layout/hooks';
import {
  get32BitSalt,
  getCurrentBlockNumber,
  getSigningAccount,
} from 'substrate/utils';
import { useNameRegistration } from 'layout/hooks';
import RegRequestCard from 'layout/containers/RegRequestCard';
import RegConfirmCard from 'layout/containers/RegConfirmCard';
import RegWaitCard from 'layout/containers/RegWaitCard';
import NotAvailableCard from 'layout/containers/NotAvailableCard';
import RegCompleteCard from 'layout/containers/RegCompleteCard';

interface CommitmentInfo {
  salt: number;
  leaseTime: number;
}

const RegistrationForm = () => {
  const { api, nameServiceProvider }: any = useSubstrate();
  const { connectedAccount }: any = useKeyring();
  const { name } = useParams();
  const [leaseTime, setLeaseTime] = useState(1); // in years
  const [currentStep, setCurrentStep] = useState(1);
  const [txInProgress, setTxInProgress] = useState(false);
  const [progressTimer, setProgressTimer] = useState(null);
  const [salt, setSalt] = useState(null);
  const [error, setError] = useState(null);
  const [commitment, setCommitment] = useState(null);
  const [commitmentAge, setCommitmentAge] = useState(null);
  const minCommitmentAge =
    nameServiceProvider?.constants?.minCommitmentAge?.toNumber();

  const reset = () => {
    setTxInProgress(false);
    setError(null);
  };

  const goToStep = (step) => {
    // if step changes reset the form and change the step
    if (currentStep !== step) {
      reset();
      setCurrentStep(step);
    }
  };

  const _setError = (errMessage: string | {}) => {
    setTxInProgress(false);
    setError(errMessage);
  };

  // leasperiod
  const getLeasePeriod = () => {
    return nameServiceProvider?.getBlockCountFromYears(leaseTime);
  };

  // load the stored salt
  const loadStoredCommitment = (name: string): CommitmentInfo => {
    try {
      const regStr: string = localStorage.getItem(name);
      const regObj: CommitmentInfo = regStr ? JSON.parse(regStr) : null;

      if (regObj?.salt && !isNaN(Number(regObj.salt))) {
        regObj.salt = Number(regObj.salt);
      }
      if (regObj?.leaseTime && !isNaN(Number(regObj.leaseTime))) {
        regObj.leaseTime = Number(regObj.leaseTime);
      }
      return regObj;
    } catch (err) {
      console.log(err);
    }
  };

  const storeCommitment = (name: string, commimentInfo: CommitmentInfo) => {
    localStorage.setItem(name, JSON.stringify(commimentInfo));
  };

  // check if any  commitments exists for  (name, nameSalt) in order to specify the current registration state
  const loadRegistrationState = async (api, commitmentHash, commitmentAge) => {
    let commitment;
    if (commitmentHash) {
      commitment = await nameServiceProvider.getCommitment(commitmentHash);
      setCommitment(commitment);
    }
    // ToDo: match the connected account address with the commentment.who address

    // ToDo: check if commitment is mature if commiment is mature (the wait time is over)
    if (api && commitment) {
      if (commitmentAge || commitmentAge == 0) {
        if (commitmentAge < minCommitmentAge) {
          goToStep(2);
          !progressTimer && runProgressTimer(commitmentHash);
        } else {
          goToStep(3);
          setCommitmentAge(minCommitmentAge + 1); // commitment is mature
        }
      } else {
        let age = await calcCommitmentAge(api, commitment);
        setCommitmentAge(age);
      }
    } else {
      goToStep(1);
    }
  };

  // load stored commitments
  const storedReg = loadStoredCommitment(name);
  useEffect(() => {
    setSalt(storedReg?.salt);
    if (api && nameServiceProvider) {
      let commitmentHash = nameServiceProvider.generateCommitmentHashCodec(
        name,
        storedReg?.salt
      );
      loadRegistrationState(api, commitmentHash, commitmentAge);
    }
  }, [storedReg?.salt, nameServiceProvider, name, api, commitmentAge]);

  useEffect(() => {
    setLeaseTime(storedReg?.leaseTime);
  }, [storedReg?.leaseTime]);

  // clearInterval if there is any progress timer running
  useEffect(() => {
    return () => {
      console.log('timer canceled', progressTimer);
      progressTimer && clearInterval(progressTimer);
    };
  }, [progressTimer]);

  const _setLeaseTime = (leaseTime) => {
    setLeaseTime(leaseTime);

    // store leaseTime in local storage if there is a registration in progress
    if (storedReg) {
      localStorage.setItem(name, JSON.stringify({ ...storedReg, leaseTime }));
    }
  };

  const isProcessing = () => {
    return !!txInProgress;
  };

  const calcCommitmentAge = async (api, commitment) => {
    let age;
    const commitmentBlockNumber: number = commitment?.when;
    const currentBlockNumber: number = await getCurrentBlockNumber(api);
    if (currentBlockNumber && commitmentBlockNumber) {
      age = currentBlockNumber - commitmentBlockNumber;
    }
    return age;
  };

  const runProgressTimer = async (commitmentHash) => {
    let timer = setInterval(async () => {
      if (api) {
        const commitment = await nameServiceProvider?.getCommitment(
          commitmentHash
        );
        let age = await calcCommitmentAge(api, commitment);
        if (age && minCommitmentAge) {
          if (age < minCommitmentAge) {
            console.log(age);
            setCurrentStep(2);
            setCommitmentAge(age);
          } else {
            goToStep(3);
            setCommitmentAge(null);
            clearInterval(timer);
            setProgressTimer(null);
          }
        }
      }
    }, 2000);
    setProgressTimer(timer);
  };

  const getRegRequest = () => {
    const { owner, depositor } = commitment || {};
    const leaseBlocks =
      leaseTime && nameServiceProvider?.getBlockCountFromYears(leaseTime);
    const leasePeriod = { years: leaseTime, blocks: leaseBlocks };
    let regRequest = {
      name,
      owner: owner,
      controller: depositor,
      leasePeriod,
      fee: { reg: '100', tx: '0.0034' },
    };
    return regRequest;
  };

  const handleRegistrationReveal = async () => {
    _setError(null);
    try {
      if (!connectedAccount) {
        throw new Error(
          'No account is connected. Please connect an account be able to sign the request.'
        );
      }
      // reset any error from previous runs
      let connectedSigningAccount = await getSigningAccount(connectedAccount);
      const leasePeriod = getLeasePeriod();
      nameServiceProvider
        .revealAndSetAddress(connectedSigningAccount, name, salt, leasePeriod)
        .then(async () => {
          setTxInProgress(false);
          goToStep(4);
        })
        .catch((err) => {
          _setError(err?.message);
        });
      setTxInProgress(true);
    } catch (err) {
      _setError(err?.message);
    }
  };

  const handleRegistrationCommit = async (name, leaseTime) => {
    // reset any error from previous runs
    _setError(null);
    try {
      if (!connectedAccount) {
        throw new Error(
          'No account is connected. Please connect an account to be able to sign the request.'
        );
      }
      let connectedSigningAccount = await getSigningAccount(connectedAccount);
      const salt = get32BitSalt();
      const commitmentHash = nameServiceProvider.generateCommitmentHashCodec(
        name,
        salt
      );
      // store commited registration in local storage
      storeCommitment(name, { salt, leaseTime });
      // commit
      nameServiceProvider
        .commit(connectedSigningAccount, commitmentHash)
        .then(() => {
          goToStep(2);
          setSalt(salt);
          setLeaseTime(leaseTime);
          runProgressTimer(commitmentHash);
        })
        .catch((err) => {
          _setError(err?.message);
        });
      setTxInProgress(true);
    } catch (err) {
      _setError(err?.message);
    }
  };
  return (
    <>
      <Card.Body className="d-flex flex-column">
        {currentStep === 1 && (
          <RegRequestCard
            name={name}
            initLeasetime={leaseTime}
            isProcessing={isProcessing()}
            handleRegistration={handleRegistrationCommit}
            error={error}
          />
        )}
        {currentStep === 2 && (
          <RegWaitCard
            name={name}
            waitPeriod={minCommitmentAge}
            passedPeriod={commitmentAge}
          />
        )}
        {currentStep === 3 && (
          <RegConfirmCard
            regRequest={getRegRequest()}
            handleConfirmation={handleRegistrationReveal}
            isProcessing={isProcessing()}
            error={error}
          />
        )}
        {currentStep === 4 && <RegCompleteCard />}
      </Card.Body>
    </>
  );
};

const Registration = () => {
  const { nameRegistration } = useNameRegistration();

  return (
    <>
      <Card
        style={{ width: 580, maxWidth: '100%', minHeight: 540 }}
        className="shadow"
      >
        {!nameRegistration ? <RegistrationForm /> : <NotAvailableCard />}
      </Card>
    </>
  );
};
export default Registration;
