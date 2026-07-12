"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { FiCpu, FiUsers, FiDollarSign, FiTrendingUp } from "react-icons/fi";

const stats = [
  { icon: FiCpu, value: 450, suffix: "+", label: "AI Tools Listed" },
  { icon: FiUsers, value: 12000, suffix: "+", label: "Active Users" },
  { icon: FiDollarSign, value: 65, suffix: "%", label: "Avg. Savings" },
  { icon: FiTrendingUp, value: 8500, suffix: "+", label: "Successful Sales" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.floor(obj.val).toLocaleString();
        }
      },
    });
  }, [isInView, value]);

  return (
    <span className="font-heading text-4xl font-bold sm:text-5xl">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <stat.icon className="h-5 w-5" />
            </div>
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
