
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGame } from '@/contexts/GameContext';
import { BookOpen, Clock, MapPin, Search, Eye } from 'lucide-react';

interface DiarioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DiarioModal: React.FC<DiarioModalProps> = ({ isOpen, onClose }) => {
  const { gameState } = useGame();
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');

  const categorias = [
    { id: 'todos', nome: 'Todas as Entradas', icone: BookOpen },
    { id: 'descoberta', nome: 'Descobertas', icone: Search },
    { id: 'interrogatorio', nome: 'Interrogatórios', icone: Eye },
    { id: 'movimento', nome: 'Movimentação', icone: MapPin },
    { id: 'analise', nome: 'Análises', icone: Clock },
  ];

  const entradasFiltradas = gameState.logNarrativo.filter(entrada => 
    filtroCategoria === 'todos' || entrada.categoria === filtroCategoria
  );

  const getCategoriaColor = (categoria: string) => {
    const cores: Record<string, string> = {
      descoberta: 'text-green-400',
      interrogatorio: 'text-blue-400',
      movimento: 'text-yellow-400',
      analise: 'text-purple-400'
    };
    return cores[categoria] || 'text-gray-400';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-noir-dark border border-noir-gold/20 max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="font-garamond text-2xl text-noir-light flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-noir-gold" />
            <span>Diário do Detetive</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[60vh]">
          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-900/50 rounded-lg">
            {categorias.map(categoria => {
              const IconeCategoria = categoria.icone;
              return (
                <button
                  key={categoria.id}
                  onClick={() => setFiltroCategoria(categoria.id)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${
                    filtroCategoria === categoria.id
                      ? 'bg-noir-gold text-noir-dark'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <IconeCategoria className="w-4 h-4" />
                  <span className="text-sm font-medium">{categoria.nome}</span>
                </button>
              );
            })}
          </div>

          {/* Entradas do Diário */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {entradasFiltradas.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 font-inter">
                  Nenhuma entrada encontrada para esta categoria.
                </p>
              </div>
            ) : (
              entradasFiltradas.map((entrada, index) => (
                <div
                  key={entrada.id}
                  className="bg-gray-900/80 border border-gray-700 rounded-lg p-4 relative"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23374151" fill-opacity="0.05"%3E%3Cpath d="M0 0h20v20H0z"/%3E%3C/g%3E%3C/svg%3E")',
                  }}
                >
                  {/* Cabeçalho da entrada */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-garamond text-sm font-semibold text-noir-gold">
                        Dia {entrada.dia}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="font-inter text-sm text-gray-400">
                        {entrada.hora}
                      </span>
                    </div>
                    <span className={`text-xs font-medium uppercase tracking-wide ${getCategoriaColor(entrada.categoria)}`}>
                      {entrada.categoria}
                    </span>
                  </div>

                  {/* Texto da entrada */}
                  <p className="font-inter text-gray-300 leading-relaxed">
                    {entrada.texto}
                  </p>

                  {/* Linha de separação vintage */}
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-noir-gold/20 to-transparent"></div>
                </div>
              ))
            )}
          </div>

          {/* Rodapé com estatísticas */}
          <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="font-inter text-gray-400">
                Total de entradas: {gameState.logNarrativo.length}
              </span>
              <span className="font-inter text-gray-400">
                Investigação: Dia {gameState.diaAtual}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiarioModal;
