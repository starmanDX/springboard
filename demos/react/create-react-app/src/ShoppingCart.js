import React from "react";
import CartItem from './CartItem';
import "./ShoppingCart.css";

const ShoppingCart = ({ items, user }) => {
    const total = items.reduce((acc, i) => {
        return acc + i.price * i.quantity
    }, 0)
    return (
        <div className="ShoppingCart">
            <h1 className="ShoppingCart-header">Shopping Cart for {user}</h1>
            <div>
                {items.map((i) => (
                    <CartItem key={i.id} item={i.name} img={i.img} price={i.price} quantity={i.quantity} />
            ))}
            </div>
            <p className="ShoppingCart-total">Cart Total: ${total}</p>
        </div>
    )
};

export default ShoppingCart;