import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addCart, delCart } from '../redux/action';

const Cart = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(addCart(product));
  };

  const handleRemove = (product) => {
    dispatch(delCart(product));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, product) => total + product.qty * product.price, 0);
  };

  return (
    <div>
      <div className="row">
        {cartItems.length === 0 ? (
          <h3>Your cart is empty.</h3>
        ) : (
          cartItems.map((product) => (
            <div className="col-md-4" key={product.id}>
              <img src={product.img} alt={product.title} className="img-fluid" />
              <div>
                <h5 className="card-text">{product.title}</h5>
                <p className="lead fw-bold">
                  {product.qty} X ${product.price} = ${product.qty * product.price}
                </p>
                <button
                  className="btn btn-outline-dark me-4"
                  onClick={() => handleRemove(product)}
                >
                  <i className="fa fa-minus"></i>
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => handleAdd(product)}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-4">
          <h4>Total Price: ${calculateTotal()}</h4>
        </div>
      )}
      <div className="buttons ms-2">
        <NavLink to="/Thanhtoan" className="btn btn-outline-dark">
          <i className="fa fa-user me-1"></i> Thanhtoan
        </NavLink>
      </div>
    </div>
  );
};

export default Cart;
