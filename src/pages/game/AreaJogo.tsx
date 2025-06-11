
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import GameLayout from '@/components/game/GameLayout';
import { areas } from '@/data/gameData';
import { CheckCircle, Clock, ArrowRight, MapPin } from 'lucide-react';

const AreaJogo = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const { gameState, executarAcao, moverPara, adicionarEntradaDiario } = useGame();

  const area = areas.find(a => a.id === areaId);

  // Atualiza localização atual quando entra na área
  useEffect(() => {
    if (areaId && gameState.localAtual !== areaId) {
      moverPara(areaId);
    }
  }, [areaId, gameState.localAtual, moverPara]);

  // Adiciona entrada no diário ao entrar na área
  useEffect(() => {
    if (area && gameState.localAtual === areaId) {
      adicionarEntradaDiario({
        texto: `Chegou em ${area.nome}. ${area.descricao}`,
        dia: gameState.diaAtual,
        hora: getCurrentTime(),
        categoria: 'movimento'
      });
    }
  }, [area, areaId, gameState.localAtual]);

  const getCurrentTime = (): string => {
    const horas = 8 + (5 - gameState.energiaAtual) * 2;
    return `${horas.toString().padStart(2, '0')}:00`;
  };

  if (!area) {
    return (
      <GameLayout title="Área não encontrada" showBackButton>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-noir-light">Área não encontrada.</p>
        </div>
      </GameLayout>
    );
  }

  const acoesJaRealizadas = gameState.acoesRealizadas;

  return (
    <GameLayout title={area.nome} showBackButton>
      {/* Indicador de Localização */}
      <div className="bg-noir-gold/10 border-b border-noir-gold/20 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-noir-gold" />
            <span className="text-noir-gold font-medium">Localização atual:</span>
            <span className="text-noir-light font-garamond">{area.nome}</span>
          </div>
        </div>
      </div>

      {/* Header da Área */}
      <section className="relative h-64 overflow-hidden">
        <img
          src={area.imagem}
          alt={area.nome}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-dark via-noir-dark/70 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="font-garamond text-3xl font-bold text-noir-light mb-2">
            {area.nome}
          </h1>
          <p className="font-inter text-gray-300">
            {area.descricao}
          </p>
        </div>
      </section>

      {/* Ações Disponíveis */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="font-garamond text-2xl font-semibold text-noir-light mb-6">
            Ações Disponíveis
          </h2>

          {gameState.energiaAtual === 0 ? (
            <div className="bg-gray-900 border border-noir-gold/20 rounded-lg p-6 text-center">
              <Clock className="w-12 h-12 text-noir-gold mx-auto mb-4" />
              <h3 className="font-garamond text-xl font-semibold text-noir-light mb-2">
                Energia Esgotada
              </h3>
              <p className="font-inter text-gray-400 mb-4">
                Você não tem mais energia para realizar ações hoje.
              </p>
              <Link
                to="/jogo/painel"
                className="bg-noir-gold hover:bg-noir-gold/90 text-noir-dark px-6 py-2 rounded font-inter font-semibold transition-colors"
              >
                Voltar ao Painel
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {area.acoes.map((acao) => {
                const jaRealizada = acoesJaRealizadas.includes(acao.id);
                
                return (
                  <div
                    key={acao.id}
                    className={`border rounded-lg p-6 transition-all duration-300 ${
                      jaRealizada 
                        ? 'bg-gray-900/50 border-green-600/40 opacity-75' 
                        : 'bg-gray-900 border-noir-gold/20 hover:border-noir-gold/40 hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-garamond text-xl font-semibold text-noir-light">
                            {acao.nome}
                          </h3>
                          {jaRealizada && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <p className="font-inter text-gray-400 mb-4">
                          {acao.descricao}
                        </p>
                        {jaRealizada && (
                          <div className="bg-green-900/20 border border-green-600/40 rounded p-3 mb-4">
                            <p className="font-inter text-sm text-green-400 flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4" />
                              <span>Ação já realizada</span>
                            </p>
                          </div>
                        )}
                        
                        {/* Custo de energia */}
                        {!jaRealizada && (
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                            <span>Custo:</span>
                            <span className="bg-noir-gold/20 text-noir-gold px-2 py-1 rounded text-xs">
                              1 Energia
                            </span>
                          </div>
                        )}
                      </div>
                      {!jaRealizada && (
                        <Link
                          to={`/jogo/acao/${areaId}/${acao.id}`}
                          className="bg-noir-red hover:bg-noir-red/90 text-noir-light px-4 py-2 rounded font-inter font-medium transition-colors flex items-center space-x-2 min-w-fit"
                        >
                          <span>Investigar</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Resumo da área */}
          <div className="mt-8 bg-gray-900/30 border border-gray-700 rounded-lg p-6">
            <h3 className="font-garamond text-lg font-semibold text-noir-light mb-3">
              Progresso nesta Área
            </h3>
            <div className="flex items-center justify-between">
              <span className="font-inter text-gray-300">
                Ações realizadas: {area.acoes.filter(acao => acoesJaRealizadas.includes(acao.id)).length} de {area.acoes.length}
              </span>
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-noir-gold h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(area.acoes.filter(acao => acoesJaRealizadas.includes(acao.id)).length / area.acoes.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </GameLayout>
  );
};

export default AreaJogo;
