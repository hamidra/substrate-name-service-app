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
        className="btn btn-outline-primary"
        type="button"
        onClick={() => setValue(value - step)}
      >
        -
      </button>
      <input
        type="text"
        className="form-control border-primary"
        aria-label="counter input"
        value={value}
        onChange={(e) => setValue(parseInt(e?.target?.value))}
      />
      <span className="input-group-text border-primary">{unit}</span>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => setValue(value + step)}
      >
        +
      </button>
    </div>
  );
};

export default CounterInput;
