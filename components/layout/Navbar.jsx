'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className='flex items-center justify-between pt-2 relative'>

      {/* Logo */}
      <Link className='text-2xl font-bold flex items-center' href="/">
        <span className='text-[#bc6c25]'>Brew</span>
        <span className='bg-black text-white px-1 rounded'>Box</span>
      </Link>

      {/* Desktop menu */}
      <ul className='hidden gap-8 md:flex'>
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/catalogue">Catalogue</Link></li>
        <li><Link href="/notre-histoire">Notre histoire</Link></li>
        <li><Link href="/guide-du-cafe">Guide du café</Link></li>
      </ul>

      {/* Button + burger */}
      <div className='flex items-center gap-4'>
        <button className='hidden md:block bg-(--primary) text-(--text-color) px-4 py-2 rounded-xl'>
          Commander
        </button>

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
        bg-(--primary)/80 backdrop-blur-sm
        transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        flex flex-col
      `}>
        <X 
          className='absolute top-4 right-4 cursor-pointer text-(--text-color)'
          onClick={() => setIsMenuOpen(false)}
        />

        <ul className='flex flex-col gap-6 pt-24 px-6 text-(--text-color) text-lg'>
          <li className='hover:-translate-y-2 duration-300' onClick={() => setIsMenuOpen(false)}>
            <Link href="/">Accueil</Link>
          </li>
          <li className='hover:-translate-y-2 duration-300' onClick={() => setIsMenuOpen(false)}>
            <Link href="/catalogue">Catalogue</Link>
          </li>
          <li className='hover:-translate-y-2 duration-300' onClick={() => setIsMenuOpen(false)}>
            <Link href="/notre-histoire">Notre histoire</Link>
          </li>
          <li className='hover:-translate-y-2 duration-300' onClick={() => setIsMenuOpen(false)}>
            <Link href="/guide-du-cafe">Guide du café</Link>
          </li>
        </ul>
      </div>

    </div>
  )
}