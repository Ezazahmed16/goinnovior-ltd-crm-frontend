import React, { useContext, useState } from 'react';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { BsGoogle } from 'react-icons/bs'; // Add this import

const Singin = () => {
  const { signIn, loading, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
    e.preventDefault();
    setIsLoading(true)
    // Access email and password from formData
    const { email, password } = formData;

    signIn(email, password)
      .then(result => {
        toast.success('Signin successful');
        navigate('/');
        setIsLoading(false)
      })
      .catch(err => {
        toast.error('Sign In Failed. Please Check Your Email &   Password', err.message);
      });
  };

  const handleGoogleLogin = () => {
    setIsLoading(true)
    googleLogin()
      .then((result) => {
        console.log(result);
        toast.success('Login Success');
        navigate('/');
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {
        loading ?
          <div className="flex flex-col justify-center items-center h-screen">
            <img className='w-32 h-32 mb-5' src={logo} alt="" srcset="" />
            <span className="loading loading-bars loading-lg"></span>
          </div>
          :
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
                          <button className="btn btn-primary font-extrabold text-xl text-white">Sign in</button>
                        </div>
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleLogin} className='btn btn-outline w-full'> <BsGoogle /> GOOGLE</button>
                      </form>
                      <label className="label">
                        <Link to="/singup" className="label-text-alt link link-hover m-auto">
                          Don't have an account yet? Sign Up Now
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
      }
    </>
  );
};

export default Singin;
