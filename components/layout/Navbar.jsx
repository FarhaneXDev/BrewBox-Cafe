'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCartStore } from '../../lib/cartStore'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { openDrawer, items } = useCartStore()
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  // 🔥 Sticky au scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 🔥 helper pour lien actif
  const isActive = (path) => pathname === path

  return (
    <div className={`
      flex items-center justify-between pt-2 md:px-[10%] px-4
      fixed top-0 left-0 w-full z-50
      transition-all duration-300 pb-2
      ${isScrolled ? "backdrop-blur-md shadow-md bg-white/70" : "bg-transparent"}
    `}>

      <Link className='text-xl md:text-2xl font-bold flex items-center' href="/">
        <span className='text-[#bc6c25]'>Brew</span>
        <span className='bg-black text-white px-1 rounded'>Box</span>
      </Link>

      {/* Desktop menu */}
      <ul className='hidden gap-8 md:flex'>
        <li className={`duration-300 ${isActive("/") ? "text-[var(--primary)]" : "hover:text-[var(--primary)]"}`}>
          <Link href="/">Accueil</Link>
        </li>
        <li className={`duration-300 ${isActive("/catalogue") ? "text-[var(--primary)]" : "hover:text-[var(--primary)]"}`}>
          <Link href="/catalogue">Catalogue</Link>
        </li>
        <li className={`duration-300 ${isActive("/notre-histoire") ? "text-[var(--primary)]" : "hover:text-[var(--primary)]"}`}>
          <Link href="/notre-histoire">Notre histoire</Link>
        </li>
        <li className={`duration-300 ${isActive("/guide-du-cafe") ? "text-[var(--primary)]" : "hover:text-[var(--primary)]"}`}>
          <Link href="/guide-du-cafe">Guide du café</Link>
        </li>
      </ul>

      {/* Right side */}
      <div className='flex items-center gap-2 md:gap-4'>
        <div className='relative'>
          <ShoppingBag onClick={openDrawer} className='cursor-pointer' size={24} />
          {totalItems > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
              {totalItems}
            </span>
          )}
        </div>

        <Link href="/catalogue">
          <button className='hidden hover:-translate-y-2 duration-500 cursor-pointer font-bold md:block bg-[var(--primary)] text-[var(--text-color)] px-4 py-2 rounded-xl'>
            Commander
          </button>
        </Link>

        {/* Burger */}
        <button 
          className='md:hidden'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X/> : <Menu/>}
        </button>
      </div>

      {/* Overlay */}
      <div 
        onClick={() => setIsMenuOpen(false)}
        className={`
          fixed inset-0 bg-black/40 z-20 transition-opacity duration-300
          ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* Mobile menu */}
      <div className={`
        fixed top-0 right-0 z-30 h-screen w-[70%] max-w-sm
        bg-[var(--primary)]/80 backdrop-blur-sm
        transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        flex flex-col
      `}>
        <X 
          className='absolute top-4 right-4 cursor-pointer text-[var(--text-color)]'
          onClick={() => setIsMenuOpen(false)}
        />

        <ul className='flex flex-col gap-6 pt-24 px-6 text-[var(--text-color)] text-lg'>
          <li 
            className={`duration-300 ${isActive("/") ? "text-white font-bold" : "hover:-translate-y-2"}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Link href="/">Accueil</Link>
          </li>
          <li 
            className={`duration-300 ${isActive("/catalogue") ? "text-white font-bold" : "hover:-translate-y-2"}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Link href="/catalogue">Catalogue</Link>
          </li>
          <li 
            className={`duration-300 ${isActive("/notre-histoire") ? "text-white font-bold" : "hover:-translate-y-2"}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Link href="/notre-histoire">Notre histoire</Link>
          </li>
          <li 
            className={`duration-300 ${isActive("/guide-du-cafe") ? "text-white font-bold" : "hover:-translate-y-2"}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Link href="/guide-du-cafe">Guide du café</Link>
          </li>
        </ul>
      </div>

    </div>
  )
}