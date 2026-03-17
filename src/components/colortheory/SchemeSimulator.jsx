import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

const P = { bg: '#0B0B0B', surface: '#6B0F1A', accent: '#C6A15B', neutral: '#B8B8B8', text: '#F2F2F2' };

const SIZE = 200;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER_R = 88;
const INNER_R = 44;
const TOTAL = 12;
const SLICE_ANGLE = (2 * Math.PI) / TOTAL;

// Color wheel hues
const WHEEL_HUES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const hsl = (h, s = 90, l = 55) => `hsl(${h},${s}%,${l}%)`;

function polarToRect(cx, cy, r, angle) {
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function slicePath(cx, cy, innerR, outerR, startAngle, endAngle) {
    const p1 = polarToRect(cx, cy, innerR, startAngle);
    const p2 = polarToRect(cx, cy, outerR, startAngle);
    const p3 = polarToRect(cx, cy, outerR, endAngle);
    const p4 = polarToRect(cx, cy, innerR, endAngle);
    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${outerR} ${outerR} 0 0 1 ${p3.x} ${p3.y} L ${p4.x} ${p4.y} A ${innerR} ${innerR} 0 0 0 ${p1.x} ${p1.y} Z`;
}

const MiniWheel = ({ highlightIndices = [], lines = [], triangle = false, triRotate = 0 }) => {
    return (
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
            {WHEEL_HUES.map((hue, i) => {
                const start = i * SLICE_ANGLE - Math.PI / 2;
                const end = start + SLICE_ANGLE;
                const isHighlighted = highlightIndices.includes(i);
                return (
                    <motion.path
                        key={i}
                        d={slicePath(CX, CY, INNER_R, OUTER_R, start, end)}
                        fill={hsl(hue, 85, isHighlighted ? 60 : 30)}
                        stroke="#0B0B0B"
                        strokeWidth={1.5}
                        animate={{ opacity: isHighlighted ? 1 : 0.35, scale: isHighlighted ? 1.05 : 1 }}
                        transition={{ duration: 0.6 }}
                        style={{ transformOrigin: `${CX}px ${CY}px` }}
                    />
                );
            })}

            {/* Complementary line */}
            <AnimatePresence>
                {lines.map(([i1, i2], li) => {
                    const a1 = i1 * SLICE_ANGLE - Math.PI / 2 + SLICE_ANGLE / 2;
                    const a2 = i2 * SLICE_ANGLE - Math.PI / 2 + SLICE_ANGLE / 2;
                    const p1 = polarToRect(CX, CY, OUTER_R - 4, a1);
                    const p2 = polarToRect(CX, CY, OUTER_R - 4, a2);
                    return (
                        <motion.line
                            key={`line-${li}`}
                            x1={p1.x} y1={p1.y}
                            x2={p2.x} y2={p2.y}
                            stroke="#F2F2F2"
                            strokeWidth={1.5}
                            strokeDasharray="4,3"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                        />
                    );
                })}
            </AnimatePresence>

            {/* Triadic triangle */}
            <AnimatePresence>
                {triangle && (() => {
                    const pts = [0, 4, 8].map(idx => {
                        const a = idx * SLICE_ANGLE - Math.PI / 2 + SLICE_ANGLE / 2;
                        const p = polarToRect(CX, CY, OUTER_R - 8, a);
                        return `${p.x},${p.y}`;
                    }).join(' ');
                    return (
                        <motion.polygon
                            key="tri"
                            points={pts}
                            fill="none"
                            stroke="#F2F2F2"
                            strokeWidth={1.5}
                            strokeDasharray="4,3"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.7, rotate: triRotate, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.8 }}
                            style={{ transformOrigin: `${CX}px ${CY}px` }}
                        />
                    );
                })()}
            </AnimatePresence>

            {/* Center */}
            <circle cx={CX} cy={CY} r={INNER_R - 4} fill="#0B0B0B" />
        </svg>
    );
};

const SCHEMES = [
    {
        id: 'monochromatic',
        name: 'Monochromatic',
        emoji: '🎨',
        tagline: 'Elegant & unified',
        description: 'A single hue expressed through multiple shades, tints, and tones. Clean, sophisticated, and easy on the eye.',
        highlightIndices: [8, 8, 8],
        monoHue: 240,
        example: {
            bg: '#0f1e3a', accent1: '#1d4ed8', accent2: '#3b82f6', accent3: '#93c5fd',
            text: 'Deep Blue Analytics', badge: 'Active', badgeBg: '#1d4ed8',
        },
    },
    {
        id: 'complementary',
        name: 'Complementary',
        emoji: '⚡',
        tagline: 'Strong contrast',
        description: 'Colors directly opposite on the wheel. The contrast creates vibrant, eye-catching combinations perfect for calls to action.',
        highlightIndices: [0, 6],
        lines: [[0, 6]],
        example: {
            bg: '#0c1a3d', accent1: '#f97316', accent2: '#3b82f6', accent3: null,
            text: 'Cinematic Thriller UI', badge: 'Watch Now', badgeBg: '#f97316',
        },
    },
    {
        id: 'analogous',
        name: 'Analogous',
        emoji: '🌊',
        tagline: 'Calm & harmonious',
        description: 'Colors that sit next to each other on the wheel. They naturally blend and create peaceful, cohesive designs often found in nature.',
        highlightIndices: [2, 3, 4],
        example: {
            bg: '#1a3a2a', accent1: '#22c55e', accent2: '#84cc16', accent3: null,
            text: 'Eco Sustainability Dashboard', badge: '100% Green', badgeBg: '#16a34a',
        },
    },
    {
        id: 'triadic',
        name: 'Triadic',
        emoji: '🔺',
        tagline: 'Vibrant & balanced',
        description: 'Three evenly spaced colors forming a triangle. Creates vibrant designs that maintain a natural, geometric balance.',
        highlightIndices: [0, 4, 8],
        triangle: true,
        example: {
            bg: '#1a0a2e', accent1: '#ef4444', accent2: '#eab308', accent3: '#3b82f6',
            text: 'Pop Art Gallery', badge: 'Featured', badgeBg: '#ef4444',
        },
    },
];

const UICard = ({ scheme }) => {
    const { example } = scheme;
    const isMonochromatic = scheme.id === 'monochromatic';

    return (
        <motion.div
            layout
            style={{
                background: example.bg,
                borderRadius: '16px',
                padding: '1.8rem',
                border: '1px solid rgba(255,255,255,0.08)',
                width: '100%',
                minWidth: 280,
                boxShadow: `0 20px 40px ${example.bg}88`
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
            {/* Header bar */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem' }}>
                {[example.accent1, example.accent2, example.accent3].filter(Boolean).map((c, i) => (
                    <motion.div key={i} layout style={{ flex: 1, height: 6, borderRadius: 4, background: c }} />
                ))}
            </div>
            
            <motion.div layout="position" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {scheme.name} UI
            </motion.div>
            
            <motion.div layout="position" style={{ color: '#F2F2F2', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>
                {example.text}
            </motion.div>

            {isMonochromatic ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[example.accent1, example.accent2, example.accent3].map((c, i) => (
                        <motion.div key={i} layout style={{ flex: 1, height: 36, borderRadius: 8, background: c }} />
                    ))}
                </div>
            ) : (
                <motion.div layout style={{
                    background: example.accent2,
                    opacity: 0.2,
                    borderRadius: 8,
                    height: 40,
                    marginBottom: '1rem',
                }} />
            )}

            <div style={{
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Preview</span>
                <motion.span layout style={{
                    background: example.badgeBg,
                    color: '#F2F2F2',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                }}>
                    {example.badge}
                </motion.span>
            </div>
        </motion.div>
    );
};

const MonoWheel = ({ hue }) => {
    const shades = [20, 35, 50, 65, 80];
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
            <div style={{
                width: 200, height: 40, borderRadius: 10,
                background: `linear-gradient(to right, ${shades.map(l => `hsl(${hue},90%,${l}%)`).join(',')})`,
                boxShadow: `0 4px 20px hsl(${hue},70%,50%)44`,
            }} />
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Light → Dark Layers</span>
        </motion.div>
    );
};


const SchemeSimulator = () => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Scroll tracking over a 300vh height container to scrub through 4 states
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Divide scroll into 4 chunks
        if (latest < 0.25) setActiveIndex(0);
        else if (latest >= 0.25 && latest < 0.5) setActiveIndex(1);
        else if (latest >= 0.5 && latest < 0.75) setActiveIndex(2);
        else setActiveIndex(3);
    });

    const activeScheme = SCHEMES[activeIndex];
    
    // Animate title fade
    const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -40]);
    const titleOp = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    // Animate triadic rotation if active
    const triRotate = activeIndex === 3 ? 120 : 0;

    return (
        <section
            id="schemes"
            ref={containerRef}
            style={{
                height: '400vh', // long scroll payload
                position: 'relative',
                background: `linear-gradient(to bottom, transparent, ${P.surface}11, transparent)`
            }}
        >
            {/* STICKY CONTAINER */}
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                 pointerEvents: 'none' // Allow background stars to still be interacted with?
            }}>
                <div style={{ maxWidth: 1200, width: '100%', padding: '0 24px', position: 'relative' }}>
                    
                    {/* Floating Title (Disappears as you scroll deep) */}
                    <motion.div
                        style={{ position: 'absolute', top: '-15vh', left: 0, right: 0, textAlign: 'center', y: titleY, opacity: titleOp }}
                    >
                        <span style={{
                            display: 'inline-block',
                            padding: '0.4rem 1.2rem',
                            border: `1px solid ${P.accent}44`,
                            borderRadius: '50px',
                            color: P.accent,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                        }}>
                            Scroll to Evolve
                        </span>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: P.text, margin: '0 0 1rem 0' }}>
                            Color Relationships
                        </h2>
                    </motion.div>

                    {/* Main Interface */}
                    <motion.div
                        layout
                        style={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '5rem',
                            background: `radial-gradient(circle at center, ${P.surface}33 0%, transparent 70%)`,
                            padding: '4rem',
                            borderRadius: '40px',
                            marginLeft: '-4%',
                            width: 'fit-content'
                        }}
                    >
                        {/* Wheel Column */}
                        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                            <AnimatePresence mode="popLayout">
                                {activeScheme.id === 'monochromatic' ? (
                                    <motion.div key="mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <MiniWheel highlightIndices={[8]} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="poly" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <MiniWheel
                                            highlightIndices={activeScheme.highlightIndices}
                                            lines={activeScheme.lines || []}
                                            triangle={activeScheme.triangle}
                                            triRotate={triRotate}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            <AnimatePresence mode="popLayout">
                                {activeScheme.id === 'monochromatic' && (
                                   <MonoWheel key="monobar" hue={activeScheme.monoHue} />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Info Column */}
                        <div style={{ flex: 1, maxWidth: 400 }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeScheme.id}
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '2.5rem' }}>{activeScheme.emoji}</span>
                                        <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: P.text, margin: 0, letterSpacing: '-0.02em' }}>
                                            {activeScheme.name}
                                        </h3>
                                    </div>
                                    <div style={{ color: P.accent, fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        {activeScheme.tagline}
                                    </div>
                                    <p style={{ color: P.neutral, fontSize: '1.1rem', lineHeight: 1.6, margin: '0 0 2.5rem 0' }}>
                                        {activeScheme.description}
                                    </p>

                                    {/* Scroll Progress Indicators */}
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        {[0, 1, 2, 3].map(i => (
                                            <motion.div
                                                key={i}
                                                style={{
                                                    height: 4,
                                                    flex: 1,
                                                    borderRadius: 2,
                                                    background: activeIndex >= i ? P.accent : 'rgba(255,255,255,0.1)',
                                                }}
                                                animate={{ opacity: activeIndex === i ? 1 : 0.3 }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* UI Card Column */}
                        <div style={{ flexShrink: 0 }}>
                            <UICard scheme={activeScheme} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SchemeSimulator;
