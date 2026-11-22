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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="rounded-2xl border border-white bg-white max-w-md w-full p-6 text-[#000000] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#383838] hover:text-[#000000]"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start space-x-3 mb-4">
          <div
            className={`p-2.5 rounded-xl ${
              isDestructive ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#000000]">{title}</h3>
            <p className="text-xs text-[#383838] mt-1 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-[#bfc7d1]/30 flex justify-end space-x-2.5">
          <button
            type="button"
            onClick={onClose}
            className="glossy-btn-secondary px-4 py-2 rounded-lg text-xs font-semibold"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-xs transition-all ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-[#1e3a8a] hover:bg-blue-900'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
