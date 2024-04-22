import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, userRemoved, userSelected } from "../features/usersSlice";

export function UserDashboard() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.entities);
  const loading = useSelector((state) => state.users.loading);
  const selectedUser = useSelector((state) => state.users.selectedUser);

  useEffect(() => {
    if (loading === "idle") {
      dispatch(fetchUsers());
    }
  }, [loading, dispatch]);

  const handleSelect = (event) => {
    dispatch(userSelected(Number(event.target.value)));
  };

  return (
    <div className="p-4">
      {loading === "loading" && <div>Loading...</div>}
      <select
        className="block mb-4 p-2 border border-gray-300 rounded"
        onChange={handleSelect}
      >
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.id} - {user.username}
          </option>
        ))}
      </select>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">ID</th>
            <th className="p-2 border border-gray-300">Username</th>
            <th className="p-2 border border-gray-300">Name</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.id === selectedUser)
            .map((user) => (
              <tr key={user.id} className="bg-white">
                <td className="p-2 border border-gray-300">{user.id}</td>
                <td className="p-2 border border-gray-300">{user.username}</td>
                <td className="p-2 border border-gray-300">{user.name}</td>
                <td className="p-2 border border-gray-300">{user.email}</td>
                <td className="p-2 border border-gray-300">
                  <button
                    className="white-red-500  text-white font-bold py-1 px-2 rounded"
                    onClick={() => {
                      dispatch(userRemoved(user.id));
                      window.location.reload();
                    }}
                  >
                     ❌
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;
