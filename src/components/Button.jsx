import styled from "styled-components";

export default styled.button`
  all: unset;
  background-color: rgba(29, 34, 42, 0.85);
  transition: background-color 200ms ease;
  border-radius: 1em;
  color: white;
  width: 68px;
  height: 68px;
  font-size: 0.75em;
  cursor: pointer;
  &:hover {
    background-color: rgba(29, 34, 42, 0.95);
  }
`;
