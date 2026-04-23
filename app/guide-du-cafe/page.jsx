// app/guide-du-cafe/page.jsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Guide du café — BrewBox',
  description:
    'Tout ce que vous devez savoir sur le café de spécialité : méthodes de préparation, glossaire, conseils de conservation.',
}

// ── Données des méthodes de préparation
const methods = [
  {
    id: 'v60',
    name: 'V60 — Pour-over',
    duration: '3 à 4 min',
    difficulty: 'Intermédiaire',
    difficultyColor: 'text-amber-600 bg-amber-50',
    result: 'Tasse claire, arômes nets',
    description:
      "Le V60 est la méthode filtre de référence des baristas. Elle met en valeur la complexité aromatique des cafés d'origine unique.",
    steps: [
      "Rincer le filtre à l'eau chaude",
      "Doser 15g de café pour 250ml d'eau à 93°C",
      'Verser 30ml en cercles, attendre 30s (bloom)',
      'Verser le reste en 3 fois sur 3 minutes',
    ],
    grind: 'Mouture moyenne-fine',
    ratio: '1:16',
  },
  {
    id: 'chemex',
    name: 'Chemex',
    duration: '4 à 5 min',
    difficulty: 'Intermédiaire',
    difficultyColor: 'text-amber-600 bg-amber-50',
    result: 'Tasse propre, très claire',
    description:
      "La Chemex utilise des filtres épais qui retiennent les huiles et donnent une tasse d'une clarté exceptionnelle. Idéale pour les cafés fruités.",
    steps: [
      "Placer le filtre (côté triple vers le bec)",
      "Rincer abondamment à l'eau chaude",
      "Doser 30g de café pour 500ml d'eau à 93°C",
      "Bloom 45s, puis verser en spirale toutes les 45s",
    ],
    grind: 'Mouture moyenne-grossière',
    ratio: '1:16',
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    duration: '1 à 2 min',
    difficulty: 'Facile',
    difficultyColor: 'text-green-600 bg-green-50',
    result: 'Concentré, corps généreux',
    description:
      "L'AeroPress est la méthode la plus forgiving. Rapide, compacte, elle pardonne les imprécisions et produit un café concentré et savoureux.",
    steps: [
      "Rincer le filtre, assembler l'AeroPress en position inversée",
      "Doser 17g de café, eau à 85°C",
      "Verser 250ml, remuer 10 secondes",
      "Infuser 1 min, retourner et presser doucement",
    ],
    grind: 'Mouture fine à moyenne',
    ratio: '1:15',
  },
  {
    id: 'cafetiere',
    name: 'Cafetière à piston',
    duration: '4 min',
    difficulty: 'Facile',
    difficultyColor: 'text-green-600 bg-green-50',
    result: 'Corps plein, riche en huiles',
    description:
      "La French Press est la méthode d'immersion la plus simple. Elle donne un café corpulent avec une belle texture, idéal le matin.",
    steps: [
      "Préchauffer la cafetière avec de l'eau chaude",
      "Doser 30g de café grossièrement moulu pour 500ml",
      "Eau à 93°C, remuer légèrement",
      "Infuser 4 minutes, presser lentement",
    ],
    grind: 'Mouture grossière',
    ratio: '1:16',
  },
]

// ── Données glossaire
const glossaryTerms = [
  {
    term: 'Café de spécialité',
    definition:
      'Café ayant obtenu un score supérieur à 80/100 selon les critères de la SCA (Specialty Coffee Association). Moins de 10% de la production mondiale.',
  },
  {
    term: 'Single origin',
    definition:
      "Café provenant d'une seule région, ferme ou coopérative. Permet de tracer précisément l'origine et d'apprécier les caractéristiques du terroir.",
  },
  {
    term: 'Torréfaction',
    definition:
      "Processus de chauffage des grains verts entre 180°C et 230°C qui développe les arômes. Plus elle est claire, plus les arômes fruités sont préservés.",
  },
  {
    term: 'Bloom',
    definition:
      "Pré-infusion de 30 à 45 secondes au début de la préparation filtre. L'eau libère le CO₂ emprisonné dans les grains frais, améliorant l'extraction.",
  },
  {
    term: 'Ratio',
    definition:
      "Rapport entre la dose de café et la quantité d'eau. Un ratio 1:16 signifie 1g de café pour 16ml d'eau. Plus le ratio est bas, plus la tasse est concentrée.",
  },
  {
    term: 'Processus naturel',
    definition:
      "Méthode de traitement où le grain sèche encore dans le fruit. Donne des cafés plus fruités et sucrés, avec un corps généreux.",
  },
  {
    term: 'Processus lavé',
    definition:
      "Le fruit est retiré avant séchage. Donne des cafés plus nets, plus acides, qui expriment davantage le terroir de leur origine.",
  },
  {
    term: 'Notes de dégustation',
    definition:
      "Arômes et saveurs perçus dans le café. Ne sont pas des arômes ajoutés — ils émergent naturellement du terroir, de la variété et de la torréfaction.",
  },
]

