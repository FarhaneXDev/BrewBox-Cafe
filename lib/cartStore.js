// lib/cartStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      // ── Ouvrir / fermer le drawer
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      // ── Ajouter un article
      // Si le produit + variante existent déjà → incrémenter la quantité
      addItem: (product, options = {}) => {
        const { items } = get()
        // Clé unique = slug + options sérialisées (ex: "500g-mouture-moyenne")
        const key = `${product.slug}-${JSON.stringify(options)}`
        const existing = items.find((i) => i.key === key)

        if (existing) {
          set({
            items: items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + 1 } : i
            ),
          })
        } else {
          set({
            items: [
              ...items,
              {
                key,
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.image,
                options, // { weight: 250, grind: "Grains entiers" }
                quantity: 1,
              },
            ],
          })
        }
      },

      // ── Retirer un article complètement
      removeItem: (key) => {
        set((state) => ({
          items: state.items.filter((i) => i.key !== key),
        }))
      },

      // ── Changer la quantité d'un article
      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity } : i
          ),
        }))
      },

      // ── Incrémenter / décrémenter
      increment: (key) => {
        const item = get().items.find((i) => i.key === key)
        if (item) get().updateQuantity(key, item.quantity + 1)
      },
      decrement: (key) => {
        const item = get().items.find((i) => i.key === key)
        if (item) get().updateQuantity(key, item.quantity - 1)
      },

      // ── Vider le panier
      clearCart: () => set({ items: [] }),

      // ── Sélecteurs calculés
      getTotalItems: () => {
        return get().items.reduce((acc, i) => acc + i.quantity, 0)
      },
      getSubtotal: () => {
        return get().items.reduce((acc, i) => acc + i.price * i.quantity, 0)
      },
      isInCart: (slug) => {
        return get().items.some((i) => i.slug === slug)
      },
    }),

    {
      name: 'brewbox-cart', // clé localStorage
      // On ne persiste que les items, pas l'état du drawer
      partialize: (state) => ({ items: state.items }),
    }
  )
)

// ── Seuil livraison gratuite
export const FREE_SHIPPING_THRESHOLD = 35000