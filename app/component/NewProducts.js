"use client";
import React from "react";
import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";

const Productgrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 40px;
  padding-top: 5px;
`;

const Title = styled.h2`
font-size: 2rem;
font-weight: normal;
padding-top:5px;
`



const NewProducts = ({ newproducts ,title}) => {
  return (
    <Center>
      <Title>{title}</Title>
      <Productgrid>
        {newproducts.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
      </Productgrid>
    </Center>
  );
};

export default NewProducts;
