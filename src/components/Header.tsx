import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300 ease-in-out">
        <div className="pl-4 py-4 md:pl-10 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-cormorant italic transition-all duration-300 ease-in-out text-black hover:text-gray-600"
          >
            Auberge de Mauroul
          </Link>

          {/* Hamburger button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden relative z-50 ml-auto"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 ml-auto">
            <Link
              to="/"
              className="hover:text-gray-600 transition-all duration-300 ease-in-out"
              activeProps={{
                className: "text-gray-600 font-semibold",
              }}
            >
              LE RESTAURANT
            </Link>
            <Link
              to="/menu"
              className="hover:text-gray-600 transition-all duration-300 ease-in-out"
              activeProps={{
                className: "text-gray-600 font-semibold",
              }}
            >
              MENU
            </Link>
            <Link
              to="/reserver"
              className="hover:text-gray-600 transition-all duration-300 ease-in-out"
              activeProps={{
                className: "text-gray-600 font-semibold",
              }}
            >
              RÉSERVER
            </Link>
          </nav>

          <div className="flex items-center space-x-2 md:ml-10 ml-4 pr-4">
            <a href="/" className="hover:text-gray-600 text-sm">
              FR
            </a>
            <span>|</span>
            <a href="/" className="hover:text-gray-600 text-sm">
              EN
            </a>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-10 right-0 h-screen bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden z-[9999] ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center h-full justify-center">
          <nav className="flex flex-col items-center space-y-4 text-lg uppercase tracking-widest">
            <Link
              to="/"
              className="hover:text-gray-600"
              onClick={closeMobileMenu}
            >
              Restaurant
            </Link>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <Link
              to="/menu"
              className="hover:text-gray-600"
              onClick={closeMobileMenu}
            >
              Menu
            </Link>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <Link
              to="/reserver"
              className="hover:text-gray-600"
              onClick={closeMobileMenu}
            >
              Réserver
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
