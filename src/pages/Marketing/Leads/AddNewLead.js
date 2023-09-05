import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
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
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
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
                        {/* Position */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Position:</span>
                            </label>
                            <Controller
                                name="position"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Position is required' }}
                                render={({ field }) => (
                                    <select
                                        className={`select select-bordered ${errors.position ? 'input-error' : ''}`}
                                        {...field}
                                    >
                                        <option disabled selected value="">
                                            Select Position
                                        </option>
                                        <option value="Position1">CEO</option>
                                        <option value="Position2">Founder</option>
                                        <option value="Position3">IT Head</option>
                                        {/* Add more options as needed */}
                                    </select>
                                )}
                            />
                            {errors.position && <p className="text-error">{errors.position.message}</p>}
                        </div>

                    </div>
                </div>

                {/* Company Information */}
                <div className="mt-2">
                    <h3 style={{ backgroundColor: currentColor }} className="font-bold text-xl mb-2 p-2 text-center text-white">Company's Information:</h3>
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-4 justify-start gap-5">
                        {/* Company Name */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Company Name:</span>
                            </label>
                            <Controller
                                name="companyName"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Company Name is required' }}
                                render={({ field }) => (
                                    <select
                                        className={`select select-bordered ${errors.companyName ? 'input-error' : ''}`}
                                        {...field}
                                    >
                                        <option disabled selected value="">
                                            Select Company Name
                                        </option>
                                        <option value="Company1">Company 1</option>
                                        <option value="Company2">bbdz 2</option>
                                        <option value="Company3">xyz 3</option>
                                        {/* Add more options as needed */}
                                    </select>
                                )}
                            />
                            {errors.companyName && <p className="text-error">{errors.companyName.message}</p>}
                        </div>
                        {/* Company Email */}
                        <div className='w-full'>
                            <div className="label">
                                <label className='label-text'>Company's Email:</label>
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
                                <label className='label-text'>Company's Number:</label>
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
                                <label className='label-text'>Company's WhatsApp Number:</label>
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

                        {/* Company's Address */}
                        <div className="md:col-span-2 lg:col-span-4">
                            <div className="grid grid-cols-4">

                            </div>
                        </div>

                        {/* Company Website  */}
                        <div className="">
                            <div className="label">
                                <label className='label-text'>Company's Website URL:</label>
                            </div>
                            <Controller
                                name="companyWebsite"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Company's Website"
                                        className={`input input-bordered input-success w-full ${errors.companyWebsite ? 'input-error' : ''}`}
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
                                        className={`input input-bordered input-success w-full ${errors.companyFacebookLink ? 'input-error' : ''}`}
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
                                        className={`input input-bordered input-success w-full ${errors.companyLinkedInLink ? 'input-error' : ''}`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.companyLinkedInLink && <p className="text-error">{errors.companyLinkedInLink.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Leads Information */}
                <div className="my-2">
                    <h3 style={{ backgroundColor: currentColor }} className="font-bold text-xl mb-2 p-2 text-center text-white">Lead Information</h3>
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
                        {/* Lead */}
                        <div className='w-full'>
                            <div className="label">
                                <label className='label-text'>Lead Value:</label>
                            </div>
                            <label className="input-group">
                                <Controller
                                    name="lead"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Lead is required' }}
                                    render={({ field }) => (
                                        <input
                                            placeholder="Enter Lead"
                                            className={`input input-bordered input-success w-full ${errors.lead ? 'input-error' : ''}`}
                                            type="text"
                                            {...field}
                                        />
                                    )}
                                />
                                <span> <FaRegMoneyBillAlt /> </span>
                            </label>
                            {errors.lead && <p className="text-error">{errors.lead.message}</p>}
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
