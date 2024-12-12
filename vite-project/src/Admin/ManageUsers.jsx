import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./ManageUsers.css";

const ManageUsers = ({ onClose }) => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    // Lấy thông tin các tài khoản đã đăng ký từ localStorage
    useEffect(() => {
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(savedUsers);

        // Lấy thông tin người dùng hiện tại
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(loggedInUser);
    }, []);



    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Danh sách tài khoản</h2>
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Không có tài khoản nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <NavLink to="/Admin" className="btn btn-primary">
                    Cancel
                </NavLink>
            </div>
        </div>
    );
};

export default ManageUsers;


