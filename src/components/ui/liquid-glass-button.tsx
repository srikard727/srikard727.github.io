import type { AnchorHTMLAttributes, ReactNode } from "react";
import "./liquid-glass-button.css";

type LiquidButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function LiquidButton({ href, children, className = "", ...props }: LiquidButtonProps) {
  return (
    <a href={href} className={`liquid-glass-button ${className}`.trim()} {...props}>
      <span className="liquid-glass-shine" aria-hidden="true" />
      <span className="liquid-glass-backdrop" aria-hidden="true" />
      <span className="liquid-glass-label">{children}</span>
    </a>
  );
}

export function GlassFilter() {
  return (
    <svg className="liquid-glass-filter" aria-hidden="true" focusable="false">
      <defs>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
