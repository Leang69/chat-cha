import React from "react";
import './../style/signUp.scss'
import google from "./../img/googlelogo.png"
import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div
      class="
        container-fluid
        my-5
        p-3
        col-lg-6 col-sm-8 col-xs-8 col-10
        d-flex
        flex-column
        align-items-center
      "
    >
      <h1 class="title">Chat Cha</h1>
      <div class="formSignUp">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Username
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button class="d-flex mb-3 justify-content-center btn btn-primary w-100">
          Sign Up
        </button>
        <button
          class="
            d-flex
            mb-3
            justify-content-center
            btn btn-primary
            w-100
            signup_google
          "
        >
          <img class="me-3" src={google} />
          Sign Up with Google
        </button>
        <p class="mb-3 text-center fw-bolder">
          Have an account? <span class="text-primary"><Link to="login">Login</Link></span>
        </p>
      </div>
    </div>
  );
}
