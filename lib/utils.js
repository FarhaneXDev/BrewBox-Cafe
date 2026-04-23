// lib/utils.js
export function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(price) + " FCFA"
}