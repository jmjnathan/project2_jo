import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Admin = ({ setToken }) => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/login");
    };
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/users");
            console.log("API Response:", response.data);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
        };

        fetchUsers();
    }, []);

    return (
        <div className="font-inter  ml-[265px] mr-2 w-screen p-4">
        <nav>
            <div className="flex items-center mb-5">
            <h1 className="font-bold text-[32px] text-black font-poppins">
                Customers
            </h1>
            <button
                className="flex-1 border-2 text-black text-[14px] rounded p-2 h-9 hover:bg-gray-200 ml-[700px] justify-end"
                onClick={handleLogOut}
            >
                Log Out
            </button>
            </div>
        </nav>
        
        <div className="flex justify-end">
            <div className=" items-center text-center mb-2">
                    <button className="w-auto h-auto rounded text-[14px] text-black p-2 bg-slate-200 hover:bg-slate-400 ">Add New Customer</button>
            </div>
        </div>

        <div className="">
            <div className="font-inter">
            <table className="min-w-full bg-white border border-gray-300 text-[12px]">
                <thead className="bg-slate-200 text-black">
                <tr className="p-5 text-left">
                    <th className="py-2 px-4"> </th>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Address</th>
                    <th className="py-2 px-4">Zip Code</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Phone</th>

                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id} className="border-t">
                        <td className="py-2 px-4"><input type="checkbox"></input></td>
                        <td className="py-2 px-4 capitalize">{user.name.firstname} {user.name.lastname}</td>
                        <td className="py-2 px-4 capitalize">{user.address.street}, {user.address.city}</td>
                        <td className="py-2 px-4">{user.address.zipcode}</td>
                        <td className="py-2 px-4">{user.email}</td>
                        <td className="py-2 px-4">{user.phone}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            <div className="text-[14px]">
                <tr>
                    <td>Total Customer</td>
                    <td>:</td>
                    <td className="font-semibold">{users.length}</td>
                </tr>
            </div>
        </div>
        </div>
    );
};

export default Admin;
