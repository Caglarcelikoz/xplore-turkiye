"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email) {
      setError("E-mailadres is verplicht");
      return;
    }

    if (!validateEmail(email)) {
      setError("Ongeldig e-mailadres");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Er is iets misgegaan");
      }

      setIsSuccess(true);
      setEmail("");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Er is een fout opgetreden",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-center">
        Nieuwsbrief
      </h4>
      <p className="text-xs sm:text-sm text-white/80 mb-3">
        Blijf op de hoogte van onze laatste reisaanbiedingen en tips.
      </p>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
            <input
              type="email"
              placeholder="jouw@email.be"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting || isSuccess}
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="bg-white text-primary hover:bg-white/90 min-w-[100px] h-11"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Bezig...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Ingeschreven!
              </>
            ) : (
              "Inschrijven"
            )}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-xs text-red-300"
            >
              <AlertCircle className="h-3 w-3" />
              {error}
            </motion.div>
          )}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-xs text-green-300"
            >
              <CheckCircle className="h-3 w-3" />
              Je bent succesvol ingeschreven voor onze nieuwsbrief!
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
