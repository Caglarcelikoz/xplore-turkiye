/**
 * Cookie consent management utilities
 * Handles localStorage for cookie preferences
 */

export interface CookiePreferences {
  strictlyNecessary: boolean; // Always true, can't be disabled
  functional: boolean;
  analytical: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = "xplore-turkiye-cookie-consent";

/**
 * Default cookie preferences (only strictly necessary enabled)
 */
export const defaultPreferences: CookiePreferences = {
  strictlyNecessary: true,
  functional: false,
  analytical: false,
  marketing: false,
  timestamp: new Date().toISOString(),
};

/**
 * All cookies accepted preferences
 */
export const allAcceptedPreferences: CookiePreferences = {
  strictlyNecessary: true,
  functional: true,
  analytical: true,
  marketing: true,
  timestamp: new Date().toISOString(),
};

/**
 * Check if localStorage is available
 * Safe for SSR and browsers with blocked localStorage
 */
const isLocalStorageAvailable = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if user has already given cookie consent
 */
export const hasCookieConsent = (): boolean => {
  if (!isLocalStorageAvailable()) return false;
  try {
    const consent = localStorage.getItem(STORAGE_KEY);
    return consent !== null;
  } catch {
    return false;
  }
};

/**
 * Get saved cookie preferences from localStorage
 * Returns null if no preferences are saved
 */
export const getCookieConsent = (): CookiePreferences | null => {
  if (!isLocalStorageAvailable()) return null;
  try {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) return null;
    return JSON.parse(consent) as CookiePreferences;
  } catch {
    return null;
  }
};

/**
 * Save cookie preferences to localStorage
 */
export const setCookieConsent = (
  preferences: Omit<CookiePreferences, "timestamp">
): void => {
  if (!isLocalStorageAvailable()) return;
  try {
    const preferencesWithTimestamp: CookiePreferences = {
      ...preferences,
      strictlyNecessary: true, // Always enforce strictly necessary
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferencesWithTimestamp));
  } catch (error) {
    console.error("Failed to save cookie consent:", error);
  }
};

/**
 * Clear cookie consent (for testing purposes)
 */
export const resetCookieConsent = (): void => {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to reset cookie consent:", error);
  }
};

/**
 * Check if a specific cookie category is enabled
 */
export const isCookieCategoryEnabled = (
  category: keyof Omit<CookiePreferences, "timestamp">
): boolean => {
  const consent = getCookieConsent();
  if (!consent) return category === "strictlyNecessary"; // Only strictly necessary by default
  return consent[category];
};
