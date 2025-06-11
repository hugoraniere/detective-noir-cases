
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface GameState {
  energiaAtual: number;
  diaAtual: number;
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
  encerrarDia: () => void;
  coletarPista: (pista: keyof GameState['pistasEncontradas']) => void;
  desbloquearSuspeito: (suspeito: keyof GameState['suspeitosDesbloqueados']) => void;
  desbloquearArea: (area: keyof GameState['areasDesbloqueadas']) => void;
  confirmarAcusacao: (suspeito: string) => void;
  resetarJogo: () => void;
  getTotalPistas: () => number;
  podeAcessarDeducao: () => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialGameState: GameState = {
  energiaAtual: 5,
  diaAtual: 1,
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
    setGameState({ ...initialGameState, jogoIniciado: true });
  };

  const executarAcao = (acaoId: string) => {
    if (gameState.energiaAtual <= 0) return;
    
    setGameState(prev => ({
      ...prev,
      energiaAtual: prev.energiaAtual - 1,
      acoesRealizadas: [...prev.acoesRealizadas, acaoId],
    }));
  };

  const encerrarDia = () => {
    setGameState(prev => ({
      ...prev,
      diaAtual: prev.diaAtual + 1,
      energiaAtual: 5,
    }));
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

  const confirmarAcusacao = (suspeito: string) => {
    const totalPistas = getTotalPistas();
    const pontuacao = calcularPontuacao(totalPistas, gameState.diaAtual, suspeito === 'exAmante');
    
    setGameState(prev => ({
      ...prev,
      acusadoFinal: suspeito,
      pontuacaoFinal: pontuacao,
    }));
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
      encerrarDia,
      coletarPista,
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
