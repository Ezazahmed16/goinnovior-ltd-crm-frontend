import React from 'react';
import { GrView } from 'react-icons/gr';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import leadsData from './LeadsListFakeDB.json'

const LeadsList = ({ data, columns }) => {
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
                        {/* Map through leadsData and generate rows */}
                        {leadsData.map((lead) => (
                            <tr key={lead.id}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{lead.name}</div>
                                            <div className="text-sm opacity-50">{lead.position}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{lead.orgName}</td>
                                <td>
                                    <a className='hover:underline' href={`mailto:${lead.orgContactInfo.email}`}>
                                        {lead.orgContactInfo.email}
                                    </a>
                                    <br />
                                    <span className="badge badge-ghost badge-sm">
                                        {lead.orgContactInfo.phone}
                                    </span>
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
                                        <button>
                                            <AiFillDelete className="w-5 h-5" />
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

