import React from 'react';

const EmployConfirmationlist = ({ employData }) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {employData?.map(({ _id, firstname, lastname, email }) => (
                        <tr key={_id}>
                            <td>
                                <div className="flex flex-col"></div>
                                <h1>{firstname} {lastname}</h1>
                                <span>{email}</span>
                            </td>
                            <td>{email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployConfirmationlist;
