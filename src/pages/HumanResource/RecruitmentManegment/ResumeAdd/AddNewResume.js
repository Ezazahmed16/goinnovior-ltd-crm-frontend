import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { useStateContext } from '../../../../contexts/ContextProvider';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const AddNewResume = () => {
    const { currentColor } = useStateContext();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const queryClient = useQueryClient();

    const addResumeMutation = useMutation((data) =>
        axios.post('http://localhost:5000/api/employs', data)
    );

    const onSubmit = async (data) => {
        try {
            const currentDate = new Date().toLocaleDateString();
            data.currentDate = currentDate;
            // Add Status 
            const Status = 'processOne'
            data.currentStatus = Status;
            console.log(data)
            // Use the mutation function to add the resume
            await addResumeMutation.mutateAsync(data);
            toast.success('Resume added successfully');
            queryClient.invalidateQueries('resumes');

            // Clear the form after submission
            reset();
        } catch (error) {
            console.error('Error adding resume:', error);
        }
    };

    return (
        <div className='m-2 md:m-10 md:mt-5 p-2 md:p-2 bg-main-bg rounded-3xl'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                <h3
                    style={{ backgroundColor: currentColor }}
                    className='font-bold text-xl md:text-2xl md:my-2 text-center p-3 rounded-lg text-white '
                >
                    Add a new Resume
                </h3>
                <div className='divider'></div>

                <div className='my-2'>
                    <div className='md:grid md:grid-cols-1 lg:grid-cols-2 gap-5 w-full'>
                        {/* First Name */}
                        <div className='w-full'>
                            <div className='label'>
                                <label htmlFor='firstname' className='label-text'>
                                    First Name:
                                </label>
                            </div>
                            <Controller
                                name='firstname'
                                control={control}
                                defaultValue=''
                                rules={{ required: 'First Name is required' }}
                                render={({ field }) => (
                                    <input
                                        id='firstname'
                                        placeholder='Enter Your First Name'
                                        className={`input input-bordered input-success w-full ${errors.firstname ? 'input-error' : ''
                                            }`}
                                        type='text'
                                        {...field}
                                    />
                                )}
                            />
                            {errors.firstname && (
                                <p className='text-error'>{errors.firstname.message}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div className='w-full'>
                            <div className='label'>
                                <label htmlFor='lastname' className='label-text'>
                                    Last Name:
                                </label>
                            </div>
                            <Controller
                                name='lastname'
                                control={control}
                                defaultValue=''
                                rules={{ required: 'Last Name is required' }}
                                render={({ field }) => (
                                    <input
                                        id='lastname'
                                        placeholder='Enter Your Last Name'
                                        className={`input input-bordered input-success w-full ${errors.lastname ? 'input-error' : ''
                                            }`}
                                        type='text'
                                        {...field}
                                    />
                                )}
                            />
                            {errors.lastname && (
                                <p className='text-error'>{errors.lastname.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className='w-full'>
                            <div className='label'>
                                <label htmlFor='email' className='label-text'>
                                    Email:
                                </label>
                            </div>
                            <Controller
                                name='email'
                                control={control}
                                defaultValue=''
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Invalid email address',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        id='email'
                                        placeholder='Enter Your Email'
                                        className={`input input-bordered input-success w-full ${errors.email ? 'input-error' : ''
                                            }`}
                                        type='text'
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email && (
                                <p className='text-error'>{errors.email.message}</p>
                            )}
                        </div>

                        {/* Resume Link */}
                        <div className='w-full'>
                            <div className='label'>
                                <label htmlFor='resumeLink' className='label-text'>
                                    Resume Link:
                                </label>
                            </div>
                            <Controller
                                name='resumeLink'
                                control={control}
                                defaultValue=''
                                rules={{ required: 'Resume Link is required' }}
                                render={({ field }) => (
                                    <input
                                        id='resumeLink'
                                        placeholder='Enter Resume Link'
                                        className={`input input-bordered input-success w-full ${errors.resumeLink ? 'input-error' : ''
                                            }`}
                                        type='text'
                                        {...field}
                                    />
                                )}
                            />
                            {errors.resumeLink && (
                                <p className='text-error'>{errors.resumeLink.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className='flex justify-center mt-10'>
                    <button
                        style={{ backgroundColor: currentColor }}
                        type='submit'
                        className='btn'
                    >
                        <GrAdd className='w-4 h-4' />
                        Add Resume
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewResume;
