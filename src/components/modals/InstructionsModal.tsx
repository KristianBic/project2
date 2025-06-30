import React, { useState, useRef, useEffect } from 'react';
import { X, Keyboard, Layout, Sliders, Settings, Menu, Info, Users, Building, Crown, Bell } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'hotkeys' | 'gameui' | 'control' | 'options' | 'radial' | 'info' | 'ally' | 'build' | 'icons' | 'events';

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('hotkeys');
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
    { id: 'hotkeys' as TabType, label: 'Hotkeys', icon: <Keyboard size={18} /> },
    { id: 'gameui' as TabType, label: 'Game UI', icon: <Layout size={18} /> },
    { id: 'control' as TabType, label: 'Control Panel', icon: <Sliders size={18} /> },
    { id: 'options' as TabType, label: 'Options', icon: <Settings size={18} /> },
    { id: 'radial' as TabType, label: 'Radial Menu', icon: <Menu size={18} /> },
    { id: 'info' as TabType, label: 'Info Menu', icon: <Info size={18} /> },
    { id: 'ally' as TabType, label: 'Ally Info', icon: <Users size={18} /> },
    { id: 'build' as TabType, label: 'Build Menu', icon: <Building size={18} /> },
    { id: 'icons' as TabType, label: 'Player Icons', icon: <Crown size={18} /> },
    { id: 'events' as TabType, label: 'Event Panel', icon: <Bell size={18} /> },
  ];
  
  return (
    <div 
      className={`fixed inset-0 z-50 overflow-auto flex bg-slate-900/50 backdrop-blur-sm modal-overlay ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className={`relative m-auto w-full max-w-7xl h-[85vh] bg-slate-900/60 backdrop-blur-sm border border-white/10 shadow-xl modal-content ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="font-pixel text-2xl text-white">Instructions</h2>
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
            {activeTab === 'hotkeys' && (
              <div className="space-y-4">
                <h3 className="font-pixel text-xl text-white mb-4">Hotkeys</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: 'Space', action: 'Alternate view (terrain/countries)' },
                    { key: 'Shift + Click', action: 'Attack (when left click is set to open menu)' },
                    { key: 'Ctrl + Click', action: 'Open build menu' },
                    { key: 'Alt + Click', action: 'Open emote menu' },
                    { key: 'C', action: 'Center camera on player' },
                    { key: 'Q / E', action: 'Zoom out/in' },
                    { key: 'W A S D', action: 'Move camera' },
                    { key: '1 / 2', action: 'Decrease/Increase attack ratio' },
                    { key: 'Shift + Scroll', action: 'Decrease/Increase attack ratio' },
                    { key: 'Alt + R', action: 'Reset graphics' },
                  ].map((hotkey, index) => (
                    <div key={index} className="pixel-panel p-3 flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        {hotkey.key.split(' + ').map((k, i) => (
                          <React.Fragment key={i}>
                            <kbd className="px-2 py-1 bg-slate-800 text-white font-pixel rounded">{k}</kbd>
                            {i < hotkey.key.split(' + ').length - 1 && <span className="text-slate-400">+</span>}
                          </React.Fragment>
                        ))}
                      </div>
                      <span className="text-slate-300">{hotkey.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gameui' && (
              <div className="space-y-6">
                <h3 className="font-pixel text-xl text-white mb-4">Game UI</h3>
                
                {/* Leaderboard Section */}
                <div className="pixel-panel p-4">
                  <h4 className="font-pixel text-lg text-white mb-2">Leaderboard</h4>
                  <p className="text-slate-300 mb-4">Shows the top players of the game and their names, % owned land, gold, and troops.</p>
                  
                  {/* Leaderboard Mockup - Styled like website */}
                  <div className="pixel-panel p-4 max-w-lg">
                    <table className="w-full font-pixel text-xs">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-700">
                          <th className="text-left py-2">Rank</th>
                          <th className="text-left py-2">Player</th>
                          <th className="text-left py-2">Owned</th>
                          <th className="text-left py-2">Gold</th>
                          <th className="text-left py-2">Troops</th>
                        </tr>
                      </thead>
                      <tbody className="text-white">
                        <tr className="border-b border-slate-800/50">
                          <td className="py-1">1</td>
                          <td className="py-1">Minoan Dynasty</td>
                          <td className="py-1">0.04%</td>
                          <td className="py-1">1.79K</td>
                          <td className="py-1">1.76K</td>
                        </tr>
                        <tr className="border-b border-slate-800/50">
                          <td className="py-1">2</td>
                          <td className="py-1">Italian Duchy</td>
                          <td className="py-1">0.04%</td>
                          <td className="py-1">1.72K</td>
                          <td className="py-1">1.78K</td>
                        </tr>
                        <tr className="border-b border-slate-800/50">
                          <td className="py-1">3</td>
                          <td className="py-1">AngloSaxon Caliphate</td>
                          <td className="py-1">0.04%</td>
                          <td className="py-1">1.72K</td>
                          <td className="py-1">1.78K</td>
                        </tr>
                        <tr className="border-b border-slate-800/50">
                          <td className="py-1">4</td>
                          <td className="py-1">Navajo Host</td>
                          <td className="py-1">0.04%</td>
                          <td className="py-1">1.80K</td>
                          <td className="py-1">1.73K</td>
                        </tr>
                        <tr className="text-blue-300">
                          <td className="py-1 font-bold">442</td>
                          <td className="py-1 font-bold">trueANON</td>
                          <td className="py-1 font-bold">0%</td>
                          <td className="py-1 font-bold">1.16K</td>
                          <td className="py-1 font-bold">6.23K</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'control' && (
              <div className="space-y-6">
                <h3 className="font-pixel text-xl text-white mb-4">Control Panel</h3>
                
                {/* Control Panel Visual Example */}
                <div className="pixel-panel p-4">
                  <h4 className="font-pixel text-lg text-white mb-4">Control Panel Overview</h4>
                  <p className="text-slate-300 mb-4">The control panel shows your resources and allows you to manage your troops and attack settings.</p>
                  
                  {/* Control Panel Mockup - Styled like website */}
                  <div className="pixel-panel p-6 max-w-md">
                    {/* Population */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-pixel text-sm">Pop:</span>
                        <span className="text-white font-pixel text-sm">3.60K / 12.1K <span className="text-green-400">(+379)</span></span>
                      </div>
                    </div>

                    {/* Gold */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-pixel text-sm">Gold:</span>
                        <span className="text-white font-pixel text-sm">245 <span className="text-green-400">(+90)</span></span>
                      </div>
                    </div>

                    {/* Troops and Workers */}
                    <div className="mb-4">
                      <div className="text-white font-pixel text-sm mb-2">
                        Troops: 3.38K | Workers: 216
                      </div>
                      <div className="relative">
                        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-slate-600"></div>
                      </div>
                    </div>

                    {/* Attack Ratio */}
                    <div>
                      <div className="text-white font-pixel text-sm mb-2">
                        Attack Ratio: 25% (846)
                      </div>
                      <div className="relative">
                        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-slate-600"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="pixel-panel p-4">
                    <h4 className="font-pixel text-lg text-white mb-2">Population</h4>
                    <p className="text-slate-300">The amount of units you have, your max population and the rate at which you gain them.</p>
                  </div>
                  <div className="pixel-panel p-4">
                    <h4 className="font-pixel text-lg text-white mb-2">Gold</h4>
                    <p className="text-slate-300">The amount of gold you have and the rate at which you gain it.</p>
                  </div>
                  <div className="pixel-panel p-4">
                    <h4 className="font-pixel text-lg text-white mb-2">Troops and Workers</h4>
                    <p className="text-slate-300">The amount of allocated troops and workers. Troops are used to attack/defend against attacks. Workers are used to generate gold. You can adjust the number of troops and workers using the slider.</p>
                  </div>
                  <div className="pixel-panel p-4">
                    <h4 className="font-pixel text-lg text-white mb-2">Attack Ratio</h4>
                    <p className="text-slate-300">The amount of troops that will be used when you attack. You can adjust the attack ratio using the slider. Having more attacking troops than defending troops will make you lose fewer troops in the attack, while having less will increase the damage dealt to your attacking troops. The effect doesn't go beyond ratios of 2:1.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'options' && (
              <div className="space-y-6">
                <h3 className="font-pixel text-xl text-white mb-4">Options</h3>
                
                {/* Game Controls Visual */}
                <div className="pixel-panel p-4">
                  <h4 className="font-pixel text-lg text-white mb-4">Game Controls Bar</h4>
                  <p className="text-slate-300 mb-4">The game controls bar provides quick access to essential game functions and settings.</p>
                  
                  {/* Game Controls Mockup - Styled like website */}
                  <div className="pixel-panel p-4 max-w-sm mx-auto">
                    <div className="flex items-center justify-center gap-4">
                      {/* Play Button */}
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1"></div>
                      </div>
                      
                      {/* Timer */}
                      <div className="text-white font-pixel text-sm">
                        11s
                      </div>
                      
                      {/* Close Button */}
                      <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                        <div className="text-white text-lg leading-none">×</div>
                      </div>
                      
                      {/* Settings Button */}
                      <div className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center">
                        <div className="w-4 h-4 border border-white rounded-sm relative">
                          <div className="absolute inset-1 border border-white rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="pixel-panel p-4">
                    <h4 className="font-pixel text-lg text-white mb-2">Game Controls</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li>• <strong>Play/Pause button</strong> - Control game flow (single player only)</li>
                      <li>• <strong>Timer</strong> - Shows time elapsed since game start</li>
                      <li>• <strong>Exit button</strong> - Leave the current game</li>
                      <li>• <strong>Settings button</strong> - Access game settings and options</li>
                    </ul>
                  </div>
                  
                  <div className="pixel-panel p-4">
                    <h4 className="font-pixel text-lg text-white mb-2">Settings Menu</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li>• Toggle Alternate View between terrain and political maps</li>
                      <li>• Enable/disable Dark Mode for better visibility</li>
                      <li>• Show/hide Emojis in player communications</li>
                      <li>• Configure left-click action (attack or open menu)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'radial' && (
              <div className="space-y-6">
                <h3 className="font-pixel text-xl text-white mb-4">Radial Menu</h3>
                
                <div className="pixel-panel p-4">
                  <p className="text-slate-300 mb-4">Right clicking (or touch on mobile) opens the radial menu with quick access to various actions:</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🔨</span>
                      </div>
                      <p className="text-slate-300">Open the build menu.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl">ℹ️</span>
                      </div>
                      <p className="text-slate-300">Open the info menu.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🚢</span>
                      </div>
                      <p className="text-slate-300">Send a boat to attack at the selected location (only available if you have access to water).</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-2xl">❌</span>
                      </div>
                      <p className="text-slate-300">Close the menu.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="space-y-6">
                <h3 className="font-pixel text-xl text-white mb-4">Info Menu</h3>
                
                {/* Info Panel Visual */}
                <div className="pixel-panel p-4">
                  <h4 className="font-pixel text-lg text-white mb-4">Player Info Panel</h4>
                  <p className="text-slate-300 mb-4">Contains detailed information about the selected player and available actions.</p>
                  
                  {/* Info Panel Mockup - Based on provided image */}
                  <div className="pixel-panel p-4 max-w-xs mx-auto bg-slate-800/80">
                    {/* Close Button */}
                    <div className="flex justify-end mb-2">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">×</span>
                      </div>
                    </div>
                    
                    {/* Player Name */}
                    <div className="text-center mb-4">
                      <h5 className="text-white font-pixel text-lg">trueANON</h5>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="pixel-panel p-3 bg-slate-700/50">
                          <div className="text-slate-400 font-pixel text-xs mb-1">Gold</div>
                          <div className="text-white font-pixel text-sm">1.37K</div>
                        </div>
                        <div className="pixel-panel p-3 bg-slate-700/50">
                          <div className="text-slate-400 font-pixel text-xs mb-1">Troops</div>
                          <div className="text-white font-pixel text-sm">6.82K</div>
                        </div>
                      </div>
                      
                      <div className="pixel-panel p-3 bg-slate-700/50">
                        <div className="text-slate-400 font-pixel text-xs mb-1">Traitor</div>
                        <div className="text-white font-pixel text-sm">No</div>
                      </div>
                      
                      <div className="pixel-panel p-3 bg-slate-700/50">
                        <div className="text-slate-400 font-pixel text-xs mb-1">Number of betrayals</div>
                        <div className="text-white font-pixel text-sm">0</div>
                      </div>
                      
                      <div className="pixel-panel p-3 bg-slate-700/50">
                        <div className="text-slate-400 font-pixel text-xs mb-1">Stopped trading with you</div>
                        <div className="text-white font-pixel text-sm">No</div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-center gap-3 mt-4">
                      <button className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center hover:bg-slate-500 transition-colors">
                        <span className="text-white text-sm">💬</span>
                      </button>
                      <button className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center hover:bg-slate-500 transition-colors">
                        <span className="text-white text-sm">😊</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pixel-panel p-4">
                  <h4 className="font-pixel text-lg text-white mb-4">Available Actions</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                        <span>🎯</span>
                      </div>
                      <p className="text-slate-300">Place a target mark on the player, marking it for all allies, used to coordinate attacks.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                        <span>🤝</span>
                      </div>
                      <p className="text-slate-300">Send an alliance request to the player. Allies can share resources and troops, but can't attack each other.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                        <span>😊</span>
                      </div>
                      <p className="text-slate-300">Send an emoji to the player.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                        <span>💬</span>
                      </div>
                      <p className="text-slate-300">Send a quick chat message to the player.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ally' && (
              <div className="space-y-4">
                <h3 className="font-pixel text-xl text-white mb-4">Ally Info Panel</h3>
                <div className="pixel-panel p-4">
                  <p className="text-slate-300 mb-6">When you ally with a player, the following new icons become available:</p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                        <span>⚔️</span>
                      </div>
                      <div>
                        <h4 className="text-white font-pixel">Crossed swords</h4>
                        <p className="text-slate-300">Betray your ally, ending the alliance. You will now have a permanent icon stuck next to your name, unless the other nation was a traitor themselves. Attacks against you will incur less losses for the attacker until the end of the game, bots are less likely to ally with you and players will think twice before doing so.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                        <span>👥</span>
                      </div>
                      <div>
                        <h4 className="text-white font-pixel">Handshake</h4>
                        <p className="text-slate-300">Donate some of your troops to your ally. Used when they're low on troops and are being attacked, or when they need that extra power to crush an enemy.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'build' && (
              <div className="space-y-6">
                <h3 className="font-pixel text-xl text-white mb-4">Build Menu</h3>
                
                {/* Build Menu Visual */}
                <div className="pixel-panel p-4">
                  <h4 className="font-pixel text-lg text-white mb-4">Build Menu Interface</h4>
                  <p className="text-slate-300 mb-4">The build menu shows available structures and weapons with their costs and quantities.</p>
                  
                  {/* Build Menu Mockup - Styled like website */}
                  <div className="pixel-panel p-4">
                    <div className="grid grid-cols-3 gap-3">
                      {/* Row 1 */}
                      <div className="pixel-panel p-3 text-center">
                        <div className="text-2xl mb-2">☢️</div>
                        <div className="text-white font-pixel text-xs mb-1">Atom Bomb</div>
                        <div className="text-slate-400 font-pixel text-xs mb-1">Small explosion</div>
                        <div className="text-orange-400 font-pixel text-xs">750K ⚡</div>
                        <div className="text-slate-400 font-pixel text-xs">0</div>
                      </div>
                      
                      <div className="pixel-panel p-3 text-center">
                        <div className="text-2xl mb-2">🎯</div>
                        <div className="text-white font-pixel text-xs mb-1">MIRV</div>
                        <div className="text-slate-400 font-pixel text-xs mb-1">Huge explosion, only targets selected player</div>
                        <div className="text-orange-400 font-pixel text-xs">25.0M ⚡</div>
                        <div className="text-slate-400 font-pixel text-xs">0</div>
                      </div>
                      
                      <div className="pixel-panel p-3 text-center">
                        <div className="text-2xl mb-2">💥</div>
                        <div className="text-white font-pixel text-xs mb-1">Hydrogen Bomb</div>
                        <div className="text-slate-400 font-pixel text-xs mb-1">Large explosion</div>
                        <div className="text-orange-400 font-pixel text-xs">5.00M ⚡</div>
                        <div className="text-slate-400 font-pixel text-xs">0</div>
                      </div>
                      
                      {/* Row 2 */}
                      <div className="pixel-panel p-3 text-center">
                        <div className="text-2xl mb-2">🚢</div>
                        <div className="text-white font-pixel text-xs mb-1">Warship</div>
                        <div className="text-slate-400 font-pixel text-xs mb-1">Captures trade ships, destroys ships and boats</div>
                        <div className="text-orange-400 font-pixel text-xs">250K ⚡</div>
                        <div className="text-slate-400 font-pixel text-xs">0</div>
                      </div>
                      
                      <div className="pixel-panel p-3 text-center">
                        <div className="text-2xl mb-2">⚓</div>
                        <div className="text-white font-pixel text-xs mb-1">Port</div>
                        <div className="text-slate-400 font-pixel text-xs mb-1">Sends trade ships to generate gold</div>
                        <div className="text-orange-400 font-pixel text-xs">125K ⚡</div>
                        <div className="text-slate-400 font-pixel text-xs">0</div>
                      </div>
                      
                      <div className="pixel-panel p-3 text-center">
                        <div className="text-2xl mb-2">🚀</div>
                        <div className="text-white font-pixel text-xs mb-1">Missile Silo</div>
                        <div className="text-slate-400 font-pixel text-xs mb-1">Used to launch nukes</div>
                        <div className="text-orange-400 font-pixel text-xs">1.00M ⚡</div>
                        <div className="text-slate-400 font-pixel text-xs">0</div>
                      </div>
                      
                      {/* Row 3 */}
                      <div className="pixel-panel p-3 text-center">
                        <div className="text-2xl mb-2">🛡️</div>
                        <div className="text-white font-pixel text-xs mb-1">SAM Launcher</div>
                        <div className="text-slate-400 font-pixel text-xs mb-1">Defends against incoming nukes</div>
                        <div className="text-orange-400 font-pixel text-xs">1.50M ⚡</div>
                        <div className="text-slate-400 font-pixel text-xs">0</div>
                      </div>
                      
                      <div className="pixel-panel p-3 text-center">
                        <div className="text-2xl mb-2">🏰</div>
                        <div className="text-white font-pixel text-xs mb-1">Defense Post</div>
                        <div className="text-slate-400 font-pixel text-xs mb-1">Increases defenses of nearby borders</div>
                        <div className="text-orange-400 font-pixel text-xs">50.0K ⚡</div>
                        <div className="text-slate-400 font-pixel text-xs">0</div>
                      </div>
                      
                      <div className="pixel-panel p-3 text-center">
                        <div className="text-2xl mb-2">🏢</div>
                        <div className="text-white font-pixel text-xs mb-1">City</div>
                        <div className="text-slate-400 font-pixel text-xs mb-1">Increases max population</div>
                        <div className="text-orange-400 font-pixel text-xs">125K ⚡</div>
                        <div className="text-slate-400 font-pixel text-xs">0</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {[
                    {
                      name: 'City',
                      icon: '🏢',
                      description: 'Increases your max population. Useful when you can\'t expand your territory or you\'re about to hit your population limit.'
                    },
                    {
                      name: 'Defense Post',
                      icon: '🛡️',
                      description: 'Increases defenses around nearby borders. Attacks from enemies are slower and have more casualties.'
                    },
                    {
                      name: 'Port',
                      icon: '⚓',
                      description: 'Automatically sends trade ships between ports of your country and other countries (except if you clicked "stop trade" on them or they clicked "stop trade" on you"), giving gold to both sides. Allows building battleships. Can only be built near water.'
                    },
                    {
                      name: 'Warship',
                      icon: '🚢',
                      description: 'Patrols in an area, capturing trade ships and destroying enemy Warships and Boats. Spawns from the nearest Port and patrols the area you first clicked to build it. You can control their movement by attack-clicking on them and then attack-clicking the new area you want them to move to.'
                    },
                    {
                      name: 'Missile Silo',
                      icon: '🚀',
                      description: 'Allows launching missiles.'
                    },
                    {
                      name: 'SAM Launcher',
                      icon: '🛡️',
                      description: 'Has a 75% chance to intercept enemy missiles in its 100 pixel range. The SAM has a 75 second cooldown and cannot intercept MIRVs.'
                    },
                    {
                      name: 'Atom Bomb',
                      icon: '☢️',
                      description: 'Small explosive bomb that destroys territory, buildings, ships and boats. Spawns from the nearest Missile Silo and lands in the area you first clicked to build it.'
                    },
                    {
                      name: 'Hydrogen Bomb',
                      icon: '💥',
                      description: 'Large explosive bomb. Spawns from the nearest Missile Silo and lands in the area you first clicked to build it.'
                    },
                    {
                      name: 'MIRV',
                      icon: '🎯',
                      description: 'The most powerful bomb in the game. Splits up into smaller bombs that will cover a huge range of territory. Only damages the player in the area that you first clicked on to build it. Spawns from the nearest Missile Silo and lands in the area you first clicked to build it.'
                    }
                  ].map((building, index) => (
                    <div key={index} className="pixel-panel p-4">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                          <span>{building.icon}</span>
                        </div>
                        <h4 className="font-pixel text-lg text-white">{building.name}</h4>
                      </div>
                      <p className="text-slate-300">{building.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'icons' && (
              <div className="space-y-4">
                <h3 className="font-pixel text-xl text-white mb-4">Player Icons</h3>
                <div className="pixel-panel p-4">
                  <p className="text-slate-300 mb-6">Examples of some of the ingame icons you will encounter and what they mean:</p>
                  <div className="grid gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-700 rounded flex items-center justify-center">
                        <span className="text-2xl">👑</span>
                      </div>
                      <div>
                        <h4 className="text-white font-pixel">Crown</h4>
                        <p className="text-slate-300">This is the number 1 player in the leaderboard</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-700 rounded flex items-center justify-center">
                        <span className="text-2xl">⚔️</span>
                      </div>
                      <div>
                        <h4 className="text-white font-pixel">Crossed swords</h4>
                        <p className="text-slate-300">Traitor. This player attacked an ally.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-700 rounded flex items-center justify-center">
                        <span className="text-2xl">🤝</span>
                      </div>
                      <div>
                        <h4 className="text-white font-pixel">Handshake</h4>
                        <p className="text-slate-300">Ally. This player is your ally.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-6">
                <h3 className="font-pixel text-xl text-white mb-4">Event Panel</h3>
                
                {/* Event Panel Visual */}
                <div className="pixel-panel p-4">
                  <h4 className="font-pixel text-lg text-white mb-4">Event Panel Interface</h4>
                  <p className="text-slate-300 mb-4">The Event panel displays the latest events, requests and Quick Chat messages.</p>
                  
                  {/* Event Panel Mockup - Styled like website */}
                  <div className="pixel-panel p-4 max-w-md">
                    <div className="space-y-3">
                      {/* Hide Button */}
                      <div className="flex justify-between items-center mb-4">
                        <button className="text-slate-400 hover:text-white font-pixel text-xs transition-colors">
                          Hide
                        </button>
                      </div>
                      
                      {/* Alliance Request */}
                      <div className="pixel-panel p-3 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-green-400 font-pixel text-xs">Sent Japanese Area:</span>
                          <span className="text-red-400 font-pixel text-xs cursor-pointer hover:text-red-300">❓</span>
                        </div>
                      </div>
                      
                      {/* Alliance Accepted */}
                      <div className="pixel-panel p-3 border-l-4 border-blue-500">
                        <div className="text-blue-400 font-pixel text-xs mb-1">Japanese Area accepted your alliance request</div>
                      </div>
                      
                      {/* Attack Messages */}
                      <div className="pixel-panel p-3 border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400 font-pixel text-xs">596 Bhutanese Sisterhood</span>
                          <span className="text-red-400 font-pixel text-xs cursor-pointer hover:text-red-300">❌</span>
                        </div>
                      </div>
                      
                      <div className="pixel-panel p-3 border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300 font-pixel text-xs">3.66K Wilderness</span>
                          <span className="text-red-400 font-pixel text-xs cursor-pointer hover:text-red-300">❌</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pixel-panel p-4">
                  <h4 className="font-pixel text-lg text-white mb-4">Event Types</h4>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">🤝</span>
                      </div>
                      <div>
                        <h5 className="text-white font-pixel mb-2">Alliance</h5>
                        <p className="text-slate-300">Alliance requests can be accepted or rejected. Allies can share resources and troops, but can't attack each other. Clicking Focus moves the view to the player who sent the request.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">⚔️</span>
                      </div>
                      <div>
                        <h5 className="text-white font-pixel mb-2">Attacks</h5>
                        <p className="text-slate-300">Incoming attacks and your outgoing attacks are shown. Click the message to center the view on the attack, nuke or Boat (transport ship). You can retreat troops by clicking the red X button. This will cost the lives of 25% of your attacking troops. If you retrieve a Boat attack, the boat returns to its starting point and will attack there if the land has been captured since. Nukes can't be retreated once launched.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">💬</span>
                      </div>
                      <div>
                        <h5 className="text-white font-pixel mb-2">Quick Chat</h5>
                        <p className="text-slate-300">You can see sent and received chat messages here. Send a message to a player by clicking the Quick Chat icon in their Info menu.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;