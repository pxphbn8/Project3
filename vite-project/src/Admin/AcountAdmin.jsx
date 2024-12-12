import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AcountAdmin.css";

const AcountAdmin = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ username: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser || loggedInUser.role !== 'Admin') {
      navigate('/'); // Nếu không phải Admin, điều hướng về trang chủ
    } else {
      setUser(loggedInUser);
      setEditData({ username: loggedInUser.username, email: loggedInUser.email });
    }
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...editData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Cập nhật vào localStorage
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ username: user.username, email: user.email });
    setIsEditing(false);
  };

  return (
    <div className="admin-container">
      <h1>Admin Profile</h1>
      {user && (
        <div className="admin-details">
          <p>
            <strong>Username:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={editData.username}
                onChange={handleChange}
              />
            ) : (
              user.username
            )}
          </p>
          <p>
            <strong>Email:</strong>{' '}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
              />
            ) : (
              user.email
            )}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <div className="actions">
            {isEditing ? (
              <>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <button onClick={handleEditClick}>Edit Profile</button>
            )}
            <button onClick={() => navigate('/admin')}>Back to Dashboard</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcountAdmin;