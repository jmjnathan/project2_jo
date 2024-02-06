import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPrint } from "react-icons/fa";

const Order = ({ setToken }) => {
    const navigate = useNavigate();
    const [orders, setOrders,] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cartsResponse, usersResponse] = await Promise.all([
                    axios.get("https://fakestoreapi.com/carts"),
                    axios.get("https://fakestoreapi.com/users")
                ]);

                const carts = cartsResponse.data;
                const users = usersResponse.data;

                const mergedData = carts.map(cart => ({
                    ...cart,
                    user: users.find(user => user.id === cart.userId)
                }));

                setOrders(mergedData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/login");
    };

    
    const getPrice = (order) => {
        if (order.items) {
            return order.items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
        } else {
            return 'N/A';
        }
    };
    
        return (
        <div className="font-inter ml-[265px] mr-2 w-screen p-4 ">
            <div className="flex ">
                <h1 className="font-poppins text-[32px] font-semibold"> Order</h1>
                <button
                className="flex-1 border-2 text-black text-[14px] rounded p-2 h-9 hover:bg-gray-200 ml-[700px] justify-end"
                onClick={handleLogOut}
                >Log Out</button>
            </div>
            <div>
                <h3 className="font-medium"> {orders.length} orders found.</h3>
            </div>

            <div className="flex justify-end text-[14px] mb-2 gap-2">
                <h2 className="m-2">Sort by date from</h2>
                    <input type="date" className="bg-gray-200 p-2 rounded-xl"></input>
                <h2 className="m-2">to</h2>
                    <input type="date" className="bg-gray-200 p-2 rounded-xl"></input>
                <button className="bg-blue-500 p-2 rounded text-white flex justify-center items-center gap-1 hover:bg-blue-600"><FaPrint/> Print</button>
            </div>

            <table className="justify-center items-center text-left min-w-full bg-white border border-gray-300 text-[12px]">
                <thead className="bg-slate-200 text-black">
                    <tr>
                        <th className="py-2 px-4 w-[100px]">Id Orders</th>
                        <th className="py-2 px-4 w-[150px]">Name</th>
                        <th className="py-2 px-4">Address</th>
                        <th className="py-2 px-4">Date</th>
                        <th className="py-2 px-4">Price</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="py-2 px-4">A000{order.id}</td>
                            <td className="py-2 px-4 capitalize">{order.user?.name?.firstname} {order.user?.name?.lastname || " "}</td>
                            <td className="py-2 px-4 capitalize">{order.user?.address?.street}, {order.user?.address?.city || " "}</td>
                            <td className="py-2 px-4">{order.date}</td>
                            <td className="py-2 px-4">{getPrice(order)}</td>
                            <td className="py-2 px-4"></td>
                            <td className="py-2 px-4">
                                <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Detail</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        );
    };
    

export default Order;