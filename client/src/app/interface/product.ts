export interface Product {
  _id: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
  name: string;
  desc: string;
  price: number;
  description: string;
  imageUrl: string | null;
}
