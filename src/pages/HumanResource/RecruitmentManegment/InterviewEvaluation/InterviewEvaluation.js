import React, { useState } from 'react';
import Header from '../../../../shared/Header/Header';
import { useQuery } from 'react-query';
import Pagination from '../../../../components/Pagination/pagination';
import { useStateContext } from '../../../../contexts/ContextProvider';
import axios from 'axios';
import InterviewList from './InterviewEvulationList';

const InterviewEvaluation = () => {
    const { currentColor } = useStateContext();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Define the fetch function to fetch employData
    const { data: employData, isLoading, isError } = useQuery(
        'employData',
        async () => {
            const response = await axios.get('http://localhost:5000/api/employs/status/selectedInterview');
            return response.data;
        }
    );

    const totalItems = employData?.employ ? employData.employ.length : 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = employData?.employ.slice(startIndex, endIndex);

    return (
        <div>
            <div className='m-2 md:m-10 mt-24 p-2 md:p-2 bg-main-bg rounded-3xl'>
                <Header category='Human Resources' title='Interview Evaluation' />

                <div className="">
                    {isLoading ? (
                        <p className="text-center">
                            <span className="loading loading-ring loading-lg"></span>
                        </p>
                    ) : isError ? (
                        <p>Error fetching resumes</p>
                    ) : (
                        <InterviewList employData={currentData} />
                    )}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default InterviewEvaluation