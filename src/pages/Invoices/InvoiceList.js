import React, { useState, useEffect } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { GrView } from 'react-icons/gr';

const InvoiceList = () => {
  // State to store the fetched data
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/invoices'); // Replace with your API endpoint
      if (response.ok) {
        const data = await response.json();
        setInvoiceData(data); // Update the state with the fetched data
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Company Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {invoiceData.map(({ _id, companyName, date, invoiceNumber }) => (
            <tr key={_id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="font-bold w-36">
                    {invoiceNumber}
                  </div>
                </div>
              </td>
              <td>{companyName}</td>

              <td className="text-xs w-2/4">{date}</td>
              <td className="text-xs w-2/4">
                <button className='btn'>Pending</button>
              </td>

              <th className='flex gap-2'>
                <div className="tooltip tooltip-bottom" data-tip="View">
                    <button>
                      <GrView className="w-5 h-5" />
                    </button>
                </div>

                <div className="tooltip tooltip-bottom mx-1" data-tip="Edit">
                  <button>
                    <AiFillEdit className="w-5 h-5" />
                  </button>
                </div>

                <div className="tooltip tooltip-bottom" data-tip="Delete">
                  <button>
                      <AiFillDelete className="w-5 h-5" />
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>

        {/* foot */}
        <tfoot>
          <tr>
            <th>Invoice Number</th>
            <th>Company Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InvoiceList;
