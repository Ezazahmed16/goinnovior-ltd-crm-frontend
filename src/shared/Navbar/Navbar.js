import React, { useContext, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineLogout } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineLogin } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';
import { Link } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit'
import { useAuthUser } from 'react-auth-kit'

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
  const signOut = useSignOut()
  const auth = useAuthUser()

  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

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


  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative w-full ">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex items-center">
        {
          auth()?.name ? <>
            <p className='mx-2' >Hi, <span className='font-bold'>{ auth()?.name }</span> </p>
            <button onClick={() => signOut()} style={{ backgroundColor: currentColor }} className="btn p-2">Singout
              <AiOutlineLogin className='w-6 h-6' />
            </button>
          </> : <>
            <Link to='/singin'>
              <button style={{ backgroundColor: currentColor }} className="btn p-2">Login
                <AiOutlineLogin className='w-6 h-6' />
              </button>
            </Link>
          </>
        }
      </div>
    </div>
  );
};

export default Navbar;