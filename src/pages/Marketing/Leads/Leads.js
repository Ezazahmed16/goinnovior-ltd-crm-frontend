import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Header from '../../../shared/Header/Header';
import LeadsList from './LeadsList';
import { useStateContext } from '../../../contexts/ContextProvider';
import { GrAdd } from 'react-icons/gr';
import Modal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import LeadsSearch from './LeadsSearch';
import Pagination from '../../../components/Pagination/pagination';
import AddNewLead from './AddNewLead';

// Add this style object for your modal content
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

const Leads = () => {
  const { currentColor } = useStateContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchLeads = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leads'); // Replace with your API endpoint
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch leads: ' + error.message);
    }
  };

  const { data: leadsData, isLoading, isError } = useQuery('leads', fetchLeads);



  // Calculate totalItems based on leadsData
  const totalItems = leadsData ? leadsData.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-2 bg-main-bg rounded-3xl">
      <div className=''>
        <Header category='Marketing' title='Leads' />
      </div>

      <div className="flex items-center justify-between mb-5">
        <LeadsSearch />

        <div className="my-2 flex justify-end">
          <button
            style={{ backgroundColor: currentColor }}
            className="btn text-white"
            onClick={openModal}
          >
            <GrAdd className='w-4 h-4' />
            Add Lead
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center">
          <span className="loading loading-ring loading-lg"></span>
        </p>
      ) : isError ? (
        <p>Error fetching leads</p>
      ) : (
        <LeadsList leadsData={leadsData} itemsPerPage={itemsPerPage} currentPage={currentPage} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Lead Modal"
        style={modalStyles}
      >
        <button style={{ color: currentColor }} className='mt-10 btn' onClick={closeModal}>
          <AiFillCloseCircle className='w-8 h-8' />
        </button>
        <AddNewLead />
      </Modal>
    </div>
  );
};

export default Leads;
