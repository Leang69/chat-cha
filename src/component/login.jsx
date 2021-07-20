import React from "react";
import "./../style/login.scss";
import google from "./../img/googlelogo.png";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {requestUserInfo} from "./../Redux/Storeage"
import config from "./../config.json";
import { useState } from "react";
import { useEffect } from "react";

export default function Login() {
  window.Echo.channel("ChatChaGoogleAuth").listen("GoogleAcclogin", (e) => {
    console.log(e);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const storeDispatch = useDispatch();
  const store_user = useSelector((state) => state);
  const history = useHistory();
  const [passwordOrEmailInvalid, setPasswordOrEmailInvalid] = useState(false);
  const [googleAuthUrl, setGoogleAuthUrl] = useState(null);

  const loginHandle = (data) => {
    setPasswordOrEmailInvalid(false);
    console.log(config.url + "api/login");

    axios
      .post(config.url + "api/login", {
        email: data.email,
        password: data.password,
      })
      .then((r) => {
        const message = r.data.message + "";
        if (message.localeCompare("success") === 0) {
          storeDispatch({
            type: "setUserCredential",
            payload: r.data,
          });
          storeDispatch(requestUserInfo())
          console.log(store_user);
          // history.replace("/chating");
        } else if (
          message.localeCompare("email or password is incorrected.") === 0
        ) {
          setPasswordOrEmailInvalid(true);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    axios.get(config.url + "api/redirect/google").then((r) => {
      setGoogleAuthUrl(r.data.url);
    });
  }, []);

  return (
    <div>
      <div className="container-fluid my-5 p-3 col-lg-6 col-sm-8 col-xs-8 col-10 d-flex flex-column align-items-center">
        <h1 className="title">Chat Cha</h1>
        <form onSubmit={handleSubmit(loginHandle)} className="formLogin">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {errors.email?.type === "required" && (
              <p className="text-danger">Email is require</p>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1 text-s"
              className="form-label"
            >
              Password
            </label>
            <input
              {...register("password", { required: true, minLength: 8 })}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
            {errors.password?.type === "required" && (
              <p className="text-danger">Password is require</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-danger">Password minimum 8 digit</p>
            )}
          </div>
          {passwordOrEmailInvalid && (
            <p className="text-danger">Email or Password invalid</p>
          )}
          <p className="mb-3 text-primary text-end">Forget Password</p>
          <button
            type="submit"
            className="d-flex mb-3 justify-content-center btn btn-primary w-100 m-auto"
          >
            Login
          </button>
          <a
            href={googleAuthUrl}
            className="d-flex mb-3 justify-content-center btn btn-primary w-100 login_google"
          >
            <img className="me-3" src={google} />
            Login with Google
          </a>
          <p className="mb-3 text-center fw-bolder">
            Don't have an account?{" "}
            <span className="text-primary">
              <Link to="signup">Sign Up</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
