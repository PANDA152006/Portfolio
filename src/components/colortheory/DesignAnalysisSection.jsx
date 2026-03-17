import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

const P = { bg: '#0B0B0B', surface: '#6B0F1A', accent: '#C6A15B', neutral: '#B8B8B8', text: '#F2F2F2' };

// We'll analyze one rich "Cinematic" design example by scanning it from top to bottom.
const DESIGN_DATA = {
    name: 'Cinematic Movie Booking',
    scheme: 'Split-Complementary (Burgundy, Gold, Teal)',
    schemeNote: 'Burgundy background provides theater depth. Gold acts as the primary luxury accent. A subtle Teal (split-complement) is used for secondary actions and data.',
    colors: [
        { id: 'bg', hex: P.bg, role: 'Deep Background', tooltip: 'Immersive absolute black' },
        { id: 'surface', hex: P.surface, role: 'Surface / Cards', tooltip: 'Burgundy theatre curtain feel' },
        { id: 'accent', hex: P.accent, role: 'Primary CTA / Gold', tooltip: 'Luxury film production vibe' },
        { id: 'secondary', hex: '#0D5C63', role: 'Secondary Accent / Teal', tooltip: 'Split complement to Burgundy for contrast' },
        { id: 'text', hex: P.text, role: 'Primary Text / Ivory', tooltip: 'Legible, softer than pure white' },
    ]
};

