
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGame } from '@/contexts/GameContext';
import { Package } from 'lucide-react';
import CategoryFilter from './inventory/CategoryFilter';
import EvidenceGrid from './inventory/EvidenceGrid';
import EvidenceDetails from './inventory/EvidenceDetails';

interface InventarioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InventarioModal: React.FC<InventarioModalProps> = ({ isOpen, onClose }) => {
  const { gameState } = useGame();
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [evidenciaSelecionada, setEvidenciaSelecionada] = useState<string | null>(null);

  // Fix: Add safety check for inventario
  const inventario = gameState.inventario || [];
  const evidenciasFiltradas = inventario.filter(evidencia => 
    filtroCategoria === 'todos' || evidencia.categoria === filtroCategoria
  );

  const evidenciaDetalhada = evidenciaSelecionada 
    ? inventario.find(e => e.id === evidenciaSelecionada)
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
            <CategoryFilter
              filtroCategoria={filtroCategoria}
              onCategoriaChange={setFiltroCategoria}
            />

            {/* Grid de Evidências */}
            <div className="flex-1 overflow-y-auto">
              <EvidenceGrid
                evidencias={evidenciasFiltradas}
                evidenciaSelecionada={evidenciaSelecionada}
                onEvidenciaSelect={setEvidenciaSelecionada}
                filtroCategoria={filtroCategoria}
              />
            </div>
          </div>

          {/* Painel de Detalhes */}
          {evidenciaDetalhada && (
            <EvidenceDetails evidencia={evidenciaDetalhada} />
          )}
        </div>

        {/* Rodapé */}
        <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="font-inter text-gray-400">
              Evidências coletadas: {inventario.length}
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
