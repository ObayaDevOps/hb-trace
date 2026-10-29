const sectionHeading = { fontFamily: "Poppins, sans-serif", fontSize: "1.75rem", fontWeight: 500, letterSpacing: ".14rem", lineHeight: "normal", margin: "0 0 1.5rem" };

const FeatureCard = ({ title, children }) => (
  <article style={{ display: "flex", gap: "1rem", padding: "1.5rem" }}>
    <span aria-hidden="true" style={{ alignItems: "center", background: "linear-gradient(135deg, #00DEE3, #5700C4)", borderRadius: "50%", display: "flex", flex: "0 0 3.75rem", height: "3.75rem", justifyContent: "center", width: "3.75rem" }}>✦</span>
    <div>
      <h3 style={{ ...sectionHeading, fontSize: "1.75rem", marginBottom: ".25rem" }}>{title}</h3>
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "1rem", lineHeight: "1.875rem", margin: 0 }}>{children}</p>
    </div>
  </article>
);

const WhoWeAreSection = ({ sectionData }) => {
  const { title, ifaAccredited, features } = sectionData || {};
  return (
    <section style={{ background: "#000819", color: "white", padding: "4rem .5rem" }}>
      <div style={{ margin: "0 auto", maxWidth: "1280px", padding: "0 1.5rem" }}>
        <h2 style={sectionHeading}>{title || "Who We Are"}</h2>
        <div style={{ alignItems: "stretch", display: "flex", flexWrap: "wrap", gap: "3rem" }}>
          {ifaAccredited && (
            <article style={{ background: "linear-gradient(135deg, #00DEE3, #5700C4)", borderRadius: ".75rem", boxShadow: "0 0 20px 3px rgba(0,4,14,1)", flex: "1 1 300px", overflow: "hidden", padding: "2rem", position: "relative" }}>
              <span aria-hidden="true" style={{ background: "radial-gradient(circle, rgba(255,255,255,.3), transparent 65%)", inset: 0, position: "absolute" }} />
              <div style={{ position: "relative" }}>
                <div aria-label="IFA accredited" style={{ alignItems: "center", border: "1px solid rgba(255,255,255,.7)", borderRadius: "50%", display: "flex", fontFamily: "Poppins, sans-serif", fontSize: ".8rem", fontWeight: 600, height: "5rem", justifyContent: "center", marginBottom: "1.25rem", textAlign: "center", width: "5rem" }}>IFA<br />ACCREDITED</div>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "1.25rem", fontWeight: 500, margin: "0 0 .5rem" }}>{ifaAccredited.title || "IFA Accredited"}</h3>
                <p style={{ fontFamily: "Poppins, sans-serif", lineHeight: "1.875rem", margin: "0 0 1.5rem" }}>{ifaAccredited.description1}</p>
                <p style={{ fontFamily: "Poppins, sans-serif", lineHeight: "1.875rem", margin: 0 }}>{ifaAccredited.description2}</p>
              </div>
            </article>
          )}
          {features?.length > 0 && <div style={{ display: "grid", flex: "2 1 500px", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>{features.map((feature, index) => <FeatureCard key={feature._key || index} title={feature.title}>{feature.description}</FeatureCard>)}</div>}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
