import React, {  } from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi';
import Sidebar from '../shared/Sidebar/Sidebar';
import { useStateContext } from '../contexts/ContextProvider';

const Main = () => {

  const { activeMenu } = useStateContext();

  return (
    <div className='flex relative dark:bg-main-dark-bg'>
      <div className='fixed right-4 bottom-4 z-50'>
        <TooltipComponent content='Settings' position='Top'>
          <button
            className='btn text-3xl hover:drop-shadow-2xl hover:bg-light-gray text-white'
            style={{ backgroundColor: 'blue', borderRadius: '50%' }}
          >
            <FiSettings />
          </button>
        </TooltipComponent>
      </div>

      {activeMenu ? (
        <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
          <Sidebar />
        </div>
      ) : (
        <div className='w-0 dark:bg-secondary-dark-bg'>
            <Sidebar />
        </div>
      )}
      <div
        className={
          activeMenu
            ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
            : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
        }
      >
        
        <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
          <Navbar />
        </div>

        <div className="">
            <Outlet></Outlet>
        </div>

      </div>
    </div>
  );
};

export default Main;
