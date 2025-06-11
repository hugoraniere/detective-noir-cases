
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Evidencia {
  id: string;
  nome: string;
  descricao: string;
  categoria: 'Fisica' | 'Testemunhal' | 'Documental';
  imagem?: string;
  coletadaEm: string; // local onde foi coletada
  diaColetada: number;
}

export interface EntradaDiario {
  id: string;
  texto: string;
  dia: number;
  hora: string;
  categoria: 'descoberta' | 'interrogatorio' | 'movimento' | 'analise';
}

export interface GameState {
  energiaAtual: number;
  diaAtual: number;
  localAtual: string;
  inventario: Evidencia[];
  logNarrativo: EntradaDiario[];
  tentativasDePrisao: number;
  pistasEncontradas: {
    copoQuebrado: boolean;
    partituraRasgada: boolean;
    gravacaoFita: boolean;
    cartaOculta: boolean;
    impressoesDigitais: boolean;
  };
  suspeitosDesbloqueados: {
    donoCabare: boolean;
    exAmante: boolean;
    cantoraRival: boolean;
    pianista: boolean;
  };
  areasDesbloqueadas: {
    cenaCrime: boolean;
    delegacia: boolean;
    cabare: boolean;
    casaVitima: boolean;
    arquivoPublico: boolean;
  };
  acoesRealizadas: string[];
  acusadoFinal: string | null;
  pontuacaoFinal: number;
  jogoIniciado: boolean;
}

