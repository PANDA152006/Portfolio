import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════
   SVG canvas: 1150 × 700 viewBox

   EXACTLY 10 anatomy elements per the brief:
   Baseline · X-height · Ascender · Descender · Stem ·
   Counter · Terminal · Ligature · Kerning · Leading

   Layout:
   ┌─────────────────────────────────────────────────────┐
   │  "Panda"  (large)   │   g  (descender demo)         │
   │  ─ reference lines ──────────────────────────────── │
   ├─────────────────────────────────────────────────────┤
   │  Ligature example  │ Kerning example │ Leading ex.  │
   └─────────────────────────────────────────────────────┘
═══════════════════════════════════════════════════════════════ */

const VB_W = 1150, VB_H = 700;
const SERIF = '"EB Garamond", Georgia, serif';
const FS = 265;

// Reference y values (shared baseline for both "Panda" and "g")
const Y = {
    ascender: 178,
    capheight: 195,
    xheight: 325,
    baseline: 442,
    descender: 560,
};

/* ── EXACTLY 10 parts ─────────────────────────────────────────── */
const PARTS = [

    /* 1. Baseline */
    {
        id: 'baseline', name: 'Baseline', color: '#7c3aed',
        definition: 'The invisible line upon which letters sit. All other measurements in typography — x-height, cap height, ascender, descender — are calculated relative to the baseline.',
        zone: { cx: 575, cy: Y.baseline },
        line: { x1: 30, y1: Y.baseline, x2: 880, y2: Y.baseline },
        label: { x: 875, y: Y.baseline - 8, anchor: 'end' },
    },

    /* 2. X-height */
    {
        id: 'xheight', name: 'X-Height', color: '#ec4899',
        definition: 'The height of lowercase letters, specifically measured on the letter "x". A larger x-height makes text feel visually bigger and is critical for readability at small sizes.',
        zone: { cx: 575, cy: Y.xheight },
        line: { x1: 30, y1: Y.xheight, x2: 880, y2: Y.xheight },
        label: { x: 875, y: Y.xheight - 8, anchor: 'end' },
    },

    /* 3. Ascender */
    {
        id: 'ascender', name: 'Ascender', color: '#f59e0b',
        definition: 'The upward stroke of a lowercase letter that extends above the x-height — seen in "d", "h", "b", "l", "k". In "Panda", the "d" carries the ascender.',
        zone: { cx: 644, cy: 250 },
        // Double-headed arrow on the 'd' between x-height and ascender line
        arrow: { x1: 624, y1: Y.xheight - 4, x2: 624, y2: Y.ascender + 4 },
        calloutLine: { x1: 624, y1: 260, x2: 570, y2: 260 },
        label: { x: 563, y: 264, anchor: 'end' },
    },

    /* 4. Descender */
    {
        id: 'descender', name: 'Descender', color: '#10b981',
        definition: 'The stroke of a lowercase letter that drops below the baseline — as in "g", "p", "y", "j", "q". The "g" on the right illustrates a full descender with its characteristic loop.',
        zone: { cx: 1020, cy: 500 },
        arrow: { x1: 998, y1: Y.baseline + 5, x2: 998, y2: Y.descender - 5 },
        calloutLine: { x1: 998, y1: 500, x2: 950, y2: 500 },
        label: { x: 943, y: 504, anchor: 'end' },
    },

    /* 5. Stem */
    {
        id: 'stem', name: 'Stem', color: '#06b6d4',
        definition: 'The main vertical (or dominant diagonal) stroke of a letter. In "P", the left vertical is the stem. Stem thickness determines the weight of a typeface — thin stems feel elegant, thick ones feel bold.',
        zone: { cx: 262, cy: 330 },
        callout: { cx: 262, cy: 330, r: 32 },
        calloutLine: { x1: 240, y1: 310, x2: 190, y2: 278 },
        label: { x: 183, y: 272, anchor: 'end' },
    },

    /* 6. Counter */
    {
        id: 'counter', name: 'Counter', color: '#8b5cf6',
        definition: 'The enclosed or partially enclosed white space inside a letter — the "hole" in "o", "d", "b", "a". Open counters feel airy; tight counters feel dense and compact.',
        zone: { cx: 472, cy: 375 },
        callout: { cx: 472, cy: 378, r: 36 },
        calloutLine: { x1: 436, y1: 375, x2: 390, y2: 375 },
        label: { x: 383, y: 379, anchor: 'end' },
    },

    /* 7. Terminal */
    {
        id: 'terminal', name: 'Terminal', color: '#ef4444',
        definition: 'The end of a stroke that has no serif. Can be a ball (teardrop), sheared, or flat finish. The terminal of the lowercase "a" in EB Garamond is a classic ball terminal — a signature of refined old-style typefaces.',
        zone: { cx: 440, cy: 316 },
        callout: { cx: 440, cy: 320, r: 20 },
        calloutLine: { x1: 440, y1: 300, x2: 440, y2: 265 },
        label: { x: 440, y: 256, anchor: 'middle' },
    },

    /* 8 — Ligature (bottom left box) */
    {
        id: 'ligature', name: 'Ligature', color: '#f97316',
        definition: 'Two or more letters merged into one glyph to avoid awkward collisions — most commonly "fi" and "fl". The dot of "i" and the hook of "f" would clash; a ligature resolves this into a single, elegant combined form.',
        zone: { cx: 185, cy: 625 },
    },

    /* 9 — Kerning (bottom centre box) */
    {
        id: 'kerning', name: 'Kerning', color: '#14b8a6',
        definition: 'The manual adjustment of space between a specific pair of letters. "AV", "To", "WA" are classic kerning pairs — without adjustment the gap looks too wide; kerned text feels optically even.',
        zone: { cx: 575, cy: 625 },
    },

    /* 10 — Leading (bottom right box) */
    {
        id: 'leading', name: 'Leading', color: '#a855f7',
        definition: 'The vertical space between consecutive baselines of text. Named after the lead strips typesetters inserted between rows of metal type. Too tight leading causes crowding; too loose creates disconnected paragraphs.',
        zone: { cx: 965, cy: 625 },
    },
];

