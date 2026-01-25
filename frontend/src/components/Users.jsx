// src/components/Users.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:3000/api/v1/user/bulk", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.slice(0, 3).map((user) => (
        <div
          key={user._id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {user.firstName[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>
          <button
            onClick={() => (window.location.href = `/send?to=${user._id}`)}
            className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-100 transition-colors duration-200"
          >
            Send
          </button>
        </div>
      ))}
    </div>
  );
};