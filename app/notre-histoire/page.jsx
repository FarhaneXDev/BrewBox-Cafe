// app/notre-histoire/page.jsx
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Notre histoire — BrewBox',
  description:
    "Découvrez l'histoire de BrewBox, notre passion pour le café de spécialité et notre engagement envers les producteurs.",
}

// ── Composant stat
function Stat({ value, label }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-[#bc6c25] tracking-tight">{value}</p>
      <p className="text-sm text-stone-500 mt-1">{label}</p>
    </div>
  )
}

// ── Composant valeur
function Value({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl border border-stone-100 p-5">
      <div className="w-10 h-10 rounded-lg bg-[#bc6c25]/10 flex items-center justify-center mb-4 text-lg">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-stone-900 mb-2">{title}</h3>
      <p className="text-sm text-stone-500 leading-relaxed">{description}</p>
    </div>
  )
}

// ── Composant étape timeline
function TimelineStep({ year, title, description, isLast }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#bc6c25] flex items-center justify-center flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-white" />
        </div>
        {!isLast && <div className="w-px flex-1 bg-stone-200 mt-2" />}
      </div>
      <div className="pb-10">
        <p className="text-xs font-bold text-[#bc6c25] uppercase tracking-widest mb-1">{year}</p>
        <h3 className="text-base font-semibold text-stone-900 mb-1">{title}</h3>
        <p className="text-sm text-stone-500 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default function NotreHistoirePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">

      {/* ── HERO SECTION */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#bc6c25] mb-4">
          <span className="w-6 h-px bg-[#bc6c25]" />
          Notre histoire
          <span className="w-6 h-px bg-[#bc6c25]" />
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-5">
          Une passion, <br />
          <span className="text-[#bc6c25]">une tasse à la fois.</span>
        </h1>
        <p className="text-base text-stone-500 leading-relaxed max-w-xl mx-auto">
          BrewBox est né d'une conviction simple : chaque tasse de café mérite d'être
          exceptionnelle. Nous sélectionnons les meilleurs grains du monde et les livrons
          directement chez vous.
        </p>
      </div>

      {/* ── IMAGE HERO */}
      <div className="w-full h-72 md:h-96 rounded-2xl bg-stone-800 overflow-hidden relative mb-16">
        <Image
          src="/images/notre-histoire-hero.jpg"
          alt="L'équipe BrewBox dans notre atelier de torréfaction"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-white font-semibold text-base">Notre atelier de torréfaction</p>
          <p className="text-white/60 text-sm">Fondé en 2021 · Cotonou, Bénin</p>
        </div>
      </div>

      {/* ── STATS */}
      <div className="grid grid-cols-3 gap-6 mb-16 py-10 border-y border-stone-100">
        <Stat value="12+" label="Origines dans le monde" />
        <Stat value="2 400+" label="Clients satisfaits" />
        <Stat value="4.9/5" label="Note moyenne" />
      </div>

      {/* ── NOTRE HISTOIRE — texte */}
      <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight mb-4">
            Tout a commencé par une mauvaise tasse.
          </h2>
          <p className="text-sm text-stone-500 leading-relaxed mb-4">
            En 2019, notre fondateur Thomas rentrait d'un voyage en Éthiopie avec une certitude :
            le café qu'il buvait chaque matin ne ressemblait en rien à ce qu'il avait goûté
            là-bas. Des arômes de jasmin, une douceur naturelle, une complexité qu'il ne
            soupçonnait pas.
          </p>
          <p className="text-sm text-stone-500 leading-relaxed mb-4">
            De retour à Cotonou, il s'est mis en tête de rendre ce café accessible. Pas le café
            industriel, mais le vrai — celui que les producteurs font avec soin, celui qui mérite
            qu'on s'y attarde.
          </p>
          <p className="text-sm text-stone-500 leading-relaxed">
            BrewBox est né de cette frustration et de cette ambition. Aujourd'hui nous sélectionnons
            directement nos grains auprès de producteurs partenaires en Éthiopie, Colombie, Kenya
            et Brésil, et nous les torréfions à la commande dans notre atelier.
          </p>
        </div>
        <div className="w-full h-64 md:h-80 rounded-2xl bg-stone-200 overflow-hidden relative">
          <Image
            src="/images/notre-histoire-fondateur.jpg"
            alt="Thomas, fondateur de BrewBox"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* ── TIMELINE */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight mb-10 text-center">
          Notre parcours
        </h2>
        <div className="max-w-lg mx-auto">
          <TimelineStep
            year="2019"
            title="Le déclic en Éthiopie"
            description="Un voyage qui change tout. Thomas découvre le café de spécialité et rentre avec une mission claire."
          />
          <TimelineStep
            year="2020"
            title="Les premiers essais"
            description="Premiers achats de grains verts, premier torréfacteur artisanal, premières recettes testées sur des amis."
          />
          <TimelineStep
            year="2021"
            title="Lancement de BrewBox"
            description="Ouverture officielle de la boutique en ligne. Les 100 premiers clients en moins de 3 semaines."
          />
          <TimelineStep
            year="2023"
            title="Atelier de torréfaction"
            description="Ouverture de notre propre atelier à Cotonou. Torréfaction à la commande, livraison sous 24h."
          />
          <TimelineStep
            year="2024"
            title="2 400 clients et counting"
            description="BrewBox livre aujourd'hui dans 6 pays. La mission reste la même : une tasse exceptionnelle pour chacun."
            isLast
          />
        </div>
      </div>

      {/* ── NOS VALEURS */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight mb-2 text-center">
          Ce en quoi nous croyons
        </h2>
        <p className="text-sm text-stone-500 text-center mb-8">
          Trois principes qui guident chaque décision chez BrewBox.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <Value
            icon="🌱"
            title="Traçabilité totale"
            description="Chaque produit indique son origine, son producteur, son altitude et son processus. Vous savez ce que vous buvez."
          />
          <Value
            icon="⚖️"
            title="Commerce équitable"
            description="Nos producteurs partenaires sont rémunérés au-dessus du prix du marché. Un café bon doit être un café juste."
          />
          <Value
            icon="☕"
            title="Fraîcheur garantie"
            description="Torréfaction à la commande, expédition sous 24h. Vous recevez votre café au pic de sa fraîcheur aromatique."
          />
        </div>
      </div>

      {/* ── CTA */}
      <div className="bg-stone-900 rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          Prêt à découvrir la différence ?
        </h2>
        <p className="text-stone-400 text-sm mb-6">
          Explorez notre sélection de cafés de spécialité, soigneusement choisis pour vous.
        </p>
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 bg-[#bc6c25] hover:bg-[#99582a] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          Voir le catalogue
          <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  )
}
