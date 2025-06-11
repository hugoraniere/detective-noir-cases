
import React from 'react';
import { FileText, Users, Hammer } from 'lucide-react';
import { Evidencia } from '@/contexts/GameContext';

interface EvidenceCardProps {
  evidencia: Evidencia;
  isSelected: boolean;
  onClick: () => void;
}

const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidencia,
  isSelected,
  onClick,
}) => {
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
        return <Hammer className="w-8 h-8" />;
      case 'Testemunhal':
        return <Users className="w-8 h-8" />;
      case 'Documental':
        return <FileText className="w-8 h-8" />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all hover:scale-105 ${
        isSelected
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
            {getCategoryIcon(evidencia.categoria)}
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
  );
};

export default EvidenceCard;
