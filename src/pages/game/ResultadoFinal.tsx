
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import GameLayout from '@/components/game/GameLayout';
import { culpadoReal, suspeitos } from '@/data/gameData';
import { Trophy, RotateCcw, Home, Star } from 'lucide-react';

const ResultadoFinal = () => {
  const navigate = useNavigate();
  const { gameState, resetarJogo, getTotalPistas } = useGame();

  const acertou = gameState.acusadoFinal === culpadoReal;
  const suspeitoAcusado = suspeitos.find(s => s.id === gameState.acusadoFinal);
  const culpadoVerdadeiro = suspeitos.find(s => s.id === culpadoReal);
  const totalPistas = getTotalPistas();

  const getMedalha = (pontuacao: number) => {
    if (pontuacao >= 180) return { nome: 'Ouro', cor: 'text-yellow-400', icon: '🥇' };
    if (pontuacao >= 120) return { nome: 'Prata', cor: 'text-gray-300', icon: '🥈' };
    if (pontuacao >= 60) return { nome: 'Bronze', cor: 'text-amber-600', icon: '🥉' };
    return { nome: 'Participação', cor: 'text-gray-500', icon: '🏅' };
  };

  const medalha = getMedalha(gameState.pontuacaoFinal);

  const handleJogarNovamente = () => {
    resetarJogo();
    navigate('/jogo/a-ultima-cancao-da-lapa');
  };

  const handleVoltarCasos = () => {
    resetarJogo();
    navigate('/casos');
  };

  return (
    <GameLayout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header do Resultado */}
          <div className="text-center mb-12">
            <div className={`text-6xl mb-4`}>
              {acertou ? '🎯' : '💔'}
            </div>
            <h1 className="font-garamond text-3xl md:text-4xl font-bold text-noir-light mb-4">
              {acertou ? 'Caso Resolvido!' : 'Caso Inconclusivo'}
            </h1>
            <p className="font-inter text-lg text-gray-300">
              {acertou 
                ? 'Parabéns! Você desvendou o mistério de "A Última Canção da Lapa".'
                : 'Infelizmente, você não conseguiu identificar o verdadeiro culpado.'
              }
            </p>
          </div>

          {/* Resultado da Acusação */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Sua Acusação */}
            <div className="bg-gray-900 border border-noir-gold/20 rounded-lg p-6">
              <h2 className="font-garamond text-xl font-semibold text-noir-light mb-4">
                Sua Acusação
              </h2>
              {suspeitoAcusado && (
                <div className="flex items-center space-x-4">
                  <img
                    src={suspeitoAcusado.imagem}
                    alt={suspeitoAcusado.nome}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-inter font-semibold text-noir-light">
                      {suspeitoAcusado.nome}
                    </h3>
                    <p className="font-inter text-sm text-gray-400">
                      {suspeitoAcusado.descricao}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Culpado Real */}
            <div className="bg-gray-900 border border-green-600/20 rounded-lg p-6">
              <h2 className="font-garamond text-xl font-semibold text-noir-light mb-4">
                O Verdadeiro Culpado
              </h2>
              {culpadoVerdadeiro && (
                <div className="flex items-center space-x-4">
                  <img
                    src={culpadoVerdadeiro.imagem}
                    alt={culpadoVerdadeiro.nome}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-inter font-semibold text-noir-light">
                      {culpadoVerdadeiro.nome}
                    </h3>
                    <p className="font-inter text-sm text-gray-400">
                      {culpadoVerdadeiro.descricao}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pontuação e Estatísticas */}
          <div className="bg-gray-900 border border-noir-gold/20 rounded-lg p-8 mb-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{medalha.icon}</div>
              <h2 className="font-garamond text-2xl font-semibold text-noir-light mb-2">
                Medalha {medalha.nome}
              </h2>
              <div className="flex items-center justify-center space-x-2">
                <Trophy className="w-6 h-6 text-noir-gold" />
                <span className="font-inter text-2xl font-bold text-noir-gold">
                  {gameState.pontuacaoFinal} pontos
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl text-noir-gold font-bold">
                  {totalPistas}/5
                </div>
                <p className="font-inter text-sm text-gray-400">
                  Pistas Coletadas
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl text-noir-gold font-bold">
                  {gameState.diaAtual}
                </div>
                <p className="font-inter text-sm text-gray-400">
                  Dias Utilizados
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl text-noir-gold font-bold">
                  {acertou ? '✓' : '✗'}
                </div>
                <p className="font-inter text-sm text-gray-400">
                  Acusação {acertou ? 'Correta' : 'Incorreta'}
                </p>
              </div>
            </div>
          </div>

          {/* Narrativa Final */}
          <div className="bg-gray-900 border border-noir-gold/20 rounded-lg p-8 mb-8">
            <h2 className="font-garamond text-xl font-semibold text-noir-light mb-4">
              Desfecho da História
            </h2>
            <div className="prose prose-invert max-w-none">
              {acertou ? (
                <p className="font-inter text-gray-300 leading-relaxed">
                  Com as evidências coletadas, você conseguiu convencer as autoridades de que 
                  <strong className="text-noir-light"> {culpadoVerdadeiro?.nome}</strong> era 
                  o verdadeiro assassino de Carmem Bittencourt. O ex-amante foi preso e confessou 
                  o crime, revelando que não conseguia aceitar o fim do relacionamento. 
                  A justiça foi feita, e o caso que abalou a Lapa dos anos 50 finalmente foi resolvido. 
                  Sua dedicação como detetive trouxe paz para todos os envolvidos.
                </p>
              ) : (
                <p className="font-inter text-gray-300 leading-relaxed">
                  Infelizmente, sua acusação não foi suficiente para convencer as autoridades. 
                  Sem evidências conclusivas apontando para o verdadeiro culpado, 
                  <strong className="text-noir-light"> {culpadoVerdadeiro?.nome}</strong>, 
                  o caso de Carmem Bittencourt permanece oficialmente em aberto. 
                  O assassino continua livre, e a Lapa guarda mais um de seus mistérios sombrios. 
                  Talvez uma nova investigação possa trazer a verdade à tona...
                </p>
              )}
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleJogarNovamente}
              className="bg-noir-red hover:bg-noir-red/90 text-noir-light px-6 py-3 rounded font-inter font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Jogar Novamente</span>
            </button>
            <button
              onClick={handleVoltarCasos}
              className="bg-noir-gold hover:bg-noir-gold/90 text-noir-dark px-6 py-3 rounded font-inter font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Outros Casos</span>
            </button>
          </div>
        </div>
      </section>
    </GameLayout>
  );
};

export default ResultadoFinal;
