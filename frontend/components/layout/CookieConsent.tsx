"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  hasCookieConsent,
  getCookieConsent,
  setCookieConsent,
  defaultPreferences,
  allAcceptedPreferences,
  type CookiePreferences,
} from "@/lib/cookies";

type ViewType = "simple" | "settings" | "policy";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [view, setView] = useState<ViewType>("simple");
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  // Check if user has already consented on mount
  useEffect(() => {
    const hasConsent = hasCookieConsent();
    if (!hasConsent) {
      // Delay banner appearance by 1 second for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    setCookieConsent(allAcceptedPreferences);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    setCookieConsent(preferences);
    setShowBanner(false);
  };

  const handleToggleCategory = (
    category: keyof Omit<CookiePreferences, "timestamp">
  ) => {
    if (category === "strictlyNecessary") return; // Can't disable strictly necessary

    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleClose = () => {
    setShowBanner(false);
  };

  // Keyboard navigation (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showBanner) {
        if (view === "simple") {
          handleClose();
        } else {
          setView("simple");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showBanner, view]);

  // Listen for custom event to open cookie settings
  useEffect(() => {
    const handleOpenSettings = () => {
      // Load current preferences or use defaults
      const currentPreferences = getCookieConsent() || defaultPreferences;
      setPreferences(currentPreferences);

      // Show banner and go directly to settings view
      setView("settings");
      setShowBanner(true);
    };

    window.addEventListener("openCookieSettings", handleOpenSettings);
    return () => window.removeEventListener("openCookieSettings", handleOpenSettings);
  }, []);

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop for settings and policy views */}
          {(view === "settings" || view === "policy") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setView("simple")}
            />
          )}

          {/* Main content */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed z-[70] ${
              view === "simple"
                ? "bottom-0 inset-x-0"
                : "inset-0 flex items-center justify-center p-4"
            }`}
          >
            {view === "simple" && <SimpleBanner setView={setView} onAcceptAll={handleAcceptAll} />}
            {view === "settings" && (
              <SettingsModal
                preferences={preferences}
                onToggle={handleToggleCategory}
                onSave={handleSavePreferences}
                onAcceptAll={handleAcceptAll}
                setView={setView}
              />
            )}
            {view === "policy" && <PolicyModal setView={setView} />}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Simple Banner View
function SimpleBanner({
  setView,
  onAcceptAll,
}: {
  setView: (view: ViewType) => void;
  onAcceptAll: () => void;
}) {
  return (
    <div className="bg-white border-t border-primary/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon and message */}
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground">
                We gebruiken cookies om uw ervaring te verbeteren en ons aanbod
                te optimaliseren.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setView("policy")}
              className="text-sm text-primary hover:underline underline-offset-2 px-2 transition-colors"
            >
              Meer info
            </button>
            <Button
              variant="outline"
              size="default"
              onClick={() => setView("settings")}
              className="w-full sm:w-auto"
            >
              Instellingen
            </Button>
            <Button
              variant="default"
              size="default"
              onClick={onAcceptAll}
              className="w-full sm:w-auto"
            >
              Alles accepteren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Modal View
function SettingsModal({
  preferences,
  onToggle,
  onSave,
  onAcceptAll,
  setView,
}: {
  preferences: CookiePreferences;
  onToggle: (category: keyof Omit<CookiePreferences, "timestamp">) => void;
  onSave: () => void;
  onAcceptAll: () => void;
  setView: (view: ViewType) => void;
}) {
  const categories = [
    {
      key: "strictlyNecessary" as const,
      label: "Strikt noodzakelijk",
      description:
        "Essentieel voor de basisfunctionaliteit van de website. Kan niet worden uitgeschakeld.",
      disabled: true,
    },
    {
      key: "functional" as const,
      label: "Functioneel",
      description: "Onthouden van voorkeuren en keuzes.",
      disabled: false,
    },
    {
      key: "analytical" as const,
      label: "Analytisch",
      description: "Analyseren van websiteverkeer en gebruikspatronen.",
      disabled: false,
    },
    {
      key: "marketing" as const,
      label: "Marketing",
      description: "Gepersonaliseerde content en advertenties.",
      disabled: false,
    },
  ];

  return (
    <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Cookie-instellingen</span>
          <button
            onClick={() => setView("simple")}
            className="text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Sluiten"
          >
            <X className="w-6 h-6" />
          </button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-sm text-foreground/80">
          Kies welke cookies u wilt toestaan. U kunt uw keuze op elk moment
          wijzigen.
        </p>

        {/* Cookie categories */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.key}
              className="flex items-start gap-3 p-4 bg-background rounded-lg border border-primary/10"
            >
              <div className="flex items-center h-6">
                <input
                  type="checkbox"
                  id={category.key}
                  checked={preferences[category.key]}
                  disabled={category.disabled}
                  onChange={() => onToggle(category.key)}
                  className="w-4 h-4 rounded border-primary/30 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                />
              </div>
              <label
                htmlFor={category.key}
                className={`flex-1 ${
                  category.disabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <div className="font-medium text-sm text-foreground">
                  {category.label}
                </div>
                <div className="text-xs text-foreground/60 mt-1">
                  {category.description}
                </div>
              </label>
            </div>
          ))}
        </div>

        {/* Link to full policy */}
        <button
          onClick={() => setView("policy")}
          className="text-sm text-primary hover:underline underline-offset-2 transition-colors"
        >
          Lees volledige cookieverklaring →
        </button>
      </CardContent>

      <CardFooter className="flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={() => setView("simple")}
          className="w-full sm:w-auto"
        >
          Terug
        </Button>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:ml-auto">
          <Button
            variant="outline"
            onClick={onAcceptAll}
            className="w-full sm:w-auto"
          >
            Alles accepteren
          </Button>
          <Button variant="default" onClick={onSave} className="w-full sm:w-auto">
            Opslaan
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Policy Modal View
function PolicyModal({ setView }: { setView: (view: ViewType) => void }) {
  return (
    <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Cookieverklaring</span>
          <button
            onClick={() => setView("simple")}
            className="text-foreground/60 hover:text-foreground transition-colors"
            aria-label="Sluiten"
          >
            <X className="w-6 h-6" />
          </button>
        </CardTitle>
      </CardHeader>

      <CardContent className="prose prose-sm max-w-none">
        <div className="space-y-6 text-foreground/90">
          <p>
            Deze website van <strong>XPLORE TÜRKIYE</strong>, een merk van{" "}
            <strong>Selectair Willebroek Travel</strong>, maakt gebruik van
            cookies en gelijkaardige technologieën. Cookies zijn kleine
            tekstbestanden die bij het bezoeken van een website op je toestel
            worden opgeslagen en die helpen om de website correct te laten
            functioneren en te verbeteren.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              1. Waarom gebruiken wij cookies?
            </h3>
            <p>Wij gebruiken cookies om:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                de goede werking en veiligheid van onze website te garanderen
              </li>
              <li>
                inzicht te krijgen in het gebruik van onze website en deze te
                optimaliseren
              </li>
              <li>jouw gebruikerservaring te verbeteren</li>
            </ul>
            <p className="mt-2">
              Bepaalde cookies zijn strikt noodzakelijk, andere cookies worden
              enkel geplaatst na jouw toestemming.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              2. Welke soorten cookies gebruiken wij?
            </h3>

            <h4 className="font-medium text-foreground mt-4 mb-2">
              Strikt noodzakelijke cookies
            </h4>
            <p>
              Deze cookies zijn essentieel voor het correct functioneren van de
              website en kunnen niet worden uitgeschakeld. Ze zorgen er
              bijvoorbeeld voor dat basisfunctionaliteiten werken.
            </p>

            <h4 className="font-medium text-foreground mt-4 mb-2">
              Functionele cookies
            </h4>
            <p>
              Deze cookies onthouden jouw voorkeuren en keuzes (zoals
              taalinstellingen) om de website gebruiksvriendelijker te maken.
            </p>

            <h4 className="font-medium text-foreground mt-4 mb-2">
              Analytische cookies
            </h4>
            <p>
              Deze cookies helpen ons om inzicht te krijgen in hoe bezoekers
              onze website gebruiken, zodat we de inhoud en structuur kunnen
              verbeteren. De verzamelde informatie wordt zoveel mogelijk
              geanonimiseerd.
            </p>

            <h4 className="font-medium text-foreground mt-4 mb-2">
              Marketing- en trackingcookies (indien van toepassing)
            </h4>
            <p>
              Deze cookies worden gebruikt om content af te stemmen op jouw
              interesses en om eventuele marketingcampagnes te meten. Deze
              cookies worden enkel geplaatst na jouw expliciete toestemming.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              3. Cookies van derden
            </h3>
            <p>
              Het is mogelijk dat op onze website cookies worden geplaatst door
              derde partijen, bijvoorbeeld wanneer we gebruikmaken van externe
              tools of diensten (zoals analyse- of social media-functionaliteiten).
              Deze derden kunnen cookies gebruiken in overeenstemming met hun
              eigen privacy- en cookiebeleid. XPLORE TÜRKIYE heeft hier geen
              controle over.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              4. Toestemming en beheer van cookies
            </h3>
            <p>
              Bij je eerste bezoek aan onze website zal er gevraagd worden om
              jouw cookievoorkeuren in te stellen.
            </p>
            <p>
              Je kan jouw toestemming op elk moment wijzigen of intrekken via de
              cookie-instellingen op onze website of via de instellingen van je
              browser.
            </p>
            <p>
              Houd er rekening mee dat het uitschakelen van bepaalde cookies
              invloed kan hebben op de werking van de website.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              5. Persoonsgegevens
            </h3>
            <p>
              Voor meer informatie over hoe wij omgaan met persoonsgegevens,
              verwijzen wij naar onze Privacyverklaring.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              6. Contactgegevens
            </h3>
            <p>
              <strong>XPLORE TÜRKIYE</strong>
              <br />
              Een merk van Selectair Willebroek Travel
              <br />
              E-mail:{" "}
              <a
                href="mailto:info@xploreturkiye.be"
                className="text-primary hover:underline"
              >
                info@xploreturkiye.be
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              7. Wijzigingen
            </h3>
            <p>
              Deze cookieverklaring kan van tijd tot tijd worden aangepast om te
              blijven voldoen aan wettelijke verplichtingen of technische
              wijzigingen. Wij raden aan deze pagina regelmatig te raadplegen.
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button variant="outline" onClick={() => setView("settings")} className="w-full sm:w-auto">
          Terug naar instellingen
        </Button>
      </CardFooter>
    </Card>
  );
}
