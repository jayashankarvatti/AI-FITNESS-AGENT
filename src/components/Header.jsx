export default function Header({ assessmentMode, assessmentStep, totalSteps }) {
  return (
    <header className="flex items-center gap-3.5 px-5 py-5 border-b border-white/[0.06] bg-dark-800/80 backdrop-blur-md shrink-0 mb-2">
      {/* Icon */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-400 animate-glow-pulse">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      {/* Title & tagline */}
      <div className="min-w-0">
        <h1 className="text-lg font-semibold leading-tight text-text-primary tracking-tight">
          FitAI Assistant
        </h1>
        <p className="text-xs text-text-muted leading-snug mt-0.5">
          Your personal AI-powered fitness coach
        </p>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">

        {/* Assessment Mode badge */}
        {assessmentMode && (
          <div className="animate-assessment-badge flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30">
            {/* Step progress dots */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  className={`inline-block rounded-full transition-all duration-300 ${
                    i < assessmentStep
                      ? 'w-1.5 h-1.5 bg-amber-400'
                      : i === assessmentStep
                      ? 'w-2 h-2 bg-amber-300 shadow-[0_0_6px_rgba(251,191,36,0.8)]'
                      : 'w-1.5 h-1.5 bg-white/15'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-semibold text-amber-300 tracking-wide uppercase whitespace-nowrap">
              Assessment {assessmentStep + 1}/{totalSteps}
            </span>
          </div>
        )}

        {/* Status dot */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-xs text-emerald-400 font-medium hidden sm:inline">Online</span>
        </div>

      </div>
    </header>
  )
}
