"use client";
import React from "react";
import styled from "styled-components";

const Styledcenter = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding:0 20px;
`;

const Center = ({ children }) => {
  return <Styledcenter>{children}</Styledcenter>;
};

export default Center;
