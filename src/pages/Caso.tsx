
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCasoBySlug } from '@/data/casos';
import { ArrowLeft, Play, Clock, Users, Shield, MapPin, Calendar } from 'lucide-react';

const Caso = () => {
  const { slug } = useParams<{ slug: string }>();
  const caso = slug ? getCasoBySlug(slug) : undefined;

  if (!caso) {
    return (
      <div className="min-h-screen bg-noir-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-garamond text-4xl font-bold text-noir-light mb-4">
            Caso Não Encontrado
          </h1>
          <p className="font-inter text-gray-400 mb-8">
            O caso que você procura não existe em nossos arquivos.
          </p>
          <Link
            to="/casos"
            className="inline-flex items-center bg-noir-gold hover:bg-noir-gold/90 text-noir-dark px-6 py-3 rounded font-inter font-semibold transition-colors space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar aos Casos</span>
          </Link>
        </div>
      </div>
    );
  }

  const isDisponivel = caso.status === 'disponivel';

  const getDifficultyText = (level: number) => {
    const levels = ['Muito Fácil', 'Fácil', 'Médio', 'Difícil', 'Muito Difícil'];
    return levels[level - 1] || 'Desconhecido';
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

  return (
    <div className="min-h-screen bg-noir-dark">
      <Header />
      
      {/* Hero Image */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={caso.imagemBanner}
          alt={caso.nome}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-dark via-noir-dark/70 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-24 left-4 md:left-8 z-10">
          <Link
            to="/casos"
            className="inline-flex items-center bg-noir-dark/80 hover:bg-noir-dark/90 text-noir-light px-4 py-2 rounded font-inter text-sm transition-colors space-x-2 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar aos Casos</span>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container mx-auto">
            <div className={`inline-flex items-center px-3 py-1 rounded mb-4 ${getCaseTypeColor(caso.tipoCaso)}`}>
              <span className="font-inter text-sm font-medium">{caso.tipoCaso}</span>
            </div>
            <h1 className="font-garamond text-3xl md:text-5xl lg:text-6xl font-bold text-noir-light mb-4 leading-tight">
              {caso.nome}
            </h1>
            {!isDisponivel && (
              <div className="inline-flex items-center bg-noir-red px-4 py-2 rounded">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="font-inter text-sm font-medium text-noir-light">
                  Em Breve
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Case Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Case Description */}
              <div>
                <h2 className="font-garamond text-2xl md:text-3xl font-bold text-noir-light mb-6">
                  Dossiê do Caso
                </h2>
                <div className="prose prose-invert max-w-none">
                  {caso.descricaoLonga.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="font-inter text-gray-300 leading-relaxed mb-4 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Action Section */}
              <div className="bg-gray-900 border border-noir-gold/20 rounded-lg p-6">
                <h3 className="font-garamond text-xl font-semibold text-noir-light mb-4">
                  Pronto para Investigar?
                </h3>
                <p className="font-inter text-gray-400 mb-6">
                  {isDisponivel 
                    ? "Clique no botão abaixo para acessar o dossiê completo e iniciar sua investigação."
                    : "Este caso ainda está sendo preparado. Em breve você poderá começar a investigação."
                  }
                </p>
                
                {isDisponivel ? (
                  <button className="w-full bg-noir-red hover:bg-noir-red/90 text-noir-light px-6 py-4 rounded font-inter text-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105">
                    <Play className="w-5 h-5" />
                    <span>Jogar Agora</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-700 text-gray-400 px-6 py-4 rounded font-inter text-lg font-medium cursor-not-allowed"
                  >
                    Em Breve
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Case Info */}
              <div className="bg-gray-900 border border-noir-gold/20 rounded-lg p-6">
                <h3 className="font-garamond text-xl font-semibold text-noir-light mb-6">
                  Informações do Caso
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-noir-gold" />
                      <span className="font-inter text-sm text-gray-400">Dificuldade</span>
                    </div>
                    <div className="text-right">
                      <div className="font-garamond text-lg font-semibold text-noir-light">
                        {caso.nivelDificuldade}/5
                      </div>
                      <div className="font-inter text-xs text-gray-400">
                        {getDifficultyText(caso.nivelDificuldade)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-noir-gold" />
                      <span className="font-inter text-sm text-gray-400">Duração</span>
                    </div>
                    <span className="font-garamond text-lg font-semibold text-noir-light">
                      {caso.tempoEstimado}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-noir-gold" />
                      <span className="font-inter text-sm text-gray-400">Jogadores</span>
                    </div>
                    <span className="font-garamond text-lg font-semibold text-noir-light">
                      {caso.numeroJogadores}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-noir-gold" />
                      <span className="font-inter text-sm text-gray-400">Localização</span>
                    </div>
                    <span className="font-garamond text-lg font-semibold text-noir-light">
                      Rio de Janeiro
                    </span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gray-900 border border-noir-gold/20 rounded-lg p-6">
                <h3 className="font-garamond text-xl font-semibold text-noir-light mb-4">
                  Dicas do Detetive
                </h3>
                <ul className="font-inter text-sm text-gray-400 space-y-2">
                  <li>• Mantenha um caderno para anotar pistas importantes</li>
                  <li>• Questione tudo e todos - aparências enganam</li>
                  <li>• Preste atenção aos detalhes mais pequenos</li>
                  <li>• Conecte os pontos antes de tirar conclusões</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Caso;
