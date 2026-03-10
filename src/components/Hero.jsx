const tx = {
  es: {
    badge:'Plataforma OTT — Ahora disponible',
    h1a:'Lanza tu propio', h1b:'canal de streaming', h1c:'independiente.',
    sub:'Distribuye tu contenido en Roku, Apple TV, Fire TV, iOS y Android desde un solo panel. Sin algoritmos. Sin intermediarios.',
    demo:'Agenda tu Demo gratuita', how:'Ver cómo funciona',
    proof:'Creadores, iglesias, academias y medios que ya lanzaron',
    live:'EN VIVO', viewers:'1,240 viewers',
    mrr:'MRR este mes', mrrVal:'+$4,820', watchLabel:'CONTINUAR VIENDO',
  },
  en: {
    badge:'OTT Platform — Now available',
    h1a:'Launch your own', h1b:'streaming channel', h1c:'independently.',
    sub:'Distribute your content on Roku, Apple TV, Fire TV, iOS and Android from one dashboard. No algorithms. No middlemen.',
    demo:'Book your Free Demo', how:'See how it works',
    proof:'Creators, churches, academies and media already live',
    live:'LIVE', viewers:'1,240 viewers',
    mrr:'MRR this month', mrrVal:'+$4,820', watchLabel:'KEEP WATCHING',
  },
}

