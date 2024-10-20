import React from 'react';
import styled from 'styled-components';
import profile from "/profile.png";
import Card from "./Card";
import Bar from "./Bar";

const Avatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 25px;
`;

const CharacterInfo = styled.div`
  flex-grow: 1;
`;

const CharacterName = styled.h3`
  margin: 0;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
`;

const MenuContainer = styled(Card)`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 0.5em;
  align-items: center;
  width: 300px;
  margin: 0;
  text-align: left;
  padding: 0.75em;
`;

const CharacterMenu = () => {
  return (
    <MenuContainer>
      <Avatar src={profile} alt="Profile Pic" />
      <CharacterInfo>
        <CharacterName>Sakura</CharacterName>
        <StatsContainer>
          <span>Lv. 30</span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>HP: </span>
            <Bar current={1000} max={2500} type="HP" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>MP: </span>
            <Bar current={1000} max={1000} type="MP" />
          </div>
        </StatsContainer>
      </CharacterInfo>
    </MenuContainer>
  );
};

export default CharacterMenu;
