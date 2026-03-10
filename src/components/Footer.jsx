import useReveal from '../hooks/useReveal'

const tx = {
  es:{
    tagline:'La plataforma OTT SaaS para creadores independientes. Lanza tu canal en Roku, Apple TV, Fire TV y móviles desde un solo panel.',
    cols:[
      {title:'Producto',links:[['#features','Características'],['#how','Cómo funciona'],['#pricing','Precios']]},
      {title:'Plataformas',links:[['#','Roku TV'],['#','Amazon Fire TV'],['#','Apple TV / iOS'],['#','Android TV'],['#','Web TV']]},
      {title:'Empresa',links:[['#','Sobre nosotros'],['mailto:demo@broadtvapp.com','Contacto'],['#','Blog']]},
    ],
    rights:'Todos los derechos reservados.',
    legal:[['#','Privacidad'],['#','Términos'],['#','GDPR']],
  },
  en:{
    tagline:'The OTT SaaS platform for independent creators. Launch your channel on Roku, Apple TV, Fire TV and mobile from a single dashboard.',
    cols:[
      {title:'Product',links:[['#features','Features'],['#how','How it works'],['#pricing','Pricing']]},
      {title:'Platforms',links:[['#','Roku TV'],['#','Amazon Fire TV'],['#','Apple TV / iOS'],['#','Android TV'],['#','Web TV']]},
      {title:'Company',links:[['#','About us'],['mailto:demo@broadtvapp.com','Contact'],['#','Blog']]},
    ],
    rights:'All rights reserved.',
    legal:[['#','Privacy'],['#','Terms'],['#','GDPR']],
  },
}

export default function Footer({ lang }) {
  const t = tx[lang]
  const ref = useReveal()
  const year = new Date().getFullYear()
  return (
    <>
      <style>{`
        .footer { border-top:1px solid var(--border); padding:56px 48px 32px; }
        .footer-inner { max-width:1160px; margin:0 auto; display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; }
        .footer-brand { display:flex; flex-direction:column; gap:16px; }
        .footer-logo { display:flex; align-items:center; text-decoration:none; width:fit-content; }
        /* footer logo imgs handled inline */
        .footer-tagline { font-size:0.83rem; color:var(--muted); line-height:1.68; max-width:230px; }
        .footer-col h4 {
          font-size:0.72rem; font-weight:800; letter-spacing:0.12em; text-transform:uppercase;
          color:var(--muted); margin-bottom:16px;
        }
        .footer-col ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
        .footer-col a { font-size:0.84rem; color:var(--muted); text-decoration:none; transition:color 0.2s; }
        .footer-col a:hover { color:var(--white); }
        .footer-bottom {
          max-width:1160px; margin:40px auto 0; padding-top:24px;
          border-top:1px solid var(--border);
          display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;
        }
        .footer-copy { font-size:0.78rem; color:var(--muted); }
        .footer-copy strong { color:#a78bfa; font-weight:600; }
        .footer-legal { display:flex; gap:20px; }
        .footer-legal a { font-size:0.78rem; color:var(--muted); text-decoration:none; transition:color 0.2s; }
        .footer-legal a:hover { color:var(--white); }
        @media (max-width:820px) {
          .footer { padding:48px 24px 28px; }
          .footer-inner { grid-template-columns:1fr 1fr; }
          .footer-brand { grid-column:1/-1; }
        }
        @media (max-width:480px) {
          .footer { padding:40px 16px 24px; }
          .footer-inner { grid-template-columns:1fr; }
          .footer-bottom { flex-direction:column; align-items:flex-start; }
        }
      `}</style>
      <footer className="footer" ref={ref} role="contentinfo">
        <div className="footer-inner">
          <div className="footer-brand reveal">
            <a href="#" className="footer-logo" aria-label="BroadTVApp inicio">
              <img src="/logo-icon.png" style={{height:'40px',width:'auto',objectFit:'contain',filter:'drop-shadow(0 2px 12px rgba(129,80,248,0.4))'}} alt="" aria-hidden="true" />
              <img src="/logo-text.png" style={{height:'16px',width:'auto',objectFit:'contain',filter:'drop-shadow(0 1px 6px rgba(80,200,248,0.3))'}} alt="BroadTVApp" />
            </a>
            <p className="footer-tagline">{t.tagline}</p>
          </div>
          {t.cols.map((col,i)=>(
            <div key={col.title} className={`footer-col reveal r-d${i+1}`}>
              <h4>{col.title}</h4>
              <ul>{col.links.map(([href,label])=><li key={label}><a href={href}>{label}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom reveal">
          <p className="footer-copy">© {year} <strong>BroadTVApp Inc.</strong> — broadtvapp.com · {t.rights}</p>
          <nav className="footer-legal" aria-label="Legal">
            {t.legal.map(([href,label])=><a key={label} href={href}>{label}</a>)}
          </nav>
        </div>
      </footer>
    </>
  )
}
