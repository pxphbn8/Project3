import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductEdit = () => {
  const { productId } = useParams();  // Lấy productId từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id:"",
    title: "",
    quantity: "",
    price: "",
    category: "",
    img: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu sản phẩm từ API theo productId
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Product data before submit:", product); // Kiểm tra dữ liệu trước khi gửi

    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
  console.log("Updated product from server:", updatedProduct);  // Kiểm tra giá trị trả về từ backend
        navigate("/Admin");  // Điều hướng về trang quản lý sản phẩm sau khi cập nhật thành công
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <div className="product-edit-container">
      <h1>Edit Product</h1>
      {loading ? (
        <div>Loading product...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>ID</label>
            <input
              type="number"
              className="form-control"
              name="id"
              value={product.id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              name="Quantity"
              value={product.Quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input
              type= "number"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Image URL</label>
            <input
              type="text"
              className="form-control"
              name="img"
              value={product.img}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Product</button>
        </form>
      )}
    </div>
  );
};

export default ProductEdit;
