import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onClose,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
      <div className="bg-[#1b2932] border border-[#32414a] max-w-md w-full p-6 text-[#fefdfe] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#dbdbda] hover:text-[#fefdfe]"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start space-x-3 mb-4">
          <div
            className={`p-2 ${
              isDestructive ? 'bg-rose-950/60 text-rose-400' : 'bg-amber-950/60 text-amber-400'
            }`}
          >
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-[#fefdfe]">{title}</h3>
            <p className="text-sm text-[#eaeae9]/80 mt-1 font-mono leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider border border-[#32414a] text-[#dbdbda] hover:bg-[#213039]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold ${
              isDestructive
                ? 'bg-rose-600 text-white hover:bg-rose-500'
                : 'bg-[#f1f3f4] text-[#040404] hover:bg-white'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
