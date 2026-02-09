"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import TripCard from "./TripCard";
import { Trip } from "@/types";

interface TripCarouselProps {
  trips: Trip[];
}

export default function TripCarousel({ trips }: TripCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Calculate how many cards to show based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setCardsPerView(1); // mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // tablet: 2 cards
      } else {
        setCardsPerView(3); // desktop: 3 cards
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, trips.length - cardsPerView);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const newIndex = direction === "right" 
        ? Math.min(currentIndex + cardsPerView, maxIndex)
        : Math.max(currentIndex - cardsPerView, 0);
      
      setCurrentIndex(newIndex);
      
      // Scroll to the target card
      const targetCard = container.children[newIndex] as HTMLElement;
      if (targetCard) {
        const containerWidth = container.offsetWidth;
        const cardWidth = targetCard.offsetWidth;
        const gap = 16; // gap-4
        const scrollPosition = targetCard.offsetLeft - (containerWidth - cardWidth) / 2;
        
        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex gap-4 overflow-x-hidden overflow-y-hidden pb-4",
          trips.length <= cardsPerView && "justify-center",
        )}
      >
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
          >
            <TripCard trip={trip} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons - Centered at bottom */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("left")}
          disabled={currentIndex === 0}
          className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 hover:border-primary hover:bg-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Vorige"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Counter */}
        <div className="text-sm text-muted-foreground font-medium px-2">
          {currentIndex + 1} -{" "}
          {Math.min(currentIndex + cardsPerView, trips.length)} / {trips.length}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => scroll("right")}
          disabled={currentIndex >= maxIndex}
          className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 hover:border-primary hover:bg-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Volgende"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
