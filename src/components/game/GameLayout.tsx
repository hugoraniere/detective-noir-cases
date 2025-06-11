
import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { ArrowLeft, Battery, Calendar, Lightbulb, BookOpen, Package, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SairJogoModal from './SairJogoModal';
import DiarioModal from './DiarioModal';
import InventarioModal from './InventarioModal';

interface GameLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  backTo?: string;
}

const GameLayout: React.FC<GameLayoutProps> = ({ 
  children, 
  title, 
  showBackButton = false, 
  backTo = '/jogo/painel' 
}) => {
  const { gameState, getTotalPistas, podeAcessarDeducao, resetarJogo } = useGame();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [showSairModal, setShowSairModal] = useState(false);
  const [showDiarioModal, setShowDiarioModal] = useState(false);
  const [showInventarioModal, setShowInventarioModal] = useState(false);

  const isInGame = location.pathname.startsWith('/jogo/');

  const handleSairJogo = () => {
    resetarJogo();
    navigate('/');
    setShowSairModal(false);
  };

  if (!isInGame || !gameState.jogoIniciado) {
    return <div className="min-h-screen bg-noir-dark">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-noir-dark">
      {/* Game Header */}
      <header className="bg-black/80 border-b border-noir-gold/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Back button and title */}
            <div className="flex items-center space-x-4">
              {showBackButton && (
                <Link
                  to={backTo}
                  className="flex items-center text-noir-light hover:text-noir-gold transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              )}
              {title && (
                <h1 className="font-garamond text-xl font-semibold text-noir-light">
                  {title}
                </h1>
              )}
            </div>

            {/* Center - Game Tools */}
            <div className="flex items-center space-x-3">
              {/* Diário */}
              <button
                onClick={() => setShowDiarioModal(true)}
                className="flex items-center space-x-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors"
                title="Diário do Detetive"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Diário</span>
              </button>

              {/* Inventário */}
              <button
                onClick={() => setShowInventarioModal(true)}
                className="flex items-center space-x-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-colors"
                title="Inventário de Evidências"
              >
                <Package className="w-4 h-4" />
                <span className="text-sm font-medium">Evidências</span>
                {gameState.inventario && gameState.inventario.length > 0 && (
                  <span className="bg-noir-gold text-noir-dark text-xs px-1.5 py-0.5 rounded-full">
                    {gameState.inventario.length}
                  </span>
                )}
              </button>
            </div>

            {/* Right side - Game status and actions */}
            <div className="flex items-center space-x-6">
              {/* Pistas coletadas */}
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-noir-gold" />
                <span className="font-inter text-sm text-noir-light">
                  {getTotalPistas()}/5 pistas
                </span>
              </div>

              {/* Energia */}
              <div className="flex items-center space-x-2">
                <Battery className="w-4 h-4 text-noir-gold" />
                <span className="font-inter text-sm text-noir-light">
                  {gameState.energiaAtual}/5
                </span>
              </div>

              {/* Dia */}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-noir-gold" />
                <span className="font-inter text-sm text-noir-light">
                  Dia {gameState.diaAtual}
                </span>
              </div>

              {/* Dedução Final */}
              {podeAcessarDeducao() && (
                <Link
                  to="/jogo/deducao"
                  className="bg-noir-red hover:bg-noir-red/90 text-noir-light px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Dedução Final
                </Link>
              )}

              {/* Sair do Jogo */}
              <button
                onClick={() => setShowSairModal(true)}
                className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors"
                title="Sair do Jogo"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Game Content */}
      <main className="pb-8">
        {children}
      </main>

      {/* Modals */}
      <SairJogoModal
        isOpen={showSairModal}
        onClose={() => setShowSairModal(false)}
        onConfirm={handleSairJogo}
      />

      <DiarioModal
        isOpen={showDiarioModal}
        onClose={() => setShowDiarioModal(false)}
      />

      <InventarioModal
        isOpen={showInventarioModal}
        onClose={() => setShowInventarioModal(false)}
      />
    </div>
  );
};

export default GameLayout;
