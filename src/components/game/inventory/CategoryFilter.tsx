
import React from 'react';
import { Package, FileText, Users, Hammer } from 'lucide-react';

interface Category {
  id: string;
  nome: string;
  icone: React.ElementType;
}

interface CategoryFilterProps {
  filtroCategoria: string;
  onCategoriaChange: (categoria: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  filtroCategoria,
  onCategoriaChange,
}) => {
  const categorias: Category[] = [
    { id: 'todos', nome: 'Todas', icone: Package },
    { id: 'Fisica', nome: 'Física', icone: Hammer },
    { id: 'Testemunhal', nome: 'Testemunhal', icone: Users },
    { id: 'Documental', nome: 'Documental', icone: FileText },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {categorias.map(categoria => {
        const IconeCategoria = categoria.icone;
        return (
          <button
            key={categoria.id}
            onClick={() => onCategoriaChange(categoria.id)}
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
  );
};

export default CategoryFilter;