export default function Hero({ lang, openDemo }) {
  const t = tx[lang]
  return (
    <>
      <style>{`
        .hero {
          position:relative; min-height:100vh;
          display:flex; align-items:center;
          padding:130px 48px 90px; overflow:hidden;
        }
        /* Atmosphere orbs */
        .hero-orb1 {
          position:absolute; top:-60px; left:30%; width:600px; height:500px;
          background:radial-gradient(ellipse, rgba(59,130,246,0.13) 0%, transparent 68%);
          pointer-events:none;
        }
        .hero-orb2 {
          position:absolute; bottom:0; right:-80px; width:420px; height:420px;
          background:radial-gradient(ellipse, rgba(129,140,248,0.1) 0%, transparent 65%);
          pointer-events:none;
        }
        /* Dot grid */
        .hero-dots {
          position:absolute; inset:0; pointer-events:none;
          background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }
        .hero-inner {
          max-width:1160px; margin:0 auto; width:100%;
          display:grid; grid-template-columns:1fr 1fr;
          align-items:center; gap:60px; position:relative; z-index:1;
        }
        .hero-copy { display:flex; flex-direction:column; gap:26px; }

        /* Badge */
        .hero-badge {
          display:inline-flex; align-items:center; gap:9px; width:fit-content;
          background:rgba(52,211,153,0.08); border:1px solid rgba(52,211,153,0.22);
          color:var(--green); font-size:0.78rem; font-weight:600;
          letter-spacing:0.04em; padding:7px 15px; border-radius:20px;
        }
        .badge-dot {
          width:7px; height:7px; background:var(--green); border-radius:50%;
          animation:pulse-dot 2s ease-in-out infinite;
          flex-shrink:0;
        }

        /* H1 */
        .hero-h1 {
          font-size:clamp(2.5rem,4.8vw,4.2rem);
          font-weight:800; line-height:1.09; letter-spacing:-0.028em; color:var(--white);
        }
        .hero-h1 .grad {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
          background-size: 200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation: shimmer 4s linear infinite;
        }
        .hero-sub { font-size:1.05rem; color:var(--muted); max-width:440px; line-height:1.78; }
        .hero-btns { display:flex; gap:12px; flex-wrap:wrap; }

        /* Social proof */
        .hero-proof { display:flex; align-items:center; gap:14px; padding-top:6px; border-top:1px solid var(--border); flex-wrap:wrap; }
        .proof-text { font-size:0.8rem; color:var(--muted); }
        .proof-avatars { display:flex; }
        .proof-av {
          width:28px; height:28px; border-radius:50%; border:2px solid var(--black);
          display:flex; align-items:center; justify-content:center;
          font-size:0.62rem; font-weight:700; margin-left:-8px; color:#fff;
        }
        .proof-av:first-child { margin-left:0; }

        /* TV mockup */
        .hero-visual { display:flex; justify-content:flex-end; align-items:center; }
        .tv-wrap { position:relative; animation:float 5.5s ease-in-out infinite; }
        .tv-screen {
          width:460px; aspect-ratio:16/10; background:var(--card);
          border-radius:16px; border:1px solid var(--border-s); overflow:hidden;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 24px 60px rgba(0,0,0,0.55),
            0 0 60px rgba(59,130,246,0.07),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .tv-bar {
          background:rgba(0,0,0,0.45); padding:9px 14px;
          display:flex; align-items:center; gap:7px;
          border-bottom:1px solid rgba(255,255,255,0.05);
        }
        .tv-dot { width:8px; height:8px; border-radius:50%; }
        .tv-dot.r{background:#ff5f57} .tv-dot.y{background:#febc2e} .tv-dot.g{background:#28c840}
        .tv-url {
          flex:1; background:rgba(255,255,255,0.05); border-radius:4px;
          padding:3px 10px; font-size:0.68rem; color:var(--muted); font-family:monospace;
          border:1px solid rgba(255,255,255,0.06);
        }
        .tv-body { padding:18px; display:flex; flex-direction:column; gap:12px; }
        .tv-banner {
          background:linear-gradient(135deg,rgba(59,130,246,0.25),rgba(129,140,248,0.25));
          border-radius:10px; height:104px;
          display:flex; align-items:center; justify-content:center; flex-direction:column; gap:7px;
          border:1px solid rgba(255,255,255,0.06); position:relative; overflow:hidden;
        }
        .tv-banner::before {
          content:''; position:absolute; inset:0;
          background:repeating-linear-gradient(-45deg,transparent,transparent 10px,rgba(255,255,255,0.015) 10px,rgba(255,255,255,0.015) 20px);
        }
        .tv-play {
          width:34px; height:34px; background:rgba(255,255,255,0.92); border-radius:50%;
          display:flex; align-items:center; justify-content:center; font-size:13px;
          position:relative; z-index:1;
          box-shadow:0 4px 14px rgba(0,0,0,0.3);
        }
        .tv-blabel { font-size:0.67rem; font-weight:700; color:rgba(255,255,255,0.75); letter-spacing:0.06em; z-index:1; position:relative; }
        .tv-rlabel { font-size:0.67rem; font-weight:600; color:var(--muted); letter-spacing:0.05em; }
        .tv-thumbs { display:flex; gap:7px; }
        .tv-thumb { flex:1; aspect-ratio:16/9; border-radius:6px; border:1px solid rgba(255,255,255,0.05); }
        .tv-thumb.a{background:linear-gradient(135deg,#1a3558,#264d82)}
        .tv-thumb.b{background:linear-gradient(135deg,#341a5c,#522d8c)}
        .tv-thumb.c{background:linear-gradient(135deg,#1a4535,#2d7050)}

        /* Floating badges */
        .badge-float {
          position:absolute; background:rgba(11,15,24,0.95);
          border:1px solid rgba(255,255,255,0.1);
          border-radius:12px; padding:10px 14px;
          box-shadow:0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
          display:flex; align-items:center; gap:9px;
          font-size:0.76rem; font-weight:700; backdrop-filter:blur(8px);
        }
        .badge-float.tl { top:-14px; left:-22px; animation:float 4.2s ease-in-out 0.8s infinite; }
        .badge-float.br { bottom:-14px; right:-18px; animation:float 4.8s ease-in-out 0.4s infinite; }
        .bf-label { font-size:0.6rem; color:var(--muted); font-weight:500; text-transform:uppercase; letter-spacing:0.05em; }
        .bf-val { color:#60a5fa; margin-top:1px; }

        /* Responsive */
        @media (max-width:980px) {
          .hero { padding:110px 24px 70px; }
          .hero-inner { grid-template-columns:1fr; gap:44px; }
          .hero-copy { align-items:center; text-align:center; }
          .hero-sub { text-align:center; }
          .hero-proof { justify-content:center; }
          .hero-btns { justify-content:center; }
          .hero-visual { justify-content:center; order:-1; }
          .tv-screen { width:100%; max-width:420px; }
          .badge-float { display:none; }
        }
        @media (max-width:480px) {
          .hero { padding:96px 16px 56px; }
          .hero-btns { flex-direction:column; width:100%; }
          .hero-btns .btn { width:100%; justify-content:center; }
        }
      `}</style>

      <section className="hero" aria-label="Hero">
        <div className="hero-dots" aria-hidden="true"/>
        <div className="hero-orb1" aria-hidden="true"/>
        <div className="hero-orb2" aria-hidden="true"/>

        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-badge fade-up d1">
              <span className="badge-dot"/>
              {t.badge}
            </span>

            <h1 className="hero-h1 fade-up d2">
              {t.h1a}<br/>
              <span className="grad">{t.h1b}</span><br/>
              {t.h1c}
            </h1>

            <p className="hero-sub fade-up d3">{t.sub}</p>

            <div className="hero-btns fade-up d4">
              <button onClick={openDemo} className="btn btn-primary">{t.demo} →</button>
              <a href="#how" className="btn btn-ghost">{t.how}</a>
            </div>

            <div className="hero-proof fade-up d5">
              <div className="proof-avatars">
                {['🎬','🎙️','⛪','🏋️','📺'].map((e,i)=>(
                  <div key={i} className="proof-av" style={{background:['#3b82f6','#8b5cf6','#ec4899','#f59e0b','#22d3a5'][i]}}>{e}</div>
                ))}
              </div>
              <p className="proof-text">{t.proof}</p>
            </div>
          </div>

          <div className="hero-visual fade-up d3">
            <div className="tv-wrap">
              <div className="tv-screen">
                <div className="tv-bar">
                  <div className="tv-dot r"/><div className="tv-dot y"/><div className="tv-dot g"/>
                  <div className="tv-url">micanal.broadtvapp.com</div>
                </div>
                <div className="tv-body">
                  <div className="tv-banner">
                    <div className="tv-play">▶</div>
                    <span className="tv-blabel">TU CONTENIDO AQUÍ</span>
                  </div>
                  <div className="tv-rlabel">{t.watchLabel}</div>
                  <div className="tv-thumbs">
                    <div className="tv-thumb a"/><div className="tv-thumb b"/><div className="tv-thumb c"/>
                  </div>
                </div>
              </div>

              <div className="badge-float tl">
                <span style={{fontSize:'1.1rem'}}>📡</span>
                <div>
                  <div className="bf-label">{t.live}</div>
                  <div className="bf-val">{t.viewers}</div>
                </div>
              </div>
              <div className="badge-float br">
                <span style={{fontSize:'1.1rem'}}>💰</span>
                <div>
                  <div className="bf-label">{t.mrr}</div>
                  <div className="bf-val">{t.mrrVal}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
