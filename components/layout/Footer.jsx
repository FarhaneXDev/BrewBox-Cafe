// components/layout/Footer.jsx
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-stone-900 text-stone-400 w-full">

      {/* Bande supérieure — CTA */}
      <div className="border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-6 md:px-[10%] py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white text-lg font-bold tracking-tight mb-1">
              Prêt à commander votre café ?
            </p>
            <p className="text-stone-400 text-sm">
              Livraison offerte dès 35 000 FCFA d'achat.
            </p>
          </div>
          <Link
            href="/catalogue"
            className="flex-shrink-0 bg-[#bc6c25] hover:bg-[#99582a] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Voir le catalogue →
          </Link>
        </div>
      </div>

      {/* Corps du footer */}
      <div className="max-w-6xl mx-auto px-6 md:px-[10%] py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Colonne 1 — Marque */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-xl font-bold text-[#bc6c25]">Brew</span>
              <span className="text-xl font-bold bg-white text-stone-900 px-1.5 rounded-md">Box</span>
              
            </div>
            <p className="text-sm leading-relaxed text-stone-500 mb-5">
              Café de spécialité soigneusement sélectionné, torréfié à la commande et livré directement chez vous.
            </p>
            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center hover:bg-[#bc6c25] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center hover:bg-[#bc6c25] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="#" className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center hover:bg-[#bc6c25] transition-colors">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Colonne 2 — Navigation */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Catalogue', href: '/catalogue' },
                { label: 'Notre histoire', href: '/notre-histoire' },
                { label: 'Guide du café', href: '/guide-du-cafe' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-stone-500 hover:text-[#bc6c25] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Catégories */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">Nos produits</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Cafés en grains', href: '/catalogue?category=cafes' },
                { label: 'Thés & infusions', href: '/catalogue?category=thes' },
                { label: 'Accessoires', href: '/catalogue?category=accessoires' },
                { label: 'Coffrets cadeaux', href: '/catalogue?category=coffrets' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-stone-500 hover:text-[#bc6c25] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Contact & Infos */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">Contact</p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-[#bc6c25] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-sm text-stone-500">Cotonou, Bénin</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-[#bc6c25] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="text-sm text-stone-500">contact@brewbox.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-[#bc6c25] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.29-1.29a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <span className="text-sm text-stone-500">+229 01 00 00 00 00</span>
              </li>
            </ul>

            {/* Horaires */}
            <div className="mt-5 p-3 bg-stone-800 rounded-lg">
              <p className="text-xs font-semibold text-white mb-1">Horaires de livraison</p>
              <p className="text-xs text-stone-500">Lun — Sam : 8h00 à 18h00</p>
              <p className="text-xs text-stone-500">Commande avant 14h → expédié le jour même</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bas du footer */}
      <div className="border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-6 md:px-[10%] py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-600">
            © {currentYear} BrewBox. Tous droits réservés.
          </p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-xs text-stone-600 hover:text-stone-400 transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="text-xs text-stone-600 hover:text-stone-400 transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="#" className="text-xs text-stone-600 hover:text-stone-400 transition-colors">
              CGV
            </Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
