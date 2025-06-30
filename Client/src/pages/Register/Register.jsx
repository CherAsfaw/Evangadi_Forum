import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./register.module.css";
import axios from "../../API/axiosConfig";

function Register({ visible }) {
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const { setShow } = visible || {};

  function showStyledAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.className = styles.customAlert;
    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 3000);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value.trim();
    const firstnameValue = firstnameDom.current.value.trim();
    const lastnameValue = lastnameDom.current.value.trim();
    const emailValue = emailDom.current.value.trim();
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      showStyledAlert("Please provide all information");
      return;
    }

    try {
      await axios.post("/user/register", {
        user_name: usernameValue,
        first_name: firstnameValue,
        last_name: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
      showStyledAlert("Registration Successful! Switching to Login...");
      setTimeout(() => setShow?.(false), 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      showStyledAlert(errorMessage);
    }
  }

  return (
    <div className={styles.registerCard}>
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <input ref={usernameDom} type="text" placeholder="Username" />
        <input
          ref={firstnameDom}
          type="text"
          placeholder="First Name"
          required
        />
        <input ref={lastnameDom} type="text" placeholder="Last Name" />
        <input ref={emailDom} type="email" placeholder="Email" />
        <input
          ref={passwordDom}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>

      <Link
        to="/login"
        onClick={() => handleToggl(false)}
        className={styles.toggleLogin}
      >
        Already have an account? Login
      </Link>
    </div>
  );
}

export default Register;
