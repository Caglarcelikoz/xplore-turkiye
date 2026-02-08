"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

export default function ContactSection({ showHero = false }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requestType: "",
    contactPreference: "",
    message: "",
    newsletterOptIn: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const global = staticGlobal;
  const contactInfo = global.attributes.contactInfo!;
  const openingHours = contactInfo.openingHours
    ? Array.isArray(contactInfo.openingHours)
      ? contactInfo.openingHours
      : []
    : [];

  const requestTypes = [
    "Eerste kennismaking",
    "Rondreis op maat",
    "Groepsreis",
    "Algemene vraag",
  ];

  const contactPreferences = [
    "Telefonisch",
    "E-mail",
    "Online meeting",
    "Afspraak op kantoor",
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
      case "message":
        if (value.length < 10) return "Minimaal 10 karakters vereist";
        if (value.length > 2000) return "Maximaal 2000 karakters toegestaan";
        return "";
      case "salutation":
      case "requestType":
      case "contactPreference":
        if (!value) return "Dit veld is verplicht";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const requiredFields = [
      "salutation",
      "firstName",
      "lastName",
      "email",
      "requestType",
      "contactPreference",
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

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
            salutation: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            requestType: "",
            contactPreference: "",
            message: "",
            newsletterOptIn: false,
          });
          setIsSuccess(false);
        }, 3000);
      } else {
        setApiError(data.error || "Er ging iets mis. Probeer het later opnieuw.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setApiError("Netwerkfout. Controleer je internetverbinding en probeer opnieuw.");
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4">
              Laten we kennismaken
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
              Heb je een vraag of wil je een reis op maat bespreken? Wij staan voor je klaar.
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
              Begin je Turkse avontuur
            </h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </motion.div>
        )}

        {/* Contact Methods Cards */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
        >
          {/* Phone */}
          <motion.a
            href={`tel:${contactInfo.phone}`}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-white rounded-2xl p-6 border border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-4 shadow-lg"
            >
              <PhoneIcon className="h-6 w-6 text-white" />
            </motion.div>
            <h3 className="text-sm font-semibold text-primary mb-1">Telefoon</h3>
            <p className="text-base text-foreground/80">{contactInfo.phone}</p>
          </motion.a>

          {/* Email */}
          <motion.a
            href={`mailto:${contactInfo.email}`}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-white rounded-2xl p-6 border border-primary/10 hover:border-accent/30 hover:shadow-xl transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center mb-4 shadow-lg"
            >
              <Mail className="h-6 w-6 text-white" />
            </motion.div>
            <h3 className="text-sm font-semibold text-primary mb-1">E-mail</h3>
            <p className="text-base text-foreground/80">{contactInfo.email}</p>
          </motion.a>

          {/* Address */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-white rounded-2xl p-6 border border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-light to-primary flex items-center justify-center mb-4 shadow-lg"
            >
              <MapPin className="h-6 w-6 text-white" />
            </motion.div>
            <h3 className="text-sm font-semibold text-primary mb-1">Adres</h3>
            <p className="text-base text-foreground/80">{contactInfo.address}</p>
          </motion.div>
        </motion.div>

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

              <h3 className="text-2xl font-bold text-primary mb-6">Contactformulier</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Salutation & Names Row */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Salutation */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05, duration: 0.4 }}
                  >
                    <label htmlFor="salutation" className="block text-sm font-semibold text-primary mb-2">
                      Aanhef <span className="text-accent">*</span>
                    </label>
                    <select
                      id="salutation"
                      name="salutation"
                      value={formData.salutation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none hover:border-primary/30"
                    >
                      <option value="">Selecteer</option>
                      <option value="Dhr">Dhr.</option>
                      <option value="Mevr">Mevr.</option>
                    </select>
                    {errors.salutation && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 mt-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.salutation}</span>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* First Name */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    <label htmlFor="firstName" className="block text-sm font-semibold text-primary mb-2">
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
                    {errors.firstName && (
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
                    <label htmlFor="lastName" className="block text-sm font-semibold text-primary mb-2">
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
                    {errors.lastName && (
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
                    <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
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
                    {errors.email && (
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
                    <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
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
                  </motion.div>
                </div>

                {/* Request Type & Contact Preference Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Request Type */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <label htmlFor="requestType" className="block text-sm font-semibold text-primary mb-2">
                      Type aanvraag <span className="text-accent">*</span>
                    </label>
                    <select
                      id="requestType"
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none hover:border-primary/30"
                    >
                      <option value="">Selecteer type</option>
                      {requestTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.requestType && (
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

                  {/* Contact Preference */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                  >
                    <label htmlFor="contactPreference" className="block text-sm font-semibold text-primary mb-2">
                      Voorkeur contact <span className="text-accent">*</span>
                    </label>
                    <select
                      id="contactPreference"
                      name="contactPreference"
                      value={formData.contactPreference}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none hover:border-primary/30"
                    >
                      <option value="">Selecteer voorkeur</option>
                      {contactPreferences.map((pref) => (
                        <option key={pref} value={pref}>
                          {pref}
                        </option>
                      ))}
                    </select>
                    {errors.contactPreference && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1 mt-1 text-xs text-red-600"
                      >
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.contactPreference}</span>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
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
                      className="w-full px-4 py-3 pl-11 border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none hover:border-primary/30 resize-y"
                    />
                    <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-primary/40" />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    {errors.message ? (
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
                      Ik ontvang graag reisinspiratie, tips en nieuws van XPLORE TÜRKIYE
                    </span>
                  </label>
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
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
            {/* Opening Hours */}
            <div className="bg-white rounded-2xl p-6 border border-primary/10 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-primary">Openingstijden</h3>
              </div>
              <div className="space-y-2">
                {openingHours.map((hours: { day: string; time: string }, index: number) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-primary/5 last:border-0"
                  >
                    <span className="text-sm font-medium text-foreground/70">{hours.day}</span>
                    <span className="text-sm font-semibold text-primary">{hours.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="text-lg font-bold text-primary mb-3">Snelle Reactie</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                We streven ernaar om binnen 24 uur te reageren op je bericht. Voor dringende
                vragen kun je ons ook telefonisch bereiken.
              </p>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl p-6 border border-primary/10 shadow-lg">
              <h3 className="text-lg font-bold text-primary mb-3">Bezoekadres</h3>
              <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                Dokter Persoonslaan 8<br />
                2830 Willebroek
              </p>
              <p className="text-xs text-muted-foreground italic">
                XPLORE TÜRKIYE is een gespecialiseerd merk binnen Selectair Willebroek Travel.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
