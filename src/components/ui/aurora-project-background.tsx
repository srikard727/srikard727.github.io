import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function AuroraProjectBackground({ children }: { children: ReactNode }) {
  return (
    <div className="project-aurora">
      <div className="project-aurora-grid" aria-hidden="true" />
      <motion.div
        className="project-aurora-blob project-aurora-blob-pink"
        animate={{ x: [0, 80, -25, 0], y: [0, -35, 45, 0], scale: [1, 1.12, 0.94, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="project-aurora-blob project-aurora-blob-purple"
        animate={{ x: [0, -70, 30, 0], y: [0, 50, -30, 0], scale: [1, 0.9, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <div className="project-aurora-content">{children}</div>
    </div>
  );
}
