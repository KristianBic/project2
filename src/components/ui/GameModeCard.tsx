import React from 'react';
import { ArrowRight } from 'lucide-react';

interface GameModeCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const GameModeCard: React.FC<GameModeCardProps> = ({ title, description, icon, color }) => {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, hoverBg: string, darkBg: string, darkHoverBg: string }> = {
      blue: {
        bg: 'bg-blue-50',
        hoverBg: 'hover:bg-blue-100',
        darkBg: 'dark:bg-blue-900/20',
        darkHoverBg: 'dark:hover:bg-blue-900/30'
      },
      red: {
        bg: 'bg-red-50',
        hoverBg: 'hover:bg-red-100',
        darkBg: 'dark:bg-red-900/20',
        darkHoverBg: 'dark:hover:bg-red-900/30'
      },
      green: {
        bg: 'bg-green-50',
        hoverBg: 'hover:bg-green-100',
        darkBg: 'dark:bg-green-900/20',
        darkHoverBg: 'dark:hover:bg-green-900/30'
      },
      yellow: {
        bg: 'bg-yellow-50',
        hoverBg: 'hover:bg-yellow-100',
        darkBg: 'dark:bg-yellow-900/20',
        darkHoverBg: 'dark:hover:bg-yellow-900/30'
      }
    };
    
    return colorMap[color] || colorMap.blue;
  };
  
  const colors = getColorClasses(color);
  
  return (
    <div className={`rounded-xl p-6 ${colors.bg} ${colors.hoverBg} ${colors.darkBg} ${colors.darkHoverBg} transition-all duration-300 group cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700`}>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">{description}</p>
      <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        <span>Play now</span>
        <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export default GameModeCard;