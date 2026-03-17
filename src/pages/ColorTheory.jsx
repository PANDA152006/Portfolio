import { motion, useScroll, useMotionValue, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import ColorTheoryHero from '../components/colortheory/ColorTheoryHero';
import ColorWheelInteractive from '../components/colortheory/ColorWheelInteractive';
import PrimarySecondarySection from '../components/colortheory/PrimarySecondarySection';
import SchemeSimulator from '../components/colortheory/SchemeSimulator';
import DesignAnalysisSection from '../components/colortheory/DesignAnalysisSection';
import PaletteGenerator from '../components/colortheory/PaletteGenerator';

// ─── Design System ──────────────────────────────────────
const P = {
    bg: '#0B0B0B',
    surface: '#6B0F1A',
    accent: '#C6A15B',
    neutral: '#B8B8B8',
    text: '#F2F2F2',
};

// Sparkle dots
const STARS = Array.from({ length: 40 }, (_, i) => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.random() * 2.5 + 1,
    delay: Math.random() * 4,
}));

const InteractiveStar = ({ s, index, mouseX, mouseY }) => {
    // Different layers of parallax depth
    const depth = (index % 5 + 1) * 6;
    const xOffset = useTransform(mouseX, [-1, 1], [-depth, depth]);
    const yOffset = useTransform(mouseY, [-1, 1], [-depth, depth]);

    return (
        <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            // Use stable random-looking duration based on index
            transition={{ duration: 3 + (index % 4), repeat: Infinity, delay: s.delay }}
            style={{
                position: 'absolute', left: s.x, top: s.y,
                width: s.size, height: s.size,
                background: P.text, borderRadius: '50%',
                pointerEvents: 'none',
                x: xOffset,
                y: yOffset,
            }}
        />
    );
};

const NAV_LINKS = [
    { href: '#hero', label: 'Intro' },
    { href: '#color-wheel', label: 'Color Wheel' },
    { href: '#primary-secondary', label: 'Colors' },
    { href: '#schemes', label: 'Schemes' },
    { href: '#design-analysis', label: 'Analysis' },
    { href: '#playground', label: 'Playground' },
];

const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// ─── Section Label Helper ────────────────────────────────
const SectionLabel = ({ text, color = P.accent }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
    >
        <span style={{
            display: 'inline-block',
            padding: '0.35rem 1.1rem',
            background: `${color}11`,
            border: `1px solid ${color}33`,
            borderRadius: 50,
            color,
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
        }}>
            {text}
        </span>
    </motion.div>
);

const SectionHeading = ({ children }) => (
    <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 0.1 }}
        style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: P.text,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
        }}
    >
        {children}
    </motion.h2>
);

const SectionSubtext = ({ children }) => (
    <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 0.2 }}
        style={{
            color: P.neutral,
            fontSize: '1.05rem',
            maxWidth: 520,
            margin: '0 auto 3.5rem',
            lineHeight: 1.65,
        }}
    >
        {children}
    </motion.p>
);

// ─── Color Wheel Wrapper ─────────────────────────────────
const ColorWheelSection = () => (
    <section
        id="color-wheel"
        style={{ padding: '120px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
        <div style={{ maxWidth: 1000, width: '100%', margin: '0 auto', textAlign: 'center' }}>
            <SectionLabel text="The Foundation" color={P.accent} />
            <SectionHeading>Interactive Color Wheel</SectionHeading>
            <SectionSubtext>
                The color wheel organizes hues by their relationships. Hover and click each slice to discover its role.
            </SectionSubtext>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.15 }}
                style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 24,
                    padding: '3rem 2rem',
                }}
            >
                <ColorWheelInteractive />
            </motion.div>
        </div>
    </section>
);

// ─── Main Page ───────────────────────────────────────────
const ColorTheory = () => {
    const containerRef = useRef(null);
    const { scrollYProgress, scrollY } = useScroll();

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const [isNavExpanded, setIsNavExpanded] = useState(true);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        // Auto contract if scrolling down past 50px
        if (latest > 50 && latest > previous + 5) {
            setIsNavExpanded(false);
        } 
        // Auto expand if scrolled back to top
        else if (latest < 20) {
            setIsNavExpanded(true);
        }
    });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
            const y = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div
            className="legacy-theme"
            ref={containerRef}
            style={{
                background: P.bg,
                minHeight: '100vh',
                color: P.text,
                fontFamily: "'Inter', -apple-system, sans-serif",
                position: 'relative',
            }}
        >
            {/* Fixed Background Stars */}
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden'
            }}>
                {STARS.map((s, i) => (
                    <InteractiveStar key={i} s={s} index={i} mouseX={mouseX} mouseY={mouseY} />
                ))}
            </div>
            {/* Scroll progress bar */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${P.accent}, ${P.accent}, ${P.accent})`,
                    transformOrigin: '0%',
                    scaleX: scrollYProgress,
                    zIndex: 1002,
                }}
            />

            {/* Sticky nav */}
            <motion.nav 
                initial={false}
                animate={{
                    width: isNavExpanded ? 'calc(100% - 2rem)' : '64px',
                    padding: isNavExpanded ? '0.85rem 2rem' : '0.85rem 1.3rem',
                    left: isNavExpanded ? '50%' : '1.5rem',
                    x: isNavExpanded ? '-50%' : '0%',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                    position: 'fixed',
                    top: '1rem',
                    maxWidth: '1200px',
                    zIndex: 1001,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isNavExpanded ? 'space-between' : 'center',
                    background: 'rgba(11,11,11,0.88)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid rgba(198,161,91,0.15)`,
                    borderRadius: '50px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    overflow: 'hidden',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsNavExpanded(!isNavExpanded)}
                        style={{
                            width: 22, height: 22,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${P.accent}, ${P.accent})`,
                            boxShadow: `0 0 10px ${P.accent}88`,
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            flexShrink: 0,
                            display: 'block'
                        }} 
                    />
                    <AnimatePresence>
                        {isNavExpanded && (
                            <motion.span 
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                style={{ 
                                    fontWeight: 800, 
                                    fontSize: '1rem', 
                                    color: P.text, 
                                    letterSpacing: '-0.02em', 
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden',
                                    display: 'inline-block' 
                                }}
                            >
                                Color Theory
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {isNavExpanded && (
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            style={{ display: 'flex', gap: '0.15rem', flexWrap: 'wrap', whiteSpace: 'nowrap' }}
                        >
                            {NAV_LINKS.map(link => (
                                <button
                                    key={link.href}
                                    onClick={() => scrollTo(link.href)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: P.neutral,
                                        fontSize: '0.82rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        padding: '0.3rem 0.8rem',
                                        borderRadius: 6,
                                        transition: 'color 0.2s, background 0.2s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.color = P.accent; e.currentTarget.style.background = `${P.accent}10`; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = P.neutral; e.currentTarget.style.background = 'transparent'; }}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Sections */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <ColorTheoryHero onExplore={() => scrollTo('#color-wheel')} />
                <ColorWheelSection />
                <PrimarySecondarySection />
                <SchemeSimulator />
                <DesignAnalysisSection />
                <PaletteGenerator />
            </div>

            {/* Footer */}
            <footer style={{
                padding: '2.5rem 2rem',
                textAlign: 'center',
                borderTop: `1px solid rgba(198,161,91,0.08)`,
                background: 'rgba(0,0,0,0.4)',
            }}>
                <p style={{ color: `${P.neutral}55`, fontSize: '0.83rem', margin: 0 }}>
                    Applications of Color Theory (CSGG2012P) · Yash Dutt Sharma
                </p>
            </footer>
        </div>
    );
};

export default ColorTheory;
