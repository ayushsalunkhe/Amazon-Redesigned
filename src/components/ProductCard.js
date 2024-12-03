import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ id, title, price, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden"
    >
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-lg text-indigo-400 mt-2">${price}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
