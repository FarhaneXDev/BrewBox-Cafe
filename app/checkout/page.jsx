'use client'
// app/checkout/page.jsx
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Lock, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react'
import { useCartStore, FREE_SHIPPING_THRESHOLD } from '../../lib/cartStore'
import { formatPrice } from '../../lib/utils'

// ── Composant champ de formulaire
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

// ── Composant input stylisé
function Input({ error, ...props }) {
  return (
    <input
      className={`w-full border rounded-lg px-3 py-2.5 text-sm text-stone-800 bg-white outline-none
        transition-colors placeholder:text-stone-300
        ${error ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-[#bc6c25]'}`}
      {...props}
    />
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, getTotalItems, clearCart } = useCartStore()

  const subtotal = getSubtotal()
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 2500
  const total = subtotal + shipping

  // État du formulaire
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Bénin',
    notes: '',
    paymentMethod: 'mobile_money',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOrderSummary, setShowOrderSummary] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Effacer l'erreur du champ modifié
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // ── Validation
  const validate = () => {
    const newErrors = {}
    if (!form.firstName.trim()) newErrors.firstName = 'Champ requis'
    if (!form.lastName.trim()) newErrors.lastName = 'Champ requis'
    if (!form.email.trim()) newErrors.email = 'Champ requis'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email invalide'
    if (!form.phone.trim()) newErrors.phone = 'Champ requis'
    if (!form.address.trim()) newErrors.address = 'Champ requis'
    if (!form.city.trim()) newErrors.city = 'Champ requis'
    return newErrors
  }

  // ── Soumission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // Appel API pour créer la commande
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          subtotal,
          total,
          shipping,
          customer: form,
        }),
      })

      if (!res.ok) {
        throw new Error('Erreur lors de la création de la commande')
      }

      const data = await res.json()

      // Stocker les données de commande pour la page de confirmation
      sessionStorage.setItem('lastOrder', JSON.stringify({
        orderNumber: data.data.id,
        items,
        total,
        shipping,
        customer: form,
      }))

      clearCart()
      router.push('/confirmation')
    } catch (err) {
      console.error('Erreur:', err)
      setErrors({ submit: err.message || 'Erreur lors de la soumission' })
      setIsSubmitting(false)
    }
  }

  // Panier vide → rediriger
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <ShoppingBag size={32} className="text-stone-300" />
        <p className="text-sm font-semibold text-stone-800">Votre panier est vide</p>
        <Link href="/catalogue" className="bg-[#bc6c25] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#99582a] transition-colors">
          Voir le catalogue
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-10">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/panier"
          className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft size={15} />
          Retour au panier
        </Link>
        <div className="h-4 w-px bg-stone-200" />
        <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Finaliser la commande</h1>
      </div>

      {/* Résumé mobile — accordéon */}
      <div className="lg:hidden mb-6 bg-white rounded-xl border border-stone-100">
        <button
          onClick={() => setShowOrderSummary(!showOrderSummary)}
          className="w-full flex items-center justify-between px-4 py-3.5"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-[#bc6c25]">
            <ShoppingBag size={15} />
            {showOrderSummary ? 'Masquer' : 'Voir'} le récapitulatif ({getTotalItems()} article{getTotalItems() > 1 ? 's' : ''})
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-stone-900">{formatPrice(total)}</span>
            {showOrderSummary ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>
        </button>
        {showOrderSummary && (
          <div className="border-t border-stone-100 px-4 pb-4 pt-3">
            <OrderSummary items={items} subtotal={subtotal} shipping={shipping} total={total} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* ── FORMULAIRE (gauche) */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 flex flex-col gap-6">

          {/* Informations personnelles */}
          <section className="bg-white rounded-xl border border-stone-100 p-5">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">
              Informations personnelles
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Prénom" error={errors.firstName}>
                <Input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Paul"
                  error={errors.firstName}
                />
              </Field>
              <Field label="Nom" error={errors.lastName}>
                <Input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="deSOUZA"
                  error={errors.lastName}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="paul@exemple.com"
                  error={errors.email}
                />
              </Field>
              <Field label="Téléphone" error={errors.phone}>
                <Input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+229 01 97 00 00 00"
                  error={errors.phone}
                />
              </Field>
            </div>
          </section>

          {/* Adresse de livraison */}
          <section className="bg-white rounded-xl border border-stone-100 p-5">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">
              Adresse de livraison
            </h2>
            <div className="flex flex-col gap-4">
              <Field label="Adresse complète" error={errors.address}>
                <Input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Quartier, rue, numéro…"
                  error={errors.address}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Ville" error={errors.city}>
                  <Input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Cotonou"
                    error={errors.city}
                  />
                </Field>
                <Field label="Pays">
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-800 bg-white outline-none focus:border-[#bc6c25] transition-colors"
                  >
                    <option>Bénin</option>
                    <option>Togo</option>
                    <option>Côte d'Ivoire</option>
                    <option>Sénégal</option>
                    <option>France</option>
                    <option>Autre</option>
                  </select>
                </Field>
              </div>
              <Field label="Instructions de livraison (optionnel)">
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Point de repère, instructions particulières…"
                  rows={2}
                  className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-800 bg-white outline-none focus:border-[#bc6c25] transition-colors resize-none placeholder:text-stone-300"
                />
              </Field>
            </div>
          </section>

          {/* Mode de paiement */}
          <section className="bg-white rounded-xl border border-stone-100 p-5">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">
              Mode de paiement
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { value: 'mobile_money', label: 'Mobile Money', sub: 'MTN, Moov, Wave' },
                { value: 'cash', label: 'Paiement à la livraison', sub: 'Espèces uniquement' },
                { value: 'virement', label: 'Virement bancaire', sub: 'Délai de traitement 24-48h' },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors
                    ${form.paymentMethod === method.value
                      ? 'border-[#bc6c25] bg-[#bc6c25]/5'
                      : 'border-stone-200 hover:border-stone-300'
                    }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={form.paymentMethod === method.value}
                    onChange={handleChange}
                    className="accent-[#bc6c25]"
                  />
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{method.label}</p>
                    <p className="text-xs text-stone-400">{method.sub}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Bouton submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 cursor-pointer rounded-xl text-white font-bold text-base transition-all
              ${isSubmitting
                ? 'bg-stone-300 cursor-not-allowed'
                : 'bg-[#bc6c25] hover:bg-[#99582a] active:scale-[0.98]'
              }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Traitement en cours…
              </span>
            ) : (
              `Confirmer la commande — ${formatPrice(total)}`
            )}
          </button>

          {/* Note sécurité */}
          <div className="flex items-center justify-center gap-1.5">
            <Lock size={12} className="text-stone-300" />
            <span className="text-xs text-stone-400">Commande 100% sécurisée</span>
          </div>

        </form>

        {/* ── RÉCAP (droite) desktop uniquement */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="bg-white rounded-xl border border-stone-100 p-5 sticky top-24">
            <h2 className="text-sm font-semibold text-stone-900 mb-4">
              Votre commande ({getTotalItems()} article{getTotalItems() > 1 ? 's' : ''})
            </h2>
            <OrderSummary items={items} subtotal={subtotal} shipping={shipping} total={total} />
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Sous-composant récapitulatif partagé (mobile + desktop)
function OrderSummary({ items, subtotal, shipping, total }) {
  return (
    <>
      {/* Articles */}
      <div className="flex flex-col gap-3 mb-4">
        {items.map((item) => (
          <div key={item.key} className="flex gap-3 items-center">
            <div className="relative w-12 h-12 rounded-lg bg-stone-800 flex-shrink-0 overflow-hidden">
              {item.image ? (
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag size={14} className="text-white/30" />
                </div>
              )}
              {/* Badge quantité */}
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-stone-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-stone-800 truncate">{item.name}</p>
              {item.options && Object.keys(item.options).length > 0 && (
                <p className="text-xs text-stone-400">{Object.values(item.options).join(' · ')}</p>
              )}
            </div>
            <span className="text-xs font-semibold text-stone-800 flex-shrink-0">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="h-px bg-stone-100 mb-3" />

      {/* Totaux */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-stone-500">Sous-total</span>
          <span className="font-medium text-stone-800">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-500">Livraison</span>
          <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-medium text-stone-800'}>
            {shipping === 0 ? 'Offerte' : formatPrice(shipping)}
          </span>
        </div>
      </div>

      <div className="h-px bg-stone-100 my-3" />

      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-stone-900">Total</span>
        <span className="text-lg font-bold text-stone-900">{formatPrice(total)}</span>
      </div>
    </>
  )
}
