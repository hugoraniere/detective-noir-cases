
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import GameLayout from '@/components/game/GameLayout';
import { areas } from '@/data/gameData';
import { Lightbulb, Users, MapPin, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AcaoJogo = () => {
  const { areaId, acaoId } = useParams<{ areaId: string; acaoId: string }>();
  const navigate = useNavigate();
  const { gameState, executarAcao, coletarPista, desbloquearSuspeito, desbloquearArea } = useGame();
  const { toast } = useToast();
  const [acaoExecutada, setAcaoExecutada] = useState(false);

  const area = areas.find(a => a.id === areaId);
  const acao = area?.acoes.find(a => a.id === acaoId);

  useEffect(() => {
    if (acao && !acaoExecutada && !gameState.acoesRealizadas.includes(acao.id)) {
      // Executar a ação
      executarAcao(acao.id);
      
      // Coletar pista se houver
      if (acao.pista) {
        coletarPista(acao.pista as keyof typeof gameState.pistasEncontradas);
        toast({
          title: "📌 Nova pista coletada!",
          description: `Você encontrou: ${acao.pista}`,
        });
      }

      // Desbloquear áreas
      if (acao.desbloqueia?.areas) {
        acao.desbloqueia.areas.forEach(areaParaDesbloquear => {
          desbloquearArea(areaParaDesbloquear as keyof typeof gameState.areasDesbloqueadas);
        });
        toast({
          title: "🗺️ Nova área desbloqueada!",
          description: `Você pode agora investigar: ${acao.desbloqueia.areas.join(', ')}`,
        });
      }

      // Desbloquear suspeitos
      if (acao.desbloqueia?.suspeitos) {
        acao.desbloqueia.suspeitos.forEach(suspeitoParaDesbloquear => {
          desbloquearSuspeito(suspeitoParaDesbloquear as keyof typeof gameState.suspeitosDesbloqueados);
        });
        toast({
          title: "🕵️ Novo suspeito identificado!",
          description: `Suspeito adicionado à investigação: ${acao.desbloqueia.suspeitos.join(', ')}`,
        });
      }

      setAcaoExecutada(true);
    }
  }, [acao, acaoExecutada, executarAcao, coletarPista, desbloquearArea, desbloquearSuspeito, gameState.acoesRealizadas, toast]);

  if (!area || !acao) {
    return (
      <GameLayout title="Ação não encontrada" showBackButton>
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-noir-light">Ação não encontrada.</p>
        </div>
      </GameLayout>
    );
  }

  const handleContinuar = () => {
    if (gameState.energiaAtual === 0) {
      navigate('/jogo/painel');
    } else {
      navigate(`/jogo/area/${areaId}`);
    }
  };

  return (
    <GameLayout title={acao.nome} showBackButton backTo={`/jogo/area/${areaId}`}>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Resultado da Ação */}
          <div className="bg-gray-900 border border-noir-gold/20 rounded-lg p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-noir-red/20 p-3 rounded-full">
                <Lightbulb className="w-6 h-6 text-noir-gold" />
              </div>
              <h2 className="font-garamond text-2xl font-semibold text-noir-light">
                Investigação Realizada
              </h2>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="font-inter text-lg text-gray-300 leading-relaxed">
                {acao.resultado}
              </p>
            </div>
          </div>

          {/* Informações de Progresso */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {acao.pista && (
              <div className="bg-green-900/20 border border-green-600/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-green-400" />
                  <h3 className="font-inter font-semibold text-green-400">
                    Pista Coletada
                  </h3>
                </div>
                <p className="font-inter text-sm text-gray-300">
                  {acao.pista}
                </p>
              </div>
            )}

            {acao.desbloqueia?.areas && (
              <div className="bg-blue-900/20 border border-blue-600/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <h3 className="font-inter font-semibold text-blue-400">
                    Áreas Desbloqueadas
                  </h3>
                </div>
                <p className="font-inter text-sm text-gray-300">
                  {acao.desbloqueia.areas.join(', ')}
                </p>
              </div>
            )}

            {acao.desbloqueia?.suspeitos && (
              <div className="bg-purple-900/20 border border-purple-600/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <h3 className="font-inter font-semibold text-purple-400">
                    Suspeitos Identificados
                  </h3>
                </div>
                <p className="font-inter text-sm text-gray-300">
                  {acao.desbloqueia.suspeitos.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Status de Energia */}
          {gameState.energiaAtual === 0 && (
            <div className="bg-noir-red/20 border border-noir-red/40 rounded-lg p-6 mb-8">
              <h3 className="font-garamond text-xl font-semibold text-noir-light mb-2">
                Energia Esgotada
              </h3>
              <p className="font-inter text-gray-300">
                Você gastou toda sua energia para hoje. É hora de encerrar o dia e descansar.
              </p>
            </div>
          )}

          {/* Botão Continuar */}
          <div className="text-center">
            <button
              onClick={handleContinuar}
              className="bg-noir-gold hover:bg-noir-gold/90 text-noir-dark px-8 py-3 rounded font-inter font-semibold transition-colors flex items-center space-x-2 mx-auto"
            >
              <span>
                {gameState.energiaAtual === 0 ? 'Voltar ao Painel' : 'Continuar Investigação'}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </GameLayout>
  );
};

export default AcaoJogo;
