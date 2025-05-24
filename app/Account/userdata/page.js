"use client";
import axios from "axios";
import styled from "styled-components";
import Center from "@/app/component/Center";
import { useEffect, useState } from "react";
import Input from "@/app/component/Input";
import Header from "@/app/component/Header";
import { useParams } from "next/navigation";

function getAllCookies() {
  const cookies = document.cookie.split("; ");
  const cookieObject = {};

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookieObject[name] = value;
  });

  return cookieObject;
}
const handlesubmit = () => {
  const data = axios.get("/api/sendotp");
};

const Styleddiv = styled.div`
  display: flex;
  margin: 40px 0px;
  gap: 20px;
`;

const Inputdiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Styledaside = styled.aside`
  width: 200px;
  max-height: 100vh;
  background-color: #ccc;
  padding: 20px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  gap: 20px;
`;

const Styledmenudiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: #aaa;
  }
`;
export default function Account({params}) {
    
  const [cookie, setcookie] = useState({
    id: "",
    name: "",
    userid: "",
    userpassword: "",
    mobilenumber: "",
  });
  useEffect(() => {
    setcookie(getAllCookies());
  }, []);
  return (
    <>
    <Header/>
    <Center>
      <Styleddiv>
        <nav>
          <Styledaside>
            <Styledmenudiv>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                height={20}
                width={20}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              User data
            </Styledmenudiv>
            <Styledmenudiv>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                height={20}
                width={20}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                />
              </svg>
              Change Password
            </Styledmenudiv>
            <Styledmenudiv>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                height={20}
                width={20}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
              Your Orders
            </Styledmenudiv>
            <Styledmenudiv>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                height={20}
                width={20}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
              Log-out
            </Styledmenudiv>
          </Styledaside>
        </nav>
        <Inputdiv>
          <label>Id:</label>
          <Input type="text" value={cookie.id} onChange={() => {}} />
          <label>Name:</label>
          <Input type="text" value={cookie.name} onChange={() => {}} />
          <label>User Id:</label>
          <Input type="text" value={cookie.userid} onChange={() => {}} />
          <label>Mobile Number:</label>
          <Input type="text" value={cookie.mobilenumber} onChange={() => {}} />
        </Inputdiv>
      </Styleddiv>
    </Center></>
  );
}
