'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '../../../lib/utils'
import { useCartStore } from '../../../lib/cartStore'
import { Star, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react'

function ProductCard({ product }) {
  const discount = product && product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null
  
  const allImages = product.images?.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : ['/images/placeholder.jpg']

  return (
    <Link href={`/catalogue/${product.slug}`}>
      <div className="group cursor-pointer rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
          />
          {discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-bold text-sm line-clamp-2 group-hover:text-(--primary)">
            {product.name}
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedGrind, setSelectedGrind] = useState(null)
  const [selectedWeight, setSelectedWeight] = useState(null)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem, openDrawer } = useCartStore()
  
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Récupérer le slug depuis l'URL
  const [slug, setSlug] = useState('')
  
  useEffect(() => {
    const pathSegments = window.location.pathname.split('/')
    const productSlug = pathSegments[pathSegments.length - 1]
    setSlug(productSlug)
  }, [])

  // Récupérer le produit depuis l'API
  useEffect(() => {
    if (!slug) return

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`)
        if (!res.ok) throw new Error('Produit non trouvé')
        const data = await res.json()
        setProduct(data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [slug])

  // Récupérer les produits liés
  useEffect(() => {
    if (!product) return

    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch(`/api/products?category=${product.category}`)
        if (!res.ok) throw new Error('Erreur')
        const data = await res.json()
        const related = (data.data || [])
          .filter(p => p.id !== product.id)
          .slice(0, 4)
        setRelatedProducts(related)
      } catch (err) {
        console.error('Erreur récupération produits liés:', err)
      }
    }
    
    fetchRelatedProducts()
  }, [product])

  const handlePreviousImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const handleAddToCart = () => {
    addItem(product, { weight: selectedWeight, grind: selectedGrind, quantity })
    openDrawer()
  }

  // Vérification de chargement/erreur
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <Link href="/catalogue" className="text-(--primary) font-semibold hover:underline">
            ← Retour au catalogue
          </Link>
        </div>
      </div>
    )
  }

  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null

  // Construire le tableau des images (images + image principale)
  const allImages = product.images?.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : ['/images/placeholder.jpg']

  return (
    <div className="min-h-screen py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/catalogue" className="hover:text-(--primary)">Catalogue</Link>
          <span>/</span>
          <span className="text-(--primary) font-semibold">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
          {/* Images */}
          <div>
            <div className="relative bg-white rounded-lg overflow-hidden mb-4 h-96 md:h-[500px]">
              <Image
                src={allImages[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                    {selectedImage + 1} / {product.images.length}
                  </div>
                </>
              )}

              {/* Badge */}
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-(--primary) text-white text-xs px-3 py-1 rounded-full font-semibold">
                  Nouveau
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImage === idx ? 'border-(--primary)' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category */}
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? 'fill-(--primary) text-(--primary)' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">{product.rating} ({product.reviewCount} avis)</span>
            </div>

            {/* Price */}
            <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl md:text-4xl font-bold">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </div>
              {discount && (
                <p className="text-sm text-red-600 font-semibold">
                  Économisez {discount}% sur ce produit
                </p>
              )}
            </div>

            {/* Short Description */}
            <p className="text-gray-700 mb-6">
              {product.shortDescription}
            </p>

            {/* Options */}
            <div className="space-y-6 mb-8">
              {/* Grind Options */}
              {product.grindOptions && product.grindOptions.length > 0 && (
                <div>
                  <label className="block font-semibold text-gray-800 mb-3">
                    Mouture
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.grindOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedGrind(option)}
                        className={`py-2 px-3 cursor-pointer rounded-lg border-2 font-semibold text-sm transition-all ${
                          selectedGrind === option
                            ? 'bg-(--primary) text-white border-(--primary)'
                            : 'border-gray-200 text-gray-800 hover:border-(--primary)'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Weight Options */}
              {product.weightOptions && product.weightOptions.length > 0 && (
                <div>
                  <label className="block font-semibold text-gray-800 mb-3">
                    Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {product.weightOptions.map((weight) => (
                      <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight)}
                        className={`py-2 px-3 cursor-pointer rounded-lg border-2 font-semibold text-sm transition-all ${
                          selectedWeight === weight
                            ? 'bg-(--primary) text-white border-(--primary)'
                            : 'border-gray-200 text-gray-800 hover:border-(--primary)'
                        }`}
                      >
                        {weight}g
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block font-semibold text-gray-800 mb-3">
                  Quantité
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-l border-r border-gray-200 py-2 outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <p className="text-green-600 font-semibold">
                  ✓ {product.stock} produit(s) en stock
                </p>
              ) : (
                <p className="text-red-600 font-semibold">
                  Rupture de stock
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-(--primary) hover:bg-(--primary)/90 disabled:bg-gray-300 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                <ShoppingCart size={20} />
                Ajouter au panier
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Heart size={20} className={isWishlisted ? 'fill-(--primary) text-(--primary)' : 'text-gray-600'} />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Details */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
              {product.origin && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Origine</span>
                  <span className="font-semibold">{product.origin}</span>
                </div>
              )}
              {product.roast && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Torréfaction</span>
                  <span className="font-semibold">{product.roast}</span>
                </div>
              )}
              {product.process && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Processus</span>
                  <span className="font-semibold">{product.process}</span>
                </div>
              )}
              {product.altitude && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Altitude</span>
                  <span className="font-semibold">{product.altitude}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="bg-white rounded-lg p-6 md:p-8 mb-12 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Description complète</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            {product.description}
          </p>
        </div>

        {/* Tasting Notes */}
        {product.tastingNotes && product.tastingNotes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Notes de dégustation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {product.tastingNotes.map((note, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                  <p className="font-bold text-(--primary) text-lg">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
