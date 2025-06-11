
import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import GameLayout from '@/components/game/GameLayout';
import { areas } from '@/data/gameData';
import { MapPin, Lock, ArrowRight } from 'lucide-react';

const PainelInvestigador = () => {
  const { gameState, encerrarDia } = useGame();

  const areasDisponiveis = areas.filter(area => 
    gameState.areasDesbloqueadas[area.id as keyof typeof gameState.areasDesbloqueadas]
  );

  const handleEncerrarDia = () => {
    encerrarDia();
  };

  return (
    <GameLayout title="Painel do Investigador">
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Status do Jogo */}
          <div className="text-center mb-12">
            <h2 className="font-garamond text-3xl md:text-4xl font-bold text-noir-light mb-4">
              Investigação em Andamento
            </h2>
            <p className="font-inter text-gray-400 text-lg">
              {gameState.energiaAtual > 0 
                ? `Você tem ${gameState.energiaAtual} ações restantes hoje.`
                : 'Sua energia se esgotou. É hora de encerrar o dia.'
              }
            </p>
          </div>

          {/* Áreas Disponíveis */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {areasDisponiveis.map((area) => (
              <Link
                key={area.id}
                to={`/jogo/area/${area.id}`}
                className="bg-gray-900 border border-noir-gold/20 rounded-lg overflow-hidden hover:border-noir-gold/40 transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48">
                  <img
                    src={area.imagem}
                    alt={area.nome}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-garamond text-xl font-semibold text-noir-light mb-2">
                      {area.nome}
                    </h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-inter text-sm text-gray-400 mb-4">
                    {area.descricao}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-noir-gold" />
                      <span className="font-inter text-sm text-noir-gold">
                        {area.acoes.length} ações disponíveis
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-noir-light" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Áreas Bloqueadas */}
          {areas.some(area => !gameState.areasDesbloqueadas[area.id as keyof typeof gameState.areasDesbloqueadas]) && (
            <div className="mb-12">
              <h3 className="font-garamond text-2xl font-semibold text-gray-500 mb-6 text-center">
                Áreas Ainda Não Descobertas
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {areas
                  .filter(area => !gameState.areasDesbloqueadas[area.id as keyof typeof gameState.areasDesbloqueadas])
                  .map((area) => (
                    <div
                      key={area.id}
                      className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden opacity-60"
                    >
                      <div className="relative h-48">
                        <img
                          src={area.imagem}
                          alt="???"
                          className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Lock className="w-12 h-12 text-gray-500" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-garamond text-xl font-semibold text-gray-500 mb-2">
                          Localização Desconhecida
                        </h3>
                        <p className="font-inter text-sm text-gray-600">
                          Continue investigando para descobrir novos locais
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Ações do Dia */}
          <div className="text-center">
            {gameState.energiaAtual === 0 ? (
              <button
                onClick={handleEncerrarDia}
                className="bg-noir-gold hover:bg-noir-gold/90 text-noir-dark px-8 py-3 rounded font-inter font-semibold transition-colors"
              >
                Encerrar Dia {gameState.diaAtual}
              </button>
            ) : (
              <p className="font-inter text-gray-400">
                Continue investigando as áreas disponíveis para coletar pistas
              </p>
            )}
          </div>
        </div>
      </section>
    </GameLayout>
  );
};

export default PainelInvestigador;
