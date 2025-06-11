
export interface CasoData {
  slug: string;
  nome: string;
  descricaoCurta: string;
  descricaoLonga: string;
  imagemBanner: string;
  nivelDificuldade: number;
  tempoEstimado: string;
  numeroJogadores: string;
  tipoCaso: string;
  status: 'disponivel' | 'em_breve';
}

export const casos: CasoData[] = [
  {
    slug: 'a-ultima-cancao-da-lapa',
    nome: 'A Última Canção da Lapa',
    descricaoCurta: 'Um famoso cantor de jazz teve sua última noite interrompida por um tiro no coração da Lapa.',
    descricaoLonga: `Um famoso cantor de jazz teve sua última noite interrompida por um tiro no coração da Lapa. As pistas estão espalhadas pelos becos e cabarés cariocas. 

Você recebeu o dossiê do caso – fotos amareladas, depoimentos contraditórios e uma canção inacabada. A vítima, João "Melodia" Santos, era conhecido por sua voz aveludada e por frequentar os círculos mais sombrios da boemia carioca.

No palco do famoso cabaré "Lua Azul", onde deveria acontecer sua última apresentação, encontraram apenas seu chapéu e uma partitura ensanguentada. Os suspeitos incluem uma cantora rival, um empresário endividado e uma misteriosa mulher de vermelho que ninguém consegue identificar.

Cabe a você conectar os pontos e desvendar quem quis silenciar a voz da noite. Cada pista revelará mais sobre os segredos obscuros que João guardava, e talvez você descubra que sua morte não foi apenas um crime passional.`,
    imagemBanner: '/lovable-uploads/73ef99c4-8f9c-4a26-b310-10d22ff0cb76.png',
    nivelDificuldade: 3,
    tempoEstimado: '60-90 min',
    numeroJogadores: '1-4 jogadores',
    tipoCaso: 'Assassinato',
    status: 'disponivel'
  },
  {
    slug: 'o-segredo-do-teatro-municipal',
    nome: 'O Segredo do Teatro Municipal',
    descricaoCurta: 'Durante um ensaio da ópera, a prima ballerina desaparece misteriosamente nos bastidores.',
    descricaoLonga: 'Durante um ensaio da ópera Carmen, a prima ballerina desaparece misteriosamente nos bastidores do Teatro Municipal. Suas sapatilhas foram encontradas no camarim, mas ela simplesmente evaporou.',
    imagemBanner: '/lovable-uploads/0293afb3-effb-403c-9e96-109b40c43f49.png',
    nivelDificuldade: 4,
    tempoEstimado: '90-120 min',
    numeroJogadores: '2-6 jogadores',
    tipoCaso: 'Desaparecimento',
    status: 'em_breve'
  },
  {
    slug: 'roubo-no-museu-nacional',
    nome: 'Roubo no Museu Nacional',
    descricaoCurta: 'Uma valiosa relíquia pré-colombiana desaparece durante uma exposição especial.',
    descricaoLonga: 'Uma valiosa relíquia pré-colombiana desaparece durante uma exposição especial no Museu Nacional. O sistema de segurança foi desabilitado por um especialista.',
    imagemBanner: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600',
    nivelDificuldade: 2,
    tempoEstimado: '45-60 min',
    numeroJogadores: '1-3 jogadores',
    tipoCaso: 'Roubo',
    status: 'em_breve'
  },
  {
    slug: 'misterio-na-biblioteca-nacional',
    nome: 'Mistério na Biblioteca Nacional',
    descricaoCurta: 'Manuscritos raros estão sendo substituídos por falsificações perfeitas.',
    descricaoLonga: 'Manuscritos raros da Biblioteca Nacional estão sendo substituídos por falsificações perfeitas. O bibliotecário-chefe suspeita de uma operação interna.',
    imagemBanner: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600',
    nivelDificuldade: 5,
    tempoEstimado: '120-150 min',
    numeroJogadores: '3-6 jogadores',
    tipoCaso: 'Falsificação',
    status: 'em_breve'
  }
];

export const getCasoBySlug = (slug: string): CasoData | undefined => {
  return casos.find(caso => caso.slug === slug);
};
