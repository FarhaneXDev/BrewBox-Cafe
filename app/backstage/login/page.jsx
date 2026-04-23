'use client'
// app/admin/login/page.jsx
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    if (result?.error) {
      setError('Email ou mot de passe incorrect.')
      setIsLoading(false)
      return
    }

    router.push('/backstage')
    router.refresh()
  }

  return (
    <div className="min-h-screen mt-5 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center my-14">
          <div className="inline-flex items-center gap-1 mb-3">
            <span className="text-2xl font-bold text-[#bc6c25]">Brew</span>
            <span className="text-2xl font-bold bg-stone-900 text-white px-1.5 rounded-md">Box</span>
          </div>
          <p className="text-sm text-stone-500">Espace administration</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-stone-100 p-8">
          <h1 className="text-lg font-bold text-stone-900 mb-1">Connexion</h1>
          <p className="text-sm text-stone-400 mb-6">Accès réservé aux administrateurs.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Admin login"
                  required
                  className="w-full border border-stone-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-stone-800 outline-none focus:border-[#bc6c25] transition-colors"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
                Mot de passe
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full border border-stone-200 rounded-lg pl-9 pr-10 py-2.5 text-sm text-stone-800 outline-none focus:border-[#bc6c25] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Erreur */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
                <p className="text-xs text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 cursor-pointer rounded-xl text-white font-semibold text-sm transition-all mt-1
                ${isLoading
                  ? 'bg-stone-300 cursor-not-allowed'
                  : 'bg-[#bc6c25] hover:bg-[#99582a] active:scale-[0.98]'
                }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Connexion...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>

          </form>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          BrewBox Admin — accès sécurisé
        </p>

      </div>
    </div>
  )
}
