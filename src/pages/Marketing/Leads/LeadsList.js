import React, { useState } from 'react';
import { GrView } from 'react-icons/gr';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const LeadsList = ({ leadsData, itemsPerPage, currentPage }) => {
    const queryClient = useQueryClient();
    const [loadingStates, setLoadingStates] = useState({});

    const sortedLeadsData = leadsData?.sort((a, b) => {
        return new Date(b.leadEntryDate) - new Date(a.leadEntryDate);
    });

    const deleteLeadMutation = useMutation(
        async (leadId) => {
            await axios.delete(`http://localhost:5000/api/leads/${leadId}`);
        },
        {
            onMutate: (leadId) => {
                const snapshot = queryClient.getQueryData('leads');
                queryClient.setQueryData('leads', (prevData) => {
                    return prevData.filter((lead) => lead.id !== leadId);
                });
                setLoadingStates((prevStates) => ({
                    ...prevStates,
                    [leadId]: true,
                }));
                return { snapshot };
            },
            onSuccess: () => {
                toast.success('Successfully Deleted');
                queryClient.invalidateQueries('leads');
            },
            onError: (error) => {
                const leadId = error.config.data; 
                setLoadingStates((prevStates) => ({
                    ...prevStates,
                    [leadId]: false,
                }));
            },
        }
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = sortedLeadsData?.slice(startIndex, endIndex);

    const handleDelete = (leadId) => {
        if (!loadingStates[leadId]) {
            deleteLeadMutation.mutate(leadId);
        }
    };

    return (
        <div>
            <div className="overflow-x-auto bg-base-200 p-5 rounded-xl">
                <table className="table table-xs">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Organization</th>
                            <th>Number</th>
                            <th>Whatsapp</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((lead) => (
                            <tr key={lead?._id}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{lead.fullName}</div>
                                            <div className="text-sm opacity-50">{lead.position}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{lead?.companyName}</td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">
                                        {lead?.phoneNumbers.primary}
                                    </span>
                                    <br />
                                    <span>
                                        {lead?.phoneNumbers.additional}
                                    </span>
                                </td>
                                <td>{lead?.email}</td>
                                <th>
                                    <div className="tooltip tooltip-bottom" data-tip="View">
                                        <Link to={`/marketing-leads/${lead._id}`}>
                                            <button>
                                                <GrView className="w-5 h-5" />
                                            </button>
                                        </Link>
                                    </div>

                                    <div className="tooltip tooltip-bottom mx-1" data-tip="Edit">
                                        <button>
                                            <AiFillEdit className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="tooltip tooltip-bottom" data-tip="Delete">
                                        <button
                                            onClick={() => handleDelete(lead._id)}
                                            disabled={loadingStates[lead._id]}
                                        >
                                            {loadingStates[lead._id] ? (
                                                <span className="loading loading-small"></span>
                                            ) : (
                                                <AiFillDelete className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                        <th>Name</th>
                            <th>Organization</th>
                            <th>Number</th>
                            <th>Whatsapp</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default LeadsList;
