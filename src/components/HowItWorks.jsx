import useReveal from '../hooks/useReveal'

const tx = {
  es:{
    label:'Cómo funciona', h2:'De cero a tu canal en vivo\nen 4 pasos.',
    sub:'Sin conocimientos técnicos. Sin contratar desarrolladores. Sin meses de espera.',
    steps:[
      {num:'01',icon:'🤝',title:'Contacta con nosotros',desc:'Agenda una demo gratuita. Nuestro equipo entiende tu proyecto y diseña el ecosistema ideal para ti.'},
      {num:'02',icon:'⬆️',title:'Sube tu contenido',desc:'Arrastra tus archivos MP4/MOV al CMS. BroadTVApp los transcodifica automáticamente a 4K, 1080p y 720p.'},
      {num:'03',icon:'💳',title:'Configura tu monetización',desc:'Elige SVOD, AVOD o PPV. Conecta Stripe y define los precios de tu canal en minutos.'},
      {num:'04',icon:'🚀',title:'Lanza en todas las plataformas',desc:'Tu app llega a Roku, Apple TV, Fire TV, iOS y Android. Nosotros gestionamos toda la publicación técnica.'},
    ],
  },
  en:{
    label:'How it works', h2:'From zero to your live channel\nin 4 steps.',
    sub:'No technical skills needed. No developers to hire. No months of waiting.',
    steps:[
      {num:'01',icon:'🤝',title:'Contact us',desc:'Book a free demo. Our team understands your project and designs the ideal platform ecosystem for you.'},
      {num:'02',icon:'⬆️',title:'Upload your content',desc:'Drag your MP4/MOV files into the CMS. BroadTVApp auto-transcodes to 4K, 1080p and 720p.'},
      {num:'03',icon:'💳',title:'Set up monetization',desc:'Choose SVOD, AVOD or PPV. Connect Stripe and set your channel pricing in minutes.'},
      {num:'04',icon:'🚀',title:'Launch on all platforms',desc:'Your app reaches Roku, Apple TV, Fire TV, iOS and Android. We handle all the technical publishing.'},
    ],
  },
}

export default function HowItWorks({ lang }) {
  const t = tx[lang]
  const ref = useReveal()
  return (
    <>
      <style>{`
        .how {
          padding:100px 48px;
          background:linear-gradient(180deg,transparent,rgba(59,130,246,0.03) 50%,transparent);
          position:relative;
        }
        .how-inner { max-width:1160px; margin:0 auto; }
        .how-head { text-align:center; display:flex; flex-direction:column; align-items:center; margin-bottom:72px; }
        .how-steps { display:grid; grid-template-columns:repeat(4,1fr); gap:0; position:relative; }
        .how-line {
          position:absolute; top:33px; left:12%; right:12%; height:1px;
          background:linear-gradient(90deg,transparent,var(--border-s) 20%,var(--border-s) 80%,transparent);
        }
        .step {
          display:flex; flex-direction:column; align-items:center;
          text-align:center; gap:16px; padding:0 18px; position:relative; z-index:1;
        }
        .step-num-bubble {
          position:absolute; top:-8px; right:calc(50% - 30px);
          background:var(--accent); color:#fff;
          font-size:0.58rem; font-weight:800; letter-spacing:0.1em;
          padding:2px 7px; border-radius:20px;
        }
        .step-circle {
          width:66px; height:66px; border-radius:50%;
          background:var(--card); border:1px solid var(--border-s);
          display:flex; align-items:center; justify-content:center; font-size:1.5rem;
          box-shadow:0 0 0 6px var(--black);
          transition:border-color 0.3s, box-shadow 0.3s, transform 0.3s var(--ease);
          position:relative;
        }
        .step:hover .step-circle {
          border-color:var(--accent); transform:scale(1.08);
          box-shadow:0 0 0 6px var(--black),0 0 20px rgba(59,130,246,0.25);
        }
        .step-num { font-size:0.63rem; font-weight:800; letter-spacing:0.14em; color:var(--accent); }
        .step-title { font-size:0.95rem; font-weight:700; color:var(--white); line-height:1.3; }
        .step-desc { font-size:0.84rem; color:var(--muted); line-height:1.72; }
        @media (max-width:860px) {
          .how { padding:70px 24px; }
          .how-steps { grid-template-columns:1fr 1fr; gap:44px; }
          .how-line { display:none; }
        }
        @media (max-width:500px) {
          .how { padding:60px 16px; }
          .how-steps { grid-template-columns:1fr; gap:36px; }
        }
      `}</style>

      <section className="how" id="how" ref={ref} aria-labelledby="how-h2">
        <div className="how-inner">
          <div className="how-head">
            <span className="label-pill">{`✦ ${t.label}`}</span>
            <h2 id="how-h2" className="section-h2" style={{whiteSpace:'pre-line'}}>{t.h2}</h2>
            <p className="section-sub">{t.sub}</p>
          </div>
          <div className="how-steps">
            <div className="how-line" aria-hidden="true"/>
            {t.steps.map((s,i)=>(
              <div key={s.num} className={`step reveal r-d${i+1}`}>
                <div className="step-circle" aria-hidden="true">
                  {s.icon}
                  <span className="step-num-bubble">{s.num}</span>
                </div>
                <span className="step-num">{s.num}</span>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
