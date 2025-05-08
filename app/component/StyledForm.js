import { motion } from "framer-motion";
import styled from "styled-components";

const StyleForm = styled.form`
 background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  padding: 30px 40px;
  max-width: 400px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #222;
  transition: all 0.3s ease;

  h2 {
    margin-bottom: 20px;
    transition: color 0.3s ease;
    color:#222;
  }

  input {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #555;
    border-radius: 8px;
    font-size: 16px;
    background-color: #f7f7f7;;
    color: #222;
    transition: border-color 0.3s ease, background-color 0.3s ease;
  }

  input:focus {
    border-color: #1e90ff;
    background-color: #f7f7f7;;
  }

  button {
    margin-top: 15px;
    padding: 10px 18px;
    border: none;
    border-radius: 8px;
    background-color: #222;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.3s ease;
  }

  button:hover {
    transform: scale(1.05);
    background-color: #333;
  }

  .toggle {
    background-color: transparent;
    color: #1e90ff;
    margin-top: 15px;
    font-size: 14px;
    border: none;
    text-decoration: underline;
    cursor: pointer;
    transition: color 0.3s ease;
  }
    p{
    color:#e53935;
    }

  .toggle:hover {
    color: #63b3ed;
    background-color: transparent;
  }
`;

export default function StyledForm({ children, ...props }) {
  return <StyleForm {...props}>{children}</StyleForm>;
}
