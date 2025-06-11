
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface SairJogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SairJogoModal: React.FC<SairJogoModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-noir-dark border border-noir-gold/20">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-noir-red" />
            <DialogTitle className="font-garamond text-xl text-noir-light">
              Sair da Investigação
            </DialogTitle>
          </div>
          <DialogDescription className="font-inter text-gray-300">
            Tem certeza de que deseja abandonar a investigação do caso "A Última Canção da Lapa"?
            Todo o progresso será perdido e você retornará à página inicial.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-noir-red/10 border border-noir-red/20 rounded-lg p-4 my-4">
          <p className="font-inter text-sm text-gray-300">
            <strong className="text-noir-red">Atenção:</strong> Suas descobertas, evidências coletadas 
            e progresso na investigação serão perdidos permanentemente.
          </p>
        </div>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Continuar Investigação
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-noir-red hover:bg-noir-red/90 text-white"
          >
            Sair do Jogo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SairJogoModal;
