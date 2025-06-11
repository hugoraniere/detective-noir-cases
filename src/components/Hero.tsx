
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  imagemFundo: string;
  titulo: string;
  subtitulo: string;
  textoDescricao: string;
  textoBotao?: string;
  linkBotao?: string;
  temBotaoSecundario?: boolean;
  textoBotaoSecundario?: string;
  linkBotaoSecundario?: string;
}

const Hero = ({
  imagemFundo,
  titulo,
  subtitulo,
  textoDescricao,
  textoBotao = "Ver Casos",
  linkBotao = "/casos",
  temBotaoSecundario = false,
  textoBotaoSecundario = "Jogar Agora",
  linkBotaoSecundario = "#"
}: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imagemFundo}
          alt="Background noir"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-noir-dark/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl animate-fade-in">
        <h1 className="font-garamond text-4xl md:text-6xl lg:text-7xl font-bold text-noir-light mb-6 leading-tight">
          {titulo}
        </h1>
        
        <p className="font-garamond text-xl md:text-2xl text-noir-light/90 mb-8 italic">
          {subtitulo}
        </p>
        
        <p className="font-inter text-lg md:text-xl text-noir-light/80 mb-12 leading-relaxed max-w-3xl mx-auto">
          {textoDescricao}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to={linkBotao}
            className="bg-noir-gold hover:bg-noir-gold/90 text-noir-dark px-8 py-4 rounded font-inter text-lg font-semibold transition-all duration-300 flex items-center space-x-2 hover:scale-105"
          >
            <span>{textoBotao}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          {temBotaoSecundario && (
            <Link
              to={linkBotaoSecundario}
              className="bg-noir-red hover:bg-noir-red/90 text-noir-light px-8 py-4 rounded font-inter text-lg font-semibold transition-all duration-300 flex items-center space-x-2 hover:scale-105"
            >
              <Play className="w-5 h-5" />
              <span>{textoBotaoSecundario}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-noir-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-noir-gold rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
