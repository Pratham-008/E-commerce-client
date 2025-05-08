"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styled, { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "./component/CartContext";
import Header from "./component/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const Globalstyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
 body{
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  background-color: #f0f0f0;
 }
`;

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Globalstyles />
      <CartContextProvider>
        
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </CartContextProvider>
    </html>
  );
}
