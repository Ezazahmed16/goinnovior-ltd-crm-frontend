import React, { useState } from 'react';
import Header from '../../../shared/Header/Header';
import LeadsList from './LeadsList';
import { useStateContext } from '../../../contexts/ContextProvider';
import { GrAdd } from 'react-icons/gr';
import AddNewLead from './AddNewLead';
import Modal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import LeadsSearch from './LeadsSearch';
import leadsData from './LeadsListFakeDB.json';
import Pagination from '../../../components/Pagination/pagination';

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

  const totalItems = leadsData.length;
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

      <LeadsList leadsData={leadsData} itemsPerPage={itemsPerPage} currentPage={currentPage} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Lead Modal"
        className=''
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
