import React, { useState } from 'react';
import Header from '../../../../shared/Header/Header';
import { useStateContext } from '../../../../contexts/ContextProvider';
import { GrAdd } from 'react-icons/gr';
import Modal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import DepartmentList from './DepartmentList';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

const AddDepartment = () => {
    const { currentColor } = useStateContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [department, setDepartment] = useState('');
    const queryClient = useQueryClient();

    const rootElement = document.getElementById('root');
    // Set the app element for React Modal.
    Modal.setAppElement(rootElement);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };

    const addDepartmentAPI = async (departmentName) => {
        try {
            const response = await axios.post('http://localhost:5000/api/departments', {
                departmentName,
            });
            return response.data;
        } catch (error) {
            throw new Error('Error adding department: ' + error.message);
        }
    };

    const mutation = useMutation(addDepartmentAPI, {
        onSuccess: () => {
            // Invalidate the cache to refetch data after a successful mutation
            queryClient.invalidateQueries('departments');
            toast.success('Successfully Added')
            setDepartment('');
            closeModal();
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Call the API to add the department
        mutation.mutateAsync(department);
    };

    return (
        <div className="m-2 md:m-10 mt-14 p-2 md:p-2 bg-main-bg rounded-3xl">
            <div className="flex justify-between items-center">
                <div className="">
                    <Header category="Settings" title="Add Department" />
                </div>

                <div className="my-2 flex justify-end">
                    <button
                        style={{ backgroundColor: currentColor }}
                        className="btn text-white"
                        onClick={openModal} // Open the modal when this button is clicked
                    >
                        <GrAdd className="w-4 h-4" />
                        Add Department
                    </button>
                </div>
            </div>

            {/* Department List */}
            <DepartmentList />

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add Department Modal"
                className=""
            >
                <button
                    style={{ color: currentColor }}
                    className="mt-10 btn"
                    onClick={closeModal}
                >
                    <AiFillCloseCircle className="w-8 h-8" />
                </button>
                <form className="form-control w-full max-w-xs m-auto" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text">Add Department</span>
                        </label>
                        <input
                            type="text"
                            value={department}
                            onChange={handleDepartmentChange}
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Enter Department"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={{ backgroundColor: currentColor }}
                        className="btn text-white"
                    >
                        {mutation.isLoading ? 'Adding...' : 'Add Department'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default AddDepartment;
