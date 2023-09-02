import React, { useContext, useState } from 'react';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const history = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Access email and password from formData
    const { email, password } = formData;
    console.log('Email:', email);
    console.log('Password:', password);
    // You can now use these values for authentication or other purposes

    signIn(email, password)
      .then(result => {
        toast.success('Singin successful');
        navigate('/');
      }).catch(err => {
        toast.error('Sing In Failed', err.message)
      })
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-4">Sign in now</h1>
            <Link to='/'>
              <img className='w-24 h-24 mb-5 m-auto' src={logo} alt="logo" />
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
  );
};

export default Login;
