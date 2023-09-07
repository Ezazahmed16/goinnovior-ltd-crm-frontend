import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useStateContext } from '../../../../contexts/ContextProvider';
import { GrAdd } from 'react-icons/gr';
import { IoIosRemoveCircle } from 'react-icons/io';

const AddCompanyForm = () => {
    const { currentColor } = useStateContext();
    const [phoneNumbers, setPhoneNumbers] = useState(['']);
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();
    const onSubmit = (data) => {
        // Handle form submission logic here
        console.log('Form data:', data);

        reset(); // Clear the form after submission
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
        <div className='m-2 md:m-10 mt-5 md:mt-24 p-2 md:p-2 bg-main-bg rounded-3xl'>
            <h3 style={{ backgroundColor: currentColor }} className="font-bold text-xl md:text-2xl md:my-2 text-center p-3 rounded-lg text-white ">Add Company Information</h3>
            <div className="divider"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                    {/* Company Name */}
                    <div className="form-field">
                        <label className="form-label">Company Name:</label>
                        <Controller
                            name="companyName"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Company Name is required' }}
                            render={({ field }) => (
                                <input
                                    placeholder="Enter Company Name"
                                    className={`input input-bordered input-success w-full ${errors.companyName ? 'input-error' : ''}`}
                                    type="text"
                                    {...field}
                                />
                            )}
                        />
                        {errors.companyName && <p className="form-error">{errors.companyName.message}</p>}
                    </div>

                    {/* Company Type */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Company Type:</span>
                        </label>
                        <Controller
                            name="companyType"
                            control={control}
                            defaultValue="" // Use defaultValue here
                            rules={{ required: 'Company type is required' }}
                            render={({ field }) => (
                                <select
                                    className={`select select-bordered ${errors.companyType ? 'input-error' : ''}`}
                                    {...field}
                                >
                                    <option disabled value="">
                                        Select Company Name
                                    </option>
                                    <option value="Company1">It Company</option>
                                    <option value="Company2">Textile Industry</option>
                                    <option value="Company3">xyz 3</option>
                                </select>
                            )}
                        />
                        {errors.companyType && <p className="text-error">{errors.companyType.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-field">
                        <label className="form-label">Email:</label>
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
                                    placeholder="Enter Email"
                                    className={`input input-bordered input-success w-full ${errors.email ? 'input-error' : ''}`}
                                    type="text"
                                    {...field}
                                />
                            )}
                        />
                        {errors.email && <p className="form-error">{errors.email.message}</p>}
                    </div>

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
                    <div className="form-field">
                        <label className="form-label">WhatsApp Number:</label>
                        <Controller
                            name="whatsappNumber"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'WhatsApp Number is required',
                                pattern: {
                                    value: /^\+[0-9]+$/,
                                    message: 'Invalid WhatsApp Number format. It should start with a plus sign and contain only digits.',
                                },
                            }}
                            render={({ field }) => (
                                <input
                                    placeholder="Enter WhatsApp Number"
                                    className={`input input-bordered input-success w-full ${errors.whatsappNumber ? 'input-error' : ''}`}
                                    type="text"
                                    {...field}
                                />
                            )}
                        />
                        {errors.whatsappNumber && <p className="form-error">{errors.whatsappNumber.message}</p>}
                    </div>

                    {/* LinkedIn URL */}
                    <div className="form-field">
                        <label className="form-label">LinkedIn URL:</label>
                        <Controller
                            name="linkedinUrl"
                            control={control}
                            defaultValue=""
                            // You can add validation rules for LinkedIn URL here
                            render={({ field }) => (
                                <input
                                    placeholder="Enter LinkedIn URL"
                                    className={`input input-bordered input-success w-full ${errors.linkedinUrl ? 'input-error' : ''}`}
                                    type="text"
                                    {...field}
                                />
                            )}
                        />
                        {errors.linkedinUrl && <p className="form-error">{errors.linkedinUrl.message}</p>}
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
                        Add Company
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCompanyForm