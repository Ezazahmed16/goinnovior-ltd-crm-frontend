import React, { useState } from 'react';
import Header from '../../../../shared/Header/Header';
import { AiFillDelete } from 'react-icons/ai';
import { useQuery, useMutation, useQueryClient } from 'react-query'; // Import useQueryClient
import axios from 'axios';
import toast from 'react-hot-toast';

const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    return response.data;
};
const deleteUser = async (userId) => {
    const response = await axios.delete(`http://localhost:5000/users/${userId}`);
    return response.data;
};

const AllUser = () => {
    const queryClient = useQueryClient(); // Get the query client instance
    const { data, isLoading, isError, refetch } = useQuery('users', fetchUsers);
    const [deletingUserId, setDeletingUserId] = useState(null); // Track the user being deleted

    const deleteUserMutation = useMutation(deleteUser, {
        // Callback for success
        onSuccess: () => {
            toast.success('User deleted successfully');
            console.log('User deleted successfully');
            queryClient.invalidateQueries('users'); 
            setDeletingUserId(null); // Reset the deletingUserId state
        },
    });

    const handleDeleteUser = async (userId) => {
        setDeletingUserId(userId); // Set the user being deleted
        try {
            // Call the mutation to delete the user
            await deleteUserMutation.mutateAsync(userId);
        } catch (error) {
            console.error('Error deleting user:', error);
            setDeletingUserId(null); // Reset the deletingUserId state in case of an error
        }
    };

    return (
        <div>
            <div className="m-2 md:m-10 mt-14 p-2 md:p-2 bg-main-bg rounded-3xl">
                <div className="">
                    <Header category="General Settings" title="All User" />
                </div>

                <div className="mb-5">
                    <div className="join">
                        <div>
                            <div>
                                <input className="input input-bordered join-item" placeholder="Search" />
                            </div>
                        </div>
                        <div className="indicator">
                            <button className="btn join-item">Search</button>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className='block m-auto'>
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : isError ? (
                    <p>Error loading data</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roles</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td className='flex'>
                                        {user.roles.map((role) => (
                                            <div className="">
                                                <p className='mx-1 bg-base-200 p-1 rounded-2xl'> {role} </p>
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <div className="tooltip tooltip-bottom" data-tip="Delete">
                                            <button
                                                onClick={() => handleDeleteUser(user._id)} 
                                                disabled={deletingUserId === user._id} 
                                            >
                                                {deletingUserId === user._id ? (
                                                    <span className="loading loading-xs"></span> 
                                                ) : (
                                                    <AiFillDelete className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default AllUser;
