import React, { useState } from 'react';
import { Users, Clock } from 'lucide-react';

interface GameCardProps {
  title: string;
  image: string;
  players: {
    current: number;
    max: number;
  };
  teams: number;
  timeRemaining: string;
  isHighlighted?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ 
  title, 
  image, 
  players, 
  teams, 
  timeRemaining,
  isHighlighted = false
}) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div 
      className={`pixel-panel p-4 rounded-none h-full cursor-pointer transition-all duration-300 hover:bg-slate-900/90 hover:border-blue-500/50 ${
        isToggled ? 'border-blue-500 bg-slate-800/80' : ''
      }`}
      onClick={() => setIsToggled(!isToggled)}
    >
      <div className="relative h-64 mb-4">
        <img 
          src={image} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover bg-slate-900"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className={`font-pixel text-2xl mb-2 transition-colors duration-300 ${
            isToggled ? 'text-blue-300' : 'text-white'
          }`}>{title}</h3>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-white text-xs font-pixel transition-colors duration-300 ${
              isToggled ? 'bg-blue-700' : 'bg-blue-600'
            }`}>
              EUROPE
            </span>
            {isHighlighted && (
              <span className="px-2 py-1 bg-green-600 text-white text-xs font-pixel animate-pulse">
                FEATURED
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className={`pixel-panel p-3 transition-all duration-300 ${
          isToggled ? 'bg-slate-800/80 border-blue-500/50' : ''
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <Users size={16} className={`transition-colors duration-300 ${
              isToggled ? 'text-blue-300' : 'text-blue-400'
            }`} />
            <span className="font-pixel text-xs text-slate-400">PLAYERS</span>
          </div>
          <p className={`font-pixel transition-colors duration-300 ${
            isToggled ? 'text-blue-300' : 'text-white'
          }`}>
            {players.current}/{players.max}
          </p>
        </div>
        
        <div className={`pixel-panel p-3 transition-all duration-300 ${
          isToggled ? 'bg-slate-800/80 border-blue-500/50' : ''
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-4 h-4 flex items-center justify-center transition-colors duration-300 ${
              isToggled ? 'text-blue-300' : 'text-green-400'
            } font-bold`}>T</div>
            <span className="font-pixel text-xs text-slate-400">TEAMS</span>
          </div>
          <p className={`font-pixel transition-colors duration-300 ${
            isToggled ? 'text-blue-300' : 'text-white'
          }`}>{teams}</p>
        </div>
        
        <div className={`pixel-panel p-3 transition-all duration-300 ${
          isToggled ? 'bg-slate-800/80 border-blue-500/50' : ''
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <Clock size={16} className={`transition-colors duration-300 ${
              isToggled ? 'text-blue-300' : 'text-orange-400'
            }`} />
            <span className="font-pixel text-xs text-slate-400">TIME</span>
          </div>
          <p className={`font-pixel animate-pulse transition-colors duration-300 ${
            isToggled ? 'text-blue-300' : 'text-white'
          }`}>{timeRemaining}</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;