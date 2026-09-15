"use client";

import { motion } from "motion/react";

const COUNT = 10;
const STAR = "polygon(50% 0%, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0% 50%, 39% 39%)";

interface ShinySparkleProps {
  className?: string;
}

export function ShinySparkle({ className = "" }: ShinySparkleProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      {Array.from({ length: COUNT }, (_, i) => {
        const angle = (i / COUNT) * Math.PI * 2;
        const distance = 55 + (i % 3) * 18;
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 h-[2.2cqw] w-[2.2cqw] min-h-2 min-w-2"
            style={{
              clipPath: STAR,
              background: i % 3 === 0 ? "var(--color-accent)" : "var(--color-fg)",
              marginLeft: "-1.1cqw",
              marginTop: "-1.1cqw",
            }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: [0, 1.2, 0],
              opacity: [1, 1, 0],
              rotate: 180,
            }}
            transition={{ duration: 0.55, delay: i * 0.025, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
}
