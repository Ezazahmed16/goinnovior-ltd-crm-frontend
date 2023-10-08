import React from 'react';
import { GrCaretNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery, useQueryClient } from 'react-query';

const InterviewList = ({ employData }) => {
    const queryClient = useQueryClient(); // Initialize the query client

    const { data: interviewData, refetch } = useQuery(
        'interviewData', // Provide a unique query key
        async () => {
            const response = await axios.get('http://localhost:5000/api/employs/status/selectedInterview');
            return response.data;
        }
    );

    const handleStatusChange = (id) => {
        const updateData = {
            currentStatus: 'waitingForRole',
        };

        axios
            .put(`http://localhost:5000/api/employs/${id}`, updateData)
            .then((response) => {
                toast.success('Selected for Interview');
                console.log('Status changed successfully', response.data);

                // Trigger a refetch of the data
                refetch();

            })
            .catch((error) => {
                console.error('Error changing status:', error);
                toast.error('Error changing status');
            });
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Info</th>
                            <th>Resume Link</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employData?.map(({ _id, firstname, lastname, email, resumeLink, InterviewEvulationDate }) => (
                            <tr key={_id}>
                                <td className='w-36'>
                                    <div className="items-center">
                                        <div className="font-bold ">
                                            {firstname} {lastname}
                                        </div>
                                        <span>
                                            <p className='text-gray-600'> {email} </p>
                                        </span>
                                    </div>
                                </td>
                                <td className='w-36'>
                                    <div className="text-xs">
                                        <Link className='' to={resumeLink} target="_blank">{resumeLink}</Link>
                                    </div>
                                </td>

                                <td className="text-xs w-fit">{InterviewEvulationDate}</td>
                                <th>
                                    <div
                                        className="tooltip cursor-pointer"
                                        data-tip="Employee Confirmation"
                                        onClick={() => handleStatusChange(_id)}
                                    >
                                        <GrCaretNext className="w-6 h-6" />
                                    </div>
                                </th>
                            </tr>
                        ))}
                    </tbody>

                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Info</th>
                            <th>Resume Link</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default InterviewList;
