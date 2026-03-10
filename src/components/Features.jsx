import { useEffect, useRef, useState } from 'react'

// ── Cambia solo esta línea para cambiar el video ──
const YOUTUBE_ID = "7QKyvfSEDA0"
// ─────────────────────────────────────────────────

const tx = {
  es: {
    label:'Producto',
    h2:'Todo para lanzar tu canal.\nNada que te sobre.',
    sub:'Tecnología OTT enterprise al alcance de creadores independientes, iglesias, academias y medios.',
    videoTag:'Míralo en acción',
    videoH:'Tu canal.', videoSpan:'Tu marca.', videoH2:'Tus reglas.',
    videoDesc:'Sin depender de YouTube ni sus algoritmos. Tu contenido, en tus apps, con tu precio y tu marca.',
    stat1:'Plataformas', stat2:'Margen bruto', stat3:'Tiempo de lanzamiento',
    features:[
      {icon:'🚀',tag:'Multi-plataforma',title:'Distribución automática',desc:'Sube tu video una sola vez y se publica en Roku, Apple TV, Fire TV, iOS y Android. Un panel, todas las pantallas.'},
      {icon:'💳',tag:'SVOD · AVOD · PPV',title:'Monetización sin intermediarios',desc:'Cobra suscripciones, activa publicidad o cobra por evento. Integración directa con Stripe. El dinero va directo a ti.'},
      {icon:'📊',tag:'Dashboard',title:'Analytics en tiempo real',desc:'Vistas, retención, ganancias y usuarios activos. Todo en vivo para que tomes decisiones con datos, no intuiciones.'},
      {icon:'🎬',tag:'Gestor de contenido',title:'CMS para creadores',desc:'Sube Series, Películas y contenido En Vivo. Gestiona miniaturas, metadatos y categorías sin complicaciones.'},
      {icon:'🌍',tag:'Streaming CDN',title:'CDN global de video',desc:'Transcodificación automática a 4K, 1080p y 720p. Latencia menor a 2 segundos en cualquier país del mundo.'},
      {icon:'🔒',tag:'Enterprise',title:'Seguridad DRM',desc:'Protección anti-piratería. Cumplimiento GDPR y encriptación end-to-end de pagos y credenciales.'},
    ],
  },
  en: {
    label:'Product',
    h2:"Everything to launch your channel.\nNothing you don't need.",
    sub:'Enterprise OTT technology within reach of independent creators, churches, academies and media.',
    videoTag:'See it in action',
    videoH:'Your channel.', videoSpan:'Your brand.', videoH2:'Your rules.',
    videoDesc:'No more depending on YouTube or its algorithms. Your content, your apps, your price and your brand.',
    stat1:'Platforms', stat2:'Gross margin', stat3:'Launch time',
    features:[
      {icon:'🚀',tag:'Multi-platform',title:'Automatic distribution',desc:'Upload once, publish to Roku, Apple TV, Fire TV, iOS and Android. One panel, every screen.'},
      {icon:'💳',tag:'SVOD · AVOD · PPV',title:'Monetization without middlemen',desc:'Charge subscriptions, run ads or sell pay-per-view. Direct Stripe integration. Money goes straight to you.'},
      {icon:'📊',tag:'Dashboard',title:'Real-time analytics',desc:'Views, retention, revenue and active users — all live so you make decisions with data, not guesswork.'},
      {icon:'🎬',tag:'Content manager',title:'CMS for creators',desc:'Upload Series, Movies and Live content. Manage thumbnails, metadata and categories effortlessly.'},
      {icon:'🌍',tag:'Streaming CDN',title:'Global video CDN',desc:'Automatic transcoding to 4K, 1080p and 720p. Under 2 seconds latency anywhere in the world.'},
      {icon:'🔒',tag:'Enterprise',title:'DRM Security',desc:'Anti-piracy protection. GDPR compliance and end-to-end encryption of payments and credentials.'},
    ],
  },
}