const SchemeWheelOverlay = () => {
    const SIZE = 120;
    const CX = SIZE / 2, CY = SIZE / 2;
    const OUTER = 52, INNER = 26;
    const TOTAL = 12;
    const SA = (2 * Math.PI) / TOTAL;

    function slicePath(i, r1 = INNER, r2 = OUTER) {
        const s = i * SA - Math.PI / 2;
        const e = s + SA;
        const p1 = { x: CX + r1 * Math.cos(s), y: CY + r1 * Math.sin(s) };
        const p2 = { x: CX + r2 * Math.cos(s), y: CY + r2 * Math.sin(s) };
        const p3 = { x: CX + r2 * Math.cos(e), y: CY + r2 * Math.sin(e) };
        const p4 = { x: CX + r1 * Math.cos(e), y: CY + r1 * Math.sin(e) };
        return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${r2} ${r2} 0 0 1 ${p3.x} ${p3.y} L ${p4.x} ${p4.y} A ${r1} ${r1} 0 0 0 ${p1.x} ${p1.y} Z`;
    }

    const hues = Array.from({ length: TOTAL }, (_, i) => i * 30);
    
    // Approximate indices for Burgundy (~330-360), Gold (~45), Teal (~180)
    const highlight = [11, 1, 6]; 

    return (
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
            {hues.map((h, i) => (
                <path key={i} d={slicePath(i)} fill={`hsl(${h},80%,${highlight.includes(i) ? 50 : 20}%)`} opacity={highlight.includes(i) ? 1 : 0.3} />
            ))}
            {/* Split complementary lines */}
            {(() => {
                const aBase = 11.5 * SA - Math.PI / 2; // Burgundy
                const aSplit1 = 1.5 * SA - Math.PI / 2; // Gold
                const aSplit2 = 6 * SA - Math.PI / 2; // Teal

                const pBase = { x: CX + (OUTER-2)*Math.cos(aBase), y: CY + (OUTER-2)*Math.sin(aBase) };
                const pS1 = { x: CX + (OUTER-2)*Math.cos(aSplit1), y: CY + (OUTER-2)*Math.sin(aSplit1) };
                const pS2 = { x: CX + (OUTER-2)*Math.cos(aSplit2), y: CY + (OUTER-2)*Math.sin(aSplit2) };

                return (
                    <g opacity={0.6}>
                        <line x1={pBase.x} y1={pBase.y} x2={pS1.x} y2={pS1.y} stroke="white" strokeWidth={1.5} strokeDasharray="2,2" />
                        <line x1={pBase.x} y1={pBase.y} x2={pS2.x} y2={pS2.y} stroke="white" strokeWidth={1.5} strokeDasharray="2,2" />
                        <line x1={pS1.x} y1={pS1.y} x2={pS2.x} y2={pS2.y} stroke="white" strokeWidth={1.5} strokeDasharray="2,2" />
                    </g>
                )
            })()}
            <circle cx={CX} cy={CY} r={INNER - 4} fill={P.bg} />
        </svg>
    );
};

// A mock cinematic UI that will be scanned
const MockUI = ({ activeZone }) => {
    // Zones: 0: Init, 1: Hero (Text/Accent), 2: Surface/Cards, 3: Secondary Action

    return (
        <div style={{
            position: 'relative',
            background: P.bg,
            borderRadius: 16,
            border: `1px solid ${P.surface}`,
            width: '100%',
            maxWidth: 380,
            overflow: 'hidden',
            boxShadow: `0 30px 60px ${P.bg}`,
        }}>
            {/* Header (Text & Base) - Active in Zone 1 */}
            <div style={{ 
                padding: '3rem 2rem 2rem', 
                borderBottom: `1px solid ${P.surface}`,
                transition: 'opacity 0.3s',
                opacity: (activeZone === 0 || activeZone === 1) ? 1 : 0.3
            }}>
                <div style={{ color: P.text, fontSize: '1.8rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem' }}>
                    A PREMIER<br/><span style={{ color: P.accent }}>CINEMATIC</span><br/>EXPERIENCE.
                </div>
                <div style={{ color: P.neutral, fontSize: '0.85rem' }}>
                    Reserve your luxury seating for the grand premiere.
                </div>
            </div>

            {/* Content (Surface) - Active in Zone 2 */}
            <div style={{ 
                padding: '2rem', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                transition: 'opacity 0.3s',
                opacity: (activeZone === 0 || activeZone === 2) ? 1 : 0.3
            }}>
                {[1, 2].map(i => (
                    <div key={i} style={{ 
                        background: P.surface, 
                        borderRadius: 12, 
                        padding: '1rem',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1)`
                    }}>
                        <div style={{ width: 40, height: 60, background: 'rgba(0,0,0,0.5)', borderRadius: 4 }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ background: 'rgba(255,255,255,0.2)', height: 12, width: '80%', borderRadius: 4, marginBottom: 8 }} />
                            <div style={{ background: 'rgba(255,255,255,0.1)', height: 8, width: '40%', borderRadius: 4 }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer / Secondary Action - Active in Zone 3 */}
            <div style={{ 
                padding: '2rem',
                display: 'flex',
                gap: '1rem',
                borderTop: `1px solid ${P.surface}`,
                transition: 'opacity 0.3s',
                opacity: (activeZone === 0 || activeZone === 3) ? 1 : 0.3
            }}>
                <div style={{ 
                    flex: 1, 
                    background: P.accent, 
                    color: P.bg, 
                    padding: '0.8rem', 
                    borderRadius: 8, 
                    textAlign: 'center', 
                    fontWeight: 800, 
                    fontSize: '0.9rem' 
                }}>
                    BOOK TICKETS
                </div>
                <div style={{ 
                    flex: 1, 
                    background: 'transparent',
                    border: `1px solid #0D5C63`, 
                    color: '#0D5C63', 
                    padding: '0.8rem', 
                    borderRadius: 8, 
                    textAlign: 'center', 
                    fontWeight: 700, 
                    fontSize: '0.9rem' 
                }}>
                    TRAILER
                </div>
            </div>
        </div>
    );
};


