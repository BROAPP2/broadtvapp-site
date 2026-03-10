// ── HubSpot config ──────────────────────────────
const HS_PORTAL = "245492977"
const HS_FORM   = "f87c8c04-90b6-467d-9466-4aa384f2b85c"
// ────────────────────────────────────────────────
// Enviamos directo a la API de HubSpot — sin iframe, sin embed
// Full control del diseño

import { useState } from 'react'

const tx = {
  es: {
    label: 'Hablemos',
    sub: 'Cuéntanos sobre tu proyecto. Un especialista te responde en menos de 24 horas con una propuesta personalizada.',
    bullets: [
      { icon: '⚡', text: 'Respuesta en menos de 24 h' },
      { icon: '🎯', text: 'Propuesta personalizada para tu proyecto' },
      { icon: '🔒', text: 'Sin spam · Tus datos están seguros' },
    ],
    fields: {
      name:    { label: 'Nombre completo', placeholder: 'Juan García' },
      phone:   { label: 'WhatsApp / Teléfono', placeholder: '+1 (555) 000-0000' },
      email:   { label: 'Email *', placeholder: 'tu@email.com' },
      project: { label: 'Tipo de proyecto', placeholder: 'Selecciona...' },
      message: { label: 'Cuéntanos más (opcional)', placeholder: '¿Qué contenido tienes? ¿Cuántos suscriptores? ¿Metas?' },
    },
    projectOptions: ['YouTuber / Creador de contenido', 'Iglesia / Ministerio', 'Academia / Cursos online', 'Canal de noticias / Media', 'Deportes / Fitness', 'Otro'],
    submit: 'Enviar y hablar con un especialista →',
    submitting: 'Enviando...',
    successTitle: '🚀 ¡Mensaje recibido!',
    successMsg: 'Gracias. Un especialista de BroadTVApp te escribirá a',
    successSub: 'en las próximas horas con una propuesta personalizada.',
    errorMsg: 'Algo salió mal. Escríbenos directamente a demo@broadtvapp.com',
    required: 'El email es requerido',
  },
  en: {
    label: "Let's talk",
    sub: 'Tell us about your project. A specialist will get back to you in under 24 hours with a personalized proposal.',
    bullets: [
      { icon: '⚡', text: 'Response in under 24 hours' },
      { icon: '🎯', text: 'Personalized proposal for your project' },
      { icon: '🔒', text: 'No spam · Your data is safe' },
    ],
    fields: {
      name:    { label: 'Full name', placeholder: 'John Smith' },
      phone:   { label: 'WhatsApp / Phone', placeholder: '+1 (555) 000-0000' },
      email:   { label: 'Email *', placeholder: 'you@email.com' },
      project: { label: 'Project type', placeholder: 'Select...' },
      message: { label: 'Tell us more (optional)', placeholder: 'What content do you have? How many subscribers? Goals?' },
    },
    projectOptions: ['YouTuber / Content Creator', 'Church / Ministry', 'Academy / Online Courses', 'News Channel / Media', 'Sports / Fitness', 'Other'],
    submit: 'Send and talk to a specialist →',
    submitting: 'Sending...',
    successTitle: '🚀 Message received!',
    successMsg: 'Thank you. A BroadTVApp specialist will write to',
    successSub: 'in the next few hours with a personalized proposal.',
    errorMsg: 'Something went wrong. Email us at demo@broadtvapp.com',
    required: 'Email is required',
  },
}

