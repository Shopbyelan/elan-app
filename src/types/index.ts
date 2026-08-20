export interface ProductImage {
  id: string;
  url: string;
  publicId: string | null;
  alt: string | null;
  isPrimary: boolean;
  sortOrder: number;
  productId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  gradient: string | null;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string | null;
  price: number;
  comparePrice: number | null;
  sku: string | null;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  material: string | null;
  weight: string | null;
  dimensions: string | null;
  careInstr: string | null;
  badge: string | null;
  categories: Category[];
  images: ProductImage[];
  _count?: { reviews: number };
  averageRating?: number;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
  productId: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  productName: string;
  productImg: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  createdAt: string;
  items: OrderItem[];
  address: Address | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date | string;
  user: { name: string | null; image: string | null };
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  phone: string | null;
}

// Nigerian states for delivery
export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
] as const;

export type NigerianState = typeof NIGERIAN_STATES[number];

// Delivery fee by state (NGN)
export const DELIVERY_FEES: Record<string, number> = {
  Lagos: 3000,
  FCT: 3500,
  Ogun: 4000,
  Oyo: 4500,
  Edo: 5000,
  Delta: 5000,
  Rivers: 5500,
  default: 6000,
};

export function getDeliveryFee(state: string): number {
  return DELIVERY_FEES[state] ?? DELIVERY_FEES.default;
}
