import React from 'react';
import companyData from './CompanyFakeBD.json';
import { GrView } from 'react-icons/gr';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const CompanyList = () => {
    return (
        <div>
            <div className="overflow-x-auto bg-base-200 p-5 rounded-xl">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Contact Info.</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map through companysData and generate rows */}
                        {companyData.map((company, index) => (
                            <tr key={index}>
                                <th>
                                    {/* <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label> */}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <div className="font-bold">{company.companyName}</div>
                                            <div className="text-sm opacity-50">{company.companyType}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{company.location}</td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">{company.contactNumber}</span>
                                    <br />
                                    <a className="hover:underline" href={`mailto:${company.email}`}>
                                        {company.email}
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
                            <th>Location</th>
                            <th>Contact Info.</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default CompanyList;
