"use client";

import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface ModalProps {
  open: boolean;
  title: string;
  eyebrow?: string;
  onClose: () => void;
  returnFocusId: string | null;
  children: ReactNode;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({ open, title, eyebrow, onClose, returnFocusId, children }: ModalProps) {
  const reduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastReturnId = useRef<string | null>(null);

  useEffect(() => {
    if (open) {
      lastReturnId.current = returnFocusId;
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      headingRef.current?.focus({ preventScroll: true });
      return () => {
        document.body.style.overflow = previous;
      };
    }
    if (lastReturnId.current) {
      document.getElementById(lastReturnId.current)?.focus({ preventScroll: true });
      lastReturnId.current = null;
    }
  }, [open, returnFocusId]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === headingRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-canvas/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.001 : 0.16 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            className="font-body flex max-h-[92dvh] w-full max-w-2xl flex-col rounded-t-xl border border-border bg-panel shadow-2xl sm:max-h-[85dvh] sm:rounded-xl"
            initial={{ opacity: 0, scale: reduced ? 1 : 0.96, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.98 }}
            transition={{ duration: reduced ? 0.001 : 0.16, ease: "easeOut" }}
          >
            <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
              <div>
                {eyebrow && <div className="text-[11px] tracking-[0.18em] text-muted">{eyebrow}</div>}
                <h2 id="modal-title" ref={headingRef} tabIndex={-1} className="text-lg font-semibold outline-none">
                  {title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded border border-border px-2.5 py-1 text-sm text-muted transition-colors hover:border-border-strong hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                Esc
              </button>
            </header>
            <div className="overflow-y-auto px-6 py-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
