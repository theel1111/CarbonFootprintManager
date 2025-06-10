// src/components/Button.tsx
import styled from 'styled-components'

interface ButtonProps {
  primary?: boolean
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) => (props.primary ? '#007bff' : '#6c757d')};
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? '#0056b3' : '#5a6268')};
  }
`

export default StyledButton
