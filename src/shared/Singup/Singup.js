import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Signup = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          {/* <div className="text-center lg:text-left">
            <img className='w-24 h-24 mb-5 m-auto' src={logo} alt="logo" />
            <h1 className="text-4xl font-bold">Sign Up Now</h1>
          </div> */}

          <div className="card flex-shrink-0 w-full max-w-screen-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <Link to='/'>
                <img className='w-24 h-24 mb-5 m-auto' src={logo} alt="logo" />
              </Link>

              <form>
                <div className="flex gap-5 justify-between">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input type="text" placeholder="First Name" className="input input-bordered" />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input type="text" placeholder="Last Name" className="input input-bordered" />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="Email" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="Password" className="input input-bordered" />
                  <label className="label">
                    <Link to="#" className="label-text-alt link link-hover">Forgot password?</Link>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Profile Image</span>
                  </label>
                  <input type="file" className="input file-input file-input-bordered file-input-primary" />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary font-extrabold text-xl text-white">Sign Up</button>
                </div>
              </form>
              <label className="label">
                <Link to="/singin" className="label-text-alt link link-hover m-auto">
                  Already have an account? Sign In
                </Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
