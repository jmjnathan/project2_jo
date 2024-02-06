import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import {FaTachometerAlt, FaBox, FaUser, FaSignOutAlt, FaShoppingBag, FaUsers,} from "react-icons/fa";
import logo from "../img/logo.png";

    const Sidebar = ({ setToken }) => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/login"); 
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, [navigate]);

    return (
    <div className="flex-column w-full md:w-[250px] font-inter h-screen fixed bg-slate-100 p-7 border-1">
        <div className="flex items-center justify-center mb-5">
            <img src={logo} alt="logo" className="h-[80px] w-[80px] mb-5"/>
        </div>

        <nav className="flex-1 text-[14px] justify-center">
            <NavLink
                to="/"
                className="flex items-center text-black hover:text-blue-500 m-3 md:m-5 transform transition-transform duration-200 ease-in-out hover:scale-110"
            >
            <FaTachometerAlt className="mr-3 md:mr-5" />
                Dashboard
            </NavLink>

            <NavLink
                to="Products"
                className="flex items-center text-black hover:text-blue-500 m-3 md:m-5 transform transition-transform duration-200 ease-in-out hover:scale-110"
            >
            <FaBox className="mr-3 md:mr-5" />
                Products
            </NavLink>

            <NavLink
                to="Order"
                className="flex items-center text-black hover:text-blue-500 m-3 md:m-5 transform transition-transform duration-200 ease-in-out hover:scale-110"
            >
            <FaShoppingBag className="mr-3 md:mr-5" />
                Order
            </NavLink>

            <NavLink
                to="Customers"
                className="flex items-center text-black hover:text-blue-500 m-3 md:m-5 transform transition-transform duration-200 ease-in-out hover:scale-110"
            >
            <FaUsers className="mr-3 md:mr-5" />
                Customers
            </NavLink>

            <NavLink
                to="Admin"
                className="flex items-center text-black hover:text-blue-500 m-3 md:m-5 transform transition-transform duration-200 ease-in-out hover:scale-110"
            >
            <FaUser className="mr-3 md:mr-5" />
                Admin
            </NavLink>
        </nav>

        <div className="mt-4 md:mt-44 items-center text-[14px] h-auto rounded-xl border-2 transform transition-transform duration-200 ease-in-out hover:scale-110">
            <NavLink
                to="/"
                className="p-2 flex items-center justify-center bg-[gray-200] text-black hover:text-blue-500"
                onClick={handleLogOut}
            >
            <FaSignOutAlt className="mr-3 md:mr-5" /> 
                Log Out
            </NavLink>
        </div>
    </div>
    );
};

export default Sidebar;
