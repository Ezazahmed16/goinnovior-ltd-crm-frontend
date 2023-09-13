import React, { useState } from 'react';
import axios from 'axios';
import { QueryClient, useQuery } from 'react-query'; // Import QueryClient
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const AddCompanyType = () => {
    const [deletingItemId, setDeletingItemId] = useState(null);

    // Define the fetchCompanyTypes function to fetch data
    const fetchCompanyTypes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/companyType');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch company types: ' + error.message);
        }
    };

    const queryClient = new QueryClient(); // Create a new QueryClient

    // Fetch existing company types using React Query
    const { data: existingCompanyTypes, isLoading, isError, refetch } = useQuery(
        'companyTypes',
        fetchCompanyTypes
    );

    const deleteCompanyType = async (companyId) => {
        try {
            setDeletingItemId(companyId);

            await axios.delete(`http://localhost:5000/api/companyType/${companyId}`);

            setDeletingItemId(null);

            refetch();
        } catch (error) {
            setDeletingItemId(null);
            console.error('Error deleting company type:', error);
        }
    };


    return (
        <div>
            {isLoading ? (
                <p className='text-center'>
                    <span className="loading loading-ring loading-lg"></span>
                </p>
            ) : isError ? (
                <p>Error fetching company types</p>
            ) : (
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Company Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Map through companysData and generate rows */}
                        {existingCompanyTypes.map((companyType) => (
                            <tr key={companyType._id}>
                                <td className=''>{companyType.name}</td>
                                <th>
                                    <div className="tooltip tooltip-bottom mx-1" data-tip="Edit">
                                        <button>
                                            <AiFillEdit className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="tooltip tooltip-bottom" data-tip="Delete">
                                        {deletingItemId === companyType._id ? (
                                            <span className="loading loading-sm"></span>
                                        ) : (
                                            <button
                                                onClick={() => deleteCompanyType(companyType._id)}
                                                disabled={deletingItemId === companyType._id}
                                            >
                                                <AiFillDelete className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AddCompanyType;
