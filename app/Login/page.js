"use client";
import { useEffect, useState } from "react";
import Header from "../component/Header";
import Login from "../component/Login";
import Account from "../component/Account";

export default function page() {
    const [cookie,setcookie]=useState({});
  function getAllCookies() {
    const cookies = document.cookie.split("; ");
    const cookieObject = {};

    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      cookieObject[name] = value;
    });

    return cookieObject;
  }
  useEffect(() => {
    const cookies = getAllCookies();
    setcookie(cookies);
    console.log(Object.keys(cookies).length > 1);
  }, []);
  return (
    <div>
      <Header /> {Object.keys(cookie).length > 1 ? <Account/> : <Login />}
    </div>
  );
}
