import React, { useState, useRef, useEffect } from 'react';
import { X, Map, Swords, Users, Settings, ChevronRight, ChevronLeft, Copy } from 'lucide-react';

interface CreateLobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'map' | 'difficulty' | 'mode' | 'options' | 'waiting';
type MapTab = 'Continental' | 'Regional' | 'Other' | 'Random';

interface MapOption {
  id: string;
  name: string;
  image: string;
  category: MapTab;
}

const maps: MapOption[] = [
  // Continental
  { id: 'world', name: 'World', image: 'https://openfront.io/images/WorldMapThumb.7e3d37714e416fcd65ed.webp', category: 'Continental' },
  { id: 'north-america', name: 'North America', image: 'https://openfront.io/images/NorthAmericaThumb.37682c7034d59053a832.webp', category: 'Continental' },
  { id: 'south-america', name: 'South America', image: 'https://openfront.io/images/SouthAmericaThumb.f8d10364d143a79422c8.webp', category: 'Continental' },
  { id: 'europe', name: 'Europe', image: 'https://openfront.io/images/EuropeThumb.4e4f469e4c24917b6d07.webp', category: 'Continental' },
  { id: 'europe-classic', name: 'Europe (classic)', image: 'https://openfront.io/images/AfricaThumb.2e6cfd49ef4b0e214f47.webp', category: 'Continental' },
  { id: 'asia', name: 'Asia', image: 'https://openfront.io/images/AsiaThumb.55990da1e6079fb09cbe.webp', category: 'Continental' },
  { id: 'africa', name: 'Africa', image: 'https://openfront.io/images/SouthAmericaThumb.f8d10364d143a79422c8.webp', category: 'Continental' },
  { id: 'oceania', name: 'Oceania', image: 'https://openfront.io/images/OceaniaThumb.37d7fd437e4936a1c713.webp', category: 'Continental' },
  
  // Regional
  { id: 'black-sea', name: 'Black Sea', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Regional' },
  { id: 'britannia', name: 'Britannia', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Regional' },
  { id: 'gateway-atlantic', name: 'Gateway to the Atlantic', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Regional' },
  { id: 'between-seas', name: 'Between Two Seas', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Regional' },
  { id: 'iceland', name: 'Iceland', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Regional' },
  { id: 'japan', name: 'Japan and Neighbors', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Regional' },
  { id: 'mena', name: 'MENA', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Regional' },
  { id: 'australia', name: 'Australia', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Regional' },
  { id: 'faroe', name: 'Faroe Islands', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Regional' },
  
  // Other
  { id: 'pangaea', name: 'Pangaea', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Other' },
  { id: 'mars', name: 'Mars', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Other' },
  { id: 'known-world', name: 'Known World', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Other' },
  
  // Random
  { id: 'random', name: 'Random', image: 'https://images.pexels.com/photos/269724/pexels-photo-269724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: 'Random' },
];

const CreateLobbyModal: React.FC<CreateLobbyModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<Step>('map');
  const [selectedMap, setSelectedMap] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'relaxed' | 'balanced' | 'intense' | 'impossible'>('balanced');
  const [gameMode, setGameMode] = useState<'ffa' | 'teams'>('ffa');
  const [numberOfTeams, setNumberOfTeams] = useState<number>(2);
  const [activeMapTab, setActiveMapTab] = useState<MapTab>('Continental');
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const [options, setOptions] = useState({
    bots: 400,
    disableNations: false,
    instantBuild: false,
    infiniteGold: false,
    infiniteTroops: false,
    disableNukes: false
  });
  
  const lobbyId = 'W13bptIP';
  const [connectedPlayers] = useState(['trueANON']);

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

  const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: 'map', label: 'Select Map', icon: <Map size={20} /> },
    { id: 'difficulty', label: 'Difficulty', icon: <Swords size={20} /> },
    { id: 'mode', label: 'Game Mode', icon: <Users size={20} /> },
    { id: 'options', label: 'Options', icon: <Settings size={20} /> },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleNext = () => {
    if (currentStep === 'options') {
      setCurrentStep('waiting');
    } else {
      const nextIndex = currentStepIndex + 1;
      if (nextIndex < steps.length) {
        setCurrentStep(steps[nextIndex].id);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 'waiting') {
      setCurrentStep('options');
    } else {
      const prevIndex = currentStepIndex - 1;
      if (prevIndex >= 0) {
        setCurrentStep(steps[prevIndex].id);
      }
    }
  };

  const copyLobbyId = () => {
    navigator.clipboard.writeText(lobbyId);
  };

  const renderStepContent = () => {
    if (currentStep === 'waiting') {
      return (
        <div className="space-y-8 py-12">
          <div className="text-center">
            <h3 className="font-pixel text-2xl text-white mb-4">
              {connectedPlayers.length} Player{connectedPlayers.length !== 1 ? 's' : ''}
            </h3>
            <div className="flex justify-center gap-2">
              {connectedPlayers.map((player, index) => (
                <div key={index} className="pixel-panel px-4 py-2">
                  <span className="font-pixel text-white">{player}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="font-pixel text-slate-400 animate-pulse">
              Waiting for players...
            </p>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 'map':
        return (
          <div className="space-y-6">
            {/* Map Tabs */}
            <div className="pixel-panel p-1 flex">
              {(['Continental', 'Regional', 'Other', 'Random'] as MapTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMapTab(tab)}
                  className={`flex-1 px-4 py-2 font-pixel text-sm transition-all ${
                    activeMapTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Map Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {maps
                .filter(map => map.category === activeMapTab)
                .map(map => (
                  <button
                    key={map.id}
                    onClick={() => setSelectedMap(map.id)}
                    className={`pixel-panel p-2 transition-all ${
                      selectedMap === map.id ? 'border-blue-500' : 'hover:border-slate-600'
                    }`}
                  >
                    <div className="aspect-video w-full overflow-hidden mb-2">
                      <img
                        src={map.image}
                        alt={map.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-pixel text-white text-sm">{map.name}</p>
                  </button>
                ))}
            </div>
          </div>
        );

      case 'difficulty':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'relaxed', label: 'Relaxed', skulls: 1 },
              { id: 'balanced', label: 'Balanced', skulls: 2 },
              { id: 'intense', label: 'Intense', skulls: 3 },
              { id: 'impossible', label: 'Impossible', skulls: 4 }
            ].map(option => (
              <button
                key={option.id}
                onClick={() => setDifficulty(option.id as any)}
                className={`pixel-panel p-6 transition-all ${
                  difficulty === option.id ? 'border-blue-500' : 'hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  {Array(option.skulls).fill('💀').map((skull, i) => (
                    <span key={i} className="text-2xl">{skull}</span>
                  ))}
                </div>
                <p className="font-pixel text-white text-center">{option.label}</p>
              </button>
            ))}
          </div>
        );

      case 'mode':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setGameMode('ffa')}
                className={`pixel-panel p-6 transition-all ${
                  gameMode === 'ffa' ? 'border-blue-500' : 'hover:border-slate-600'
                }`}
              >
                <div className="text-4xl mb-4 text-center">⚔️</div>
                <h3 className="font-pixel text-white text-center mb-2">Free for All</h3>
                <p className="text-slate-400 text-sm text-center">Every player for themselves</p>
              </button>
              <button
                onClick={() => setGameMode('teams')}
                className={`pixel-panel p-6 transition-all ${
                  gameMode === 'teams' ? 'border-blue-500' : 'hover:border-slate-600'
                }`}
              >
                <div className="text-4xl mb-4 text-center">👥</div>
                <h3 className="font-pixel text-white text-center mb-2">Teams</h3>
                <p className="text-slate-400 text-sm text-center">Form alliances and work together</p>
              </button>
            </div>

            {gameMode === 'teams' && (
              <div className="pixel-panel p-4">
                <h3 className="font-pixel text-white mb-4">Number of Teams</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[2, 3, 4, 5, 6, 7].map(num => (
                    <button
                      key={num}
                      onClick={() => setNumberOfTeams(num)}
                      className={`pixel-panel p-3 transition-all ${
                        numberOfTeams === num ? 'border-blue-500' : 'hover:border-slate-600'
                      }`}
                    >
                      <span className="font-pixel text-white text-center block">{num}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'options':
        return (
          <div className="space-y-4">
            <div className="pixel-panel p-4">
              <label className="flex items-center justify-between">
                <span className="font-pixel text-white">Bots</span>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={options.bots}
                  onChange={(e) => setOptions({ ...options, bots: parseInt(e.target.value) })}
                  className="w-48 h-2 rounded-none appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #384d6f ${options.bots / 10}%, #1e293b ${options.bots / 10}%)`,
                    borderRadius: '0.25rem',
                  }}
                />
                <span className="text-slate-400 w-16 text-right">{options.bots}</span>
              </label>
            </div>

            {[
              { id: 'disableNations', label: 'Disable Nations' },
              { id: 'instantBuild', label: 'Instant Build' },
              { id: 'infiniteGold', label: 'Infinite Gold' },
              { id: 'infiniteTroops', label: 'Infinite Troops' },
              { id: 'disableNukes', label: 'Disable Nukes' }
            ].map(option => (
              <div key={option.id} className="pixel-panel p-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-pixel text-white">{option.label}</span>
                  <button
                    onClick={() => setOptions({ ...options, [option.id]: !options[option.id as keyof typeof options] })}
                    className={`w-12 h-7 flex items-center rounded-full relative transition-colors duration-200 ${
                      options[option.id as keyof typeof options] ? 'bg-blue-600' : 'bg-slate-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                      options[option.id as keyof typeof options] ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </label>
              </div>
            ))}
          </div>
        );
    }
  };
  
  return (
    <div 
      className={`fixed inset-0 z-50 overflow-auto flex bg-slate-900/50 backdrop-blur-sm modal-overlay ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className={`relative m-auto w-full max-w-4xl bg-slate-900/60 backdrop-blur-sm border border-white/10 shadow-xl p-6 modal-content ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-pixel text-2xl text-white">Create Private Lobby</h2>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Steps */}
        {currentStep !== 'waiting' && (
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => index <= currentStepIndex && setCurrentStep(step.id)}
                  className={`flex items-center ${
                    index <= currentStepIndex ? 'text-white' : 'text-slate-500'
                  } ${index === currentStepIndex ? 'scale-110' : ''} transition-all`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index === currentStepIndex ? 'bg-blue-600' :
                    index < currentStepIndex ? 'bg-green-600' : 'bg-slate-700'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="ml-2 font-pixel text-sm hidden sm:block">{step.label}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    index < currentStepIndex ? 'bg-green-600' : 'bg-slate-700'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Step Content */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handleBack}
            className={`pixel-button bg-slate-600 flex items-center gap-2 ${
              currentStepIndex === 0 && currentStep !== 'waiting' ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentStepIndex === 0 && currentStep !== 'waiting'}
          >
            <ChevronLeft size={18} />
            Back
          </button>

          {/* Lobby ID */}
          <div className="flex items-center gap-2">
            <div className="pixel-panel px-4 py-2 flex items-center gap-2">
              <span className="font-pixel text-white">{lobbyId}</span>
              <button
                onClick={copyLobbyId}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
          
          <button
            onClick={currentStep === 'waiting' ? onClose : handleNext}
            className="pixel-button flex items-center gap-2"
          >
            {currentStep === 'waiting' ? (
              'Start Game'
            ) : (
              <>Next <ChevronRight size={18} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLobbyModal;