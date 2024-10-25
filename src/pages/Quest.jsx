import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const QuestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

const Title = styled.h2`
  color: white;
  text-shadow: 0px 0px 6px black;
`;

const NuxOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.7);
`;

const NuxContent = styled(Card)`
  position: absolute;
  bottom: 30vh;
  width: 80%;
  padding: 2em;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
`;

const Quest = () => {
  const [nuxStep, setNuxStep] = useState(0);

  const handleNuxComplete = () => {
    setNuxStep(-1); // Set to -1 to indicate NUX is complete
  };

  return (
    <QuestContainer>
      <Title>Quest</Title>
      {nuxStep >= 0 && (
        <NuxOverlay>
          <NuxContent>
            {nuxStep === 0 && (
              <>
                <h3>Welcome to the forest!</h3>
                <p>Here you can train and level up your character.</p>
                <button onClick={() => setNuxStep(1)}>Next</button>
              </>
            )}
            {nuxStep === 1 && (
              <>
                <h3>Completing Quests</h3>
                <p>Finish quests to earn rewards and progress in the game.</p>
                <button onClick={handleNuxComplete}>Got it!</button>
              </>
            )}
          </NuxContent>
        </NuxOverlay>
      )}
    </QuestContainer>
  );
};

export default Quest;
