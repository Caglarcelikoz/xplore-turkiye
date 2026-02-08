"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { HeroSectionProps } from "@/lib/strapi/mappers/hero";

const SLIDESHOW_IMAGES = [
  { src: "/cappadocie2.jpg", alt: "Cappadocia hot air balloons" },
  { src: "/mardin.jpg", alt: "Historic city of Mardin" },
  { src: "/efes.jpg", alt: "Ancient ruins of Ephesus" },
  { src: "/karadeniz.jpg", alt: "Karadeniz region" },
];

const SLIDE_INTERVAL = 5000;

export default function HeroSection({
  description,
  primaryButton,
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
    <section className="relative overflow-hidden min-h-[600px] lg:min-h-[calc(100vh-4rem)] py-12 sm:py-16 flex items-center justify-center">
      {/* Background Slideshow */}
      <div className="absolute inset-0 -z-10">
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
              className="object-cover object-center"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/85 via-primary-dark/75 to-primary-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-primary-dark/40" />

        {/* Decorative Pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDESHOW_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              index === currentIndex
                ? "w-8 bg-white"
                : "w-3 bg-white/40 hover:bg-white/60",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo Section - Turkish Map Background */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 sm:mb-8 md:mb-10 lg:mb-14 flex justify-center"
          >
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-white/20 to-accent/30 blur-3xl opacity-60" />

              {/* Turkish Map Background Overlay */}
              <div className="relative">
                {/* Turkey Map Silhouette */}
                <div className="absolute inset-0 flex items-center justify-center opacity-35 scale-100 sm:scale-100 md:scale-110 lg:scale-125">
                  <Image
                    src="/tr.svg"
                    alt=""
                    width={500}
                    height={300}
                    className="w-full h-auto"
                    aria-hidden="true"
                  />
                </div>

                {/* Logo - Enhanced Visibility */}
                <div className="relative px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
                  <Image
                    src="/logo.png"
                    alt="Xplore Turkiye & Beyond"
                    width={400}
                    height={50}
                    className="relative h-auto w-[280px] sm:w-[280px] md:w-[320px] lg:w-[380px] xl:w-[440px]"
                    style={{
                      filter:
                        "drop-shadow(0 0 60px rgba(255,255,255,0.9)) drop-shadow(0 0 30px rgba(255,255,255,0.8)) drop-shadow(0 4px 20px rgba(0,0,0,0.5))",
                    }}
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight px-2"
          >
            Wij gidsen je door het{" "}
            <span className="bg-gradient-to-r from-white via-white/95 to-accent/85 bg-clip-text text-transparent">
              authentieke Turkije
            </span>
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 md:mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed px-4 font-light"
            >
              {description}
            </motion.p>
          )}

          {/* Call to Action */}
          {primaryButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex justify-center px-4 mb-12"
            >
              <div className="group relative">
                {/* Button glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/40 via-accent/30 to-accent/40 rounded-lg blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300" />

                {primaryButton.isExternal ? (
                  <a
                    href={primaryButton.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonStyles.getClasses("default", "lg"),
                      "relative flex items-center justify-center gap-2 shadow-2xl min-w-[200px]",
                    )}
                  >
                    {primaryButton.text}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    href={primaryButton.link}
                    className={cn(
                      buttonStyles.getClasses("default", "lg"),
                      "relative flex items-center justify-center gap-2 shadow-2xl min-w-[200px]",
                    )}
                  >
                    {primaryButton.text}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
