import React from "react";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  background-color: #eee;
  color: #222;
  
  padding: 7px 15px;
  border-radius: 5px;
  border: 1px solid #fff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  svg {
    height: 20px;
    margin-right: 5px;
  }
    width:fit-content;
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
    `}
  ${(props) =>
    props.$primary &&
    css`
      background: #222;
      border: 1px solid white;
      color: #fff;
      svg {
        height: 20px;
        margin-right: 5px;
      }
    `}
    ${(props)=>props.$block && css`
      background: #000;
      border: 1px solid #000;
      color: #fff;
      display:block;
      margin:0px;
      width:100%;
    `
    }

    ${(props)=>props.$outline && css`
      background: transparent;
      color: #222;
      border: 1px solid #222;`}
`;
const Styledbtn = styled.button`
  ${ButtonStyle};
  
`;

const Primarybtn = ({ children, ...rest }) => {
  return <Styledbtn {...rest}>{children}</Styledbtn>;
};

export default Primarybtn;
