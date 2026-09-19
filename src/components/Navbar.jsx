import { useState } from 'react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Reservation', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="navbar">
      <a className="brand" href="#home" aria-label="EMBER home" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true">E</span>
        <span className="brand-name">EMBER</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav
        className={`nav-content${menuOpen ? ' is-open' : ''}`}
        id="primary-navigation"
        aria-label="Primary navigation"
      >
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={closeMenu}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a className="button button-small" href="#reservation" onClick={closeMenu}>
          Reserve a Table
          <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  )
}

export default Navbar
