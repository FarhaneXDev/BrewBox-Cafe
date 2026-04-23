'use client'
// app/confirmation/page.jsx
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react'
import { formatPrice } from '../../lib/utils'

export default function ConfirmationPage() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('lastOrder')
    if (stored) {
      setOrder(JSON.parse(stored))
      sessionStorage.removeItem('lastOrder')
    }
  }, [])

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-sm text-stone-500">Aucune commande trouvée.</p>
        <Link href="/" className="text-sm font-semibold text-[#bc6c25] hover:underline">
          Retour à l'accueil
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">

      {/* Icône succès */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle size={40} className="text-green-500" />
        </div>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-stone-900 tracking-tight mb-2">
        Commande confirmée !
      </h1>
      <p className="text-stone-500 text-sm mb-1">
        Merci <span className="font-semibold text-stone-800">{order.customer.firstName}</span>, votre commande a bien été reçue.
      </p>
      <p className="text-xs text-stone-400 mb-8">
        Numéro de commande : <span className="font-mono font-semibold text-stone-600">{order.orderNumber}</span>
      </p>

      {/* Étapes suivantes */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-stone-100 p-4 text-left">
          <div className="w-9 h-9 rounded-lg bg-[#bc6c25]/10 flex items-center justify-center mb-3">
            <Mail size={17} className="text-[#bc6c25]" />
          </div>
          <p className="text-sm font-semibold text-stone-900 mb-1">Email de confirmation</p>
          <p className="text-xs text-stone-400 leading-relaxed">
            Un récapitulatif a été envoyé à <span className="font-medium text-stone-600">{order.customer.email}</span>
          </p>
        </div>
        <div className="bg-white rounded-xl border border-stone-100 p-4 text-left">
          <div className="w-9 h-9 rounded-lg bg-[#bc6c25]/10 flex items-center justify-center mb-3">
            <Package size={17} className="text-[#bc6c25]" />
          </div>
          <p className="text-sm font-semibold text-stone-900 mb-1">Expédition sous 24h</p>
          <p className="text-xs text-stone-400 leading-relaxed">
            Livraison prévue à <span className="font-medium text-stone-600">{order.customer.city}</span> sous 2 à 4 jours ouvrés.
          </p>
        </div>
      </div>

      {/* Récap commande */}
      <div className="bg-white rounded-xl border border-stone-100 p-5 text-left mb-8">
        <h2 className="text-sm font-semibold text-stone-900 mb-4">Récapitulatif</h2>
        <div className="flex flex-col gap-2.5">
          {order.items.map((item) => (
            <div key={item.key} className="flex justify-between items-center text-sm">
              <div>
                <span className="font-medium text-stone-800">{item.name}</span>
                {item.options && Object.keys(item.options).length > 0 && (
                  <span className="text-stone-400 text-xs ml-2">
                    {Object.values(item.options).join(' · ')}
                  </span>
                )}
                <span className="text-stone-400 ml-1">× {item.quantity}</span>
              </div>
              <span className="font-semibold text-stone-800">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="h-px bg-stone-100 my-3" />
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-stone-900">Total payé</span>
          <span className="text-lg font-bold text-stone-900">{formatPrice(order.total)}</span>
        </div>
      </div>

      {/* Adresse */}
      <div className="bg-stone-50 rounded-xl p-4 text-left mb-8 text-sm">
        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">Livraison à</p>
        <p className="font-semibold text-stone-900">{order.customer.firstName} {order.customer.lastName}</p>
        <p className="text-stone-500">{order.customer.address}</p>
        <p className="text-stone-500">{order.customer.city}, {order.customer.country}</p>
        <p className="text-stone-500">{order.customer.phone}</p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/catalogue"
          className="flex items-center justify-center gap-2 bg-[#bc6c25] hover:bg-[#99582a] text-white font-semibold text-sm px-8 py-3.5 rounded-xl transition-colors"
        >
          Continuer mes achats
          <ArrowRight size={15} />
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center text-sm font-semibold text-stone-600 border border-stone-200 px-8 py-3.5 rounded-xl hover:bg-stone-50 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>

    </div>
  )
}
