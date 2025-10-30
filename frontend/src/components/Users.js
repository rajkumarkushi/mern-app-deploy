import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const API = process.env.REACT_APP_API_URL;

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };

  const addUser = async () => {
    await axios.post(`${API}/users`, form);
    setForm({ name: "", email: "" });
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>👤 User List</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button onClick={addUser}>Add User</button>

      <ul>
        {users.map(u => (
          <li key={u._id}>{u.name} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
