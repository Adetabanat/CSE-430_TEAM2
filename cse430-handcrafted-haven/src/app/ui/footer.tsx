import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Description */}
        <div className="footer-section">
          <div className="footer-logo">Handcrafted Haven</div>
          <p>Discover unique, handmade treasures crafted with love and attention to detail.</p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>

        {/* Quick links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Artisans</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns And Exchanges</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><a href="#">Ceramics and Pottery</a></li>
            <li><a href="#">Wood Crafts</a></li>
            <li><a href="#">Jewelry</a></li>
            <li><a href="#">Textiles</a></li>
            <li><a href="#">Home Decor</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>📍 123 example, City, 12345</li>
            <li>📞 (111) 123-4567</li>
            <li>✉️ Example@handcraftedhaven.com</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe for updates and special offers</p>
          <div style={{display: 'flex', gap: '0.5rem', marginTop: '1rem'}}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                flex: 1
              }}
            />
            <button 
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--color-highlight)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Suscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 Handcrafted Haven. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  )
}
