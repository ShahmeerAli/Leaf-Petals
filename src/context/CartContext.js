"use client";

import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("plantShopCart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (err) {
                console.error("Failed to parse cart", err);
            }
        }
    }, []);

    // Save cart to local storage on change
    useEffect(() => {
        localStorage.setItem("plantShopCart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (plant, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item._id === plant._id);
            if (existingItem) {
                toast.success(`Increased ${plant.name} quantity in cart!`);
                return prevCart.map((item) =>
                    item._id === plant._id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                toast.success(`Added ${plant.name} to cart!`);
                return [...prevCart, { ...plant, quantity }];
            }
        });
    };

    const removeFromCart = (plantId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== plantId));
        toast.success("Item removed from cart");
    };

    const updateQuantity = (plantId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(plantId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) => (item._id === plantId ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
