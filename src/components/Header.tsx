
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-noir-dark/95 backdrop-blur-sm border-b border-noir-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-noir-light hover:text-noir-gold transition-colors"
          >
            <Search className="w-6 h-6" />
            <span className="font-garamond text-xl font-semibold">DetectiveOnline</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-inter text-sm transition-colors relative ${
                isActive('/') 
                  ? 'text-noir-gold' 
                  : 'text-noir-light hover:text-noir-gold'
              }`}
            >
              Início
              {isActive('/') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-noir-gold"></div>
              )}
            </Link>
            <Link
              to="/casos"
              className={`font-inter text-sm transition-colors relative ${
                isActive('/casos') 
                  ? 'text-noir-gold' 
                  : 'text-noir-light hover:text-noir-gold'
              }`}
            >
              Casos
              {isActive('/casos') && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-noir-gold"></div>
              )}
            </Link>
            <span className="font-inter text-sm text-gray-500 cursor-not-allowed">
              Área do Detetive
              <span className="ml-2 text-xs bg-noir-red px-2 py-1 rounded">Em breve</span>
            </span>
          </nav>

          {/* CTA Button */}
          <Link
            to="/casos"
            className="hidden md:block bg-noir-gold hover:bg-noir-gold/90 text-noir-dark px-4 py-2 rounded font-inter text-sm font-medium transition-colors"
          >
            Ver Casos
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-noir-light hover:text-noir-gold transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-noir-dark/98 backdrop-blur-sm border-t border-noir-gold/20">
            <nav className="py-4 space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block font-inter text-sm transition-colors ${
                  isActive('/') ? 'text-noir-gold' : 'text-noir-light hover:text-noir-gold'
                }`}
              >
                Início
              </Link>
              <Link
                to="/casos"
                onClick={() => setIsMenuOpen(false)}
                className={`block font-inter text-sm transition-colors ${
                  isActive('/casos') ? 'text-noir-gold' : 'text-noir-light hover:text-noir-gold'
                }`}
              >
                Casos
              </Link>
              <span className="block font-inter text-sm text-gray-500">
                Área do Detetive <span className="text-xs bg-noir-red px-2 py-1 rounded ml-2">Em breve</span>
              </span>
              <Link
                to="/casos"
                onClick={() => setIsMenuOpen(false)}
                className="block bg-noir-gold hover:bg-noir-gold/90 text-noir-dark px-4 py-2 rounded font-inter text-sm font-medium transition-colors w-fit"
              >
                Ver Casos
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
