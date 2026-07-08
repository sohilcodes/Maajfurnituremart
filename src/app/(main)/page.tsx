import Hero from "@/components/home/hero";
import CategorySection from "@/components/home/category-section";
import FeaturedProducts from "@/components/home/featured-products";
import Testimonials from "@/components/home/testimonials";
import GalleryPreview from "@/components/home/gallery-preview";
import MapContact from "@/components/home/map-contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <Testimonials />
      <GalleryPreview />
      <MapContact />
    </>
  );
}
