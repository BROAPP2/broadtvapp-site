import useReveal from '../hooks/useReveal'

const tx = {
  es:{
    h2:'¿Listo para dejar de depender\nde los algoritmos?',
    sub:'Agenda una demo gratuita y te mostramos cómo lanzar tu canal en Roku, Apple TV y móviles en menos de una semana.',
    demo:'Agenda tu Demo gratuita', plans:'Ver planes',
    note:['Sin tarjeta de crédito','Onboarding personalizado','Cancela cuando quieras'],
  },
  en:{
    h2:'Ready to stop depending\non algorithms?',
    sub:'Book a free demo and we\'ll show you how to launch your channel on Roku, Apple TV and mobile in under a week.',
    demo:'Book your Free Demo', plans:'View plans',
    note:['No credit card','Personalized onboarding','Cancel anytime'],
  },
}

export default function CTA({ lang, openDemo }) {
  const t = tx[lang]
  const ref = useReveal()
  return (
    <>
      <style>{`
        .cta-section { padding:70px 48px 100px; }
        .cta-box {
          max-width:800px; margin:0 auto;
          position:relative; overflow:hidden;
          background:linear-gradient(135deg,rgba(59,130,246,0.09),rgba(129,140,248,0.09));
          border:1px solid rgba(59,130,246,0.2);
          border-radius:24px; padding:72px 56px; text-align:center;
        }
        /* Top glow */
        .cta-box::before {
          content:''; position:absolute; top:-80px; left:50%; transform:translateX(-50%);
          width:400px; height:240px;
          background:radial-gradient(ellipse,rgba(129,140,248,0.18) 0%,transparent 70%);
          pointer-events:none;
        }
        /* Bottom accent line */
        .cta-box::after {
          content:''; position:absolute; bottom:0; left:10%; right:10%; height:1px;
          background:linear-gradient(90deg,transparent,rgba(59,130,246,0.4),transparent);
        }
        .cta-inner { position:relative; z-index:1; }
        .cta-title {
          font-size:clamp(1.9rem,3.5vw,2.9rem); font-weight:800;
          line-height:1.14; letter-spacing:-0.022em;
          color:var(--white); margin-bottom:16px; white-space:pre-line;
        }
        .cta-sub { font-size:1rem; color:var(--muted); max-width:460px; margin:0 auto 36px; line-height:1.78; }
        .cta-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
        .cta-note { margin-top:20px; font-size:0.78rem; color:var(--muted); display:flex; align-items:center; justify-content:center; gap:6px; flex-wrap:wrap; }
        .cta-note-item { display:flex; align-items:center; gap:5px; }
        .cta-note-item span { color:var(--green); }
        .cta-dot { color:rgba(255,255,255,0.15); }
        @media (max-width:600px) {
          .cta-section { padding:50px 16px 80px; }
          .cta-box { padding:44px 24px; }
          .cta-btns { flex-direction:column; }
          .cta-btns .btn { width:100%; justify-content:center; }
          .cta-box::before { width:280px; }
        }
      `}</style>

      <section className="cta-section" id="cta" ref={ref}>
        <div className="cta-box">
          <div className="cta-inner">
            <h2 className="cta-title reveal">{t.h2}</h2>
            <p className="cta-sub reveal r-d1">{t.sub}</p>
            <div className="cta-btns reveal r-d2">
              <button onClick={openDemo} className="btn btn-primary">{t.demo} →</button>
              <a href="#pricing" className="btn btn-ghost">{t.plans}</a>
            </div>
            <div className="cta-note reveal r-d3">
              {t.note.map((n,i)=>(
                <span key={n} style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <span className="cta-note-item"><span>✓</span> {n}</span>
                  {i < t.note.length-1 && <span className="cta-dot">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
