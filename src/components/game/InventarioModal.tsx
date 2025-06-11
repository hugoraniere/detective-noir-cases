
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGame } from '@/contexts/GameContext';
import { Package, FileText, Users, Hammer } from 'lucide-react';

interface InventarioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InventarioModal: React.FC<InventarioModalProps> = ({ isOpen, onClose }) => {
  const { gameState } = useGame();
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [evidenciaSelecionada, setEvidenciaSelecionada] = useState<string | null>(null);

  const categorias = [
    { id: 'todos', nome: 'Todas', icone: Package },
    { id: 'Fisica', nome: 'Física', icone: Hammer },
    { id: 'Testemunhal', nome: 'Testemunhal', icone: Users },
    { id: 'Documental', nome: 'Documental', icone: FileText },
  ];

  const evidenciasFiltradas = gameState.inventario.filter(evidencia => 
    filtroCategoria === 'todos' || evidencia.categoria === filtroCategoria
  );

  const getCategoriaColor = (categoria: string) => {
    const cores: Record<string, string> = {
      Fisica: 'bg-red-900/20 border-red-600/40 text-red-400',
      Testemunhal: 'bg-blue-900/20 border-blue-600/40 text-blue-400',
      Documental: 'bg-green-900/20 border-green-600/40 text-green-400'
    };
    return cores[categoria] || 'bg-gray-900/20 border-gray-600/40 text-gray-400';
  };

  const evidenciaDetalhada = evidenciaSelecionada 
    ? gameState.inventario.find(e => e.id === evidenciaSelecionada)
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-noir-dark border border-noir-gold/20 max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="font-garamond text-2xl text-noir-light flex items-center space-x-3">
            <Package className="w-6 h-6 text-noir-gold" />
            <span>Inventário de Evidências</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[60vh] gap-6">
          {/* Lista de Evidências */}
          <div className="flex-1 flex flex-col">
            {/* Filtros */}
            <div className="flex gap-2 mb-4">
              {categorias.map(categoria => {
                const IconeCategoria = categoria.icone;
                return (
                  <button
                    key={categoria.id}
                    onClick={() => setFiltroCategoria(categoria.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
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

            {/* Grid de Evidências */}
            <div className="flex-1 overflow-y-auto">
              {evidenciasFiltradas.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 font-inter">
                    {filtroCategoria === 'todos' 
                      ? 'Nenhuma evidência coletada ainda.'
                      : `Nenhuma evidência ${filtroCategoria.toLowerCase()} encontrada.`
                    }
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {evidenciasFiltradas.map((evidencia) => (
                    <div
                      key={evidencia.id}
                      onClick={() => setEvidenciaSelecionada(evidencia.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:scale-105 ${
                        evidenciaSelecionada === evidencia.id
                          ? 'border-noir-gold bg-noir-gold/10'
                          : `${getCategoriaColor(evidencia.categoria)} hover:border-noir-gold/40`
                      }`}
                    >
                      {/* Imagem placeholder */}
                      <div className="w-full h-24 bg-gray-800 rounded mb-3 flex items-center justify-center">
                        {evidencia.imagem ? (
                          <img 
                            src={evidencia.imagem} 
                            alt={evidencia.nome}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="text-gray-500 text-xs">
                            {evidencia.categoria === 'Fisica' && <Hammer className="w-8 h-8" />}
                            {evidencia.categoria === 'Testemunhal' && <Users className="w-8 h-8" />}
                            {evidencia.categoria === 'Documental' && <FileText className="w-8 h-8" />}
                          </div>
                        )}
                      </div>

                      {/* Info da evidência */}
                      <h3 className="font-garamond text-sm font-semibold text-noir-light mb-1">
                        {evidencia.nome}
                      </h3>
                      
                      <p className="font-inter text-xs text-gray-400 line-clamp-2">
                        {evidencia.descricao}
                      </p>

                      {/* Badge da categoria */}
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${getCategoriaColor(evidencia.categoria)}`}>
                          {evidencia.categoria}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Painel de Detalhes */}
          {evidenciaDetalhada && (
            <div className="w-80 border-l border-gray-700 pl-6">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h3 className="font-garamond text-lg font-semibold text-noir-light mb-3">
                  {evidenciaDetalhada.nome}
                </h3>

                {/* Imagem maior */}
                <div className="w-full h-32 bg-gray-800 rounded mb-4 flex items-center justify-center">
                  {evidenciaDetalhada.imagem ? (
                    <img 
                      src={evidenciaDetalhada.imagem} 
                      alt={evidenciaDetalhada.nome}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="text-gray-500">
                      {evidenciaDetalhada.categoria === 'Fisica' && <Hammer className="w-12 h-12" />}
                      {evidenciaDetalhada.categoria === 'Testemunhal' && <Users className="w-12 h-12" />}
                      {evidenciaDetalhada.categoria === 'Documental' && <FileText className="w-12 h-12" />}
                    </div>
                  )}
                </div>

                {/* Descrição detalhada */}
                <p className="font-inter text-sm text-gray-300 mb-4 leading-relaxed">
                  {evidenciaDetalhada.descricao}
                </p>

                {/* Metadados */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Categoria:</span>
                    <span className={getCategoriaColor(evidenciaDetalhada.categoria).split(' ')[2]}>
                      {evidenciaDetalhada.categoria}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Coletada em:</span>
                    <span className="text-gray-300">{evidenciaDetalhada.coletadaEm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dia:</span>
                    <span className="text-gray-300">{evidenciaDetalhada.diaColetada}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="font-inter text-gray-400">
              Evidências coletadas: {gameState.inventario.length}
            </span>
            <span className="font-inter text-gray-400">
              Clique em uma evidência para ver detalhes
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InventarioModal;
