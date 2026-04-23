'use client'
// app/panier/page.jsx
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, Lock } from 'lucide-react'
import { useCartStore, FREE_SHIPPING_THRESHOLD } from '../../lib/cartStore'
import { formatPrice } from '../../lib/utils'

export default function PanierPage() {
  const {
    items,
    increment,
    decrement,
    removeItem,
    clearCart,
    getTotalItems,
    getSubtotal,
  } = useCartStore()

  const subtotal = getSubtotal()
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 2500
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 text-center px-6">
        <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center">
          <ShoppingBag size={30} className="text-stone-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-stone-900">Votre panier est vide</h1>
          <p className="text-sm text-stone-400 mt-2">Vous n'avez pas encore ajouté de produits.</p>
        </div>
        <Link
          href="/catalogue"
          className="bg-[#bc6c25] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#99582a] transition-colors"
        >
          Découvrir le catalogue
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-10">

      {/* En-tête */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/catalogue"
          className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft size={15} />
          Continuer mes achats
        </Link>
        <div className="h-4 w-px bg-stone-200" />
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
          Mon panier
          <span className="text-base font-normal text-stone-400 ml-2">
            ({getTotalItems()} article{getTotalItems() > 1 ? 's' : ''})
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Liste des articles */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {items.map((item) => (
            <div
              key={item.key}
              className="bg-white rounded-xl border border-stone-100 p-4 flex gap-4 items-center"
            >
              {/* Image */}
              <div className="w-20 h-20 rounded-lg bg-stone-800 flex-shrink-0 overflow-hidden relative">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag size={20} className="text-white/30" />
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-stone-900">{item.name}</p>
                {item.options && Object.keys(item.options).length > 0 && (
                  <p className="text-xs text-stone-400 mt-0.5">
                    {Object.values(item.options).join(' · ')}
                  </p>
                )}
                {/* Quantité */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => decrement(item.key)}
                    className="w-7 h-7 cursor-pointer rounded-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-bold text-stone-900 w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increment(item.key)}
                    className="w-7 h-7 cursor-pointer rounded-md border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Prix + supprimer */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <span className="text-base font-bold text-stone-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
                <button
                  onClick={() => removeItem(item.key)}
                  className="flex cursor-pointer items-center gap-1 text-xs text-stone-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={12} />
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          {/* Vider le panier */}
          <button
            onClick={clearCart}
            className="self-start cursor-pointer text-xs text-stone-400 hover:text-red-400 transition-colors underline underline-offset-2 mt-1"
          >
            Vider le panier
          </button>
        </div>

        {/* ── Récapitulatif commande */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-stone-100 p-5 sticky top-24">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">Récapitulatif</h2>

            {/* Lignes */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Sous-total</span>
                <span className="font-medium text-stone-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Livraison</span>
                <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-medium text-stone-900'}>
                  {shipping === 0 ? 'Offerte' : formatPrice(shipping)}
                </span>
              </div>
            </div>

            {/* Barre livraison gratuite */}
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <div className="mt-3">
                <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#bc6c25] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-[#bc6c25] mt-1.5">
                  Plus que {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} pour la livraison offerte
                </p>
              </div>
            )}

            {/* Code promo */}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Code promo"
                className="flex-1 border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-700 bg-stone-50 outline-none focus:border-[#bc6c25] transition-colors"
              />
              <button className="bg-stone-900 cursor-pointer text-white text-xs font-semibold px-3 rounded-lg hover:bg-stone-700 transition-colors">
                OK
              </button>
            </div>

            <div className="h-px bg-stone-100 my-4" />

            {/* Total */}
            <div className="flex justify-between items-center mb-5">
              <span className="text-sm font-semibold text-stone-900">Total</span>
              <span className="text-xl font-bold text-stone-900">{formatPrice(total)}</span>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              className="block w-full bg-[#bc6c25] hover:bg-[#99582a] text-white text-sm font-semibold text-center py-3.5 rounded-lg transition-colors"
            >
              Passer la commande →
            </Link>

            {/* Sécurité */}
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <Lock size={11} className="text-stone-300" />
              <span className="text-xs text-stone-400">Paiement 100% sécurisé</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
