import React, { useState, useEffect, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import { useInView } from "react-intersection-observer";
import { 
  FaShoppingCart, 
  FaHeart, 
  FaStar, 
  FaShieldAlt, 
  FaTruck,
  FaCheck 
} from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const colors = ['black', 'white', 'gray', 'blue'];
  const sizes = ['S', 'M', 'L', 'XL'];

  useEffect(() => {
    // Fetch main product
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
    
    // Fetch related products
    fetch('https://fakestoreapi.com/products?limit=4')
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data));
  }, [id]);

  const handleAddToCart = () => {
    setShowAddedAnimation(true);
    setTimeout(() => setShowAddedAnimation(false), 2000);
  };

  const ProductModel = ({ imageUrl }) => {
    const texture = useLoader(TextureLoader, imageUrl);
    
    return (
      <>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshStandardMaterial map={texture} />
        </mesh>
        <OrbitControls enableZoom={true} />
      </>
    );
  };

  const Loading = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1e1e1e] flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="w-16 h-16 border-4 border-t-purple-600 border-r-pink-600 rounded-full"
      />
    </div>
  );

  if (!product) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1e1e1e] text-white pt-32 p-8">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Product Gallery */}
          <div className="space-y-4">
            <motion.div 
              layoutId={`product-${id}`}
              className="relative h-[500px] bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-2xl"
              onHoverStart={() => setIsZoomed(true)}
              onHoverEnd={() => setIsZoomed(false)}
            >
              <motion.img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                animate={{ scale: isZoomed ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100"
                transition={{ duration: 0.3 }}
              >
                <span className="text-white">Click to zoom</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Product Information */}
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {product.title}
            </h1>

            <div className="flex items-center space-x-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < 4 ? "text-yellow-400" : "text-gray-400"} />
                ))}
              </div>
              <span className="text-gray-400">(128 Reviews)</span>
            </div>

            <p className="text-gray-300 leading-relaxed">
              {product.description}
            </p>

            <motion.div 
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
            >
              ${product.price}
            </motion.div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Color</h3>
              <div className="flex space-x-4">
                {colors.map((color) => (
                  <motion.button
                    key={color}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === color ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#1e1e1e]' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Size</h3>
              <div className="flex space-x-4">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedSize === size 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-[#2a2a2a] text-gray-300'
                    }`}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 bg-[#2a2a2a] rounded-full p-2">
                <motion.button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1e1e1e]"
                >
                  -
                </motion.button>
                <span className="w-8 text-center">{quantity}</span>
                <motion.button 
                  onClick={() => setQuantity(quantity + 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1e1e1e]"
                >
                  +
                </motion.button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-full font-semibold flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence>
                  {showAddedAnimation ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center"
                    >
                      <FaCheck className="mr-2" /> Added!
                    </motion.span>
                  ) : (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center"
                    >
                      <FaShoppingCart className="mr-2" /> Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <motion.div 
                className="flex items-center space-x-3 bg-[#2a2a2a] p-4 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <FaShieldAlt className="text-purple-500 text-xl" />
                <span>Secure Payment</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 bg-[#2a2a2a] p-4 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <FaTruck className="text-pink-500 text-xl" />
                <span>Fast Delivery</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Related Products */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id}>
                <motion.div 
                  className="bg-[#2a2a2a] rounded-xl overflow-hidden"
                  whileHover={{ y: -10 }}
                >
                  <div className="h-48 overflow-hidden">
                    <motion.img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold truncate">{item.title}</h3>
                    <p className="text-purple-500 font-bold mt-2">${item.price}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;