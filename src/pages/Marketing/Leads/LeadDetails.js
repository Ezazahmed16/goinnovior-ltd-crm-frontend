import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../shared/Header/Header';

const LeadDetails = () => {
    const { id } = useParams();
    const [leadData, setLeadData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Define an async function to fetch lead data by ID
        const fetchLeadData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/leads/${id}`);
                setLeadData(response.data);
            } catch (error) {
                console.error('Error fetching lead data:', error);
            } finally {
                setIsLoading(false); // No matter what, we stop loading
            }
        };

        fetchLeadData();
    }, [id]);

    // Render loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If there's no data, show a message
    if (!leadData) {
        return <div>No lead data found for ID: {id}</div>;
    }

    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-2 bg-main-bg rounded-3xl'>
            <div className=''>
                <Header category='Leads' title='Leads Information' />
            </div>
            <div className="border-1"></div>
            <div className="">
                <h1 className='text-center p-2 text-xl font-bold border-b-1'>Leads Information</h1>
                <div className="">
                    <div className="overflow-x-auto">
                        <table className="table table-xs">
                            <thead>
                                <tr>
                                    <th>Info</th>
                                    <th>Organization</th>
                                    <th>Email</th>
                                    <th>Number</th>
                                    <th>Whatsapp</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <span className='font-semibold text-xl'>
                                            {leadData.fullName}
                                        </span>  <br />
                                        {leadData.position} <br />
                                        {leadData.department}
                                    </td>
                                    <td>
                                        <span className='font-semibold'>
                                            {leadData.companyName}
                                        </span>
                                        <br />
                                        {leadData.companyType}
                                    </td>
                                    <td>{leadData.email}</td>
                                    <td>
                                        <h1>
                                            {leadData.phoneNumbers.primary}
                                            <br />
                                            {leadData.phoneNumbers.additional}
                                        </h1>
                                    </td>
                                    <td>{leadData.whatsappNumber}</td>
                                    <td className='flex flex-col gap-1'>

                                        
                                        <div className="btn btn-xs btn-error">Meeting Status</div>


                                        <div className="btn btn-xs btn-success">Contact</div>
                                        <div className="btn btn-xs btn-warning">Edit</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadDetails;
