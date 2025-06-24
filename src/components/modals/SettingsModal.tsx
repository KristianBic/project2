import React, { useRef, useEffect, useState } from 'react';
import { X, Moon, Smile, MousePointer, Swords, Users, Keyboard, Settings as SettingsIcon } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface KeybindSetting {
  action: string;
  label: string;
  description: string;
  defaultKey: string;
  value: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'settings' | 'keybinds'>('settings');
  const [attackRatio, setAttackRatio] = useState(25);
  const [troopsRatio, setTroopsRatio] = useState(95);
  const [emojis, setEmojis] = useState(true);
  const [leftClickMenu, setLeftClickMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [listeningFor, setListeningFor] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [keybinds, setKeybinds] = useState<KeybindSetting[]>([
    {
      action: 'alternate_view',
      label: 'Alternate View',
      description: 'Toggle between terrain and countries view',
      defaultKey: 'Space',
      value: 'Space'
    },
    {
      action: 'center_camera',
      label: 'Center Camera',
      description: 'Center camera on player',
      defaultKey: 'KeyC',
      value: 'KeyC'
    },
    {
      action: 'zoom_out',
      label: 'Zoom Out',
      description: 'Zoom camera out',
      defaultKey: 'KeyQ',
      value: 'KeyQ'
    },
    {
      action: 'zoom_in',
      label: 'Zoom In',
      description: 'Zoom camera in',
      defaultKey: 'KeyE',
      value: 'KeyE'
    },
    {
      action: 'move_up',
      label: 'Move Camera Up',
      description: 'Move camera upward',
      defaultKey: 'KeyW',
      value: 'KeyW'
    },
    {
      action: 'move_left',
      label: 'Move Camera Left',
      description: 'Move camera left',
      defaultKey: 'KeyA',
      value: 'KeyA'
    },
    {
      action: 'move_down',
      label: 'Move Camera Down',
      description: 'Move camera downward',
      defaultKey: 'KeyS',
      value: 'KeyS'
    },
    {
      action: 'move_right',
      label: 'Move Camera Right',
      description: 'Move camera right',
      defaultKey: 'KeyD',
      value: 'KeyD'
    },
    {
      action: 'decrease_attack_ratio',
      label: 'Decrease Attack Ratio',
      description: 'Decrease attack ratio',
      defaultKey: 'Digit1',
      value: 'Digit1'
    },
    {
      action: 'increase_attack_ratio',
      label: 'Increase Attack Ratio',
      description: 'Increase attack ratio',
      defaultKey: 'Digit2',
      value: 'Digit2'
    },
    {
      action: 'reset_graphics',
      label: 'Reset Graphics',
      description: 'Reset graphics settings',
      defaultKey: 'KeyR',
      value: 'KeyR'
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (listeningFor && isOpen) {
        event.preventDefault();
        event.stopPropagation();
        
        const code = event.code;
        setKeybinds(prev => prev.map(kb => 
          kb.action === listeningFor 
            ? { ...kb, value: code }
            : kb
        ));
        setListeningFor(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeydown, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown, true);
    };
  }, [isOpen, listeningFor]);

  const handleClose = () => {
    setIsClosing(true);
    setListeningFor(null);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  const displayKey = (key: string): string => {
    if (key === 'Space') return 'Space';
    if (key.startsWith('Key') && key.length === 4) {
      return key.slice(3);
    }
    if (key.startsWith('Digit')) {
      return key.slice(5);
    }
    return key.length ? key.charAt(0).toUpperCase() + key.slice(1) : 'Press a key';
  };

  const resetKeybind = (action: string) => {
    setKeybinds(prev => prev.map(kb => 
      kb.action === action 
        ? { ...kb, value: kb.defaultKey }
        : kb
    ));
  };

  const unbindKey = (action: string) => {
    setKeybinds(prev => prev.map(kb => 
      kb.action === action 
        ? { ...kb, value: '' }
        : kb
    ));
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 overflow-auto flex bg-slate-900/50 backdrop-blur-sm modal-overlay ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className={`relative m-auto w-full max-w-4xl bg-slate-900/60 backdrop-blur-sm border border-white/10 shadow-xl modal-content ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="font-pixel text-2xl text-white">User Settings</h2>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex h-[70vh]">
          {/* Left Side Tabs */}
          <div className="pixel-panel p-1 w-48 flex flex-col border-r border-slate-800">
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-3 font-pixel text-sm transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <SettingsIcon size={18} />
              Settings
            </button>
            <button
              onClick={() => setActiveTab('keybinds')}
              className={`flex items-center gap-2 px-4 py-3 font-pixel text-sm transition-all ${
                activeTab === 'keybinds'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Keyboard size={18} />
              Keybinds
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div className="pixel-panel p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Moon size={20} className="text-slate-300" />
                      <div>
                        <div className="font-pixel text-white">Dark Mode</div>
                        <div className="text-sm text-slate-400">Toggle the site's appearance between light and dark themes</div>
                      </div>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className={`w-14 h-7 flex items-center rounded-full ${
                        theme === 'dark' ? 'bg-blue-600' : 'bg-slate-600'
                      } relative transition-colors duration-200`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                        theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="pixel-panel p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smile size={20} className="text-slate-300" />
                      <div>
                        <div className="font-pixel text-white">Emojis</div>
                        <div className="text-sm text-slate-400">Toggle whether emojis are shown in game</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setEmojis(!emojis)}
                      className={`w-14 h-7 flex items-center rounded-full ${
                        emojis ? 'bg-blue-600' : 'bg-slate-600'
                      } relative transition-colors duration-200`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                        emojis ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="pixel-panel p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MousePointer size={20} className="text-slate-300" />
                      <div>
                        <div className="font-pixel text-white">Left Click to Open Menu</div>
                        <div className="text-sm text-slate-400">
                          When ON, left-click opens menu and sword button attacks.
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setLeftClickMenu(!leftClickMenu)}
                      className={`w-14 h-7 flex items-center rounded-full ${
                        leftClickMenu ? 'bg-blue-600' : 'bg-slate-600'
                      } relative transition-colors duration-200`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                        leftClickMenu ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="pixel-panel p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Swords size={20} className="text-slate-300" />
                    <div>
                      <div className="font-pixel text-white">Attack Ratio</div>
                      <div className="text-sm text-slate-400">
                        What percentage of your troops to send in an attack (1-100%)
                      </div>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={attackRatio}
                    onChange={(e) => setAttackRatio(parseInt(e.target.value))}
                    className="w-full h-2 rounded-none appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #384d6f ${attackRatio}%, #1e293b ${attackRatio}%)`,
                      borderRadius: '0.25rem',
                    }}
                  />
                  <div className="text-center mt-2 font-pixel text-slate-400">{attackRatio}%</div>
                </div>

                <div className="pixel-panel p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Users size={20} className="text-slate-300" />
                    <div>
                      <div className="font-pixel text-white">Troops and Workers Ratio</div>
                      <div className="text-sm text-slate-400">
                        Adjust the balance between troops (for combat) and workers (for gold production) (1-100%)
                      </div>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={troopsRatio}
                    onChange={(e) => setTroopsRatio(parseInt(e.target.value))}
                    className="w-full h-2 rounded-none appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #384d6f ${troopsRatio}%, #1e293b ${troopsRatio}%)`,
                      borderRadius: '0.25rem',
                    }}
                  />
                  <div className="text-center mt-2 font-pixel text-slate-400">{troopsRatio}%</div>
                </div>
              </div>
            )}

            {activeTab === 'keybinds' && (
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="font-pixel text-xl text-white mb-2">Keybinds</h3>
                  <p className="text-sm text-slate-400">Click on a key to rebind it. Press the new key you want to assign.</p>
                </div>
                
                {keybinds.map((keybind) => (
                  <div key={keybind.action} className="pixel-panel p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1">
                        <div className="font-pixel text-white">{keybind.label}</div>
                        <div className="text-sm text-slate-400">{keybind.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className={`px-3 py-1 rounded font-pixel text-sm cursor-pointer transition-colors ${
                          listeningFor === keybind.action
                            ? 'bg-blue-600 text-white animate-pulse'
                            : 'bg-slate-700 text-white hover:bg-slate-600'
                        }`}
                        onClick={() => setListeningFor(keybind.action)}
                      >
                        {listeningFor === keybind.action 
                          ? 'Press a key...' 
                          : displayKey(keybind.value || keybind.defaultKey)
                        }
                      </button>
                      <button
                        className="text-xs text-slate-400 hover:text-white border border-slate-500 px-2 py-0.5 rounded transition-colors duration-200"
                        onClick={() => resetKeybind(keybind.action)}
                      >
                        Reset
                      </button>
                      <button
                        className="text-xs text-slate-400 hover:text-white border border-slate-500 px-2 py-0.5 rounded transition-colors duration-200"
                        onClick={() => unbindKey(keybind.action)}
                      >
                        Unbind
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;