'use client'

import { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Plus, Trash2, Edit2, LogOut, Box, ShoppingCart, BarChart3 } from 'lucide-react'
import ProductsTab from '@/components/backstage/ProductsTab'
import OrdersTab from '@/components/backstage/OrdersTab'
import DashboardTab from '@/components/backstage/DashboardTab'

export default function BackstagePage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-stone-600">Chargement...</div>
      </div>
    )
  }

  const tabs = [
    { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
    { id: 'products', label: 'Articles', icon: Box },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart },
  ]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className='mt-30'>
            <p className="text-xs text-stone-500 mt-1">Administration</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-stone-900">{session?.user?.name}</p>
              <p className="text-xs text-stone-500">{session?.user?.role}</p>
            </div>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: '/backstage/login' })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
              <span className="hidden cursor-pointer sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden mb-6">
          <div className="flex flex-col sm:flex-row overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 cursor-pointer min-w-full sm:min-w-fit px-4 sm:px-6 py-4 border-b-2 font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-[#bc6c25] text-[#bc6c25] bg-orange-50'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'products' && <ProductsTab />}
          {activeTab === 'orders' && <OrdersTab />}
        </div>
      </div>
    </div>
  )
}
