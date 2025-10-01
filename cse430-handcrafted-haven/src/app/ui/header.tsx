

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">Handcrafted Haven</Link>
      </div>
      
      <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
        <ul>
          <li><Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link href="/ui/product" onClick={() => setIsMobileMenuOpen(false)}>Products</Link></li>
          <li><Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
          <li><Link href="/ui/categories" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link></li>
          <li><Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
        </ul>
      </nav>

      <div className="header-icons">
        <Link href="/ui/search" className="icon" aria-label="Search" title="Search">
          <FaSearch />
        </Link>
        <Link href="/ui/favorites" className="icon" aria-label="Favorites" title="Favorites">
          <FaHeart />
        </Link>
        <Link href="/ui/cart" className="icon cart-icon" aria-label="Shopping Cart" title="Shopping Cart">
          <FaShoppingCart />
          <span className="cart-count">0</span>
        </Link>
        <Link href="/ui/login" className="icon" aria-label="User Account" title="Account">
          <FaUser />
        </Link>
        
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
