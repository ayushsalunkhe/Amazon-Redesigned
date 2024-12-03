import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView, useTransform } from "framer-motion";
import { FaSearch, FaShoppingCart, FaFilter, FaTimes, FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const ProductCard = ({ product, index, darkMode }) => {
  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      key={product.id}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        perspective: "1000px"
      }}
      className={`group relative p-6 rounded-2xl ${
        darkMode 
          ? 'bg-gray-800/50 hover:bg-gray-700/50' 
          : 'bg-white/50 hover:bg-gray-50/50'
      } transition-colors duration-300 backdrop-blur-sm border-2 ${
        darkMode ? 'border-gray-700' : 'border-gray-100'
      }`}
    >
      {/* 3D Card Content Container */}
      <motion.div
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        className="relative z-10"
      >
        {/* Image Container */}
        <motion.div 
          className="relative aspect-square mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-transparent to-black/5"
          animate={{
            translateZ: isHovered ? "50px" : "0px"
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          {/* Background Glow */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            darkMode 
              ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10' 
              : 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10'
          }`} />

          {/* Product Image */}
          <motion.div
            className="relative w-full h-full p-6"
            animate={{
              translateZ: isHovered ? "30px" : "0px"
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain transform will-change-transform"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotateZ: isHovered ? 5 : 0
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            />
          </motion.div>

          {/* Category Tag */}
          <motion.div 
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm backdrop-blur-md ${
              darkMode
                ? 'bg-blue-500/20 text-blue-300'
                : 'bg-indigo-500/20 text-indigo-600'
            }`}
            animate={{
              translateZ: isHovered ? "60px" : "0px"
            }}
          >
            {product.category}
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="space-y-4"
          animate={{
            translateZ: isHovered ? "30px" : "0px"
          }}
        >
          <h3 className={`font-semibold text-lg line-clamp-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <motion.span 
              className={`text-2xl font-bold ${
                darkMode 
                  ? 'text-blue-400' 
                  : 'text-indigo-600'
              }`}
              animate={{
                translateZ: isHovered ? "40px" : "0px",
                scale: isHovered ? 1.1 : 1
              }}
            >
              ${product.price}
            </motion.span>
            
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl ${
                  darkMode 
                    ? 'bg-blue-500 hover:bg-blue-600' 
                    : 'bg-indigo-500 hover:bg-indigo-600'
                } text-white shadow-lg`}
                onClick={() => {
                  console.log('Added to cart:', product);
                }}
                animate={{
                  translateZ: isHovered ? "50px" : "0px"
                }}
              >
                <FaShoppingCart className="w-5 h-5" />
              </motion.button>
              
              <Link to={`/product/${product.id}`}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl ${
                    darkMode
                      ? 'bg-cyan-500 hover:bg-cyan-600'
                      : 'bg-purple-500 hover:bg-purple-600'
                  } text-white shadow-lg`}
                  animate={{
                    translateZ: isHovered ? "50px" : "0px"
                  }}
                >
                  <FaArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Card Shadow */}
      <div 
        className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
          darkMode
            ? 'group-hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]'
            : 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]'
        }`}
      />
    </motion.div>
  );
};

const Home = () => {
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeFeature, setActiveFeature] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effect for hero section
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const features = [
    {
      title: "Next-Gen Shopping",
      description: "Experience the future of online shopping with our AI-powered recommendations",
      color: darkMode ? "from-cyan-500 to-blue-500" : "from-indigo-500 to-purple-500"
    },
    {
      title: "Smart Delivery",
      description: "Track your packages in real-time with our advanced delivery system",
      color: darkMode ? "from-blue-500 to-purple-500" : "from-purple-500 to-pink-500"
    },
    {
      title: "Secure Payments",
      description: "Shop with confidence using our encrypted payment gateway",
      color: darkMode ? "from-purple-500 to-pink-500" : "from-pink-500 to-rose-500"
    }
  ];

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "all" || product.category === selectedCategory)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  return (
    <motion.div 
      layout
      className={`min-h-screen overflow-x-hidden custom-scrollbar ${darkMode ? 'dark' : 'light'} ${
        darkMode 
          ? 'bg-[#0a0a0a] text-white' 
          : 'bg-gray-50 text-gray-900'
      } transition-colors duration-500`}
    >
      {/* Progress Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-1 ${
          darkMode ? 'bg-cyan-500' : 'bg-indigo-500'
        } transform-origin-0 z-50`}
        style={{ scaleX }}
      />

      {/* Hero Section with Parallax */}
      <motion.div 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
              'radial-gradient(circle at 0% 100%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
              'radial-gradient(circle at 100% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                darkMode ? 'bg-cyan-500/30' : 'bg-indigo-500/30'
              }`}
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight
                ],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.h1 
                  className={`text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r ${features[activeFeature].color} bg-clip-text text-transparent`}
                  layoutId="hero-title"
                >
                  {features[activeFeature].title}
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-gray-400 mb-8"
                  layoutId="hero-description"
                >
                  {features[activeFeature].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-full max-w-xl mt-8"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className={`w-full px-6 py-4 rounded-xl ${
                darkMode 
                  ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' 
                  : 'bg-white text-gray-900 placeholder-gray-500 border-gray-200'
              } border-2 focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'focus:ring-cyan-500' 
                  : 'focus:ring-indigo-500'
              } transition-all duration-300`}
            />
            <FaSearch className={`absolute right-6 top-1/2 transform -translate-y-1/2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-6 h-10 rounded-full border-2 ${
              darkMode ? 'border-gray-700' : 'border-gray-300'
            } flex justify-center p-2`}
          >
            <motion.div
              animate={{ height: ["20%", "80%", "20%"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`w-1 rounded-full ${
                darkMode 
                  ? 'bg-gradient-to-b from-cyan-500 to-blue-500' 
                  : 'bg-gradient-to-b from-indigo-500 to-purple-500'
              }`}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Categories Section with Stagger Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`text-3xl font-bold text-center mb-8 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Browse Categories
        </motion.h2>
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="show"
        >
          {["all", ...new Set(products.map(p => p.category))].map((category, index) => (
            <motion.button
              key={category}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl ${
                selectedCategory === category
                  ? darkMode 
                    ? 'bg-cyan-500 text-white'
                    : 'bg-indigo-500 text-white'
                  : darkMode
                    ? 'bg-gray-800 text-gray-300'
                    : 'bg-white text-gray-600'
              } transition-all duration-300`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Products Grid with Scroll Animation */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;