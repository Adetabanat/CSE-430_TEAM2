'use client';

import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const navlinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/ui/product" },
  { name: "About", path: "/ui/about" },
  { name: "Categories", path: "/ui/categories" },
  { name: "Contact", path: "/ui/contact" },
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
          href="/ui/search"
          className="icon"
          aria-label="Search"
          title="Search"
        >
          <FaSearch />
        </Link>
        <Link
          href="/ui/favorites"
          className="icon"
          aria-label="Favorites"
          title="Favorites"
        >
          <FaHeart />
        </Link>
        <Link
          href="/ui/cart"
          className="icon cart-icon"
          aria-label="Shopping Cart"
          title="Shopping Cart"
        >
          <FaShoppingCart />
          <span className="cart-count">0</span>
        </Link>
        <Link
          href="/ui/login"
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
