import React, { useState, useRef, useEffect } from 'react';
import { X, User, Trophy, Settings, Star, Crown, Shield, Swords, Target, Medal, Award, Calendar, Clock, MapPin, Flag } from 'lucide-react';

interface PlayerAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'profile' | 'stats' | 'achievements' | 'settings';

const PlayerAccountModal: React.FC<PlayerAccountModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };
  
  if (!isOpen) return null;

  const tabs = [
    { id: 'profile' as TabType, label: 'Profile', icon: <User size={18} /> },
    { id: 'stats' as TabType, label: 'Statistics', icon: <Trophy size={18} /> },
    { id: 'achievements' as TabType, label: 'Achievements', icon: <Medal size={18} /> },
    { id: 'settings' as TabType, label: 'Account', icon: <Settings size={18} /> },
  ];

  const achievements = [
    { id: 'first_win', name: 'First Victory', description: 'Win your first game', icon: '🏆', unlocked: true, date: '2024-12-15' },
    { id: 'conqueror', name: 'Conqueror', description: 'Control 50% of the map', icon: '👑', unlocked: true, date: '2024-12-20' },
    { id: 'diplomat', name: 'Diplomat', description: 'Form 10 alliances', icon: '🤝', unlocked: true, date: '2024-12-22' },
    { id: 'destroyer', name: 'Destroyer', description: 'Destroy 100 enemy units', icon: '💥', unlocked: true, date: '2024-12-25' },
    { id: 'strategist', name: 'Master Strategist', description: 'Win 25 games', icon: '🧠', unlocked: false, progress: 18 },
    { id: 'nuclear', name: 'Nuclear Option', description: 'Launch 50 nuclear weapons', icon: '☢️', unlocked: false, progress: 23 },
    { id: 'survivor', name: 'Survivor', description: 'Survive for 2 hours in a single game', icon: '⏰', unlocked: false, progress: 0 },
    { id: 'empire', name: 'Empire Builder', description: 'Build 1000 structures', icon: '🏗️', unlocked: false, progress: 342 },
  ];

  const recentGames = [
    { map: 'World', result: 'Victory', rank: 1, players: 87, duration: '2h 34m', date: '2024-12-28' },
    { map: 'Europe', result: 'Defeat', rank: 23, players: 64, duration: '1h 45m', date: '2024-12-27' },
    { map: 'Asia', result: 'Victory', rank: 1, players: 52, duration: '3h 12m', date: '2024-12-26' },
    { map: 'North America', result: 'Victory', rank: 2, players: 78, duration: '2h 01m', date: '2024-12-25' },
    { map: 'Africa', result: 'Defeat', rank: 45, players: 91, duration: '1h 23m', date: '2024-12-24' },
  ];
  
  return (
    <div 
      className={`fixed inset-0 z-50 overflow-auto flex bg-slate-900/50 backdrop-blur-sm modal-overlay ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className={`relative m-auto w-full max-w-6xl h-[85vh] bg-slate-900/60 backdrop-blur-sm border border-white/10 shadow-xl modal-content ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="font-pixel text-2xl text-white">Player Account</h2>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex h-[calc(85vh-80px)]">
          {/* Left Side Tabs */}
          <div className="pixel-panel p-1 w-56 flex flex-col border-r border-slate-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-pixel text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="pixel-panel p-8 flex-1 overflow-y-auto custom-scrollbar">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="font-pixel text-xl text-white mb-6">Player Profile</h3>
                
                {/* Player Info Card */}
                <div className="pixel-panel p-6">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-24 h-24 pixel-panel flex items-center justify-center">
                      <User size={48} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-pixel text-2xl text-white">trueANON</h4>
                        <div className="flex gap-1">
                          <Crown size={20} className="text-yellow-400" title="Top Player" />
                          <Shield size={20} className="text-blue-400" title="Veteran" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Joined Dec 2024</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>Global Server</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>Last seen 2h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="pixel-panel p-4 text-center">
                      <div className="text-2xl font-pixel text-blue-400 mb-1">1,247</div>
                      <div className="text-xs font-pixel text-slate-400">RANK</div>
                    </div>
                    <div className="pixel-panel p-4 text-center">
                      <div className="text-2xl font-pixel text-green-400 mb-1">73%</div>
                      <div className="text-xs font-pixel text-slate-400">WIN RATE</div>
                    </div>
                    <div className="pixel-panel p-4 text-center">
                      <div className="text-2xl font-pixel text-orange-400 mb-1">156</div>
                      <div className="text-xs font-pixel text-slate-400">GAMES</div>
                    </div>
                    <div className="pixel-panel p-4 text-center">
                      <div className="text-2xl font-pixel text-purple-400 mb-1">42h</div>
                      <div className="text-xs font-pixel text-slate-400">PLAYTIME</div>
                    </div>
                  </div>
                </div>

                {/* Recent Games */}
                <div className="pixel-panel p-6">
                  <h4 className="font-pixel text-lg text-white mb-4">Recent Games</h4>
                  <div className="space-y-3">
                    {recentGames.map((game, index) => (
                      <div key={index} className="pixel-panel p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${
                            game.result === 'Victory' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <div className="font-pixel text-white text-sm">{game.map}</div>
                            <div className="text-xs text-slate-400">{game.players} players • {game.duration}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-pixel text-sm ${
                            game.result === 'Victory' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            #{game.rank}
                          </div>
                          <div className="text-xs text-slate-400">{game.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Favorite Nations */}
                <div className="pixel-panel p-6">
                  <h4 className="font-pixel text-lg text-white mb-4">Favorite Nations</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: 'United States', flag: '🇺🇸', games: 23, winRate: 78 },
                      { name: 'Germany', flag: '🇩🇪', games: 18, winRate: 72 },
                      { name: 'Japan', flag: '🇯🇵', games: 15, winRate: 80 },
                    ].map((nation, index) => (
                      <div key={index} className="pixel-panel p-4 text-center">
                        <div className="text-2xl mb-2">{nation.flag}</div>
                        <div className="font-pixel text-white text-sm mb-1">{nation.name}</div>
                        <div className="text-xs text-slate-400">{nation.games} games • {nation.winRate}% win rate</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6">
                <h3 className="font-pixel text-xl text-white mb-6">Player Statistics</h3>
                
                {/* Overall Stats */}
                <div className="pixel-panel p-6">
                  <h4 className="font-pixel text-lg text-white mb-4">Overall Performance</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-pixel text-blue-400 mb-2">156</div>
                      <div className="text-sm font-pixel text-slate-400">Total Games</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-pixel text-green-400 mb-2">114</div>
                      <div className="text-sm font-pixel text-slate-400">Victories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-pixel text-red-400 mb-2">42</div>
                      <div className="text-sm font-pixel text-slate-400">Defeats</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-pixel text-purple-400 mb-2">73%</div>
                      <div className="text-sm font-pixel text-slate-400">Win Rate</div>
                    </div>
                  </div>
                </div>

                {/* Combat Stats */}
                <div className="pixel-panel p-6">
                  <h4 className="font-pixel text-lg text-white mb-4">Combat Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="pixel-panel p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Swords size={16} className="text-red-400" />
                        <span className="font-pixel text-white text-sm">Units Destroyed</span>
                      </div>
                      <div className="text-2xl font-pixel text-red-400">47,392</div>
                    </div>
                    <div className="pixel-panel p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={16} className="text-orange-400" />
                        <span className="font-pixel text-white text-sm">Territories Captured</span>
                      </div>
                      <div className="text-2xl font-pixel text-orange-400">2,847</div>
                    </div>
                    <div className="pixel-panel p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown size={16} className="text-yellow-400" />
                        <span className="font-pixel text-white text-sm">Times #1</span>
                      </div>
                      <div className="text-2xl font-pixel text-yellow-400">23</div>
                    </div>
                  </div>
                </div>

                {/* Building Stats */}
                <div className="pixel-panel p-6">
                  <h4 className="font-pixel text-lg text-white mb-4">Construction Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Cities', count: 89, icon: '🏢' },
                      { name: 'Ports', count: 45, icon: '⚓' },
                      { name: 'Defense Posts', count: 156, icon: '🛡️' },
                      { name: 'Missile Silos', count: 23, icon: '🚀' },
                    ].map((building, index) => (
                      <div key={index} className="pixel-panel p-4 text-center">
                        <div className="text-2xl mb-2">{building.icon}</div>
                        <div className="font-pixel text-white text-lg">{building.count}</div>
                        <div className="text-xs font-pixel text-slate-400">{building.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Performance */}
                <div className="pixel-panel p-6">
                  <h4 className="font-pixel text-lg text-white mb-4">Map Performance</h4>
                  <div className="space-y-3">
                    {[
                      { map: 'World', games: 34, wins: 26, winRate: 76 },
                      { map: 'Europe', games: 28, wins: 21, winRate: 75 },
                      { map: 'Asia', games: 22, wins: 15, winRate: 68 },
                      { map: 'North America', games: 19, wins: 14, winRate: 74 },
                      { map: 'Africa', games: 16, wins: 11, winRate: 69 },
                    ].map((mapStat, index) => (
                      <div key={index} className="pixel-panel p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Flag size={16} className="text-blue-400" />
                          <span className="font-pixel text-white">{mapStat.map}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <span className="text-slate-400">{mapStat.games} games</span>
                          <span className="text-green-400">{mapStat.wins} wins</span>
                          <span className={`font-pixel ${
                            mapStat.winRate >= 75 ? 'text-green-400' : 
                            mapStat.winRate >= 65 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {mapStat.winRate}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h3 className="font-pixel text-xl text-white mb-6">Achievements</h3>
                
                {/* Achievement Progress */}
                <div className="pixel-panel p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-pixel text-lg text-white">Progress</h4>
                    <div className="text-sm text-slate-400">
                      {achievements.filter(a => a.unlocked).length} / {achievements.length} unlocked
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`pixel-panel p-4 transition-all ${
                        achievement.unlocked 
                          ? 'border-green-500/50 bg-green-900/10' 
                          : 'border-slate-700 opacity-75'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                          achievement.unlocked ? 'bg-green-600/20' : 'bg-slate-700'
                        }`}>
                          {achievement.unlocked ? achievement.icon : '🔒'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className={`font-pixel ${
                              achievement.unlocked ? 'text-white' : 'text-slate-400'
                            }`}>
                              {achievement.name}
                            </h5>
                            {achievement.unlocked && (
                              <Star size={14} className="text-yellow-400" />
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mb-2">{achievement.description}</p>
                          
                          {achievement.unlocked ? (
                            <div className="text-xs text-green-400 font-pixel">
                              Unlocked {achievement.date}
                            </div>
                          ) : achievement.progress !== undefined ? (
                            <div className="space-y-1">
                              <div className="text-xs text-slate-400">
                                Progress: {achievement.progress} / {achievement.id === 'strategist' ? 25 : achievement.id === 'nuclear' ? 50 : achievement.id === 'empire' ? 1000 : 1}
                              </div>
                              <div className="w-full bg-slate-700 rounded-full h-1 overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 transition-all duration-300"
                                  style={{ 
                                    width: `${(achievement.progress! / (achievement.id === 'strategist' ? 25 : achievement.id === 'nuclear' ? 50 : achievement.id === 'empire' ? 1000 : 1)) * 100}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-500 font-pixel">Locked</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="font-pixel text-xl text-white mb-6">Account Settings</h3>
                
                {/* Account Info */}
                <div className="pixel-panel p-6">
                  <h4 className="font-pixel text-lg text-white mb-4">Account Information</h4>
                  <div className="space-y-4">
                    <div className="pixel-panel p-4">
                      <label className="block font-pixel text-white mb-2">Username</label>
                      <input
                        type="text"
                        value="trueANON"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white font-pixel focus:outline-none focus:border-blue-500"
                        readOnly
                      />
                      <p className="text-xs text-slate-400 mt-1">Username cannot be changed</p>
                    </div>
                    
                    <div className="pixel-panel p-4">
                      <label className="block font-pixel text-white mb-2">Email</label>
                      <input
                        type="email"
                        value="player@example.com"
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white font-pixel focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="pixel-panel p-4">
                      <label className="block font-pixel text-white mb-2">Country</label>
                      <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white font-pixel focus:outline-none focus:border-blue-500">
                        <option>🇺🇸 United States</option>
                        <option>🇬🇧 United Kingdom</option>
                        <option>🇩🇪 Germany</option>
                        <option>🇫🇷 France</option>
                        <option>🇯🇵 Japan</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="pixel-panel p-6">
                  <h4 className="font-pixel text-lg text-white mb-4">Privacy Settings</h4>
                  <div className="space-y-4">
                    {[
                      { id: 'profile_public', label: 'Public Profile', description: 'Allow other players to view your profile' },
                      { id: 'stats_public', label: 'Public Statistics', description: 'Show your statistics on leaderboards' },
                      { id: 'friend_requests', label: 'Friend Requests', description: 'Allow other players to send friend requests' },
                      { id: 'game_invites', label: 'Game Invitations', description: 'Receive invitations to private games' },
                    ].map((setting) => (
                      <div key={setting.id} className="pixel-panel p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-pixel text-white">{setting.label}</div>
                            <div className="text-sm text-slate-400">{setting.description}</div>
                          </div>
                          <button className="w-12 h-6 bg-blue-600 rounded-full relative transition-colors">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="pixel-panel p-6 border-red-500/50">
                  <h4 className="font-pixel text-lg text-red-400 mb-4">Danger Zone</h4>
                  <div className="space-y-4">
                    <button className="pixel-button bg-red-600 hover:bg-red-700">
                      Reset Statistics
                    </button>
                    <button className="pixel-button bg-red-700 hover:bg-red-800">
                      Delete Account
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    These actions cannot be undone. Please be certain before proceeding.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerAccountModal;