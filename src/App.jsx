import { useState, useRef, useEffect } from 'react'
import { usePrivy } from "@privy-io/react-auth";
import running from "/running.gif";
import bg4 from "/bg4.png";
import styled from "styled-components";
import Modal from "./components/Modal";
import "./App.css";
import Button from "./components/Button";
import CharacterMenu from "./components/CharacterMenu";
import Card from "./components/Card";

const Main = styled.main`
  background: url(${bg4});
  background-size: cover;
  padding: 1em;
  min-height: 100vh;
  box-sizing: border-box;
  width: 46vh;
  position: relative;
`;

const Img = styled.img`
  filter: drop-shadow(0px 7px 5px #22222255);
`;

const ButtonMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  position: absolute;
  width: 44vh;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
`;

function App() {
  const { ready, authenticated, login, user } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);
  const [questModal, setQuestModal] = useState(false);

  return (
    <Main>
      {questModal && (
        <Modal onExit={() => setQuestModal(false)}>
          <h1>Quests</h1>
          <Card>Quest 1</Card>
          <Card>Quest 2</Card>
          <Card>Quest 3</Card>
        </Modal>
      )}
      <button disabled={disableLogin} onClick={login}>
        Log in
      </button>
      <CharacterMenu />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="card">
        <Img
          src={running}
          className="char"
          width="200"
          alt="Character sprite"
        />
      </div>
      <ButtonMenu>
        <Button>Bag</Button>
        <Button>Kitchen</Button>
        <Button>Quest</Button>
        <Button>Map</Button>
        <Button>Rank</Button>
      </ButtonMenu>
    </Main>
  );
}

export default App;
