import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Thanhtoan = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, product) => total + product.qty * product.price, 0);
  };

  const handlePayment = async () => {
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      alert("Vui lòng điền đầy đủ thông tin nhận hàng!");
      return;
    }
  
    const order = {
        id: Math.floor(Math.random()*1000000).toString(),
      customerName: shippingInfo.name,
      phone: shippingInfo.phone,
      address: shippingInfo.address,
      total: calculateTotal(),
      items: cartItems,
      status: 'Chờ xác nhận'

    };
  
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
  
      if (response.ok) {
        localStorage.setItem('buyerInfo', JSON.stringify(shippingInfo));
        alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
        navigate(`/Trangcapnhat/${order.id}`);
      } else {
        alert("Đã xảy ra lỗi khi lưu đơn hàng!");
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2>Trang Thanh Toán</h2>

      <div className="mb-4">
        <h5>Xác nhận địa chỉ nhận hàng</h5>
        <form>
          <div className="mb-3">
            <label className="form-label">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={shippingInfo.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={shippingInfo.address}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </div>

      {cartItems.length === 0 ? (
        <h3>Giỏ hàng của bạn đang trống.</h3>
      ) : (
        <div>
          {cartItems.map((product) => (
            <div key={product.id} className="mb-3">
              <h5>{product.title}</h5>
              <p>
                {product.qty} x ${product.price} = ${product.qty * product.price}
              </p>
            </div>
          ))}

          <hr />
          <h4>Tổng Cộng: ${calculateTotal()}</h4>
          <button className="btn btn-success mt-3" onClick={handlePayment}>
            Xác Nhận Thanh Toán
          </button>
        </div>
      )}
    </div>
  );
};

export default Thanhtoan;
