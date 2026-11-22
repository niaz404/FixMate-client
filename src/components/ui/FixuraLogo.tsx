import React from 'react';

interface FixuraLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  lightMode?: boolean;
}

export function FixuraLogo({
  className = '',
  size = 'md',
  showTagline = false,
  lightMode = false,
}: FixuraLogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl md:text-4xl',
  };

  return (
    <div className={`flex items-center space-x-2.5 select-none ${className}`}>
      {/* Bespoke Geometric Precision Logo Mark */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center shrink-0 rounded-xl bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#0ea5e9] p-[1.5px] shadow-[0_4px_14px_rgba(30,58,138,0.25)] transition-transform duration-300 hover:scale-105`}
      >
        <div className="w-full h-full rounded-[10px] bg-[#1e3a8a] flex items-center justify-center p-1.5 overflow-hidden relative">
          {/* Subtle specular sheen */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 pointer-events-none" />

          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-white"
          >
            {/* Hexagonal Shield Outline */}
            <path
              d="M16 2.5L28 8.8V23.2L16 29.5L4 23.2V8.8L16 2.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/40"
            />
            {/* Restoration Precision Pulse / Wrench Spark Core */}
            <path
              d="M16 8L13 15H19L16 24"
              stroke="#67e8f9"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="8" r="1.5" fill="#ffffff" />
            <circle cx="16" cy="24" r="1.5" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif tracking-tight leading-none ${textSizes[size]} ${
            lightMode ? 'text-white' : 'text-[#000000]'
          }`}
        >
          Fix<span className="text-[#1e3a8a] italic font-semibold">ura</span>
        </span>
        {showTagline && (
          <span
            className={`text-[9px] uppercase tracking-widest font-sans font-semibold mt-0.5 ${
              lightMode ? 'text-white/70' : 'text-[#383838]'
            }`}
          >
            Precision Restoration
          </span>
        )}
      </div>
    </div>
  );
}

export function FixuraShieldIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16 2.5L28 8.8V23.2L16 29.5L4 23.2V8.8L16 2.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 8L13 15H19L16 24"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="8" r="1.5" fill="currentColor" />
      <circle cx="16" cy="24" r="1.5" fill="currentColor" />
    </svg>
  );
}
