import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const P = { bg: '#0B0B0B', surface: '#6B0F1A', accent: '#C6A15B', neutral: '#B8B8B8', text: '#F2F2F2' };

const PRIMARY = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Yellow', hex: '#eab308' },
    { name: 'Blue', hex: '#3b82f6' },
];

const SECONDARY = [
    { name: 'Orange', hex: '#f97316', parents: ['Red', 'Yellow'], formula: 'Red + Yellow' },
    { name: 'Green', hex: '#22c55e', parents: ['Yellow', 'Blue'], formula: 'Yellow + Blue' },
    { name: 'Purple', hex: '#a855f7', parents: ['Blue', 'Red'], formula: 'Blue + Red' },
];

const TriangleDiagram = ({ colors, label, delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const positions = [
        { top: '0.17%', left: '42%' },
        { top: '77.67%', left: '2.67%' },
        { top: '77.67%', left: '80.33%' },
    ];
    return (
        <div ref={ref} style={{ position: 'relative', width: 240, height: 240, flexShrink: 0 }}>
            {/* Triangle lines */}
            <svg
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
                viewBox="0 0 240 240"
            >
                {inView && (
                    <motion.polygon
                        points="120,10 28,196 212,196"
                        fill="none"
                        stroke={`${P.accent}33`}
                        strokeWidth="1.5"
                        strokeDasharray="5,5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, delay }}
                    />
                )}
            </svg>
            {/* Color nodes */}
            {colors.map((c, i) => (
                <motion.div
                    key={c.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: delay + i * 0.18, type: 'spring', stiffness: 200 }}
                    style={{
                        position: 'absolute',
                        top: positions[i].top,
                        left: positions[i].left,
                        transform: 'translate(-50%, -50%)',
                        width: 64, height: 64,
                        borderRadius: '50%',
                        background: c.hex,
                        boxShadow: `0 0 24px ${c.hex}88`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <span style={{
                        position: 'absolute',
                        bottom: '-26px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#F2F2F2',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        whiteSpace: 'nowrap',
                        background: 'rgba(0,0,0,0.7)',
                        padding: '2px 10px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}>{c.name}</span>
                </motion.div>
            ))}
            {/* Label */}
            <div style={{
                position: 'absolute',
                bottom: '-50px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: P.neutral,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
            }}>{label}</div>
        </div>
    );
};

const MixRow = ({ mix, index }) => {
    const [animating, setAnimating] = useState(false);
    const parentColors = PRIMARY.filter(p => mix.parents.includes(p.name));

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.15 }}
            onViewportEnter={() => setTimeout(() => setAnimating(true), 400 + index * 200)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: '0.6rem 1.5rem',
                background: `rgba(107,15,26,0.15)`,
                borderRadius: '14px',
                border: `1px solid rgba(107,15,26,0.4)`,
                transition: 'border-color 0.2s',
            }}
        >
            {parentColors.map((p, i) => (
                <span key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{
                        display: 'inline-block',
                        width: 22, height: 22,
                        borderRadius: '50%',
                        background: p.hex,
                        boxShadow: `0 0 8px ${p.hex}66`,
                    }} />
                    <span style={{ color: '#F2F2F2', fontSize: '0.9rem', fontWeight: 600 }}>{p.name}</span>
                    {i < parentColors.length - 1 && <span style={{ color: P.neutral, fontWeight: 700 }}>+</span>}
                </span>
            ))}
            <span style={{ color: P.accent, fontSize: '1rem', opacity: 0.6 }}>→</span>
            <motion.span
                animate={animating ? { scale: [0.5, 1.15, 1] } : {}}
                transition={{ duration: 0.5, ease: 'backOut' }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
                <span style={{
                    display: 'inline-block',
                    width: 26, height: 26,
                    borderRadius: '50%',
                    background: mix.hex,
                    boxShadow: `0 0 14px ${mix.hex}88`,
                }} />
                <span style={{ color: '#F2F2F2', fontWeight: 700, fontSize: '0.95rem' }}>{mix.name}</span>
            </motion.span>
        </motion.div>
    );
};

const PrimarySecondarySection = () => {
    const ref = useRef(null);

    return (
        <section
            id="primary-secondary"
            ref={ref}
            style={{
                minHeight: '100vh',
                padding: '120px 24px 80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '1100px',
                margin: '0 auto',
            }}
        >
            {/* Section label */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                style={{ marginBottom: '1rem' }}
            >
                <span style={{
                    display: 'inline-block',
                    padding: '0.4rem 1.2rem',
                    background: P.bg,
                    border: `1px solid rgba(198,161,91,0.3)`,
                    borderRadius: '30px',
                    color: P.accent,
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                }}>
                    The Building Blocks
                </span>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.1 }}
                style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    color: '#F2F2F2',
                    letterSpacing: '-0.02em',
                    textAlign: 'center',
                    marginBottom: '1rem',
                }}
            >
                Primary & Secondary Colors
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.2 }}
                style={{
                    color: '#B8B8B8',
                    fontSize: '1.05rem',
                    textAlign: 'center',
                    maxWidth: '520px',
                    lineHeight: 1.65,
                    marginBottom: '5rem',
                }}
            >
                Three primary colors create every other color on the wheel. Mixing them produces secondary colors.
            </motion.p>

            {/* Two triangles */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4rem',
                justifyContent: 'center',
                marginBottom: '5rem',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <TriangleDiagram colors={PRIMARY} label="Primary Colors" delay={0.2} />
                    <div style={{ marginTop: '3rem' }}>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 220, textAlign: 'center' }}>
                            These are the <strong style={{ color: '#F2F2F2' }}>base colors</strong>. No mixing can create them.
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <TriangleDiagram colors={SECONDARY} label="Secondary Colors" delay={0.5} />
                    <div style={{ marginTop: '3rem' }}>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 220, textAlign: 'center' }}>
                            Made by mixing <strong style={{ color: '#F2F2F2' }}>two primary colors</strong> together.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mixing chart */}
            <div style={{ width: '100%', maxWidth: 580 }}>
                <motion.h3
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        color: `rgba(198,161,91,0.5)`,
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        marginBottom: '1.5rem',
                        fontWeight: 700,
                    }}
                >
                    Color Mixing Chart
                </motion.h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {SECONDARY.map((mix, i) => (
                        <MixRow key={mix.name} mix={mix} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PrimarySecondarySection;
