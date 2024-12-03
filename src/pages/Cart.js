import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaMinus, FaPlus, FaArrowRight, FaShoppingBag, FaBox, FaTruck, FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Modern Wireless Headphones",
      price: 199.99,
      quantity: 1,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      color: "Black",
      delivery: "Express",
    },
    {
      id: 2,
      name: "Premium Smartwatch",
      price: 299.99,
      quantity: 1,
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      color: "Silver",
      delivery: "Standard",
    },
  ]);

  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
      },
    },
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: { width: "100%" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1e1e1e] text-white pt-32 p-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Your Cart
            </h1>
            <p className="text-gray-400 mt-2">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/products")}
            className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full transition-colors"
          >
            <span>Continue Shopping</span>
            <FaArrowRight className="text-purple-400" />
          </motion.button>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                transition: { duration: 1, repeat: Infinity },
              }}
            >
              <FaShoppingBag className="w-24 h-24 mx-auto text-gray-600 mb-6" />
            </motion.div>
            <h2 className="text-3xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Explore our products and find something you love!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-full font-semibold"
            >
              Start Shopping
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <motion.div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -100 }}
                    whileHover="hover"
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    className="group relative bg-gradient-to-r from-[#1e1e1e] to-[#2a2a2a] rounded-3xl p-6 overflow-hidden"
                  >
                    {/* Animated border gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ mixBlendMode: "overlay" }}
                    />
                    
                    {/* Progress bar for delivery status */}
                    <motion.div
                      variants={progressVariants}
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{
                        originX: 0,
                      }}
                    />

                    <div className="flex items-center gap-8">
                      {/* Image container with hover effect */}
                      <motion.div
                        className="relative w-32 h-32 rounded-2xl overflow-hidden bg-white/5"
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.2 }}
                          animate={{ scale: hoveredItem === item.id ? 1.3 : 1.2 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </motion.div>

                      {/* Product details with animated sections */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <motion.h3
                            className="text-xl font-semibold"
                            layout
                          >
                            {item.name}
                          </motion.h3>
                          <motion.div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                            <span>{item.color}</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <FaTruck className="mr-1" /> {item.delivery} Delivery
                            </span>
                          </motion.div>
                        </div>

                        {/* Interactive controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-1">
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                              >
                                <FaMinus className="w-3 h-3" />
                              </motion.button>
                              <motion.span
                                key={item.quantity}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-12 text-center font-medium"
                              >
                                {item.quantity}
                              </motion.span>
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                              >
                                <FaPlus className="w-3 h-3" />
                              </motion.button>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1, color: "#ef4444" }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <FaTrash />
                            </motion.button>
                          </div>
                          <motion.div
                            className="text-right"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.p
                              key={item.quantity}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                            >
                              ${(item.price * item.quantity).toFixed(2)}
                            </motion.p>
                            <p className="text-sm text-gray-400">
                              ${item.price} each
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Order Summary Card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#1e1e1e] rounded-3xl p-8 h-fit space-y-8 sticky top-32"
            >
              <h2 className="text-2xl font-semibold">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Subtotal</span>
                  <motion.span
                    key={total}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    ${total.toFixed(2)}
                  </motion.span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                    >
                      ${total.toFixed(2)}
                    </motion.span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2"
                >
                  <FaCreditCard />
                  <span>Checkout Now</span>
                </motion.button>
                
                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  <div className="bg-white/5 rounded-xl p-3">
                    <FaBox className="mx-auto mb-1 text-purple-400" />
                    <span className="text-gray-400">Free Returns</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <FaTruck className="mx-auto mb-1 text-pink-400" />
                    <span className="text-gray-400">Free Shipping</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;
