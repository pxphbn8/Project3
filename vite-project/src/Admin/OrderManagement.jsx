import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:3000/orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    const updatedOrder = { status: newStatus };
  
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });
  
      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.error("Failed to update status on server");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  

  return (
    <div className="container my-5">
      <h2>Quản Lý Đơn Hàng</h2>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Khách Hàng</th>
              <th>Sản Phẩm</th>
              <th>Tổng Tiền</th>
              <th>Trạng Thái</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>
                  {order.items.map((item) => (
                    <div key={item.id}>{item.title}</div>
                  ))}
                </td>
                <td>${order.total}</td>
                <td>{order.status || "Chờ xác nhận"}</td>
                <td>
                  {order.status === "Chờ xác nhận" && (
                    <>
                      <button
                        className="btn btn-success btn-sm mr-2"
                        onClick={() => updateOrderStatus(order.id, 'Đã Xác Nhận')}
                      >
                        Xác Nhận
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateOrderStatus(order.id, 'Đã Từ Chối')}
                      >
                        Từ Chối
                      </button>
                    </>
                  )}
                  {order.status === "Đã Xác Nhận" && (
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => updateOrderStatus(order.id, 'Đang Giao Hàng')}
                    >
                      Xác Nhận Lấy Hàng
                    </button>
                  )}
                    {order.status === "Đang Giao Hàng" && (
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => updateOrderStatus(order.id, 'Đã Giao Hàng')}
                    >
                      Giao hàng thành công
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
       <NavLink to="/Admin" className="btn btn-primary">
                    Cancel
                </NavLink>
    </div>
  );
};

export default OrderManagement;
