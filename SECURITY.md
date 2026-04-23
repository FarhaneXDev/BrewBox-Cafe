# 🔒 Guide de Sécurité - Variables d'Environnement

## ⚠️ IMPORTANT: Ne JAMAIS commiter de secrets sur GitHub!

### Fichiers sensibles à exclure (déjà dans `.gitignore`):
- `.env.local` - Credentials de développement
- `.env.*.local` - Configurations locales
- `credentials.json` - Clés API
- `.ssh/` - Clés SSH

### Structure des fichiers:

```
.env.example     ← COMMITÉ (template pour les développeurs)
.env.local       ← IGNORÉ (tes secrets en local)
.env             ← IGNORÉ (secrets communs en dev)
```

### 🚀 Pour les nouveaux développeurs:

1. **Cloner le repo:**
```bash
git clone <repo-url>
cd miniecom
```

2. **Créer `.env.local` depuis l'exemple:**
```bash
cp .env.example .env.local
```

3. **Remplir avec tes valeurs:**
```env
# Créer des mots de passe forts pour ton environnement local
ADMIN_PASSWORD="SomeStrongPassword123!"
MODERATOR_PASSWORD="AnotherStrongPassword456!"
NEXTAUTH_SECRET="ARandomSecretKeyFor123LocalDev"
```

4. **Installer et seeder:**
```bash
pnpm install
pnpm exec prisma migrate dev
node prisma/seed-admin.js
```

### 🔐 Bonnes pratiques:

✅ **À FAIRE:**
- Utiliser des mots de passe forts en local
- Garder `.env.local` en privé
- Changer les passwords en production
- Utiliser un gestionnaire de secrets (Doppler, 1Password, etc.)
- Régulièrement mettre à jour les mots de passe
- Utiliser des clés API uniques par environnement

❌ **À NE PAS FAIRE:**
- Commiter `.env.local` ou `.env`
- Mettre des secrets en clair dans le code
- Utiliser les mêmes passwords en dev et prod
- Pousser des credentials sur GitHub/GitLab
- Partager les `.env` files par email/chat

### 🏢 En Production:

**Utiliser des solutions de gestion de secrets:**
- **Vercel Secrets** (pour deployer sur Vercel)
- **Doppler** (gestion centralisée)
- **AWS Secrets Manager** (pour AWS)
- **HashiCorp Vault** (enterprise)
- **GitHub Secrets** (CI/CD)

### 📋 Checklist avant de pousser sur GitHub:

```bash
# Vérifier qu'aucun .env n'est commité
git status

# Voir ce qui va être poussé
git diff --cached

# Vérifier le .gitignore
cat .gitignore | grep env

# Vérifier l'historique (au cas où)
git log --name-status | grep .env
```

---

**Questions?** Consulte le README.md ou demande aux mainteneurs!
