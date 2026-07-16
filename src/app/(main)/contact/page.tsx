"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  FiMail,
  FiMessageSquare,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: FiMail,
    title: "Email",
    value: "hello@modelnestai.com",
    href: "mailto:hello@modelnestai.com",
  },
  {
    icon: FiMessageSquare,
    title: "Support",
    value: "support@modelnestai.com",
    href: "mailto:support@modelnestai.com",
  },
  {
    icon: FiMapPin,
    title: "Location",
    value: "Dhaka, Bangladesh",
    href: null,
  },
];

const socials = [
  { icon: FiGithub, href: "https://github.com", label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    setSubmitting(true);
    // TODO: wire this up to a real backend endpoint / email service later
    await new Promise((resolve) => setTimeout(resolve, 900));

    setSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you soon.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 md:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-500">
          Contact Us
        </div>
        <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Get in{" "}
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            Touch
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Questions about buying, selling, or anything else? We&apos;d love to
          hear from you.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-heading text-lg font-semibold">
              Contact Information
            </h2>
            <div className="mt-6 space-y-5">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <item.icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {item.title}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium transition-colors hover:text-orange-500"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs text-muted-foreground">Follow us</p>
              <div className="mt-3 flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-orange-500/10 hover:text-orange-500"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-heading text-lg font-semibold">
              Send us a Message
            </h2>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-6 py-10 text-center">
                <p className="font-heading text-base font-semibold text-orange-500">
                  Message Sent!
                </p>
                <p className="text-sm text-muted-foreground">
                  Thanks for reaching out. We&apos;ll reply within 1-2 business
                  days.
                </p>
                <Button
                  variant="outline"
                  className="mt-3 rounded-full"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="focus-visible:border-orange-500 focus-visible:ring-orange-500/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus-visible:border-orange-500 focus-visible:ring-orange-500/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="focus-visible:border-orange-500 focus-visible:ring-orange-500/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="focus-visible:border-orange-500 focus-visible:ring-orange-500/30"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
