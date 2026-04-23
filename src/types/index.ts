export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imgUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}


export interface User {
  uid: string;
  email: string | null;
}

export interface AppContextType {
  user: User | null;
  product: Product[];
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  logout: () => void;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

export type BouquetSize = "small" | "medium" | "large";
export type BouquetPalette = "blush" | "peach" | "cream" | "mixed";