interface GameContextType {
  gameState: GameState;
  iniciarJogo: () => void;
  executarAcao: (acaoId: string) => void;
  moverPara: (novoLocal: string) => boolean;
  encerrarDia: () => void;
  coletarPista: (pista: keyof GameState['pistasEncontradas']) => void;
  coletarEvidencia: (evidencia: Evidencia) => void;
  adicionarEntradaDiario: (entrada: Omit<EntradaDiario, 'id'>) => void;
  desbloquearSuspeito: (suspeito: keyof GameState['suspeitosDesbloqueados']) => void;
  desbloquearArea: (area: keyof GameState['areasDesbloqueadas']) => void;
  confirmarAcusacao: (suspeito: string, evidencias: string[]) => 'aceita' | 'negada' | 'limite_excedido';
  resetarJogo: () => void;
  getTotalPistas: () => number;
  podeAcessarDeducao: () => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialGameState: GameState = {
  energiaAtual: 5,
  diaAtual: 1,
  localAtual: 'cenaCrime',
  inventario: [],
  logNarrativo: [],
  tentativasDePrisao: 0,
  pistasEncontradas: {
    copoQuebrado: false,
    partituraRasgada: false,
    gravacaoFita: false,
    cartaOculta: false,
    impressoesDigitais: false,
  },
  suspeitosDesbloqueados: {
    donoCabare: false,
    exAmante: false,
    cantoraRival: false,
    pianista: false,
  },
  areasDesbloqueadas: {
    cenaCrime: true,
    delegacia: true,
    cabare: false,
    casaVitima: false,
    arquivoPublico: false,
  },
  acoesRealizadas: [],
  acusadoFinal: null,
  pontuacaoFinal: 0,
  jogoIniciado: false,
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('lapa-game-state');
    return saved ? JSON.parse(saved) : initialGameState;
  });

  useEffect(() => {
    localStorage.setItem('lapa-game-state', JSON.stringify(gameState));
  }, [gameState]);

  const iniciarJogo = () => {
    const estadoInicial = { 
      ...initialGameState, 
      jogoIniciado: true,
      logNarrativo: [{
        id: 'inicio',
        texto: 'A investigação do assassinato de Carmem Bittencourt teve início. O corpo foi encontrado no camarim do Cabaré Lua Azul.',
        dia: 1,
        hora: '08:00',
        categoria: 'descoberta' as const
      }]
    };
    setGameState(estadoInicial);
  };

  const executarAcao = (acaoId: string) => {
    if (gameState.energiaAtual <= 0) return;
    
    setGameState(prev => ({
      ...prev,
      energiaAtual: prev.energiaAtual - 1,
      acoesRealizadas: [...prev.acoesRealizadas, acaoId],
    }));
  };

  const moverPara = (novoLocal: string): boolean => {
    if (gameState.energiaAtual <= 0) return false;
    if (gameState.localAtual === novoLocal) return true;
    
    setGameState(prev => ({
      ...prev,
      energiaAtual: prev.energiaAtual - 1,
      localAtual: novoLocal,
    }));

    // Adiciona entrada no diário sobre movimento
    const nomeLocal = getLocalName(novoLocal);
    adicionarEntradaDiario({
      texto: `Deslocou-se para ${nomeLocal}.`,
      dia: gameState.diaAtual,
      hora: getCurrentTime(),
      categoria: 'movimento'
    });

    return true;
  };

  const getLocalName = (localId: string): string => {
    const nomes: Record<string, string> = {
      cenaCrime: 'Cena do Crime',
      delegacia: 'Delegacia',
      cabare: 'Cabaré Lua Azul',
      casaVitima: 'Casa de Carmem',
      arquivoPublico: 'Arquivo Público'
    };
    return nomes[localId] || localId;
  };

  const getCurrentTime = (): string => {
    const horas = 8 + (5 - gameState.energiaAtual) * 2;
    return `${horas.toString().padStart(2, '0')}:00`;
  };

  const encerrarDia = () => {
    setGameState(prev => ({
      ...prev,
      diaAtual: prev.diaAtual + 1,
      energiaAtual: 5,
    }));

    adicionarEntradaDiario({
      texto: `Fim do Dia ${gameState.diaAtual}. O detetive descansou e recuperou suas energias.`,
      dia: gameState.diaAtual,
      hora: '22:00',
      categoria: 'movimento'
    });
  };

  const coletarPista = (pista: keyof GameState['pistasEncontradas']) => {
    setGameState(prev => ({
      ...prev,
      pistasEncontradas: {
        ...prev.pistasEncontradas,
        [pista]: true,
      },
    }));
  };

  const coletarEvidencia = (evidencia: Evidencia) => {
    setGameState(prev => ({
      ...prev,
      inventario: [...prev.inventario, evidencia],
    }));

    adicionarEntradaDiario({
      texto: `Coletou evidência: ${evidencia.nome} - ${evidencia.descricao}`,
      dia: gameState.diaAtual,
      hora: getCurrentTime(),
      categoria: 'descoberta'
    });
  };

  const adicionarEntradaDiario = (entrada: Omit<EntradaDiario, 'id'>) => {
    const novaEntrada: EntradaDiario = {
      ...entrada,
      id: `entrada_${Date.now()}_${Math.random()}`
    };

    setGameState(prev => ({
      ...prev,
      logNarrativo: [...prev.logNarrativo, novaEntrada],
    }));
  };

  const desbloquearSuspeito = (suspeito: keyof GameState['suspeitosDesbloqueados']) => {
    setGameState(prev => ({
      ...prev,
      suspeitosDesbloqueados: {
        ...prev.suspeitosDesbloqueados,
        [suspeito]: true,
      },
    }));
  };

  const desbloquearArea = (area: keyof GameState['areasDesbloqueadas']) => {
    setGameState(prev => ({
      ...prev,
      areasDesbloqueadas: {
        ...prev.areasDesbloqueadas,
        [area]: true,
      },
    }));
  };

  const confirmarAcusacao = (suspeito: string, evidencias: string[]): 'aceita' | 'negada' | 'limite_excedido' => {
    const novasTentativas = gameState.tentativasDePrisao + 1;
    
    if (novasTentativas > 3) {
      return 'limite_excedido';
    }

    setGameState(prev => ({
      ...prev,
      tentativasDePrisao: novasTentativas,
    }));

    // Lógica de avaliação baseada no culpado real e evidências
    const culpadoReal = 'exAmante'; // Ricardo Silva
    const evidenciasNecessarias = ['copoQuebrado', 'partituraRasgada', 'cartaOculta'];
    
    const temEvidenciasSuficientes = evidenciasNecessarias.some(ev => evidencias.includes(ev)) && evidencias.length >= 2;
    
    if (suspeito === culpadoReal && temEvidenciasSuficientes) {
      setGameState(prev => ({
        ...prev,
        acusadoFinal: suspeito,
        pontuacaoFinal: calcularPontuacao(getTotalPistas(), gameState.diaAtual, true),
      }));
      return 'aceita';
    } else {
      return 'negada';
    }
  };

  const resetarJogo = () => {
    setGameState(initialGameState);
    localStorage.removeItem('lapa-game-state');
  };

  const getTotalPistas = () => {
    return Object.values(gameState.pistasEncontradas).filter(Boolean).length;
  };

  const podeAcessarDeducao = () => {
    return getTotalPistas() >= 3;
  };

  const calcularPontuacao = (pistas: number, dias: number, acertou: boolean) => {
    let pontuacao = 0;
    pontuacao += pistas * 20; // 20 pontos por pista
    pontuacao += Math.max(0, (6 - dias) * 10); // Bônus por eficiência
    if (acertou) pontuacao += 100; // Bônus por acertar o culpado
    return pontuacao;
  };

  return (
    <GameContext.Provider value={{
      gameState,
      iniciarJogo,
      executarAcao,
      moverPara,
      encerrarDia,
      coletarPista,
      coletarEvidencia,
      adicionarEntradaDiario,
      desbloquearSuspeito,
      desbloquearArea,
      confirmarAcusacao,
      resetarJogo,
      getTotalPistas,
      podeAcessarDeducao,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
