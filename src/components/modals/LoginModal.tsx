import React, { useRef, useEffect, useState } from 'react';
import { X, User, Mail } from 'lucide-react';
import PlayerAccountModal from './PlayerAccountModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [isPlayerAccountOpen, setIsPlayerAccountOpen] = useState(false);
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
    }, 200); // Match this with the animation duration
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Close login modal and open player account modal
    handleClose();
    setTimeout(() => {
      setIsPlayerAccountOpen(true);
    }, 300); // Wait for login modal to close
  };
  
  if (!isOpen) return null;
  
  return (
    <>
      <div 
        className={`fixed inset-0 z-50 overflow-auto flex bg-slate-900/50 backdrop-blur-sm modal-overlay ${isClosing ? 'closing' : ''}`}
        onClick={handleClose}
      >
        <div 
          ref={modalRef}
          className={`relative m-auto w-full max-w-md bg-slate-900/60 backdrop-blur-sm border border-white/10 shadow-xl p-6 modal-content ${isClosing ? 'closing' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-pixel text-2xl text-white">Sign In</h2>
            <button 
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 pixel-panel flex items-center justify-center mb-4">
              <User className="text-blue-400" size={24} />
            </div>
            <p className="text-slate-400 font-pixel">
              Enter a username to play OpenFront
            </p>
          </div>
          
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="pixel-panel p-4">
              <label htmlFor="username" className="block font-pixel text-white mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border-2 border-slate-700 font-pixel text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="trueANON"
                  style={{ caretColor: '#60A5FA' }}
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full pixel-button flex items-center justify-center gap-2"
            >
              <User size={18} />
              Sign In
            </button>
            
            <div className="text-center">
              <p className="text-sm text-slate-400">
                By signing in, you agree to our{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <PlayerAccountModal 
        isOpen={isPlayerAccountOpen} 
        onClose={() => setIsPlayerAccountOpen(false)} 
      />
    </>
  );
};

export default LoginModal;