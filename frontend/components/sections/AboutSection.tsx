"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award } from "lucide-react";
import { getIconComponent } from "@/lib/strapi/mappers/icons";
import Markdown from "@/components/ui/markdown";
import type { AboutSectionProps } from "@/lib/strapi/mappers/about";

export default function AboutSection({
  badge,
  title,
  description,
  image,
}: AboutSectionProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 rounded-full mb-3 sm:mb-4">
              {badge.icon && (
                <span className="h-3 w-3 sm:h-4 sm:w-4 text-primary">
                  {(() => {
                    const Icon = getIconComponent(badge.icon);
                    return (
                      <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    );
                  })()}
                </span>
              )}
              <span className="text-xs sm:text-sm font-medium text-primary">
                {badge.label}
              </span>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4 px-4">
            {title}
          </h2>
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Markdown content={description} size="lg" />
          </motion.div>

          {/* Image with Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative Border */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl blur-xl opacity-50" />

            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={image.url}
                alt={image.alt}
                width={image.width || 600}
                height={image.height || 600}
                className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px]"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm sm:text-base text-primary">
                      Ervaren Team
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Jarenlange expertise in Turkije
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

