import { createRoot } from "react-dom/client";
import { SparklesCore } from "./components/ui/sparkles";
import AnimatedGradient from "./components/ui/animated-gradient";
import GradientTitle from "./components/ui/gradient-title";
import { GlassFilter, LiquidButton } from "./components/ui/liquid-glass-button";
import "./hero.css";

function Hero() {
  return (
    <AnimatedGradient variant="mist" speed={0.6} opacity={0.82}>
      <div className="hero-dust-layer" aria-hidden="true">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.5}
          maxSize={1.5}
          particleDensity={360}
          particleColor="#f7d8ff"
          speed={0.7}
          className="sparkles-canvas"
        />
      </div>
      <div className="hero-gradient-copy">
        <GradientTitle eyebrow={null} />
        <nav className="hero-liquid-nav" aria-label="Main navigation">
          <GlassFilter />
          <LiquidButton href="#projects" onClick={() => window.dispatchEvent(new Event("portfolio:show-interests"))}>About Me</LiquidButton>
          <LiquidButton href="#blog">Blog</LiquidButton>
          <LiquidButton href="#contacts">Contacts</LiquidButton>
        </nav>
      </div>
    </AnimatedGradient>
  );
}

const container = document.getElementById("hero-react");
if (container) createRoot(container).render(<Hero />);
