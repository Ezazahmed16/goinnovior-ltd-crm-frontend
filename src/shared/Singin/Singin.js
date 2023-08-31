import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">

        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="text-center lg:text-left">
            <Link to='/'>
              <img className='w-24 h-24 mb-5 m-auto' src={logo} alt="logo" />
            </Link>
            <h1 className="text-4xl font-bold">Singin now</h1>
          </div>

          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" placeholder="password" className="input input-bordered" />
                <label className="label">
                  <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary font-extrabold text-xl text-white">Sing in</button>
              </div>

              <label className="label">
                <Link to="/singup" className="label-text-alt link link-hover m-auto">"Don't have an account yet?  Sign Up Now"</Link>
              </label>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login