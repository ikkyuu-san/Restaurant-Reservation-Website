import { useState } from 'react'
import { menuCategories, menuItems } from '../data/menuData'

function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0])
  const visibleItems = menuItems.filter((item) => item.category === activeCategory)

  return (
    <section className="menu-section" id="full-menu">
      <div className="menu-section-inner">
        <div className="menu-heading">
          <div>
            <div className="section-kicker">A considered selection</div>
            <h2>The <em>Menu.</em></h2>
          </div>
          <p className="menu-intro">
            Seasonal ingredients, open-fire cooking, and a little room to linger.
          </p>
        </div>

        <div className="menu-controls" role="tablist" aria-label="Menu categories">
          {menuCategories.map((category) => (
            <button
              className={`menu-tab${activeCategory === category ? ' is-active' : ''}`}
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls={`menu-panel-${category.toLowerCase()}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          className="menu-list"
          id={`menu-panel-${activeCategory.toLowerCase()}`}
          role="tabpanel"
          aria-live="polite"
        >
          {visibleItems.map((item) => (
            <article className="menu-item" key={item.name}>
              <div className="menu-item-copy">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <span className="menu-item-price">{item.price}</span>
            </article>
          ))}
        </div>

        <p className="menu-note">Please inform our team of any dietary requirements.</p>
      </div>
    </section>
  )
}

export default Menu
