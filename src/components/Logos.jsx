import useReveal from '../hooks/useReveal'

const tx = {
  es:'Tu app disponible en todas las plataformas',
  en:'Your app available on every platform',
}
const platforms = [
  {icon:'📺',name:'Roku TV'},{icon:'🔥',name:'Amazon Fire TV'},
  {icon:'',name:'Apple TV'},{icon:'📱',name:'iOS & Android'},
  {icon:'🤖',name:'Android TV'},{icon:'🌐',name:'Web TV'},
]

export default function Logos({ lang }) {
  const ref = useReveal()
  return (
    <>
      <style>{`
        .logos-section {
          padding:26px 48px 44px;
          border-top:1px solid var(--border); border-bottom:1px solid var(--border);
          background:rgba(255,255,255,0.01);
        }
        .logos-inner { max-width:1160px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:18px; }
        .logos-label { font-size:0.72rem; color:var(--muted); font-weight:600; letter-spacing:0.1em; text-transform:uppercase; }
        .logos-strip { display:flex; align-items:center; justify-content:center; gap:8px; flex-wrap:wrap; }
        .plat-chip {
          display:flex; align-items:center; gap:7px;
          background:var(--card); border:1px solid var(--border-s); border-radius:9px;
          padding:9px 16px; font-size:0.82rem; font-weight:600; color:var(--muted);
          transition:border-color 0.2s, color 0.2s, transform 0.2s var(--ease);
        }
        .plat-chip:hover { border-color:rgba(59,130,246,0.4); color:var(--white); transform:translateY(-2px); }
        @media (max-width:600px) {
          .logos-section { padding:20px 16px 32px; }
          .plat-chip { padding:7px 11px; font-size:0.75rem; }
        }
      `}</style>
      <section className="logos-section" ref={ref} aria-label="Plataformas compatibles">
        <div className="logos-inner">
          <p className="logos-label reveal">{tx[lang]}</p>
          <div className="logos-strip">
            {platforms.map((p,i)=>(
              <div key={p.name} className={`plat-chip reveal r-d${i+1}`}><span>{p.icon}</span>{p.name}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