const DesignAnalysisSection = () => {
    const containerRef = useRef(null);
    const [activeZone, setActiveZone] = useState(0);

    // Scroll mapping
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.2) setActiveZone(0);       // Overview
        else if (latest < 0.45) setActiveZone(1); // Typography & Accent
        else if (latest < 0.7) setActiveZone(2);  // Surfaces
        else setActiveZone(3);                    // Secondary Actions
    });

    // Scanner line movement
    const scannerTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const scannerOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    // Active colors based on zone
    const getActiveColors = () => {
        switch(activeZone) {
            case 0: return [];
            case 1: return ['bg', 'text', 'accent'];
            case 2: return ['surface'];
            case 3: return ['accent', 'secondary'];
            default: return [];
        }
    };
    
    const activeColorIds = getActiveColors();

    const zoneTitles = [
        "Initializing Design Scan...",
        "Base Canvas & Typography",
        "Layering & Depth",
        "Action & Accents"
    ];

    const zoneDesc = [
        "Scroll to deploy the scanner. We will deconstruct a cinematic UI by analyzing its color layers.",
        "Deep black (Bg) provides infinite contrast. Ivory (Text) ensures readability without glare. Gold (Accent) highlights primary branding.",
        "Burgundy (Surface) is used for cards. It elevates elements off the pure black background, creating a 'theatre curtain' spatial depth.",
        "Gold drives the primary action (Book). A complementary Teal anchors secondary actions (Trailer) without competing for dominance."
    ];

    return (
        <section
            id="design-analysis"
            ref={containerRef}
            style={{
                height: '350vh', // long scroll
                position: 'relative',
                background: P.bg,
                borderTop: `1px solid ${P.surface}`,
            }}
        >
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <div style={{ maxWidth: 1200, width: '100%', padding: '0 24px' }}>
                    
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.4rem 1.2rem',
                            background: `rgba(198,161,91,0.1)`,
                            border: `1px solid ${P.accent}44`,
                            borderRadius: '50px',
                            color: P.accent,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                        }}>
                            Interactive Scanner
                        </span>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: P.text, margin: 0, letterSpacing: '-0.02em' }}>
                            Design Deconstruction
                        </h2>
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '4rem', 
                        alignItems: 'flex-start', 
                        justifyContent: 'center' 
                    }}>
                        
                        {/* Mock UI with Scanner Line */}
                        <div style={{ position: 'relative' }}>
                            <MockUI activeZone={activeZone} />
                            
                            {/* The Scanner Laser */}
                            <motion.div style={{
                                position: 'absolute',
                                left: -20, right: -20,
                                height: 2,
                                background: P.text,
                                top: scannerTop,
                                opacity: scannerOpacity,
                                boxShadow: `0 0 20px 4px ${P.accent}88`,
                                zIndex: 10
                            }} />

                            {/* Scan Grid Overlay */}
                            <motion.div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                                pointerEvents: 'none',
                                opacity: scannerOpacity,
                                zIndex: 5,
                                borderRadius: 16
                            }} />
                        </div>

                        {/* Analysis Panel */}
                        <div style={{ 
                            flex: 1, 
                            minWidth: 320, 
                            maxWidth: 500, 
                            background: `${P.surface}11`,
                            border: `1px solid ${P.surface}`,
                            borderRadius: 24,
                            padding: '2.5rem',
                            backdropFilter: 'blur(10px)'
                        }}>
                            
                            {/* Dynamic Text */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeZone}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ minHeight: 140 }}
                                >
                                    <h3 style={{ color: P.text, fontSize: '1.5rem', fontWeight: 800, margin: '0 0 1rem 0' }}>
                                        {zoneTitles[activeZone]}
                                    </h3>
                                    <p style={{ color: P.neutral, fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
                                        {zoneDesc[activeZone]}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            <div style={{ height: 1, background: P.surface, margin: '2rem 0' }} />

                            {/* Color Palette Extraction */}
                            <div>
                                <div style={{ fontSize: '0.75rem', color: `${P.accent}88`, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                                    Extracted Palette
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {DESIGN_DATA.colors.map((c, i) => {
                                        const isHighlighted = activeColorIds.includes(c.id);
                                        const isDimmed = activeZone !== 0 && !isHighlighted;

                                        return (
                                            <motion.div
                                                key={c.id}
                                                animate={{ 
                                                    opacity: isDimmed ? 0.3 : 1,
                                                    x: isHighlighted ? 10 : 0
                                                }}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    background: isHighlighted ? `${P.surface}44` : 'transparent',
                                                    padding: '0.5rem',
                                                    borderRadius: 12,
                                                    border: `1px solid ${isHighlighted ? P.surface : 'transparent'}`
                                                }}
                                            >
                                                <div style={{ 
                                                    width: 36, height: 36, 
                                                    borderRadius: 8, 
                                                    background: c.hex,
                                                    border: `1px solid rgba(255,255,255,0.1)`,
                                                    boxShadow: isHighlighted ? `0 0 16px ${c.hex}66` : 'none'
                                                }} />
                                                <div>
                                                    <div style={{ color: P.text, fontWeight: 700, fontSize: '0.95rem' }}>{c.role}</div>
                                                    <div style={{ color: P.neutral, fontSize: '0.8rem' }}>{c.hex.toUpperCase()}</div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mini Wheel showing scheme */}
                            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: 16 }}>
                                <SchemeWheelOverlay />
                                <div>
                                    <div style={{ color: P.text, fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                        {DESIGN_DATA.scheme}
                                    </div>
                                    <div style={{ color: P.neutral, fontSize: '0.8rem', lineHeight: 1.4 }}>
                                        {DESIGN_DATA.schemeNote}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DesignAnalysisSection;
