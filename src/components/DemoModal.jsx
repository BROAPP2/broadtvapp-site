// ============================================================
//  🗓️  CONFIGURA TU HERRAMIENTA DE AGENDAMIENTO AQUÍ
// ============================================================
//
//  OPCIÓN A — Cal.com (RECOMENDADO — 100% gratis, ilimitado)
//  1. Ve a https://cal.com y crea cuenta gratis
//  2. Crea un "Event Type" (ej: "Demo BroadTVApp - 30 min")
//  3. Conecta tu Google Calendar personal (@gmail.com)
//  4. Ve a Settings → Embed → copia la URL que termina en /embed
//  5. Pégala abajo en CALENDAR_URL
//  Ejemplo: "https://cal.com/tunombre/demo-broadtvapp/embed"
//
//  OPCIÓN B — Calendly (gratis con 1 evento)
//  1. Ve a https://calendly.com y crea cuenta gratis
//  2. Crea un evento → Settings → Add to website → copia Inline Embed URL
//  Ejemplo: "https://calendly.com/tunombre/demo?embed_domain=broadtvapp.com&embed_type=Inline"
//
//  OPCIÓN C — Google Calendar Appointments (con Gmail personal)
//  1. Ve a calendar.google.com con tu @gmail.com
//  2. Clic en "+" → "Nuevas citas" → configura horarios disponibles
//  3. Comparte la página de reserva → copia el link
//  Ejemplo: "https://calendar.google.com/calendar/appointments/schedules/ABC123"
//
// ============================================================

const CALENDAR_URL = "" // ← PEGA AQUÍ TU LINK (cualquiera de las 3 opciones)

// Cambia esto al nombre de la herramienta que uses: "cal.com" | "calendly" | "google"
const TOOL_USED = "calendly"

// ============================================================

const ui = {
  es: {
    title: 'Agenda tu demo gratuita',
    subtitle: 'Elige el día y hora que mejor te funcione · 30 minutos',
    loading: 'Cargando calendario...',
    optionTitle: 'Elige cómo quieres agendar tu demo:',
    options: [
      { icon: '📅', label: 'Cal.com (gratis)', desc: 'Elige tu horario directamente', url: 'https://cal.com' },
      { icon: '📆', label: 'Calendly (gratis)', desc: 'Reserva en segundos', url: 'https://calendly.com' },
      { icon: '✉️', label: 'Por email', desc: 'demo@broadtvapp.com', url: 'mailto:demo@broadtvapp.com' },
    ],
    setupTitle: 'Configura el calendario',
    setupDesc: 'Para activar el agendamiento directo en esta página, abre el archivo',
    setupFile: 'src/components/DemoModal.jsx',
    setupStep: 'y pega tu link de Cal.com, Calendly o Google Calendar en la variable CALENDAR_URL.',
    setupFree: '✓ Las 3 opciones son 100% gratuitas y funcionan con @gmail.com',
  },
  en: {
    title: 'Schedule your free demo',
    subtitle: 'Pick the day and time that works best · 30 minutes',
    loading: 'Loading calendar...',
    optionTitle: 'Choose how to schedule your demo:',
    options: [
      { icon: '📅', label: 'Cal.com (free)', desc: 'Pick your time directly', url: 'https://cal.com' },
      { icon: '📆', label: 'Calendly (free)', desc: 'Book in seconds', url: 'https://calendly.com' },
      { icon: '✉️', label: 'By email', desc: 'demo@broadtvapp.com', url: 'mailto:demo@broadtvapp.com' },
    ],
    setupTitle: 'Set up the calendar',
    setupDesc: 'To enable direct scheduling on this page, open the file',
    setupFile: 'src/components/DemoModal.jsx',
    setupStep: 'and paste your Cal.com, Calendly or Google Calendar link into the CALENDAR_URL variable.',
    setupFree: '✓ All 3 options are 100% free and work with @gmail.com',
  },
}

