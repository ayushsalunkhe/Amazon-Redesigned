import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import './styles/scrollbar.css';

const AppContent = () => {
  const { darkMode } = useTheme();
  
  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : 'light'} custom-scrollbar`}>
        <motion.div 
          layout
          className="min-h-screen transition-all duration-500 ease-in-out"
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LayoutGroup>
        <AppContent />
      </LayoutGroup>
    </ThemeProvider>
  );
};

export default App;
