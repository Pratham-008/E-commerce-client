"use client";
import { CartContext } from "@/app/component/CartContext";
import Center from "@/app/component/Center";
import Header from "@/app/component/Header";
import Primarybtn from "@/app/component/Primarybtn";
import ProductImages from "@/app/component/ProductImages";
import ProductProperties from "@/app/component/ProductProperties";
import Title from "@/app/component/Title";
import { mongooseconnect } from "@/lib/mongoose";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 0.8fr 1.2fr;
  margin-top: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  padding: 30px 10px;
  border-radius: 10px;
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Price = styled.span`
  font-size: 1.5rem;
`;
const page = ({ params }) => {
  const { addproduct } = useContext(CartContext);
  const { id } = useParams();
  const [product, setproduct] = useState();
  useEffect(() => {
    console.log(id);
    fetchdata();
    async function fetchdata() {
      const { data } = await axios.get("/api/product/" + id);
      setproduct(data);
      console.log(data);
    }
  }, []);
  const addtocart = (_id) => {
    addproduct(_id);
  };
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <Box>
            {product ? (
              <ProductImages images={product.images} />
            ) : (
              <p>Loading...</p>
            )}
          </Box>
          <div>
            <Title>{product ? product.name : "Loading..."}</Title>
            <p>{product ? product.description : "Loading..."}</p>
            <div>
              {product ? <ProductProperties product={product} /> : "Loading..."}
            </div>
            <PriceRow>
              <Price>₹{product ? product.price : "Loading..."}</Price>
              <div>
                <Primarybtn $primary onClick={() => addtocart(product._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                  </svg>
                  Add To cart
                </Primarybtn>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
};

export default page;
