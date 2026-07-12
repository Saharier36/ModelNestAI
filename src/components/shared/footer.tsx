import Link from "next/link";
import { FiCpu, FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";

const exploreLinks = [
  { href: "/explore", label: "Explore Tools" },
  { href: "/items/add", label: "Sell an AI Tool" },
  { href: "/dashboard", label: "Dashboard" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-heading text-lg font-bold"
            >
              <FiCpu className="h-6 w-6 text-primary" />
              ModelNest<span className="text-primary">AI</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Discover and buy AI tools & subscriptions at prices that make
              sense.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-heading text-sm font-semibold">Marketplace</h3>
            <ul className="mt-4 space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h3 className="font-heading text-sm font-semibold">Get in Touch</h3>
            <a
              href="mailto:hello@modelnestai.com"
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <FiMail className="h-4 w-4" />
              hello@modelnestai.com
            </a>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <FiLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/50 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ModelNestAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
