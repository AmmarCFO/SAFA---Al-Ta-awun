
import React from 'react';

const Header_ar: React.FC<{ onToggleLanguage: () => void }> = ({ onToggleLanguage }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#4A2C5A] rounded-lg flex items-center justify-center text-white font-bold text-lg sm:text-xl">م</div>
             <span className="text-2xl sm:text-3xl font-extrabold text-[#4A2C5A] tracking-tight">مثوى</span>
          </div>
          <button 
            onClick={onToggleLanguage}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-[#4A2C5A] bg-[#A99484]/10 rounded-md hover:bg-[#A99484]/20 transition-colors font-cairo"
          >
            English
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header_ar;
