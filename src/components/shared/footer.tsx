import Link from "next/link";
import { FiCpu, FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";

const exploreLinks = [
  { href: "/explore", label: "Explore Tools" },
  { href: "/add", label: "Sell an AI Tool" },
  { href: "/dashboard", label: "Dashboard" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background text-muted-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-heading text-xl font-extrabold tracking-tight text-foreground hover:opacity-90"
            >
              <FiCpu className="h-6 w-6 text-orange-500" />
              ModelNest<span className="text-orange-500">AI</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Discover and buy AI tools &amp; subscriptions at prices that make
              sense. Sell your custom-trained weights and API tools.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">Marketplace</h3>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">Get in Touch</h3>
            <a
              href="mailto:hello@modelnestai.com"
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <FiMail className="h-4 w-4 text-orange-500" />
              hello@modelnestai.com
            </a>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-muted p-2 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ModelNestAI. All rights reserved. Built for developers and creators.
        </div>
      </div>
    </footer>
  );
}
