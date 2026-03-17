import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef, useEffect } from 'react';

// Color palette tokens
const P = {
    bg: '#0B0B0B',
    surface: '#6B0F1A',
    accent: '#C6A15B',
    neutral: '#B8B8B8',
    text: '#F2F2F2',
};

const PALETTE_SWATCHES = [
    { hex: '#0B0B0B', label: 'Deep Black', sub: '#0B0B0B' },
    { hex: '#6B0F1A', label: 'Burgundy', sub: '#6B0F1A' },
    { hex: '#C6A15B', label: 'Film Gold', sub: '#C6A15B' },
    { hex: '#F2F2F2', label: 'Ivory Text', sub: '#F2F2F2' },
    { hex: '#B8B8B8', label: 'Subtle Text', sub: '#B8B8B8' },
];

// Floating background blobs
const BLOBS = [
    { color: '#6B0F1A', size: 500, left: '-8%', top: '-5%', blur: 120, opacity: 0.15, dur: 18 },
    { color: '#4A0810', size: 420, left: '72%', top: '-10%', blur: 110, opacity: 0.12, dur: 22 },
    { color: '#8A1424', size: 380, left: '55%', top: '30%', blur: 100, opacity: 0.08, dur: 16 },
    { color: '#3A040A', size: 300, left: '25%', top: '60%', blur: 90, opacity: 0.06, dur: 20 },
];

// Sparkle dots removed and elevated to ColorTheory.jsx

/* ---------- Sub-cards ---------- */

