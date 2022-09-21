export const DotExplain = ({ dotColor, dotName }) => {
  return (
    <div className="dot-explain">
      <span
        className="dot"
        style={{
          backgroundColor: dotColor,
          display: 'flex',
          height: '14px',
          width: '14px',
          borderRadius: '25px',
        }}
      ></span>
      <span className="dot-text">{dotName}</span>
    </div>
  );
};
