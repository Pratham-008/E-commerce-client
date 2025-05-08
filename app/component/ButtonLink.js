"use client";
import React from "react";
import { ButtonStyle } from "./Primarybtn";
import styled from "styled-components";
import Link from "next/link";


const StyledLink = styled.div`
  ${ButtonStyle}
    text-decoration: none;
`;

const ButtonLink = (props) => {
  return <StyledLink {...props}></StyledLink>;
};

export default ButtonLink;
