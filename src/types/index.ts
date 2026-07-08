export type ProductType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice: number | null;
  material: string | null;
  dimensions: string | null;
  stock: number;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
  categoryId: string;
  category?: CategoryType;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryType = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type BannerType = {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  link: string | null;
  order: number;
  isActive: boolean;
};

export type OfferType = {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  discount: string | null;
  validTill: Date | null;
  isActive: boolean;
};

export type GalleryImageType = {
  id: string;
  title: string | null;
  image: string;
  order: number;
  isActive: boolean;
};

export type TestimonialType = {
  id: string;
  name: string;
  message: string;
  rating: number;
  image: string | null;
  isActive: boolean;
};

export type SiteSettingsType = {
  id: string;
  siteName: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  mapEmbedUrl: string | null;
};

export type ContactFormValues = {
  name: string;
  phone: string;
  message: string;
  productId?: string;
};
