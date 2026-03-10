# BroadTVApp — Landing Page

Sitio web oficial de [BroadTVApp](https://broadtvapp.com).  
Stack: **React + Vite** · Deploy: **Vercel** · Repo: **GitHub**

---

## 🚀 Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## 🏗️ Build de producción

```bash
npm run build
npm run preview   # para revisar el build localmente
```

## 📦 Deploy en Vercel (pasos)

1. Sube este repositorio a GitHub (`broadtvapp-site`)
2. Ve a [vercel.com](https://vercel.com) → **New Project**
3. Importa el repositorio de GitHub
4. Vercel detecta Vite automáticamente:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clic en **Deploy** ✅
6. Conecta tu dominio `broadtvapp.com` en **Settings → Domains**

Cada push a `main` → deploy automático en Vercel.

---

## 📁 Estructura

```
src/
  components/
    Navbar.jsx
    Hero.jsx
    Logos.jsx
    Features.jsx
    HowItWorks.jsx
    Pricing.jsx
    Testimonials.jsx
    CTA.jsx
    Footer.jsx
  App.jsx
  main.jsx
  styles.css
```
