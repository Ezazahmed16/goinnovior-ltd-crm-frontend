import React, { useState, useEffect } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { GrView } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const InvoiceList = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/invoices');
      if (response.ok) {
        const data = await response.json();
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setInvoiceData(data);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteInvoice = async (invoiceId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error('Error deleting invoice');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateStatus = async (invoiceId, currentStatus) => {
    if (currentStatus === 'pending') {
      try {
        const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'paid' }),
        });

        if (response.ok) {
          setLoading(true); 
          fetchData();
        } else {
          console.error('Error updating status');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {loading ? (
        <div className="text-center my-5">Loading...</div>
      ) : (
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
            {invoiceData.map(({ _id, companyName, date, invoiceNumber, status }) => (
              <tr key={_id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="font-bold w-36">
                      {invoiceNumber}
                    </div>
                  </div>
                </td>
                <td>{companyName}</td>

                <td className="text-xs w-2/4">{formatDate(date)}</td>
                <td className="text-xs w-2/4">
                  {status === 'paid' ? (
                    <button className='btn' disabled>
                      {status}
                    </button>
                  ) : (
                    <button className='btn' onClick={() => updateStatus(_id, status)}>
                      Pending
                    </button>
                  )}
                </td>

                <th className='flex gap-2'>
                  <Link to={`/invoice-details/${_id}`}>
                    <div className="tooltip tooltip-bottom" data-tip="View">
                      <button>
                        <GrView className="w-5 h-5" />
                      </button>
                    </div>
                  </Link>

                  <div className="tooltip tooltip-bottom mx-1" data-tip="Edit">
                    <button>
                      <AiFillEdit className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="tooltip tooltip-bottom" data-tip="Delete">
                    <button onClick={() => deleteInvoice(_id)}>
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
      )}
    </div>
  );
};

export default InvoiceList;
