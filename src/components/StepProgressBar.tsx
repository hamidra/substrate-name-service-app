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
  } else if (currentStep > 0) {
    let unit = 100 / totalSteps;
    currentNow /= totalSteps;
    now = (currentStep - 1) * unit;
    now += currentNow;
  }
  return <ProgressBar now={now} />;
};

export default StepProgressBar;
