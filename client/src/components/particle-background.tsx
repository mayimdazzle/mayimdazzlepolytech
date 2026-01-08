import { useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0 opacity-50 pointer-events-none"
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: { events: { onHover: { enable: false } } },
        particles: {
          color: { value: "#94a3b8" }, // Slate-400
          links: {
            color: "#cbd5e1", // Slate-300
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: false,
            straight: false,
            outModes: { default: "bounce" },
          },
          number: {
            density: { enable: true, area: 800 },
            value: 40,
          },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 2, max: 4 } },
        },
        detectRetina: true,
      }}
    />
  );
}