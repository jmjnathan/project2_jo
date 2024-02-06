import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import { FaSearch } from "react-icons/fa";
import User from '../img/dummyuser.jpg';

const Admin = ({ setToken }) => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/login");
    };

    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [editData, setEditData] = useState({}); 

    const openModal = (admin) => {
        setSelectedAdmin(admin);
        setEditData({ admin }); 
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedAdmin(null);
        setEditData({});
        setIsModalOpen(false);
    };

    const handleEdit = (admin) => {
        console.log("Edit data:", editData);

        closeModal();
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/users?limit=4");
            console.log("API Response:", response.data);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
        };

        fetchUsers();
    }, []);

    return (
        <div className="font-inter ml-[265px] mr-2 w-screen p-4">
        <nav>
            <div className="flex items-center mb-5">
            <h1 className="font-bold text-[32px] text-black font-poppins">Admins</h1>
            <button
                className="flex-1 border-2 text-black text-[14px] rounded p-2 h-9 hover:bg-gray-200 ml-[700px] justify-end"
                onClick={handleLogOut}
            >
                Log Out
            </button>
            </div>
        </nav>

        <div className="flex justify-end items-center gap-2">
        <div className=" items-center text-center mb-2">
                    <button className="w-auto h-auto rounded text-[14px] text-black p-2 bg-slate-200 hover:bg-slate-400">Add New Admin</button>
            </div>
        </div>

        <div className="">
            <div className="font-inter">
            <table className="min-w-full bg-white border border-gray-300 text-[12px]">
                <thead className="bg-slate-200 text-black">
                    <tr className="p-5 text-left">
                        <th className="py-2 px-4"> </th>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Username</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Phone</th>
                        <th className="py-2 px-4 text-center">Actions</th>
                    </tr>
                </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t">
                            <td className="py-2 px-4">
                                <input type="checkbox"></input>
                            </td>
                            <td className="py-2 px-4 capitalize">
                                {user.name.firstname} {user.name.lastname}
                            </td>
                            <td className="py-2 px-4">{user.username}</td>
                            <td className="py-2 px-4">{user.email}</td>
                            <td className="py-2 px-4">{user.phone}</td>
                            <td className="py-2 px-4 flex gap-2 justify-center">
                                <button onClick={() => openModal(user)} className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded">
                                    Detail
                                </button>
                                <button onClick={() => openModal(user)} className="text-white bg-red-500 hover:bg-red-600 p-2 rounded">
                                    Delete
                                </button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            </div>

            <div className="text-[14px] mt-2">
                <tr>
                    <td>Total Admin</td>
                    <td>:</td>
                    <td className="font-semibold">{users.length}</td>
                </tr>
            </div>
        </div>

        {/* INI MODAL BUAT ADMIN */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={closeModal}>
                <div className="bg-white p-6 rounded-md h-auto w-[400px] items-center">
                    <h2 className="text-[18px] font-bold mb-4 text-center font-poppins">Admin Details</h2>
                        <hr className="my-4 border-t border-blue-300" />
                        <div className="flex items-center justify-center">
                            <img src={User} alt="user" className="h-[100px] mx-auto border-2 border-blue-500 rounded-full"></img>
                        </div>

                    <table className="text-left text-[14px]">
                        <thead>
                            <tr>
                                <td className="py-2 px-4 font-semibold">Name</td>
                                <td>:</td>
                                <td className="capitalize py-2 px-4">{selectedAdmin?.name?.firstname} {selectedAdmin?.name?.lastname}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-semibold">Address</td>
                                <td>:</td>
                                <td className="capitalize py-2 px-4">
                                    {selectedAdmin?.address?.street}, {selectedAdmin?.address?.number}, {selectedAdmin?.address?.city}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-semibold">Email</td>
                                <td>:</td>
                                <td className="py-2 px-4">{selectedAdmin?.email}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-semibold">Phone</td>
                                <td>:</td>
                                <td className="capitalize py-2 px-4">{selectedAdmin?.phone}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-semibold">Username</td>
                                <td>:</td>
                                <td className="py-2 px-4">{selectedAdmin?.username}</td>
                            </tr>
                        </thead>
                    </table>

                    <hr className="my-4 border-t border-blue-300" />
                    
                    <div className="justify-center flex gap-2 text-[14px] mt-5">
                        <button onClick={() => handleEdit(selectedAdmin)} className="bg-blue-500 text-white w-[100px] p-2 rounded-md">
                            Edit
                        </button>
                        
                        <button onClick={closeModal} className="bg-red-500 text-white w-[100px] p-2 rounded-md">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
    };

export default Admin;
