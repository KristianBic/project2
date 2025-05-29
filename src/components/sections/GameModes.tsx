import React from 'react';
import { Users, Flag, Shield, Zap } from 'lucide-react';
import GameModeCard from '../ui/GameModeCard';

const GameModes: React.FC = () => {
  const gameModes = [
    {
      id: 'multiplayer',
      title: 'Multiplayer',
      description: 'Battle against other players in real-time strategy combat with up to 100 players on a single map.',
      icon: <Users className="text-blue-500" size={24} />,
      color: 'blue'
    },
    {
      id: 'conquest',
      title: 'Conquest',
      description: 'Capture and hold strategic points on the map to accumulate points and achieve victory.',
      icon: <Flag className="text-red-500" size={24} />,
      color: 'red'
    },
    {
      id: 'defense',
      title: 'Defense',
      description: 'Fortify your position and withstand waves of enemy attacks in this survival mode.',
      icon: <Shield className="text-green-500" size={24} />,
      color: 'green'
    },
    {
      id: 'blitz',
      title: 'Blitz',
      description: 'Fast-paced matches with accelerated resource gathering and unit production.',
      icon: <Zap className="text-yellow-500" size={24} />,
      color: 'yellow'
    }
  ];

  return (
    <section id="game-modes" className="py-20 bg-slate-100/50 dark:bg-slate-800/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Game Modes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore different ways to play OpenFront with various objectives and challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {gameModes.map(mode => (
            <GameModeCard
              key={mode.id}
              title={mode.title}
              description={mode.description}
              icon={mode.icon}
              color={mode.color}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-medium rounded-lg transition-all">
            View All Game Modes
          </button>
        </div>
      </div>
    </section>
  );
};

export default GameModes;