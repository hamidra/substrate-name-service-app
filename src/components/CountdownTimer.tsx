const CountdownTimer = ({
  seconds,
  passed,
  size,
  strokeColor,
  strokeBgColor,
  strokeWidth,
}) => {
  const radius = size / 2;
  const circumference = size * Math.PI;

  const total = seconds;
  const countdown = seconds > passed ? seconds - passed : 0;

  const strokeDashoffset = () =>
    circumference - (countdown / total) * circumference;

  const countdownSizeStyles = {
    height: size,
    width: size,
  };

  const textStyles = {
    color: strokeColor,
    fontSize: size * 0.3,
  };

  const styles = {
    countdownContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      margin: 'auto',
    } as React.CSSProperties,
    svg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: 'rotateY(-180deg) rotateZ(-90deg)',
      overflow: 'visible',
    } as React.CSSProperties,
  };

  return (
    <div>
      <div
        style={{
          ...styles.countdownContainer,
          ...countdownSizeStyles,
        }}
      >
        <div style={textStyles}>{countdown}s</div>
        <svg style={styles.svg}>
          <circle
            cx={radius}
            cy={radius}
            r={radius}
            fill="none"
            stroke={strokeBgColor}
            strokeWidth={strokeWidth}
          ></circle>
        </svg>
        <svg style={styles.svg}>
          <circle
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset()}
            r={radius}
            cx={radius}
            cy={radius}
            fill="none"
            strokeLinecap="round"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          ></circle>
        </svg>
      </div>
    </div>
  );
};

export default CountdownTimer;
