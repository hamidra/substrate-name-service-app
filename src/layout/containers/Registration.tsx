import { useState, useRef } from 'react';
import RegistrationLeasePeriod from 'layout/containers/RegistrationLeasePeriod';
import { useParams } from 'react-router-dom';
import { useSubstrate } from 'layout/hooks';
import { get32BitSalt, getSigningAccount } from 'substrate/utils';
import { useEffect } from 'react';
import BN from 'bn.js';
import { useNameRegistration } from 'layout/hooks';
import RegistrationSteps from 'layout/containers/RegistrationSteps';

const RegistrationForm = () => {
  const { nameServiceProvider, connectedAccount }: any = useSubstrate();
  let { name } = useParams();
  let [leasePeriod, setLeasePeriod] = useState(new BN(1));
  let [currentStep, setCurrentStep] = useState(1);
  let [currentStepProgress, setCurrentStepProgress] = useState(0);
  let currentStepProgressRef = useRef(currentStepProgress);
  let [salt, setSalt] = useState(null);
  const [error, setError] = useState(null);

  // load the stored salt
  const storedSalt = localStorage.getItem(name);
  const nameSalt = isNaN(Number(storedSalt)) ? null : Number(storedSalt);
  console.log(nameSalt);
  const loadRegistrationState = async (nameSalt) => {
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
    if (nameServiceProvider) {
      loadRegistrationState(nameSalt);
    }
  }, [nameSalt, nameServiceProvider]);

  const getRegistrationButtonProps = (step) => {
    let btnProps = {
      title: 'Request to Register',
      disabled: false,
      clickHandler: () => handleRegistrationCommit(),
    };
    switch (step) {
      case 1:
        break;
      case 2:
        btnProps = {
          title: 'Register',
          disabled: true,
          clickHandler: () => {
            return null;
          },
        };
        break;
      case 3:
        btnProps = {
          title: 'Register',
          disabled: false,
          clickHandler: () => handleRegistrationReveal(),
        };
        break;
    }
    return btnProps;
  };

  const {
    title: btnTitle,
    disabled: btnDisabled,
    clickHandler: btnClickHandler,
  } = getRegistrationButtonProps(currentStep);

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

  const handleRegistrationCommit = async () => {
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
      setSalt(salt);
      const commitHash = nameServiceProvider.generateCommitmentHashCodec(
        name,
        salt
      );
      nameServiceProvider
        .commit(connectedSigningAccount, commitHash)
        .then(() => {
          setCurrentStep(2);
          setCurrentStepProgress(0);

          // store salt in local storage to keep the current commitment state
          localStorage.setItem(name, salt.toString());

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
    } catch (err) {
      setCurrentStepProgress(0);
      setError(err?.message);
    }
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
          <div className="w-100 m-2" />
          <div className="col d-flex justify-content-end pe-3">
            <div className="text-danger">{error || ''}</div>
          </div>
        </div>
      </form>
    </>
  );
};

const Registration = () => {
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
export default Registration;
