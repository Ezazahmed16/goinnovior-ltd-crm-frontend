import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import db from '../../firebase/firebase.config';
import logo from '../../assets/logo.png';
import { collection, doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUser, loading, googleLogin, emailVerification } = useContext(AuthContext);
  const [signUpError, setSignUPError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (data) => {
    setSignUPError('');
    setIsLoading(true);

    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;

        const formData = new FormData();
        formData.append('image', data.image[0]);

        axios
          .post('https://api.imgbb.com/1/upload?key=0ce36968e1c843b3c7d2d8ff489969af', formData)
          .then((response) => {
            const imageUrl = response.data.data.url;

            const userInfo = {
              displayName: data.name,
              photoURL: imageUrl,
            };

            updateUser(userInfo)
              .then(() => {
                saveUser(data.name, data.email, imageUrl);
                toast.success('User Created Successfully.');
                setIsLoading(false);

                emailVerification()
                  .then(result => {
                    toast.success('A Verification Link Is Sent On Your Email.');
                  })
                  .catch(err => {
                    toast.error('Something is wrong. Please try again.', err.message)
                  })
              })
              .catch((err) => console.log(err));
          })
          .catch((error) => {
            console.error('Error uploading image: ', error);
            setSignUPError('Error uploading image. Please try again.');
            setIsLoading(false);
          });
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        setSignUPError(error.message);
        setIsLoading(false);
      });
  };


  const handleGoogleLogin = () => {
    setIsLoading(true);

    googleLogin()
      .then((result) => {
        toast.success('Login Success');
        navigate('/');
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Google Login Error: ', error);
        setIsLoading(false);
      });
  };



  const saveUser = (name, email, imageUrl) => {
    const usersRef = collection(db, 'users');
    const newUserRef = doc(usersRef);

    setDoc(newUserRef, {
      name: name,
      email: email,
      imageUrl: imageUrl,
    })
      .then(() => {
        console.log('User data saved in Firestore');
      })
      .catch((error) => {
        console.error('Error saving user data in Firestore: ', error);
      });
  };

  return (
    <>
      {
        isLoading ?
          <div className="flex justify-center items-center h-screen">
            <img className='w-32 h-32' src={logo} alt="" srcset="" />
            <span className="loading loading-bars loading-lg"></span>
          </div>
          :
          <>
            <div className='flex justify-center items-center'>
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
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Profile Image</span>
                    </label>
                    <input
                      type="file"
                      {...register("image", {
                        required: "Image is required"
                      })}
                      className="file-input file-input-bordered file-input-success w-full max-w-xs"
                    />
                    {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                  </div>
                  <input className='btn btn-success btn-outline w-full mt-4' value="Sign Up" type="submit" />
                  {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account <Link className='text-secondary' to="/singin">Please Login</Link></p>
                <div className="divider">OR</div>

                <button onClick={handleGoogleLogin} className='btn btn-outline w-full'> <BsGoogle /> GOOGLE</button>
              </div>
            </div>
          </>
      }
    </>
  );
};

export default SignUp;
