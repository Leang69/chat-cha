import React from "react";
import './../style/login.scss'
import google from "./../img/googlelogo.png"
import {Link} from 'react-router-dom'

export default function Login() {
  return (
    <div>
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
        <div class="formLogin">
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
            <label for="exampleInputPassword1 text-s" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <p class="mb-3 text-primary text-end">Forget Password</p>
          <button class="d-flex mb-3 justify-content-center btn btn-primary w-100 m-auto">
            Login
          </button>
          <button
            class="
            d-flex
            mb-3
            justify-content-center
            btn btn-primary
            w-100
            login_google
          "
          >
            <img class="me-3" src={google} />
            Login with Google
          </button>
          <p class="mb-3 text-center fw-bolder">
            Don't have an account? <span class="text-primary"><Link to="signup">Sign Up</Link></span>
          </p>
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></script>
    </div>
  );
}

