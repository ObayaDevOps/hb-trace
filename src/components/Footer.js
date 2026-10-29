import { FaLinkedin } from "react-icons/fa";
import { FiCode } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const iconStyle = { alignItems: "center", background: "#202020", borderRadius: ".375rem", color: "white", display: "inline-flex", height: "2rem", justifyContent: "center", width: "2rem" };
  const textStyle = { color: "black", fontFamily: "Poppins, sans-serif", fontSize: ".875rem", fontWeight: 500, lineHeight: "1.5rem", margin: 0 };
  return (
    <footer style={{ color: "black", padding: "5rem clamp(2rem, 7vw, 5.5rem) 1rem" }}>
      <div style={{ alignItems: "flex-start", display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between", margin: "0 auto", maxWidth: "1280px" }}>
        <div>
          <div style={{ display: "flex", gap: ".75rem" }}>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={iconStyle}><FaLinkedin /></a>
            <a href="https://www.dralegawebops.com/" target="_blank" rel="noreferrer" aria-label="Developer website" style={iconStyle}><FiCode /></a>
            <a href="https://www.dralegawebops.com/" target="_blank" rel="noreferrer" style={{ border: "1px solid #4a5568", color: "black", fontFamily: "Poppins, sans-serif", fontSize: ".875rem", padding: ".35rem .6rem" }}>Built by DWO</a>
          </div>
          <p style={{ ...textStyle, marginTop: ".5rem" }}>© {currentYear} HB Fine Honey Suppliers Limited. All rights reserved</p>
        </div>
        <address style={{ fontStyle: "normal", textAlign: "right" }}>
          <a href="mailto:hello@humble-beeing.com" style={{ ...textStyle, display: "block" }}>hello@humble-beeing.com</a>
          <p style={{ ...textStyle, marginTop: ".25rem" }}>2nd Floor, Tools and Machinery Building, Kabalagala, Kampala</p>
        </address>
      </div>
    </footer>
  );
};

export default Footer;
