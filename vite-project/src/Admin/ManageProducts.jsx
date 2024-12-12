import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./ManageProducts.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter(product => product.id !== productId));  // Cập nhật lại danh sách sau khi xóa
      } else {
        alert("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const editProduct = (productId) => {
    navigate(`/ProductEdit/${productId}`);
  };

  return (
    <div className="manage-products-container">
      <h1>Manage Your Products</h1>
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <>
          <div className="buttons mb-3">
            <NavLink to="/ProductCreate" className="btn btn-primary">
              Add New Product
            </NavLink>
          </div>

          {products.length === 0 ? (
            <div>No products found.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.Quantity}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>
                      <button
                        onClick={() => editProduct(product.id)} 
                        className="btn btn-warning me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
           <NavLink to="/Admin" className="btn btn-primary">
                    Cancel
                </NavLink>
        </>
      )}
    </div>
  );
};

export default ManageProducts;
