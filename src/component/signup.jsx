import React from "react";
import './../style/signUp.scss'
import google from "./../img/googlelogo.png"
import {Link} from 'react-router-dom'
import {useForm} from "react-hook-form";

export default function SignUp() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const signUphandle = (data) => {
        console.log(data)
    }
    return (
        <div className="container-fluid my-5 p-3 col-lg-6 col-sm-8 col-xs-8 col-10 d-flex flex-column align-items-center">
            <h1 className="title">Chat Cha</h1>
            <form onSubmit={handleSubmit(signUphandle)} className="formSignUp">
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        {...register('email', {required:true})}
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                    />
                    {errors.email?.type === 'required' && <p className="text-danger">Email is require</p>}

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Username
                    </label>
                    <input
                        {...register('username',{required:true})}
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                    />
                    {errors.username?.type === 'required' && <p className="text-danger">Username is require</p>}

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        {...register('password',{required:true,minLength: 8})}
                        type="password"
                        className="form-control"
                    />
                    {errors.password?.type === 'required' && <p className="text-danger">Password is require</p>}
                    {errors.password?.type === 'minLength' && <p className="text-danger">Password minimum 8 digit</p>}

                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        {...register('confirm_password',{required:true,minLength: 8})}
                        type="password"
                        className="form-control"
                    />
                    {errors.confirm_password?.type === 'required' && <p className="text-danger">Confirm Password is require</p>}
                    {errors.confirm_password?.type === 'minLength' && <p className="text-danger">Confirm Password minimum 8digit</p>}
                </div>
                <button type="submit" className="d-flex mb-3 justify-content-center btn btn-primary w-100">
                    Sign Up
                </button>
                <button className="d-flex mb-3 justify-content-center btn btn-primary w-100 signup_google " >
                    <img className="me-3" src={google}/>
                    Sign Up with Google
                </button>
                <p className="mb-3 text-center fw-bolder">
                    Have an account? <span className="text-primary"><Link to="login">Login</Link></span>
                </p>
            </form>
        </div>
    );
}
