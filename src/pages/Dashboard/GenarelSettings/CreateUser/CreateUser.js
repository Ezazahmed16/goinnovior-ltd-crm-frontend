import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Header from '../../../../shared/Header/Header';
import Select from 'react-select';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { useStateContext } from '../../../../contexts/ContextProvider';
import { useMutation } from 'react-query'; // Import the useMutation hook
import axios from 'axios'; // Import Axios
import toast, { Toaster } from 'react-hot-toast';

const rolesOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'client', label: 'Client' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'HR' },
    { value: 'employee', label: 'Employee' },
    { value: 'accounts', label: 'Accounts' },
];

const CreateUser = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm();
    const { currentColor } = useStateContext();

    // Define the mutation function for creating a user
    const createUserMutation = useMutation(
        (data) => axios.post('http://localhost:5000/users', data), // Update the API endpoint URL
        {
            // Define callbacks for success and error cases
            onSuccess: () => {
                console.log('User created successfully!');
                toast.success('User created successfully')
                reset({ name: '', password: '', roles: '' }); // Reset the form on success
            },
            onError: (error) => {
                console.error('Error creating user:', error);
            },
        }
    ); 

    const onSubmit = async (data) => {
        try {
            // Extract the values from the selected options
            const roles = data.roles.map((role) => role.value);

            // Update the data object to include roles as an array of strings
            data.roles = roles;

            console.log(data);

            // Call the mutation to create the user
            await createUserMutation.mutateAsync(data);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };


    return (
        <div>
            <div className="m-2 md:m-10 mt-14 p-2 md:p-2 bg-white rounded-3xl">
                <Header category="General Settings" title="Create User" />

                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="md:flex w-full gap-5">
                            <div className="mb-4 w-full">
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Name is required' }}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder="Name"
                                                className="input input-bordered w-full"
                                            />
                                            {errors.name && (
                                                <p className="text-red-500">{errors.name.message}</p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                            <div className="mb-4 w-full">
                                <Controller
                                    name="password" // Fixed the name attribute
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'Password is required' }}
                                    render={({ field }) => (
                                        <>
                                            <input
                                                {...field}
                                                type="password"
                                                placeholder="Password"
                                                className="input input-bordered w-full"
                                            />
                                            {errors.password && (
                                                <p className="text-red-500">{errors.password.message}</p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <Controller
                                name="roles"
                                control={control}
                                defaultValue={[]}
                                rules={{ required: 'At least one role is required' }}
                                render={({ field }) => (
                                    <>
                                        <Select
                                            {...field}
                                            options={rolesOptions}
                                            isMulti
                                            className="input input-bordered w-full"
                                        />
                                        {errors.roles && (
                                            <p className="text-red-500">{errors.roles.message}</p>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        <div>
                            <CustomButton
                                color={currentColor}
                                text="Create User"
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
