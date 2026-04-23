'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '../../lib/utils'
import { useCartStore } from '../../lib/cartStore'
import { Star, ShoppingCart, Tag } from 'lucide-react'

const categoryLabels = {
  cafes: 'Cafés',
  thes: 'Thés & Infusions',
  accessoires: 'Accessoires',
  coffrets: 'Coffrets'
}

function ProductCard({ product }) {
  const { addItem, openDrawer } = useCartStore()
  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, { quantity: 1 })
    openDrawer()
  }

  return (
    <Link href={`/catalogue/${product.slug}`}>
      <div className="group cursor-pointer rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-48 md:h-56 bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex gap-2 flex-wrap">
            {product.isNew && (
              <span className="bg-(--primary) text-white text-xs px-3 py-1 rounded-full font-semibold">
                Nouveau
              </span>
            )}
            {discount && (
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex-1 flex flex-col">
          {/* Category */}
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
            {categoryLabels[product.category]}
          </p>

          {/* Product Name */}
          <h3 className="font-bold text-sm md:text-base line-clamp-2 mb-2 group-hover:text-(--primary) transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? 'fill-(--primary) text-(--primary)' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.reviewCount})</span>
          </div>

          {/* Stock Status */}
          <div className="mb-3">
            {product.stock > 0 ? (
              <span className="text-xs text-green-600 font-semibold">En stock</span>
            ) : (
              <span className="text-xs text-red-600 font-semibold">Rupture de stock</span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-lg md:text-lg font-bold">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-4 w-full cursor-pointer flex items-center justify-center gap-2 bg-(--primary) hover:bg-(--primary)/90 disabled:bg-gray-300 text-white py-2 px-3 rounded-lg font-semibold text-sm transition-colors"
          >
            <ShoppingCart size={16} />
            {product.stock > 0 ? 'Ajouter' : 'Rupture'}
          </button>
        </div>
      </div>
    </Link>
  )
}

export default function CataloguePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        if (!res.ok) throw new Error('Erreur lors du chargement des produits')
        const data = await res.json()
        setProducts(data.data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const categories = [
    { value: 'all', label: 'Tous les produits' },
    { value: 'cafes', label: 'Cafés' },
    { value: 'thes', label: 'Thés & Infusions' },
    { value: 'accessoires', label: 'Accessoires' },
    { value: 'coffrets', label: 'Coffrets' }
  ]

  const filteredProducts = products.length === 0 || selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen py-8 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-4 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Notre Catalogue</h1>
          <p className="text-gray-600 text-lg">
            Découvrez notre sélection de cafés, thés et accessoires de spécialité
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-700">
            Erreur : {error}
          </div>
        )}

        {/* Filters */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-lg cursor-pointer font-semibold text-sm md:text-base transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-(--primary) text-white shadow-lg'
                    : 'bg-white text-gray-800 border border-gray-200 hover:border-(--primary) hover:text-(--primary)'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Chargement des produits...</p>
          </div>
        )}

        {/* Products Count */}
        {!loading && (
          <div className="mb-6 md:mb-8">
            <p className="text-gray-600 font-semibold">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Aucun produit dans cette catégorie</p>
          </div>
        )}
      </div>
    </div>
  )
}
