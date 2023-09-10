import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting normally
    // Access the form data from the formData state
    const { email, password } = formData;
    // You can now use the email and password as needed, e.g., send them to an API
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <>
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse w-full">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold mb-4 mx-5">Sign in now</h1>
              <Link to='/'>
                <img className='w-32 h-32 mt-8 m-auto' src={logo} alt="logo" />
              </Link>
            </div>

            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="input input-bordered"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="input input-bordered"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="label">
                      <Link to="#" className="label-text-alt link link-hover">Forgot password?</Link>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary font-extrabold text-xl text-white" type="submit">
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
