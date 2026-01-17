"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import type { SharedContactInfo } from "@/types/strapi";

interface ContactPageContentProps {
  contactInfo: SharedContactInfo;
  openingHours?: Array<{ day: string; time: string }>;
}

export default function ContactPageContent({
  contactInfo,
  openingHours = [
    { day: "Maandag - Vrijdag", time: "09:00 - 18:00" },
    { day: "Zaterdag", time: "10:00 - 16:00" },
    { day: "Zondag", time: "Gesloten" },
  ],
}: ContactPageContentProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert(
        "Bedankt voor je bericht! We nemen zo spoedig mogelijk contact met je op."
      );
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactMethods = [
    {
      icon: Phone,
      label: "Telefoon",
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
      color: "from-primary/20 to-primary/5",
    },
    {
      icon: Mail,
      label: "E-mail",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      color: "from-accent/20 to-accent/5",
    },
    {
      icon: MapPin,
      label: "Adres",
      value: contactInfo.address,
      href: "#",
      color: "from-primary-light/20 to-primary-light/5",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary to-primary-dark">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm font-medium">Contact</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Neem Contact Op
            </h1>
            <p className="text-xl sm:text-2xl text-white/90">
              We staan klaar om je te helpen met al je vragen over onze reizen
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 sm:py-16 md:py-20 bg-background -mt-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Card
                    className={`h-full bg-gradient-to-br ${method.color} border-primary/10 hover:border-primary/30 transition-all`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-primary mb-2">
                        {method.label}
                      </h3>
                      {method.href !== "#" ? (
                        <a
                          href={method.href}
                          className="text-foreground hover:text-primary transition-colors block"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{method.value}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="bg-white border-primary/10 shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Send className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                      Stuur ons een bericht
                    </h2>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-foreground mb-2"
                        >
                          Naam *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-background"
                          placeholder="Jouw naam"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-foreground mb-2"
                        >
                          E-mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-background"
                          placeholder="jouw@email.nl"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Telefoon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-background"
                        placeholder="+31 6 12 34 56 78"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Bericht *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none bg-background"
                        placeholder="Vertel ons over jouw droomreis..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full group"
                    >
                      {isSubmitting ? (
                        "Verzenden..."
                      ) : (
                        <>
                          Verstuur Bericht
                          <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Opening Hours & Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">
                      Openingstijden
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {openingHours.map((hours, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center pb-4 border-b border-primary/10 last:border-0 last:pb-0"
                      >
                        <span className="text-foreground font-medium">
                          {hours.day}
                        </span>
                        <span className="text-muted-foreground">
                          {hours.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/5 to-background border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-bold text-primary">
                      Snelle Reactie
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We streven ernaar om binnen 24 uur te reageren op alle
                    vragen en aanvragen.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
