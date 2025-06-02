import React, { useState } from 'react';
import { Settings, User, Mail, LogIn, Users, Swords, BookOpen, Languages, Bell, Flag, Palette } from 'lucide-react';
import { useTheme } from '../components/theme/ThemeProvider';
import Logo from '../components/ui/Logo';
import LoginModal from '../components/modals/LoginModal';
import SettingsModal from '../components/modals/SettingsModal';
import LanguageModal from '../components/modals/LanguageModal';
import InstructionsModal from '../components/modals/InstructionsModal';
import JoinGameModal from '../components/modals/JoinGameModal';
import CreateLobbyModal from '../components/modals/CreateLobbyModal';
import NewsModal from '../components/modals/NewsModal';
import GameCard from '../components/ui/GameCard';

const LandingPage: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
  const [isJoinGameModalOpen, setIsJoinGameModalOpen] = useState(false);
  const [isCreateLobbyModalOpen, setIsCreateLobbyModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<null | {
    type: string;
    title: string;
    date: string;
    description: string;
  }>(null);
  const [username, setUsername] = useState('');
  const [selectedFlag, setSelectedFlag] = useState('🇺🇸');
  const [selectedPattern, setSelectedPattern] = useState('⚜️');

  const flags = ['🇺🇸', '🇬🇧', '🇫🇷', '🇩🇪', '🇮🇹', '🇪🇸', '🇷🇺', '🇯🇵', '🇰🇷', '🇨🇳'];
  const patterns = ['⚜️', '☘️', '✴️', '❇️', '✳️', '〽️', '🔰', '🎴', '🔱', '📛'];

  const news = [
    {
      type: 'EVENT',
      title: 'Weekend tournament starting soon',
      date: '5h ago',
      description: 'Join the battle for glory and prizes this weekend!'
    },
    {
      type: 'PATCH',
      title: 'Balance Update v22.6.1',
      date: '1d ago',
      description: '• Improved troop movement AI\n• Fixed alliance request bug\n• Adjusted resource generation rates'
    }
  ];

  const [showFlagDropdown, setShowFlagDropdown] = useState(false);
  const [showPatternDropdown, setShowPatternDropdown] = useState(false);
  
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-between relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            filter: 'blur(4px) brightness(0.4)',
            imageRendering: 'pixelated'
          }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-900/80"></div>
        <div className="absolute inset-0 bg-grid-tactical"></div>
      </div>

      <div className="scanlines"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Logo size="lg" />
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="pixel-button"
          >
            <User size={18} className="inline-block mr-2" />
            <span>SIGN IN</span>
          </button>
        </div>

        {/* Game Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Game Area and Buttons */}
          <div className="lg:col-span-8 space-y-8">
            <GameCard
              title="Gateway to the Atlantic"
              image="https://openfront.io/images/AfricaThumb.2e6cfd49ef4b0e214f47.webp"
              players={{ current: 58, max: 100 }}
              teams={6}
              timeRemaining="34s"
              isHighlighted={true}
            />

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {/* Primary Actions */}
              <div className="space-y-4">
                <button 
                  onClick={() => setIsJoinGameModalOpen(true)}
                  className="w-full pixel-button flex items-center justify-center"
                >
                  <Users size={18} className="mr-2" />
                  JOIN GAME
                </button>
                <button className="w-full pixel-button bg-slate-600 flex items-center justify-center">
                  <User size={18} className="mr-2" />
                  Single Player
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="space-y-4">
                <button 
                  onClick={() => setIsCreateLobbyModalOpen(true)}
                  className="w-full pixel-button bg-blue-600 flex items-center justify-center"
                >
                  <Swords size={18} className="mr-2" />
                  CREATE GAME
                </button>
                <button 
                  onClick={() => setIsInstructionsModalOpen(true)}
                  className="w-full pixel-button bg-slate-600 flex items-center justify-center"
                >
                  <BookOpen size={18} className="mr-2" />
                  Instructions
                </button>
              </div>

              {/* Language Selection - Full Width */}
              <div className="col-span-2">
                <button 
                  onClick={() => setIsLanguageModalOpen(true)}
                  className="w-full pixel-button bg-slate-600 flex items-center justify-center gap-2"
                >
                  <Languages size={18} />
                  <span className="text-sm">🇺🇸</span> English (English)
                </button>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-4 space-y-4">
            {/* Quick Join */}
            <div className="pixel-panel p-4">
              <h3 className="font-pixel text-xl text-white mb-4">QUICK JOIN</h3>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ENTER USERNAME..."
                    className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-700 font-pixel text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    style={{ caretColor: '#60A5FA' }}
                  />
                </div>
                <div className="flex gap-2">
                  {/* Flag Selection */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowFlagDropdown(!showFlagDropdown);
                        setShowPatternDropdown(false);
                      }}
                      className="pixel-button bg-slate-700 p-3 flex items-center justify-center min-w-[48px]"
                    >
                      <span className="text-xl">{selectedFlag}</span>
                    </button>
                    {showFlagDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-48 pixel-panel p-2 z-50">
                        <div className="grid grid-cols-5 gap-1">
                          {flags.map((flag) => (
                            <button
                              key={flag}
                              onClick={() => {
                                setSelectedFlag(flag);
                                setShowFlagDropdown(false);
                              }}
                              className="p-2 hover:bg-slate-700 transition-colors text-xl"
                            >
                              {flag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pattern Selection */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowPatternDropdown(!showPatternDropdown);
                        setShowFlagDropdown(false);
                      }}
                      className="pixel-button bg-slate-700 p-3 flex items-center justify-center min-w-[48px]"
                    >
                      <span className="text-xl">{selectedPattern}</span>
                    </button>
                    {showPatternDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-48 pixel-panel p-2 z-50">
                        <div className="grid grid-cols-5 gap-1">
                          {patterns.map((pattern) => (
                            <button
                              key={pattern}
                              onClick={() => {
                                setSelectedPattern(pattern);
                                setShowPatternDropdown(false);
                              }}
                              className="p-2 hover:bg-slate-700 transition-colors text-xl"
                            >
                              {pattern}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Server Stats */}
            <div className="pixel-panel p-4">
              <h3 className="font-pixel text-xl text-white mb-4">SERVER STATUS</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center font-pixel">
                  <span className="text-slate-400">PLAYERS ONLINE</span>
                  <span className="text-green-400">1,240</span>
                </div>
                <div className="flex justify-between items-center font-pixel">
                  <span className="text-slate-400">ACTIVE GAMES</span>
                  <span className="text-blue-400">42</span>
                </div>
              </div>
            </div>

            {/* Latest News */}
            <div className="pixel-panel p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-pixel text-xl text-white">LATEST NEWS</h3>
                <Bell size={18} className="text-slate-400" />
              </div>
              <div className="space-y-4">
                {news.map((item, index) => (
                  <div 
                    key={index} 
                    className="pixel-panel p-3 hover:bg-slate-800/50 transition-all cursor-pointer group"
                    onClick={() => setSelectedNews(item)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-pixel px-2 py-0.5 ${
                        item.type === 'EVENT' ? 'bg-green-600' : 'bg-orange-600'
                      } text-white`}>
                        {item.type}
                      </span>
                      <span className="text-xs text-slate-400">{item.date}</span>
                    </div>
                    <h4 className="font-pixel text-white text-sm mb-1 group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 whitespace-pre-line">
                      {item.description}
                      <span className="text-blue-400 hover:text-blue-300 transition-colors ml-1">
                        Read more...
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsSettingsModalOpen(true)}
          className="pixel-button p-3"
        >
          <Settings size={24} />
        </button>
      </div>

      {/* Footer */}
      <div className="w-full bg-slate-900/80 backdrop-blur-sm border-t border-slate-800 mt-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center text-sm text-slate-400">
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">How to Play</a>
              <a href="#" className="hover:text-white transition-colors">Wiki</a>
              <a href="#" className="hover:text-white transition-colors">Join the Discord!</a>
            </div>
            <div className="flex gap-4">
              <span>©2025 OpenFront™</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
      <LanguageModal isOpen={isLanguageModalOpen} onClose={() => setIsLanguageModalOpen(false)} />
      <InstructionsModal isOpen={isInstructionsModalOpen} onClose={() => setIsInstructionsModalOpen(false)} />
      <JoinGameModal isOpen={isJoinGameModalOpen} onClose={() => setIsJoinGameModalOpen(false)} />
      <CreateLobbyModal isOpen={isCreateLobbyModalOpen} onClose={() => setIsCreateLobbyModalOpen(false)} />
      {selectedNews && (
        <NewsModal 
          isOpen={true} 
          onClose={() => setSelectedNews(null)} 
          news={selectedNews}
        />
      )}
    </div>
  );
};

export default LandingPage;