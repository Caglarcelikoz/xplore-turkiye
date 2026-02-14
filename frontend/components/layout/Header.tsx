"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllTripTypes } from "@/lib/data/tripTypes";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [xploreMenuOpen, setXploreMenuOpen] = useState(false);
  const tripTypesData = getAllTripTypes();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-15 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Xplore Turkiye & Beyond"
            width={200}
            height={32}
            className="h-auto w-[200px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-5">
          <Link
            href="/"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>

          {/* Xplore Your Way Dropdown (alleen detailpagina's) */}
          <div className="relative group">
            <span className="text-sm font-medium text-foreground transition-colors hover:text-primary flex items-center gap-1 cursor-default">
              Xplore Your Way
              <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
            </span>
            <div className="absolute left-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-primary/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="my-1 border-t border-primary/10" />
              {tripTypesData.map((type) => (
                <Link
                  key={type.id}
                  href={`/xplore-your-way/${type.id}`}
                  className="block px-4 py-2.5 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <div className="font-medium">{type.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {type.tagline}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/regios"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Regio&apos;s
          </Link>
          <Link
            href="/over-ons"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Over Ons
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary/20 bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-sm font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* Xplore Your Way Mobile Menu */}
            <div className="space-y-2">
              <button
                onClick={() => setXploreMenuOpen(!xploreMenuOpen)}
                className="flex items-center justify-between w-full text-sm font-semibold text-primary"
              >
                Xplore Your Way
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    xploreMenuOpen && "rotate-180",
                  )}
                />
              </button>
              {xploreMenuOpen && (
                <div className="pl-4 space-y-2 pt-2">
                  {tripTypesData.map((type) => (
                    <Link
                      key={type.id}
                      href={`/xplore-your-way/${type.id}`}
                      className="block text-sm text-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {type.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/regios"
              className="block text-sm font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Regio&apos;s
            </Link>
            <Link
              href="/over-ons"
              className="block text-sm font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Over Ons
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

