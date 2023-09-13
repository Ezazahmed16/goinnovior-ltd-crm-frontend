import React, { useState } from 'react';
import Header from '../../../../shared/Header/Header';
import { AiFillCloseCircle } from 'react-icons/ai';
import Modal from 'react-modal';
import { GrAdd } from 'react-icons/gr';
import CompanyTypeList from './CompanyTypeList';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useStateContext } from '../../../../contexts/ContextProvider';
import toast from 'react-hot-toast';

const AddCompanyType = () => {
    const { currentColor } = useStateContext()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const rootElement = document.getElementById('root');
    Modal.setAppElement(rootElement);

    const [companyType, setCompanyType] = useState('');

    const handleCompanyTypeChange = (e) => {
        setCompanyType(e.target.value);
    };

    const queryClient = useQueryClient();

    const postCompanyType = async (companyType) => {
        try {
            const response = await axios.post('http://localhost:5000/api/companyType', {
                name: companyType, // Use the companyType string directly
            });
            if (response.status === 201) {
                return response.data;
            } else {
                throw new Error('Failed to add company type');
            }
        } catch (error) {
            throw new Error('Failed to add company type: ' + error.message);
        }
    };

    const { mutate, isLoading, isError } = useMutation(postCompanyType, {
        onSuccess: () => {
            queryClient.invalidateQueries('companyTypes');
            // closeModal();
            setCompanyType('')
            setIsModalOpen(false);
            toast.success('Successfully Added')

        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(companyType);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="m-2 md:m-10 mt-14 p-2 md:p-2 bg-main-bg rounded-3xl">
                <div className="flex items-center justify-between">
                    <div className="">
                        <Header category="Settings" title="Add Company Type" />
                    </div>

                    <div className="">
                        <button
                            style={{ backgroundColor: currentColor }}
                            className="btn text-white"
                            onClick={openModal}
                        >
                            <GrAdd className="w-4 h-4" />
                            Add Company Type
                        </button>
                    </div>
                </div>

                <CompanyTypeList />

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
                                disabled={isLoading}
                            >
                                {isLoading ? 'Adding...' : 'Add Company Type'}
                            </button>
                            {isError && (
                                <p className="text-red-500">{isError.message}</p>
                            )}
                        </div>
                    </form>
                </Modal>

            </div>
        </div>
    );
};

export default AddCompanyType;
