import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [showReviews, setShowReviews] = useState(true); 

  // Hàm để lấy tất cả đánh giá từ server
  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:3000/reviews");

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi lấy danh sách đánh giá.");
      }

      const data = await response.json(); 

      // Sắp xếp các đánh giá theo thời gian giảm dần (mới nhất lên đầu)
      const sortedReviews = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      

      setReviews(sortedReviews);
    } catch (err) {
      setError(err.message);
    }
  };

  // Gọi hàm fetchReviews khi component được mount
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="reviews-page">
      <NavLink to="/Admin" className="close-btn">X </NavLink>
      <h2>Tất Cả Đánh Giá</h2>

      {showReviews && (
        <div className="reviews-container">
          {error && <p className="error-message">{error}</p>}

          {reviews.length === 0 ? (
            <p className="no-reviews">Không có đánh giá nào.</p>
          ) : (
            <ul>
              {reviews.map((review, index) => (
                <li key={index}>
                  
                  <p><strong>Đánh giá:</strong> {review.rating} sao</p>
                  <p><strong>Bình luận:</strong> {review.comment}</p>

                 
                  <p><strong>Người đánh giá:</strong> {review.customerName}</p>
                  <p><strong>Số điện thoại:</strong> {review.phone}</p>
                  <p><strong>Địa chỉ:</strong> {review.address}</p>

                 
                  {review.items && review.items.length > 0 && (
                    <div>
                      <strong>Sản phẩm đã mua:</strong>
                      <ul>
                        {review.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <p>{item.title}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Thời gian gửi đánh giá */}
                  <p><strong>Thời gian gửi:</strong> {new Date(review.createdAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;





