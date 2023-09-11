import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory for redirection
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  const signIn = useSignIn();
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        name: formData.name,
        password: formData.password,
      });
      if (response.status === 200) {
        // Authentication successful
        console.log('Authentication successful');
        // Use the signIn function to authenticate the user
        signIn({
          token: response.data.token,
          expiresIn: 7200,
          tokenType: "Bearer",
          authState: { name: formData.name },
        });

        // Redirect to a different page upon successful login
        navigate('/'); // Change '/dashboard' to your desired route
        toast.success('Authentication successful');
      } else {
        // Authentication failed
        console.error('Authentication failed');
        toast.error('Authentication failed');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error('Authentication error');
    }
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
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="input input-bordered"
                      value={formData.name}
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
