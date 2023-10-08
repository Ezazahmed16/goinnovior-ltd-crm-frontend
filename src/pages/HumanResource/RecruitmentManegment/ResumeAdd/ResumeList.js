import React, { useState } from 'react';
import { GrCaretNext } from 'react-icons/gr';
import ResumeNext from './ResumeNext';
import { AiFillCloseCircle } from 'react-icons/ai';
import Modal from 'react-modal';
import { useStateContext } from '../../../../contexts/ContextProvider';

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

const ResumeList = ({ employData }) => {
    const { currentColor } = useStateContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ selectedId, setselectedId ] = useState('')
    const [ selectedEmail, setselectedEmail ] = useState('')
    const [ selectedName, setselectedName ] = useState('')
    
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleStatusChange = ({_id, email, firstname, lastname}) => {
        setselectedId(_id);
        setselectedEmail(email)
        const name =  firstname + lastname
        setselectedName(name)
        openModal()
    };

    console.log(selectedId)

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Resume Link</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employData.map(({ _id, firstname, lastname, email, resumeLink }) => (
                            <tr key={_id}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="font-bold w-36">
                                            {firstname} {lastname}
                                        </div>
                                    </div>
                                </td>
                                <td>{email}</td>

                                <td className="text-xs w-2/4">{resumeLink}</td>

                                <th>
                                    <div
                                        className="tooltip cursor-pointer"
                                        data-tip="Interview"
                                        // onClick={openModal}
                                        onClick={() => handleStatusChange({_id, email, firstname, lastname})}
                                    >
                                        <GrCaretNext className="w-6 h-6" />
                                    </div>
                                </th>

                            </tr>
                        ))}
                    </tbody>

                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Resume Link</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add New Resume Modal"
                style={modalStyles}
            >
                <button style={{ color: currentColor }} className='mt-10 btn' onClick={closeModal}>
                    <AiFillCloseCircle className='w-8 h-8' />
                </button>
                <ResumeNext selectedId={selectedId} selectedEmail={selectedEmail} selectedName={selectedName} closeModal={closeModal}/>
            </Modal>
        </div>
    );
};

export default ResumeList;
