import { Categories } from "@/components/sections/categories";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { FeaturedListings } from "@/components/sections/featured-listings";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Newsletter } from "@/components/sections/newsletter";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedListings />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
      <Newsletter />
    </div>
  );
}
