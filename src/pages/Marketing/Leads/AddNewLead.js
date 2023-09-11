import React from 'react';
import { GrAdd } from 'react-icons/gr';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { useStateContext } from '../../../contexts/ContextProvider';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const AddNewLead = () => {
    const { currentColor } = useStateContext();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const queryClient = useQueryClient();

    const addLeadMutation = useMutation((data) =>
        axios.post('http://localhost:5000/leads', data)
    );

    const onAddLead = async (data) => {
        console.log('Lead Data:', data);
        try {
            // Calculate the fullName by combining first and last names
            const fullName = `${data.firstname} ${data.lastname}`;
    
            // Use the mutation function to add the lead with the calculated fullName
            await addLeadMutation.mutateAsync({
                ...data,
                fullname: fullName,
            });
            toast.success('Lead added successfully')
            // Refetch the leads data after adding a new lead
            queryClient.invalidateQueries('leads');
        } catch (error) {
            console.error('Error adding lead:', error);
        }
    };
    

    const onSubmit = async (data) => {
        try {
            // Include the generated fullName field in the data object
            await onAddLead(data);

            // Clear the form after submission
            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const selectOptions = [
        { value: 'Company1', label: 'Company 1' },
        { value: 'Company2', label: 'Company 2' },
        { value: 'Company3', label: 'Company 3' },
        // Add more options as needed
    ];

    return (
        <div className='m-2 md:m-10 md:mt-24 p-2 md:p-2 bg-main-bg rounded-3xl'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                <h3
                    style={{ backgroundColor: currentColor }}
                    className='font-bold text-xl md:text-2xl md:my-2 text-center p-3 rounded-lg text-white '
                >
                    Add a new lead
                </h3>
                <div className='divider'></div>

                {/* General Information */}
                <div className='my-2'>
                    <div className='md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full'>
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
                                <label className='label-text'>Last Name:</label>
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
                                <label className='label-text'>Email:</label>
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

                        {/* Phone Number */}
                        <div className='w-full'>
                            <div className='label'>
                                <label className='label-text'>Phone Number:</label>
                            </div>
                            <Controller
                                name='phoneNumbers'
                                control={control}
                                defaultValue='' // You can set the default value as needed
                                rules={{
                                    required: 'Phone Number is required',
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Invalid number format. Please enter digits only.',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        placeholder='Enter Your Phone Number'
                                        className={`input input-bordered input-success w-full ${errors.phoneNumbers ? 'input-error' : ''
                                            }`}
                                        type='text'
                                        {...field}
                                    />
                                )}
                            />
                            {errors.phoneNumbers && (
                                <p className='text-error'>{errors.phoneNumbers.message}</p>
                            )}
                        </div>

                        {/* WhatsApp Number */}
                        <div className='w-full'>
                            <div className='label'>
                                <label className='label-text'>WhatsApp Number:</label>
                            </div>
                            <Controller
                                name='whatsappNumber'
                                control={control}
                                defaultValue=''
                                rules={{
                                    required: 'WhatsApp Number is required',
                                    pattern: {
                                        value: /^\+[0-9]+$/,
                                        message:
                                            'Invalid WhatsApp Number format. It should start with a plus sign and contain only digits.',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        placeholder='Enter Your WhatsApp Number'
                                        className={`input input-bordered input-success w-full ${errors.whatsappNumber ? 'input-error' : ''
                                            }`}
                                        type='text'
                                        {...field}
                                    />
                                )}
                            />
                            {errors.whatsappNumber && (
                                <p className='text-error'>{errors.whatsappNumber.message}</p>
                            )}
                        </div>
                        {/* Company Name */}
                        <div className='form-control w-full'>
                            <label htmlFor='companyName' className='label'>
                                <span className='label-text'>Company Name:</span>
                            </label>
                            <Controller
                                name='companyName'
                                control={control}
                                defaultValue=''
                                rules={{ required: 'Company Name is required' }}
                                render={({ field }) => (
                                    <select
                                        id='companyName'
                                        className={`select select-bordered ${errors.companyName ? 'input-error' : ''
                                            }`}
                                        {...field}
                                    >
                                        <option disabled value=''>
                                            Select Company Name
                                        </option>
                                        {selectOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.companyName && (
                                <p className='text-error'>{errors.companyName.message}</p>
                            )}
                        </div>

                        {/* Department */}
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Department:</span>
                            </label>
                            <Controller
                                name='department'
                                control={control}
                                defaultValue=''
                                rules={{ required: 'Department is required' }}
                                render={({ field }) => (
                                    <select
                                        className={`select select-bordered ${errors.department ? 'input-error' : ''
                                            }`}
                                        {...field}
                                    >
                                        <option disabled value=''>
                                            Select Department
                                        </option>
                                        <option value='Department1'>Department1</option>
                                        <option value='Department2'>Department2</option>
                                        <option value='Department3'>Department3</option>
                                        {/* Add more options as needed */}
                                    </select>
                                )}
                            />
                            {errors.department && (
                                <p className='text-error'>{errors.department.message}</p>
                            )}
                        </div>

                        {/* Position */}
                        <div className='form-control w-full'>
                            <label className='label'>
                                <span className='label-text'>Position:</span>
                            </label>
                            <Controller
                                name='position'
                                control={control}
                                defaultValue=''
                                rules={{ required: 'Position is required' }}
                                render={({ field }) => (
                                    <select
                                        className={`select select-bordered ${errors.position ? 'input-error' : ''
                                            }`}
                                        {...field}
                                    >
                                        <option disabled value=''>
                                            Select Position
                                        </option>
                                        <option value='Position1'>CEO</option>
                                        <option value='Position2'>Founder</option>
                                        <option value='Position3'>IT Head</option>
                                        {/* Add more options as needed */}
                                    </select>
                                )}
                            />
                            {errors.position && (
                                <p className='text-error'>{errors.position.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Add */}
                <div className='flex justify-center mt-10'>
                    <button
                        style={{ backgroundColor: currentColor }}
                        type='submit'
                        className='btn'
                    >
                        <GrAdd className='w-4 h-4' />
                        Add Lead
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewLead;
