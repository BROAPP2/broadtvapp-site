import useReveal from '../hooks/useReveal'

const tx = {
  es:{
    label:'Clientes', h2:'Creadores que ya lanzaron\nsu canal con nosotros.',
    items:[
      {quote:'Antes dependía 100% de YouTube y sus algoritmos me ahogaban. Con BroadTVApp lancé mi canal en Roku en 3 días y ahora tengo ingresos predecibles cada mes.',name:'Carlos M.',role:'YouTuber · 180K suscriptores',emoji:'🎬',color:'#3b82f6'},
      {quote:'Nuestra iglesia ahora llega a miembros en 12 países a través de Apple TV y Android. La configuración fue increíblemente sencilla y el soporte es excepcional.',name:'Pastor Roberto A.',role:'Iglesia Vida Nueva · Miami',emoji:'⛪',color:'#8b5cf6'},
      {quote:'Pasamos de cobrar en Hotmart a tener nuestra propia app en iOS. Las ventas subieron un 60% en el primer trimestre.',name:'Daniela F.',role:'FitLife Academy · Bogotá',emoji:'🏋️',color:'#22d3a5'},
    ],
  },
  en:{
    label:'Clients', h2:'Creators who already launched\ntheir channel with us.',
    items:[
      {quote:'I used to rely 100% on YouTube and their algorithms were killing me. With BroadTVApp I launched on Roku in 3 days and now have predictable monthly income.',name:'Carlos M.',role:'YouTuber · 180K subscribers',emoji:'🎬',color:'#3b82f6'},
      {quote:'Our church now reaches members in 12 countries through Apple TV and Android. The setup was incredibly simple and the support is outstanding.',name:'Pastor Roberto A.',role:'Vida Nueva Church · Miami',emoji:'⛪',color:'#8b5cf6'},
      {quote:'We moved from Hotmart to our own iOS app. Sales went up 60% in the first quarter.',name:'Daniela F.',role:'FitLife Academy · Bogotá',emoji:'🏋️',color:'#22d3a5'},
    ],
  },
}

export default function Testimonials({ lang }) {
  const t = tx[lang]
  const ref = useReveal()
  return (
    <>
      <style>{`
        .testi {
          padding:100px 48px;
          background:linear-gradient(180deg,transparent,rgba(129,140,248,0.03) 50%,transparent);
        }
        .testi-inner { max-width:1160px; margin:0 auto; }
        .testi-head { text-align:center; display:flex; flex-direction:column; align-items:center; margin-bottom:52px; }
        .testi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        .testi-card {
          background:var(--card); border:1px solid var(--border);
          border-radius:16px; padding:30px;
          display:flex; flex-direction:column; gap:18px;
          transition:border-color 0.3s, transform 0.3s var(--ease), box-shadow 0.3s;
        }
        .testi-card:hover {
          border-color:rgba(129,140,248,0.3);
          transform:translateY(-5px);
          box-shadow:0 20px 40px rgba(0,0,0,0.25);
        }
        .testi-stars { color:#f59e0b; font-size:0.88rem; letter-spacing:2px; }
        .testi-quote { font-size:0.9rem; color:var(--muted); line-height:1.78; font-style:italic; flex:1; }
        .testi-author { display:flex; align-items:center; gap:12px; }
        .testi-av {
          width:42px; height:42px; border-radius:50%;
          display:flex; align-items:center; justify-content:center; font-size:1.15rem; flex-shrink:0;
        }
        .testi-name { font-size:0.88rem; font-weight:700; color:var(--white); }
        .testi-role { font-size:0.76rem; color:var(--muted); margin-top:1px; }
        @media (max-width:900px) { .testi-grid { grid-template-columns:1fr; max-width:460px; margin:0 auto; } }
        @media (max-width:580px) { .testi { padding:70px 16px; } }
      `}</style>
      <section className="testi" id="testimonials" ref={ref} aria-labelledby="testi-h2">
        <div className="testi-inner">
          <div className="testi-head">
            <span className="label-pill">{`✦ ${t.label}`}</span>
            <h2 id="testi-h2" className="section-h2" style={{whiteSpace:'pre-line'}}>{t.h2}</h2>
          </div>
          <div className="testi-grid">
            {t.items.map((item,i)=>(
              <article key={item.name} className={`testi-card reveal r-d${i+1}`}>
                <div className="testi-stars" aria-label="5 estrellas">★★★★★</div>
                <blockquote className="testi-quote">"{item.quote}"</blockquote>
                <div className="testi-author">
                  <div className="testi-av" style={{background:item.color+'1a',border:`1px solid ${item.color}33`}} aria-hidden="true">{item.emoji}</div>
                  <div>
                    <div className="testi-name">{item.name}</div>
                    <div className="testi-role">{item.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
