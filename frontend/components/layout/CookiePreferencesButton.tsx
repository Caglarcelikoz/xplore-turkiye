"use client";

export default function CookiePreferencesButton() {
  const handleClick = () => {
    // Dispatch custom event to open cookie settings
    window.dispatchEvent(new CustomEvent("openCookieSettings"));
  };

  return (
    <button
      onClick={handleClick}
      className="text-white/80 hover:text-white transition-colors text-left"
    >
      Cookie Voorkeuren
    </button>
  );
}
