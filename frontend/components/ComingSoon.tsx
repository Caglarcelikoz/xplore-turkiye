"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, CheckCircle2, Loader2 } from "lucide-react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/coming-soon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.details 
          ? `${data.error}: ${data.details}` 
          : data.error || "Er ging iets mis";
        throw new Error(errorMsg);
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Er ging iets mis. Probeer het later opnieuw."
      );
    }
  };

  return (
    <main role="main" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/cappadocie1.jpg"
          alt="Panoramisch uitzicht op Cappadocië met luchtballonnen boven unieke rotsformaties tijdens zonsopgang"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/85 via-primary-dark/75 to-primary-dark/90" />
        {/* Additional subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-primary-dark/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
        {/* Logo - Enhanced with fancy effects */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            {/* Multiple glow layers for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-2xl blur-3xl scale-125 opacity-60 animate-pulse-slow" aria-hidden="true" />
            <div className="absolute inset-0 bg-white/15 rounded-2xl blur-2xl scale-110" aria-hidden="true" />
            
            {/* Animated ring/border effect */}
            <div 
              className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 opacity-50 blur-sm animate-spin-slow" 
              style={{ animationDuration: '20s' }}
              aria-hidden="true"
            />
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" aria-hidden="true" />
            
            {/* Main logo container with glassmorphism */}
            <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/30 shadow-2xl">
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" aria-hidden="true" />
              
              {/* Logo */}
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="Xplore Turkiye & Beyond logo"
                  width={280}
                  height={35}
                  className="h-auto w-auto drop-shadow-lg"
                  priority
                />
              </div>
            </div>
            
            {/* Floating sparkles around logo */}
            <div className="absolute -top-4 -left-4 w-2 h-2 bg-white/60 rounded-full animate-float-delayed" aria-hidden="true" />
            <div className="absolute -top-4 -right-4 w-2 h-2 bg-accent/60 rounded-full animate-float-delayed" style={{ animationDelay: '0.5s' }} aria-hidden="true" />
            <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-primary/60 rounded-full animate-float-delayed" style={{ animationDelay: '1s' }} aria-hidden="true" />
            <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-white/60 rounded-full animate-float-delayed" style={{ animationDelay: '1.5s' }} aria-hidden="true" />
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
          Binnenkort
          <br />
          <span className="bg-gradient-to-r from-white via-white/90 to-accent/80 bg-clip-text text-transparent">
            beschikbaar
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          We werken hard aan een geweldige reiservaring voor jou.
          <br />
          <span className="text-white/80">Blijf op de hoogte voor updates!</span>
        </p>

        {/* Decorative element */}
        <div className="flex items-center justify-center gap-3 mb-16" aria-hidden="true">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <Sparkles className="h-6 w-6 text-white/80 animate-pulse" aria-hidden="true" />
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>

        {/* Email signup section */}
        <div className="max-w-lg mx-auto">
          {/* Section heading */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3">
              Wilt u geïnformeerd worden wanneer we live zijn?
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-light">
              Laat uw e-mailadres achter en we sturen u een bericht zodra we klaar zijn
            </p>
          </div>

          {/* Email form with glassmorphism */}
          <div className="relative">
            {/* Glow effect behind form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-2xl blur-xl opacity-60" aria-hidden="true" />
            
            {/* Form container */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jouw@email.nl"
                      required
                      disabled={status === "loading" || status === "success"}
                      className="w-full px-6 py-4 rounded-xl bg-white/15 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base"
                      aria-label="E-mailadres voor updates"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="px-8 py-4 bg-gradient-to-r from-accent to-accent-hover text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-accent/30 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 min-w-[160px] text-base"
                  >
                    {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
                    {status === "success" && <CheckCircle2 className="h-5 w-5" />}
                    {status === "loading" ? "Verzenden..." : status === "success" ? "Verzonden!" : "Meld me aan"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-sm text-red-300 text-center font-medium" role="alert">
                    {errorMessage}
                  </p>
                )}
                {status === "success" && (
                  <p className="text-sm text-green-300 text-center font-medium" role="alert">
                    Bedankt! We sturen u een bericht zodra we live zijn.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles animation - subtle */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 4) * 18}%`,
              animation: `float ${4 + (i % 3)}s ease-in-out ${i * 0.6}s infinite`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.6;
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-15px) translateX(8px) scale(1.2);
            opacity: 0.8;
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </main>
  );
}