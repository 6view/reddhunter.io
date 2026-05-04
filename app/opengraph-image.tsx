import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Reddhunter — Reddit Intelligence for Founders'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#07080a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -60%)',
            width: 700,
            height: 400,
            background: 'radial-gradient(ellipse, rgba(255,69,0,0.18) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Logo pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 32,
            padding: '10px 20px',
            background: 'rgba(255,69,0,0.1)',
            border: '1px solid rgba(255,69,0,0.25)',
            borderRadius: 999,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: '#FF4500',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 900,
              color: 'white',
            }}
          >
            R
          </div>
          <span style={{ color: 'white', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Reddhunter
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            textAlign: 'center',
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          Reddit Intelligence
          <br />
          <span style={{ color: '#FF4500' }}>for Founders</span>
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.35)',
            textAlign: 'center',
            maxWidth: 680,
            marginBottom: 48,
            lineHeight: 1.4,
          }}
        >
          Viral Score IA · Comment Starter · Hunt · Explore
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 40 }}>
          {[
            { value: '700+', label: 'Posts/day' },
            { value: '7', label: 'Subreddits' },
            { value: '$5', label: 'Per month' },
          ].map(({ value, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ color: '#FF4500', fontSize: 32, fontWeight: 800 }}>{value}</span>
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
