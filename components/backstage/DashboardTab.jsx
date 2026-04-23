'use client'

import { useEffect, useState } from 'react'
import { Package, ShoppingCart, TrendingUp, AlertCircle } from 'lucide-react'

export default function DashboardTab() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      const [productsRes, ordersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
      ])

      const productsJson = productsRes.ok ? await productsRes.json() : { data: [] }
    const ordersJson = ordersRes.ok ? await ordersRes.json() : { data: [] }
    const products = productsJson.data || []
    const orders = ordersJson.data || []

      const pendingOrders = orders.filter((o) => o.status === 'PENDING').length
      const lowStockProducts = products.filter((p) => p.stock < 5).length

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders,
        lowStockProducts,
      })
    } catch (err) {
      setError('Erreur au chargement des statistiques')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      label: 'Articles',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Commandes',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'En attente',
      value: stats.pendingOrders,
      icon: TrendingUp,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      label: 'Stock faible',
      value: stats.lowStockProducts,
      icon: AlertCircle,
      color: 'bg-red-50 text-red-600',
    },
  ]

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-stone-900 mb-8">Tableau de bord</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className={`${card.color} rounded-lg p-6 border border-stone-200`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-75 mb-2">{card.label}</p>
                  <p className="text-3xl font-bold">{card.value}</p>
                </div>
                <Icon size={32} className="opacity-25" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-stone-50 rounded-lg border border-stone-200 p-6">
        <h2 className="text-lg font-bold text-stone-900 mb-4">Alertes</h2>

        {stats.lowStockProducts > 0 && (
          <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-3">
            <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-900">{stats.lowStockProducts} articles en stock faible</p>
              <p className="text-sm text-yellow-800 mt-1">Moins de 5 unités disponibles</p>
            </div>
          </div>
        )}

        {stats.pendingOrders > 0 && (
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <TrendingUp size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">{stats.pendingOrders} commandes en attente</p>
              <p className="text-sm text-blue-800 mt-1">À valider ou traiter</p>
            </div>
          </div>
        )}

        {stats.lowStockProducts === 0 && stats.pendingOrders === 0 && (
          <p className="text-stone-600 text-center py-4">Tout est à jour! ✨</p>
        )}
      </div>
    </div>
  )
}
