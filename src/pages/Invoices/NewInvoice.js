import React, { useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { GrTrash } from 'react-icons/gr';
import Select from 'react-select';

const NewInvoice = () => {
  const { currentColor } = useStateContext();

  const termsOptions = [
    { value: 'term1', label: 'Term 1' },
    { value: 'term2', label: 'Term 2' },
    { value: 'term3', label: 'Term 3' },
  ];

  const companyOptions = [
    { value: 'company1', label: 'Company 1' },
    { value: 'company2', label: 'Company 2' },
    // Add more options as needed
  ];
  
  const paymentTermOptions = [
    { value: 'term1', label: 'Term 1' },
    { value: 'term2', label: 'Term 2' },
    // Add more options as needed
  ];
  
  const poReferenceOptions = [
    { value: 'ref1', label: 'Reference 1' },
    { value: 'ref2', label: 'Reference 2' },
    // Add more options as needed
  ];

  // State variables
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    date: '',
    companyName: '',
    paymentTerm: '',
    poReference: '',
    dueWithin: '',
    billingPeriod: [{
      startDate: '',
      endDate: '',
    }],
    items: [
      {
        itemName: '',
        description: '',
        quantity: '',
        unitPrice: '',
      },
    ],
    termsAndConditions: [],
  });

  const generateInvoiceNumber = () => {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;

    return `GIT-INV-${randomNumber}`;
  };

  // Initialize the invoice number when the component mounts
  useState(() => {
    setInvoiceData((prevData) => ({
      ...prevData,
      invoiceNumber: generateInvoiceNumber(),
    }));
  }, []);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    if (field === 'billingPeriod.startDate' || field === 'billingPeriod.endDate') {
      // If the field is within billingPeriod, update it separately
      setInvoiceData((prevData) => ({
        ...prevData,
        billingPeriod: {
          ...prevData.billingPeriod,
          [field.split('.')[1]]: value,
        },
      }));
    } else {
      // For other fields, update them as usual
      setInvoiceData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };
  

  // Handle item changes
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceData.items];
    updatedItems[index][field] = value;
    setInvoiceData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  };

  // Add a new item
  const handleAddItem = () => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { itemName: '', description: '', quantity: '', unitPrice: '' }],
    }));
  };

  // Remove an item
  const handleRemoveItem = (index) => {
    const updatedItems = [...invoiceData.items];
    updatedItems.splice(index, 1);
    setInvoiceData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  };



  // Handle Company Name, Payment Term, and PO Reference changes
  const handleSelectChange = (field, selectedOption) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      [field]: selectedOption.value, // Assuming the selectedOption has a 'value' property
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Submitted Invoice Data:', invoiceData);
  };

  return (
    <div>
      <h1 className='text-center text-2xl py-3 text-white' style={{ backgroundColor: currentColor }}>Create New Invoice</h1>
      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-2 gap-5 ">
          <div>
            <label className="label">
              <span className="label-text">Invoice Number:</span>
            </label>
            <input className='input input-bordered w-full' type="text" value={invoiceData.invoiceNumber} readOnly />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Invoice Date:</span>
            </label>
            <input
              type="date"
              value={invoiceData.date}
              className='input input-bordered w-full'
              onChange={(e) => handleInputChange('date', e.target.value)}
            />
          </div>
        </div>

        <div className="divider"></div>

        {/* Add other form fields here */}
        {/* For Company Name, Payment Term, PO Reference, Due Within, Billing Period */}
        <div className="my-5">
          <div className="">
            <label className="label">
              <span className="label-text">Company Name:</span>
            </label>
            <Select
              className="select select-bordered w-full max-w-xs"
              options={companyOptions}
              onChange={(selectedOption) => handleSelectChange('companyName', selectedOption)}
              value={{ label: invoiceData.companyName, value: invoiceData.companyName }}
            />
          </div>
        </div>

        <div className="divider"></div>

        <div className=" grid grid-cols-5 gap-5 ">
          <div className="">
            <label className="label">
              <span className="label-text">Payment Term:</span>
            </label>
            <Select
              className="select select-bordered w-full"
              options={paymentTermOptions} // Replace 'paymentTermOptions' with your actual payment term options
              onChange={(selectedOption) => handleSelectChange('paymentTerm', selectedOption)}
              value={{ label: invoiceData.paymentTerm, value: invoiceData.paymentTerm }}
            />
          </div>

          <div className="">
            <label className="label">
              <span className="label-text">PO Reference:</span>
            </label>
            <Select
              className="select select-bordered w-full"
              options={poReferenceOptions} // Replace 'poReferenceOptions' with your actual PO reference options
              onChange={(selectedOption) => handleSelectChange('poReference', selectedOption)}
              value={{ label: invoiceData.poReference, value: invoiceData.poReference }}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Due Within:</span>
            </label>
            <input
              type="date"
              value={invoiceData.dueWithin}
              className='input input-bordered w-full'
              onChange={(e) => handleInputChange('dueWithin', e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Billing Period Start Date:</span>
            </label>
            <input
              type="date"
              value={invoiceData.billingPeriod.startDate}
              className='input input-bordered w-full'
              onChange={(e) => handleInputChange('billingPeriod.startDate', e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Billing Period End Date:</span>
            </label>
            <input
              type="date"
              value={invoiceData.billingPeriod.endDate}
              className='input input-bordered w-full'
              onChange={(e) => handleInputChange('billingPeriod.endDate', e.target.value)}
            />
          </div>

        </div>


        {/* For Items */}
        <div>
          <div className="divider"></div>

          {invoiceData.items.map((item, index) => (
            <div key={index} className='grid grid-cols-5 gap-5 items-center justify-center'>
              <div className="">
                <label className="label mt-5">
                  <span className="label-text">Item Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                  className='input input-bordered w-full'
                />
              </div>
              <div className="">
                <label className="label mt-5">
                  <span className="label-text">Item Description</span>
                </label>
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className='input input-bordered w-full'
                />
              </div>
              <div className="">
                <label className="label mt-5">
                  <span className="label-text">Item Quantity</span>
                </label>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  className='input input-bordered w-full'
                />
              </div>
              <div className="">
                <label className="label mt-5">
                  <span className="label-text">Item Price</span>
                </label>
                <input
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                  className='input input-bordered w-full'
                />
              </div>
              {index > 0 && (
                <button type="button" onClick={() => handleRemoveItem(index)}>
                  <GrTrash className='h-6 w-6 border border-spacing-1 rounded-lg mt-12' />
                </button>
              )}
            </div>
          ))}
          <div className='my-5'>
            <button type="button my-5" className='btn text-white' style={{ backgroundColor: currentColor }} onClick={handleAddItem}>
              Add Item
            </button>
          </div>
        </div>

        <div>
          <label>Terms and Conditions:</label>
          <Select
            isMulti
            options={termsOptions}
            value={invoiceData.termsAndConditions}
            onChange={(selectedOptions) =>
              setInvoiceData((prevData) => ({
                ...prevData,
                termsAndConditions: selectedOptions,
              }))
            }
          />
        </div>

        <div>
          <button className='btn my-5' style={{ backgroundColor: currentColor }} type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewInvoice;
