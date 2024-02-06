import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./page/Dashboard/Dashboard.js";
import Login from "./page/Login";
import Products from "./page/Product";
import Admin from "./page/Admin";
import Order from "./page/Order";
import Sidebar from "./page/Sidebar";
import Customers from "./page/Customers";

function App() {
  const initialToken = localStorage.getItem("token") || "";
  const [token, setToken] = useState(initialToken);

  return (
    <div className="App">
    <BrowserRouter>
      {token ? (
        <div className="flex bg-[#fffffe]">
          <Sidebar setToken={setToken}/>
            <Routes className="ml-[265px] mr-2">
              <Route path="/" element={<Dashboard setToken={setToken} />} />
              <Route path="products" element={<Products />} />
              <Route path="admin" element={<Admin />} />
              <Route path="order" element={<Order />} />
              <Route path="customers" element={<Customers />}/>
            </Routes>
        </div>
      ) : (

        <Routes>
          <Route path="/login"   element={<Login setToken={setToken} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>

      )}
    </BrowserRouter>
    </div>

  );
}

export default App;