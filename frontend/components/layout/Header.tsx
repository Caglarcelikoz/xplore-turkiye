"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tripTypes } from "@/lib/data/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-14 md:h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Xplore Turkiye & Beyond"
            width={260}
            height={32}
            className="h-auto w-[180px] sm:w-[220px] md:w-[240px] lg:w-[260px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
          <Link
            href="/"
            className="text-xs md:text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          {/* <div className="relative group">
            <button className="text-sm font-medium text-foreground transition-colors hover:text-primary flex items-center">
              Reizen
            </button>
            <div className="absolute left-0 mt-2 w-56 rounded-md bg-white shadow-lg border border-primary/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                {tripTypes.map((type) => (
                  <Link
                    key={type.id}
                    href={`/reizen/${type.id}`}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary"
                  >
                    {type.name}
                  </Link>
                ))}
              </div>
            </div>
          </div> */}
          <Link
            href="/over-ons"
            className="text-xs md:text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Over Ons
          </Link>
          <Link
            href="/contact"
            className="text-xs md:text-sm font-medium text-foreground transition-colors hover:text-primary"
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
            {/* <div className="space-y-2">
              <div className="text-sm font-semibold text-primary">Reizen</div>
              {tripTypes.map((type) => (
                <Link
                  key={type.id}
                  href={`/reizen/${type.id}`}
                  className="block pl-4 text-sm text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {type.name}
                </Link>
              ))}
            </div> */}
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

