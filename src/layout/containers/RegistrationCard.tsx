import { useState, useRef, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useSubstrate, useKeyring } from 'layout/hooks';
import {
  get32BitSalt,
  getCurrentBlockNumber,
  getSigningAccount,
} from 'substrate/utils';
import { useNameRegistration } from 'layout/hooks';
import RegRequestCard from './RegRequestCard';
import RegConfirmCard from './RegConfirmCard';
import RegWaitCard from './RegWaitCard';
import CardHeader from 'components/CardHeader';
import { siteMap } from 'layout/routes/NameServiceRoutes';

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
  const [currentStepProgress, setCurrentStepProgress] = useState(0);
  const [progressTimer, setProgressTimer] = useState(null);
  const currentStepProgressRef = useRef(currentStepProgress);
  const [salt, setSalt] = useState(null);
  const [error, setError] = useState(null);
  const [commitment, setCommitment] = useState(null);
  const [commitmentAge, setCommitmentAge] = useState(null);
  const minCommitmentAge =
    nameServiceProvider?.constants?.minCommitmentAge?.toNumber();

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
  const loadRegistrationState = async (name, nameSalt) => {
    let commitment;
    let commitmentHash;
    if (name && nameSalt) {
      commitmentHash = nameServiceProvider.generateCommitmentHashCodec(
        name,
        nameSalt
      );
      commitment = await nameServiceProvider.getCommitment(commitmentHash);
      setCommitment(commitment);
    }
    // ToDo: match the connected account address with the commentment.who address

    // ToDo: check if commitment is mature if commiment is mature (the wait time is over)
    if (api && commitment) {
      if (commitmentAge || commitmentAge == 0) {
        if (commitmentAge < minCommitmentAge) {
          setCurrentStep(2);
          !progressTimer && runProgressTimer(commitmentHash);
        } else {
          setCurrentStep(3);
          setCommitmentAge(null);
          setCurrentStepProgress(0);
        }
      } else {
        let age = await calcCommitmentAge(api, commitment);
        setCommitmentAge(age);
      }
    } else {
      setCurrentStep(1);
      setCurrentStepProgress(0);
    }
  };

  // load stored commitments
  const storedReg = loadStoredCommitment(name);
  useEffect(() => {
    setSalt(storedReg?.salt);
    setLeaseTime(storedReg?.leaseTime);
    if (nameServiceProvider) {
      loadRegistrationState(name, storedReg?.salt);
    }
  }, [
    storedReg?.leaseTime,
    storedReg?.salt,
    nameServiceProvider,
    name,
    api,
    commitmentAge,
  ]);

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
    if (
      !currentStepProgress ||
      currentStepProgress === 0 ||
      currentStepProgress === 100
    ) {
      return false;
    } else {
      return true;
    }
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
            setCurrentStep(3);
            setCurrentStepProgress(0);
            setCommitmentAge(null);
            clearInterval(timer);
            setProgressTimer(null);
          }
        }
      }
    }, 6000);
    setProgressTimer(timer);
  };

  const getRegRequest = () => {
    const { who, when } = commitment || {};
    const leaseBlocks =
      leaseTime && nameServiceProvider?.getBlockCountFromYears(leaseTime);
    const leasePeriod = { years: leaseTime, blocks: leaseBlocks };
    let regRequest = {
      name,
      registrant: who,
      controller: who,
      leasePeriod,
      fee: { reg: '100', tx: '0.0034' },
    };
    return regRequest;
  };

  const handleRegistrationReveal = async () => {
    setError(null);
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
        .reveal(connectedSigningAccount, name, salt, leasePeriod)
        .then(() => {
          setCurrentStep(3);
          setCurrentStepProgress(100);
        });
      setCurrentStep(3);
      setCurrentStepProgress(50);
    } catch (err) {
      setCurrentStepProgress(0);
      setError(err?.message);
    }
  };

  const handleRegistrationCommit = async (name, leaseTime) => {
    // reset any error from previous runs
    setError(null);
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
          setCurrentStep(2);
          setCurrentStepProgress(0);
          setSalt(salt);
          setLeaseTime(leaseTime);
          runProgressTimer(commitmentHash);
        });

      setCurrentStep(1);
      setCurrentStepProgress(50);
    } catch (err) {
      setCurrentStepProgress(0);
      setError(err?.message);
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
      </Card.Body>
    </>
  );
};

const NotAvailableCard = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const namePageMatch = useMatch(siteMap.NamePage.path);

  const gotoMainPage = () => {
    navigate(siteMap.MainPage.path);
  };

  const gotoDetails = () => {
    // generate the path to details tab
    const detailsPath = `${namePageMatch.pathnameBase}/${siteMap.NamePage.Details.path}`;
    navigate(detailsPath);
  };

  return (
    <>
      <Card.Body className="d-flex flex-column justify-content-center">
        <CardHeader
          title={'Not available'}
          cardText={[
            <b>{name}</b>,
            ' is not available. Try searching for a different domain.',
          ]}
        />
        <Row>
          <Col className="px-5 flex-column flex-md-row d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={(e) => gotoMainPage()}
            >
              Try Again
            </button>
          </Col>
          <Col className="px-5 flex-column flex-md-row d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={(e) => gotoDetails()}
            >
              See Details
            </button>
          </Col>
        </Row>
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
