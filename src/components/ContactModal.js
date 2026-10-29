"use client";

import { useEffect, useState } from "react";
import Form from "@/components/Form";

const buttonStyle = { background: "transparent", border: "1px solid #00E2E5", color: "#00DEE3", cursor: "pointer", fontFamily: "Poppins, sans-serif", fontWeight: 500, padding: "0.65rem 1rem" };

const ContactModal = ({ buttonText = "Get in Touch" }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} style={buttonStyle}>{buttonText}</button>
      {isOpen && (
        <div role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)} style={{ alignItems: "center", background: "rgba(0, 8, 25, .8)", display: "flex", inset: 0, justifyContent: "center", padding: "1rem", position: "fixed", zIndex: 1000 }}>
          <section role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" style={{ background: "#000819", border: "2px solid #00E2E5", borderRadius: "12px", color: "white", maxHeight: "calc(100vh - 2rem)", maxWidth: "580px", overflowY: "auto", padding: "1.5rem", position: "relative", width: "100%" }}>
            <h2 id="contact-modal-title" style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.25rem", fontWeight: 500, margin: 0 }}>Contact Us</h2>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "0.875rem", lineHeight: "1.875rem" }}>Want to reach out? Enter your details below and provide a message to Ashton &amp; Carrington and we&apos;ll respond as soon as we can.</p>
            <Form buttonPosition="static" />
            <button type="button" onClick={() => setIsOpen(false)} style={{ ...buttonStyle, float: "right", marginTop: "0.5rem" }}>Close</button>
          </section>
        </div>
      )}
    </>
  );
};

export default ContactModal;
