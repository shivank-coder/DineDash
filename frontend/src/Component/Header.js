import React, { useState } from 'react';
import logo from '../assest/LOGO.png';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { BsCartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import { toast } from 'react-hot-toast';

function Header() {
  const [showMenu, setshowmenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleshowMenu = () => {
    setshowmenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout Successful");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-14">
            <img src={logo} className="h-full" alt="Logo" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"/menu/64797a48665d7ef647e65268"}>Menu</Link> {/* Corrected path */}
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-gray-700 relative">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-emerald-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className="text-gray-700" onClick={handleshowMenu}>
            <div className="text-2xl cursor-pointer h-10 w-10 mt-4 overflow-hidden drop-shadow">
              {userData.image ? (
                <img
                  src={userData.image}
                  className="rounded-full overflow-hidden h-8 w-8"
                  alt="User"
                />
              ) : (
                <FaUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New Product
                  </Link>
                )}

                {userData.email ? (
                  <p
                    className="cursor-pointer px-2 text-white bg-orange-500"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName})
                  </p>
                ) : (
                  <Link
                    to={"Login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"/menu/64797a48665d7ef647e65268"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
