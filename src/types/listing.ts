export interface Listing {
  _id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  logo: string;
  features?: string[];
  rating: number;
  reviewCount: number;
  sellerId?: string;
  sellerName?: string;
  createdAt?: string;
}
