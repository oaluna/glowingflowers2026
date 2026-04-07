import React, { createContext, useState, useEffect, ReactNode } from "react";
import { auth, rtdb } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database";

export interface Arrangement {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imgUrl: string;
}

export interface User {
  uid: string;
  email: string | null;
}

interface AppContextType {
  user: User | null;
  cart: Arrangement[];
  addToCart: (item: Arrangement) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  logout: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Arrangement[]>([]);

  // Listen for user login/logout and fetch their saved cart
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({ uid: currentUser.uid, email: currentUser.email });

        const cartRef = ref(rtdb, `carts/${currentUser.uid}`);
        const snapshot = await get(cartRef);

        if (snapshot.exists()) {
          setCart(snapshot.val().items || []);
        }
      } else {
        setUser(null);
        setCart([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addToCart = async (item: Arrangement) => {
    const newCart = [...cart, item];
    setCart(newCart);

    if (user) {
      const cartRef = ref(rtdb, `carts/${user.uid}`);
      await set(cartRef, { items: newCart });
    }
  };

  const removeFromCart = async (indexToRemove: number) => {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(newCart);

    if (user) {
      const cartRef = ref(rtdb, `carts/${user.uid}`);
      await set(cartRef, { items: newCart });
    }
  };

  const clearCart = async () => {
    setCart([]);
    if (user) {
      const cartRef = ref(rtdb, `carts/${user.uid}`);
      await set(cartRef, { items: [] });
    }
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <AppContext.Provider
      value={{ user, cart, addToCart, removeFromCart, clearCart, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};