export default function Features({ lang, openDemo }) {
  const t = tx[lang]
  const sectionRef = useRef(null)
  const videoWrapRef = useRef(null)
  const [videoSrc, setVideoSrc] = useState('') // empty until in view → then autoplay

  // Autoplay when video scrolls into view
  useEffect(() => {
    const el = videoWrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !videoSrc) {
          // autoplay=1 triggers on scroll into view
          setVideoSrc(
            `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_ID}&rel=0&modestbranding=1&iv_load_policy=3&controls=1&playsinline=1`
          )
          obs.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [videoSrc])

  // Cards reveal
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.feat-card')
    if (!cards?.length) return
    cards.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible')
    })
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.05 }
    )
    cards.forEach(el => { if (!el.classList.contains('visible')) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .features { padding:72px 48px 80px; }
        .features-head {
          text-align:center; display:flex; flex-direction:column; align-items:center; margin-bottom:52px;
        }

        /* ── Video section ── */
        .feat-video-outer {
          max-width:1160px; margin:0 auto 64px;
          display:flex; align-items:center; justify-content:center; gap:56px;
        }
        .feat-video-wrap {
          flex-shrink:0; width:300px; position:relative;
          border-radius:24px; overflow:hidden;
          border:1px solid rgba(255,255,255,0.1);
          box-shadow:0 32px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04);
          background:#0b0f18;
        }
        /* Glow ring */
        .feat-video-wrap::after {
          content:''; pointer-events:none;
          position:absolute; inset:-1px; border-radius:25px; z-index:0;
          background:linear-gradient(135deg, rgba(99,102,241,0.4), rgba(59,130,246,0.3), rgba(129,140,248,0.4));
          mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite:exclude; -webkit-mask-composite:xor;
          padding:1px;
        }
        .feat-video-ratio {
          position:relative; width:100%; padding-top:177.78%; /* 9:16 Shorts */
        }
        .feat-video-ratio iframe {
          position:absolute; inset:0; width:100%; height:100%;
          border:none; border-radius:24px; z-index:1;
          /* pointer-events ON — users can play/pause */
          pointer-events:auto;
        }
        /* Thumbnail placeholder while video loads */
        .feat-video-thumb {
          position:absolute; inset:0; z-index:2;
          background:linear-gradient(160deg,rgba(59,130,246,0.12),rgba(129,140,248,0.12));
          display:flex; align-items:center; justify-content:center;
          border-radius:24px; cursor:pointer;
          transition:opacity 0.4s;
        }
        .feat-video-thumb.hidden { opacity:0; pointer-events:none; }
        .fvt-play {
          width:64px; height:64px; border-radius:50%;
          background:linear-gradient(135deg,var(--accent),var(--accent2));
          display:flex; align-items:center; justify-content:center;
          font-size:1.6rem; box-shadow:0 0 40px rgba(59,130,246,0.5);
          transition:transform 0.25s var(--ease);
        }
        .feat-video-thumb:hover .fvt-play { transform:scale(1.12); }

        /* Block only YouTube branding zones */
        .vid-block-bottom {
          position:absolute; bottom:0; left:0; right:0; height:40px;
          z-index:3; pointer-events:all; cursor:default;
          background:transparent;
        }
        .vid-block-topright {
          position:absolute; top:0; right:0; width:80px; height:38px;
          z-index:3; pointer-events:all; cursor:default;
          background:transparent;
        }

        /* Copy beside video */
        .feat-video-copy { display:flex; flex-direction:column; gap:22px; max-width:420px; }
        .fvc-tag {
          display:inline-flex; align-items:center; gap:7px; width:fit-content;
          background:rgba(59,130,246,0.08); border:1px solid rgba(59,130,246,0.22);
          color:var(--accent); font-size:0.68rem; font-weight:700;
          letter-spacing:0.14em; text-transform:uppercase; padding:5px 13px; border-radius:20px;
        }
        .fvc-title {
          font-size:clamp(1.6rem,2.8vw,2.3rem); font-weight:800;
          line-height:1.12; letter-spacing:-0.022em; color:var(--white);
        }
        .fvc-title .grad {
          background:linear-gradient(135deg,#60a5fa,#a78bfa);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .fvc-desc { font-size:0.92rem; color:var(--muted); line-height:1.78; }
        .fvc-stats { display:flex; gap:32px; }
        .fvc-stat { display:flex; flex-direction:column; gap:4px; }
        .fvc-stat-num { font-size:1.8rem; font-weight:800; color:var(--white); line-height:1; }
        .fvc-stat-label { font-size:0.72rem; color:var(--muted); font-weight:600; }

        /* ── Feature cards ── */
        .features-grid {
          max-width:1160px; margin:0 auto;
          display:grid; grid-template-columns:repeat(3,1fr); gap:18px;
        }
        .feat-card {
          background:var(--card); border:1px solid var(--border);
          border-radius:16px; padding:28px;
          display:flex; flex-direction:column; gap:14px;
          opacity:0; transform:translateY(22px);
          position:relative; overflow:hidden;
        }
        .feat-card.visible {
          opacity:1; transform:translateY(0);
          transition:opacity 0.55s var(--ease), transform 0.55s var(--ease),
                      border-color 0.3s, background 0.3s, box-shadow 0.3s;
        }
        .feat-card:nth-child(2).visible { transition-delay:0.08s; }
        .feat-card:nth-child(3).visible { transition-delay:0.16s; }
        .feat-card:nth-child(5).visible { transition-delay:0.08s; }
        .feat-card:nth-child(6).visible { transition-delay:0.16s; }
        .feat-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:transparent; transition:background 0.3s;
        }
        .feat-card:hover {
          border-color:rgba(59,130,246,0.3); background:var(--card-hover);
          transform:translateY(-5px) !important; box-shadow:0 20px 40px rgba(0,0,0,0.3);
        }
        .feat-card:hover::before { background:linear-gradient(90deg,transparent,rgba(59,130,246,0.5),transparent); }
        .feat-icon {
          width:46px; height:46px;
          background:linear-gradient(135deg,rgba(59,130,246,0.15),rgba(129,140,248,0.1));
          border:1px solid rgba(59,130,246,0.2); border-radius:12px;
          display:flex; align-items:center; justify-content:center; font-size:1.25rem;
        }
        .feat-tag { font-size:0.62rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#60a5fa; background:rgba(59,130,246,0.08); padding:3px 9px; border-radius:5px; width:fit-content; }
        .feat-title { font-size:1rem; font-weight:700; color:var(--white); line-height:1.3; }
        .feat-desc { font-size:0.86rem; color:var(--muted); line-height:1.72; }

        @media (max-width:900px) {
          .features-grid { grid-template-columns:repeat(2,1fr); }
          .feat-video-outer { flex-direction:column; gap:32px; }
          .feat-video-copy { align-items:center; text-align:center; }
          .fvc-stats { justify-content:center; }
        }
        @media (max-width:580px) {
          .features { padding:52px 16px 60px; }
          .features-grid { grid-template-columns:1fr; }
          .feat-video-wrap { width:min(280px, 78vw); }
        }
      `}</style>

      <section className="features" id="features" ref={sectionRef} aria-labelledby="features-h2">

        <div className="features-head">
          <span className="label-pill">{`✦ ${t.label}`}</span>
          <h2 id="features-h2" className="section-h2" style={{whiteSpace:'pre-line'}}>{t.h2}</h2>
          <p className="section-sub">{t.sub}</p>
        </div>

        {/* ── VIDEO + COPY ── */}
        <div className="feat-video-outer">
          <div className="feat-video-wrap" ref={videoWrapRef}>
            <div className="feat-video-ratio">
              {/* Thumbnail placeholder until in viewport */}
              <div
                className={`feat-video-thumb${videoSrc ? ' hidden' : ''}`}
                onClick={() => setVideoSrc(`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_ID}&rel=0&modestbranding=1&iv_load_policy=3&controls=1&playsinline=1`)}
              >
                <div className="fvt-play">▶</div>
              </div>

              {/* iframe — only rendered once in view (saves bandwidth) */}
              {videoSrc && (
                <iframe
                  src={videoSrc}
                  title="BroadTVApp Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}

              {/* Block only YT branding areas, NOT the whole video */}
              <div className="vid-block-bottom" />
              <div className="vid-block-topright" />
            </div>
          </div>

          <div className="feat-video-copy">
            <span className="fvc-tag">✦ {t.videoTag}</span>
            <h3 className="fvc-title">
              {t.videoH}<br/>
              <span className="grad">{t.videoSpan}</span><br/>
              {t.videoH2}
            </h3>
            <p className="fvc-desc">{t.videoDesc}</p>
            <div className="fvc-stats">
              <div className="fvc-stat">
                <span className="fvc-stat-num">6</span>
                <span className="fvc-stat-label">{t.stat1}</span>
              </div>
              <div className="fvc-stat">
                <span className="fvc-stat-num">90%</span>
                <span className="fvc-stat-label">{t.stat2}</span>
              </div>
              <div className="fvc-stat">
                <span className="fvc-stat-num">7d</span>
                <span className="fvc-stat-label">{t.stat3}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARDS ── */}
        <div className="features-grid">
          {t.features.map((f) => (
            <article key={f.title} className="feat-card">
              <div className="feat-icon" aria-hidden="true">{f.icon}</div>
              <span className="feat-tag">{f.tag}</span>
              <h3 className="feat-title">{f.title}</h3>
              <p className="feat-desc">{f.desc}</p>
            </article>
          ))}
        </div>

      </section>
    </>
  )
}
