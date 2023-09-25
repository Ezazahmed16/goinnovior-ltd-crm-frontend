import React, { useState } from 'react';
import Header from '../../../shared/Header/Header';
import ResumeList from './ResumeList';
import Pagination from '../../../components/Pagination/pagination';
import AddNewLead from '../../Marketing/Leads/AddNewLead';
import { useStateContext } from '../../../contexts/ContextProvider';
import Modal from 'react-modal';
import { GrAdd } from 'react-icons/gr';
import { AiFillCloseCircle } from 'react-icons/ai';
import AddNewResume from './AddNewResume';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const ResumeAdd = () => {
    const { currentColor } = useStateContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const queryClient = useQueryClient(); // Initialize query client

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchEmployData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/employs/status/processOne');
            return response.data;
        } catch (error) {
            throw new Error('Error fetching employData');
        }
    };

    const { data: employData, isLoading, isError } = useQuery('employData', fetchEmployData, {
        staleTime: 30000, // Set a time (in milliseconds) for how long the data should be considered fresh
        refetchOnWindowFocus: true, // Enable automatic refetch when the window gains focus
    });

    const totalItems = employData ? employData.length : 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-2 bg-main-bg rounded-3xl'>
            <Header category='Human Resources' title='Add Resume' />
            <div className="flex items-center justify-end mb-5">
                <div className="my-2 flex justify-end">
                    <button
                        style={{ backgroundColor: currentColor }}
                        className="btn text-white"
                        onClick={openModal}
                    >
                        <GrAdd className='w-4 h-4' />
                        Add Resume
                    </button>
                </div>
            </div>

            {isLoading ? (
                <p className="text-center">
                    <span className="loading loading-ring loading-lg"></span>
                </p>
            ) : isError ? (
                <p>Error fetching resumes</p>
            ) : (
                <ResumeList employData={employData} itemsPerPage={itemsPerPage} currentPage={currentPage} />
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add New Resume Modal"
                style={modalStyles}
            >
                <button style={{ color: currentColor }} className='mt-10 btn' onClick={closeModal}>
                    <AiFillCloseCircle className='w-8 h-8' />
                </button>
                <AddNewResume />
            </Modal>
        </div>
    );
};

export default ResumeAdd;
