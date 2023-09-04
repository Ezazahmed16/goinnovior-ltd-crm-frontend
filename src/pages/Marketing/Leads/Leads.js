import React, { useState } from 'react';
import Header from '../../../shared/Header/Header';
import LeadsList from './LeadsList';
import { useStateContext } from '../../../contexts/ContextProvider';
import { GrAdd } from 'react-icons/gr';
import AddNewLead from './AddNewLead';
import { Link } from 'react-router-dom';

const Leads = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-2 bg-main-bg rounded-3xl">
      <div className=''>
        <Header category='Marketing' title='Leads' />
      </div>

      {/* Add A New Lead */}
      <div className="my-2 flex justify-end">
        <Link to='/marketing/leads/add'>
          <button
            style={{ backgroundColor: currentColor }}
            className="btn text-white"
          >
            <GrAdd className='w-4 h-4' />
            Add Lead
          </button>
        </Link>
      </div>

      {/* Leads list table */}
      <LeadsList />
      {/* Leads list table */}
    </div>
  );
};

export default Leads;
