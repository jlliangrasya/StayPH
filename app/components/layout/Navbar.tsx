"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Find a Room", href: "#listings" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Landlords", href: "#landlords" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-warm-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/brand/logo.svg"
              alt="StayPH"
              width={130}
              height={32}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-charcoal hover:text-coral font-medium text-sm transition-colors duration-200"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-navy font-semibold text-sm px-4 py-2 rounded-lg hover:bg-navy/8 transition-colors duration-200"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Log In
            </Link>
            <Link
              href="/list"
              className="bg-coral text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-coral-dark transition-all duration-200 shadow-sm hover:shadow-md"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              List Your Property
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-charcoal hover:bg-coral/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-warm-white/97 backdrop-blur-md border-t border-warm-white-dark px-4 py-4 flex flex-col gap-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-charcoal hover:text-coral font-medium text-base py-2.5 px-3 rounded-lg hover:bg-coral/8 transition-colors"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-warm-white-dark mt-2 pt-3 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-navy font-semibold text-base py-2.5 px-3 rounded-lg text-center border border-navy/20 hover:bg-navy/5 transition-colors"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Log In
            </Link>
            <Link
              href="/list"
              onClick={() => setIsOpen(false)}
              className="bg-coral text-white font-semibold text-base py-3 px-3 rounded-xl text-center hover:bg-coral-dark transition-colors shadow-sm"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              List Your Property
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
