import React, { createContext, useState, useEffect } from "react";
import { auth, rtdb } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database";
import type { User, Product, AppContextType } from "@/types";

import type { ReactNode } from 'react';


export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [product, setProduct] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

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

  const addToCart = async (item: Product) => {
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
      value={{ user, product, cart, addToCart, removeFromCart, clearCart, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};
