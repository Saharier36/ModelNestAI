import { Categories } from "@/components/sections/categories";
import { FeaturedListings } from "@/components/sections/featured-listings";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedListings />
    </div>
  );
}
