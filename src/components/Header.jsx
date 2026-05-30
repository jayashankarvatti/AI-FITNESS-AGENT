export default function Header({ assessmentMode, assessmentStep, totalSteps }) {
  return (
    <header className="app-header">

      {/* Icon */}
      <div
        className="animate-glow-pulse"
        style={{
          flexShrink: 0,
          width: 38,
          height: 38,
          borderRadius: 10,
          background: 'linear-gradient(135deg, var(--color-accent-500), var(--color-accent-400))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg style={{ width: 18, height: 18, color: '#fff' }} fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      {/* Title & tagline */}
      <div className="app-header__title-group">
        <h1 className="app-header__title">FitAI Assistant</h1>
        <p className="app-header__sub">Your personal AI-powered fitness coach</p>
      </div>

      {/* Right side */}
      <div className="app-header__right">

        {/* Assessment badge */}
        {assessmentMode && (
          <div
            className="animate-assessment-badge"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '5px 10px',
              borderRadius: 999,
              background: 'rgba(245,158,11,0.12)',
              border: '1px solid rgba(251,191,36,0.3)',
            }}
          >
            {/* Step dots */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    borderRadius: '50%',
                    transition: 'all 0.3s',
                    width:  i === assessmentStep ? 8 : 6,
                    height: i === assessmentStep ? 8 : 6,
                    background:
                      i < assessmentStep
                        ? '#fbbf24'
                        : i === assessmentStep
                        ? '#fcd34d'
                        : 'rgba(255,255,255,0.15)',
                    boxShadow: i === assessmentStep ? '0 0 6px rgba(251,191,36,0.8)' : 'none',
                  }}
                />
              ))}
            </div>
            <span className="assessment-badge-label" style={{
              fontSize: 10,
              fontWeight: 600,
              color: '#fcd34d',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              {assessmentStep + 1}/{totalSteps}
            </span>
          </div>
        )}

        {/* Online status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
          <span style={{ position: 'relative', display: 'flex', width: 10, height: 10 }}>
            <span className="animate-ping" style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%', background: '#34d399', opacity: 0.5,
              animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite',
            }} />
            <span style={{
              position: 'relative', width: 10, height: 10,
              borderRadius: '50%', background: '#10b981', display: 'inline-flex',
            }} />
          </span>
          <span style={{
            fontSize: '0.75rem', color: '#34d399', fontWeight: 500,
            display: 'none',
          }}
            className="sm-inline"
          >Online</span>
        </div>

      </div>
    </header>
  )
}
