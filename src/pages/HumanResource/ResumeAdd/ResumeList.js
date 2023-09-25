import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { GrCaretNext } from 'react-icons/gr';

const ResumeList = ({ employData }) => {

    const handleStatusChange = (id) => {
        // Send a PUT request to change the currentStatus to 'selectedInterview'
        axios.put(`http://localhost:5000/api/employs/${id}`, { currentStatus: 'selectedInterview' })
            .then((response) => {
                toast.success('Selected for Interview')
                console.log('Status changed successfully', response.data);
            })
            .catch((error) => {

                console.error('Error changing status:', error);
            });
    };
    return (
        <div>
            <div className="overflow-x-auto">
                {employData.employ.length === 0 ? (
                    <p className="text-center">No data available.</p>
                ) : (
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Resume Link</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {employData.employ.map(({ _id, firstname, lastname, email, resumeLink }) => (
                                <tr key={_id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="font-bold w-36">
                                                {firstname} {lastname}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{email}</td>

                                    <td className="text-xs w-2/4">{resumeLink}</td>
                                    <th>
                                        <div
                                            className="tooltip cursor-pointer"
                                            data-tip="Interview"
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
                                <th>Name</th>
                                <th>Email</th>
                                <th>Resume Link</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ResumeList;
