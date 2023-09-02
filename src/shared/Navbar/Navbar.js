import React, { useContext, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineLogout } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineLogin } from 'react-icons/ai';

import avatar from '../../assets/Avatar.png';
import { useStateContext } from '../../contexts/ContextProvider';
import UserProfile from '../../components/UserProfile/UserProfile';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
  const { user, logOut } = useContext(AuthContext)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.warning("Successfully Logout")
       })
      .catch(err => console.log(err));
  }

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative w-full ">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">

        {/* Auth */}
        {user ? ( // Check if a user is authenticated
          <>
            <TooltipComponent content="Profile" position="BottomCenter">
              <div
                className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                onClick={() => handleClick('userProfile')}
              >
                <img
                  className="rounded-full w-8 h-8"
                  src={avatar}
                  alt="user-profile"
                />
                <p>
                  <span className="text-gray-400 text-14">Hi,</span>{' '}
                  <span className="text-gray-400 font-bold ml-1 text-14">
                    {user.displayName}
                  </span>
                </p>
                <MdKeyboardArrowDown className="text-gray-400 text-14" />
              </div>
            </TooltipComponent>
            <TooltipComponent content="Logout" position="BottomCenter">
              <button
                type="button"
                onClick={() => {
                  logOut(); // Call the logout function
                }}
                style={{ color: currentColor }}
                className="relative text-xl rounded-full p-3 hover:bg-light-gray"
              >
                <AiOutlineLogout />
              </button>
            </TooltipComponent>
          </>
        ) : (
          <Link to='/singin'>
            <button style={{ backgroundColor: currentColor }} className="btn text-white font-semibold">Login
              <AiOutlineLogin className='w-6 h-6' />
            </button>
          </Link>
        )}

        {/* <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Michael
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent> */}


        {/* {isClicked.userProfile && (<UserProfile />)} */}

      </div>
    </div>
  );
};

export default Navbar;