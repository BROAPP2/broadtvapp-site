import { useState } from 'react'

const platforms = [
  { id: 'web',     icon: '🌐', name: 'WebApp OTT',    setup: 1499 },
  { id: 'roku',    icon: '📺', name: 'Roku TV',        setup: 1499 },
  { id: 'android', icon: '🤖', name: 'Android / TV',   setup: 1499 },
  { id: 'fire',    icon: '🔥', name: 'Amazon Fire TV', setup: 1499 },
  { id: 'apple',   icon: '🍎', name: 'Apple TV / iOS', setup: 3900, tag: 'Premium' },
]

const EXTRA_PER_APP = 149 // +$149/mes por cada app seleccionada

const plans = [
  {
    id: 'starter', name: 'Starter', basePrice: 149,
    storage: '100 GB', cdn: '100 GB',
    features: ['CMS para subida de contenido','Panel de control completo','Mantenimiento de apps','Soporte por email'],
    highlight: false,
  },
  {
    id: 'pro', name: 'Pro', basePrice: 299,
    storage: '500 GB', cdn: '500 GB',
    features: ['Todo lo de Starter','Analytics avanzadas','SEO para Web TV','Streaming en vivo','Soporte prioritario'],
    highlight: true, badge: 'Recomendado',
  },
  {
    id: 'scale', name: 'Scale', basePrice: 599,
    storage: 'A consultar', cdn: 'A consultar',
    features: ['Todo lo de Pro','CDN expandido','DRM anti-piratería','Infraestructura dedicada','Soporte 24/7'],
    highlight: false,
  },
]

function calcMonthly(base, numApps) {
  if (numApps === 0) return base
  return base + (numApps * EXTRA_PER_APP)
}

