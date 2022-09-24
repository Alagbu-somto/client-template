import React, { useRef } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { RegisterApi } from "./api";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const { dispatch, isFetching } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    confirmPassword.current.value !== password.current.value
      ? password.current.setCustomValidity("Passwods does not match")
      : RegisterApi(
          {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
          },
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
              type="text"
              name="Username"
              placeholder="Username"
              ref={username}
              required
            />
            <input type="email" name="email" placeholder="Email" ref={email} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              ref={password}
              minLength="6"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password again"
              ref={confirmPassword}
              minLength="6"
              required
            />
            <button type="submit">{isFetching ? "loading" : "Sign Up"}</button>
            <Link to="/login">
              <button style={{ backgroundColor: "green" }}>Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
