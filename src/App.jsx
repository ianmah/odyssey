import { useState, useRef, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import char4x from "/char4x.png";
import bg4 from "/bg4.png";
import bg1 from "/bg1.png";
import Modal from "./components/Modal";
import "./App.css";
import Button from "./components/Button";
import CharacterMenu from "./components/CharacterMenu";
import Card from "./components/Card";
import styled from "styled-components";
import Login from "./pages/Login";

const Main = styled.main`
  background: url(${p => p.authenticated ? bg4 : bg1});
  background-size: cover;
  padding: 1em;
  min-height: 100vh;
  box-sizing: border-box;
  width: 46vh;
  position: relative;
`;

const Img = styled.img`
  filter: drop-shadow(0px 7px 5px #22222255);
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
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
  const { authenticated, login, user, logout } = usePrivy();
  
  return (
  <Main authenticated={authenticated}>
  {!authenticated && <Login/>}
  {authenticated && (
    <>
      <CharacterMenu />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={logout}>
          Log Out
        </button>
      </div>
      <div style={{ marginTop: '50vh', textAlign: 'center', lineHeight: '1em' }}>
        <Img
          src={char4x}
          className="char"
          width="64"
          alt="Character sprite"
        />
        <span style={{
          display: 'block', 
          color: 'white', 
          textShadow: '0px 0px 6px black, 0px 0px 6px black, 0px 0px 6px black, 0px 0px 6px black',
        }}>
          SloshJosh
        </span>
      </div>
      <ButtonMenu>
        <Button>Bag</Button>
        <Button>Dojo</Button>
        <Button>Map</Button>
      </ButtonMenu>
      </>
    )}
  </Main>
  )
}

export default App;
