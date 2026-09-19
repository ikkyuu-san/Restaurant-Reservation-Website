function Hero() {
  return (
    <div className="hero-content">
      <div className="hero-copy">
        <p className="eyebrow"><span />Modern European Dining · Bangkok</p>
        <h1>An Evening Worth <em>Remembering.</em></h1>
        <p className="hero-description">
          A thoughtful expression of modern European cuisine, shaped by the seasons
          and served in the heart of Bangkok.
        </p>
        <div className="hero-actions">
          <a className="button" href="#reservation">
            Reserve a Table
            <span aria-hidden="true">↗</span>
          </a>
          <a className="text-link" href="#menu">
            Explore Menu
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <div className="hero-footer" aria-label="Restaurant details">
        <span>01 — 03</span>
        <span className="hero-footer-line" />
        <span>Chao Phraya · Bangkok</span>
      </div>
    </div>
  )
}

export default Hero
