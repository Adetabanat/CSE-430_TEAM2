'use client';

import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const navlinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/product" },
  { name: "About", path: "/about" },
  { name: "Categories", path: "/categories" },
  { name: "Contact", path: "/contact" },
];

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

      <nav className={`nav ${isMobileMenuOpen ? "nav-open" : ""}`}>
        <ul>
          {navlinks.map((link) => (
            <li key={link.name}>
              <Link href={link.path} onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-icons">
        <Link
          href="/search"
          className="icon"
          aria-label="Search"
          title="Search"
        >
          <FaSearch />
        </Link>
        <Link
          href="/favorites"
          className="icon"
          aria-label="Favorites"
          title="Favorites"
        >
          <FaHeart />
        </Link>
        <Link
          href="/cart"
          className="icon cart-icon"
          aria-label="Shopping Cart"
          title="Shopping Cart"
        >
          <FaShoppingCart />
          <span className="cart-count">0</span>
        </Link>
        <Link
          href="/login"
          className="icon"
          aria-label="User Account"
          title="Account"
        >
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
