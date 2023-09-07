import React, { useState } from 'react';
import Header from '../../../../shared/Header/Header';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useStateContext } from '../../../../contexts/ContextProvider';
import Modal from 'react-modal';
import { GrAdd } from 'react-icons/gr';
import CompanyTypeList from './CompanyTypeList';

const AddCompanyType = () => {
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

    // State to store the value of the company type input field
    const [companyType, setCompanyType] = useState('');

    // Handle the input field change
    const handleCompanyTypeChange = (e) => {
        setCompanyType(e.target.value);
    };

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can handle the submission of the company type data
        console.log('Submitted Company Type:', companyType);

        // Clear the input field
        setCompanyType('');

        // Close the modal
        closeModal();
    };

    return (
        <div>
            <div className="m-2 md:m-10 mt-14 p-2 md:p-2 bg-main-bg rounded-3xl">
                <div className="mt-20">
                    <Header category="Settings" title="Add Company Type" />
                </div>

                <div className="my-2 flex justify-end">
                    <button
                        style={{ backgroundColor: currentColor }}
                        className="btn text-white"
                        onClick={openModal} // Open the modal when this button is clicked
                    >
                        <GrAdd className="w-4 h-4" />
                        Add Company Type
                    </button>
                </div>

                {/* Company list table */}
                <CompanyTypeList />
                {/* Company list table */}

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Add New Lead Modal"
                    className=""
                >
                    <button
                        style={{ color: currentColor }}
                        className="mt-10 btn"
                        onClick={closeModal}
                    >
                        <AiFillCloseCircle className="w-8 h-8" />
                    </button>
                    <form className='form-control w-full max-w-xs m-auto' onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="label">
                                <span className="label-text">Company Type</span>
                            </label>
                            <input
                                type="text"
                                value={companyType}
                                onChange={handleCompanyTypeChange}
                                className="input input-bordered w-full max-w-xs"
                                placeholder="Enter Company Type"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                style={{ backgroundColor: currentColor }}
                                className="btn text-white"
                            >
                                Add Company Type
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default AddCompanyType;
