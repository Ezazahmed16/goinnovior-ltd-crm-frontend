import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { MdOutlineCancel } from 'react-icons/md';
import { links } from './SidebarItems';
import { useStateContext } from '../../contexts/ContextProvider';

const Sidebar = () => {
    const { activeMenu, setActiveMenu, screenSize } = useStateContext();

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    const handleCloseSideBar = () => {
        // Handle closing the sidebar
        if(activeMenu && screenSize <= 900){
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
                        {/* Sidebar Menu */}
                        <div className="mt-10">
                            {links.map((item) => (
                                <div key={item.title}>
                                    <p className="text-gray-400 m-3 mt-4 uppercase">
                                        {item.title}
                                    </p>
                                    {item.links.map((link) => (
                                        <NavLink
                                            to={`/${link.name}`}
                                            key={link.name}
                                            onClick={handleCloseSideBar}
                                            className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                        >
                                            {link.icon}
                                            <span className="capitalize ">{link.name}</span>
                                        </NavLink>
                                    ))}
                                </div>
                            ))}
                        </div>

                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
