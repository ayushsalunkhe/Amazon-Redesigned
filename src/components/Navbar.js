import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  ShoppingCart, 
  UserCircle2, 
  Moon, 
  Sun
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 20 }}
      className="fixed top-0 inset-x-4 z-50 mx-auto max-w-7xl"
    >
      <motion.div 
        className={`rounded-full backdrop-blur-sm ${
          darkMode 
            ? 'bg-gray-900/30 border-cyan-500/20' 
            : 'bg-white/30 border-indigo-500/20'
        } border-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-full blur-xl opacity-50 ${
          darkMode 
            ? 'bg-cyan-500/20'
            : 'bg-indigo-500/20'
        }`} />

        {/* Content */}
        <div className="relative px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`relative w-10 h-10 rounded-xl overflow-hidden ${
                  darkMode 
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                }`}>
                  <motion.div
                    className="absolute inset-0 opacity-80"
                    animate={{
                      background: [
                        'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.3) 100%)',
                        'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.3) 100%)',
                        'linear-gradient(360deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.3) 100%)'
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                    A
                  </span>
                </div>
                <motion.span 
                  className={`text-2xl font-bold bg-gradient-to-r ${
                    darkMode
                      ? 'from-cyan-400 to-blue-400'
                      : 'from-indigo-400 to-purple-400'
                  } bg-clip-text text-transparent`}
                >
                  Amazon
                </motion.span>
              </motion.div>
            </Link>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { icon: Home, text: 'Home', to: '/' },
                { icon: ShoppingCart, text: 'Cart', to: '/cart' },
                { icon: UserCircle2, text: 'Account', to: '/account' }
              ].map(({ icon: Icon, text, to }) => {
                const isActive = location.pathname === to;
                return (
                  <Link key={text} to={to}>
                    <motion.div
                      className="group relative"
                      whileHover={{ y: -2 }}
                    >
                      <motion.div 
                        className={`flex items-center space-x-2 relative z-10 ${
                          isActive
                            ? darkMode ? 'text-cyan-400' : 'text-indigo-600'
                            : darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                        whileHover="hover"
                      >
                        <motion.div
                          variants={{
                            hover: { rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.div>
                        <span className="font-medium">{text}</span>
                      </motion.div>

                      {/* Hover Effect */}
                      <motion.div
                        className={`absolute -bottom-1 left-0 right-0 h-px ${
                          darkMode ? 'bg-cyan-400' : 'bg-indigo-600'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className={`relative p-3 rounded-xl ${
                darkMode 
                  ? 'bg-gray-800 text-cyan-400' 
                  : 'bg-gray-100 text-indigo-600'
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>

              {/* Ripple Effect */}
              <motion.div
                className={`absolute inset-0 rounded-xl ${
                  darkMode ? 'bg-cyan-400' : 'bg-indigo-600'
                }`}
                initial={{ scale: 0, opacity: 0.3 }}
                whileTap={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-xl md:hidden ${
                darkMode 
                  ? 'bg-gray-800 text-cyan-400' 
                  : 'bg-gray-100 text-indigo-600'
              }`}
            >
              <div className="space-y-1.5">
                <motion.div 
                  className="w-6 h-0.5 rounded-full"
                  style={{ background: 'currentColor' }}
                />
                <motion.div 
                  className="w-4 h-0.5 rounded-full"
                  style={{ background: 'currentColor' }}
                />
                <motion.div 
                  className="w-6 h-0.5 rounded-full"
                  style={{ background: 'currentColor' }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;