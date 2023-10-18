import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MeetingStatus = ({id}) => {
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        console.log(message)
        // Get the current date
        const currentDate = new Date().toJSON();

        try {
            const response = await axios.put(`http://localhost:5000/api/leads/${id}`, {
                message,
                currentDate,
                status: 'later'
            });
            toast.success('Status Updated')
            setResponseMessage(response.data.message);
        } catch (error) {
            console.error('Error sending message:', error);
            setResponseMessage('An error occurred while sending the message.');
        }
    };

    return (
        <div>
            <h2 className='text-xl text-center font-semibold py-2 border-b-1'>Meeting Status</h2>
            <form onSubmit={sendMessage}>
                <div className="form-group">
                    <lable className='label'> 
                        <span className='label-text' htmlFor="message">Message:</span>
                    </lable>
                    <textarea
                        className='textarea textarea-bordered'
                        id="message"
                        name="message"
                        value={message}
                        onChange={handleMessageChange}
                        rows="4"
                        cols="50"
                        required
                    />
                </div>
                <div className="form-group">
                    <button className='btn btn-success p-2 m-auto block mt-2' type="submit">Send Message</button>
                </div>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default MeetingStatus;
