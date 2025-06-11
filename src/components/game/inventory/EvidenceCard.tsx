
import React from 'react';
import { FileText, Users, Hammer, Sparkles } from 'lucide-react';
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
      className={`relative p-4 border rounded-lg cursor-pointer transition-all hover:scale-105 ${
        isSelected
          ? 'border-noir-gold bg-noir-gold/10 shadow-lg shadow-noir-gold/20'
          : `${getCategoriaColor(evidencia.categoria)} hover:border-noir-gold/40`
      }`}
    >
      {/* Novo indicador */}
      <div className="absolute top-2 right-2">
        <Sparkles className="w-4 h-4 text-noir-gold animate-pulse" />
      </div>

      {/* Imagem ou ícone da evidência */}
      <div className="w-full h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-3 flex items-center justify-center border border-gray-700">
        {evidencia.imagem ? (
          <img 
            src={evidencia.imagem} 
            alt={evidencia.nome}
            className="w-full h-full object-cover rounded sepia"
          />
        ) : (
          <div className="text-gray-500 text-xs flex flex-col items-center space-y-1">
            {getCategoryIcon(evidencia.categoria)}
            <span className="text-xs font-medium">
              {evidencia.categoria}
            </span>
          </div>
        )}
      </div>

      {/* Info da evidência */}
      <h3 className="font-garamond text-sm font-semibold text-noir-light mb-1">
        {evidencia.nome}
      </h3>
      
      <p className="font-inter text-xs text-gray-400 line-clamp-2 mb-2">
        {evidencia.descricao}
      </p>

      {/* Local de coleta */}
      <div className="text-xs text-gray-500 mb-2">
        Coletada em: {evidencia.coletadaEm}
      </div>

      {/* Badge da categoria com estilo melhorado */}
      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded border ${getCategoriaColor(evidencia.categoria)}`}>
          {evidencia.categoria}
        </span>
        <span className="text-xs text-gray-500">
          Dia {evidencia.diaColetada}
        </span>
      </div>

      {/* Efeito vintage */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-sepia-900/10 rounded-lg pointer-events-none"></div>
    </div>
  );
};

export default EvidenceCard;
