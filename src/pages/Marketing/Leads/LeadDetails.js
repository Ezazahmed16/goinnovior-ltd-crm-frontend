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
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching lead data:', error);
                setIsLoading(false);
            }
        };

        fetchLeadData();
    }, [id]);

    console.log(leadData)

    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-2 bg-main-bg rounded-3xl'>
            {isLoading ? (
                <></>
            ) : leadData ? (
                <div className=''>
                    <div className=''>
                        <Header category='Leads' title='Leads Information' />
                    </div>

                    <h1> {leadData.companyName} </h1>
                </div>
            ) : (
                <p>No lead data found for ID: {id}</p>
            )}
        </div>
    );
};

export default LeadDetails;