const PaletteCard = () => (
    <motion.div
        initial={{ opacity: 0, y: 40, x: -20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
            position: 'absolute',
            left: '2%',
            bottom: '8%',
            width: 280,
            background: 'rgba(107,15,26,0.75)',
            border: '1px solid rgba(198,161,91,0.1)',
            borderRadius: 20,
            padding: '1.4rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            zIndex: 4,
        }}
    >
        {/* header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.1rem' }}>
            <span style={{ color: P.text, fontWeight: 700, fontSize: '1rem' }}>Color Palette</span>
            <span style={{ color: P.neutral, fontSize: '1.1rem', cursor: 'default' }}>⋯</span>
        </div>
        {/* swatches */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.8rem' }}>
            {PALETTE_SWATCHES.map((s, i) => (
                <motion.div
                    key={s.hex}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.75 + i * 0.08, type: 'spring', stiffness: 200 }}
                    style={{
                        flex: 1,
                        aspectRatio: '0.75',
                        borderRadius: 12,
                        background: s.hex,
                        border: s.hex === '#0B0B0B' ? '1px solid rgba(255,255,255,0.15)' : s.hex === '#F2F2F2' ? '1px solid rgba(0,0,0,0.1)' : 'none',
                        boxShadow: s.hex !== '#0B0B0B' && s.hex !== '#F2F2F2' ? `0 6px 20px ${s.hex}55` : 'none',
                    }}
                />
            ))}
        </div>
        {/* labels */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.2rem' }}>
            {PALETTE_SWATCHES.map((s) => (
                <div key={s.hex} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ color: P.text, fontSize: '0.52rem', fontWeight: 600, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {s.label}
                    </div>
                    <div style={{ color: P.neutral, fontSize: '0.48rem', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                        {s.sub}
                    </div>
                </div>
            ))}
        </div>
        {/* CTA */}
        <button style={{
            width: '100%',
            padding: '0.6rem',
            background: P.accent,
            border: 'none',
            borderRadius: 30,
            color: P.bg,
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: `0 8px 24px ${P.accent}44`,
        }}>
            Get Started
        </button>
    </motion.div>
);


const FeatureCards = () => (
    <div style={{
        position: 'absolute',
        right: '2%',
        bottom: '8%',
        display: 'flex',
        gap: '0.75rem',
        zIndex: 4,
    }}>
        {/* Energize card */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
                width: 150,
                padding: '1.2rem',
                background: `linear-gradient(140deg, #6B0F1A 0%, #4A0810 100%)`,
                borderRadius: 18,
                boxShadow: `0 18px 40px rgba(107,15,26,0.5)`,
            }}
        >
            <div style={{ color: P.text, fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                Dramatic<br />Contrast
            </div>
            <div style={{ color: 'rgba(242,242,242,0.65)', fontSize: '0.7rem' }}>Cinematic Look</div>
        </motion.div>

        {/* Creative card */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
                width: 150,
                padding: '1.2rem',
                background: `linear-gradient(140deg, #8A1424 0%, #6B0F1A 100%)`,
                borderRadius: 18,
                boxShadow: `0 18px 40px rgba(138,20,36,0.4)`,
            }}
        >
            <div style={{ color: P.text, fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                Deep &<br />Engaging
            </div>
            <div style={{ color: 'rgba(242,242,242,0.5)', fontSize: '0.7rem' }}>Theater Vibe</div>
        </motion.div>
    </div>
);

const ColorTheoryHero = ({ onExplore }) => {
    // Tracking for text hover effect
    const textX = useMotionValue(0);
    const textY = useMotionValue(0);
    const textOpacity = useMotionValue(0);

    const handleTextMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        textX.set(e.clientX - rect.left);
        textY.set(e.clientY - rect.top);
    };

    const textMaskImage = useMotionTemplate`radial-gradient(150px circle at ${textX}px ${textY}px, black 30%, transparent 100%)`;

    useEffect(() => {
        // Text specific cursor tracking left here
    }, []);

    return (
        <section
            id="hero"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'transparent',
            }}
        >
            {/* Background blobs */}
            {BLOBS.map((b, i) => (
                <motion.div
                    key={i}
                    animate={{ x: [0, 30, -20, 15, 0], y: [0, -25, 20, -10, 0], scale: [1, 1.07, 0.96, 1.04, 1] }}
                    transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
                    style={{
                        position: 'absolute',
                        left: b.left, top: b.top,
                        width: b.size, height: b.size,
                        borderRadius: '50%',
                        background: b.color,
                        opacity: b.opacity,
                        filter: `blur(${b.blur}px)`,
                        pointerEvents: 'none',
                    }}
                />
            ))}

            {/* Stars elevated to page level */}

            {/* Diagonal light streak */}
            <div style={{
                position: 'absolute',
                left: '28%', top: '35%',
                width: '55%', height: '3px',
                background: `linear-gradient(90deg, transparent, ${P.surface}66, transparent)`,
                transform: 'rotate(-12deg)',
                filter: 'blur(3px)',
                pointerEvents: 'none',
            }} />

            {/* ── Center content ── */}
            <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 2rem', maxWidth: 700 }}>
                {/* pill */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    style={{
                        display: 'inline-block',
                        padding: '0.35rem 1.1rem',
                        background: `rgba(212,175,55,0.08)`,
                        border: `1px solid rgba(212,175,55,0.25)`,
                        borderRadius: 50,
                        color: P.accent,
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: '1.4rem',
                    }}
                >
                    Interactive Color Theory
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    onMouseMove={handleTextMouseMove}
                    onMouseEnter={() => textOpacity.set(1)}
                    onMouseLeave={() => textOpacity.set(0)}
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
                        fontWeight: 900,
                        color: P.text,
                        lineHeight: 1.05,
                        letterSpacing: '-0.03em',
                        marginBottom: '1rem',
                    }}
                >
                    Stunning{' '}
                    <span style={{
                        background: `linear-gradient(135deg, #F2F2F2 0%, #B8B8B8 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: `0 0 20px ${P.surface}88`,
                    }}>
                        Color Theory
                    </span>

                    {/* Glowing overlay masked to cursor */}
                    <motion.div
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            pointerEvents: 'none',
                            opacity: textOpacity,
                            WebkitMaskImage: textMaskImage,
                            maskImage: textMaskImage,
                            transition: 'opacity 0.4s ease',
                            zIndex: 10,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <span style={{
                            background: `linear-gradient(110deg, #F2F2F2, #B8B8B8, ${P.accent})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Stunning Color Theory
                        </span>
                    </motion.div>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.38, duration: 0.6 }}
                    style={{
                        fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                        color: P.neutral,
                        lineHeight: 1.65,
                        maxWidth: 480,
                        margin: '0 auto 2.5rem',
                    }}
                >
                    Perfect for modern web design — scroll through, interact, and understand how colors work together.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.52, duration: 0.5 }}
                    whileHover={{ scale: 1.06, boxShadow: `0 0 40px ${P.accent}66` }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onExplore}
                    style={{
                        padding: '0.85rem 2.5rem',
                        background: P.accent,
                        border: 'none',
                        borderRadius: 50,
                        color: P.bg,
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        boxShadow: `0 10px 32px ${P.accent}44`,
                    }}
                >
                    Explore More
                </motion.button>
            </div>

            {/* Sub-cards */}
            <PaletteCard />
            <FeatureCards />

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', bottom: '2rem', left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                    opacity: 0.3,
                }}
            >
                <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${P.accent}, transparent)` }} />
                <span style={{ color: P.text, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
            </motion.div>
        </section>
    );
};

export default ColorTheoryHero;
