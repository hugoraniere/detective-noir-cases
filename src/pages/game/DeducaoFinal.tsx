
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import GameLayout from '@/components/game/GameLayout';
import { suspeitos } from '@/data/gameData';
import { UserCheck, Scale, ArrowRight } from 'lucide-react';

const DeducaoFinal = () => {
  const navigate = useNavigate();
  const { gameState, confirmarAcusacao } = useGame();
  const [suspeitoSelecionado, setSuspeitoSelecionado] = useState<string>('');

  const suspeitosDisponiveis = suspeitos.filter(suspeito => 
    gameState.suspeitosDesbloqueados[suspeito.id as keyof typeof gameState.suspeitosDesbloqueados]
  );

  const handleConfirmarAcusacao = () => {
    if (suspeitoSelecionado) {
      confirmarAcusacao(suspeitoSelecionado);
      navigate('/jogo/resultado');
    }
  };

  return (
    <GameLayout title="Dedução Final" showBackButton>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="bg-noir-red/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Scale className="w-10 h-10 text-noir-gold" />
            </div>
            <h1 className="font-garamond text-3xl md:text-4xl font-bold text-noir-light mb-4">
              Momento da Verdade
            </h1>
            <p className="font-inter text-lg text-gray-300 max-w-2xl mx-auto">
              Você coletou evidências suficientes para fazer uma acusação. 
              Analise cuidadosamente as pistas e escolha quem você acredita ser o culpado 
              pelo assassinato de Carmem Bittencourt.
            </p>
          </div>

          {/* Resumo das Pistas */}
          <div className="bg-gray-900 border border-noir-gold/20 rounded-lg p-6 mb-8">
            <h2 className="font-garamond text-xl font-semibold text-noir-light mb-4">
              Pistas Coletadas
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(gameState.pistasEncontradas).map(([pista, encontrada]) => (
                encontrada && (
                  <div key={pista} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-noir-gold rounded-full"></div>
                    <span className="font-inter text-gray-300 capitalize">
                      {pista.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Seleção de Suspeito */}
          <div className="mb-8">
            <h2 className="font-garamond text-2xl font-semibold text-noir-light mb-6">
              Quem é o Culpado?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {suspeitosDisponiveis.map((suspeito) => (
                <div
                  key={suspeito.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                    suspeitoSelecionado === suspeito.id
                      ? 'border-noir-red bg-noir-red/10'
                      : 'border-gray-700 bg-gray-900 hover:border-noir-gold/40'
                  }`}
                  onClick={() => setSuspeitoSelecionado(suspeito.id)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={suspeito.imagem}
                      alt={suspeito.nome}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-garamond text-lg font-semibold text-noir-light">
                          {suspeito.nome}
                        </h3>
                        {suspeitoSelecionado === suspeito.id && (
                          <UserCheck className="w-5 h-5 text-noir-red" />
                        )}
                      </div>
                      <p className="font-inter text-sm text-gray-400 mb-2">
                        {suspeito.descricao}
                      </p>
                      <p className="font-inter text-sm text-gray-300">
                        <strong>Motivo:</strong> {suspeito.motivo}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botão de Confirmação */}
          <div className="text-center">
            <button
              onClick={handleConfirmarAcusacao}
              disabled={!suspeitoSelecionado}
              className={`px-8 py-3 rounded font-inter font-semibold transition-colors flex items-center space-x-2 mx-auto ${
                suspeitoSelecionado
                  ? 'bg-noir-red hover:bg-noir-red/90 text-noir-light'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Fazer Acusação</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            {!suspeitoSelecionado && (
              <p className="font-inter text-sm text-gray-500 mt-2">
                Selecione um suspeito para continuar
              </p>
            )}
          </div>
        </div>
      </section>
    </GameLayout>
  );
};

export default DeducaoFinal;
