
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "@/contexts/GameContext";
import Index from "./pages/Index";
import Casos from "./pages/Casos";
import Caso from "./pages/Caso";
import NotFound from "./pages/NotFound";
import JogoIntro from "./pages/game/JogoIntro";
import PainelInvestigador from "./pages/game/PainelInvestigador";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GameProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/casos" element={<Casos />} />
            <Route path="/caso/:slug" element={<Caso />} />
            <Route path="/jogo/a-ultima-cancao-da-lapa" element={<JogoIntro />} />
            <Route path="/jogo/painel" element={<PainelInvestigador />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GameProvider>
  </QueryClientProvider>
);

export default App;
