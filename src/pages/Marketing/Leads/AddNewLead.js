import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { CgWebsite } from 'react-icons/cg';
import { BsWhatsapp, BsFacebook, BsLinkedin } from 'react-icons/bs';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { useForm, Controller } from 'react-hook-form';
import { useStateContext } from '../../../contexts/ContextProvider';
import { Link } from 'react-router-dom';

const AddNewLead = () => {
    const { currentColor } = useStateContext();

    const {
        handleSubmit,
        control,
        formState: { errors },
        // setValue, 
        // getValues, 
        reset,
    } = useForm();

    const [leadsData, setLeadsData] = useState([]); // Local state for managing leads

    const onAddLead = (data) => {
        // Handle lead addition logic here
        console.log('Lead data:', data);
        // Update the leadsData state with the new lead
        setLeadsData([...leadsData, data]);
        reset(); // Clear the form after submission
    };

    const onSubmit = (data) => {
        onAddLead(data);
    };

    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-2 bg-main-bg rounded-3xl'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="underline" style={{ color: currentColor }}>
                    <Link className='flex' to='/marketing/leads'>
                        <RiArrowGoBackLine className='w-6 h-6 mx-2' />
                        Go Back
                    </Link>
                </div>
                <h3 className="font-bold text-2xl mb-2 text-center">Add a new lead</h3>
                <div className="divider"></div>

                {/* General Information */}
                <div className="my-2">
                    <h3 style={{ backgroundColor: currentColor }} className="font-bold text-xl mb-2 p-2 text-center text-white">General Information</h3>
                    <div className="md:flex justify-start gap-5 w-full">
                        {/* Name */}
                        <div className='w-full'>
                            <div className="label">
                                <label className='label-text'>Name:</label>
                            </div>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Your Name"
                                        className={`input input-bordered input-success w-full ${errors.name ? 'input-error' : ''}`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.name && <p className="text-error">{errors.name.message}</p>}
                        </div>
                        {/* Email */}
                        <div className='w-full'>
                            <div className="label">
                                <label className='label-text'>Email:</label>
                            </div>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Invalid email address',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Your Email"
                                        className={`input input-bordered input-success w-full ${errors.email ? 'input-error' : ''}`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email && <p className="text-error">{errors.email.message}</p>}
                        </div>
                        {/* Number */}
                        <div className='w-full'>
                            <div className="label">
                                <label className='label-text'>Number:</label>
                            </div>
                            <Controller
                                name="number"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Number is required' }}
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Your Number"
                                        className={`input input-bordered input-success w-full ${errors.number ? 'input-error' : ''}`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.number && <p className="text-error">{errors.number.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Company Information */}
                <div className="mt-2">
                    <h3 style={{ backgroundColor: currentColor }} className="font-bold text-xl mb-2 p-2 text-center text-white">Company Information:</h3>
                    <div className="md:grid md:grid-cols-3 justify-start gap-5">
                        {/* Company Name */}
                        <div className='w-full'>
                            <div className="label">
                                <label className='label-text'>Company Name:</label>
                            </div>
                            <Controller
                                name="companyName"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Company Name is required' }}
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Your Company Name"
                                        className={`input input-bordered input-success w-full  ${errors.companyName ? 'input-error' : ''}`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.companyName && <p className="text-error">{errors.companyName.message}</p>}
                        </div>
                        {/* Company Email */}
                        <div className='w-full'>
                            <div className="label">
                                <label className='label-text'>Company Email:</label>
                            </div>
                            <Controller
                                name="companyEmail"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Company Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Invalid Company Email address',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Your Company Email"
                                        className={`input input-bordered input-success w-full ${errors.companyEmail ? 'input-error' : ''}`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.companyEmail && <p className="text-error">{errors.companyEmail.message}</p>}
                        </div>
                        {/* Company Number */}
                        <div className='w-full'>
                            <div className="label">
                                <label className='label-text'>Company Number:</label>
                            </div>
                            <Controller
                                name="companyNumber"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Company Number is required' }}
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Your Company Number"
                                        className={`input input-bordered input-success w-full ${errors.companyNumber ? 'input-error' : ''}`}
                                        type="number"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.companyNumber && <p className="text-error">{errors.companyNumber.message}</p>}
                        </div>

                        {/* Company Whatsapp Number */}
                        <div className=''>
                            <div className="label">
                                <label className='label-text'>Company WhatsApp Number:</label>
                            </div>
                            <div className="">
                                <Controller
                                    name="companyWhatsappNumber"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <input
                                            placeholder="Enter Your WhatsApp Number"
                                            className={`input input-bordered input-success w-full ${errors.companyWhatsappNumber ? 'input-error' : ''}`}
                                            type="text"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.companyWhatsappNumber && <p className="text-error">{errors.companyWhatsappNumber.message}</p>}

                                {/* Autofill WhatsApp Number Button */}
                                {/* <button
                                    type="button"
                                    style={{ backgroundColor: currentColor }}
                                    className="btn join-item rounded-r-full text-white"
                                    onClick={() => {
                                        setValue('companyWhatsappNumber', getValues('companyNumber'));
                                        reset()
                                    }}
                                >
                                    Autofill
                                </button> */}
                            </div>
                        </div>

                        <div className="">
                            <div className="label">
                                <label className='label-text'>Company's Website:</label>
                            </div>
                            <Controller
                                name="companyWebsite"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Company's Website"
                                        className={`input input-bordered input-success w-full max-w-xs ${errors.companyWebsite ? 'input-error' : ''}`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.companyWebsite && <p className="text-error">{errors.companyWebsite.message}</p>}
                        </div>

                        {/* Company's Social Media Link (Facebook) */}
                        <div className="">
                            <div className="label">
                                <label className='label-text'>Company's Facebook Link:</label>
                            </div>
                            <Controller
                                name="companyFacebookLink"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Company's Facebook Link"
                                        className={`input input-bordered input-success w-full max-w-xs ${errors.companyFacebookLink ? 'input-error' : ''}`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.companyFacebookLink && <p className="text-error">{errors.companyFacebookLink.message}</p>}
                        </div>

                        {/* Company's Social Media Link (LinkedIn) */}
                        <div className="">
                            <div className="label">
                                <label className='label-text'>Company's LinkedIn Link:</label>
                            </div>
                            <Controller
                                name="companyLinkedInLink"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Company's LinkedIn Link"
                                        className={`input input-bordered input-success w-full max-w-xs ${errors.companyLinkedInLink ? 'input-error' : ''}`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.companyLinkedInLink && <p className="text-error">{errors.companyLinkedInLink.message}</p>}
                        </div>




                    </div>
                </div>

                {/* Add */}
                <div className="flex justify-center mt-10">
                    <button
                        style={{ backgroundColor: currentColor }}
                        type="submit"
                        className="btn"
                    >
                        <GrAdd className="w-4 h-4" />
                        Add Lead
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewLead;
