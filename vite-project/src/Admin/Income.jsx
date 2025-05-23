import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import './Income.css';

const Income = () => {
  const [orders, setOrders] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);

        // Tính tổng thu nhập từ các đơn hàng có trạng thái 'Đã Giao Hàng'
        const income = data
          .filter(order => order.status === 'Đã Giao Hàng')
          .reduce((sum, order) => sum + order.total, 0);

        setTotalIncome(income);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container my-5">
      <h2>Tổng Thu Nhập</h2>
      <p>Tổng thu nhập từ các đơn hàng đã giao thành công: <strong>${totalIncome.toFixed(2)}</strong></p>

      <NavLink to="/Admin" className="btn btn-primary">
        Quay lại trang quản lý
      </NavLink>
    </div>
  );
};

export default Income;
