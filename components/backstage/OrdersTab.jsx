'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

export default function OrdersTab() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState(null)
  const [newStatus, setNewStatus] = useState('')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/orders')
        if (res.ok) {
        const json = await res.json()
        setOrders(json.data || [])
        }
    } catch (err) {
      console.error('Erreur:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const openStatusModal = (order) => {
    setEditingOrder(order)
    setNewStatus(order.status)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingOrder(null)
  }

  const handleStatusChange = async () => {
    if (!editingOrder || newStatus === editingOrder.status) {
      closeModal()
      return
    }

    try {
      const res = await fetch(`/api/orders/${editingOrder.orderNumber}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        fetchOrders()
        closeModal()
      }
    } catch (err) {
      console.error('Erreur:', err)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800'
      case 'PROCESSING':
        return 'bg-purple-100 text-purple-800'
      case 'SHIPPED':
        return 'bg-indigo-100 text-indigo-800'
      case 'DELIVERED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-stone-100 text-stone-800'
    }
  }

  const getStatusLabel = (status) => {
    const labels = {
      PENDING: 'En attente',
      CONFIRMED: 'Confirmée',
      PROCESSING: 'En traitement',
      SHIPPED: 'Expédiée',
      DELIVERED: 'Livrée',
      CANCELLED: 'Annulée',
    }
    return labels[status] || status
  }

  return (
    <div className="p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-stone-900 mb-8">Commandes</h1>

      {isLoading ? (
        <p className="text-stone-600 text-center py-8">Chargement...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-stone-50 rounded-lg border border-stone-200">
          <p className="text-stone-600">Aucune commande pour le moment</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-stone-200 rounded-lg overflow-hidden hover:border-stone-300 transition-colors"
            >
              {/* Header - toujours visible */}
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="w-full p-4 cursor-pointer flex items-center justify-between hover:bg-stone-50 transition-colors"
              >
                <div className="flex-1 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                    <span className="font-semibold text-stone-900">{order.orderNumber}</span>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-stone-600 hidden sm:block">
                    {order.firstName} {order.lastName} • {order.email}
                  </p>
                  <p className="text-sm text-stone-600 sm:hidden">
                    {order.firstName} {order.lastName}
                  </p>
                </div>
                <ChevronDown
                  size={20}
                  className={`text-stone-400 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Détails - visible si expanded */}
              {expandedOrder === order.id && (
                <div className="border-t border-stone-200 bg-stone-50 p-4 space-y-4">
                  {/* Informations client */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-stone-700 uppercase mb-1">Client</h4>
                      <p className="text-sm text-stone-900 font-medium">
                        {order.firstName} {order.lastName}
                      </p>
                      <p className="text-sm text-stone-600">{order.email}</p>
                      <p className="text-sm text-stone-600">{order.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-stone-700 uppercase mb-1">Livraison</h4>
                      <p className="text-sm text-stone-900">{order.address}</p>
                      <p className="text-sm text-stone-600">
                        {order.city}, {order.country}
                      </p>
                    </div>
                  </div>

                  {/* Articles */}
                  <div>
                    <h4 className="text-xs font-semibold text-stone-700 uppercase mb-2">Articles</h4>
                    <div className="space-y-2 bg-white rounded border border-stone-200 p-3">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-stone-900">
                            {item.product?.name || 'Produit'} x{item.quantity}
                          </span>
                          <span className="font-medium text-stone-900">{item.price * item.quantity} FCFA</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Totaux */}
                  <div className="bg-white rounded border border-stone-200 p-3 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Sous-total:</span>
                      <span className="text-stone-900">{order.subtotal} FCFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Livraison:</span>
                      <span className="text-stone-900">{order.shipping} FCFA</span>
                    </div>
                    <div className="border-t border-stone-200 pt-1 flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-[#bc6c25]">{order.total} FCFA</span>
                    </div>
                  </div>

                  {/* Autres infos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-stone-600">Paiement:</span>
                      <p className="text-stone-900">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <span className="text-stone-600">Statut paiement:</span>
                      <p className="text-stone-900">{order.paymentStatus}</p>
                    </div>
                  </div>

                  {order.notes && (
                    <div className="bg-white rounded border border-stone-200 p-3">
                      <p className="text-xs font-semibold text-stone-700 uppercase mb-1">Notes</p>
                      <p className="text-sm text-stone-700">{order.notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => openStatusModal(order)}
                      className="flex-1 cursor-pointer px-3 py-2 bg-[#bc6c25] text-white rounded font-medium text-sm hover:bg-[#99582a] transition-colors"
                    >
                      Changer le statut
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal de changement de statut */}
      {isModalOpen && editingOrder && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="border-b border-stone-200 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-stone-900">Changer le statut</h2>
              <button onClick={closeModal} className="text-stone-500 hover:text-stone-700">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-stone-600">
                Commande <span className="font-semibold">{editingOrder.orderNumber}</span>
              </p>

              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full border border-stone-200 rounded px-3 py-2 focus:outline-none focus:border-[#bc6c25]"
              >
                <option value="PENDING">En attente</option>
                <option value="CONFIRMED">Confirmée</option>
                <option value="PROCESSING">En traitement</option>
                <option value="SHIPPED">Expédiée</option>
                <option value="DELIVERED">Livrée</option>
                <option value="CANCELLED">Annulée</option>
              </select>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border cursor-pointer border-stone-300 text-stone-900 rounded-lg hover:bg-stone-50 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={handleStatusChange}
                  className="px-4 py-2 cursor-pointer bg-[#bc6c25] text-white rounded-lg hover:bg-[#99582a] transition-colors font-medium"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
