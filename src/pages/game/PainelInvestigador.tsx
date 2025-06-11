
import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import GameLayout from '@/components/game/GameLayout';
import { areas } from '@/data/gameData';
import { MapPin, Lock, ArrowRight, Zap, AlertCircle } from 'lucide-react';

const PainelInvestigador = () => {
  const { gameState, encerrarDia, moverPara } = useGame();

  const areasDisponiveis = areas.filter(area => 
    gameState.areasDesbloqueadas[area.id as keyof typeof gameState.areasDesbloqueadas]
  );

  const handleEncerrarDia = () => {
    encerrarDia();
  };

  const handleMoverPara = (areaId: string) => {
    const sucesso = moverPara(areaId);
    if (!sucesso) {
      // Mostrar mensagem de energia insuficiente
      console.log('Energia insuficiente para se mover');
    }
  };

  const getLocalAtualName = () => {
    const area = areas.find(a => a.id === gameState.localAtual);
    return area?.nome || 'Local Desconhecido';
  };

  return (
    <GameLayout title="Painel do Investigador">
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Status do Jogo */}
          <div className="text-center mb-8">
            <h2 className="font-garamond text-3xl md:text-4xl font-bold text-noir-light mb-4">
              Investigação em Andamento
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-noir-gold" />
                <span className="font-inter text-lg text-gray-300">
                  Localização atual: <strong className="text-noir-light">{getLocalAtualName()}</strong>
                </span>
              </div>
            </div>
            <p className="font-inter text-gray-400 text-lg">
              {gameState.energiaAtual > 0 
                ? `Você tem ${gameState.energiaAtual} ações restantes hoje.`
                : 'Sua energia se esgotou. É hora de encerrar o dia.'
              }
            </p>
          </div>

          {/* Aviso de Energia */}
          {gameState.energiaAtual <= 1 && gameState.energiaAtual > 0 && (
            <div className="bg-yellow-900/20 border border-yellow-600/40 rounded-lg p-4 mb-8">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <div>
                  <h3 className="font-garamond text-lg font-semibold text-yellow-400">
                    Energia Baixa
                  </h3>
                  <p className="font-inter text-sm text-yellow-300">
                    Você tem apenas {gameState.energiaAtual} ação restante. 
                    Planeje cuidadosamente seu próximo movimento.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mapa de Locais */}
          <div className="mb-12">
            <h3 className="font-garamond text-2xl font-semibold text-noir-light mb-6 text-center">
              Mapa da Investigação
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areasDisponiveis.map((area) => {
                const isLocalAtual = gameState.localAtual === area.id;
                const podeSeDeslocar = gameState.energiaAtual > 0 || isLocalAtual;
                
                return (
                  <div
                    key={area.id}
                    className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                      isLocalAtual
                        ? 'border-2 border-noir-gold bg-noir-gold/10 scale-105'
                        : 'border border-noir-gold/20 hover:border-noir-gold/40 hover:scale-102'
                    }`}
                  >
                    {isLocalAtual && (
                      <div className="absolute top-2 right-2 z-10">
                        <div className="bg-noir-gold text-noir-dark px-2 py-1 rounded text-xs font-bold">
                          VOCÊ ESTÁ AQUI
                        </div>
                      </div>
                    )}

                    <div className="relative h-48">
                      <img
                        src={area.imagem}
                        alt={area.nome}
                        className={`w-full h-full object-cover ${
                          !podeSeDeslocar ? 'grayscale opacity-50' : ''
                        }`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        isLocalAtual 
                          ? 'from-noir-gold/20 to-transparent'
                          : 'from-black/80 to-transparent'
                      }`}></div>
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
                        
                        {isLocalAtual ? (
                          <Link
                            to={`/jogo/area/${area.id}`}
                            className="bg-noir-red hover:bg-noir-red/90 text-noir-light px-4 py-2 rounded font-inter font-medium transition-colors flex items-center space-x-2"
                          >
                            <span>Investigar</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleMoverPara(area.id)}
                            disabled={!podeSeDeslocar}
                            className={`px-4 py-2 rounded font-inter font-medium transition-colors flex items-center space-x-2 ${
                              podeSeDeslocar
                                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            }`}
                            title={!podeSeDeslocar ? 'Energia insuficiente' : 'Mover para este local'}
                          >
                            <Zap className="w-4 h-4" />
                            <span>Ir</span>
                            {podeSeDeslocar && (
                              <span className="text-xs">(-1 energia)</span>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
