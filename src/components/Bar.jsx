import styled from "styled-components";

const BAR_RADIUS = "6px";

const BarContainer = styled.div`
  width: 100%;
  background-color: #444;
  border-radius: ${BAR_RADIUS};
  height: 14px;
`;

const BarFill = styled.div`
  height: 100%;
  border-radius: ${BAR_RADIUS};
  transition: width 0.3s ease-in-out;
`;

const HPBar = styled(BarFill)`
  background-color: #ff5555;
  width: ${props => props.percentage}%;
`;

const MPBar = styled(BarFill)`
  background-color: #FFCC69;
  width: ${props => props.percentage}%;
`;

const Bar = ({ current, max, type }) => {
  const percentage = (current / max) * 100;
  const BarComponent = type === 'HP' ? HPBar : MPBar;
  
  return (
    <BarContainer>
      <BarComponent percentage={percentage} />
    </BarContainer>
  );
};

export default Bar;
