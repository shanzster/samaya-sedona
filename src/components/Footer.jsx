import { logo, illo } from '../brand.js'
import { CONTACT_EMAIL, INSTAGRAM_URL } from '../config.js'

export default function Footer() {
  return (
    <footer className="site-footer dark-surface">
      <div className="container">
        <div className="footer-grid">
          <div className="stack">
            <img
              className="footer-wordmark"
              src={logo('secondary', 'sand')}
              alt="Samaya Sedona"
            />
            <p className="accent-line">see you in the high desert</p>
          </div>
          <nav aria-label="Footer">
            <ul>
              <li>
                <a href="#/">Home</a>
              </li>
              <li>
                <a href="#/gallery">Gallery</a>
              </li>
              <li>
                <a href="#/founders">Founders&rsquo; List</a>
              </li>
              <li>
                <a href="#/privacy">Privacy</a>
              </li>
              <li>
                <a href="#/terms">Terms &amp; Refunds</a>
              </li>
            </ul>
          </nav>
          <div className="stack">
            <img
              className="illo"
              src={illo('rocks', 'sand')}
              alt=""
              aria-hidden="true"
            />
            <p className="small">Sedona, Arizona</p>
            <p className="small">
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
            <p className="small">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                Instagram &mdash; @samayasedona
              </a>
            </p>
          </div>
        </div>
        <div className="footer-meta small">
          <span>&copy; 2026 Samaya Sedona</span>
          <span>Every booking begins with a real conversation.</span>
        </div>
        <p className="small footer-disclaimer">
          All images are renderings and subject to change.
        </p>
      </div>
    </footer>
  )
}
