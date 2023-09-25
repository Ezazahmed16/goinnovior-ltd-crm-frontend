import React, { useState } from 'react';
import { GrView } from 'react-icons/gr';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useQuery, useMutation, queryCache } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../../../../components/Loading/Loading';

const CompanyList = () => {
    const [deletingCompanyId, setDeletingCompanyId] = useState(null);

    async function fetchCompanyData() {
        try {
            const response = await axios.get('http://localhost:5000/api/companies');
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching company data: ${error.message}`);
        }
    }

    const { data, error, isLoading, refetch } = useQuery('companies', fetchCompanyData);

    const deleteCompanyMutation = useMutation(
        async (companyId) => {
            try {
                console.log('Deleting company:', companyId);
                await axios.delete(`http://localhost:5000/api/companies/${companyId}`);
            } catch (error) {
                throw new Error(`Error deleting company: ${error.message}`);
            }
        },
        {
            onSuccess: async () => {
                toast.success('Company deleted successfully');
                // Invalidate the 'companies' query and trigger a refetch
                await queryCache.invalidateQueries('companies');
                await refetch(); // Trigger a refetch of the data
                setDeletingCompanyId(null);
            },
        }
    );

    const handleDelete = async (companyId) => {
        setDeletingCompanyId(companyId);
        try {
            await deleteCompanyMutation.mutateAsync(companyId);
        } catch (error) {
            console.error('Error deleting user:', error);
            setDeletingCompanyId(null);
        }
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
                            <th>Location</th>
                            <th>Contact Info.</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5">
                                    <Loading />
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="5">Error: {error.message}</td>
                            </tr>
                        ) : (
                            data.map((company, index) => (
                                <tr key={index}>
                                    <th></th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">{company.companyName}</div>
                                                <div className="text-sm opacity-50">{company.companyType}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">{company.companyAddress.companyCity}</div>
                                                <div className="text-sm opacity-50">{company.companyAddress.companyArea}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className=''>
                                        <span className="badge badge-ghost badge-sm">Number: {company.number}</span>
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Whatsapp: {company.whatsappNumber}</span>
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
                                            <button onClick={() => handleDelete(company._id)} disabled={deletingCompanyId === company._id}>
                                                <AiFillDelete className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            ))
                        )}
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
