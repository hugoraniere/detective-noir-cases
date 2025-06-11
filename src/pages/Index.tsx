
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CardCaso from '@/components/CardCaso';
import { casos } from '@/data/casos';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Clock } from 'lucide-react';

const Index = () => {
  // Pegar o caso principal (primeiro disponível)
  const casoDestaque = casos.find(caso => caso.status === 'disponivel');

  return (
    <div className="min-h-screen bg-noir-dark">
      <Header />
      
      <Hero
        imagemFundo="/lovable-uploads/73ef99c4-8f9c-4a26-b310-10d22ff0cb76.png"
        titulo="Receba um Dossiê Secreto."
        subtitulo="Mergulhe em um Labirinto de Pistas. Resolva o Caso."
        textoDescricao="Participe de um clube de detetives narrativo. Desafie sua mente em casos investigativos por capítulos, jogando sozinho ou em grupo, numa experiência imersiva onde você é o detetive."
      />

      {/* Caso em Destaque */}
      {casoDestaque && (
        <section className="py-20 bg-noir-dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-garamond text-3xl md:text-4xl font-bold text-noir-light mb-4">
                Caso em Destaque
              </h2>
              <p className="font-inter text-lg text-gray-400">
                Mergulhe no mistério que está desafiando detetives do Brasil inteiro
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <img
                    src={casoDestaque.imagemBanner}
                    alt={casoDestaque.nome}
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-noir-dark/30 rounded-lg"></div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="inline-flex items-center bg-noir-red px-3 py-1 rounded mb-4">
                      <span className="font-inter text-sm font-medium text-noir-light">
                        {casoDestaque.tipoCaso}
                      </span>
                    </div>
                    <h3 className="font-garamond text-2xl md:text-3xl font-bold text-noir-light mb-4">
                      {casoDestaque.nome}
                    </h3>
                    <p className="font-inter text-gray-400 leading-relaxed">
                      {casoDestaque.descricaoCurta}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <Shield className="w-8 h-8 text-noir-gold mx-auto mb-2" />
                      <p className="font-inter text-sm text-gray-400">Dificuldade</p>
                      <p className="font-garamond text-lg font-semibold text-noir-light">
                        {casoDestaque.nivelDificuldade}/5
                      </p>
                    </div>
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-noir-gold mx-auto mb-2" />
                      <p className="font-inter text-sm text-gray-400">Duração</p>
                      <p className="font-garamond text-lg font-semibold text-noir-light">
                        {casoDestaque.tempoEstimado}
                      </p>
                    </div>
                    <div className="text-center">
                      <Users className="w-8 h-8 text-noir-gold mx-auto mb-2" />
                      <p className="font-inter text-sm text-gray-400">Jogadores</p>
                      <p className="font-garamond text-lg font-semibold text-noir-light">
                        {casoDestaque.numeroJogadores}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/caso/${casoDestaque.slug}`}
                    className="inline-flex items-center bg-noir-gold hover:bg-noir-gold/90 text-noir-dark px-6 py-3 rounded font-inter text-lg font-semibold transition-all duration-300 space-x-2 hover:scale-105"
                  >
                    <span>Investigar Agora</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Outros Casos */}
      <section className="py-20 bg-gradient-to-b from-noir-dark to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-garamond text-3xl md:text-4xl font-bold text-noir-light mb-4">
              Outros Mistérios
            </h2>
            <p className="font-inter text-lg text-gray-400 mb-8">
              Descubra uma coleção de casos que desafiarão suas habilidades de detetive
            </p>
            <Link
              to="/casos"
              className="inline-flex items-center text-noir-gold hover:text-noir-gold/80 font-inter font-medium transition-colors space-x-2"
            >
              <span>Ver todos os casos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {casos.slice(1, 4).map((caso) => (
              <CardCaso key={caso.slug} caso={caso} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
