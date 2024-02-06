import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const Login = ({ setToken }) => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
        username: username,
        password: password,
        };

        try {
        const res = await axios.post(
            "https://fakestoreapi.com/auth/login",
            user
        );
        setToken(res.data.token);
        navigate("/");
        localStorage.setItem("token", res.data.token);
        } catch (e) {
        console.log(e);
        setError("Invalid Username or Password. Please try again!");
        setIsError(true);
        }
    };

    return (
        <div className="font-inter bg-[#f0f3f4] min-h-screen flex items-center justify-center">
        <div className="bg-[#fffffe] p-4 md:p-10 w-full md:w-[500px] h-auto max-w-md rounded-lg shadow-2xl">
            <h1 className="font-semibold text-[24px] md:text-[32px] text-center text-black font-poppins">
            Dummy Shop
            </h1>
            <h3 className="text-xs md:text-base text-center mb-7">
            Melayani Anda dengan setengah hati
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
                >
                Username
                </label>
                <div className="">
                <input
                    id="username"
                    name="username"
                    type="text"
                    className="w-full shaddow-sm h-[40px] rounded p-2  border border-blue-200"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </div>
            </div>

            <div>
                <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
                >
                Password
                </label>
                <div className="relative">
                <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="w-full shadow-sm rounded h-[40px] p-2 border border-blue-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <FaEye
                    className="absolute top-3 right-3  transform transition-transform duration-200 ease-in-out hover:scale-110"
                    onClick={() => setShowPassword(!showPassword)}
                />
                </div>
            </div>

            <div className="flex items-center">
                <button
                type="submit"
                className="font-bold bg-[#3da9fc] rounded p-2 hover:bg-blue-500 text-white uppercase justify-center shadow-lg w-full"
                >
                Login
                </button>
            </div>
            {isError && (
                <div className="text-red-600 text-[14px] text-center">{error}</div>
            )}
            </form>
        </div>
        </div>
    );
};

export default Login;
