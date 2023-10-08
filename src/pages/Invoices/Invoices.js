import React, { useState } from 'react'
import Header from '../../shared/Header/Header'
import { useStateContext } from '../../contexts/ContextProvider';
import Modal from 'react-modal';
import { GrAdd } from 'react-icons/gr';
import NewInvoice from './NewInvoice';
import { AiFillCloseCircle } from 'react-icons/ai';
import InvoiceList from './InvoiceList';


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

const Invoices = () => {
    const { currentColor } = useStateContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='m-2 md:m-10 mt-24 p-2 md:p-2 bg-main-bg rounded-3xl'>


            <div className="flex justify-between items-center gap-5">

                <div className="">
                    <Header className='mr-5' category='Accounts' title='Invoice' />
                </div>

                <div className="flex justify-end items-center">
                    <div className="form-control  mr-5">
                        <div className="input-group">
                            <select className="select select-bordered">
                                <option disabled selected>Filter by Status</option>
                                <option>Paid</option>
                                <option>Pending</option>
                            </select>
                            <button className="btn">Go</button>
                        </div>
                    </div>

                    <div className="">
                        <div className="flex items-center justify-end ">
                            <div className="flex justify-end">
                                <button
                                    style={{ backgroundColor: currentColor }}
                                    className="btn text-white"
                                    onClick={openModal}
                                >
                                    <GrAdd className='w-4 h-4' />
                                    Add Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <InvoiceList />


            {/* Modal ==========  */}
            <div className="w-760">
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add New Resume Modal"
                style={{modalStyles}}
            >
                <button style={{ color: currentColor }} className='my-10 btn' onClick={closeModal}>
                    <AiFillCloseCircle className='w-8 h-8' />
                </button>
                <NewInvoice />
            </Modal>
            </div>


        </div>
    )
}

export default Invoices