const LENS_R = 110;

/* ════════════════════════════════════════════════════════════════ */
export default function TypographyAnatomy() {
    const containerRef = useRef(null);
    const svgRef = useRef(null);

    const [mouse, setMouse] = useState(null);
    const [svgRect, setSvgRect] = useState({ w: VB_W, h: VB_H });
    const [revealAll, setRevealAll] = useState(false);
    const [hovered, setHovered] = useState(null);

    const onMove = useCallback((e) => {
        const rect = containerRef.current.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        if (svgRef.current) {
            const sr = svgRef.current.getBoundingClientRect();
            setSvgRect({ w: sr.width, h: sr.height });
        }
    }, []);
    const onLeave = useCallback(() => setMouse(null), []);

    const toSVG = (px, py) => ({
        x: px * (VB_W / svgRect.w),
        y: py * (VB_H / svgRect.h),
    });

    const svgMouse = mouse ? toSVG(mouse.x, mouse.y) : null;
    const lensR_SVG = LENS_R * (VB_W / svgRect.w);

    const inLens = svgMouse
        ? PARTS.filter(p => Math.hypot(p.zone.cx - svgMouse.x, p.zone.cy - svgMouse.y) < lensR_SVG)
        : [];

    const activePart = (hovered ? PARTS.find(p => p.id === hovered) : null)
        ?? inLens[0]
        ?? null;

    const CLIP_ID = 'anatomy-clip';

    /* Render one annotation */
    const renderAnnotation = (p) => {
        // Ligature / Kerning / Leading have no graphical markers — handled separately
        if (['ligature', 'kerning', 'leading'].includes(p.id)) return null;
        return (
            <g key={p.id}>
                {p.line && (
                    <line x1={p.line.x1} y1={p.line.y1} x2={p.line.x2} y2={p.line.y2}
                        stroke={p.color} strokeWidth="2.2" strokeDasharray="8,5" />
                )}
                {p.arrow && (
                    <line x1={p.arrow.x1} y1={p.arrow.y1} x2={p.arrow.x2} y2={p.arrow.y2}
                        stroke={p.color} strokeWidth="2.5"
                        markerEnd={`url(#ah-${p.id})`} markerStart={`url(#ahs-${p.id})`} />
                )}
                {p.callout && (
                    <circle cx={p.callout.cx} cy={p.callout.cy} r={p.callout.r}
                        fill="none" stroke={p.color} strokeWidth="2" strokeDasharray="5,3" />
                )}
                {p.calloutLine && (
                    <line x1={p.calloutLine.x1} y1={p.calloutLine.y1}
                        x2={p.calloutLine.x2} y2={p.calloutLine.y2}
                        stroke={p.color} strokeWidth="1.5" opacity={0.72} />
                )}
                <text x={p.label.x} y={p.label.y} textAnchor={p.label.anchor}
                    fontSize="13.5" fontFamily='"Montserrat",Arial,sans-serif'
                    fontWeight="700" fill={p.color}
                    stroke="rgba(0,0,0,0.82)" strokeWidth="3.5" paintOrder="stroke"
                    style={{ userSelect: 'none' }}>
                    {p.name}
                </text>
            </g>
        );
    };

    /* Bottom inset boxes for Ligature / Kerning / Leading */
    const BottomBoxes = ({ inside }) => {
        const lig = PARTS.find(p => p.id === 'ligature');
        const ker = PARTS.find(p => p.id === 'kerning');
        const lea = PARTS.find(p => p.id === 'leading');

        return (
            <g>
                {/* Divider */}
                <line x1="30" y1="575" x2="1120" y2="575"
                    stroke={inside ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}
                    strokeWidth="1" strokeDasharray="4,4" />

                {/* ── LIGATURE box (x: 30–370) ── */}
                <rect x="30" y="580" width="340" height="108" rx="12"
                    fill={inside ? `${lig.color}18` : 'rgba(255,255,255,0.02)'}
                    stroke={inside ? `${lig.color}66` : 'rgba(255,255,255,0.07)'}
                    strokeWidth="1.5" />
                {/* Label */}
                <text x="50" y="600" fontSize="10" fontFamily='"Montserrat",Arial,sans-serif'
                    fontWeight="700" fill={lig.color} letterSpacing="1.5"
                    stroke="rgba(0,0,0,0.7)" strokeWidth="2.5" paintOrder="stroke"
                    style={{ userSelect: 'none' }}>
                    LIGATURE
                </text>
                {/* Without ligature */}
                <text x="55" y="640" fontSize="38" fontFamily={SERIF} fill="rgba(255,255,255,0.55)"
                    style={{ userSelect: 'none' }}>f i</text>
                <text x="55" y="658" fontSize="8.5" fontFamily='"Montserrat",Arial,sans-serif'
                    fill="rgba(255,255,255,0.28)" style={{ userSelect: 'none' }}>without</text>
                {/* Arrow */}
                <text x="165" y="643" fontSize="16" fill="rgba(255,255,255,0.3)"
                    style={{ userSelect: 'none' }}>→</text>
                {/* With ligature */}
                <text x="188" y="640" fontSize="38" fontFamily={SERIF} fill={inside ? lig.color : 'rgba(255,255,255,0.75)'}
                    style={{ userSelect: 'none' }}>&#64257;</text>
                <text x="188" y="658" fontSize="8.5" fontFamily='"Montserrat",Arial,sans-serif'
                    fill={inside ? lig.color : 'rgba(255,255,255,0.28)'} style={{ userSelect: 'none' }}>with ligature</text>
                {/* fl */}
                <text x="240" y="640" fontSize="38" fontFamily={SERIF} fill={inside ? lig.color : 'rgba(255,255,255,0.75)'}
                    style={{ userSelect: 'none' }}>&#64258;</text>
                <text x="295" y="640" fontSize="38" fontFamily={SERIF} fill="rgba(255,255,255,0.55)"
                    style={{ userSelect: 'none' }}>f l</text>
                <text x="295" y="658" fontSize="8.5" fontFamily='"Montserrat",Arial,sans-serif'
                    fill="rgba(255,255,255,0.28)" style={{ userSelect: 'none' }}>without</text>

                {/* ── KERNING box (x: 390–760) ── */}
                <rect x="390" y="580" width="370" height="108" rx="12"
                    fill={inside ? `${ker.color}18` : 'rgba(255,255,255,0.02)'}
                    stroke={inside ? `${ker.color}66` : 'rgba(255,255,255,0.07)'}
                    strokeWidth="1.5" />
                <text x="410" y="600" fontSize="10" fontFamily='"Montserrat",Arial,sans-serif'
                    fontWeight="700" fill={ker.color} letterSpacing="1.5"
                    stroke="rgba(0,0,0,0.7)" strokeWidth="2.5" paintOrder="stroke"
                    style={{ userSelect: 'none' }}>
                    KERNING
                </text>
                {/* Pair without kerning — exaggerated gap */}
                <text x="415" y="648" fontSize="46" fontFamily={SERIF} letterSpacing="18"
                    fill="rgba(255,255,255,0.5)" style={{ userSelect: 'none' }}>AV</text>
                <text x="415" y="661" fontSize="8.5" fontFamily='"Montserrat",Arial,sans-serif'
                    fill="rgba(255,255,255,0.28)" style={{ userSelect: 'none' }}>poor kerning</text>
                {/* Arrow */}
                <text x="530" y="651" fontSize="16" fill="rgba(255,255,255,0.3)"
                    style={{ userSelect: 'none' }}>→</text>
                {/* Pair with kerning — normal */}
                <text x="560" y="648" fontSize="46" fontFamily={SERIF} letterSpacing="-4"
                    fill={inside ? ker.color : 'rgba(255,255,255,0.82)'} style={{ userSelect: 'none' }}>AV</text>
                <text x="560" y="661" fontSize="8.5" fontFamily='"Montserrat",Arial,sans-serif'
                    fill={inside ? ker.color : 'rgba(255,255,255,0.28)'} style={{ userSelect: 'none' }}>kerned</text>
                {/* "To" example */}
                <text x="635" y="648" fontSize="46" fontFamily={SERIF} letterSpacing="-6"
                    fill={inside ? ker.color : 'rgba(255,255,255,0.82)'} style={{ userSelect: 'none' }}>To</text>
                <text x="635" y="661" fontSize="8.5" fontFamily='"Montserrat",Arial,sans-serif'
                    fill={inside ? ker.color : 'rgba(255,255,255,0.28)'} style={{ userSelect: 'none' }}>kerned</text>

                {/* ── LEADING box (x: 780–1120) ── */}
                <rect x="780" y="580" width="340" height="108" rx="12"
                    fill={inside ? `${lea.color}18` : 'rgba(255,255,255,0.02)'}
                    stroke={inside ? `${lea.color}66` : 'rgba(255,255,255,0.07)'}
                    strokeWidth="1.5" />
                <text x="800" y="600" fontSize="10" fontFamily='"Montserrat",Arial,sans-serif'
                    fontWeight="700" fill={lea.color} letterSpacing="1.5"
                    stroke="rgba(0,0,0,0.7)" strokeWidth="2.5" paintOrder="stroke"
                    style={{ userSelect: 'none' }}>
                    LEADING
                </text>
                {/* Tight leading block */}
                <text x="803" y="622" fontSize="12" fontFamily={SERIF}
                    fill="rgba(255,255,255,0.5)" style={{ userSelect: 'none' }}>Typography is the art</text>
                <text x="803" y="633" fontSize="12" fontFamily={SERIF}
                    fill="rgba(255,255,255,0.5)" style={{ userSelect: 'none' }}>of arranging type. It</text>
                <text x="803" y="644" fontSize="12" fontFamily={SERIF}
                    fill="rgba(255,255,255,0.5)" style={{ userSelect: 'none' }}>governs readability.</text>
                <text x="803" y="656" fontSize="8" fontFamily='"Montserrat",Arial,sans-serif'
                    fill="rgba(255,255,255,0.28)" style={{ userSelect: 'none' }}>tight leading</text>
                {/* Arrow */}
                <text x="914" y="638" fontSize="14" fill="rgba(255,255,255,0.3)"
                    style={{ userSelect: 'none' }}>→</text>
                {/* Open leading block */}
                <text x="938" y="616" fontSize="11" fontFamily={SERIF}
                    fill={inside ? lea.color : 'rgba(255,255,255,0.75)'} style={{ userSelect: 'none' }}>Typography</text>
                {inside && <line x1="938" y1="616" x2="938" y2="628" stroke={lea.color} strokeWidth="1.5" strokeDasharray="2,2" />}
                <text x="938" y="635" fontSize="11" fontFamily={SERIF}
                    fill={inside ? lea.color : 'rgba(255,255,255,0.75)'} style={{ userSelect: 'none' }}>is the art</text>
                {inside && (
                    <>
                        <line x1="930" y1="617" x2="930" y2="635" stroke={lea.color} strokeWidth="1.5" markerEnd={`url(#ah-leading)`} />
                        <text x="920" y="626" fontSize="7.5" fontFamily='"Montserrat",Arial,sans-serif'
                            textAnchor="end" fill={lea.color} style={{ userSelect: 'none' }}>leading</text>
                    </>
                )}
                <text x="938" y="648" fontSize="8" fontFamily='"Montserrat",Arial,sans-serif'
                    fill={inside ? lea.color : 'rgba(255,255,255,0.28)'} style={{ userSelect: 'none' }}>open leading</text>
            </g>
        );
    };

    const TheLetters = ({ fill }) => (
        <>
            <text x="430" y={Y.baseline} fontSize={FS} fontFamily={SERIF}
                fill={fill} textAnchor="middle" style={{ userSelect: 'none', letterSpacing: '-3px' }}>
                Panda
            </text>
            {/* Divider between Panda and g */}
            <line x1="900" y1="190" x2="900" y2="560"
                stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4,4" />
            <text x="1020" y={Y.baseline} fontSize={FS} fontFamily={SERIF}
                fill={fill} textAnchor="middle" style={{ userSelect: 'none' }}>
                g
            </text>
        </>
    );

    return (
        <div style={{ padding: '2rem 0' }}>

            {/* Intro + Reveal All */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ maxWidth: '820px', margin: '0 auto 2rem', textAlign: 'center' }}
            >
                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                    Move the magnifying glass over the letterforms to reveal each anatomical element.
                    Ligature, Kerning and Leading are illustrated in the panels below — hover there too.
                </p>
                <motion.button
                    onClick={() => setRevealAll(v => !v)}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                    style={{
                        padding: '0.72rem 2rem', borderRadius: '50px',
                        border: `2px solid ${revealAll ? '#7c3aed' : 'rgba(255,255,255,0.2)'}`,
                        background: revealAll
                            ? 'linear-gradient(135deg,#7c3aed,#ec4899)'
                            : 'rgba(255,255,255,0.05)',
                        color: 'white', fontSize: '0.95rem', fontWeight: 700,
                        cursor: 'pointer', letterSpacing: '0.04em',
                        boxShadow: revealAll ? '0 0 24px #7c3aed55' : 'none',
                        transition: 'all 0.3s',
                    }}
                >
                    {revealAll ? '🙈 Hide All' : '✨ Reveal All'}
                </motion.button>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 290px', gap: '2rem', alignItems: 'start' }}>

                {/* SVG Canvas */}
                <div
                    ref={containerRef}
                    onMouseMove={onMove}
                    onMouseLeave={onLeave}
                    style={{
                        position: 'relative', borderRadius: '20px',
                        border: '1.5px solid rgba(255,255,255,0.08)',
                        background: 'rgba(255,255,255,0.015)',
                        overflow: 'hidden',
                        cursor: revealAll ? 'default' : 'none',
                        userSelect: 'none',
                    }}
                >
                    <svg ref={svgRef} viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ width: '100%', display: 'block' }}>
                        <defs>
                            {/* Arrow markers for each arrow-using part */}
                            {['ascender', 'descender', 'leading'].map(id => (
                                <g key={id}>
                                    <marker id={`ah-${id}`} markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                                        <path d="M0,0 L8,4 L0,8 Z" fill={PARTS.find(p => p.id === id)?.color ?? 'white'} />
                                    </marker>
                                    <marker id={`ahs-${id}`} markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
                                        <path d="M0,0 L8,4 L0,8 Z" fill={PARTS.find(p => p.id === id)?.color ?? 'white'} />
                                    </marker>
                                </g>
                            ))}
                            {svgMouse && !revealAll && (
                                <clipPath id={CLIP_ID}>
                                    <circle cx={svgMouse.x} cy={svgMouse.y} r={lensR_SVG} />
                                </clipPath>
                            )}
                        </defs>

                        {/* Faint guide lines (always) */}
                        {PARTS.filter(p => p.line).map(p => (
                            <line key={p.id + '-bg'}
                                x1={p.line.x1} y1={p.line.y1} x2={p.line.x2} y2={p.line.y2}
                                stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="6,6" />
                        ))}

                        {/* Letters (base) */}
                        <TheLetters fill="rgba(255,255,255,0.88)" />

                        {/* Bottom box frames — always faint */}
                        <BottomBoxes inside={false} />

                        {/* ─── Reveal All ─── */}
                        {revealAll && (
                            <>
                                {PARTS.map(renderAnnotation)}
                                <BottomBoxes inside={true} />
                            </>
                        )}

                        {/* ─── Magnifier mode ─── */}
                        {!revealAll && svgMouse && (
                            <>
                                <g clipPath={`url(#${CLIP_ID})`}>
                                    <circle cx={svgMouse.x} cy={svgMouse.y} r={lensR_SVG}
                                        fill="rgba(6,6,20,0.6)" />
                                    <TheLetters fill="white" />
                                    {PARTS.map(renderAnnotation)}
                                    <BottomBoxes inside={true} />
                                </g>
                                {/* Lens ring */}
                                <circle cx={svgMouse.x} cy={svgMouse.y} r={lensR_SVG}
                                    fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3" />
                                <circle cx={svgMouse.x} cy={svgMouse.y} r={lensR_SVG - 7}
                                    fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
                                {/* Handle */}
                                <line
                                    x1={svgMouse.x + lensR_SVG * 0.72}
                                    y1={svgMouse.y + lensR_SVG * 0.72}
                                    x2={svgMouse.x + lensR_SVG * 0.72 + 44}
                                    y2={svgMouse.y + lensR_SVG * 0.72 + 44}
                                    stroke="rgba(255,255,255,0.55)" strokeWidth="10" strokeLinecap="round" />
                                {/* Glare */}
                                <ellipse
                                    cx={svgMouse.x - lensR_SVG * 0.38} cy={svgMouse.y - lensR_SVG * 0.42}
                                    rx={lensR_SVG * 0.2} ry={lensR_SVG * 0.1}
                                    fill="rgba(255,255,255,0.14)"
                                    transform={`rotate(-35,${svgMouse.x - lensR_SVG * 0.38},${svgMouse.y - lensR_SVG * 0.42})`} />
                            </>
                        )}

                        {/* Idle hint */}
                        {!mouse && !revealAll && (
                            <text x={440} y={Y.descender + 14} textAnchor="middle"
                                fontSize="14" fill="rgba(255,255,255,0.18)"
                                fontFamily='"Montserrat",Arial,sans-serif' style={{ userSelect: 'none' }}>
                                🔍 hover to explore · or click Reveal All
                            </text>
                        )}
                    </svg>
                </div>

                {/* Info + Index panel */}
                <div style={{ position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <AnimatePresence mode="wait">
                        {activePart ? (
                            <motion.div key={activePart.id}
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}
                                style={{
                                    background: `linear-gradient(135deg,${activePart.color}22 0%,rgba(6,6,20,0.9) 100%)`,
                                    border: `2px solid ${activePart.color}`,
                                    borderRadius: '18px', padding: '1.4rem',
                                    boxShadow: `0 0 28px ${activePart.color}44`,
                                }}
                            >
                                <div style={{
                                    width: '10px', height: '10px', borderRadius: '50%',
                                    background: activePart.color, marginBottom: '0.6rem',
                                    boxShadow: `0 0 8px ${activePart.color}`,
                                }} />
                                <h3 style={{
                                    fontFamily: '"EB Garamond",Georgia,serif', fontSize: '1.7rem',
                                    margin: '0 0 0.75rem 0', color: activePart.color, fontWeight: 400,
                                }}>{activePart.name}</h3>
                                <p style={{ fontSize: '0.87rem', lineHeight: '1.75', color: 'rgba(255,255,255,0.82)', margin: 0 }}>
                                    {activePart.definition}
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{
                                    border: '1.5px solid rgba(255,255,255,0.07)', borderRadius: '18px',
                                    padding: '1.4rem', background: 'rgba(255,255,255,0.02)', textAlign: 'center',
                                }}
                            >
                                <div style={{ fontSize: '2.4rem', marginBottom: '0.8rem', opacity: 0.3 }}>🔍</div>
                                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                                    Hover the magnifier over the letters or the panels below to reveal each part.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 10-part index */}
                    <div>
                        <p style={{
                            fontSize: '0.63rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.22)', margin: '0 0 0.6rem 0', fontWeight: 700,
                        }}>10 Elements</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {PARTS.map(p => {
                                const isActive = activePart?.id === p.id;
                                return (
                                    <div key={p.id}
                                        onMouseEnter={() => setHovered(p.id)}
                                        onMouseLeave={() => setHovered(null)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '0.55rem',
                                            cursor: 'pointer',
                                            opacity: isActive ? 1 : 0.38,
                                            transition: 'opacity 0.2s',
                                        }}
                                    >
                                        <div style={{
                                            width: '8px', height: '8px', borderRadius: '50%',
                                            background: p.color, flexShrink: 0,
                                            boxShadow: isActive ? `0 0 6px ${p.color}` : 'none',
                                        }} />
                                        <span style={{
                                            fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)',
                                            fontWeight: isActive ? 700 : 400,
                                        }}>{p.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
