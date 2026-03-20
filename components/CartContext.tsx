"use client";
import { createContext, useContext, useState } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<any[]>([]);

  const ajouterAuPanier = (produit: any, taille: string) => {
    setItems((prev) => {
      // On cherche si le même produit AVEC LA MÊME TAILLE est déjà là
      const existeDeja = prev.find((item) => item.id === produit.id && item.taille === taille);

      if (existeDeja) {
        return prev.map((item) =>
          (item.id === produit.id && item.taille === taille) 
          ? { ...item, quantite: item.quantite + 1 } 
          : item
        );
      }
      // Sinon on l'ajoute avec sa taille
      return [...prev, { ...produit, taille, quantite: 1 }];
    });
  };

  const modifierQuantite = (id: number, taille: string, delta: number) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === id && item.taille === taille) {
          const nouvelleQt = item.quantite + delta;
          return { ...item, quantite: Math.max(1, nouvelleQt) };
        }
        return item;
      });
    });
  };

  const supprimerDuPanier = (id: number, taille: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.taille === taille)));
  };

  const nombreArticles = items.reduce((acc, item) => acc + item.quantite, 0);

  return (
    <CartContext.Provider value={{ items, ajouterAuPanier, modifierQuantite, supprimerDuPanier, nombreArticles }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);