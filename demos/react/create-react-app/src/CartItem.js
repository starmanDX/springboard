import React from "react";
import "./CartItem.css"

const CartItem = ({ item, img, price, quantity }) => (
  <div className="CartItem">
    <h4 className="CartItem-title">{item}</h4>
    <img src={img} className="CartItem-img" alt="" />
    <ul>
      <li>Price: ${price}</li>
      <li>Quantity: {quantity}</li>
      <li>Subtotal: ${quantity * price}</li>
    </ul>
  </div>
);

export default CartItem;
