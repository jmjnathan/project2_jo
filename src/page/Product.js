import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import List from './ListProduct';

const Products = ({ setToken }) => {
    const navigate = useNavigate();
    const [products] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, [navigate]);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/login");
    };

    return (
        <div className="font-inter ml-[265px] p-4 mr-2 w-screen">
        <div className="flex items-center mb-2">
            <h1 className="font-bold text-[32px] text-black font-poppins">Products</h1>
            <button className="flex-1 border-2 text-black text-[14px] rounded p-2 h-9 hover:bg-gray-200 ml-[700px] justify-end" onClick={handleLogOut}>
            Log Out
            </button>
        </div>
        <List products={products} />
        </div>
    );
    };

export default Products;
