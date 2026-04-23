'use client'
// components/panier/CartDrawer.jsx
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'
import { useCartStore, FREE_SHIPPING_THRESHOLD } from '../../lib/cartStore'
import { formatPrice } from '../../lib/utils'

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    increment,
    decrement,
    removeItem,
    getTotalItems,
    getSubtotal,
  } = useCartStore()

  const [mounted, setMounted] = useState(false)
  const subtotal = getSubtotal()
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  
  useEffect(() => setMounted(true), [])

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-full max-w-sm bg-white
          flex flex-col shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <div>
            <h2 className="text-base font-semibold text-stone-900">Mon panier</h2>
            <p className="text-xs text-stone-400 mt-0.5">{getTotalItems()} article{getTotalItems() > 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={closeDrawer}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Contenu */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center">
              <ShoppingBag size={24} className="text-stone-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-800">Votre panier est vide</p>
              <p className="text-xs text-stone-400 mt-1">Ajoutez des produits pour commencer</p>
            </div>
            <button
              onClick={closeDrawer}
              className="mt-2 bg-[#bc6c25] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#99582a] transition-colors"
            >
              Voir le catalogue
            </button>
          </div>
        ) : (
          <>
            {/* Liste articles */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.key}>
                  <div className="flex gap-3">
                    {/* Image */}
                    <div className="w-16 h-16 rounded-lg bg-stone-800 flex-shrink-0 overflow-hidden relative">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag size={18} className="text-white/30" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-stone-900 truncate">{item.name}</p>
                      {item.options && Object.keys(item.options).length > 0 && (
                        <p className="text-xs text-stone-400 mt-0.5">
                          {mounted ? getTotalItems() : 0} article{mounted && getTotalItems() > 1 ? 's' : ''}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantité */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrement(item.key)}
                            className="w-6 h-6 rounded-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="text-sm font-semibold text-stone-900 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increment(item.key)}
                            className="w-6 h-6 rounded-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-stone-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="flex items-center gap-1 text-xs text-stone-300 hover:text-red-400 transition-colors mt-1.5"
                      >
                        <Trash2 size={11} />
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <div className="h-px bg-stone-100 mt-4" />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-stone-100">
              {/* Barre progression livraison */}
              {remaining > 0 ? (
                <div className="mb-3">
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#bc6c25] rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#bc6c25] mt-1.5">
                    Plus que {formatPrice(remaining)} pour la livraison offerte !
                  </p>
                </div>
              ) : (
                <p className="text-xs text-green-600 font-semibold mb-3">
                  Livraison offerte !
                </p>
              )}

              {/* Sous-total */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-stone-500">Sous-total</span>
                <span className="text-base font-bold text-stone-900">{formatPrice(subtotal)}</span>
              </div>

              {/* CTAs */}
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="block w-full bg-[#bc6c25] hover:bg-[#99582a] text-white text-sm font-semibold text-center py-3.5 rounded-lg transition-colors"
              >
                Commander →
              </Link>
              <Link
                href="/panier"
                onClick={closeDrawer}
                className="block w-full text-center text-sm text-stone-600 border border-stone-200 py-2.5 rounded-lg mt-2 hover:bg-stone-50 transition-colors"
              >
                Voir le panier complet
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
