import React from 'react';

function Logo({ isDarkBackground = false, size = 'text-2xl' }) {
  const textColor = isDarkBackground ? 'text-white' : 'text-gray-900';
  const blueColor = isDarkBackground ? 'text-blue-400' : 'text-blue-600';

  return (
    <div className={`font-serif font-bold ${size}`}>
      <span className={textColor}>Word</span>
      <span className={blueColor}>Nest</span>
    </div>
  );
}

export default Logo;