import styled from "styled-components";

const StyledInput = styled.input`
  padding: 7px;
  border-radius: 5px;
  border: 1px solid #bbb;
    
`;
const Input = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
