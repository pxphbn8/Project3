import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './LoginSignup.css';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("User");  
  const [errors, setErrors] = useState({});
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetErrors, setResetErrors] = useState({});
  const [resetMessage, setResetMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    const newErrors = {};
    if (!validateEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (username.trim() === "") {
      newErrors.username = "Tên người dùng không được để trống";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
  
      // Lưu tài khoản mới vào danh sách
      const newUser = { username, email, password, role };
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
  
      setAction("Login"); // Chuyển sang trang đăng nhập
    }
  };
  

  const handleLogin = () => {
    const newErrors = {};
    if (!validateEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log("Đăng nhập thành công");
      let user = {
        "username": username,
        "email": email,
        "password": password,
        "role": role  // Lưu role vào localStorage
      };
      localStorage.setItem("user", JSON.stringify(user));

      // Điều hướng dựa trên vai trò người dùng
      if (role === "Admin") {
        navigate('/admin');  // Điều hướng tới trang Admin nếu là Admin
      } else {
        navigate('/');  // Điều hướng tới trang chính nếu là User
      }
    }
  };

  const handleResetPassword = () => {
    const newResetErrors = {};
    if (!validateEmail(resetEmail)) {
      newResetErrors.email = "Email không hợp lệ";
    }
    if (Object.keys(newResetErrors).length > 0) {
      setResetErrors(newResetErrors);
    } else {
      setResetErrors({});
      setResetMessage("Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.");
      setResetEmail(""); 
      const templateParams = {
        email: resetEmail, 
      };

      emailjs
        .send(
          "service_wen1dho", 
          "template_4h9utv7", 
          templateParams,
          "iphK7lNLyu9-Lb6ZW"
        )
        .then(
          (response) => {
            console.log("Email gửi thành công:", response);
            setResetMessage("Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.");
            setResetEmail(""); 
          },
          (error) => {
            console.error("Có lỗi khi gửi email:", error);
          }
        );
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div className="input">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        
        {/* Phần lựa chọn Role (User hoặc Admin) */}
        {action === "Login" && (
          <div className="input">
            <label>Choose Role: </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        )}
      </div>

      {action === "Login" && (
        <div className="forgot-password">
          Lost Password?<span onClick={() => setShowResetPassword(true)}> Click here</span>
        </div>
      )}

      {action === "Login" && (
        <div className="signup-prompt">
          Don't have an account? <span onClick={() => setAction("Sign Up")}>Signup</span>
        </div>
      )}
      {action === "Sign Up" && (
        <div className="login-prompt">
          Already have an account? <span onClick={() => setAction("Login")}>Login</span>
        </div>
      )}
      <div className="submit-container">
        {action === "Sign Up" ? (
          <div className="submit" onClick={handleSignUp}>
            Signup
          </div>
        ) : (
          <div className="submit" onClick={handleLogin}>
            Login
          </div>
        )}
      </div>

      {showResetPassword && (
        <div className="reset-password-modal">
          <h3>Reset Password</h3>
          <div className="input">
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
            {resetErrors.email && <div className="error">{resetErrors.email}</div>}
          </div>
          <div className="submit-container">
            <div className="submit" onClick={handleResetPassword}>
              Send Reset Link
            </div>
          </div>
          {resetMessage && <div className="success-message">{resetMessage}</div>}
          <div className="close-modal" onClick={() => setShowResetPassword(false)}>Close</div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
