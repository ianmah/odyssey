import React from 'react';
import styled from 'styled-components';
import profile from "/profile.png";
import Card from "./Card";

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
          <span>HP: 2500/2500</span>
          <span>MP: 1000/1000</span>
        </StatsContainer>
      </CharacterInfo>
    </MenuContainer>
  );
};

export default CharacterMenu;
