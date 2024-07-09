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

const MOVEMENT_AMT = 1;

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
      await app.init({ 
        autoDensity: true,
        width: 360,
        height: 360
      });

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

      const buddySpritesheet = await Assets.load('spritesheets/tatsugiri.json');
      await buddySpritesheet.parse();
      const buddy = new AnimatedSprite(buddySpritesheet.animations.front);


      function getPixelData(sprite) {
        const bounds = sprite.getBounds();
        const texture = sprite.texture;
        
        const canvas = document.createElement('canvas');
        canvas.width = bounds.width;
        canvas.height = bounds.height;
    
        const context = canvas.getContext('2d');
        context.drawImage(texture.source.resource, 0, 0);
    
        return context.getImageData(0, 0, bounds.width, bounds.height).data;
    }
    
      anim.animationSpeed = 0.133;
      anim.anchor.set(0.5);
      anim.x = app.screen.width / 2;
      anim.y = app.screen.height / 2;
      anim.pixelData = getPixelData(anim);

      buddy.y = 32;
      buddy.x = app.screen.width / 2;
      buddy.anchor.set(0.5);
      buddy.pixelData = getPixelData(buddy);
            
      app.stage.addChild(anim);
      app.stage.addChild(buddy);
      
      // Append the Pixi Canvas to the ref container
      pixiContainer.current.appendChild(app.canvas);
      // Scale the canvas element
      pixiContainer.current.style.transform = 'scale(1.2)';
      pixiContainer.current.style['image-rendering'] = 'pixelated';
      pixiContainer.current.style.transformOrigin = 'top left';

      const setAnimation = (direction) => {
        if (currentAnimation !== direction) {
          anim.gotoAndPlay(1);
          anim.textures = spritesheet.animations[direction];
          currentAnimation = direction;
        }
      };

      function checkAABBCollision(bounds1, bounds2) {
          return bounds1.x < bounds2.x + bounds2.width &&
                bounds1.x + bounds1.width > bounds2.x &&
                bounds1.y < bounds2.y + bounds2.height &&
                bounds1.y + bounds1.height > bounds2.y;
      }
      
      function checkPixelPerfectCollision(sprite1, sprite2) {
          const bounds1 = sprite1.getBounds();
          const bounds2 = sprite2.getBounds();
      
          if (!checkAABBCollision(bounds1, bounds2)) {
              return false;
          }
    
          const overlapX = Math.max(bounds1.x, bounds2.x);
          const overlapY = Math.max(bounds1.y, bounds2.y);
          const overlapWidth = Math.min(bounds1.x + bounds1.width, bounds2.x + bounds2.width) - overlapX;
          const overlapHeight = Math.min(bounds1.y + bounds1.height, bounds2.y + bounds2.height) - overlapY;
      
          for (let y = 0; y < overlapHeight; y++) {
              for (let x = 0; x < overlapWidth; x++) {
                  const pixel1Index = ((y + overlapY - bounds1.y) * bounds1.width + (x + overlapX - bounds1.x)) * 4 + 3;
                  const pixel2Index = ((y + overlapY - bounds2.y) * bounds2.width + (x + overlapX - bounds2.x)) * 4 + 3;
      
                  if (sprite1.pixelData[pixel1Index] > 0 && sprite2.pixelData[pixel2Index] > 0) {
                      const collisionDirection = determineCollisionDirection(bounds1, bounds2);
                      return collisionDirection;
                  }
              }
          }
      
          return false;
      }
      
      function determineCollisionDirection(bounds1, bounds2) {
        const overlapLeft = bounds1.x + bounds1.width - bounds2.x;
        const overlapRight = bounds2.x + bounds2.width - bounds1.x;
        const overlapTop = bounds1.y + bounds1.height - bounds2.y;
        const overlapBottom = bounds2.y + bounds2.height - bounds1.y;
    
        const minOverlapX = Math.min(overlapLeft, overlapRight);
        const minOverlapY = Math.min(overlapTop, overlapBottom);
    
        if (minOverlapX < minOverlapY) {
            return overlapLeft < overlapRight ? 'right' : 'left';
        } else {
            return overlapTop < overlapBottom ? 'bottom' : 'top';
        }
    }
      
      function move(dx, dy) {
        for (const box of [buddy]) {
          switch (checkPixelPerfectCollision(anim, box)) {
            case 'left':
              dx = Math.max(dx, 0);
              break;
            case 'right':
              dx = Math.min(dx, 0);
              break;
            case 'top':
              dy = Math.max(dy, 0);
              break;
            case 'bottom': 
              dy = Math.min(dy, 0);
              break;
          }
        }
        anim.x += dx;
        anim.y += dy;
        return dx !== 0 || dy !== 0;
      }

      app.ticker.add(() => {
        let movement = false;
        if (keyStack.length > 0) {
          const currentKey = keyStack[keyStack.length - 1];
          if (currentKey === 'KeyW') {
            movement = move(0, -MOVEMENT_AMT)
            setAnimation('back');
          } else if (currentKey === 'KeyA') {
            movement = move(-MOVEMENT_AMT, 0)
            setAnimation('left');
          } else if (currentKey === 'KeyS') {
            movement = move(0, MOVEMENT_AMT)
            setAnimation('front');
          } else if (currentKey === 'KeyD') {
            movement = move(MOVEMENT_AMT, 0)
            setAnimation('right');
          }
        }
        if (!movement) {
            anim.gotoAndStop(0)
        } else {
          anim.play();
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
