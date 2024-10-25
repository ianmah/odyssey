import React from 'react';
import styled from 'styled-components';
import cz from "/cz.png";
import { usePrivy } from "@privy-io/react-auth";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 300px;
  margin-top: 30vh;
  margin-bottom: 2rem;
`;

const Login = () => {
const { ready, authenticated, login } = usePrivy();
const disableLogin = !ready || (ready && authenticated);
  return (
    <LoginContainer>
      <Logo src={cz} alt="Class Zero" />
      <button style={{ marginTop: '3em' }} disabled={disableLogin} onClick={login}>
        Log in
      </button>
    </LoginContainer>
  );
};

export default Login;
