import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center p-4">
            <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
            <p className="text-gray-600 mb-6">Your visited page not found. You may go home page.</p>
            <Link to="/" className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition">
                Back to home page
            </Link>
        </div>
    );
};

export default Error404;