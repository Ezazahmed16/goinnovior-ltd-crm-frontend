import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useStateContext } from '../../../../contexts/ContextProvider';
import toast from 'react-hot-toast';
import emailjs from 'emailjs-com';
import axios from 'axios';

const ResumeNext = ({ selectedId, selectedEmail, selectedName, closeModal }) => {
    const { currentColor } = useStateContext();
    const [formData, setFormData] = useState({
        interviewTime: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            interviewTime: date,
        });
    };

    emailjs.init("vEyX7UqGgaXcKNZbd");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the email data
        const emailData = {
            to_name: selectedName,
            Interview_Date: formData.interviewTime.toISOString(),
            from_email: selectedEmail,
        };

        // Send the email using emailJS
        emailjs
            .send('service_kto7nfk', 'template_o2vuvcm', emailData)
            .then((response) => {
                console.log('Email sent:', response);
                toast.success('Email sent successfully');

                // Prepare the data to update in the database
                const updateData = {
                    currentStatus: 'selectedInterview',
                    interviewLocation: formData.interviewLocation, 
                    comment: formData.comment, 
                    InterviewEvulationDate: formData.interviewTime.toString(),
                };

                axios
                    .put(`http://localhost:5000/api/employs/${selectedId}`, updateData)
                    .then((response) => {
                        toast.success('Selected for Interview');
                        console.log('Status changed successfully', response.data);
                        closeModal();
                    })
                    .catch((error) => {
                        console.error('Error changing status:', error);
                        toast.error('Error changing status');
                    });

            })
            .catch((error) => {
                console.error('Email error:', error);
                toast.error('Error sending email');
            });
    };

    return (
        <div className="m-2 md:m-10 md:mt-5 p-2 md:p-2 bg-main-bg rounded-3xl">
            <form onSubmit={handleSubmit}>
                <h3
                    style={{ backgroundColor: currentColor }}
                    className="font-bold text-xl md:text-2xl md:my-2 text-center p-3 rounded-lg text-white"
                >
                    Schedule For Interview
                </h3>
                <div className="divider"></div>

                {/* InterviewTime (Date-Picker) */}
                <div className="mb-4 w-full my-5">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Interview Time
                    </label>
                    <DatePicker
                        selected={formData.interviewTime}
                        onChange={handleDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholderText="Select Interview Time"
                        required
                    />
                </div>



                {/* Submit Button */}
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        style={{ backgroundColor: currentColor }}
                        className="btn text-white"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ResumeNext;
