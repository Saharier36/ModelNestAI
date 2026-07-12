"use client";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Rafiul Islam",
    role: "Freelance Developer",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Rafiul",
    rating: 5,
    text: "Got a ChatGPT Plus seat for almost half the price. Transaction was instant and the seller was verified, so I felt safe buying.",
  },
  {
    name: "Nusrat Jahan",
    role: "Content Creator",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Nusrat",
    rating: 5,
    text: "I had unused Midjourney credits sitting idle. Listed them here and sold within two days. Super simple process.",
  },
  {
    name: "Tanvir Ahmed",
    role: "Startup Founder",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Tanvir",
    rating: 4,
    text: "ModelNestAI helped our team access multiple AI coding tools without paying for five separate full-price subscriptions.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by Buyers & Sellers
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Real feedback from people using ModelNestAI every day.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating
                        ? "fill-orange-500 text-orange-500"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-auto flex items-center gap-3 pt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full bg-muted"
                />
                <div>
                  <p className="font-heading text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
