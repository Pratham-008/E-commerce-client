import React, { useContext } from "react";
import styled from "styled-components";
import Primarybtn from "./Primarybtn";
import Link from "next/link";
import { CartContext } from "./CartContext";

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled(Link)`
  font-wight: normal;
  font-size: 0.9rem;
  text-decoration: none;
  color: inherit;
  margin: 0;
`;

const Whitebox = styled(Link)`
  background-color: #fff;
  height: 150px;
  padding:20px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 150px;
  }
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  dipslay: flex;
  flex-direction: column;
  gap: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  justify-items: center;
  margin-top: 5px;
  align-items: center;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;
const ProductBox = ({ _id, name, description, price, images }) => {
  const uri='/Product/' + _id;
  const {addproduct}=useContext(CartContext);
  const addtocart=()=>{
    addproduct(_id);
  }
  return (
    <BoxWrapper>
      <Whitebox href={uri}>
        <div>
          <img src={images[0]} />
        </div>
      </Whitebox>
      <ProductInfoBox>
        <Title href={uri}>{name}</Title>
        <PriceRow>
          <Price>₹{price}</Price>
          <Primarybtn $outline onClick={addtocart}>
            Add to <br/>Cart
          </Primarybtn>
        </PriceRow>
      </ProductInfoBox>
    </BoxWrapper>
  );
};

export default ProductBox;
