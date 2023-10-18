import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../shared/Header/Header';
import Modal from 'react-modal';
import AddNewLead from './AddNewLead';
import { AiFillCloseCircle } from 'react-icons/ai';
import MeetingStatus from './MeetingStatus';
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

Modal.setAppElement('#root');

const fetchLeadData = async (id) => {
    const response = await axios.get(`http://localhost:5000/api/leads/${id}`);
    return response.data;
};

const LeadDetails = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { data: leadData, isLoading, isError } = useQuery(['lead', id], () => fetchLeadData(id), {
        enabled: !!id, // Ensure the query is enabled when there's an 'id'
        refetchOnWindowFocus: true, // Auto refetch when the window gains focus
        refetchInterval: 60000, // Set your desired auto refetch interval (e.g., every 60 seconds)
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const refetchLeadData = () => {
        // Manually trigger a refetch
        queryClient.invalidateQueries(['lead', id]);
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return <div>An error occurred while fetching lead data for ID: {id}</div>;
    }

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
                                        <button className='btn btn-xs btn-error' onClick={openModal}>
                                            Meeting Status
                                        </button>
                                        <div className="btn btn-xs btn-success">Contact</div>
                                        <div className="btn btn-xs btn-warning">Edit</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="my-5">
                        <h1>Call By: {leadData.authData}</h1>
                        <h1>Message: {leadData.message}</h1>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add New Lead Modal"
                style={modalStyles}
            >
                <button className='mt-10 btn' onClick={closeModal}>
                    <AiFillCloseCircle className='w-8 h-8' />
                </button>
                <MeetingStatus id={id} refetchLeadData={refetchLeadData} />
            </Modal>
        </div>
    );
};

export default LeadDetails;