function Modal({ plan, totalSetup, selectedPlatforms, monthlyPrice, onClose }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', channel:'' })
  const [submitted, setSubmitted] = useState(false)
  const discount = Math.round(monthlyPrice * 0.10)
  const finalPrice = monthlyPrice - discount

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {!submitted ? (<>
          <div className="modal-coupon-area">
            <div className="coupon-tag">🎉 ¡CUPÓN DESBLOQUEADO!</div>
            <div className="coupon-num">10%</div>
            <div className="coupon-off-text">DE DESCUENTO EN TU PRIMER MES</div>
            <div className="coupon-detail">
              Plan <strong>{plan.name}</strong>: de <s>${monthlyPrice}</s> a solo <strong className="coupon-final">${finalPrice}/mes</strong>
            </div>
          </div>
          <div className="modal-summary">
            {selectedPlatforms.length > 0 && (
              <div className="ms-row">
                <span>Setup fee ({selectedPlatforms.map(p=>p.name).join(', ')})</span>
                <span className="ms-val">${totalSetup.toLocaleString()} USD</span>
              </div>
            )}
            <div className="ms-row">
              <span>Mensualidad base ({plan.name})</span>
              <span className="ms-val">${plan.basePrice}/mes</span>
            </div>
            {selectedPlatforms.length > 0 && (
              <div className="ms-row">
                <span>+{selectedPlatforms.length} app{selectedPlatforms.length>1?'s':''} (×$149/mes)</span>
                <span className="ms-val">+${selectedPlatforms.length * EXTRA_PER_APP}/mes</span>
              </div>
            )}
            <div className="ms-row highlight-row">
              <span>Total primer mes (con 10% off)</span>
              <span className="ms-val">${finalPrice} <s className="ms-old">${monthlyPrice}</s></span>
            </div>
          </div>
          <p className="modal-form-label">Déjanos tus datos para reservar el cupón:</p>
          <div className="modal-form">
            <input className="m-input" placeholder="Nombre completo *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input className="m-input" placeholder="Email *" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            <input className="m-input" placeholder="WhatsApp / Teléfono" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
            <input className="m-input" placeholder="Nombre de tu canal o proyecto" value={form.channel} onChange={e=>setForm({...form,channel:e.target.value})} />
            <button className={`btn btn-primary modal-cta-btn${(!form.name||!form.email)?' disabled':''}`} onClick={()=>{if(form.name&&form.email)setSubmitted(true)}}>
              Reclamar cupón y hablar con un asesor →
            </button>
            <p className="modal-note">Sin compromiso · Respondemos en menos de 24 h</p>
          </div>
        </>) : (
          <div className="modal-success">
            <div style={{fontSize:'3.5rem'}}>🚀</div>
            <h3 className="success-h">¡Listo, {form.name.split(' ')[0]}!</h3>
            <p className="success-p">Tu cupón del <strong>10% off</strong> está reservado.<br/>Un asesor te escribirá a <strong>{form.email}</strong> en las próximas horas.</p>
            <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
          </div>
        )}
      </div>
      <style>{`
        .modal-overlay{position:fixed;inset:0;z-index:900;background:rgba(0,0,0,0.82);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn 0.2s ease}
        .modal-box{background:#0b0f18;border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:36px;width:100%;max-width:460px;position:relative;animation:slideUp 0.3s var(--ease);max-height:92vh;overflow-y:auto;box-shadow:0 32px 80px rgba(0,0,0,0.6)}
        .modal-close{position:absolute;top:14px;right:14px;background:rgba(255,255,255,0.06);border:1px solid var(--border);color:var(--muted);width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:.78rem;display:flex;align-items:center;justify-content:center;transition:all .2s}
        .modal-close:hover{background:rgba(255,255,255,0.12);color:var(--white)}
        .modal-coupon-area{text-align:center;margin-bottom:22px}
        .coupon-tag{display:inline-block;font-size:.72rem;font-weight:800;letter-spacing:.1em;color:var(--green);background:rgba(34,211,153,0.1);border:1px solid rgba(34,211,153,0.25);padding:5px 14px;border-radius:20px;margin-bottom:12px}
        .coupon-num{font-size:5rem;font-weight:800;line-height:1;background:linear-gradient(135deg,var(--accent),#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .coupon-off-text{font-size:.68rem;font-weight:800;letter-spacing:.18em;color:var(--muted);margin-bottom:8px}
        .coupon-detail{font-size:.86rem;color:var(--muted)}.coupon-detail strong{color:var(--white)}.coupon-final{color:var(--accent)!important;font-size:1.05rem}
        .modal-summary{background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:10px;padding:14px 18px;display:flex;flex-direction:column;gap:8px;margin-bottom:20px}
        .ms-row{display:flex;justify-content:space-between;font-size:.82rem;color:var(--muted)}
        .ms-row.highlight-row{color:var(--white);font-weight:600;border-top:1px solid var(--border);padding-top:8px;margin-top:2px}
        .ms-val{font-weight:700}.ms-old{color:var(--muted);font-size:.76rem;margin-left:5px}
        .modal-form-label{font-size:.82rem;font-weight:700;color:var(--muted);margin-bottom:10px}
        .modal-form{display:flex;flex-direction:column;gap:9px}
        .m-input{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:11px 14px;color:var(--white);font-size:.88rem;outline:none;transition:border-color .2s;width:100%}
        .m-input::placeholder{color:var(--muted)}.m-input:focus{border-color:var(--accent)}
        .modal-cta-btn{margin-top:4px;justify-content:center;width:100%}.modal-cta-btn.disabled{opacity:.4;cursor:not-allowed;transform:none!important}
        .modal-note{font-size:.74rem;color:var(--muted);text-align:center}
        .modal-success{display:flex;flex-direction:column;align-items:center;gap:18px;padding:20px 0;text-align:center}
        .success-h{font-size:1.8rem;font-weight:800;color:var(--white)}.success-p{font-size:.9rem;color:var(--muted);line-height:1.7}.success-p strong{color:var(--white)}
      `}</style>
    </div>
  )
}

