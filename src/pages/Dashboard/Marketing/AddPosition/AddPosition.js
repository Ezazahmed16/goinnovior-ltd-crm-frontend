import React, { useState } from 'react'
import Header from '../../../../shared/Header/Header'
import { useStateContext } from '../../../../contexts/ContextProvider';
import { AiFillCloseCircle } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import Modal from 'react-modal';
import PositionList from './PositionList';

const AddPosition = () => {
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
    const [position, setPosition] = useState('');

    // Handle the input field change
    const handlePosition = (e) => {
        setPosition(e.target.value);
    };

    // Handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can handle the submission of the company type data
        console.log('Submitted Company Type:', position);

        // Clear the input field
        setPosition('');

        // Close the modal
        closeModal();
    };
    return (
        <div className="m-2 md:m-10 mt-14 p-2 md:p-2 bg-main-bg rounded-3xl">
            <div className='mt-20'>
                <Header category='Settings' title='Add Position' />
            </div>

            <div className="my-2 flex justify-end">
                <button
                    style={{ backgroundColor: currentColor }}
                    className="btn text-white"
                    onClick={openModal} // Open the modal when this button is clicked
                >
                    <GrAdd className="w-4 h-4" />
                    Add Position
                </button>
            </div>

            {/* Position list table */}
            <PositionList />
            {/* Position list table */}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add Position Modal"
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
                            <span className="label-text">Add Position</span>
                        </label>
                        <input
                            type="text"
                            value={position}
                            onChange={handlePosition}
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Enter Position"
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            style={{ backgroundColor: currentColor }}
                            className="btn text-white"
                        >
                            Add Position
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AddPosition