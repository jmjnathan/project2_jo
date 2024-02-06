import axios from "axios";
import { useEffect, useState, useRef } from "react";

const List = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editData, setEditData] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [totalTerjual, setTotalTerjual] = useState(0);
    const dropdownRef = useRef(null);
    const productsPerPage = 5;

    useEffect(() => {
        async function getProducts() {
            try {
                const res = await axios.get("https://fakestoreapi.com/products");
                setProducts(res.data);
            } catch (e) {
                console.log("error: ", e);
            }
        }
        getProducts();
    }, []);

    const productSold = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            const produk = response.data;
            const totalTerjual = produk.reduce((total, item) => total + item.sold, 0);

            setTotalTerjual(totalTerjual);
        } catch (error) {
            console.error('Gagal mendapatkan data produk', error);
        }
    };

    useEffect(() => {
        productSold();
    }, []); // [] agar useEffect hanya dijalankan sekali saat komponen did-mount

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openModal = (product) => {
        setSelectedProduct(product);
        setEditData({ ...product });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setEditData({});
        setIsModalOpen(false);
    };

    const handleEdit = (product) => {
        console.log("Edit data:", editData);
        closeModal();
    };

    const handleSortBy = (type) => {
        const sortFunctions = {
            'A-Z': (a, b) => a.title.localeCompare(b.title),
            'Z-A': (a, b) => b.title.localeCompare(a.title),
            'Expensive': (a, b) => a.price - b.price,
            'Cheapest': (a, b) => b.price - a.price,
        };

        const sortedProducts = [...products].sort(sortFunctions[type]);
        setProducts(sortedProducts);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    function getPurchases() {
        let total = 0;
        for (let product of products) {
        total += product.rating && product.rating.count ? product.rating.count : 0;
        }
        return total;
    }

    return (
        <div className="font-inter">
            <div className="flex justify-end gap-5">
                <div className="relative inline-block text-left" ref={dropdownRef}>
                    <button
                        className="bg-slate-200 text-[14px] hover:bg-slate-400 w-[120px] justify-center text-black-4 py-2 rounded inline-flex items-center hover:"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Sort By
                    </button>
                    {isOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="p-1 text-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => handleSortBy('A-Z')}>
                                    A - Z
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => handleSortBy('Z-A')}>
                                    Z - A
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => handleSortBy('Cheapest')}>
                                    Cheapest
                                </a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => handleSortBy('Expensive')}>
                                    Expensive
                                </a>
                            </div>
                        </div>
                    )}
                </div>
                <div className="justify-end items-center text-center mb-2">
                    <button className="w-[120px] h-auto rounded text-[14px] text-black p-2 bg-slate-200 hover:bg-slate-400 ">Add Product</button>
                </div>
            </div> 

            <table className="min-w-full bg-white border border-gray-300 text-[12px]">
                <thead className="bg-slate-200 text-black text-left">
                    <tr className="">
                        <th className="py-2 px-4 w-[50px]"> </th>
                        <th className="py-2 px-4 w-[400px]">Product</th>
                        <th className="py-2 px-4 w-[150px]">Category</th>
                        <th className="py-2 px-4 w-[100px]">Price</th>
                        <th className="py-2 px-4">Picture</th>
                        <th className="py-2 px-4">Sold</th>
                        <th className="py-2 px-4 ">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={product.id} className="border-t p-5">
                            <td className="py-2 px-4">
                                <input type="checkbox" />
                            </td>
                            <td className="py-2 px-4">{product.title}</td>
                            <td className="py-2 px-4 capitalize">{product.category}</td>
                            <td className="py-2 px-4">$ {product.price}</td>
                            <td className="py-2 px-4">
                                <div className="w-12 h-12 border-2 rounded justify-center">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-11 object-cover items-center m-auto py-1"
                                    />
                                </div>
                            </td>
                            <td className="py-2 px-4">{getPurchases()} qty</td>
                            <td>
                                <button
                                    onClick={() => openModal(product)}
                                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                                >
                                    Detail Product
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className="bg-slate-200 font-semibold">
                    <tr>
                        <td colSpan="7" className="text-end py-2 px-4">
                        {/* <p>Total Product: {products.length}</p> */}
                        <p>Total Sold Product: {getPurchases()}</p>
                        </td>
                    </tr>
                </tfoot>
            </table>


            <div className="flex items-center justify-end fixed mt-2">
                <button
                    className={`mx-1 px-3 py-1 text-[#094067] border-2 ${
                        currentPage === 1 ? ' text-gray-200' : 'bg-[#fffffe]'
                    } rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &#8592;
                </button>

                <button
                    className={`mx-1 px-3 py-1 text-black border-2 ${
                        currentPage === Math.ceil(products.length / productsPerPage)
                            ? 'text-gray-200'
                            : 'bg-[#fffffe]'
                    } rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                >
                    &#8594;
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={closeModal}>
                    <div className="bg-white p-6 rounded-md h-auto w-[650px] items-center">
                        <h2 className="text-[18px] font-bold mb-4 text-center font-poppins">Product Details</h2>

                        <hr className="my-4 border-t border-blue-300" />

                        <table className="justify-start items-start text-[14px]">
                            <tr className="text-left">
                                <td className="py-2 px-4">Title</td>
                                <td>:</td>
                                <td className="py-2 px-4 font-bold">{selectedProduct?.title}</td>
                            </tr>
                            <tr className="text-left">
                                <td className="py-2 px-4">Price</td>
                                <td>:</td>
                                <td className="py-2 px-4">$ {selectedProduct?.price}</td>
                            </tr>
                            <tr className="text-left">
                                <td className="py-2 px-4">Category</td>
                                <td>:</td>
                                <td className="py-2 px-4 capitalize">{selectedProduct?.category}</td>
                            </tr>
                            <tr className="text-left">
                                <td className="py-2 px-4">Description</td>
                                <td>:</td>
                                <td className="py-2 px-4">{selectedProduct?.description}</td>
                            </tr>
                            <tr className="text-left">
                                <td className="py-2 px-4">Pict</td>
                                <td>:</td>
                                <td className="py-2 px-4 capitalize">
                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.title}
                                        className="object-cover h-20"
                                    />
                                </td>
                            </tr>
                        </table>

                        <hr className="my-4 border-t border-blue-300" />

                        <div className="justify-center flex gap-2 text-[14px] mt-5">
                            <button onClick={() => handleEdit(selectedProduct)} className="bg-blue-500 w-[100px] text-white p-2 rounded-md">
                                Edit
                            </button>

                            <button onClick={closeModal} className="bg-red-500 w-[100px] text-white p-2 rounded-md">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;
