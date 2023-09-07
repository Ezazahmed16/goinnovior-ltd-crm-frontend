import React, { useState } from 'react';
import Header from '../../../shared/Header/Header';
import LeadsList from './LeadsList';
import { useStateContext } from '../../../contexts/ContextProvider';
import { GrAdd } from 'react-icons/gr';
import AddNewLead from './AddNewLead';
import Modal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';

const Leads = () => {
  const { currentColor } = useStateContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Find the root element of your React app, usually with an id of 'root'.
  const rootElement = document.getElementById('root');
  // Set the app element for React Modal.
  Modal.setAppElement(rootElement);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-2 bg-main-bg rounded-3xl">
      <div className=''>
        <Header category='Marketing' title='Leads' />
      </div>

      {/* Add A New Lead */}
      <div className="my-2 flex justify-end">
        <button
          style={{ backgroundColor: currentColor }}
          className="btn text-white"
          onClick={openModal} // Open the modal when this button is clicked
        >
          <GrAdd className='w-4 h-4' />
          Add Lead
        </button>
      </div>

      {/* Leads list table */}
      <LeadsList />
      {/* Leads list table */}


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
