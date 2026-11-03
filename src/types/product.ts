export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  images?: string[];
  description: string;
  stock?: number;
  availabilityStatus?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
