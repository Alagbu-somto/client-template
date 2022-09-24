import React, { useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LoginApi } from "./api";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { dispatch, isFetching } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    LoginApi(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3>Socialmedia</h3>
          <p>Connect with friends and family</p>
        </div>
        <div className="login-right">
          <form className="login-box" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              ref={email}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength="6"
              ref={password}
            />
            <button type="submit">{isFetching ? "loading" : "Login"}</button>
            <span className="forgot-password-text">Forgot Password</span>
            <button type="submit">Create new account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
