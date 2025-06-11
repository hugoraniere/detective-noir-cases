
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CardCaso from '@/components/CardCaso';
import { casos } from '@/data/casos';
import { Search, Filter } from 'lucide-react';

const Casos = () => {
  const casosDisponiveis = casos.filter(caso => caso.status === 'disponivel');
  const casosEmBreve = casos.filter(caso => caso.status === 'em_breve');

  return (
    <div className="min-h-screen bg-noir-dark">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-noir-dark to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h1 className="font-garamond text-4xl md:text-5xl font-bold text-noir-light mb-6">
              Arquivo de Casos
            </h1>
            <p className="font-inter text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
              Explore nossa coleção de mistérios investigativos. Cada caso é uma jornada única através dos cenários mais intrigantes do Brasil.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-garamond font-bold text-noir-gold">
                  {casos.length}
                </div>
                <div className="text-sm font-inter text-gray-400">Casos Totais</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-garamond font-bold text-noir-gold">
                  {casosDisponiveis.length}
                </div>
                <div className="text-sm font-inter text-gray-400">Disponíveis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-garamond font-bold text-noir-gold">
                  3-5
                </div>
                <div className="text-sm font-inter text-gray-400">Dificuldade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-garamond font-bold text-noir-gold">
                  1-6
                </div>
                <div className="text-sm font-inter text-gray-400">Jogadores</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casos Disponíveis */}
      {casosDisponiveis.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Search className="w-6 h-6 text-noir-gold mr-3" />
              <h2 className="font-garamond text-2xl md:text-3xl font-bold text-noir-light">
                Casos Disponíveis
              </h2>
              <div className="ml-4 bg-noir-gold text-noir-dark px-3 py-1 rounded font-inter text-sm font-medium">
                {casosDisponiveis.length} casos
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {casosDisponiveis.map((caso) => (
                <CardCaso key={caso.slug} caso={caso} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Casos Em Breve */}
      {casosEmBreve.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-transparent to-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Filter className="w-6 h-6 text-noir-red mr-3" />
              <h2 className="font-garamond text-2xl md:text-3xl font-bold text-noir-light">
                Em Breve
              </h2>
              <div className="ml-4 bg-noir-red text-noir-light px-3 py-1 rounded font-inter text-sm font-medium">
                {casosEmBreve.length} casos
              </div>
            </div>
            
            <p className="font-inter text-gray-400 mb-8 max-w-2xl">
              Novos mistérios estão sendo desenvolvidos. Acompanhe nossos lançamentos para ser o primeiro a desvendar estes casos quando ficarem disponíveis.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {casosEmBreve.map((caso) => (
                <CardCaso key={caso.slug} caso={caso} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Casos;
