import { ProgressBar } from 'react-bootstrap';
interface StepProgressBarProps {
  currentStep: number;
  currentNow: number;
  totalSteps: number;
}

const StepProgressBar = ({
  currentStep,
  currentNow,
  totalSteps,
}: StepProgressBarProps) => {
  let now = 0;
  if (currentNow === 100 && currentStep === totalSteps) {
    now = 100;
  } else {
    let unit = 100 / totalSteps;
    currentNow /= totalSteps;
    now = currentStep > 0 ? (currentStep - 1) * unit : 0;
    now += currentNow;
  }
  return <ProgressBar now={now} />;
};

export default StepProgressBar;
