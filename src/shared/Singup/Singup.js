import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { BsGoogle } from 'react-icons/bs';
import logo from '../../assets/logo.png'


const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUPError] = useState('');
  // const [createdUserEmail, setCreatedUserEmail] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (data) => {
    setSignUPError('');
    console.log(data.email)
    // Create user using Firebase authentication
    createUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log(user);
        // Update user's display name
        const userInfo = {
          displayName: data.name
        };
        updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
            toast.success('User Created Successfully.');
            navigate('/')
          })
          .catch(err => console.log(err));
      })
      .catch(error => {
        console.log(error);
        setSignUPError(error.message);
      });
  };

  const saveUser = (name, email) => {
    // const user = { name, email };
    // console.log(user)
    // fetch('', {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(user)
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     setCreatedUserEmail(email);
    //   });
  }

  return (
    <div className=' flex justify-center items-center'>
      <div className='w-96 p-7'>
        <Link to='/'>
          <img className='w-24 h-24 m-auto flex mb-5' src={logo} alt="" srcSet="" />
        </Link>
        <h2 className='text-2xl text-center font-semibold'>Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required"
              })}
              className="input input-bordered w-full max-w-xs input-success"
            />
            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: true
              })}
              className="input input-bordered w-full max-w-xs input-success"
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be 6 characters long" },
                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number, and special characters' }
              })}
              className="input input-bordered w-full max-w-xs input-success"
            />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>
          <input className='btn btn-success btn-outline w-full mt-4' value="Sign Up" type="submit" />
          {signUpError && <p className='text-red-600'>{signUpError}</p>}
        </form>
        <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>
        <div className="divider">OR</div>
        <button className='btn btn-outline w-full'> <BsGoogle /> GOOGLE</button>
      </div>
    </div>
  );
};

export default SignUp;
