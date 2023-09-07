import React, { useState } from 'react'
import Header from '../../../../shared/Header/Header'
import { useStateContext } from '../../../../contexts/ContextProvider';
import Modal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import AddCompanyForm from './AddCompanyForm';
import CompanyList from './CompanyList';

const AddCompany = () => {
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
        <div className="m-2 md:m-10 mt-14 p-2 md:p-2 bg-main-bg rounded-3xl">
            <div className='mt-20'>
                <Header category='Settings' title='Add Company' />
            </div>

            <div className="my-2 flex justify-end">
                <button
                    style={{ backgroundColor: currentColor }}
                    className="btn text-white"
                    onClick={openModal} // Open the modal when this button is clicked
                >
                    <GrAdd className='w-4 h-4' />
                    Add Company
                </button>
            </div>

            {/* Company list table */}
            <CompanyList />
            {/* Company list table */}


            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add New Lead Modal"
                className=''
            >
                <button style={{ color: currentColor }} className='mt-10 btn' onClick={closeModal}>
                    <AiFillCloseCircle className='w-8 h-8' />
                </button>
                <AddCompanyForm />
            </Modal>
        </div>
    )
}

export default AddCompany