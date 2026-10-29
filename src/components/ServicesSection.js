import { ArrowRight } from "lucide-react";

const ServiceCard = ({ title, description, linkText, linkUrl }) => (
  <article style={{ background: "linear-gradient(160deg, #15243d, #000819)", borderRadius: ".75rem", boxShadow: "0 0 20px 3px rgba(0,4,14,1)", color: "white", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "300px", overflow: "hidden", padding: "2rem", position: "relative" }}>
    <span aria-hidden="true" style={{ background: "radial-gradient(circle at top right, rgba(0,226,229,.35), transparent 45%)", inset: 0, position: "absolute" }} />
    <div style={{ position: "relative" }}>
      <span aria-hidden="true" style={{ alignItems: "center", background: "linear-gradient(135deg, #00E2E5, #5700C4)", borderRadius: ".5rem", display: "flex", fontSize: "2rem", height: "4.5rem", justifyContent: "center", marginBottom: "1.5rem", width: "4.5rem" }}>✦</span>
      <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.25rem", fontWeight: 500, letterSpacing: ".025rem", margin: "0 0 .75rem" }}>{title}</h3>
      <p style={{ fontFamily: "Poppins, sans-serif", lineHeight: "1.875rem", margin: 0 }}>{description}</p>
    </div>
    {linkUrl && <a href={linkUrl} style={{ alignItems: "center", color: "#00E2E5", display: "inline-flex", fontFamily: "Poppins, sans-serif", fontWeight: 500, gap: ".5rem", marginTop: "1.5rem", position: "relative", width: "fit-content" }}>{linkText || "Find out more"}<ArrowRight size={18} /></a>}
  </article>
);

const ServicesSection = ({ sectionData }) => {
  const { title, services } = sectionData || {};
  return (
    <section style={{ margin: "0 auto", maxWidth: "1280px", padding: "4rem clamp(1rem, 4vw, 2rem)" }}>
      <h2 style={{ color: "white", fontFamily: "Poppins, sans-serif", fontSize: "1.75rem", fontWeight: 500, letterSpacing: ".14rem", margin: "0 0 1.5rem" }}>{title || "OUR SERVICES"}</h2>
      {services?.length > 0 && <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>{services.map((service, index) => <ServiceCard key={service._key || index} title={service.title} description={service.description} linkText={service.linkText} linkUrl={service.linkUrl} />)}</div>}
    </section>
  );
};

export default ServicesSection;
