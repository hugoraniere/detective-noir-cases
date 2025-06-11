
import { Link } from 'react-router-dom';
import { Search, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-noir-dark border-t border-noir-gold/20 text-noir-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-noir-gold" />
              <span className="font-garamond text-lg font-semibold">DetectiveOnline</span>
            </div>
            <p className="font-inter text-sm text-gray-400 leading-relaxed">
              Mergulhe em mistérios investigativos onde você é o detetive. 
              Resolva casos complexos em cenários brasileiros únicos.
            </p>
          </div>

          {/* Links de Navegação */}
          <div className="space-y-4">
            <h3 className="font-garamond text-lg font-semibold text-noir-gold">Navegação</h3>
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="block font-inter text-sm text-gray-400 hover:text-noir-gold transition-colors"
              >
                Início
              </Link>
              <Link 
                to="/casos" 
                className="block font-inter text-sm text-gray-400 hover:text-noir-gold transition-colors"
              >
                Casos
              </Link>
              <span className="block font-inter text-sm text-gray-500 cursor-not-allowed">
                Área do Detetive (Em breve)
              </span>
            </nav>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="font-garamond text-lg font-semibold text-noir-gold">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="font-inter">contato@detectiveonline.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="font-inter">+55 (21) 9999-9999</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-noir-gold/20 mt-8 pt-8 text-center">
          <p className="font-inter text-sm text-gray-500">
            © 2025 DetectiveOnline. Todos os direitos reservados. 
            Desenvolvido com paixão por mistérios brasileiros.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