// ── Composant méthode
function MethodCard({ method }) {
  return (
    <div className="bg-white rounded-xl border border-stone-100 overflow-hidden">
      <div className="p-5 border-b border-stone-100">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-base font-bold text-stone-900">{method.name}</h3>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${method.difficultyColor}`}>
            {method.difficulty}
          </span>
        </div>
        <p className="text-sm text-stone-500 leading-relaxed mb-4">{method.description}</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-stone-50 rounded-lg p-2.5 text-center">
            <p className="text-xs text-stone-400 mb-0.5">Durée</p>
            <p className="text-xs font-semibold text-stone-800">{method.duration}</p>
          </div>
          <div className="bg-stone-50 rounded-lg p-2.5 text-center">
            <p className="text-xs text-stone-400 mb-0.5">Mouture</p>
            <p className="text-xs font-semibold text-stone-800">{method.grind.split(' ')[0]}</p>
          </div>
          <div className="bg-stone-50 rounded-lg p-2.5 text-center">
            <p className="text-xs text-stone-400 mb-0.5">Ratio</p>
            <p className="text-xs font-semibold text-stone-800">{method.ratio}</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">Étapes</p>
        <ol className="flex flex-col gap-2">
          {method.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-stone-600">
              <span className="w-5 h-5 rounded-full bg-[#bc6c25]/10 text-[#bc6c25] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default function GuideDuCafePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">

      {/* ── HEADER */}
      <div className="text-center mb-14">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#bc6c25] mb-4">
          <span className="w-6 h-px bg-[#bc6c25]" />
          Guide du café
          <span className="w-6 h-px bg-[#bc6c25]" />
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-5">
          Tout ce que vous devez<br />
          <span className="text-[#bc6c25]">savoir sur le café.</span>
        </h1>
        <p className="text-base text-stone-500 leading-relaxed max-w-xl mx-auto">
          Méthodes de préparation, glossaire, conseils de conservation — tout ce qu'il faut
          pour tirer le meilleur de votre café BrewBox.
        </p>
      </div>

      {/* ── CONSERVATION */}
      <div className="bg-stone-900 rounded-2xl p-6 md:p-8 mb-14">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-lg bg-[#bc6c25] flex items-center justify-center flex-shrink-0 text-lg">
            ☕
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Conservation — les règles d'or</h2>
            <p className="text-sm text-stone-400">
              Un café mal conservé perd ses arômes en quelques jours. Voici comment préserver votre investissement.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { do: true, text: 'Conserver dans un récipient hermétique opaque' },
            { do: true, text: "Garder à température ambiante, à l'abri de la lumière" },
            { do: true, text: 'Moudre juste avant la préparation' },
            { do: true, text: 'Consommer dans les 4 semaines après ouverture' },
            { do: false, text: 'Ne pas réfrigérer (condensation nuit aux arômes)' },
            { do: false, text: 'Ne pas exposer à la chaleur ou à la lumière directe' },
            { do: false, text: 'Éviter les récipients en verre transparents' },
            { do: false, text: 'Ne pas moudre en avance trop longtemps' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                ${item.do ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {item.do ? '✓' : '✕'}
              </span>
              <span className="text-sm text-stone-300">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MÉTHODES */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight mb-2">
          Méthodes de préparation
        </h2>
        <p className="text-sm text-stone-500 mb-8">
          Chaque méthode révèle différentes facettes d'un même café. Explorez, expérimentez.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {methods.map((method) => (
            <MethodCard key={method.id} method={method} />
          ))}
        </div>
      </div>

      {/* ── GLOSSAIRE */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight mb-2">
          Glossaire du café
        </h2>
        <p className="text-sm text-stone-500 mb-8">
          Les termes essentiels pour comprendre le café de spécialité.
        </p>
        <div className="flex flex-col divide-y divide-stone-100">
          {glossaryTerms.map((item) => (
            <div key={item.term} className="py-4 grid md:grid-cols-3 gap-2">
              <p className="text-sm font-semibold text-stone-900">{item.term}</p>
              <p className="text-sm text-stone-500 leading-relaxed md:col-span-2">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA */}
      <div className="bg-[#bc6c25]/5 border border-[#bc6c25]/20 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-stone-900 mb-2">
          Prêt à mettre en pratique ?
        </h2>
        <p className="text-sm text-stone-500 mb-6">
          Découvrez notre sélection de cafés de spécialité et les accessoires pour bien les préparer.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/catalogue"
            className="inline-flex items-center justify-center gap-2 bg-[#bc6c25] hover:bg-[#99582a] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Voir les cafés
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/catalogue?category=accessoires"
            className="inline-flex items-center justify-center gap-2 border border-stone-200 text-stone-700 font-semibold px-6 py-3 rounded-xl hover:bg-white transition-colors text-sm"
          >
            Voir les accessoires
          </Link>
        </div>
      </div>

    </div>
  )
}
