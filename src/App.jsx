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

const MOVEMENT_AMT = 1.5;

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

      let keyStack = [];
      let currentAnimation = 'front';

      const handleKeyDown = (event) => {
        if (!keyStack.includes(event.code)) {
          keyStack.push(event.code);
        }
      };
      const handleKeyUp = (event) => {
        const index = keyStack.indexOf(event.code);
        if (index > -1) {
          keyStack.splice(index, 1);
        }
      };
      
      const spritesheet = await Assets.load('spritesheets/blackbelt.json');
      await spritesheet.parse();
      const anim = new AnimatedSprite(spritesheet.animations.front);
            
      // set the animation speed
      anim.animationSpeed = 0.1;
      // add it to the stage to render
      app.stage.addChild(anim);
      
      // Append the Pixi Canvas to the ref container
      pixiContainer.current.appendChild(app.canvas);

      const setAnimation = (direction) => {
        if (currentAnimation !== direction) {
          anim.textures = spritesheet.animations[direction];
          anim.play();
          currentAnimation = direction;
        }
      };

      app.ticker.add(() => {
        let movement = false;
        if (keyStack.length > 0) {
          const currentKey = keyStack[keyStack.length - 1];
          if (currentKey === 'KeyW') {
            movement = true;
            anim.y -= MOVEMENT_AMT;
            setAnimation('back');
          } else if (currentKey === 'KeyA') {
            movement = true;
            anim.x -= MOVEMENT_AMT;
            setAnimation('left');
          } else if (currentKey === 'KeyS') {
            movement = true;
            anim.y += MOVEMENT_AMT;
            setAnimation('front');
          } else if (currentKey === 'KeyD') {
            movement = true;
            anim.x += MOVEMENT_AMT;
            setAnimation('right');
          }
        }
        if (!movement) {
            anim.gotoAndStop(0)
        } else {
          anim.play()
        }
      });

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        app.destroy(true, { children: true });
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
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
      <button onClick={() => setQuestModal(true)}>
        Quest
      </button>
      <div ref={pixiContainer} />
    </Main>
  )
}

export default App
