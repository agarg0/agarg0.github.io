import type { ReactNode } from "react";

export function BottomPanel({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-x-0 bottom-0 max-h-[75%] min-h-[26%] overflow-y-auto border-t-4 border-border-strong bg-panel/90 p-[1.2cqw] backdrop-blur-[2px] @max-lg:min-h-[40%] @max-lg:p-[2cqw]">
      {children}
    </div>
  );
}
