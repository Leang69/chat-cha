import React from "react";
import './../style/login.scss'
import google from "./../img/googlelogo.png"
import {Link} from 'react-router-dom'
import {useForm} from "react-hook-form";

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const loginHandle = (data) => {
        console.log(data)
    }
    return (
        <div>
            <div
                className="container-fluid my-5 p-3 col-lg-6 col-sm-8 col-xs-8 col-10 d-flex flex-column align-items-center">
                <h1 className="title">Chat Cha</h1>
                <form onSubmit={handleSubmit(loginHandle)} className="formLogin">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            {...register('email',{required:true})}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                        {errors.email?.type === 'required' && <p className="text-danger">Email is require</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1 text-s" className="form-label">
                            Password
                        </label>
                        <input
                            {...register('password',{required: true,minLength:8})}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                        {errors.password?.type === 'required' &&  <p className="text-danger">Password is require</p>}
                        {errors.password?.type === 'minLength' && <p className="text-danger">Password minimum 8 digit</p>}
                    </div>
                    <p className="mb-3 text-primary text-end">Forget Password</p>
                    <button type="submit" className="d-flex mb-3 justify-content-center btn btn-primary w-100 m-auto">
                        Login
                    </button>
                    <button className="d-flex mb-3 justify-content-center btn btn-primary w-100 login_google">
                        <img className="me-3" src={google}/>
                        Login with Google
                    </button>
                    <p className="mb-3 text-center fw-bolder">
                        Don't have an account? <span className="text-primary"><Link to="signup">Sign Up</Link></span>
                    </p>
                </form>
            </div>
        </div>
    );
}

