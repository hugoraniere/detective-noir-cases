
import { Link } from 'react-router-dom';
import { Clock, Users, Search, Eye } from 'lucide-react';
import { CasoData } from '@/data/casos';

interface CardCasoProps {
  caso: CasoData;
}

const CardCaso = ({ caso }: CardCasoProps) => {
  const getDifficultyIcons = (level: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Search
        key={index}
        className={`w-4 h-4 ${
          index < level ? 'text-noir-gold fill-current' : 'text-gray-600'
        }`}
      />
    ));
  };

  const getCaseTypeColor = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'assassinato':
        return 'bg-noir-red text-noir-light';
      case 'desaparecimento':
        return 'bg-blue-800 text-noir-light';
      case 'roubo':
        return 'bg-green-800 text-noir-light';
      case 'falsificação':
        return 'bg-purple-800 text-noir-light';
      default:
        return 'bg-gray-800 text-noir-light';
    }
  };

  const isDisponivel = caso.status === 'disponivel';

  return (
    <div className={`bg-noir-dark border border-noir-gold/20 rounded-lg overflow-hidden transition-all duration-300 hover:border-noir-gold/40 hover:scale-105 ${!isDisponivel ? 'opacity-75' : ''}`}>
      <div className="relative">
        <img
          src={caso.imagemBanner}
          alt={caso.nome}
          className={`w-full h-48 object-cover ${!isDisponivel ? 'grayscale' : ''}`}
        />
        <div className="absolute inset-0 bg-noir-dark/40"></div>
        
        {/* Status Badge */}
        {!isDisponivel && (
          <div className="absolute top-4 right-4 bg-noir-red/90 text-noir-light px-3 py-1 rounded font-inter text-sm font-medium">
            Em Breve
          </div>
        )}

        {/* Type Badge */}
        <div className={`absolute bottom-4 left-4 px-3 py-1 rounded font-inter text-sm font-medium ${getCaseTypeColor(caso.tipoCaso)}`}>
          {caso.tipoCaso}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-garamond text-xl font-semibold text-noir-light mb-2">
          {caso.nome}
        </h3>
        
        <p className="font-inter text-sm text-gray-400 mb-4 leading-relaxed">
          {caso.descricaoCurta}
        </p>

        {/* Meta Information */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {getDifficultyIcons(caso.nivelDificuldade)}
              </div>
              <span className="font-inter text-xs text-gray-400">
                {caso.nivelDificuldade}/5
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="font-inter text-xs">{caso.tempoEstimado}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-400">
              <Users className="w-4 h-4" />
              <span className="font-inter text-xs">{caso.numeroJogadores}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {isDisponivel ? (
          <Link
            to={`/caso/${caso.slug}`}
            className="w-full bg-noir-gold hover:bg-noir-gold/90 text-noir-dark px-4 py-3 rounded font-inter text-sm font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Caso</span>
          </Link>
        ) : (
          <button
            disabled
            className="w-full bg-gray-700 text-gray-400 px-4 py-3 rounded font-inter text-sm font-medium cursor-not-allowed"
          >
            Em Breve
          </button>
        )}
      </div>
    </div>
  );
};

export default CardCaso;
