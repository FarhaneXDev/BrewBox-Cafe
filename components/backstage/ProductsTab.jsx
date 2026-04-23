'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

export default function ProductsTab() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [form, setForm] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    price: '',
    stock: '',
    category: 'cafes',
    image: '',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/products')
        if (res.ok) {
        const json = await res.json()
        setProducts(json.data || [])
        }
    } catch (err) {
      console.error('Erreur:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setForm({
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        image: product.image || '',
      })
    } else {
      setEditingProduct(null)
      setForm({
        name: '',
        slug: '',
        shortDescription: '',
        description: '',
        price: '',
        stock: '',
        category: 'cafes',
        image: '',
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        fetchProducts()
        closeModal()
      }
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr?')) return

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchProducts()
      }
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingImage(true)
    try {
        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        })

        const json = await res.json()
        if (json.success) {
        setForm(prev => ({ ...prev, image: json.url }))
        } else {
        alert(json.error || 'Erreur lors de l\'upload')
        }
    } catch (err) {
        console.error('Upload error:', err)
        alert('Erreur lors de l\'upload')
    } finally {
        setUploadingImage(false)
    }
    }

  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-stone-900">Articles</h1>
        <button
          onClick={() => openModal()}
          className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-[#bc6c25] text-white rounded-lg hover:bg-[#99582a] transition-colors text-sm font-medium w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          Nouvel article
        </button>
      </div>

      {isLoading ? (
        <p className="text-stone-600 text-center py-8">Chargement...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-stone-50 rounded-lg border border-stone-200">
          <p className="text-stone-600">Aucun article pour le moment</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="text-left py-3 px-4 font-semibold text-stone-900">Nom</th>
                <th className="text-left py-3 px-4 font-semibold text-stone-900 hidden sm:table-cell">Catégorie</th>
                <th className="text-left py-3 px-4 font-semibold text-stone-900">Prix</th>
                <th className="text-left py-3 px-4 font-semibold text-stone-900 hidden md:table-cell">Stock</th>
                <th className="text-right py-3 px-4 font-semibold text-stone-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="py-3 px-4">
                    <p className="font-medium text-stone-900">{product.name}</p>
                    <p className="text-xs text-stone-500">{product.slug}</p>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className="text-stone-600">{product.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-stone-900">{product.price} FCFA</span>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        product.stock > 5
                          ? 'bg-green-100 text-green-700'
                          : product.stock > 0
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(product)}
                        className="p-2 text-blue-600 cursor-pointer hover:bg-blue-50 rounded transition-colors"
                        title="Modifier"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 cursor-pointer hover:bg-red-50 rounded transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-stone-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-stone-900">
                {editingProduct ? 'Modifier l\'article' : 'Nouvel article'}
              </h2>
              <button onClick={closeModal} className="text-stone-500 cursor-pointer hover:text-stone-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nom du produit"
                  value={form.name}
                  onChange={handleChange}
                  className="border border-stone-200 rounded px-3 py-2 w-full text-sm focus:outline-none focus:border-[#bc6c25]"
                  required
                />
                <input
                  type="text"
                  name="slug"
                  placeholder="Slug (URL-friendly)"
                  value={form.slug}
                  onChange={handleChange}
                  className="border border-stone-200 rounded px-3 py-2 w-full text-sm focus:outline-none focus:border-[#bc6c25]"
                  required
                />
              </div>

              <input
                type="text"
                name="shortDescription"
                placeholder="Description courte"
                value={form.shortDescription}
                onChange={handleChange}
                className="border border-stone-200 rounded px-3 py-2 w-full text-sm focus:outline-none focus:border-[#bc6c25]"
                required
              />

              <textarea
                name="description"
                placeholder="Description complète"
                value={form.description}
                onChange={handleChange}
                rows="3"
                className="border border-stone-200 rounded px-3 py-2 w-full text-sm focus:outline-none focus:border-[#bc6c25]"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="border border-stone-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#bc6c25]"
                >
                  <option value="cafes">Cafés</option>
                  <option value="thes">Thés</option>
                  <option value="accessoires">Accessoires</option>
                  <option value="coffrets">Coffrets</option>
                </select>

                <input
                  type="number"
                  name="price"
                  placeholder="Prix (FCFA)"
                  value={form.price}
                  onChange={handleChange}
                  className="border border-stone-200 rounded px-3 py-2 w-full text-sm focus:outline-none focus:border-[#bc6c25]"
                  required
                />

                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="border border-stone-200 rounded px-3 py-2 w-full text-sm focus:outline-none focus:border-[#bc6c25]"
                  required
                />
              </div>

              {/* Upload image */}
                <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
                    Image du produit
                </label>

                {/* Preview */}
                {form.image && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-stone-200">
                    <img
                        src={form.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, image: '' }))}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                    >
                        <X size={12} />
                    </button>
                    </div>
                )}

                {/* Input file */}
                {!form.image && (
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-stone-300 rounded-lg cursor-pointer hover:border-[#bc6c25] hover:bg-orange-50 transition-colors">
                    <div className="flex flex-col items-center gap-1">
                        <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-stone-500">Cliquer pour uploader</p>
                        <p className="text-xs text-stone-400">JPG, PNG, WebP</p>
                    </div>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                    </label>
                )}

                {uploadingImage && (
                    <p className="text-xs text-[#bc6c25] animate-pulse">Upload en cours...</p>
                )}
                </div>

              <div className="flex gap-3 pt-4 justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-stone-300 text-stone-900 rounded-lg hover:bg-stone-50 transition-colors text-sm font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 cursor-pointer bg-[#bc6c25] text-white rounded-lg hover:bg-[#99582a] transition-colors text-sm font-medium"
                >
                  {editingProduct ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
