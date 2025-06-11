
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGame } from '@/contexts/GameContext';
import { Users, MapPin, ArrowRight } from 'lucide-react';
import { suspeitos } from '@/data/gameData';

interface SuspeitosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuspeitosModal: React.FC<SuspeitosModalProps> = ({ isOpen, onClose }) => {
  const { gameState, moverPara } = useGame();
  const [suspeitoSelecionado, setSuspeitoSelecionado] = useState<string | null>(null);

  const suspeitosDesbloqueados = suspeitos.filter(suspeito => 
    gameState.suspeitosDesbloqueados[suspeito.id as keyof typeof gameState.suspeitosDesbloqueados]
  );

  const suspeitoDetalhado = suspeitoSelecionado 
    ? suspeitos.find(s => s.id === suspeitoSelecionado)
    : null;

  const getLocalDoSuspeito = (suspeitoId: string) => {
    const locais: Record<string, { localId: string; nome: string }> = {
      donoCabare: { localId: 'cabare', nome: 'Cabaré Lua Azul' },
      exAmante: { localId: 'casaVitima', nome: 'Casa de Carmem' },
      cantoraRival: { localId: 'cabare', nome: 'Cabaré Lua Azul' },
      pianista: { localId: 'cabare', nome: 'Cabaré Lua Azul' },
    };
    return locais[suspeitoId];
  };

  const handleIrAoLocal = (suspeitoId: string) => {
    const localInfo = getLocalDoSuspeito(suspeitoId);
    if (localInfo) {
      moverPara(localInfo.localId);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-noir-dark border border-noir-gold/20 max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="font-garamond text-2xl text-noir-light flex items-center space-x-3">
            <Users className="w-6 h-6 text-noir-gold" />
            <span>Suspeitos da Investigação</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[60vh] gap-6">
          {/* Lista de Suspeitos */}
          <div className="flex-1">
            {suspeitosDesbloqueados.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 font-inter">
                  Nenhum suspeito identificado ainda.
                </p>
                <p className="text-gray-500 font-inter text-sm mt-2">
                  Continue investigando para descobrir possíveis culpados.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 overflow-y-auto">
                {suspeitosDesbloqueados.map((suspeito) => (
                  <div
                    key={suspeito.id}
                    onClick={() => setSuspeitoSelecionado(suspeito.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:scale-105 ${
                      suspeitoSelecionado === suspeito.id
                        ? 'border-noir-gold bg-noir-gold/10'
                        : 'border-gray-600/40 bg-gray-900/50 hover:border-noir-gold/40'
                    }`}
                  >
                    {/* Retrato */}
                    <div className="w-full h-32 mb-3 rounded overflow-hidden">
                      <img 
                        src={suspeito.imagem} 
                        alt={suspeito.nome}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>

                    {/* Info básica */}
                    <h3 className="font-garamond text-lg font-semibold text-noir-light mb-1">
                      {suspeito.nome}
                    </h3>
                    
                    <p className="font-inter text-sm text-gray-400 mb-2">
                      {suspeito.descricao}
                    </p>

                    {/* Local */}
                    <div className="flex items-center space-x-2 text-xs text-noir-gold">
                      <MapPin className="w-3 h-3" />
                      <span>{getLocalDoSuspeito(suspeito.id)?.nome}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Painel de Detalhes */}
          {suspeitoDetalhado && (
            <div className="w-80 bg-gray-900/50 rounded-lg p-6">
              <div className="text-center mb-4">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-noir-gold">
                  <img 
                    src={suspeitoDetalhado.imagem} 
                    alt={suspeitoDetalhado.nome}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <h3 className="font-garamond text-xl font-semibold text-noir-light">
                  {suspeitoDetalhado.nome}
                </h3>
                <p className="font-inter text-sm text-gray-400">
                  {suspeitoDetalhado.descricao}
                </p>
              </div>

              {/* Motivo */}
              <div className="mb-4">
                <h4 className="font-garamond text-lg font-semibold text-noir-gold mb-2">
                  Possível Motivo
                </h4>
                <p className="font-inter text-sm text-gray-300 leading-relaxed">
                  {suspeitoDetalhado.motivo}
                </p>
              </div>

              {/* Localização */}
              <div className="mb-6">
                <h4 className="font-garamond text-lg font-semibold text-noir-gold mb-2">
                  Localização
                </h4>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-noir-gold" />
                  <span>{getLocalDoSuspeito(suspeitoDetalhado.id)?.nome}</span>
                </div>
              </div>

              {/* Ação */}
              <button
                onClick={() => handleIrAoLocal(suspeitoDetalhado.id)}
                className="w-full bg-noir-red hover:bg-noir-red/90 text-noir-light px-4 py-2 rounded font-inter font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>Ir ao Local</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="font-inter text-gray-400">
              Suspeitos identificados: {suspeitosDesbloqueados.length}
            </span>
            <span className="font-inter text-gray-400">
              Clique em um suspeito para ver detalhes
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuspeitosModal;