export default function LeadCapture({ lang = 'es' }) {
  const t = tx[lang]
  const f = t.fields

  const [form, setForm] = useState({ name: '', phone: '', email: '', project: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [fieldError, setFieldError] = useState('')

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSubmit = async () => {
    if (!form.email) { setFieldError(t.required); return }
    setFieldError('')
    setStatus('sending')

    // Field names must match exactly what you set in HubSpot form editor
    // "Número de contacto" internal name is usually "phone" but could vary
    const fields = [
      { name: 'firstname',           value: form.name },
      { name: 'phone',               value: form.phone }, // HubSpot standard
      { name: 'mobilephone',         value: form.phone }, // fallback
      { name: 'numero_de_contacto',  value: form.phone }, // custom field fallback  
      { name: 'email',               value: form.email },
    ].filter(f => f.value)

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL}/${HS_FORM}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields,
            context: { pageUri: window.location.href, pageName: 'BroadTVApp Landing' },
          }),
        }
      )
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <style>{`
        .lc-section {
          padding: 100px 48px;
          background: linear-gradient(180deg, transparent, rgba(59,130,246,0.02) 50%, transparent);
        }
        .lc-inner {
          max-width: 1060px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center;
        }

        /* Left */
        .lc-copy { display: flex; flex-direction: column; gap: 24px; }
        .lc-h2 {
          font-size: clamp(1.9rem, 3.2vw, 2.8rem); font-weight: 800;
          line-height: 1.12; letter-spacing: -0.022em; color: var(--white);
        }
        .lc-h2 .grad {
          background: linear-gradient(135deg, #60a5fa, #a78bfa);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .lc-sub { font-size: 1rem; color: var(--muted); line-height: 1.78; max-width: 380px; }
        .lc-bullets { display: flex; flex-direction: column; gap: 12px; }
        .lc-bullet { display: flex; align-items: center; gap: 12px; font-size: 0.9rem; color: var(--muted); }
        .lc-bullet-icon {
          width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
          background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.18);
          display: flex; align-items: center; justify-content: center; font-size: 0.95rem;
        }

        /* Form card */
        .lc-form-box {
          background: var(--card); border: 1px solid var(--border-s);
          border-radius: 20px; padding: 36px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.35);
          position: relative; overflow: hidden;
        }
        .lc-form-box::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
        }

        /* Form fields */
        .lc-form { display: flex; flex-direction: column; gap: 14px; }
        .lc-field { display: flex; flex-direction: column; gap: 5px; }
        .lc-label {
          font-size: 0.72rem; font-weight: 700; color: var(--muted);
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .lc-input, .lc-select, .lc-textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px; padding: 12px 16px;
          color: var(--white); font-size: 0.9rem;
          font-family: var(--font);
          outline: none; width: 100%; box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .lc-input::placeholder, .lc-textarea::placeholder { color: #3d4f63; }
        .lc-input:focus, .lc-select:focus, .lc-textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
        }
        .lc-select {
          appearance: none; -webkit-appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='9' viewBox='0 0 14 9'%3E%3Cpath fill='none' stroke='%237a869a' stroke-width='1.5' stroke-linecap='round' d='M1 1l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          padding-right: 40px;
        }
        .lc-select option { background: #0f1623; color: var(--white); }
        .lc-textarea { resize: vertical; min-height: 88px; line-height: 1.6; }
        .lc-field-error { font-size: 0.74rem; color: #f87171; margin-top: 2px; }

        .lc-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .lc-submit {
          margin-top: 4px; width: 100%;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff; border: none; border-radius: 11px;
          padding: 14px 24px; font-size: 0.92rem; font-weight: 700;
          font-family: var(--font); cursor: pointer; letter-spacing: 0.01em;
          box-shadow: 0 4px 18px rgba(59,130,246,0.28);
          transition: transform 0.22s var(--ease), box-shadow 0.22s, opacity 0.2s;
        }
        .lc-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(59,130,246,0.42);
        }
        .lc-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Success state */
        .lc-success {
          display: flex; flex-direction: column; align-items: center;
          gap: 14px; text-align: center; padding: 20px 0;
        }
        .lc-success-emoji { font-size: 3.2rem; }
        .lc-success-title { font-size: 1.5rem; font-weight: 800; color: var(--white); }
        .lc-success-msg { font-size: 0.9rem; color: var(--muted); line-height: 1.7; }
        .lc-success-msg strong { color: var(--green); }

        /* Error */
        .lc-error-banner {
          background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.2);
          border-radius: 9px; padding: 12px 16px;
          font-size: 0.82rem; color: #f87171; text-align: center;
        }

        @media (max-width: 860px) {
          .lc-section { padding: 70px 24px; }
          .lc-inner { grid-template-columns: 1fr; gap: 40px; }
          .lc-sub { max-width: 100%; }
        }
        @media (max-width: 520px) {
          .lc-section { padding: 56px 16px; }
          .lc-form-box { padding: 24px 18px; }
          .lc-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="lc-section" id="contacto" aria-labelledby="lc-h2">
        <div className="lc-inner">

          {/* ── LEFT ── */}
          <div className="lc-copy">
            <span className="label-pill">{`✦ ${t.label}`}</span>
            <h2 id="lc-h2" className="lc-h2">
              {lang === 'es'
                ? <>¿Listo para dar<br/>el <span className="grad">siguiente paso</span>?</>
                : <>Ready to take<br/>the <span className="grad">next step</span>?</>
              }
            </h2>
            <p className="lc-sub">{t.sub}</p>
            <div className="lc-bullets">
              {t.bullets.map(b => (
                <div key={b.text} className="lc-bullet">
                  <div className="lc-bullet-icon">{b.icon}</div>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="lc-form-box">
            {status === 'success' ? (
              <div className="lc-success">
                <div className="lc-success-emoji">🚀</div>
                <div className="lc-success-title">{t.successTitle}</div>
                <p className="lc-success-msg">
                  {t.successMsg} <strong>{form.email}</strong><br/>
                  {t.successSub}
                </p>
              </div>
            ) : (
              <div className="lc-form">
                <div className="lc-row">
                  <div className="lc-field">
                    <label className="lc-label">{f.name.label}</label>
                    <input className="lc-input" placeholder={f.name.placeholder}
                      value={form.name} onChange={e => set('name', e.target.value)} />
                  </div>
                  <div className="lc-field">
                    <label className="lc-label">{f.phone.label}</label>
                    <input className="lc-input" placeholder={f.phone.placeholder} type="tel"
                      value={form.phone} onChange={e => set('phone', e.target.value)} />
                  </div>
                </div>

                <div className="lc-field">
                  <label className="lc-label">{f.email.label}</label>
                  <input className="lc-input" placeholder={f.email.placeholder} type="email"
                    value={form.email} onChange={e => set('email', e.target.value)} />
                  {fieldError && <span className="lc-field-error">{fieldError}</span>}
                </div>

                <div className="lc-field">
                  <label className="lc-label">{f.project.label}</label>
                  <select className="lc-select" value={form.project} onChange={e => set('project', e.target.value)}>
                    <option value="">{f.project.placeholder}</option>
                    {t.projectOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div className="lc-field">
                  <label className="lc-label">{f.message.label}</label>
                  <textarea className="lc-textarea" placeholder={f.message.placeholder}
                    value={form.message} onChange={e => set('message', e.target.value)} />
                </div>

                {status === 'error' && (
                  <div className="lc-error-banner">{t.errorMsg}</div>
                )}

                <button className="lc-submit btn" disabled={status === 'sending'} onClick={handleSubmit}>
                  {status === 'sending' ? t.submitting : t.submit}
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  )
}
