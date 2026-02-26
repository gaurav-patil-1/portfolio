import React, { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { IconButton } from "./IconButton";
import { IconX } from "@/components/icons/IconX";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.58);
  backdrop-filter: blur(6px);
  display: grid;
  place-items: center;
  padding: 18px;
  z-index: 1000;
`;

const Panel = styled.div`
  width: min(980px, 100%);
  max-height: min(86vh, 920px);
  overflow: auto;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg0};
  box-shadow: ${({ theme }) => theme.shadow.md};
  position: relative;
`;

const TopBar = styled.div`
  position: sticky;
  top: 0;
  padding: 14px;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.bg0} 0%,
    rgba(0, 0, 0, 0) 120%
  );
  display: flex;
  justify-content: flex-end;
  z-index: 2;
`;

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ open, title, onClose, children }: Props) {
  const root = useMemo(() => document.getElementById("modal-root"), []);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    // Move focus inside modal for keyboard users
    const t = window.setTimeout(() => {
      panelRef.current?.focus();
    }, 0);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !root) return null;

  return createPortal(
    <Overlay role="presentation" onMouseDown={onClose}>
      <Panel
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={panelRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <TopBar>
          <IconButton onClick={onClose} aria-label="Close modal">
            <IconX />
          </IconButton>
        </TopBar>
        {children}
      </Panel>
    </Overlay>,
    root
  );
}