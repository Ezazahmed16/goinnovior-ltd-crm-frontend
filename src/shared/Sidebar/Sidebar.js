import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { MdManageAccounts, MdOutlineCancel, MdOutlineMedicalInformation } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider';
import { BiSolidDashboard, BiSolidUserCircle, BiUserCircle } from 'react-icons/bi';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import { BsKanban } from 'react-icons/bs';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { GrUserSettings } from 'react-icons/gr';
import { SiGoogleads, SiGooglemarketingplatform, SiMarketo } from 'react-icons/si';
import { FiSettings } from 'react-icons/fi';

const Sidebar = () => {
    const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    const handleCloseSideBar = () => {
        // Handle closing the sidebar
        if (activeMenu && screenSize <= 900) {
            setActiveMenu(false)
        }
    };

    return (
        <div>
            <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
                {activeMenu && (
                    <>
                        <div className="flex justify-between items-center">
                            {/* Logo */}
                            <Link to="/" onClick={handleCloseSideBar} className="items-center mt-4 flex w-24 h-26 ml-4">
                                <img className='' src={logo} alt="logo" />
                            </Link>

                            {/* Tooltip for the cancel icon */}
                            <TooltipComponent content='Menu' position='BottomCenter'>
                                <button type='button' onClick={() => setActiveMenu((preActiveMenu) => !preActiveMenu)}
                                    className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"

                                >
                                    <MdOutlineCancel />
                                </button>
                            </TooltipComponent>
                        </div>

                        <div className="mt-5">
                            <ul className="menu mr-5 rounded-box mb-10">
                                <p className="text-gray-400 m-3 mt-4 uppercase">dashboard</p>
                                <li>
                                    <NavLink
                                        className='py-2'
                                        onClick={handleCloseSideBar}
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? currentColor : ''
                                        })} to='/dashboard'>
                                        <BiSolidDashboard className='w-6 h-6' />
                                        Dashboard
                                    </NavLink>
                                </li>

                                {/* ................Apps..........  */}
                                <p className="text-gray-400 m-3 mt-4 uppercase">apps</p>
                                <li className='mb-1'>
                                    <NavLink
                                        className='py-2'
                                        onClick={handleCloseSideBar}
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? currentColor : ''
                                        })} to='/calendar'>
                                        <AiOutlineCalendar className='w-6 h-6' />
                                        Calendar
                                    </NavLink>
                                </li>
                                <li className='mb-1'>
                                    <NavLink
                                        className='py-2'
                                        onClick={handleCloseSideBar}
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? currentColor : ''
                                        })} to='/kanban'>
                                        <BsKanban className='w-6 h-6' />
                                        Kanban
                                    </NavLink>
                                </li>

                                {/* ................Pages..........  */}
                                <p className="text-gray-400 m-3 mt-4 uppercase">pages</p>
                                <li className='mb-1'>
                                    <details close>
                                        <summary >
                                            <SiGooglemarketingplatform className='w-6 h-6' />
                                            Marketing</summary>
                                        <ul>
                                            <li>
                                                <NavLink
                                                    className='py-2'
                                                    onClick={handleCloseSideBar}
                                                    style={({ isActive }) => ({
                                                        backgroundColor: isActive ? currentColor : ''
                                                    })} to='/marketing-leads'
                                                >
                                                    <SiGoogleads className='w-6 h-6' />
                                                    Leads
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li className='mb-1'>
                                    <details close>
                                        <summary >
                                            <BiUserCircle className='w-6 h-6' />
                                            Clients</summary>
                                        <ul>
                                            <li>
                                                <NavLink
                                                    className='py-2'
                                                    onClick={handleCloseSideBar}
                                                    style={({ isActive }) => ({
                                                        backgroundColor: isActive ? currentColor : ''
                                                    })} to='/clients-clientsInfo'
                                                >
                                                    <MdOutlineMedicalInformation className='w-6 h-6' />
                                                    Clients Information
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li className='mb-1'>
                                    <NavLink
                                        className='py-2'
                                        onClick={handleCloseSideBar}
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? currentColor : ''
                                        })} to='/human-resource'
                                    >
                                        <AiOutlineUser className='w-6 h-6' />
                                        Human Resource
                                    </NavLink>

                                </li>
                                <li className='mb-1'>
                                    <details close>
                                        <summary >
                                            <MdManageAccounts className='w-6 h-6' />
                                            Accounts</summary>
                                        <ul>
                                            <li>
                                                <NavLink
                                                    className='py-2'
                                                    onClick={handleCloseSideBar}
                                                    style={({ isActive }) => ({
                                                        backgroundColor: isActive ? currentColor : ''
                                                    })} to='/accounts-invoice'
                                                >
                                                    <FaFileInvoiceDollar className='w-6 h-6' />
                                                    Invoices
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </details>
                                </li>

                                {/* .........Admin Settings.......... */}
                                <p className="text-gray-400 m-3 mt-4 uppercase">Settings</p>
                                <li className='mb-1'>
                                    <details close>
                                        <summary >
                                            <GrUserSettings className='w-6 h-6' />
                                            Settings</summary>
                                        <ul className=''>
                                            <li className='mb-1'>
                                                <details close>
                                                    <summary >
                                                        <FiSettings className='w-6 h-6' />
                                                        Genarel Settings</summary>
                                                    <ul>
                                                        <li>
                                                            <Link to='/admin/genarel-settings/createUser'>Create User</Link>
                                                        </li>
                                                        <li>
                                                            <Link to='/admin/genarel-settings/allUsers'>All User</Link>
                                                        </li>
                                                    </ul>
                                                </details>
                                            </li>

                                            <li>
                                                <details close>
                                                    <summary >
                                                        <SiMarketo className='w-6 h-6' />
                                                        Marketing</summary>
                                                    <ul>
                                                        <li>
                                                            <Link to='/admin/marketing-addCompany'>Add Company</Link>
                                                        </li>
                                                        <li>
                                                            <Link to='/admin/marketing-companyType'>Add Company type</Link>
                                                        </li>
                                                        <li>
                                                            <Link to='/admin/marketing-addPosition'>Add Position</Link>
                                                        </li>
                                                        <li>
                                                            <Link to='/admin/marketing-addDepartment'>Add Department</Link>
                                                        </li>
                                                    </ul>
                                                </details>
                                            </li>

                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </div>



                    </>
                )}
            </div >
        </div >
    );
};

export default Sidebar;
