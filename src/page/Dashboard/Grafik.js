import axios from "axios";
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Grafik = () => {
    const [salesData, setSalesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [productData, setProductData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products?_page=${currentPage}&_limit=5`);
                const newSalesData = response.data.map(product => ({
                    name: product.title,
                    sales: Math.floor(Math.random() * 100) + 1,
                }));
                setSalesData(newSalesData);

                // Untuk pie
                const productDistribution = response.data.reduce((acc, product) => {
                    const existingProduct = acc.find(item => item.name === product.category);

                    if (existingProduct) {
                        existingProduct.value += 1;
                    } else {
                        acc.push({ name: product.category, value: 1 });
                    }

                    return acc;
                }, []);

                setProductData(productDistribution);
                setTotalPages(parseInt(response.headers['x-total-pages'], 10));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const colorScale = ['#927EEE', '#7D62F6', '#3002FF', '#6442FF', '#2500CC'];

    // To do list
    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask("");
            }
        };
        const removeTask = (index) => {
            const newTasks = [...tasks];
            newTasks.splice(index, 1);
            setTasks(newTasks);
        };
    
    return (
        <div className="gap-10">
            <div className="flex">
                {/* Chart */}
                <div className="justify-center">
                    <h2 className="m-5 font-semibold">Sales</h2>
                    <LineChart width={550} height={300} data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="blue" />
                    </LineChart>
                    <div className="gap-3 ml-4 text-[12px]">
                        <button className="bg-blue-400 rounded text-white p-1 mr-1" onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                        <button className="bg-blue-400 rounded text-white p-1" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                    </div>
                </div>

                {/* Calendar */}
                <div className="mt-10 ml-5">
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                </div>
            </div>
                {/* Pie Chart */}

            <div className="flex gap-6 mt-5">
                <div className="justify-center bg-slate-100 rounded-2xl shadow-lg">
                        <h2 className="m-5 font-semibold text-[20px]">Product Distribution</h2>
                        <PieChart width={450} height={400}>
                            <Pie dataKey="value" data={productData} cx="50%" cy="50%" outerRadius={120} label>
                                {
                                    productData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={colorScale[index % colorScale.length]} />
                                    ))
                                }
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                </div>

                <div className="flex flex-col justify-center gap-4">
                    <div className="bg-slate-100 rounded-2xl h-28 w-30 p-5 justify-center items-center shadow-lg">
                        <p className="text-slate-600">Total Visitor</p>
                        <p className="font-semibold text-[24px] text-slate-800">480</p>
                    </div>

                    <div className="bg-slate-100 rounded-2xl h-28 w-30 p-5 justify-center  items-center shadow-lg">
                        <p className="text-slate-600">Product Seen</p>
                        <p className="font-semibold text-[24px] text-slate-800">8250</p>
                    </div>

                    <div className="bg-slate-100 rounded-2xl h-28 w-30 p-5 justify-center shadow-lg">
                        <p className="text-slate-600">Conversion Rate</p>
                        <p className="font-semibold text-[24px] text-slate-800">4,50%</p>
                    </div>

                    <div className="bg-slate-100 rounded-2xl h-28 w-30 p-5 justify-center shadow-lg">
                        <p className="text-slate-600">Order</p>
                        <p className="font-semibold text-[24px] text-slate-800">4,50%</p>
                    </div>

                </div>
                {/* To do List */}
                <div className="bg-slate-100 p-5">
                    <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
                    <div className="flex">
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className="border p-2 mr-2"
                        />
                        <button
                        className="bg-blue-500 ml-2 text-white px-4 py-2 rounded"
                        onClick={addTask}
                        >
                        Add
                        </button>
                    </div>
                    <ul>
                        {tasks.map((task, index) => (
                        <li key={index} className="flex items-center mt-2">
                            <span>{task}</span>
                            <button
                            className="ml-2 text-red-500"
                            onClick={() => removeTask(index)}
                            >
                            Remove
                            </button>
                        </li>
                        ))}
                    </ul>
                    </div>

            </div>
        </div>
    );
};

export default Grafik;
