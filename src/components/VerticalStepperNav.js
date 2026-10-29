const VerticalStepperNav = ({ sections, activeSection, onLinkClick }) => (
  <nav aria-label="Page sections" style={{ position: "relative" }}>
    {sections.map((section, index) => {
      const isActive = activeSection === section.id;
      const isLastItem = index === sections.length - 1;
      return (
        <div key={section.id} style={{ alignItems: "flex-start", display: "flex", minHeight: "40px", position: "relative" }}>
          {!isLastItem && <span aria-hidden="true" style={{ background: "#4a5568", bottom: 0, left: "11px", position: "absolute", top: "20px", width: "2px" }} />}
          <span aria-hidden="true" style={{ alignItems: "center", borderRadius: "50%", boxShadow: isActive ? "0 0 15px 4px rgba(45,255,196,.9)" : "none", display: "flex", height: "24px", justifyContent: "center", marginRight: "1rem", minWidth: "24px", position: "relative" }}>
            {isActive && <span style={{ border: "2px solid #D2FAFB", borderRadius: "50%", height: "20px", position: "absolute", width: "20px" }} />}
            <span style={{ background: isActive ? "#2dd4bf" : "#718096", borderRadius: "50%", height: isActive ? "12px" : "10px", position: "relative", width: isActive ? "12px" : "10px" }} />
          </span>
          <a href="#" onClick={(event) => { event.preventDefault(); onLinkClick(section.id); }} style={{ color: isActive ? "#D2FAFB" : "#a0aec0", fontFamily: "Poppins, sans-serif", fontSize: "1rem", fontWeight: isActive ? 600 : 500, lineHeight: "1.875rem" }}>
            {section.title}
          </a>
        </div>
      );
    })}
  </nav>
);

export default VerticalStepperNav;
