function About() {
  return (
    <section className="about-section section-wrap" id="about">
      <div className="section-kicker">The EMBER philosophy</div>
      <div className="about-grid">
        <div className="about-heading">
          <p className="section-number">01 / 03</p>
          <h2>Where fire meets <em>finesse.</em></h2>
        </div>

        <div className="about-copy">
          <p className="about-lead">
            EMBER is a modern European dining room in the heart of Bangkok,
            where quiet luxury meets the theatre of the flame.
          </p>
          <p>
            Led by a deep respect for seasonality and craft, our kitchen brings
            together thoughtful ingredients, precise technique, and the warmth of
            the open fire. Every plate is designed to be savoured slowly.
          </p>
          <a className="underlined-link" href="#contact">
            Discover our story <span aria-hidden="true">↗</span>
          </a>
        </div>

        <figure className="about-image-wrap">
          <img
            className="about-image"
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85"
            alt="Chef plating a dish in the EMBER kitchen"
          />
          <figcaption>Crafted in the open kitchen</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default About
