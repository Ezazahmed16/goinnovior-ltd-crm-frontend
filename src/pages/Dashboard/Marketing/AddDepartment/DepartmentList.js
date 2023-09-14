import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import toast from 'react-hot-toast';

const DepartmentList = () => {
    const queryClient = useQueryClient();

    // Fetch departments
    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/departments');
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch departments: ' + error.message);
        }
    };

    // Delete department function
    const deleteDepartmentAPI = async (departmentId) => {
        try {
            await axios.delete(`http://localhost:5000/api/departments/${departmentId}`);
            toast.success('Successfully Deleted')
            // Refetch the departments after successful deletion
            queryClient.invalidateQueries('departments');
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };

    // Use the useQuery hook to fetch departments
    const { data: departmentData, isLoading, isError } = useQuery('departments', fetchDepartments);

    // State to track the ID of the department currently being deleted
    const [deletingDepartmentId, setDeletingDepartmentId] = useState(null);

    // Handle delete button click
    const handleDeleteClick = (departmentId) => {
        setDeletingDepartmentId(departmentId);
        deleteDepartmentAPI(departmentId);
        setDeletingDepartmentId(null);
    };

    return (
        <div>
            {isLoading ? (
                <p className="text-center">
                    <span className="loading loading-ring loading-lg"></span>
                </p>
            ) : isError ? (
                <p>Error fetching departments</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Department Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departmentData.map((department) => (
                            <tr key={department._id}>
                                <td className="">{department.departmentName}</td>
                                <th>
                                    <div className="tooltip tooltip-bottom mx-1" data-tip="Edit">
                                        <button>
                                            <AiFillEdit className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="tooltip tooltip-bottom" data-tip="Delete">
                                        <button
                                            onClick={() => handleDeleteClick(department._id)}
                                            disabled={deletingDepartmentId === department._id}
                                        >
                                            {deletingDepartmentId === department._id ? (
                                                <span className="loading loading-sm"></span>
                                            ) : (
                                                <AiFillDelete className="w-5 h-5" />
                                            )}
                                        </button>
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

export default DepartmentList;
