import React, { useState } from "react";
import "./Danhgia.css";

const Danhgia = ({ orderDetails }) => {  // Nhận orderDetails từ props
  const [buyerInfo, setBuyerInfo] = useState(orderDetails.customerName ? {
    name: orderDetails.customerName,
    phone: orderDetails.phone,
    address: orderDetails.address
  } : null);
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitTime, setSubmitTime] = useState(null); // Thời gian gửi đánh giá

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rating === 0) {
      setError("Vui lòng chọn điểm đánh giá!");
      return;
    }

    if (!buyerInfo) {
      setError("Không tìm thấy thông tin người mua.");
      return;
    }

    const reviewData = {
      rating,
      comment,
      customerName: buyerInfo.name,
      phone: buyerInfo.phone,
      address: buyerInfo.address,
      items: orderDetails.items,  // Truyền thông tin sản phẩm
      createdAt: new Date().toISOString(), // Lưu thời gian gửi đánh giá
    };

    try {
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi gửi đánh giá.");
      }

      setSubmitted(true);
      setError("");
      setSubmitTime(new Date().toLocaleString()); // Lưu thời gian gửi đánh giá sau khi thành công
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="review-page">
      <h2>Đánh giá sản phẩm</h2>

      {buyerInfo && (
        <div>
          <p><strong>Người mua:</strong> {buyerInfo.name}</p>
          <p><strong>Số điện thoại:</strong> {buyerInfo.phone}</p>
          <p><strong>Địa chỉ:</strong> {buyerInfo.address}</p>
        </div>
      )}

      {orderDetails && (
        <div>
          <h3>Sản phẩm đã mua:</h3>
          {orderDetails.items.map((item) => (
            <div key={item.id}>
              <p><strong>{item.title}</strong></p>
            </div>
          ))}
        </div>
      )}

      {submitted ? (
        <div>
          <p>Đánh giá của bạn đã được gửi thành công!</p>
          <p><strong>Thời gian gửi:</strong> {submitTime}</p> {/* Hiển thị thời gian gửi */}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Đánh giá: </label>
            <select value={rating} onChange={handleRatingChange}>
              <option value={0}>Chọn điểm đánh giá</option>
              <option value={1}>1 sao</option>
              <option value={2}>2 sao</option>
              <option value={3}>3 sao</option>
              <option value={4}>4 sao</option>
              <option value={5}>5 sao</option>
            </select>
          </div>
          <div>
            <label>Bình luận: </label>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Viết bình luận của bạn..."
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Gửi Đánh Giá</button>
        </form>
      )}
    </div>
  );
};

export default Danhgia;
