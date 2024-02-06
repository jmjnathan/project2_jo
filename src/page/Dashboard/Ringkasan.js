import axios from "axios";
import React, { useState, useEffect } from "react";

import { FaShoppingBag, FaList, FaShoppingBasket, FaTruck, FaMoneyBill} from "react-icons/fa";

const Ringkasan = () => {
const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        async function fetchData() {
        try {
            const productsResponse = await axios.get("https://fakestoreapi.com/products");
            const categoriesResponse = await axios.get("https://fakestoreapi.com/products/categories");

            setProducts(productsResponse.data);
            setCategory(categoriesResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
        }

        fetchData();
    }, []);


    function getPurchases() {
        let total = 0;
        for (let product of products) {
        total += product.rating && product.rating.count ? product.rating.count : 0;
        }
        return total;
    }

    return (
        <div className="flex gap-8 mt-5">
                <div className="border rounded-xl w-[150px] bg-slate-100 text-gray-800 p-2 h-1/6 text-xl text-center flex flex-col gap-1 shadow-md">
                    <div className="flex items-center justify-center gap-2">
                        <FaShoppingBag className="w-[14px]" />
                        <h1 className="text-[16px]">Products</h1>
                    </div>
                    <div className="grid rounded-xl">
                        <h2 className="font-semibold text-[28px]">{products.length}</h2>
                    </div>
                </div>

                <div className="border rounded-xl w-[150px] bg-slate-100 text-gray-800 p-2 w- h-1/6 ml-5 text-xl text-center flex flex-col gap-1 mr-auto shadow-md">
                    <div className="flex items-center justify-center gap-2">
                        <FaList className="w-[14px]"/>
                        <h1 className="text-[16px]">Categories</h1>
                    </div>
                    <div className="grid rounded-xl">
                        <h2 className="font-semibold text-[36px]">{category.length}</h2>
                    </div>
                </div>

                <div className="border rounded-xl w-[150px] bg-slate-100 text-gray-800 p-2 w- h-1/6 ml-5 text-xl text-center flex flex-col gap-1 mr-auto shadow-md">
                    <div className="flex items-center justify-center gap-2">
                        <FaShoppingBasket className="w-[14px]"/>
                        <h1 className="text-[16px]">Purchases</h1>
                    </div>
                    <div className="grid rounded-xl">
                        <h2 className="font-semibold text-[36px]">{getPurchases()}</h2>
                    </div>
                </div>

                <div className="border rounded-xl w-[150px] bg-slate-100 text-gray-800 p-2 w- h-1/6 ml-5 text-xl text-center flex flex-col gap-1 mr-auto  shadow-md">
                    <div className="flex items-center justify-center gap-2">
                        <FaTruck className="w-[14px]"/>
                        <h1 className="text-[16px]">Delivery</h1>
                    </div>
                    <div className="grid rounded-xl">
                        <h2 className="font-semibold text-[36px]">3412</h2>
                    </div>
                </div>

                <div className="border rounded-xl w-[150px] bg-slate-100 text-gray-800 p-2 w- h-1/6 ml-5 text-xl text-center flex flex-col gap-1 mr-auto shadow-md">
                    <div className="flex items-center justify-center gap-2">
                        <FaMoneyBill className="w-[14px]"/>
                        <h1 className="text-[16px]">Income</h1>
                    </div>
                    <div className="grid rounded-xl">
                        <h2 className="font-semibold text-[36px]">$</h2>
                    </div>
                </div>

            </div>
    );
};

export default Ringkasan;