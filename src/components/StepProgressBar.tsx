import { ProgressBar } from 'react-bootstrap';

interface step {
  now: number;
  className?: string;
}

const StepProgressBar = ({ steps, ...rest }: { steps: step[] }) => {
  return (
    <ProgressBar>
      {steps.map((step) => (
        <ProgressBar now={step.now / steps.length} />
      ))}
    </ProgressBar>
  );
};

export default StepProgressBar;
