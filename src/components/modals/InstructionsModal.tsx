import React, { useState, useRef, useEffect } from 'react';
import { X, Keyboard, Layout, Sliders, Settings, Menu, Info, Users, Building, Crown } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'hotkeys' | 'gameui' | 'control' | 'options' | 'radial' | 'info' | 'ally' | 'build' | 'icons';

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
                  <p className="text-slate-300 mb-4">Shows the top players of the game and their names, % owned land and gold.</p>
                  <div className="bg-slate-800/50 p-4 rounded">
                    <table className="w-full">
                      <thead>
                        <tr className="text-slate-400">
                          <th className="text-left">Rank</th>
                          <th className="text-left">Player</th>
                          <th className="text-left">Owned</th>
                          <th className="text-left">Gold</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-white">
                          <td>1</td>
                          <td>Antarctica</td>
                          <td>0.11%</td>
                          <td>6</td>
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
                  
                  {/* Control Panel Mockup */}
                  <div className="bg-slate-800/80 p-6 rounded-lg border border-slate-700 max-w-md">
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
              <div className="space-y-4">
                <h3 className="font-pixel text-xl text-white mb-4">Options</h3>
                <div className="space-y-4">
                  <div className="pixel-panel p-4">
                    <h4 className="font-pixel text-lg text-white mb-2">Game Controls</h4>
                    <ul className="space-y-2 text-slate-300">
                      <li>• Pause/Unpause the game - Only available in single player mode.</li>
                      <li>• Timer - Time passed since the start of the game.</li>
                      <li>• Exit button.</li>
                      <li>• Settings - Open the settings menu. Inside you can toggle the Alternate View, Dark Mode, Emojis and action on left click.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'radial' && (
              <div className="space-y-4">
                <h3 className="font-pixel text-xl text-white mb-4">Radial Menu</h3>
                <div className="pixel-panel p-4">
                  <p className="text-slate-300 mb-4">Right clicking (or touch on mobile) opens the radial menu. From there you can:</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🔨</span>
                      </div>
                      <p className="text-slate-300">Open the build menu.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                        <span className="text-2xl">ℹ️</span>
                      </div>
                      <p className="text-slate-300">Open the info menu.</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🚢</span>
                      </div>
                      <p className="text-slate-300">Send a boat to attack at the selected location (only available if you have access to water).</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                        <span className="text-2xl">❌</span>
                      </div>
                      <p className="text-slate-300">Close the menu.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="space-y-4">
                <h3 className="font-pixel text-xl text-white mb-4">Info Menu</h3>
                <div className="pixel-panel p-4">
                  <h4 className="font-pixel text-lg text-white mb-4">Enemy Info Panel</h4>
                  <p className="text-slate-300 mb-4">Contains information about the selected player:</p>
                  <div className="bg-slate-800/50 p-4 rounded mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-400">Name:</span>
                        <span className="text-white ml-2">Etruscan Legion</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Gold:</span>
                        <span className="text-white ml-2">12</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Troops:</span>
                        <span className="text-white ml-2">790</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Traitor:</span>
                        <span className="text-white ml-2">No</span>
                      </div>
                    </div>
                  </div>
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
              <div className="space-y-4">
                <h3 className="font-pixel text-xl text-white mb-4">Build Menu</h3>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;