import React, { useState, useRef, useEffect } from 'react';
import { X, Search } from 'lucide-react';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Language {
  code: string;
  name: string;
  localName?: string;
}

const languages: Language[] = [
  { code: 'en-US', name: 'English', localName: 'English' },
  { code: 'bn-BD', name: 'Bengali', localName: 'বাংলা' },
  { code: 'pt-BR', name: 'Brazilian Portuguese', localName: 'Português brasileiro' },
  { code: 'bg-BG', name: 'Bulgarian', localName: 'Български' },
  { code: 'nl-NL', name: 'Dutch', localName: 'Nederlands' },
  { code: 'eo', name: 'Esperanto', localName: 'Esperanto' },
  { code: 'fr-FR', name: 'French', localName: 'Français' },
  { code: 'de-DE', name: 'German', localName: 'Deutsch' },
  { code: 'hi-IN', name: 'Hindi', localName: 'हिन्दी' },
  { code: 'it-IT', name: 'Italian', localName: 'Italiano' },
  { code: 'ja-JP', name: 'Japanese', localName: '日本語' },
  { code: 'pl-PL', name: 'Polish', localName: 'Polski' },
  { code: 'ru-RU', name: 'Russian', localName: 'Русский' },
  { code: 'hr-HR', name: 'Serbo-Croatian', localName: 'Srpsko-Hrvatski' }
];

const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
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
  
  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (lang.localName && lang.localName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getFlagUrl = (code: string) => {
    // Handle special case for Esperanto
    if (code === 'eo') {
      return 'https://flagcdn.com/w40/eu.png';
    }
    // Extract country code from locale
    const countryCode = code.split('-')[1]?.toLowerCase() || code.toLowerCase();
    return `https://flagcdn.com/w40/${countryCode}.png`;
  };
  
  return (
    <div 
      className={`fixed inset-0 z-50 overflow-auto flex bg-slate-900/50 backdrop-blur-sm modal-overlay ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className={`relative m-auto w-full max-w-2xl bg-slate-900/60 backdrop-blur-sm border border-white/10 shadow-xl p-6 modal-content ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-pixel text-2xl text-white">Select Language</h2>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="pixel-panel p-4 mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 font-pixel"
            />
          </div>
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {filteredLanguages.map((lang) => (
            <button
              key={lang.code}
              className="w-full pixel-panel p-4 hover:bg-slate-800/50 transition-colors flex items-center gap-3 group"
            >
              <div className="w-8 h-6 relative overflow-hidden rounded">
                <img 
                  src={getFlagUrl(lang.code)}
                  alt={`${lang.name} flag`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <div className="text-white font-pixel">{lang.name}</div>
                {lang.localName && lang.localName !== lang.name && (
                  <div className="text-slate-400 text-sm">{lang.localName}</div>
                )}
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;