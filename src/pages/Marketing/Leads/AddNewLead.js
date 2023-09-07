import React, { useEffect, useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useForm, Controller } from 'react-hook-form';
import { useStateContext } from '../../../contexts/ContextProvider';

const AddNewLead = () => {
    const { currentColor } = useStateContext();
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const [leadsData, setLeadsData] = useState([]); 

    const [phoneNumbers, setPhoneNumbers] = useState(['']); 

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

    const addPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, '']); // Add an empty phone number input
    };

    const removePhoneNumber = (index) => {
        const updatedPhoneNumbers = [...phoneNumbers];
        updatedPhoneNumbers.splice(index, 1); // Remove the phone number at the specified index
        setPhoneNumbers(updatedPhoneNumbers);
    };


    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-2 bg-main-bg rounded-3xl'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                {/* <div className="underline" style={{ color: currentColor }}>
                    <Link className='flex' to='/marketing/leads'>
                        <RiArrowGoBackLine className='w-6 h-6 mx-2' />
                        Go Back
                    </Link>
                </div> */}

                <h3 style={{ backgroundColor: currentColor }} className="font-bold text-2xl my-2 text-center p-3 rounded-lg text-white ">Add a new lead</h3>
                <div className="divider"></div>

                {/* General Information */}
                <div className="my-2">
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                        {/* First Name */}
                        <div className='w-full'>
                            <div className="label">
                                <label className='label-text'>First Name:</label>
                            </div>
                            <Controller
                                name="firstName"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'First Name is required' }}
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Your First Name"
                                        className={`input input-bordered input-success w-full ${errors.firstName ? 'input-error' : ''}`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.firstName && <p className="text-error">{errors.firstName.message}</p>}
                        </div>
                        {/* Last Name */}
                        <div className='w-full'>
                            <div className="label">
                                <label className='label-text'>Last Name:</label>
                            </div>
                            <Controller
                                name="lastName"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Last Name is required' }}
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Your Last Name"
                                        className={`input input-bordered input-success w-full ${errors.lastName ? 'input-error' : ''}`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.lastName && <p className="text-error">{errors.lastName.message}</p>}
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
                        {/* <div className='w-full'>
                            <div className="label">
                                <label className='label-text'>Number:</label>
                            </div>
                            <Controller
                                name="number"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Number is required',
                                    pattern: {
                                        value: /^[0-9]+$/, // Regular expression for one or more digits
                                        message: 'Invalid number format. Please enter digits only.',
                                    },
                                }}
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
                        </div> */}
                        {/* Number */}
                        <div className="">

                            {phoneNumbers.map((phoneNumber, index) => (
                                <div className='w-full' key={index}>
                                    <div className="label">
                                        <label className='label-text'>
                                            {index === 0 ? 'Number:' : 'Additional Number:'}
                                        </label>
                                    </div>
                                    <div className="join w-full">
                                        <Controller
                                            name={`number${index}`}
                                            control={control}
                                            defaultValue={phoneNumber}
                                            rules={{
                                                required: 'Number is required',
                                                pattern: {
                                                    value: /^[0-9]+$/, // Regular expression for one or more digits
                                                    message: 'Invalid number format. Please enter digits only.',
                                                },
                                            }}
                                            render={({ field }) => (
                                                <input
                                                    placeholder="Enter Your Number"
                                                    className={`input input-bordered join-item w-full ${errors[`number${index}`] ? 'input-error' : ''}`}
                                                    type="text"
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {
                                            <div div className="" >
                                                <button
                                                    type="button"
                                                    style={{ backgroundColor: currentColor }}
                                                    className="btn rounded-r-full join-item text-white"
                                                    onClick={addPhoneNumber}
                                                >
                                                    <GrAdd className="w-4 h-4" />
                                                </button>
                                            </div>
                                        }
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                className="btn join-item rounded-r-full bg-red-500 text-white"
                                                onClick={() => removePhoneNumber(index)}
                                            >
                                                <IoIosRemoveCircle className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    {errors[`number${index}`] && <p className="text-error">{errors[`number${index}`].message}</p>}
                                </div>
                            ))}
                        </div>
                        {/* WhatsApp Number */}
                        <div className='w-full'>
                            <div className="label">
                                <label className='label-text'>WhatsApp Number:</label>
                            </div>
                            <Controller
                                name="whatsappNumber"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'WhatsApp Number is required',
                                    pattern: {
                                        value: /^\+[0-9]+$/, // Regular expression for a plus sign followed by digits
                                        message: 'Invalid WhatsApp Number format. It should start with a plus sign and contain only digits.',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Your WhatsApp Number"
                                        className={`input input-bordered input-success w-full ${errors.whatsappNumber ? 'input-error' : ''}`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.whatsappNumber && <p className="text-error">{errors.whatsappNumber.message}</p>}
                        </div>
                        {/* Company Name */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Company Name:</span>
                            </label>
                            <Controller
                                name="companyName"
                                control={control}
                                defaultValue="" // Use defaultValue here
                                rules={{ required: 'Company Name is required' }}
                                render={({ field }) => (
                                    <select
                                        className={`select select-bordered ${errors.companyName ? 'input-error' : ''}`}
                                        {...field}
                                    >
                                        <option disabled value="">
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

                        {/* Position */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Position:</span>
                            </label>
                            <Controller
                                name="position"
                                control={control}
                                defaultValue="" // Use defaultValue here
                                rules={{ required: 'Position is required' }}
                                render={({ field }) => (
                                    <select
                                        className={`select select-bordered ${errors.position ? 'input-error' : ''}`}
                                        {...field}
                                    >
                                        <option disabled value="">
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
            </form >
        </div >
    );
};

export default AddNewLead;
