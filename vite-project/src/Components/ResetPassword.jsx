import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  useEffect(() => {
    if (!token) {
      setMessage("Liên kết không hợp lệ.");
    }
  }, [token]);

  const handleReset = () => {
    // Tìm email có token tương ứng
    const emails = Object.keys(localStorage).filter(key => key.startsWith("resetToken-"));
    const matchedEmail = emails.find(key => localStorage.getItem(key) === token);

    if (!matchedEmail) {
      setMessage("Token không hợp lệ hoặc đã hết hạn.");
      return;
    }

    const email = matchedEmail.replace("resetToken-", "");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
      setMessage("Không tìm thấy người dùng.");
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem(matchedEmail); // Xóa token sau khi dùng

    setMessage("Đặt lại mật khẩu thành công. Đang chuyển hướng...");
    setTimeout(() => navigate("/ResetPassword"), 3000);
  };

  return (
    <div className="reset-page">
      <h2>Đặt lại mật khẩu</h2>
      {message && <p>{message}</p>}
      {!message.includes("không hợp lệ") && (
        <>
          <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleReset}>Xác nhận</button>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
