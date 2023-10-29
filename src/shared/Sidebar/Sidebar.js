import React from 'react';
import './Sidebar.css'
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/white-log.png';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { MdManageAccounts, MdOutlineCancel, MdOutlineMedicalInformation } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider';
import { BiSolidDashboard, BiUserCircle } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BsHandbagFill, BsKanban } from 'react-icons/bs';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { TbBrandSuperhuman } from 'react-icons/tb';
import { GrUserSettings } from 'react-icons/gr';
import { SiGoogleads, SiGooglemarketingplatform, SiMarketo } from 'react-icons/si';
import { FiSettings } from 'react-icons/fi';
import { IoMdContacts } from 'react-icons/io';

const Sidebar = () => {
    const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();

    const handleCloseSideBar = () => {
        // Handle closing the sidebar
        if (activeMenu && screenSize <= 900) {
            setActiveMenu(false)
        }
    };


    return (
        <div>
            <div className="pl-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-gray-800 text-white">
                {activeMenu && (
                    <>
                        <div className="flex justify-center pt-5 items-center">
                            {/* Logo */}
                            <Link to="/" onClick={handleCloseSideBar} className="items-center flex w-40 ">
                                <img className='block mx-auto' src={logo} alt="logo" />
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

                        <div className="mt-2">
                            <ul className="menu mr-5 rounded-box mb-10 hover-menuc">
                                <p className="text-gray-400 m-3 mt-4 uppercase">dashboard</p>
                                <li className=''>
                                    <NavLink
                                        className='py-2 hover:text-white'
                                        onClick={handleCloseSideBar}
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? currentColor : ''
                                        })} to='/dashboard'>
                                        <BiSolidDashboard className='w-6 h-6' />
                                        Dashboard
                                    </NavLink>
                                </li>

                                {/* ................Apps..........  */}
                                <p className="text-gray-400 m-3 mt-4 uppercase ">apps</p>
                                <li className='mb-1'>
                                    <NavLink
                                        className='py-2 hover:text-white'
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
                                        className='py-2 hover:text-white'
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
                                        <summary className='hover:text-white'>
                                            <SiGooglemarketingplatform className='w-6 h-6' />
                                            Marketing</summary>
                                        <ul>
                                            <li>
                                                <NavLink
                                                    className='py-2 hover:text-white'
                                                    onClick={handleCloseSideBar}
                                                    style={({ isActive }) => ({
                                                        backgroundColor: isActive ? currentColor : ''
                                                    })} to='/marketing-leads'
                                                >
                                                    <SiGoogleads className='w-6 h-6' />
                                                    Leads
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    className='py-2 hover:text-white'
                                                    onClick={handleCloseSideBar}
                                                    style={({ isActive }) => ({
                                                        backgroundColor: isActive ? currentColor : ''
                                                    })} to='/marketing-contact'
                                                >
                                                    <IoMdContacts className='w-6 h-6' />
                                                    Contact
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                                <li className='mb-1'>
                                    <details close>
                                        <summary className='hover:text-white'>
                                            <BiUserCircle className='w-6 h-6' />
                                            Clients</summary>
                                        <ul>
                                            <li>
                                                <NavLink
                                                    className='py-2 hover:text-white'
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

                                {/* HR ========================= */}
                                <li className='mb-1'>
                                    <details close>
                                        <summary className='hover:text-white'>
                                            <TbBrandSuperhuman className='w-6 h-6' />
                                            HR</summary>
                                        <ul className=''>
                                            <li className='mb-1'>
                                                <details close>
                                                    <summary className='hover:text-white'>
                                                        <BsHandbagFill className='w-6 h-6' />
                                                        Recruitment Manegment</summary>
                                                    <ul>
                                                        <li>
                                                            <Link className='hover:text-white'>
                                                                Job Posting
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className='hover:text-white' to='/human-resource/recruitment/add-resume'>
                                                                Resume Add
                                                            </Link>
                                                        </li>
                                                        <li className='hover:text-white'>
                                                            <Link to='/human-resource/recruitment/interview-evaluation' className='hover:text-white'>
                                                                Interview Evaluation
                                                            </Link>
                                                        </li>
                                                        <li className='hover:text-white'>
                                                            <Link to='/human-resource/recruitment/employ-confirmation'className='hover:text-white'>
                                                                Employ Confirmation
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </details>
                                            </li>

                                            {/* <li>
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
                                            </li> */}

                                        </ul>
                                    </details>
                                </li>

                                {/* Invoice ============== */}
                                <li className='mb-1'>
                                    <NavLink
                                        className='py-2 hover:text-white'
                                        onClick={handleCloseSideBar}
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? currentColor : ''
                                        })} to='/invoice'>
                                        <FaFileInvoiceDollar className='w-6 h-6' />
                                        Invoice
                                    </NavLink>
                                </li>

                                {/* Accounts ======================  */}
                                <li className='mb-1'>
                                    <details close>
                                        <summary className='hover:text-white'>
                                            <MdManageAccounts className='w-6 h-6' />
                                            Accounts</summary>
                                        <ul>
                                            {/* <li>
                                                <NavLink
                                                    className='py-2'
                                                    onClick={handleCloseSideBar}
                                                    style={({ isActive }) => ({
                                                        backgroundColor: isActive ? currentColor : ''
                                                    })} to='/invoice'
                                                >
                                                    <FaFileInvoiceDollar className='w-6 h-6' />
                                                    Invoices
                                                </NavLink>
                                            </li> */}
                                        </ul>
                                    </details>
                                </li>

                                {/* .........Admin Settings.......... */}
                                <p className="text-gray-400 m-3 mt-4 uppercase">Master Settings</p>
                                <li className='mb-1'>
                                    <details close>
                                        <summary className='hover:text-white'>
                                            <GrUserSettings className='w-6 h-6' />
                                            Settings</summary>
                                        <ul className=''>
                                            <li className='mb-1'>
                                                <details close>
                                                    <summary className='hover:text-white'>
                                                        <FiSettings className='w-6 h-6' />
                                                        Genarel Settings</summary>
                                                    <ul>
                                                        <li className='hover:text-white'>
                                                            <Link className='hover:text-white' to='/admin/genarel-settings/createUser'>Create User</Link>
                                                        </li>
                                                        <li className='hover:text-white'>
                                                            <Link className='hover:text-white' to='/admin/genarel-settings/allUsers'>All User</Link>
                                                        </li>
                                                    </ul>
                                                </details>
                                            </li>

                                            <li>
                                                <details close>
                                                    <summary className='hover:text-white'>
                                                        <SiMarketo className='w-6 h-6' />
                                                        Marketing</summary>
                                                    <ul>
                                                        <li>
                                                            <Link className='hover:text-white' to='/admin/marketing-addCompany'>Add Company</Link>
                                                        </li>
                                                        <li>
                                                            <Link className='hover:text-white' to='/admin/marketing-companyType'>Add Company type</Link>
                                                        </li>
                                                        <li>
                                                            <Link className='hover:text-white' to='/admin/marketing-addPosition'>Add Position</Link>
                                                        </li>
                                                        <li>
                                                            <Link className='hover:text-white' to='/admin/marketing-addDepartment'>Add Department</Link>
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
