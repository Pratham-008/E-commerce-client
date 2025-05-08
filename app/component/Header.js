"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { CartContext } from "./CartContext";

const Styledheader = styled.header`
  background-color: #222;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  hover {
    color: #fff;
  }
  &.active {
    color: #fff;
  }
  &:hover {
    color: #fff;
  }
  &.active {
    color: #fff;
  }
`;

const Stylednav = styled.nav`
  display: flex;
  gap: 15px;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Header = () => {
  const { cartproducts } = useContext(CartContext);
  const [username,setusername]=useState("")
  const cartCount = cartproducts.length;
  function getAllCookies() {
    const cookies = document.cookie.split("; ");
    const cookieObject = {};

    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      cookieObject[name] = value;
    });

    return cookieObject;
  }
  useEffect(()=>{
    
    const {name}=getAllCookies();
    setusername(name||"");
    
  },[])
  return (
    <Styledheader>
      <Center>
        <Wrapper>
          <Logo href="">E-commerce</Logo>
          <Stylednav>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/Products"}>Products</NavLink>
            <NavLink href={"/Categories"}>Categories</NavLink>
            <NavLink href={"/Orders"}>Orders</NavLink>
            <NavLink href={"/Cart"}>Cart({cartCount})</NavLink>
            <NavLink href={"/Login"}>{username.length>0?`Hello(${username})`:"Login"}</NavLink>
          </Stylednav>
        </Wrapper>
      </Center>
    </Styledheader>
  );
};

export default Header;
