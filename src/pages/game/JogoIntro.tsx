
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import GameLayout from '@/components/game/GameLayout';
import { Play } from 'lucide-react';

const JogoIntro = () => {
  const navigate = useNavigate();
  const { iniciarJogo } = useGame();

  const handleIniciarJogo = () => {
    iniciarJogo();
    navigate('/jogo/painel');
  };

  return (
    <GameLayout>
      {/* Hero Image */}
      <section className="relative h-screen overflow-hidden">
        <img
          src="/lovable-uploads/73ef99c4-8f9c-4a26-b310-10d22ff0cb76.png"
          alt="A Última Canção da Lapa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-dark via-noir-dark/70 to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="font-garamond text-4xl md:text-6xl lg:text-7xl font-bold text-noir-light mb-6 leading-tight">
              A Última Canção da Lapa
            </h1>
            
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 mb-8">
              <p className="font-inter text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                Uma noite de jazz no Cabaré Lua Azul termina em tragédia. Carmem Bittencourt, 
                a cantora mais aclamada da Lapa, foi encontrada morta em seu camarim nos bastidores.
              </p>
              
              <p className="font-inter text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                Você é o detetive responsável pelo caso. As pistas estão espalhadas pelos 
                becos e cabarés da Lapa dos anos 50. Cada ação consome energia e tempo é limitado.
              </p>
              
              <p className="font-inter text-lg md:text-xl text-noir-gold leading-relaxed font-semibold">
                Será que você consegue desvendar quem silenciou para sempre a voz da noite?
              </p>
            </div>

            <button
              onClick={handleIniciarJogo}
              className="bg-noir-red hover:bg-noir-red/90 text-noir-light px-8 py-4 rounded font-inter text-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 mx-auto hover:scale-105"
            >
              <Play className="w-6 h-6" />
              <span>Iniciar Investigação</span>
            </button>
          </div>
        </div>
      </section>
    </GameLayout>
  );
};

export default JogoIntro;
