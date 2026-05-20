"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Bookmark, MessageSquare, LayoutDashboard, LogOut, ChevronDown, Calendar, UserCircle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import AuthModal from "@/components/auth/AuthModal";

const navLinks = [
  { label: "Find a Room", href: "/listings" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Landlords", href: "/list-your-property" },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: "signin" | "signup" }>({ open: false, mode: "signin" });
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user?.full_name
    ? user.full_name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-warm-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image src="/brand/logo.svg" alt="StayPH" width={130} height={32} priority />
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
              {user ? (
                <>
                  <Link
                    href="/saved"
                    className="p-2 text-charcoal-light hover:text-coral rounded-lg hover:bg-coral/8 transition-colors"
                    title="Saved listings"
                  >
                    <Bookmark size={20} />
                  </Link>
                  <Link
                    href="/messages"
                    className="p-2 text-charcoal-light hover:text-coral rounded-lg hover:bg-coral/8 transition-colors"
                    title="Messages"
                  >
                    <MessageSquare size={20} />
                  </Link>

                  {/* Profile dropdown */}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen(v => !v)}
                      className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-warm-white-dark transition-colors"
                    >
                      <span className="w-8 h-8 rounded-full bg-coral text-white text-xs font-bold flex items-center justify-center">
                        {initials}
                      </span>
                      <span className="text-sm font-medium text-charcoal max-w-24 truncate" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                        {user.full_name.split(" ")[0]}
                      </span>
                      <ChevronDown size={14} className={`text-charcoal-light transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                    </button>

                    {profileOpen && (
                      <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-warm-white-dark overflow-hidden z-50">
                        <div className="px-4 py-3 border-b border-warm-white-dark">
                          <p className="text-sm font-semibold text-charcoal truncate">{user.full_name}</p>
                          <p className="text-xs text-charcoal-light truncate">{user.email}</p>
                          <span className="inline-block mt-1 text-xs bg-coral/10 text-coral px-2 py-0.5 rounded-full font-medium capitalize">{user.role}</span>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/profile"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal hover:bg-warm-white-dark transition-colors"
                          >
                            <UserCircle size={15} className="text-charcoal-light" />
                            My Profile
                          </Link>
                          {user.role === 'admin' && (
                            <Link
                              href="/admin"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal hover:bg-warm-white-dark transition-colors"
                            >
                              <LayoutDashboard size={15} className="text-charcoal-light" />
                              Admin Panel
                            </Link>
                          )}
                          <Link
                            href="/saved"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal hover:bg-warm-white-dark transition-colors"
                          >
                            <Bookmark size={15} className="text-charcoal-light" />
                            Saved Listings
                          </Link>
                          <Link
                            href="/messages"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal hover:bg-warm-white-dark transition-colors"
                          >
                            <MessageSquare size={15} className="text-charcoal-light" />
                            Messages
                          </Link>
                          <Link
                            href="/appointments"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal hover:bg-warm-white-dark transition-colors"
                          >
                            <Calendar size={15} className="text-charcoal-light" />
                            Appointments
                          </Link>
                          {(user.role === 'landlord' || user.role === 'admin') && (
                            <Link
                              href="/dashboard"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal hover:bg-warm-white-dark transition-colors"
                            >
                              <LayoutDashboard size={15} className="text-charcoal-light" />
                              Landlord Dashboard
                            </Link>
                          )}
                        </div>
                        <div className="border-t border-warm-white-dark py-1">
                          <button
                            onClick={() => { signOut(); setProfileOpen(false); }}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-soft-red hover:bg-soft-red/5 transition-colors"
                          >
                            <LogOut size={15} />
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setAuthModal({ open: true, mode: "signin" })}
                    className="text-navy font-semibold text-sm px-4 py-2 rounded-lg hover:bg-navy/8 transition-colors duration-200"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setAuthModal({ open: true, mode: "signup" })}
                    className="bg-coral text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-coral-dark transition-all duration-200 shadow-sm hover:shadow-md"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    Sign Up
                  </button>
                </>
              )}
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
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <span className="w-9 h-9 rounded-full bg-coral text-white text-sm font-bold flex items-center justify-center">
                      {initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{user.full_name}</p>
                      <p className="text-xs text-charcoal-light capitalize">{user.role}</p>
                    </div>
                  </div>
                  <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-warm-white-dark text-charcoal text-sm">
                    <UserCircle size={16} /> My Profile
                  </Link>
                  <Link href="/saved" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-warm-white-dark text-charcoal text-sm">
                    <Bookmark size={16} /> Saved Listings
                  </Link>
                  <Link href="/messages" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-warm-white-dark text-charcoal text-sm">
                    <MessageSquare size={16} /> Messages
                  </Link>
                  <Link href="/appointments" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-warm-white-dark text-charcoal text-sm">
                    <Calendar size={16} /> Appointments
                  </Link>
                  {user.role === 'admin' && (
                    <Link href="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-warm-white-dark text-charcoal text-sm">
                      <LayoutDashboard size={16} /> Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => { signOut(); setIsOpen(false); }}
                    className="flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-soft-red/5 text-soft-red text-sm"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setAuthModal({ open: true, mode: "signin" }); setIsOpen(false); }}
                    className="text-navy font-semibold text-base py-2.5 px-3 rounded-lg text-center border border-navy/20 hover:bg-navy/5 transition-colors"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => { setAuthModal({ open: true, mode: "signup" }); setIsOpen(false); }}
                    className="bg-coral text-white font-semibold text-base py-3 px-3 rounded-xl text-center hover:bg-coral-dark transition-colors shadow-sm"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    Sign Up Free
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={authModal.open}
        defaultMode={authModal.mode}
        onClose={() => setAuthModal(v => ({ ...v, open: false }))}
      />
    </>
  );
}
