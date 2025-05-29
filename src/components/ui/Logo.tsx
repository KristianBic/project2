import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl'
  };
  
  return (
    <div className="flex items-center">
      <div className={`font-pixel font-bold ${sizeClasses[size]} text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400`}>
        OpenFront
      </div>
      <div className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">v22.6</div>
    </div>
  );
};

export default Logo;