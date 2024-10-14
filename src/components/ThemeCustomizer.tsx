import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Palette, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeCustomizer: React.FC = () => {
  const { mode, color, toggleMode, setColor } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? 0 : 'calc(100% - 40px)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-4"
          >
            <button
              onClick={toggleMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-200"
            >
              {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="flex items-center space-x-2">
              <Palette size={20} className="text-gray-600 dark:text-gray-400" />
              {['blue', 'green', 'purple', 'red'].map((c) => (
                <motion.button
                  key={c}
                  onClick={() => setColor(c as any)}
                  className={`w-6 h-6 rounded-full ${
                    color === c ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: c }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ThemeCustomizer;