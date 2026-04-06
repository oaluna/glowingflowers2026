import React, { createContext, useState, useEffect, ReactNode } from "react";
import { auth, rtdb } from "./firebase"; // Import rtdb instead of db
import { onAuthStateChanged } from "firebase/auth";
import { ref, get, set } from "firebase/database"; // Import Realtime Database functions

// 1. Updated interface to use string IDs for the Realtime Database
export interface Arrangement {
  id: string;
  name: string;
  price: number;
  desc: string;
  imageUrl: string;
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

  // 2. Fetch the cart using Realtime Database
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({ uid: currentUser.uid, email: currentUser.email });

        // Point to this specific user's cart in the Realtime Database
        const cartRef = ref(rtdb, `carts/${currentUser.uid}`);
        const snapshot = await get(cartRef);

        if (snapshot.exists()) {
          // .val() extracts the JSON data from the snapshot
          setCart(snapshot.val().items || []);
        }
      } else {
        setUser(null);
        setCart([]); // Clear cart if they log out
      }
    });

    return () => unsubscribe();
  }, []);

  // 3. Save the cart using Realtime Database's set() function
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
