"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { HeroSectionProps } from "@/lib/strapi/mappers/hero";
import { getIconComponent } from "@/lib/strapi/mappers/icons";

const SLIDESHOW_IMAGES = [
  { src: "/cappadocie2.jpg", alt: "Cappadocia hot air balloons" },
  { src: "/mardin.jpg", alt: "Historic city of Mardin" },
  { src: "/efes.jpg", alt: "Ancient ruins of Ephesus" },
  { src: "/karadeniz.jpg", alt: "Karadeniz region" },
];

const SLIDE_INTERVAL = 5000;

export default function HeroSection({
  title,
  subtitle,
  description,
  backgroundImage,
  badgeText,
  primaryButton,
  secondaryButton,
  stats,
}: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[100vh] sm:min-h-[90vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden py-12 sm:py-0">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDESHOW_IMAGES[currentIndex].src}
              alt={SLIDESHOW_IMAGES[currentIndex].alt}
              fill
              priority={currentIndex === 0}
              sizes="100vw"
              className="object-cover scale-105"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary-dark/70 to-primary-dark/90 z-[1]" />
        {/* Decorative Pattern */}
        <div
          className="absolute inset-0 opacity-10 z-[1]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[2] flex gap-2">
          {SLIDESHOW_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-3 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          {badgeText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-4 sm:mb-6"
            >
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full text-xs sm:text-sm font-medium">
                {badgeText}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2"
          >
            {title}
            {subtitle && (
              <>
                <br />
                <span className="text-accent">{subtitle}</span>
              </>
            )}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 text-white/95 max-w-3xl mx-auto leading-relaxed px-4"
            >
              {description}
            </motion.p>
          )}

          {(primaryButton || secondaryButton) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4"
            >
              {primaryButton && (
                <div className="group w-full sm:w-auto">
                  {primaryButton.isExternal ? (
                    <a
                      href={primaryButton.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonStyles.getClasses("default", "lg"),
                        "flex items-center justify-center"
                      )}
                    >
                      {primaryButton.text}
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      href={primaryButton.link}
                      className={cn(
                        buttonStyles.getClasses("default", "lg"),
                        "flex items-center justify-center"
                      )}
                    >
                      {primaryButton.text}
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              )}
        
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

