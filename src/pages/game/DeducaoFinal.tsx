
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '@/contexts/GameContext';
import GameLayout from '@/components/game/GameLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gavel, Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const DeducaoFinal = () => {
  const { gameState, fazerAcusacao } = useGame();
  const [suspeitoSelecionado, setSuspeitoSelecionado] = useState<string>('');
  const [evidenciasSelecionadas, setEvidenciasSelecionadas] = useState<string[]>([]);
  const [resultadoAcusacao, setResultadoAcusacao] = useState<string | null>(null);

  const handleSelecionarEvidencia = (evidenciaId: string) => {
    setEvidenciasSelecionadas(prev => {
      if (prev.includes(evidenciaId)) {
        return prev.filter(id => id !== evidenciaId);
      } else if (prev.length < 5) {
        return [...prev, evidenciaId];
      }
      return prev;
    });
  };

  const handleEnviarAcusacao = () => {
    if (suspeitoSelecionado && evidenciasSelecionadas.length >= 2) {
      const resultado = fazerAcusacao(suspeitoSelecionado, evidenciasSelecionadas);
      setResultadoAcusacao(resultado);
    }
  };

  const podeEnviarAcusacao = suspeitoSelecionado && evidenciasSelecionadas.length >= 2;

  return (
    <GameLayout title="Dedução Final" showBackButton backTo="/jogo/painel">
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-garamond text-3xl font-bold text-noir-light mb-4">
              Momento da Verdade
            </h2>
            <p className="font-inter text-gray-300 text-lg max-w-3xl mx-auto">
              Chegou o momento de apresentar sua teoria do caso. Selecione o suspeito que acredita ser o culpado 
              e anexe pelo menos 2 evidências que comprovem sua acusação.
            </p>
          </div>

          {resultadoAcusacao ? (
            /* Resultado da Acusação */
            <Card className="bg-noir-dark border-noir-gold/20 mb-8">
              <CardHeader>
                <CardTitle className="font-garamond text-2xl text-noir-light flex items-center space-x-3">
                  {resultadoAcusacao.includes('aceita') ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  )}
                  <span>Resultado da Acusação</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-inter text-gray-300 text-lg mb-6">
                  {resultadoAcusacao}
                </p>
                <div className="flex justify-center space-x-4">
                  {resultadoAcusacao.includes('aceita') ? (
                    <Link to="/jogo/resultado">
                      <Button className="bg-noir-gold hover:bg-noir-gold/90 text-noir-dark">
                        Ver Resultado Final
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/jogo/painel">
                      <Button className="bg-gray-700 hover:bg-gray-600 text-gray-300">
                        Continuar Investigação
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Seleção de Suspeito */}
              <Card className="bg-noir-dark border-noir-gold/20">
                <CardHeader>
                  <CardTitle className="font-garamond text-xl text-noir-light flex items-center space-x-2">
                    <Users className="w-5 h-5 text-noir-gold" />
                    <span>Selecionar Suspeito</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {gameState.suspeitosDesbloqueados.map((suspeito) => (
                      <button
                        key={suspeito.id}
                        onClick={() => setSuspeitoSelecionado(suspeito.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          suspeitoSelecionado === suspeito.id
                            ? 'border-noir-gold bg-noir-gold/10'
                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="font-garamond text-lg font-semibold text-noir-light">
                              {suspeito.nome}
                            </h3>
                            <p className="font-inter text-sm text-gray-400">
                              {suspeito.profissao}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Seleção de Evidências */}
              <Card className="bg-noir-dark border-noir-gold/20">
                <CardHeader>
                  <CardTitle className="font-garamond text-xl text-noir-light flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-noir-gold" />
                    <span>Evidências (mín. 2, máx. 5)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {gameState.inventario.map((evidencia) => (
                      <button
                        key={evidencia.id}
                        onClick={() => handleSelecionarEvidencia(evidencia.id)}
                        className={`w-full p-3 rounded-lg border transition-all text-left ${
                          evidenciasSelecionadas.includes(evidencia.id)
                            ? 'border-noir-gold bg-noir-gold/10'
                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <Badge variant="outline" className="text-xs">
                              {evidencia.categoria}
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-garamond text-sm font-semibold text-noir-light">
                              {evidencia.nome}
                            </h4>
                            <p className="font-inter text-xs text-gray-400 line-clamp-2">
                              {evidencia.descricao}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Ação de Envio */}
          {!resultadoAcusacao && (
            <div className="mt-8 text-center">
              <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
                <h3 className="font-garamond text-lg font-semibold text-noir-light mb-2">
                  Resumo da Acusação
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Suspeito:</span>
                    <span className="text-noir-light ml-2">
                      {suspeitoSelecionado ? 
                        gameState.suspeitosDesbloqueados.find(s => s.id === suspeitoSelecionado)?.nome 
                        : 'Nenhum selecionado'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Evidências:</span>
                    <span className="text-noir-light ml-2">
                      {evidenciasSelecionadas.length} selecionadas
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleEnviarAcusacao}
                disabled={!podeEnviarAcusacao}
                className={`px-8 py-3 font-inter font-semibold ${
                  podeEnviarAcusacao
                    ? 'bg-noir-red hover:bg-noir-red/90 text-white'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Gavel className="w-5 h-5 mr-2" />
                Enviar Acusação ao Juiz
              </Button>

              <p className="font-inter text-xs text-gray-500 mt-3">
                Tentativas restantes: {3 - gameState.tentativasDePrisao}
              </p>
            </div>
          )}

          {/* Aviso sobre tentativas */}
          {gameState.tentativasDePrisao >= 2 && !resultadoAcusacao && (
            <div className="mt-6 bg-red-900/20 border border-red-600/40 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <div>
                  <h3 className="font-garamond text-lg font-semibold text-red-400">
                    Última Chance
                  </h3>
                  <p className="font-inter text-sm text-red-300">
                    Esta é sua última tentativa de acusação. Pense bem antes de enviar.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </GameLayout>
  );
};

export default DeducaoFinal;
