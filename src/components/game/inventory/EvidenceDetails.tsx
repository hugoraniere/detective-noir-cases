
import React from 'react';
import { FileText, Users, Hammer } from 'lucide-react';
import { Evidencia } from '@/contexts/GameContext';

interface EvidenceDetailsProps {
  evidencia: Evidencia;
}

const EvidenceDetails: React.FC<EvidenceDetailsProps> = ({ evidencia }) => {
  const getCategoriaColor = (categoria: string) => {
    const cores: Record<string, string> = {
      Fisica: 'bg-red-900/20 border-red-600/40 text-red-400',
      Testemunhal: 'bg-blue-900/20 border-blue-600/40 text-blue-400',
      Documental: 'bg-green-900/20 border-green-600/40 text-green-400'
    };
    return cores[categoria] || 'bg-gray-900/20 border-gray-600/40 text-gray-400';
  };

  const getCategoryIcon = (categoria: string) => {
    switch (categoria) {
      case 'Fisica':
        return <Hammer className="w-12 h-12" />;
      case 'Testemunhal':
        return <Users className="w-12 h-12" />;
      case 'Documental':
        return <FileText className="w-12 h-12" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-80 border-l border-gray-700 pl-6">
      <div className="bg-gray-900/50 rounded-lg p-4">
        <h3 className="font-garamond text-lg font-semibold text-noir-light mb-3">
          {evidencia.nome}
        </h3>

        {/* Imagem maior */}
        <div className="w-full h-32 bg-gray-800 rounded mb-4 flex items-center justify-center">
          {evidencia.imagem ? (
            <img 
              src={evidencia.imagem} 
              alt={evidencia.nome}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <div className="text-gray-500">
              {getCategoryIcon(evidencia.categoria)}
            </div>
          )}
        </div>

        {/* Descrição detalhada */}
        <p className="font-inter text-sm text-gray-300 mb-4 leading-relaxed">
          {evidencia.descricao}
        </p>

        {/* Metadados */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Categoria:</span>
            <span className={getCategoriaColor(evidencia.categoria).split(' ')[2]}>
              {evidencia.categoria}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Coletada em:</span>
            <span className="text-gray-300">{evidencia.coletadaEm}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Dia:</span>
            <span className="text-gray-300">{evidencia.diaColetada}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceDetails;
