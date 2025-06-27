import React, { useState } from 'react';
import { Settings, User, Mail, LogIn, Users, Swords, BookOpen, Languages, Bell, Shield, Star, Flag, Plus } from 'lucide-react';
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

  // Nation flag images
  const flagImages = [
    { code: 'us', name: 'United States', url: 'https://flagcdn.com/w40/us.png' },
    { code: 'gb', name: 'United Kingdom', url: 'https://flagcdn.com/w40/gb.png' },
    { code: 'fr', name: 'France', url: 'https://flagcdn.com/w40/fr.png' },
    { code: 'de', name: 'Germany', url: 'https://flagcdn.com/w40/de.png' },
    { code: 'it', name: 'Italy', url: 'https://flagcdn.com/w40/it.png' },
    { code: 'es', name: 'Spain', url: 'https://flagcdn.com/w40/es.png' },
    { code: 'ru', name: 'Russia', url: 'https://flagcdn.com/w40/ru.png' },
    { code: 'jp', name: 'Japan', url: 'https://flagcdn.com/w40/jp.png' },
    { code: 'kr', name: 'South Korea', url: 'https://flagcdn.com/w40/kr.png' },
    { code: 'cn', name: 'China', url: 'https://flagcdn.com/w40/cn.png' },
    { code: 'ca', name: 'Canada', url: 'https://flagcdn.com/w40/ca.png' },
    { code: 'au', name: 'Australia', url: 'https://flagcdn.com/w40/au.png' },
    { code: 'br', name: 'Brazil', url: 'https://flagcdn.com/w40/br.png' },
    { code: 'in', name: 'India', url: 'https://flagcdn.com/w40/in.png' },
    { code: 'mx', name: 'Mexico', url: 'https://flagcdn.com/w40/mx.png' },
    { code: 'nl', name: 'Netherlands', url: 'https://flagcdn.com/w40/nl.png' },
    { code: 'se', name: 'Sweden', url: 'https://flagcdn.com/w40/se.png' },
    { code: 'no', name: 'Norway', url: 'https://flagcdn.com/w40/no.png' },
    { code: 'pl', name: 'Poland', url: 'https://flagcdn.com/w40/pl.png' },
    { code: 'tr', name: 'Turkey', url: 'https://flagcdn.com/w40/tr.png' },
  ];

  // Military insignia/decoration images
  const insigniaImages = [
    { id: 'star', name: 'Star Medal', url: 'https://images.pexels.com/photos/8828462/pexels-photo-8828462.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
    { id: 'cross', name: 'Cross Medal', url: 'https://images.pexels.com/photos/8828463/pexels-photo-8828463.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
    { id: 'shield', name: 'Shield Badge', url: 'https://images.pexels.com/photos/8828464/pexels-photo-8828464.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
    { id: 'eagle', name: 'Eagle Insignia', url: 'https://images.pexels.com/photos/8828465/pexels-photo-8828465.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
    { id: 'crown', name: 'Crown Badge', url: 'https://images.pexels.com/photos/8828466/pexels-photo-8828466.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
    { id: 'sword', name: 'Sword Medal', url: 'https://images.pexels.com/photos/8828467/pexels-photo-8828467.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
    { id: 'anchor', name: 'Naval Badge', url: 'https://images.pexels.com/photos/8828468/pexels-photo-8828468.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
    { id: 'wings', name: 'Air Force Wings', url: 'https://images.pexels.com/photos/8828469/pexels-photo-8828469.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
    { id: 'ribbon', name: 'Service Ribbon', url: 'https://images.pexels.com/photos/8828470/pexels-photo-8828470.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
    { id: 'medal', name: 'Honor Medal', url: 'https://images.pexels.com/photos/8828471/pexels-photo-8828471.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2' },
  ];

  const [selectedFlagImage, setSelectedFlagImage] = useState<typeof flagImages[0] | null>(null);
  const [selectedInsignia, setSelectedInsignia] = useState<typeof insigniaImages[0] | null>(null);

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
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <User size={16} className="text-slate-500" />
                      </div>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="ENTER USERNAME..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-800 border-2 border-slate-700 font-pixel text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        style={{ caretColor: '#60A5FA' }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {/* Nation Flag Selection - Refined */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          setShowFlagDropdown(!showFlagDropdown);
                          setShowPatternDropdown(false);
                        }}
                        className={`h-full px-3 py-3 flex items-center justify-center min-w-[52px] transition-all duration-200 group ${
                          selectedFlagImage 
                            ? 'pixel-button bg-blue-600 hover:bg-blue-700' 
                            : 'bg-gradient-to-br from-blue-500/20 to-blue-600/30 border border-blue-400/50 hover:border-blue-300 hover:from-blue-500/30 hover:to-blue-600/40 backdrop-blur-sm'
                        }`}
                        title="Select Nation Flag"
                      >
                        {selectedFlagImage ? (
                          <div className="relative">
                            <Flag size={18} className="text-white" />
                            <div className="absolute -top-1 -right-1 w-5 h-4 rounded-sm overflow-hidden border border-white/30 shadow-lg">
                              <img 
                                src={selectedFlagImage.url} 
                                alt={selectedFlagImage.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-8 h-6 rounded-sm bg-blue-500/20 flex items-center justify-center relative overflow-hidden">
                              <Flag size={16} className="text-blue-300" />
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                            </div>
                            <div className="text-[8px] font-pixel text-blue-300 leading-none">FLAG</div>
                          </div>
                        )}
                      </button>
                      {showFlagDropdown && (
                        <div className="absolute top-full right-0 mt-2 w-64 pixel-panel p-3 z-50 shadow-2xl">
                          <div className="text-xs font-pixel text-white mb-2 text-center">SELECT NATION FLAG</div>
                          <div className="grid grid-cols-5 gap-2">
                            {flagImages.map((flag) => (
                              <button
                                key={flag.code}
                                onClick={() => {
                                  setSelectedFlagImage(flag);
                                  setShowFlagDropdown(false);
                                }}
                                className="p-2 hover:bg-slate-700 transition-colors rounded group"
                                title={flag.name}
                              >
                                <div className="w-8 h-6 rounded-sm overflow-hidden border border-slate-500 group-hover:border-slate-400 transition-colors shadow-md">
                                  <img 
                                    src={flag.url} 
                                    alt={flag.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Military Insignia Selection - Refined */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          setShowPatternDropdown(!showPatternDropdown);
                          setShowFlagDropdown(false);
                        }}
                        className={`h-full px-3 py-3 flex items-center justify-center min-w-[52px] transition-all duration-200 group ${
                          selectedInsignia 
                            ? 'pixel-button bg-orange-600 hover:bg-orange-700' 
                            : 'bg-gradient-to-br from-orange-500/20 to-orange-600/30 border border-orange-400/50 hover:border-orange-300 hover:from-orange-500/30 hover:to-orange-600/40 backdrop-blur-sm'
                        }`}
                        title="Select Military Insignia"
                      >
                        {selectedInsignia ? (
                          <div className="relative">
                            <Star size={18} className="text-white" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full overflow-hidden border border-white/30 shadow-lg bg-slate-800">
                              <img 
                                src={selectedInsignia.url} 
                                alt={selectedInsignia.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.parentElement!.style.background = 'linear-gradient(45deg, #fbbf24, #f59e0b)';
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center relative overflow-hidden">
                              <Star size={14} className="text-orange-300" />
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                            </div>
                            <div className="text-[8px] font-pixel text-orange-300 leading-none">RANK</div>
                          </div>
                        )}
                      </button>
                      {showPatternDropdown && (
                        <div className="absolute top-full right-0 mt-2 w-64 pixel-panel p-3 z-50 shadow-2xl">
                          <div className="text-xs font-pixel text-white mb-2 text-center">SELECT MILITARY INSIGNIA</div>
                          <div className="grid grid-cols-5 gap-2">
                            {insigniaImages.map((insignia) => (
                              <button
                                key={insignia.id}
                                onClick={() => {
                                  setSelectedInsignia(insignia);
                                  setShowPatternDropdown(false);
                                }}
                                className="p-2 hover:bg-slate-700 transition-colors rounded group"
                                title={insignia.name}
                              >
                                <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-500 group-hover:border-slate-400 transition-colors bg-slate-800 shadow-md">
                                  <img 
                                    src={insignia.url} 
                                    alt={insignia.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                      target.parentElement!.style.background = 'linear-gradient(45deg, #fbbf24, #f59e0b)';
                                    }}
                                  />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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