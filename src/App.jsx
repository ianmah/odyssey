import { useState, useRef, useEffect } from 'react'
import { Application, Assets, AnimatedSprite, Texture } from 'pixi.js'
import {usePrivy} from '@privy-io/react-auth'
import bg3 from '/bg3.webp'
import styled from 'styled-components'
import Modal from './components/Modal'
import './App.css'

const Main = styled.main`
  background:url(${bg3});
  background-size: cover;
  padding: 1.5em;
  min-height: 100vh;
  box-sizing: border-box;
`

const Img = styled.img`
  filter: drop-shadow(0px 7px 5px #22222255);
`

function App() {
  const pixiContainer = useRef(null);
  const [pixiReady, setPixiReady] = useState(false);
  const {ready, authenticated, login, user} = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);
  const [questModal, setQuestModal] = useState(false);

  useEffect(() => {
    setPixiReady(true);
    const initPixi = async () => {
      const app = new Application();
      // backgroundAlpha: 0, 
      await app.init({ width: 400, height: 360 });
      
      const spritesheet = await Assets.load('spritesheets/blackbelt.json');
      await spritesheet.parse();
      const anim = new AnimatedSprite(spritesheet.animations.front);
            
      // set the animation speed
      anim.animationSpeed = 0.1;
      // play the animation on a loop
      anim.play();
      // add it to the stage to render
      app.stage.addChild(anim);
      
      // Append the Pixi Canvas to the ref container
      pixiContainer.current.appendChild(app.canvas);

      // Add an animation loop callback to the application's ticker.
      app.ticker.add((time) =>
      {
          //  sprite.rotation += 0.1 * time.deltaTime;
      });

      // Cleanup function to remove Pixi Application on unmount
      return () => {
        app.destroy(true, { children: true });
      };
    }
    if (pixiReady) {
      initPixi()
    }
  }, [pixiReady, setPixiReady]);

  return (
    <Main>
      {questModal && <Modal onExit={() => setQuestModal(false)}>
        <h1>Quests</h1>
        </Modal>
      }
    <button disabled={disableLogin} onClick={login}>
      Log in
      </button>
      <br/>
      <br/>
      <div className="card">
      </div>
      <button onClick={() => setQuestModal(true)}>
        Quest
      </button>
      <div ref={pixiContainer} />
    </Main>
  )
}

export default App
