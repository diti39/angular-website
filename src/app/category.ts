export interface Product {
    name: string;
    unitPrice: number;
  };
  export interface Category {
    id: number;
    name: string;
    products: Product[];
  };
  export interface Business {
    nuis: string;
    businessName: string;
    categories: Category[];
  };