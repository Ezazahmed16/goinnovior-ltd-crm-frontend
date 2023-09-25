import React, { useState } from 'react';
import { GrView } from 'react-icons/gr';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useMutation, useQueryClient } from 'react-query'; // Import useMutation and useQueryClient
import axios from 'axios';
import toast from 'react-hot-toast';

const LeadsList = ({ leadsData, itemsPerPage, currentPage }) => {
    const queryClient = useQueryClient(); // Initialize the query client


    const deleteLeadMutation = useMutation(
        async (leadId) => {
            await axios.delete(`http://localhost:5000/api/leads/${leadId}`);
        },
        {
            onMutate: (leadId) => {
                const snapshot = queryClient.getQueryData('leads'); // Get data using the query client
                queryClient.setQueryData('leads', (prevData) => {
                    return prevData.filter((lead) => lead.id !== leadId);
                });
                return { snapshot };
            },
            onSuccess: () => {
                toast.success('Successfully Deleted');
                queryClient.invalidateQueries('leads'); // Refetch 'leads' query after successful deletion
                // setLoadingButtonId(null); // Reset the button in loading state

            },
        }
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = leadsData?.slice(startIndex, endIndex);

    const handleDelete = (leadId) => {
        deleteLeadMutation.mutate(leadId);
    };

    return (
        <div>
            <div className="overflow-x-auto bg-base-200 p-5 rounded-xl">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Org. Name</th>
                            <th>Org. Contact Info</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((lead) => (
                            <tr key={lead.id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{lead.fullName}</div>
                                            <div className="text-sm opacity-50">{lead.position}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{lead.companyName}</td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">
                                        {lead.phoneNumbers}
                                    </span>
                                    <br />
                                    <a className='hover:underline' href={`mailto:${lead.email}`}>
                                        {lead.email}
                                    </a>
                                </td>
                                <th>
                                    <div className="tooltip tooltip-bottom" data-tip="View">
                                        <button>
                                            <GrView className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="tooltip tooltip-bottom mx-1" data-tip="Edit">
                                        <button>
                                            <AiFillEdit className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="tooltip tooltip-bottom" data-tip="Delete">
                                        <button onClick={() => handleDelete(lead._id)} disabled={deleteLeadMutation.isLoading}>
                                            {deleteLeadMutation.isLoading ? 'Deleting...' : <AiFillDelete className="w-5 h-5" />}
                                        </button>
                                    </div>

                                </th>
                            </tr>
                        ))}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Org. Name</th>
                            <th>Org. Contact Info</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default LeadsList;
