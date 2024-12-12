import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css'; 

function Account() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) ?? {});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || ""
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    setUser(formData);
    localStorage.setItem("user", JSON.stringify(formData));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({});
    navigate('/');
  };

  return (
    <div className="account-container">
      <h3 className="account-header">Account Information</h3>
      {!isEditing ? (
        <div className="account-details">
          <table className="account-table">
            <tbody>
              <tr>
                <td><strong>Username</strong></td>
                <td>{user?.username || "Not provided"}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>{user?.email || "Not provided"}</td>
              </tr>
              <tr>
                <td><strong>Role</strong></td>
                <td>{user?.role || "Not provided"}</td>
              </tr>
            </tbody>
          </table>
          <div className="account-actions">
            <button onClick={handleEdit} className="btn btn-edit">Edit</button>
            <button onClick={handleLogout} className="btn btn-logout">Logout</button>
          </div>
        </div>
      ) : (
        <div className="account-edit-form">
          <form>
            <table className="account-table">
              <tbody>
                <tr>
                  <td><strong>Username</strong></td>
                  <td>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </td>
                </tr>
                <tr>
                  <td><strong>Email</strong></td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </td>
                </tr>
                <tr>
                  <td><strong>Role</strong></td>
                  <td>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="account-actions">
              <button type="button" onClick={handleSave} className="btn btn-save">Save</button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn btn-cancel">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Account;
