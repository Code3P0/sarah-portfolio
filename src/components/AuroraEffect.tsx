'use client'

export function AuroraEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden dark:block z-0">
      {/* Aurora Ribbon 1 - Purple to Cyan gradient - Top */}
      <div
        className="absolute mix-blend-screen animate-aurora-ribbon-1"
        style={{
          width: '250vw',
          height: 350,
          background: 'linear-gradient(90deg, transparent 0%, rgba(74, 58, 255, 0.3) 15%, rgba(0, 217, 255, 0.4) 40%, rgba(138, 43, 226, 0.35) 60%, rgba(74, 58, 255, 0.25) 85%, transparent 100%)',
          filter: 'blur(120px)',
          top: '5%',
          left: '-75%',
        }}
      />

      {/* Aurora Ribbon 2 - Cyan to Magenta gradient - Middle */}
      <div
        className="absolute mix-blend-screen animate-aurora-ribbon-2"
        style={{
          width: '220vw',
          height: 400,
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 217, 255, 0.25) 20%, rgba(255, 0, 255, 0.35) 50%, rgba(0, 217, 255, 0.3) 80%, transparent 100%)',
          filter: 'blur(100px)',
          top: '20%',
          left: '-60%',
        }}
      />

      {/* Aurora Ribbon 3 - Green/Teal accent - Lower */}
      <div
        className="absolute mix-blend-screen animate-aurora-ribbon-3"
        style={{
          width: '200vw',
          height: 300,
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 136, 0.2) 25%, rgba(0, 217, 255, 0.3) 50%, rgba(138, 43, 226, 0.25) 75%, transparent 100%)',
          filter: 'blur(110px)',
          top: '40%',
          left: '-50%',
        }}
      />
    </div>
  )
}

export default AuroraEffect
