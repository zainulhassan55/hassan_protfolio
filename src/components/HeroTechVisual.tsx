/** Animated charcoal tech backdrop: AI · Cybersecurity · Healthcare */
export function HeroTechVisual() {
  return (
    <div className="hero-tech-visual pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
        src="/images/hero-tech-bg.png"
        alt=""
        className="hero-tech-photo absolute inset-0 h-full w-full object-cover object-[72%_center]"
      />
      <div className="hero-tech-veil absolute inset-0" />

      <svg
        className="hero-tech-svg absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Soft pulse rings — healthcare / signal */}
        <circle className="tech-ring tech-ring-1" cx="1080" cy="420" r="90" />
        <circle className="tech-ring tech-ring-2" cx="1080" cy="420" r="140" />
        <circle className="tech-ring tech-ring-3" cx="1080" cy="420" r="200" />

        {/* Neural / AI network */}
        <g className="tech-network">
          <path className="tech-line" d="M180 220 L340 300 L520 240 L680 360" />
          <path className="tech-line tech-line-delay" d="M220 480 L400 420 L560 520 L740 460" />
          <path className="tech-line" d="M300 680 L480 600 L640 680 L820 620" />
          <path className="tech-line tech-line-delay" d="M520 240 L560 520 L640 680" />

          <circle className="tech-node" cx="180" cy="220" r="3.5" />
          <circle className="tech-node tech-node-delay" cx="340" cy="300" r="4" />
          <circle className="tech-node" cx="520" cy="240" r="3.5" />
          <circle className="tech-node tech-node-delay" cx="680" cy="360" r="4.5" />
          <circle className="tech-node" cx="220" cy="480" r="3.5" />
          <circle className="tech-node tech-node-delay" cx="400" cy="420" r="4" />
          <circle className="tech-node" cx="560" cy="520" r="3.5" />
          <circle className="tech-node tech-node-delay" cx="740" cy="460" r="4" />
          <circle className="tech-node" cx="300" cy="680" r="3.5" />
          <circle className="tech-node tech-node-delay" cx="480" cy="600" r="4" />
          <circle className="tech-node" cx="640" cy="680" r="3.5" />
          <circle className="tech-node tech-node-delay" cx="820" cy="620" r="4" />
        </g>

        {/* Cybersecurity shield outline */}
        <path
          className="tech-shield"
          d="M220 300 C220 300 250 290 280 290 C310 290 340 300 340 300 L340 380 C340 420 310 450 280 470 C250 450 220 420 220 380 Z"
        />

        {/* Healthcare waveform */}
        <path
          className="tech-wave"
          d="M760 720 L820 720 L840 680 L860 760 L880 700 L900 720 L980 720"
        />
      </svg>

      <div className="hero-tech-grid absolute inset-0" />
    </div>
  )
}
