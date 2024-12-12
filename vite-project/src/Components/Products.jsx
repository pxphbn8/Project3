import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import Search from './Search';  

function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");  
  const [sortOption, setSortOption] = useState("");  
  const [selectedCategory, setSelectedCategory] = useState("all");  // Trạng thái cho nút được chọn

  useEffect(() => {
    let componentMounted = true;
    const getProducts = async () => {
      const response = await fetch("http://localhost:3000/products");
      if (componentMounted) {
        const products = await response.json();
        setData(products);
        setFilter(products); 
      }
    };
    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    let updatedList = data;
    if (searchQuery !== "") {
      updatedList = data.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOption === "lowToHigh") {
      updatedList = updatedList.sort((a, b) => b.price - a.price);  
    } else if (sortOption === "highToLow") {
      updatedList = updatedList.sort((a, b) => a.price - b.price);  
    }

    setFilter(updatedList);
  }, [searchQuery, data, sortOption]);

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);  // Cập nhật nút hiện tại được chọn
    if (category === "all") {
      setFilter(data);  // Hiển thị tất cả sản phẩm khi chọn "All"
    } else {
      filterProduct(category);  // Lọc theo loại sản phẩm khi chọn một category
    }
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="sort-options">
          <select
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <div className="buttons">
          <button
            className={`btn me-2 ${selectedCategory === "all" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => handleCategoryClick("all")}
          >
            All
          </button>
          <button
            className={`btn me-2 ${selectedCategory === "Iphone" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => handleCategoryClick("Iphone")}
          >
            Iphone
          </button>
          <button
            className={`btn me-2 ${selectedCategory === "Samsung" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => handleCategoryClick("Samsung")}
          >
            Samsung
          </button>
          <button
            className={`btn me-2 ${selectedCategory === "Xiaomi" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => handleCategoryClick("Xiaomi")}
          >
            Xiaomi
          </button>
          <button
            className={`btn me-2 ${selectedCategory === "Oppo" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => handleCategoryClick("Oppo")}
          >
            Oppo
          </button>
          <button
            className={`btn me-2 ${selectedCategory === "Vivo" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => handleCategoryClick("Vivo")}
          >
            Vivo
          </button>
        </div>

        {filter.map((product) => (
          <div className="col-md-3" key={product.id}>
            <div className="card h-100 text-center p-4">
              <img src={product.img} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-text">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <p className="card-text">Quantity: {product.Quantity}</p>
                <NavLink to={`/products/${product.id}`} className="btn btn-primary">Detail</NavLink>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Latest Products</h1>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <Search setSearchQuery={setSearchQuery} /> {/* Search component */}
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {<ShowProducts />}
        </div>
      </div>
    </div>
  );
}

export default Products;
