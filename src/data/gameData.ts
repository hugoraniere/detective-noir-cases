
export interface Area {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  acoes: Acao[];
}

export interface Acao {
  id: string;
  nome: string;
  descricao: string;
  resultado: string;
  pista?: string;
  desbloqueia?: {
    areas?: string[];
    suspeitos?: string[];
  };
}

export interface Suspeito {
  id: string;
  nome: string;
  descricao: string;
  motivo: string;
  imagem: string;
}

export const areas: Area[] = [
  {
    id: 'cenaCrime',
    nome: 'Cena do Crime',
    descricao: 'O camarim nos bastidores do cabaré onde o corpo de Carmem foi encontrado.',
    imagem: '/lovable-uploads/73ef99c4-8f9c-4a26-b310-10d22ff0cb76.png',
    acoes: [
      {
        id: 'observar-corpo',
        nome: 'Observar o Corpo',
        descricao: 'Examinar cuidadosamente o corpo da vítima',
        resultado: 'Você observa Carmem Bittencourt caída próxima ao espelho do camarim. Não há sinais de violência física, mas você nota um leve odor de amêndoas amargas próximo aos lábios.',
        pista: 'copoQuebrado',
        desbloqueia: {
          areas: ['delegacia'],
          suspeitos: ['donoCabare']
        }
      },
      {
        id: 'examinar-camarim',
        nome: 'Examinar o Camarim',
        descricao: 'Investigar os objetos espalhados pelo camarim',
        resultado: 'O camarim está em desordem. Você encontra uma partitura rasgada no chão com o nome "Ricardo" rabiscado com força.',
        pista: 'partituraRasgada',
        desbloqueia: {
          suspeitos: ['exAmante']
        }
      },
      {
        id: 'coletar-impressoes',
        nome: 'Coletar Impressões Digitais',
        descricao: 'Examinar a maçaneta e superfícies em busca de impressões',
        resultado: 'Você coleta várias impressões digitais da maçaneta. Será necessário levá-las à delegacia para análise.',
        pista: 'impressoesDigitais'
      }
    ]
  },
  {
    id: 'delegacia',
    nome: 'Delegacia',
    descricao: 'Central policial onde você pode analisar evidências e consultar arquivos.',
    imagem: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600',
    acoes: [
      {
        id: 'analisar-substancia',
        nome: 'Analisar Substância do Copo',
        descricao: 'Levar o copo quebrado para análise laboratorial',
        resultado: 'O laboratório confirma: a substância é cianeto de potássio. Uma dose letal foi misturada à bebida de Carmem.',
        desbloqueia: {
          areas: ['arquivoPublico']
        }
      },
      {
        id: 'verificar-impressoes',
        nome: 'Verificar Impressões Digitais',
        descricao: 'Comparar as impressões coletadas com registros policiais',
        resultado: 'As impressões revelam que três pessoas estiveram no camarim: Carmem, o pianista da banda e... Ricardo Silva, registrado como ex-companheiro da vítima.',
        desbloqueia: {
          suspeitos: ['pianista']
        }
      },
      {
        id: 'consultar-fichas',
        nome: 'Consultar Fichas Criminais',
        descricao: 'Verificar antecedentes dos envolvidos',
        resultado: 'Ricardo Silva possui uma passagem por ameaças contra ex-namorada. O dono do cabaré tem dívidas de jogo consideráveis.',
        desbloqueia: {
          areas: ['casaVitima']
        }
      }
    ]
  },
  {
    id: 'cabare',
    nome: 'Cabaré Lua Azul',
    descricao: 'O salão principal do cabaré onde Carmem se apresentava.',
    imagem: '/lovable-uploads/0293afb3-effb-403c-9e96-109b40c43f49.png',
    acoes: [
      {
        id: 'entrevistar-funcionarios',
        nome: 'Entrevistar Funcionários',
        descricao: 'Conversar com garçons e outros funcionários',
        resultado: 'Os funcionários mencionam que Carmem estava nervosa na última semana. Viram um homem discutindo com ela nos bastidores antes do show.',
        desbloqueia: {
          suspeitos: ['cantoraRival']
        }
      },
      {
        id: 'procurar-gravacao',
        nome: 'Procurar Gravações',
        descricao: 'Verificar se há gravações do ensaio da noite',
        resultado: 'Você encontra uma fita cassete escondida atrás do piano. Contém uma discussão entre Carmem e um homem sobre "não poder mais esconder a verdade".',
        pista: 'gravacaoFita'
      }
    ]
  },
  {
    id: 'casaVitima',
    nome: 'Casa de Carmem',
    descricao: 'A residência da vítima, onde ela guardava seus pertences pessoais.',
    imagem: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600',
    acoes: [
      {
        id: 'revistar-quarto',
        nome: 'Revistar o Quarto',
        descricao: 'Procurar por diários ou cartas pessoais',
        resultado: 'Debaixo do colchão você encontra uma carta de Ricardo ameaçando Carmem: "Se você me deixar, não viverá para cantar para outro homem".',
        pista: 'cartaOculta'
      },
      {
        id: 'examinar-agenda',
        nome: 'Examinar Agenda',
        descricao: 'Verificar compromissos e anotações recentes',
        resultado: 'A agenda mostra que Carmem marcou um encontro com Ricardo na noite do crime. Há uma anotação: "Terminar de vez - não aguento mais as ameaças".'
      }
    ]
  },
  {
    id: 'arquivoPublico',
    nome: 'Arquivo Público',
    descricao: 'Local onde se pode pesquisar registros e documentos oficiais.',
    imagem: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600',
    acoes: [
      {
        id: 'pesquisar-registros',
        nome: 'Pesquisar Registros',
        descricao: 'Buscar informações sobre cianeto e sua disponibilidade',
        resultado: 'Descobrimos que Ricardo trabalhava em uma fábrica de produtos químicos até recentemente. Tinha acesso a substâncias perigosas.',
      },
      {
        id: 'verificar-jornais',
        nome: 'Verificar Jornais Antigos',
        descricao: 'Procurar notícias sobre o cabaré e seus frequentadores',
        resultado: 'Jornais mostram que Carmem vinha recebendo ameaças anônimas. Uma reportagem menciona que ela pensava em deixar o Rio de Janeiro.'
      }
    ]
  }
];

export const suspeitos: Suspeito[] = [
  {
    id: 'donoCabare',
    nome: 'Alberto Mendes',
    descricao: 'Dono do Cabaré Lua Azul',
    motivo: 'Carmem exigia aumento e ameaçava sair do cabaré. Alberto estava endividado.',
    imagem: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400'
  },
  {
    id: 'exAmante',
    nome: 'Ricardo Silva',
    descricao: 'Ex-namorado de Carmem',
    motivo: 'Não aceitava o fim do relacionamento. Fazia ameaças constantes.',
    imagem: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400'
  },
  {
    id: 'cantoraRival',
    nome: 'Helena Carvalho',
    descricao: 'Cantora rival no mesmo cabaré',
    motivo: 'Inveja profissional. Sempre foi ofuscada pelo talento de Carmem.',
    imagem: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400'
  },
  {
    id: 'pianista',
    nome: 'Mário Santos',
    descricao: 'Pianista da banda do cabaré',
    motivo: 'Muito próximo de Carmem. Poderia estar envolvido romanticamente.',
    imagem: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400'
  }
];

export const culpadoReal = 'exAmante';
