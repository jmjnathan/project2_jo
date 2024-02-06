import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Ringkasan from "./Ringkasan";
import Grafik from "./Grafik";


const Dashboard = ({ setToken }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, [navigate]);

    const handleLogOut = (  ) => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/login");
    };

    
        return (
            <div className="font-inter ml-[265px] p-4 mr-2 w-screen">
                <header className="flex items-center justify-between">
                    <h1 className="font-bold text-[32px] text-black font-poppins">
                        Dashboard
                    </h1>
                        <button
                            className="text-black text-sm md:text-base rounded p-2 h-9 border-2 hover:bg-gray-200"
                            onClick={handleLogOut}
                        >   
                            Log Out
                        </button>
                </header>
            <main>
                <Ringkasan/>
                <Grafik/>
            </main>
        </div>
        );
};

export default Dashboard;