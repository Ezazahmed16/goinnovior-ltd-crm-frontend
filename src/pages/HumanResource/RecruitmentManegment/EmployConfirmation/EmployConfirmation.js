import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Header from '../../../../shared/Header/Header';
import EmployConfirmationlist from './EmployConfirmationlist';

const EmployConfirmation = () => {
    // Define the fetch function to fetch employData
    const { data: employData, isLoading, isError } = useQuery(
        'employData',
        async () => {
            const response = await axios.get('http://localhost:5000/api/employs/status/waitingForRole');
            return response.data;
        },
        {
            staleTime: 60000, 
        }
    );

    return (
        <div>
            <div className='m-2 md:m-10 mt-24 p-2 md:p-2 bg-main-bg rounded-3xl'>
                <Header category='Human Resources' title='Employ Confirmation' />
            </div>

            <div className="">
                {isLoading ? (
                    <p className="text-center">
                        <span className="loading loading-ring loading-lg"></span>
                    </p>
                ) : isError ? (
                    <p>Error fetching resumes</p>
                ) : (
                    <EmployConfirmationlist employData={employData.employ} />
                )}
            </div>
        </div>
    );
};

export default EmployConfirmation;
