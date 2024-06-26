/* eslint-disable react/prop-types */
import { createRef } from 'react'
import styled from "styled-components"

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    height: 100vh;
    max-width: 480px;
    width: 100vw;
    z-index: 1000;
    background-color: rgba(130, 130, 130, 0.1);
    backdrop-filter: blur(4px);
`

const StyledCard = styled.div`
    z-index: 1005;
    max-width: ${p => p.width || 'fit-content'};
    max-height: 75vh;
    margin: auto;
    margin-top: 10vh;
    padding: ${p => p.padding || '2em'};
`

const Modal = ({ children, onExit, ...props }) => {
    const ref = createRef()
    return (
        <ModalContainer ref={ref} onClick={(e) => {
            if (e.target === ref.current) {
                onExit()
            }
        }
        }
            >
            <StyledCard {...props} >
                { children }
            </StyledCard>
        </ModalContainer>
    )
}

export default Modal