import axios from "axios";
import styled from "styled-components";
import Center from "./Center";
import { useEffect, useState } from "react";
import Input from "./Input";
import { useRouter } from "next/navigation";
import Primarybtn from "./Primarybtn";

function getAllCookies() {
  const cookies = document.cookie.split("; ");
  const cookieObject = {};

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookieObject[name] = value;
  });

  return cookieObject;
}


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

const Inputpass = styled.input`
  padding: 7px;
  border-radius: 5px;
  border: 1px solid #bbb;
  width: 50%;
`;

const Styledmenudiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.$active ? "#888" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "inherit")};
  &:hover {
    background-color: #aaa;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  text-align: center;
`;
export default function Account() {
  const router = useRouter();
  const [cookie, setcookie] = useState({
    id: "",
    name: "",
    userid: "",
    userpassword: "",
    mobilenumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [activeMenu, setActiveMenu] = useState("User data");
  const [oldpass, setoldpass] = useState("");
  const [newpass, setnewpass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [otp, setotp] = useState("");
  const [validotp, setvalidotp] = useState("");
  const handlesubmit = async () => {
    const { data } = await axios.get("/api/sendotp");
    setvalidotp(JSON.stringify(data));
    console.log(data);
    console.log(validotp)
    
  };

  useEffect(() => {
    setcookie(getAllCookies());
  }, []);
  useEffect(() => {
    if (activeMenu === "Your Orders") {
      router.push("/Orders");
    }
  }, [activeMenu, router]);
  return (
    <Center>
      <Styleddiv>
        <nav>
          <Styledaside>
            <Styledmenudiv
              $active={activeMenu === "User data"}
              onClick={() => setActiveMenu("User data")}
            >
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
            <Styledmenudiv
              $active={activeMenu === "Change Password"}
              onClick={() => setActiveMenu("Change Password")}
            >
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
            <Styledmenudiv
              $active={activeMenu === "Your Orders"}
              onClick={() => setActiveMenu("Your Orders")}
            >
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
            <Styledmenudiv
              $active={activeMenu === "Logout"}
              onClick={() => setActiveMenu("Logout")}
            >
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
        {activeMenu === "User data" && (
          <Inputdiv>
            <label>Id:</label>
            <Input type="text" value={cookie.id} onChange={() => {}} />
            <label>Name:</label>
            <Input type="text" value={cookie.name} onChange={() => {}} />
            <label>User Id:</label>
            <Input type="text" value={cookie.userid} onChange={() => {}} />
            <label>Mobile Number:</label>
            <Input
              type="text"
              value={cookie.mobilenumber}
              onChange={() => {}}
            />
            <label>Password:</label>
            <ButtonRow>
              <Inputpass
                type={showPassword ? "text" : "password"}
                value={cookie.userpassword}
                onChange={() => {}}
              />
              <Primarybtn
                $outline
                onClick={async () => {
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? (
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
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </Primarybtn>
            </ButtonRow>
          </Inputdiv>
        )}

        {activeMenu === "Change Password" && (
          <Inputdiv>
            <label>New Password:</label>
            <Input
              type="password"
              value={newpass}
              onChange={(e) => {
                setnewpass(e.target.value);
              }}
              placeholder="New password"
            />
            <label>Confirm Password:</label>

            <Input
              type="password"
              value={confirmpass}
              onChange={(e) => {
                setconfirmpass(e.target.value);
              }}
              placeholder="Confirm password"
            />
            <label>
              Enter Otp We sent to your mobile number:******
              {cookie.mobilenumber.slice(-4)}
            </label>
              <ButtonRow>
            <Inputpass type="text" id="pin" value={otp} onChange={(e)=>setotp(e.target.value)} maxLength="4" placeholder="Enter 4 digits otp" />
            <Primarybtn $outline onClick={()=>handlesubmit()}>Click here to send otp</Primarybtn>
            </ButtonRow>
            <Primarybtn $block
              onClick={async () => {
                if (newpass === confirmpass) {
                  console.log(otp,validotp)
                  if(otp===validotp){
                    const data=await axios.post("/api/changepassword",{password:newpass,userid:cookie.userid})
                    alert("Password changed successfully");
                  }
                  else{
                    alert("Invalid OTP");
                  }
                 
                } else {
                  alert("Password does not match");
                }
              }}>Change password</Primarybtn>

          </Inputdiv>
        )}
      </Styleddiv>
    </Center>
  );
}
