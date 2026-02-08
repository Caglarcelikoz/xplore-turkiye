"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone as PhoneIcon,
  MapPin,
  Clock,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { staticGlobal } from "@/lib/data/static-content";

interface ContactSectionProps {
  showHero?: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ContactSection({
  showHero = false,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requestType: "",
    message: "",
    newsletterOptIn: false,
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openDropdown, setOpenDropdown] = useState<"requestType" | null>(null);
  const requestTypeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        openDropdown === "requestType" &&
        !requestTypeDropdownRef.current?.contains(target)
      ) {
        setOpenDropdown(null);
      }
    }
    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openDropdown]);

  const global = staticGlobal;
  const contactInfo = global.attributes.contactInfo!;
  const openingHours = contactInfo.openingHours
    ? Array.isArray(contactInfo.openingHours)
      ? contactInfo.openingHours
      : []
    : [];

  const requestTypes = [
    "Eerste kennismaking",
    "Offerteaanvraag",
    "Algemene vraag",
  ];

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (value.length < 2) return "Minimaal 2 karakters vereist";
        if (value.length > 50) return "Maximaal 50 karakters toegestaan";
        return "";
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Ongeldig e-mailadres";
        }
        return "";
      case "phone":
        // Phone is optional, but if provided, must be valid
        if (!value) return "";
        // Allow only numbers, spaces, +, -, (, )
        if (!/^[\d\s\+\-\(\)]+$/.test(value)) {
          return "Ongeldig telefoonnummer (alleen cijfers, spaties en +-(  ) zijn toegestaan)";
        }
        // Check if there are at least 8 digits
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length < 8) {
          return "Telefoonnummer moet minimaal 8 cijfers bevatten";
        }
        if (digitsOnly.length > 20) {
          return "Telefoonnummer mag maximaal 20 cijfers bevatten";
        }
        return "";
      case "message":
        if (value.length < 10) return "Minimaal 10 karakters vereist";
        if (value.length > 2000) return "Maximaal 2000 karakters toegestaan";
        return "";
      case "requestType":
        if (!value) return "Dit veld is verplicht";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setApiError("");
  };

  const handleBlur = () => {
    // Errors worden enkel getoond na een mislukte submit (hasAttemptedSubmit)
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "requestType",
      "message",
    ];

    requiredFields.forEach((field) => {
      const value = formData[field as keyof typeof formData] as string;
      if (!value) {
        newErrors[field] = "Dit veld is verplicht";
      } else {
        const error = validateField(field, value);
        if (error) newErrors[field] = error;
      }
    });

    // Validate phone separately (optional field)
    if (formData.phone) {
      const phoneError = validateField("phone", formData.phone);
      if (phoneError) newErrors.phone = phoneError;
    }

    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted =
        "Je moet akkoord gaan met de privacy voorwaarden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setHasAttemptedSubmit(true);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            requestType: "",
            message: "",
            newsletterOptIn: false,
            privacyAccepted: false,
          });
          setIsSuccess(false);
          setHasAttemptedSubmit(false);
        }, 3000);
      } else {
        setApiError(
          data.error || "Er ging iets mis. Probeer het later opnieuw.",
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setApiError(
        "Netwerkfout. Controleer je internetverbinding en probeer opnieuw.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section (conditional) */}
        {showHero && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <MessageSquare className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Neem Contact Op
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Laten we kennismaken
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
              Wil je langskomen op kantoor of liever een online gesprek plannen?
            </p>
            <p className="text-xs sm:text-sm md:text-base text-foreground/60 max-w-2xl mx-auto mt-3">
              Maak vrijblijvend een afspraak via het contactformulier of neem
              telefonisch contact met ons op.
            </p>
          </motion.div>
        )}

        {/* Section Header (when no hero) */}
        {!showHero && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
              <MessageSquare className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Neem Contact Op
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3">
              Wil je langskomen op kantoor of liever een online gesprek plannen?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mb-4">
              Maak vrijblijvend een afspraak via het contactformulier of neem
              telefonisch contact met ons op.
            </p>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-primary/10 shadow-xl relative">
              {/* Success Overlay */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10"
                >
                  <div className="text-center p-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Bericht verstuurd!
                    </h3>
                    <p className="text-foreground/70">
                      Bedankt! We nemen spoedig contact met je op.
                    </p>
                  </div>
                </motion.div>
              )}

              <h3 className="text-2xl font-bold text-primary mb-6">
                Contactformulier
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Names Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-primary mb-2"
                    >
                      Voornaam <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Jouw voornaam"
                        className="w-full px-4 py-3 pl-11 border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none hover:border-primary/30"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                    </div>
                    {hasAttemptedSubmit && errors.firstName && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 mt-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.firstName}</span>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Last Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                  >
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-primary mb-2"
                    >
                      Achternaam <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Jouw achternaam"
                        className="w-full px-4 py-3 pl-11 border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none hover:border-primary/30"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                    </div>
                    {hasAttemptedSubmit && errors.lastName && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 mt-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.lastName}</span>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-primary mb-2"
                    >
                      E-mailadres <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="jouw@email.com"
                        className="w-full px-4 py-3 pl-11 border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none hover:border-primary/30"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                    </div>
                    {hasAttemptedSubmit && errors.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 mt-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.email}</span>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                  >
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-primary mb-2"
                    >
                      Telefoonnummer
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+32 123 45 67 89"
                        className="w-full px-4 py-3 pl-11 border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none hover:border-primary/30"
                      />
                      <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                    </div>
                    {hasAttemptedSubmit && errors.phone && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 mt-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.phone}</span>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Request Type */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <label
                    htmlFor="requestType"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    Type aanvraag <span className="text-accent">*</span>
                  </label>
                  <div className="relative" ref={requestTypeDropdownRef}>
                    <button
                      type="button"
                      id="requestType"
                      aria-haspopup="listbox"
                      aria-expanded={openDropdown === "requestType"}
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === "requestType" ? null : "requestType",
                        )
                      }
                      className="w-full flex items-center justify-between gap-2 bg-white pl-4 pr-4 py-3 border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none hover:border-primary/30 cursor-pointer text-left text-foreground"
                    >
                      <span
                        className={
                          formData.requestType ? "" : "text-muted-foreground"
                        }
                      >
                        {formData.requestType || "Selecteer type"}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-primary/50 flex-shrink-0 transition-transform ${openDropdown === "requestType" ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence>
                      {openDropdown === "requestType" && (
                        <motion.ul
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          role="listbox"
                          className="absolute z-20 mt-1 w-full bg-white border-2 border-primary/20 rounded-xl shadow-lg py-1 overflow-hidden"
                        >
                          {requestTypes.map((type) => (
                            <li
                              key={type}
                              role="option"
                              aria-selected={formData.requestType === type}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  requestType: type,
                                }));
                                if (errors.requestType)
                                  setErrors((prev) => ({
                                    ...prev,
                                    requestType: "",
                                  }));
                                setOpenDropdown(null);
                              }}
                              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${formData.requestType === type ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-primary/10"}`}
                            >
                              {type}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                  {hasAttemptedSubmit && errors.requestType && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 mt-1 text-xs text-red-600"
                    >
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.requestType}</span>
                    </motion.div>
                  )}
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    Bericht <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={5}
                      placeholder="Schrijf hier je bericht..."
                      className="w-full min-h-[8rem] px-4 py-3 pl-11 border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none hover:border-primary/30 resize-y"
                    />
                    <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-primary/40" />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    {hasAttemptedSubmit && errors.message ? (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.message}</span>
                      </motion.div>
                    ) : (
                      <div />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formData.message.length} / 2000
                    </span>
                  </div>
                </motion.div>

                {/* Newsletter Checkbox */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                >
                  <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-primary/10 hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-all duration-200">
                    <input
                      type="checkbox"
                      name="newsletterOptIn"
                      checked={formData.newsletterOptIn}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 rounded border-2 border-primary/30 text-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <span className="text-sm text-foreground/80 leading-relaxed">
                      Ik ontvang graag reisinspiratie, tips en nieuws van XPLORE
                      TÜRKIYE
                    </span>
                  </label>
                </motion.div>

                {/* Privacy voorwaarden */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-primary/10 hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-all duration-200">
                    <input
                      type="checkbox"
                      name="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 rounded border-2 border-primary/30 text-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <span className="text-sm text-foreground/80 leading-relaxed">
                      Ik ga akkoord met de{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:text-accent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        privacy voorwaarden
                      </a>{" "}
                      <span className="text-accent">*</span>
                    </span>
                  </label>
                  {hasAttemptedSubmit && errors.privacyAccepted && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 mt-1 text-xs text-red-600"
                    >
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.privacyAccepted}</span>
                    </motion.div>
                  )}
                </motion.div>

                {/* API Error */}
                {apiError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600"
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{apiError}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={!formData.privacyAccepted || isSubmitting}
                  whileHover={{
                    scale: formData.privacyAccepted && !isSubmitting ? 1.02 : 1,
                  }}
                  whileTap={{
                    scale: formData.privacyAccepted && !isSubmitting ? 0.98 : 1,
                  }}
                  className="w-full bg-gradient-to-r from-accent to-accent-hover text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Versturen...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Verstuur Bericht</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Kantoor & contact – één kaart */}
            <div className="bg-white rounded-2xl p-6 border border-primary/10 shadow-lg">
              <h3 className="text-lg font-bold text-primary mb-4">
                Kantoor & contact
              </h3>

              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-sm font-semibold text-primary">
                  Openingstijden kantoor
                </span>
              </div>
              <div className="space-y-1.5 mb-5 pl-7">
                {openingHours.map(
                  (hours: { day: string; time: string }, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-foreground/70">{hours.day}</span>
                      <span className="font-medium text-primary">
                        {hours.time}
                      </span>
                    </div>
                  ),
                )}
              </div>

              <div className="border-t border-primary/10 pt-4 space-y-3">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  <PhoneIcon className="h-4 w-4 flex-shrink-0" />
                  {contactInfo.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  {contactInfo.email}
                </a>
                <div className="flex items-start gap-2 text-sm text-foreground/80">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>
                    XPLORE TÜRKIYE
                    <br />
                    {contactInfo.address}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground italic mt-4 pt-4 border-t border-primary/10">
                XPLORE TÜRKIYE is een gespecialiseerd merk binnen Selectair
                Willebroek Travel.
              </p>
            </div>

            {/* Quick Response Promise */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="text-lg font-bold text-primary mb-3">
                Snelle Reactie
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                We streven ernaar om binnen 24 uur te reageren op je bericht.
                Voor dringende vragen kun je ons ook telefonisch bereiken.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
