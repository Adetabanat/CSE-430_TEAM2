import React from "react";
import Link from "next/link";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";

const navlinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/dashboard/product" },
  { name: "About", path: "/dashboard/aboutUs" },
  { name: "Catrgories", path: "/dashboard/categories" },
  { name: "Contact", path: "/dashboard/contact" },
];

export default function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">Handcrafted Haven</div>

      {/* Navigation */}
      <nav className="nav">
        <ul>
          {navlinks.map((link) => (
            <li key={link.path}>
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Icons Section */}
      <div className="header-icons">
        <Link href="../dashboard/search" className="icon">
          <FaSearch />
        </Link>
        <Link href="../dashboard/favorites" className="icon">
          <FaHeart />
        </Link>
        <Link href="../dashboard/cart" className="icon">
          <FaShoppingCart />
        </Link>
        <Link href="../dashboard/login" className="icon">
          <FaUser />
        </Link>
      </div>
    </header>
  );
}
