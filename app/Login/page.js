"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StyledForm from "../component/StyledForm";
import Header from "../component/Header";
import { motion, AnimatePresence } from "framer-motion";

const page = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setusername] = useState("");
  const [userid, setuserid] = useState("");
  const [error, setError] = useState("");
  const [usermobilenumber, setusermobilenumber] = useState("");
  const [userpassword, setuserpassword] = useState("");
  const router = useRouter();

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
    console.log(document.cookie);
    console.log(getAllCookies());
  }, []);

  const handlesignup = async (e) => {
    e.preventDefault();
    const data = { username, userid, userpassword, usermobilenumber };
    const response = await axios.post("/api/signup", { data });
    if (response.status === 210) {
      setIsSignup(!isSignup);
      alert("Account Created Successfully");
      setError("");
    } else if (response.status === 200) {
      setError("Id already exist");
    } else if (response.status === 220) {
      setError(response.data);
    }
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = { userid, userpassword };
    const data1 = await axios.post("/api/login", { userid, userpassword });
    if (data1?.status === 200) {
      const { _id, name, password, id, mobilenumber } = data1.data.user;
      document.cookie = `id=${id}; path=/;`;
      document.cookie = `mobilenumber=${mobilenumber}; path=/;`;
      document.cookie = `userpassword=${password}; path=/;`;
      document.cookie = `userid=${_id}; path=/;`;
      document.cookie = `name=${name}; path=/;`;
      router.push("/");
    } else if (data1?.status === 220) {
      setError("Enter Valid Password");
    } else if (data1?.status === 210) {
      setError("No Account Found");
    }
  };
  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      ></motion.div>
      <StyledForm method="post" onSubmit={(e) => handlesubmit(e)}>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <AnimatePresence>
          {isSignup && (
            <>
              <motion.input
                key="username"
                type="text"
                placeholder="Enter Your Name"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                name="username"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.input
                key="mobilenumber"
                type="text"
                placeholder="Enter Your Mobilenumber"
                value={usermobilenumber}
                onChange={(e) => setusermobilenumber(e.target.value)}
                name="mobilenumber"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              />
            </>
          )}
        </AnimatePresence>

        <motion.input
          type="text"
          placeholder="Enter Your ID"
          value={userid}
          onChange={(e) => setuserid(e.target.value)}
          name="id"
        />

        <motion.input
          type="password"
          placeholder="Enter Your Password"
          value={userpassword}
          onChange={(e) => setuserpassword(e.target.value)}
          name="userpassword"
        />
        {error.length > 0 ? (
          <p style={{ display: "flex" }}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              height={20}
              width={20}
              style={{ marginRight: "5px" }}
            >
              <path
                fillRule="evenodd"
                d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        ) : (
          ""
        )}
        <button
          type="submit"
          onClick={(e) => {
            isSignup ? handlesignup(e) : handlesubmit(e);
          }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <button
          type="button"
          className="toggle"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>
      </StyledForm>
    </>
  );
};

export default page;
