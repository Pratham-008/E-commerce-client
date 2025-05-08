"use client";
import React, { useContext } from "react";
import styled from "styled-components";
import Center from "./Center";
import ButtonLink from "./ButtonLink";
import { CartContext } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0 0;
  font-weight: normal;
`;

const StyledP = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 50px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 25px;
  gap: 15px;
`;

const Feature = ({ product }) => {
  const { addproduct } = useContext(CartContext);
  const addFeaturedtocart = () => {
    addproduct(product._id);
  };
  return (
    <Bg>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>{product.name}</Title>
              <StyledP>{product.description}</StyledP>
              <ButtonWrapper>
                <ButtonLink href={`/ReadMore/${product._id}`} $primary>
                  Read More
                </ButtonLink>
                <ButtonLink onClick={() => addFeaturedtocart()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                  </svg>
                  Add To Cart
                </ButtonLink>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <img src={product.images[0]} alt="BMW M4" />
          </Column>
        </Wrapper>
      </Center>
    </Bg>
  );
};

export default Feature;
