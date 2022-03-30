import StepProgressBar from 'components/StepProgressBar';
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

export default RegistrationSteps;
