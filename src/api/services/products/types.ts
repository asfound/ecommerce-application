export interface AppProduct {
  bestSeller: boolean;
  description: string;
  image: { label: string; url: string };
  name: string;
  price: { default: number; discounted?: number };
  sku: string;
}
