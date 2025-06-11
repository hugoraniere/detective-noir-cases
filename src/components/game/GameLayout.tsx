
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { ArrowLeft, Battery, Calendar, Lightbulb } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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
  const { gameState, getTotalPistas, podeAcessarDeducao } = useGame();
  const location = useLocation();

  const isInGame = location.pathname.startsWith('/jogo/');

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

            {/* Right side - Game status */}
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
            </div>
          </div>
        </div>
      </header>

      {/* Game Content */}
      <main className="pb-8">
        {children}
      </main>
    </div>
  );
};

export default GameLayout;
