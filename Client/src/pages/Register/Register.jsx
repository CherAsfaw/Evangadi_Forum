import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import style from "./register.module.css";
import { useState, useRef } from "react";
import axios from "../../API/axiosConfig";
import About from "../landing/About";
import Layout from "../../Component/layout/Layout";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [validation, setValidation] = useState({
    email: false,
    firstName: false,
    lastName: false,
    userName: false,
    password: false,
  });

  const emailDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const userNameDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const firstNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    const userNameValue = userNameDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !emailValue ||
      !firstNameValue ||
      !lastNameValue ||
      !userNameValue ||
      !passwordValue
    ) {
      setValidation({
        email: !emailValue,
        firstName: !firstNameValue,
        lastName: !lastNameValue,
        userName: !userNameValue,
        password: !passwordValue,
      });

      return;
    }
    try {
      await axios.post("/user/register", {
        email: emailValue,
        first_name: firstNameValue,
        last_name: lastNameValue,
        user_name: userNameValue,
        password: passwordValue
      });
      alert("registered successfully")
      navigate('/login')
    } catch (error) {
      alert('server error');
      console.log(error.response);
    }
  }

  return (
    <Layout>
      <section className={style.main_container}>
        <div className={style.container}>
          <h1>Join the network</h1>
          <p>
            Already have an account?<Link to="/"> Sign in</Link>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={emailDom}
              type="email"
              id="email"
              name="email"
              placeholder="email"
              style={{
                border: validation.email ? "1px solid #ff4444" : "",
              }}
            />
            {validation.email && (
              <span className={style.danger}>Please Enter Your Email</span>
            )}
            <div className={style.container_name}>
              <div className={style.container_name_each}>
                <input
                  ref={firstNameDom}
                  type="text"
                  name="first_name"
                  id="firstname"
                  placeholder="First Name"
                  style={{
                    border: validation.firstName ? "1px solid #ff4444" : "",
                  }}
                />
                {validation.firstName && (
                  <span className={style.danger}>
                    Please Enter Your First Name
                  </span>
                )}
              </div>
              <div className={style.container_name_each}>
                <input
                  ref={lastNameDom}
                  type="text"
                  name="last_name"
                  id="lastname"
                  placeholder="Last Name"
                  style={{
                    border: validation.lastName ? "1px solid #ff4444" : "",
                  }}
                />
                {validation.lastName && (
                  <span className={style.danger}>
                    Please Enter Your Last Name
                  </span>
                )}
              </div>
            </div>
            <input
              ref={userNameDom}
              type="text"
              id="username"
              name="user_name"
              placeholder="User Name"
              style={{
                border: validation.userName ? "1px solid #ff4444" : "",
              }}
            />
            {validation.userName && (
              <span className={style.danger}>Please Enter Your User Name</span>
            )}
            <div className={style.password}>
              <input
                ref={passwordDom}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                style={{
                  border: validation.password ? "1px solid #ff4444" : "",
                }}
              />
              <span
                className={style.showPass}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {validation.password && (
              <span className={style.danger}>Please Enter Your Password</span>
            )}
            <button type="submit">Agree and join</button>
          </form>
          <p>
            I agree to the <a href="/">privacy policy</a>. and{" "}
            <a href="">terms of service</a>.
          </p>
          <Link>Already have an account</Link>
        </div>
        <div>
          <About />
        </div>
      </section>
    </Layout>
  );
}

export default Register;
