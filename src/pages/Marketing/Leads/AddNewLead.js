import React, { useEffect, useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { useStateContext } from '../../../contexts/ContextProvider';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useAuthUser } from 'react-auth-kit';

const AddNewLead = () => {
    const { currentColor } = useStateContext();
    const auth = useAuthUser();
    const [showAdditionalNumber, setShowAdditionalNumber] = useState(false);

console.log(auth().name)

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm();

    const queryClient = useQueryClient();

    const addLeadMutation = useMutation((data) =>
        axios.post('http://localhost:5000/api/leads', data)
    );

    // State to store company, department, and position data
    const [companyOptions, setCompanyOptions] = useState([]);
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [positionOptions, setPositionOptions] = useState([]);
    const [companyTypeOptions, setCompanyTypeOptions] = useState([]);

    // Function to fetch company data
    const fetchCompanyData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/companies');
            const options = response.data.map((company) => ({
                value: company._id,
                label: company.companyName,
            }));
            setCompanyOptions(options);
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };

    // Function to fetch company type data
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

    // Function to fetch department data
    const fetchDepartmentData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/departments');
            const options = response.data.map((department) => ({
                value: department._id,
                label: department.departmentName,
            }));
            setDepartmentOptions(options);
        } catch (error) {
            console.error('Error fetching department data:', error);
        }
    };

    // Function to fetch position data
    const fetchPositionData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/add-positions');
            const options = response.data.map((position) => ({
                value: position._id,
                label: position.positionName,
            }));
            setPositionOptions(options);
        } catch (error) {
            console.error('Error fetching position data:', error);
        }
    };

    // Fetch company, department, and position data when the component mounts
    useEffect(() => {
        fetchCompanyData();
        fetchCompanyTypeData();
        fetchDepartmentData();
        fetchPositionData();
    }, []);

    const onAddLead = async (data) => {
        try {
            // Calculate the fullName by combining first and last names
            const fullName = `${data.firstname} ${data.lastname}`;

            // Merge user's authentication data into the form data
            const formDataWithAuth = {
                ...data,
                fullName, // Changed "fullname" to "fullName"
                authData: auth().name,
            };

            await addLeadMutation.mutateAsync(formDataWithAuth);

            toast.success('Lead added successfully');
            // Refetch the leads data after adding a new lead
            queryClient.invalidateQueries('leads');
        } catch (error) {
            console.error('Error adding lead:', error);
        }
    };

    const toggleAdditionalNumber = () => {
        setShowAdditionalNumber(!showAdditionalNumber);
    };

    const onSubmit = async (data) => {
        try {
            await onAddLead(data);
            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="m-2 md:m-10 md:mt-5 p-2 md:p-2 bg-main-bg rounded-3xl">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <h3
                    style={{ backgroundColor: currentColor }}
                    className="font-bold text-xl md:text-2xl md:my-2 text-center p-3 rounded-lg text-white"
                >
                    Add a new lead
                </h3>
                <div className="divider" />

                {/* General Information */}
                <div className="my-2">
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                        {/* First Name */}
                        <div className="w-full">
                            <div className="label">
                                <label htmlFor="firstname" className="label-text">
                                    First Name:
                                </label>
                            </div>
                            <Controller
                                name="firstname"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'First Name is required' }}
                                render={({ field }) => (
                                    <input
                                        id="firstname"
                                        placeholder="Enter Your First Name"
                                        className={`input input-bordered input-success w-full ${
                                            errors.firstname ? 'input-error' : ''
                                        }`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.firstname && (
                                <p className="text-error">{errors.firstname.message}</p>
                            )}
                        </div>
                        {/* Last Name */}
                        <div className="w-full">
                            <div className="label">
                                <label className="label-text">Last Name:</label>
                            </div>
                            <Controller
                                name="lastname"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Last Name is required' }}
                                render={({ field }) => (
                                    <input
                                        id="lastname"
                                        placeholder="Enter Your Last Name"
                                        className={`input input-bordered input-success w-full ${
                                            errors.lastname ? 'input-error' : ''
                                        }`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.lastname && (
                                <p className="text-error">{errors.lastname.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="w-full">
                            <div className="label">
                                <label className="label-text">Email:</label>
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
                                        className={`input input-bordered input-success w-full ${
                                            errors.email ? 'input-error' : ''
                                        }`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.email && (
                                <p className="text-error">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div className="w-full">
                            <div className="label">
                                <label className="label-text">Phone Number:</label>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <Controller
                                    name="phoneNumbers.primary" // Update the field name
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Phone Number is required',
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Invalid number format. Please enter digits only.',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <input
                                            placeholder="Enter Your Phone Number"
                                            className={`input input-bordered input-success w-full ${
                                                errors['phoneNumbers.primary'] ? 'input-error' : ''
                                            }`}
                                            type="text"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors['phoneNumbers.primary'] && (
                                    <p className="text-error">{errors['phoneNumbers.primary'].message}</p>
                                )}
                                <div className="flex justify-center">
                                    {showAdditionalNumber ? (
                                        <button type="button" className="btn" onClick={toggleAdditionalNumber}>
                                            <FaMinus />
                                        </button>
                                    ) : (
                                        <button type="button" className="btn" onClick={toggleAdditionalNumber}>
                                            <FaPlus />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Additional Number */}
                        {showAdditionalNumber && (
                            <div className="w-full">
                                <div className="label">
                                    <label htmlFor="additionalNumber" className="label-text">
                                        Additional Number:
                                    </label>
                                </div>
                                <Controller
                                    name="phoneNumbers.additional" // Update the field name
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Additional Number is required' }}
                                    render={({ field }) => (
                                        <input
                                            id="additionalNumber"
                                            placeholder="Enter Additional Number"
                                            className={`input input-bordered input-success w-full ${
                                                errors['phoneNumbers.additional'] ? 'input-error' : ''
                                            }`}
                                            type="text"
                                            {...field}
                                        />
                                    )}
                                />
                                {errors['phoneNumbers.additional'] && (
                                    <p className="text-error">{errors['phoneNumbers.additional'].message}</p>
                                )}
                            </div>
                        )}

                        {/* WhatsApp Number */}
                        <div className="w-full">
                            <div className="label">
                                <label className="label-text">WhatsApp Number:</label>
                            </div>
                            <Controller
                                name="whatsappNumber"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'WhatsApp Number is required',
                                    pattern: {
                                        message: 'Invalid WhatsApp Number format. It should start with a plus sign and contain only digits.',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        placeholder="Enter Your WhatsApp Number"
                                        className={`input input-bordered input-success w-full ${
                                            errors.whatsappNumber ? 'input-error' : ''
                                        }`}
                                        type="text"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.whatsappNumber && (
                                <p className="text-error">{errors.whatsappNumber.message}</p>
                            )}
                        </div>

                        {/* Company Name */}
                        <div className="form-control w-full">
                            <label htmlFor="companyName" className="label">
                                <span className="label-text">Company Name:</span>
                            </label>
                            <Controller
                                name="companyName"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Company Name is required' }}
                                render={({ field }) => (
                                    <select
                                        id="companyName"
                                        className={`select select-bordered ${errors.companyName ? 'input-error' : ''}`}
                                        {...field}
                                    >
                                        <option disabled value="">
                                            Select Company Name
                                        </option>
                                        {companyOptions.map((option) => (
                                            <option key={option.value} value={option.label}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.companyName && (
                                <p className="text-error">{errors.companyName.message}</p>
                            )}
                        </div>

                        {/* Company Type */}
                        <div className="form-control w-full">
                            <label htmlFor="companyType" className="label">
                                <span className="label-text">Company Type:</span>
                            </label>
                            <Controller
                                name="companyType"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Company Type is required' }}
                                render={({ field }) => (
                                    <select
                                        id="companyType"
                                        className={`select select-bordered ${errors.companyType ? 'input-error' : ''}`}
                                        {...field}
                                    >
                                        <option disabled value="">
                                            Select Company Type
                                        </option>
                                        {companyTypeOptions.map((option) => (
                                            <option key={option.value} value={option.label}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.companyType && (
                                <p className="text-error">{errors.companyType.message}</p>
                            )}
                        </div>

                        {/* Department */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Department:</span>
                            </label>
                            <Controller
                                name="department"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Department is required' }}
                                render={({ field }) => (
                                    <select className={`select select-bordered ${errors.department ? 'input-error' : ''}`} {...field}>
                                        <option disabled value="">
                                            Select Department
                                        </option>
                                        {departmentOptions.map((option) => (
                                            <option key={option.value} value={option.label}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.department && (
                                <p className="text-error">{errors.department.message}</p>
                            )}
                        </div>

                        {/* Position */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Position:</span>
                            </label>
                            <Controller
                                name="position"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Position is required' }}
                                render={({ field }) => (
                                    <select className={`select select-bordered ${errors.position ? 'input-error' : ''}`} {...field}>
                                        <option disabled value="">
                                            Select Position
                                        </option>
                                        {positionOptions.map((option) => (
                                            <option key={option.value} value={option.label}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            {errors.position && (
                                <p className="text-error">{errors.position.message}</p>
                            )}
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
