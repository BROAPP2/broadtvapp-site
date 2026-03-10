import { useState, useEffect } from 'react'

const tx = {
  es: { links:[['#features','Producto'],['#how','Cómo funciona'],['#pricing','Precios'],['#contacto','Contacto']], demo:'Agenda una Demo' },
  en: { links:[['#features','Product'],['#how','How it works'],['#pricing','Pricing'],['#contacto','Contact']], demo:'Book a Demo' },
}

export default function Navbar({ lang, setLang, openDemo }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const t = tx[lang]

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <style>{`
        .nav {
          position:fixed; top:0; left:0; right:0; z-index:200;
          padding:14px 48px;
          transition: background 0.4s, padding 0.35s, border-color 0.4s, box-shadow 0.4s;
          border-bottom:1px solid transparent;
        }
        .nav.scrolled {
          background:rgba(6,9,15,0.88);
          backdrop-filter:blur(20px) saturate(160%);
          -webkit-backdrop-filter:blur(20px) saturate(160%);
          padding:10px 48px;
          border-color:rgba(255,255,255,0.07);
          box-shadow:0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.3);
        }
        .nav-inner {
          max-width:1160px; margin:0 auto;
          display:flex; align-items:center; justify-content:space-between; gap:16px;
        }
        .nav-logo {
          display:flex; align-items:center; text-decoration:none; flex-shrink:0;
        }
        .nav-logo-img {
          height:44px; width:auto;
          object-fit:contain;
          filter: drop-shadow(0 2px 14px rgba(129,80,248,0.45));
          transition: filter 0.3s;
        }
        .nav-logo:hover .nav-logo-img {
          filter: drop-shadow(0 2px 20px rgba(129,80,248,0.7));
        }
        .nav-logo-text-img {
          height:18px; width:auto;
          object-fit:contain;
          filter: drop-shadow(0 1px 6px rgba(80,200,248,0.35));
          transition: filter 0.3s;
        }
        .nav-logo:hover .nav-logo-text-img {
          filter: drop-shadow(0 1px 10px rgba(80,200,248,0.6));
        }

        .nav-links { display:flex; align-items:center; gap:6px; }
        .nav-links a {
          font-size:0.84rem; font-weight:600; color:var(--muted);
          text-decoration:none; padding:6px 12px; border-radius:7px;
          transition:color 0.2s, background 0.2s;
        }
        .nav-links a:hover { color:var(--white); background:rgba(255,255,255,0.06); }

        .nav-right { display:flex; align-items:center; gap:10px; }

        .lang-toggle {
          display:flex; align-items:center;
          background:rgba(255,255,255,0.05); border:1px solid var(--border-s);
          border-radius:7px; overflow:hidden; flex-shrink:0;
        }
        .lang-btn {
          padding:6px 11px; font-size:0.74rem; font-weight:700; letter-spacing:0.05em;
          background:none; border:none; color:var(--muted); cursor:pointer;
          transition:all 0.2s;
        }
        .lang-btn.active { background:var(--accent); color:#fff; }
        .lang-btn:not(.active):hover { color:var(--white); }

        .hamburger {
          display:none; flex-direction:column; gap:5px;
          background:none; border:none; cursor:pointer; padding:5px; z-index:300;
        }
        .hamburger span {
          display:block; width:21px; height:2px; background:var(--white);
          border-radius:2px; transition:transform 0.28s, opacity 0.28s;
        }
        .hamburger.open span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2){ opacity:0; }
        .hamburger.open span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }

        .mobile-menu {
          display:none; position:fixed; inset:0; background:var(--deep); z-index:250;
          flex-direction:column; align-items:center; justify-content:center; gap:32px; padding:40px 24px;
        }
        .mobile-menu.open { display:flex; animation:fadeIn 0.25s ease; }
        .mobile-menu .mobile-logo img { height:54px; width:auto; object-fit:contain; }
        .mobile-menu a { font-size:1.6rem; font-weight:800; color:var(--white); text-decoration:none; }
        .mobile-menu a:hover { color:var(--accent); }
        .mobile-lang {
          display:flex; background:rgba(255,255,255,0.05); border:1px solid var(--border-s);
          border-radius:8px; overflow:hidden;
        }
        .mobile-lang .lang-btn { padding:10px 22px; font-size:0.86rem; }

        @media (max-width:840px) {
          .nav { padding:12px 20px; }
          .nav.scrolled { padding:9px 20px; }
          .nav-links { display:none; }
          .nav-right .btn, .nav-right .lang-toggle { display:none; }
          .hamburger { display:flex; }
        }
      `}</style>

      <header className={`nav${scrolled?' scrolled':''}`} role="banner">
        <div className="nav-inner">
          <a href="#" className="nav-logo" aria-label="BroadTVApp - inicio">
            <img src="/logo-icon.png" className="nav-logo-img" alt="BroadTVApp icon" />
            <img src="/logo-text.png" className="nav-logo-text-img" alt="BroadTVApp" />
          </a>

          <nav className="nav-links" aria-label="Navegación principal">
            {t.links.map(([href,label]) => <a key={href} href={href}>{label}</a>)}
          </nav>

          <div className="nav-right">
            <div className="lang-toggle" role="group" aria-label="Idioma">
              <button className={`lang-btn${lang==='es'?' active':''}`} onClick={()=>setLang('es')} aria-pressed={lang==='es'}>ES</button>
              <button className={`lang-btn${lang==='en'?' active':''}`} onClick={()=>setLang('en')} aria-pressed={lang==='en'}>EN</button>
            </div>
            <button className="btn btn-primary btn-sm" onClick={openDemo} aria-label={t.demo}>
              {t.demo} →
            </button>
            <button className={`hamburger${open?' open':''}`} onClick={()=>setOpen(!open)} aria-label="Menú" aria-expanded={open}>
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${open?' open':''}`} role="dialog" aria-modal="true">
        <div className="mobile-logo">
          <img src="/logo.png" alt="BroadTVApp" />
        </div>
        {t.links.map(([href,label]) => (
          <a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>
        ))}
        <div className="mobile-lang">
          <button className={`lang-btn${lang==='es'?' active':''}`} onClick={()=>setLang('es')}>ES</button>
          <button className={`lang-btn${lang==='en'?' active':''}`} onClick={()=>setLang('en')}>EN</button>
        </div>
        <button className="btn btn-primary" onClick={()=>{setOpen(false);openDemo()}}>{t.demo} →</button>
      </div>
    </>
  )
}
