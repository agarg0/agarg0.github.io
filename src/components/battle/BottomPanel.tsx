import type { ReactNode } from "react";

export function BottomPanel({ children }: { children: ReactNode }) {
  return (
    <div className="pixel-box absolute inset-x-0 bottom-0 h-[28%] p-[1.2cqw] @max-lg:h-[40%] @max-lg:p-[2cqw]">
      {children}
    </div>
  );
}