export default function DemoModal({ onClose, lang = 'es' }) {
  const t = ui[lang]

  return (
    <div className="demo-overlay" onClick={onClose}>
      <div className="demo-box" onClick={e => e.stopPropagation()}>

        <div className="demo-header">
          <div className="demo-header-text">
            <h3>📅 {t.title}</h3>
            <p>{t.subtitle}</p>
          </div>
          <button className="demo-close" onClick={onClose}>✕</button>
        </div>

        <div className="demo-body">
          {CALENDAR_URL ? (
            // ── Embedded calendar (once URL is configured) ──
            <iframe
              className="demo-iframe"
              src={CALENDAR_URL}
              title="Schedule a demo"
              frameBorder="0"
            />
          ) : (
            // ── Fallback: show options + setup instructions ──
            <div className="demo-fallback">

              <p className="df-option-title">{t.optionTitle}</p>
              <div className="df-options">
                {t.options.map(opt => (
                  <a
                    key={opt.label}
                    href={opt.url}
                    target={opt.url.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noreferrer"
                    className="df-option-card"
                  >
                    <span className="df-opt-icon">{opt.icon}</span>
                    <div>
                      <div className="df-opt-label">{opt.label}</div>
                      <div className="df-opt-desc">{opt.desc}</div>
                    </div>
                    <span className="df-opt-arrow">→</span>
                  </a>
                ))}
              </div>

              <div className="df-setup-box">
                <p className="df-setup-title">⚙️ {t.setupTitle}</p>
                <p className="df-setup-desc">
                  {t.setupDesc} <code className="df-code">{t.setupFile}</code>{' '}
                  {t.setupStep}
                </p>
                <p className="df-setup-free">{t.setupFree}</p>
              </div>

            </div>
          )}
        </div>
      </div>

      <style>{`
        .demo-overlay {
          position:fixed; inset:0; z-index:900;
          background:rgba(0,0,0,0.82); backdrop-filter:blur(8px);
          display:flex; align-items:center; justify-content:center;
          padding:16px; animation:fadeIn 0.2s ease;
        }
        .demo-box {
          background:#0d1117; border:1px solid rgba(255,255,255,0.12);
          border-radius:18px; width:100%; max-width:640px;
          overflow:hidden; position:relative;
          animation:slideUp 0.3s var(--ease);
          max-height:92vh; display:flex; flex-direction:column;
        }
        .demo-header {
          display:flex; align-items:center; justify-content:space-between;
          padding:18px 22px; border-bottom:1px solid var(--border); flex-shrink:0;
        }
        .demo-header-text h3 { font-size:0.98rem; font-weight:700; color:var(--white); }
        .demo-header-text p  { font-size:0.78rem; color:var(--muted); margin-top:2px; }
        .demo-close {
          background:rgba(255,255,255,0.06); border:1px solid var(--border);
          color:var(--muted); width:28px; height:28px; border-radius:50%;
          cursor:pointer; font-size:0.78rem;
          display:flex; align-items:center; justify-content:center;
          transition:all 0.2s; flex-shrink:0;
        }
        .demo-close:hover { background:rgba(255,255,255,0.12); color:var(--white); }
        .demo-body { flex:1; overflow-y:auto; }
        .demo-iframe { width:100%; border:none; display:block; min-height:520px; }

        /* Fallback UI */
        .demo-fallback {
          display:flex; flex-direction:column; gap:20px; padding:28px 24px;
        }
        .df-option-title {
          font-size:0.82rem; font-weight:700; color:var(--muted);
          letter-spacing:0.06em; text-transform:uppercase;
        }
        .df-options { display:flex; flex-direction:column; gap:10px; }
        .df-option-card {
          display:flex; align-items:center; gap:14px;
          background:var(--card); border:1px solid var(--border-s);
          border-radius:11px; padding:14px 18px;
          text-decoration:none; cursor:pointer;
          transition:border-color 0.2s, background 0.2s, transform 0.2s var(--ease);
        }
        .df-option-card:hover {
          border-color:var(--accent); background:var(--card-hover); transform:translateX(4px);
        }
        .df-opt-icon { font-size:1.4rem; flex-shrink:0; }
        .df-opt-label { font-size:0.9rem; font-weight:700; color:var(--white); }
        .df-opt-desc  { font-size:0.78rem; color:var(--muted); margin-top:2px; }
        .df-opt-arrow { margin-left:auto; color:var(--accent); font-size:1rem; flex-shrink:0; }

        .df-setup-box {
          background:rgba(59,130,246,0.06); border:1px solid rgba(59,130,246,0.18);
          border-radius:10px; padding:16px 18px;
          display:flex; flex-direction:column; gap:8px;
        }
        .df-setup-title { font-size:0.82rem; font-weight:700; color:var(--white); }
        .df-setup-desc  { font-size:0.8rem; color:var(--muted); line-height:1.65; }
        .df-code {
          background:rgba(255,255,255,0.08); border:1px solid var(--border-s);
          padding:1px 6px; border-radius:4px; font-family:monospace;
          font-size:0.78rem; color:var(--accent);
        }
        .df-setup-free { font-size:0.78rem; color:var(--green); font-weight:600; }

        @media (max-width:500px) {
          .demo-fallback { padding:20px 16px; }
          .df-option-card { padding:12px 14px; }
          .demo-iframe { min-height:400px; }
        }
      `}</style>
    </div>
  )
}
