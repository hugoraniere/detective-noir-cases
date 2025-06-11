
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGame } from '@/contexts/GameContext';
import { Map, MapPin, Zap } from 'lucide-react';
import { areas } from '@/data/gameData';

interface MapaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LocalMapa {
  id: string;
  nome: string;
  x: number; // posição X no mapa (porcentagem)
  y: number; // posição Y no mapa (porcentagem)
  custo: number; // custo de energia para viajar
}

const MapaModal: React.FC<MapaModalProps> = ({ isOpen, onClose }) => {
  const { gameState, moverPara } = useGame();

  // Posições dos locais no mapa vintage da Lapa
  const locaisMapa: LocalMapa[] = [
    { id: 'cenaCrime', nome: 'Cena do Crime', x: 45, y: 35, custo: 1 },
    { id: 'delegacia', nome: 'Delegacia', x: 25, y: 60, custo: 1 },
    { id: 'cabare', nome: 'Cabaré Lua Azul', x: 50, y: 50, custo: 1 },
    { id: 'casaVitima', nome: 'Casa de Carmem', x: 70, y: 30, custo: 2 },
    { id: 'arquivoPublico', nome: 'Arquivo Público', x: 30, y: 25, custo: 2 },
  ];

  const handleViajarPara = (localId: string, custo: number) => {
    if (gameState.energiaAtual >= custo) {
      const sucesso = moverPara(localId);
      if (sucesso) {
        onClose();
      }
    }
  };

  const getLocalAtual = () => {
    return locaisMapa.find(local => local.id === gameState.localAtual);
  };

  const isLocalDesbloqueado = (localId: string) => {
    return gameState.areasDesbloqueadas[localId as keyof typeof gameState.areasDesbloqueadas];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-noir-dark border border-noir-gold/20 max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="font-garamond text-2xl text-noir-light flex items-center space-x-3">
            <Map className="w-6 h-6 text-noir-gold" />
            <span>Mapa da Lapa - Rio de Janeiro, 1955</span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          {/* Mapa de fundo vintage */}
          <div className="relative w-full h-96 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg overflow-hidden border border-noir-gold/30">
            {/* Texture vintage overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-sepia-600/20 to-sepia-800/40"></div>
            
            {/* Título do mapa */}
            <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded">
              <span className="font-garamond text-sm text-noir-gold">Bairro da Lapa</span>
            </div>

            {/* Pontos dos locais */}
            {locaisMapa.map((local) => {
              const isAtual = gameState.localAtual === local.id;
              const isDesbloqueado = isLocalDesbloqueado(local.id);
              const podeViajar = gameState.energiaAtual >= local.custo;

              if (!isDesbloqueado) return null;

              return (
                <div
                  key={local.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${local.x}%`, top: `${local.y}%` }}
                >
                  {/* Marcador do local */}
                  <button
                    onClick={() => handleViajarPara(local.id, local.custo)}
                    disabled={isAtual || !podeViajar}
                    className={`relative group ${
                      isAtual 
                        ? 'cursor-default' 
                        : podeViajar 
                          ? 'cursor-pointer hover:scale-110' 
                          : 'cursor-not-allowed opacity-60'
                    } transition-all duration-200`}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      isAtual
                        ? 'bg-noir-gold border-noir-gold text-noir-dark animate-pulse'
                        : podeViajar
                          ? 'bg-noir-red border-noir-light text-noir-light hover:bg-noir-red/80'
                          : 'bg-gray-600 border-gray-400 text-gray-300'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* Label do local */}
                    <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/90 px-2 py-1 rounded text-xs whitespace-nowrap ${
                      isAtual ? 'text-noir-gold' : 'text-noir-light'
                    }`}>
                      {local.nome}
                      {isAtual && (
                        <div className="text-xs text-noir-gold/80 mt-1">
                          ● Você está aqui
                        </div>
                      )}
                      {!isAtual && podeViajar && (
                        <div className="flex items-center space-x-1 text-xs text-gray-400 mt-1">
                          <Zap className="w-3 h-3" />
                          <span>{local.custo} energia</span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Legenda */}
          <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
            <h3 className="font-garamond text-lg font-semibold text-noir-light mb-3">
              Legenda
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-noir-gold rounded-full"></div>
                <span className="text-gray-300">Localização atual</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-noir-red rounded-full"></div>
                <span className="text-gray-300">Local disponível</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                <span className="text-gray-300">Energia insuficiente</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-noir-gold" />
                <span className="text-gray-300">Custo de energia</span>
              </div>
            </div>
          </div>

          {/* Status de energia */}
          <div className="mt-2 text-center">
            <span className="font-inter text-sm text-gray-400">
              Energia disponível: {gameState.energiaAtual}/5
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapaModal;
