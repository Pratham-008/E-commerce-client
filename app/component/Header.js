"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import Center from "./Center";
import { CartContext } from "./CartContext";

const Styledheader = styled.header`
  background-color: #222;
  width: 100%;
  min-width: 100%;
  position: relative;
  z-index: 100;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: relative;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
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
  align-items: center;
  transition: right 0.3s ease;
  @media (max-width: 768px) {
    flex-direction: column;
    background: #222;
    position: fixed;
    top: 0;
    right: ${({ $open }) => ($open ? "0" : "-100%")};
    width: 70vw;
    height: 100vh;
    padding: 60px 20px 20px 20px;
    gap: 25px;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
    transition: right 0.3s cubic-bezier(0.77, 0, 0.18, 1);
    z-index: 200;
  }
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.3em;
  font-weight: bold;
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 36px;
  height: 36px;
  z-index: 210;
  @media (max-width: 768px) {
    display: flex;
  }
  span {
    display: block;
    width: 26px;
    height: 3px;
    background: #fff;
    margin: 4px 0;
    border-radius: 2px;
    transition: 0.3s;
  }
`;

const CloseBtn = styled.button`
  display: none;
  position: absolute;
  top: 18px;
  left: 18px;
  background: none;
  border: none;
  font-size: 2em;
  color: #fff;
  cursor: pointer;
  z-index: 220;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 150;
  }
`;

const Header = () => {
  const { cartproducts } = useContext(CartContext);
  const [username, setusername] = useState(""); // Start with empty string
  const [navOpen, setNavOpen] = useState(false);
  const cartCount = cartproducts.length;

  useEffect(() => {
    // Only run on client
    function getAllCookies() {
      const cookies = document.cookie.split("; ");
      const cookieObject = {};
      cookies.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        cookieObject[name] = value;
      });
      return cookieObject;
    }
    const { name } = getAllCookies();
    setusername(name || "");
  }, []);

  return (
    <Styledheader>
      <Center>
        <Wrapper>
          <Logo href="">E-commerce</Logo>
          <Hamburger
            aria-label="Open navigation"
            onClick={() => setNavOpen(true)}
          >
            <span />
            <span />
            <span />
          </Hamburger>
          <Stylednav $open={navOpen}>
            <CloseBtn
              aria-label="Close navigation"
              onClick={() => setNavOpen(false)}
            >
              &#10005;
            </CloseBtn>
            <NavLink href={"/"} onClick={() => setNavOpen(false)}>
              Home
            </NavLink>
            <NavLink href={"/Products"} onClick={() => setNavOpen(false)}>
              Products
            </NavLink>
            <NavLink href={"/Orders"} onClick={() => setNavOpen(false)}>
              Orders
            </NavLink>
            <NavLink href={"/Cart"} onClick={() => setNavOpen(false)}>
              Cart({cartCount})
            </NavLink>
            <NavLink href={"/Login"} onClick={() => setNavOpen(false)}>
              {username.length > 0 ? `Hello(${username})` : "Login"}
            </NavLink>
          </Stylednav>
          <Overlay $open={navOpen} onClick={() => setNavOpen(false)} />
        </Wrapper>
      </Center>
    </Styledheader>
  );
};

export default Header;
