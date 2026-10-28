import { useEffect, useRef } from "react";
import "./tubes-cursor.css";

type TubesApp = {
  dispose?: () => void;
  tubes?: {
    setColors: (colors: string[]) => void;
    setLightsColors: (colors: string[]) => void;
  };
};

const randomColors = (count: number) =>
  new Array(count)
    .fill(0)
    .map(() => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`);

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<TubesApp | null>(null);

  useEffect(() => {
    let cancelled = false;
    const initTimer = window.setTimeout(async () => {
      try {
        const moduleUrl = "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
        const module = await import(/* @vite-ignore */ moduleUrl);
        if (cancelled || !canvasRef.current) return;

        const createTubes = (module.default ?? module) as (canvas: HTMLCanvasElement, options: unknown) => TubesApp;
        appRef.current = createTubes(canvasRef.current, {
          bloom: { threshold: 0.35, strength: 0.35, radius: 0.2 },
          tubes: {
            count: 8,
            colors: ["#5e72e4", "#8965e0", "#f5365c"],
            lights: {
              intensity: 200,
              colors: ["#21d4fd", "#b721ff", "#f4d03f", "#11cdef"],
            },
          },
        });
      } catch (error) {
        console.error("Failed to load Tubes Cursor:", error);
      }
    }, 100);

    const changeColors = () => {
      appRef.current?.tubes?.setColors(randomColors(3));
      appRef.current?.tubes?.setLightsColors(randomColors(4));
    };
    window.addEventListener("click", changeColors);

    return () => {
      cancelled = true;
      window.clearTimeout(initTimer);
      window.removeEventListener("click", changeColors);
      appRef.current?.dispose?.();
      appRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}

