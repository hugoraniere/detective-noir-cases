
import React from 'react';
import { Package } from 'lucide-react';
import { Evidencia } from '@/contexts/GameContext';
import EvidenceCard from './EvidenceCard';

interface EvidenceGridProps {
  evidencias: Evidencia[];
  evidenciaSelecionada: string | null;
  onEvidenciaSelect: (id: string) => void;
  filtroCategoria: string;
}

const EvidenceGrid: React.FC<EvidenceGridProps> = ({
  evidencias,
  evidenciaSelecionada,
  onEvidenciaSelect,
  filtroCategoria,
}) => {
  if (evidencias.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400 font-inter">
          {filtroCategoria === 'todos' 
            ? 'Nenhuma evidência coletada ainda.'
            : `Nenhuma evidência ${filtroCategoria.toLowerCase()} encontrada.`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {evidencias.map((evidencia) => (
        <EvidenceCard
          key={evidencia.id}
          evidencia={evidencia}
          isSelected={evidenciaSelecionada === evidencia.id}
          onClick={() => onEvidenciaSelect(evidencia.id)}
        />
      ))}
    </div>
  );
};

export default EvidenceGrid;