export default function Pricing({ lang = 'es', openDemo }) {
  const [selected, setSelected] = useState([])
  const [activePlan, setActivePlan] = useState(null)

  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])

  const selectedPlatforms = platforms.filter(p => selected.includes(p.id))
  const totalSetup = selectedPlatforms.reduce((s, p) => s + p.setup, 0)
  const numApps = selectedPlatforms.length

  const ui = {
    es: {
      label:'Precios',
      h2:'Precios transparentes.\nSin sorpresas.',
      sub:'Un setup fee único por el desarrollo de cada app, más una mensualidad base. Cada plataforma adicional que actives suma $149/mes.',
      step1:'Paso 1 — Elige las plataformas que quieres desarrollar',
      setupFeeLabel:'Setup fee (pago único de desarrollo)',
      noSelLabel:'Selecciona al menos una plataforma para ver el total',
      step2:'Paso 2 — Elige tu plan mensual de hosting y mantenimiento',
      ruleNote:'Precio base de cada plan + $149/mes por cada app que actives',
    },
    en: {
      label:'Pricing',
      h2:'Transparent pricing.\nNo surprises.',
      sub:'A one-time setup fee per app development, plus a base monthly plan. Each additional platform you activate adds $149/mo.',
      step1:'Step 1 — Choose the platforms you want to develop',
      setupFeeLabel:'Setup fee (one-time development payment)',
      noSelLabel:'Select at least one platform to see the total',
      step2:'Step 2 — Choose your monthly hosting & maintenance plan',
      ruleNote:'Base plan price + $149/mo for each app you activate',
    },
  }
  const t = ui[lang]

  return (
    <>
      <style>{`
        .pricing{padding:90px 48px}
        .pricing-inner{max-width:1160px;margin:0 auto}
        .pricing-head{text-align:center;display:flex;flex-direction:column;align-items:center;margin-bottom:52px}

        .p-step-label{
          display:flex;align-items:center;gap:10px;
          font-size:.75rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);
          margin-bottom:16px;
        }
        .p-step-n{
          width:22px;height:22px;border-radius:50%;flex-shrink:0;
          background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);
          color:var(--accent);font-size:.7rem;font-weight:800;
          display:flex;align-items:center;justify-content:center;
        }

        /* Platform chips */
        .plat-grid{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:18px}
        .plat-chip{
          position:relative;display:flex;align-items:center;gap:10px;
          background:var(--card);border:1px solid var(--border-s);
          border-radius:11px;padding:14px 18px;
          cursor:pointer;transition:all .22s var(--ease);
          text-align:left;
        }
        .plat-chip:hover{border-color:rgba(59,130,246,0.4);background:var(--card-hover)}
        .plat-chip.on{border-color:var(--accent);background:rgba(59,130,246,0.08);box-shadow:0 0 16px rgba(59,130,246,0.1)}
        .plat-chip-icon{font-size:1.3rem}
        .plat-chip-info{display:flex;flex-direction:column;gap:2px}
        .plat-chip-name{font-size:.88rem;font-weight:700;color:var(--white)}
        .plat-chip-fee{font-size:.72rem;color:var(--accent);font-weight:600}
        .plat-chip-sub{font-size:.66rem;color:var(--muted)}
        .plat-premium-tag{
          position:absolute;top:-9px;right:10px;
          font-size:.58rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;
          padding:2px 8px;border-radius:10px;
          background:rgba(129,140,248,0.2);color:#a78bfa;border:1px solid rgba(129,140,248,0.3);
        }
        .plat-check{
          margin-left:auto;width:20px;height:20px;border-radius:50%;flex-shrink:0;
          border:1.5px solid var(--border-s);
          display:flex;align-items:center;justify-content:center;font-size:.65rem;
          transition:all .2s;
        }
        .plat-chip.on .plat-check{background:var(--accent);border-color:var(--accent);color:#fff}

        /* Setup total */
        .setup-total-bar{
          border-radius:12px;padding:18px 22px;margin-bottom:48px;
          display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;
        }
        .setup-total-bar.empty{background:rgba(255,255,255,0.02);border:1px dashed rgba(255,255,255,0.08)}
        .setup-total-bar.filled{background:var(--card);border:1px solid rgba(59,130,246,0.2)}
        .stb-left{display:flex;flex-direction:column;gap:6px}
        .stb-label{font-size:.7rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
        .stb-chips{display:flex;gap:6px;flex-wrap:wrap}
        .stb-chip{font-size:.74rem;color:var(--accent);background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.18);padding:3px 9px;border-radius:5px;font-weight:600}
        .stb-note{font-size:.72rem;color:var(--muted);font-style:italic}
        .stb-right{text-align:right}
        .stb-total{font-size:2.4rem;font-weight:800;color:var(--white);line-height:1}
        .stb-usd{font-size:.76rem;color:var(--muted);margin-top:2px}
        .stb-empty-text{font-size:.84rem;color:var(--muted)}

        /* Monthly rule note */
        .monthly-rule{
          display:flex;align-items:flex-start;gap:9px;
          background:rgba(59,130,246,0.05);border:1px solid rgba(59,130,246,0.14);
          border-radius:9px;padding:11px 16px;
          font-size:.8rem;color:var(--muted);margin-bottom:20px;line-height:1.55;
        }
        .monthly-rule strong{color:var(--accent)}

        /* Plans */
        .plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;align-items:start}
        .plan-card{
          background:var(--card);border:1px solid var(--border);
          border-radius:16px;padding:28px;
          display:flex;flex-direction:column;gap:16px;
          transition:border-color .2s,transform .25s var(--ease);position:relative;
        }
        .plan-card:hover{transform:translateY(-4px)}
        .plan-card.hl{border-color:var(--accent);background:linear-gradient(160deg,rgba(59,130,246,0.08) 0%,var(--card) 100%);box-shadow:0 0 40px rgba(59,130,246,0.1)}
        .plan-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--accent),#818cf8);color:#fff;font-size:.64rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:4px 14px;border-radius:20px;white-space:nowrap}
        .plan-name{font-size:.82rem;font-weight:800;letter-spacing:.1em;color:var(--muted)}
        .plan-price-block{display:flex;flex-direction:column;gap:4px}
        .plan-price-row{display:flex;align-items:baseline;gap:3px}
        .price-curr{font-size:1rem;font-weight:700;color:var(--muted)}
        .price-num{font-size:2.7rem;font-weight:800;color:var(--white);line-height:1}
        .price-per{font-size:.78rem;color:var(--muted)}
        .price-breakdown{font-size:.74rem;color:var(--muted);line-height:1.5}
        .price-breakdown strong{color:var(--accent)}
        .plan-infra{display:flex;gap:7px;flex-wrap:wrap}
        .infra-chip{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:6px;padding:4px 10px;font-size:.74rem;color:var(--muted);font-weight:600}
        .plan-divider{height:1px;background:var(--border)}
        .plan-feats{display:flex;flex-direction:column;gap:8px;list-style:none}
        .plan-feat{display:flex;align-items:flex-start;gap:8px;font-size:.84rem;color:var(--muted)}
        .fc{color:var(--green);flex-shrink:0;margin-top:1px}
        .plan-cta .btn{width:100%;justify-content:center}

        @media(max-width:900px){.plans-grid{grid-template-columns:1fr;max-width:420px;margin:0 auto}}
        @media(max-width:620px){
          .pricing{padding:60px 16px}
          .plat-chip{padding:12px 14px}
        }
      `}</style>

      <section className="pricing" id="pricing">
        <div className="pricing-inner">

          <div className="pricing-head">
            <span className="label-pill">✦ {t.label}</span>
            <h2 className="section-h2" style={{whiteSpace:'pre-line'}}>{t.h2}</h2>
            <p className="section-sub">{t.sub}</p>
          </div>

          {/* ── PASO 1 ── */}
          <div className="p-step-label">
            <span className="p-step-n">1</span>{t.step1}
          </div>

          <div className="plat-grid">
            {platforms.map(p => {
              const on = selected.includes(p.id)
              return (
                <button key={p.id} className={`plat-chip${on?' on':''}`} onClick={() => toggle(p.id)}>
                  {p.tag && <span className="plat-premium-tag">{p.tag}</span>}
                  <span className="plat-chip-icon">{p.icon}</span>
                  <div className="plat-chip-info">
                    <span className="plat-chip-name">{p.name}</span>
                    <span className="plat-chip-fee">${p.setup.toLocaleString()} setup fee</span>
                    <span className="plat-chip-sub">pago único de desarrollo</span>
                  </div>
                  <span className="plat-check">{on ? '✓' : ''}</span>
                </button>
              )
            })}
          </div>

          <div className={`setup-total-bar ${numApps > 0 ? 'filled' : 'empty'}`}>
            {numApps > 0 ? (
              <>
                <div className="stb-left">
                  <span className="stb-label">{t.setupFeeLabel}</span>
                  <div className="stb-chips">
                    {selectedPlatforms.map(p => (
                      <span key={p.id} className="stb-chip">{p.icon} {p.name} — ${p.setup.toLocaleString()}</span>
                    ))}
                  </div>
                  <span className="stb-note">✓ Pago único — el desarrollo es tuyo para siempre</span>
                </div>
                <div className="stb-right">
                  <div className="stb-total">${totalSetup.toLocaleString()}</div>
                  <div className="stb-usd">USD · setup fee total</div>
                </div>
              </>
            ) : (
              <span className="stb-empty-text">👆 {t.noSelLabel}</span>
            )}
          </div>

          {/* ── PASO 2 ── */}
          <div className="p-step-label">
            <span className="p-step-n">2</span>{t.step2}
          </div>

          <div className="monthly-rule">
            <span>ℹ️</span>
            <span>{t.ruleNote}: <strong>+$149/mes × {numApps} app{numApps !== 1 ? 's' : ''} = +${numApps * EXTRA_PER_APP}/mes adicionales</strong></span>
          </div>

          <div className="plans-grid">
            {plans.map(p => {
              const monthly = calcMonthly(p.basePrice, numApps)
              const extra = numApps * EXTRA_PER_APP
              return (
                <div key={p.id} className={`plan-card${p.highlight?' hl':''}`}>
                  {p.badge && <div className="plan-badge">{p.badge}</div>}
                  <div className="plan-name">{p.name.toUpperCase()}</div>
                  <div className="plan-price-block">
                    <div className="plan-price-row">
                      <span className="price-curr">$</span>
                      <span className="price-num">{monthly}</span>
                      <span className="price-per">/mes</span>
                    </div>
                    <div className="price-breakdown">
                      ${p.basePrice} base
                      {numApps > 0 && <> + <strong>${extra} ({numApps} app{numApps!==1?'s':''} × $149)</strong></>}
                    </div>
                  </div>
                  <div className="plan-infra">
                    <span className="infra-chip">💾 {p.storage}</span>
                    <span className="infra-chip">📡 {p.cdn} CDN</span>
                  </div>
                  <div className="plan-divider"/>
                  <ul className="plan-feats">
                    {p.features.map(f => <li key={f} className="plan-feat"><span className="fc">✓</span>{f}</li>)}
                  </ul>
                  <div className="plan-cta">
                    <button
                      className={`btn${p.highlight?' btn-primary':' btn-ghost'}`}
                      onClick={() => setActivePlan(p)}
                    >
                      Elegir {p.name} →
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {activePlan && (
        <Modal
          plan={activePlan}
          totalSetup={totalSetup}
          selectedPlatforms={selectedPlatforms}
          monthlyPrice={calcMonthly(activePlan.basePrice, numApps)}
          onClose={() => setActivePlan(null)}
        />
      )}
    </>
  )
}
