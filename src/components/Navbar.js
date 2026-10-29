"use client";

import { useEffect, useState } from "react";
import MobileDrawer from "./MobileDrawer";

const navItems = [
  { label: "Home", href: "/" },
  { label: "All About Honey", href: "/info" },
  { label: "Shop", href: "/shop" },
];

export default function Navbar({ bg }) {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 992px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const background = typeof bg === "string" ? bg : "transparent";
  return (
    <header style={{ background, padding: "1rem clamp(2rem, 7vw, 5.5rem)", position: "sticky", top: 0, zIndex: 20 }}>
      <div style={{ alignItems: "center", display: "flex", height: "4rem", justifyContent: "space-between", margin: "0 auto", maxWidth: "1280px" }}>
        {isDesktop ? (
          <>
            <a href="/" aria-label="Humble Beeing home"><img src="/Humble_beeing_black_no_text.png" alt="Humble Beeing Logo" height="70" style={{ display: "block", height: "70px", objectFit: "contain", width: "auto" }} /></a>
            <nav aria-label="Primary navigation" style={{ display: "flex", gap: "1.5rem" }}>
              {navItems.map((item) => <a key={item.label} href={item.href} style={{ color: "black", fontFamily: "Poppins, sans-serif", fontWeight: 500, padding: ".25rem .75rem" }}>{item.label}</a>)}
            </nav>
          </>
        ) : (
          <>
            <MobileDrawer navItems={navItems} getInTouchText="Get in Touch" />
            <a href="/" aria-label="Humble Beeing home" style={{ marginLeft: "1rem" }}><img src="/Humble_beeing_black_no_text.png" alt="Humble Beeing Logo" height="40" style={{ display: "block", height: "40px", objectFit: "contain", width: "auto" }} /></a>
            <span aria-hidden="true" />
          </>
        )}
      </div>
    </header>
  );
}
