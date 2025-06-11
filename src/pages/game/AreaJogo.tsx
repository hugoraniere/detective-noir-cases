
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import GameLayout from '@/components/game/GameLayout';
import { areas } from '@/data/gameData';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';

const AreaJogo = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const { gameState, executarAcao } = useGame();

  const area = areas.find(a => a.id === areaId);

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
                    className={`bg-gray-900 border rounded-lg p-6 ${
                      jaRealizada 
                        ? 'border-green-600/40 opacity-75' 
                        : 'border-noir-gold/20 hover:border-noir-gold/40'
                    } transition-all duration-300`}
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
                          <p className="font-inter text-sm text-green-400 mb-4">
                            ✓ Ação já realizada
                          </p>
                        )}
                      </div>
                      {!jaRealizada && (
                        <Link
                          to={`/jogo/acao/${areaId}/${acao.id}`}
                          className="bg-noir-red hover:bg-noir-red/90 text-noir-light px-4 py-2 rounded font-inter font-medium transition-colors flex items-center space-x-2"
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
        </div>
      </section>
    </GameLayout>
  );
};

export default AreaJogo;
