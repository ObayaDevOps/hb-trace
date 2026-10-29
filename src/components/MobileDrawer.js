"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileDrawer({ navItems, getInTouchText = "Get in Touch" }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);
  return (
    <>
      <button type="button" aria-label="Open navigation" aria-expanded={isOpen} onClick={() => setIsOpen(true)} style={{ background: "transparent", border: 0, color: "#00C6CB", cursor: "pointer", display: "inline-flex", padding: 0 }}><Menu size="2rem" /></button>
      {isOpen && (
        <div role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)} style={{ background: "rgba(0,8,25,.8)", inset: 0, position: "fixed", zIndex: 1000 }}>
          <aside aria-label="Mobile navigation" style={{ background: "#1A2130", color: "#00DEE3", height: "100%", maxWidth: "420px", padding: "6rem 2rem 2rem", position: "relative", width: "100%" }}>
            <button type="button" aria-label="Close navigation" onClick={() => setIsOpen(false)} style={{ background: "transparent", border: 0, color: "#00E2E5", cursor: "pointer", position: "absolute", right: "1.5rem", top: "1.5rem" }}><X size="2.5rem" /></button>
            <nav style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} style={{ color: "#00E2E5", fontFamily: "Poppins, sans-serif", fontSize: "1.75rem", fontWeight: 500, letterSpacing: ".14rem", textTransform: "uppercase" }}>{item.label}</a>)}
              <a href="/contact" onClick={() => setIsOpen(false)} style={{ background: "#000819", border: "2px solid #00DEE3", color: "#00E2E5", fontFamily: "Poppins, sans-serif", fontSize: "1.75rem", fontWeight: 500, letterSpacing: ".14rem", padding: "1.25rem .625rem", textAlign: "center", textTransform: "uppercase" }}>{getInTouchText}</a>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
