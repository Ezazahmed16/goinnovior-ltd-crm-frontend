import React, { useState } from 'react';

const ContactStatus = () => {
    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Message:', message);
    };

    return (
        <div>
            <div className="form-group">
                <label className='label'>
                    <span className="label-text" htmlFor="message">
                        Message:
                    </span>
                </label>
                <textarea
                    className="textarea textarea-bordered"
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
                <button className="btn btn-success p-2 m-auto block mt-2" type="submit" onClick={handleSubmit}>
                    Send Message
                </button>
            </div>
        </div>
    );
};

export default ContactStatus;
