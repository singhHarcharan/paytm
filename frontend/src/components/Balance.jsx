// src/components/Balance.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export const Balance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-blue-100">Available Balance</p>
          <h2 className="text-3xl font-bold mt-1">₹{balance.toFixed(2)}</h2>
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded-lg">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <div className="mt-6 flex space-x-3">
        <button className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
          Add Money
        </button>
        <button className="flex-1 bg-white text-blue-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg transition-all duration-200">
          Withdraw
        </button>
      </div>
    </div>
  );
};