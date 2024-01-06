import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styled from "styled-components";

import { useRouter } from "next/router";

function LoginPage() {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/verify-password", { password });
      Cookies.set("token", response.data.token, { expires: 7 }); // Token is stored in cookies

      router.reload();
    } catch (error) {
      // Handle errors, such as incorrect password
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <Wrapper>
      <Bar>
        <Logo />
      </Bar>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <form onSubmit={handleSubmit} style={{ position: "relative" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <button type="submit">Login</button>
        </form>

        {errorMessage && (
          <p style={{ position: "absolute", top: "40px" }}>{errorMessage}</p>
        )}
      </div>

      <div />
    </Wrapper>
  );
}

const Bar = styled.div`
  width: calc(100vw - 20px);
  height: 50px;

  display: flex;
  align-items: center;

  padding-left: 10px;
  padding-right: 10px;
`;

const Logo = styled.div`
  width: 77px;
  height: 16px;
  background-image: url("/icons/xyz-logo.svg");
  background-size: cover;
  background-position: center;

  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  height: 100vh;

  background: #141414;

  flex-direction: column;

  & p {
    color: white;
    font-size: 14px;
  }

  & form {
    display: flex;
    align-items: center;

    width: 400px;

    & > * + * {
      margin-left: 10px;
    }

    & input {
      width: 400px;
      height: 24px;

      background: #050505;
      border: 1px solid #303030;

      border-radius: 5px;
      padding: 5px;

      color: white;

      &:focus,
      &:focus-visible {
        border: 1px solid #303030;
        outline: 0px;
      }
    }

    & button {
      background-color: #ffde14;
      height: 34px;
      width: 200px;

      color: black;
      border: 0px;
      border-radius: 5px;

      cursor: pointer;
    }
  }
`;

export default LoginPage;
