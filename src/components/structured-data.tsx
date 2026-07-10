export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "MAAJ Furniture Mart",
    image: "https://maajfurnituremart.vercel.app/images/showroom-placeholder.jpg",
    "@id": "https://maajfurnituremart.vercel.app",
    url: "https://maajfurnituremart.vercel.app",
    telephone: "+918511882726",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sarkhej Narol Highway",
      addressLocality: "Narol, Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "382405",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.9558,
      longitude: 72.5797,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "20:00",
    },
    sameAs: [],
    areaServed: {
      "@type": "City",
      name: "Ahmedabad",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
