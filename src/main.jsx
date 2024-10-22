import React from 'react'
import ReactDOM from 'react-dom/client'
import {PrivyProvider} from '@privy-io/react-auth';
import App from './App.jsx'
import './index.css'
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Joystix';
    src: url('/joystix.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'Joystix', monospace;
    font-size: 13px;
  }
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrivyProvider
      appId="clw5p6mu20f35dqoahp314vze"
      config={{
        // Display email and wallet as login methods
        loginMethods: ['email', 'wallet'],
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <GlobalStyle />
      <App />
    </PrivyProvider>
  </React.StrictMode>,
)
