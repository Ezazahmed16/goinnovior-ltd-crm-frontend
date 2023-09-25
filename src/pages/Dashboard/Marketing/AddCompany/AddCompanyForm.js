import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GrAdd } from 'react-icons/gr';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useStateContext } from '../../../../contexts/ContextProvider';

const AddCompanyForm = () => {
    const { currentColor } = useStateContext();
    const [companyTypeOptions, setCompanyTypeOptions] = useState([]);

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const queryClient = useQueryClient();

    const addCompany = useMutation(
        (data) => axios.post('http://localhost:5000/api/companies', data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('companies');
                toast.success('Company Information Added');
                reset();
            },
        }
    );

    const onSubmit = (data) => {
        // Now you can send the form data
        addCompany.mutate(data);
    };

    useEffect(() => {
        // Fetch company type data when the component mounts
        const fetchCompanyTypeData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/companyType');
                const options = response.data.map((company) => ({
                    value: company._id,
                    label: company.name,
                }));
                setCompanyTypeOptions(options);
            } catch (error) {
                console.error('Error fetching company type data:', error);
            }
        };
        fetchCompanyTypeData();
    }, []);

    return (
        <div className='m-2 md:m-10 md:mt-5 p-2 md:p-2 bg-main-bg rounded-3xl'>
            <h3 style={{ backgroundColor: currentColor }} className='font-bold text-xl md:text-2xl md:my-2 text-center p-3 rounded-lg text-white'>
                Add Company Information
            </h3>
            <div className='divider'></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full'>
                    {/* Company Name */}
                    <div className='form-field'>
                        <label className='form-label'>Company Name:</label>
                        <Controller
                            name='companyName'
                            control={control}
                            defaultValue=''
                            rules={{ required: 'Company Name is required' }}
                            render={({ field }) => (
                                <input
                                    placeholder='Enter Company Name'
                                    className={`input input-bordered input-success w-full ${errors.companyName ? 'input-error' : ''}`}
                                    type='text'
                                    {...field}
                                />
                            )}
                        />
                        {errors.companyName && <p className='form-error'>{errors.companyName.message}</p>}
                    </div>

                    {/* Company Type */}
                    <div className='form-control w-full'>
                        <label htmlFor='companyType' className='label p-0'>
                            <span className='label-text'>Company Type:</span>
                        </label>
                        <Controller
                            name='companyType'
                            control={control}
                            defaultValue=''
                            rules={{ required: 'Company Type is required' }}
                            render={({ field }) => (
                                <select
                                    id='companyType'
                                    className={`select select-bordered ${errors.companyType ? 'input-error' : ''}`}
                                    {...field}
                                >
                                    <option disabled value=''>
                                        Select Company Type
                                    </option>
                                    {companyTypeOptions.map((option) => (
                                        <option key={option.value} value={option.lable}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                        {errors.companyType && <p className='text-error'>{errors.companyType.message}</p>}
                    </div>

                    {/* Email */}
                    <div className='form-field'>
                        <label className='form-label'>Email:</label>
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
                                    placeholder='Enter Email'
                                    className={`input input-bordered input-success w-full ${errors.email ? 'input-error' : ''}`}
                                    type='text'
                                    {...field}
                                />
                            )}
                        />
                        {errors.email && <p className='form-error'>{errors.email.message}</p>}
                    </div>

                    {/* Number */}
                    <div className=''>
                        <div className='w-full'>
                            <div className='label p-0'>
                                <label className='label-text'>Number:</label>
                            </div>
                            <div className='join w-full'>
                                <Controller
                                    name='number'
                                    control={control}
                                    defaultValue=''
                                    rules={{
                                        required: 'Number is required',
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Invalid number format. Please enter digits only.',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <input
                                            placeholder='Enter Your Number'
                                            className={`input input-bordered join-item w-full ${errors.number ? 'input-error' : ''}`}
                                            type='text'
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            {errors.number && <p className='text-error'>{errors.number.message}</p>}
                        </div>
                    </div>

                    {/* WhatsApp Number */}
                    <div className='form-field'>
                        <label className='form-label'>WhatsApp Number:</label>
                        <Controller
                            name='whatsappNumber'
                            control={control}
                            defaultValue=''
                            rules={{
                                required: 'WhatsApp Number is required',
                                pattern: {
                                    value: /^\+[0-9]+$/,
                                    message: 'Invalid WhatsApp Number format. It should start with a plus sign and contain only digits.',
                                },
                            }}
                            render={({ field }) => (
                                <input
                                    placeholder='Enter WhatsApp Number'
                                    className={`input input-bordered input-success w-full ${errors.whatsappNumber ? 'input-error' : ''}`}
                                    type='text'
                                    {...field}
                                />
                            )}
                        />
                        {errors.whatsappNumber && <p className='form-error'>{errors.whatsappNumber.message}</p>}
                    </div>

                    {/* LinkedIn URL */}
                    <div className='form-field'>
                        <label className='form-label'>LinkedIn URL:</label>
                        <Controller
                            name='linkedinUrl'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <input
                                    placeholder='Enter LinkedIn URL'
                                    className={`input input-bordered input-success w-full ${errors.linkedinUrl ? 'input-error' : ''}`}
                                    type='text'
                                    {...field}
                                />
                            )}
                        />
                        {errors.linkedinUrl && <p className='form-error'>{errors.linkedinUrl.message}</p>}
                    </div>

                    {/* Company Website */}
                    <div className='form-field'>
                        <label className='form-label'>Company Website:</label>
                        <Controller
                            name='companyWebsite'
                            control={control}
                            defaultValue=''
                            render={({ field }) => (
                                <input
                                    placeholder='Enter Company Website'
                                    className={`input input-bordered input-success w-full ${errors.companyWebsite ? 'input-error' : ''}`}
                                    type='text'
                                    {...field}
                                />
                            )}
                        />
                        {errors.companyWebsite && <p className='form-error'>{errors.companyWebsite.message}</p>}
                    </div>

                    {/* Company Address */}
                    <div className='form-field md:col-span-3'>
                        <label className='form-label'>Company Address:</label>
                        <div className='grid grid-cols-3 gap-5'>
                            {/* Country */}
                            <div className=''>
                                <Controller
                                    name='companyCountry'
                                    control={control}
                                    defaultValue=''
                                    render={({ field }) => (
                                        <input
                                            placeholder='Country'
                                            className={`input input-bordered input-success w-full ${errors.companyCountry ? 'input-error' : ''}`}
                                            type='text'
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.companyCountry && <p className='form-error'>{errors.companyCountry.message}</p>}
                            </div>

                            {/* City */}
                            <div className=''>
                                <Controller
                                    name='companyCity'
                                    control={control}
                                    defaultValue=''
                                    render={({ field }) => (
                                        <input
                                            placeholder='City'
                                            className={`input input-bordered input-success w-full ${errors.companyCity ? 'input-error' : ''}`}
                                            type='text'
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.companyCity && <p className='form-error'>{errors.companyCity.message}</p>}
                            </div>

                            {/* Area */}
                            <div className=''>
                                <Controller
                                    name='companyArea'
                                    control={control}
                                    defaultValue=''
                                    render={({ field }) => (
                                        <input
                                            placeholder='Area'
                                            className={`input input-bordered input-success w-full ${errors.companyArea ? 'input-error' : ''}`}
                                            type='text'
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.companyArea && <p className='form-error'>{errors.companyArea.message}</p>}
                            </div>
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
                        Add Company
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCompanyForm;
