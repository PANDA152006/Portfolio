import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

// Theme Context
const P = {
    bg: '#0B0B0B',
    surface: '#6B0F1A',
    accent: '#C6A15B',
    neutral: '#B8B8B8',
    text: '#F2F2F2',
};

// 12 hue slices of the color wheel
const WHEEL_COLORS = [
    { hue: 0, hex: '#ff0000', name: 'Red', type: 'primary' },
    { hue: 30, hex: '#ff8000', name: 'Orange', type: 'secondary' },
    { hue: 60, hex: '#ffff00', name: 'Yellow', type: 'primary' },
    { hue: 90, hex: '#80ff00', name: 'Yellow-Green', type: 'tertiary' },
    { hue: 120, hex: '#00ff00', name: 'Green', type: 'secondary' },
    { hue: 150, hex: '#00ff80', name: 'Blue-Green', type: 'tertiary' },
    { hue: 180, hex: '#00ffff', name: 'Cyan', type: 'tertiary' },
    { hue: 210, hex: '#0080ff', name: 'Blue-Violet', type: 'tertiary' },
    { hue: 240, hex: '#0000ff', name: 'Blue', type: 'primary' },
    { hue: 270, hex: '#8000ff', name: 'Violet', type: 'secondary' },
    { hue: 300, hex: '#ff00ff', name: 'Magenta', type: 'tertiary' },
    { hue: 330, hex: '#ff0080', name: 'Red-Violet', type: 'tertiary' },
];

const MIX_INFO = {
    secondary: {
        Orange: { parents: ['Red', 'Yellow'] },
        Green: { parents: ['Yellow', 'Blue'] },
        Violet: { parents: ['Blue', 'Red'] },
    }
};

const SIZE = 400;
const CX = SIZE / 2;
const CY = SIZE / 2;
const OUTER_R = 170;
const INNER_R = 90;
const TOTAL = WHEEL_COLORS.length;
const SLICE_ANGLE = (2 * Math.PI) / TOTAL;

function polarToRect(cx, cy, r, angle) {
    return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
    };
}

function slicePath(cx, cy, innerR, outerR, startAngle, endAngle) {
    const p1 = polarToRect(cx, cy, innerR, startAngle);
    const p2 = polarToRect(cx, cy, outerR, startAngle);
    const p3 = polarToRect(cx, cy, outerR, endAngle);
    const p4 = polarToRect(cx, cy, innerR, endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${p3.x} ${p3.y} L ${p4.x} ${p4.y} A ${innerR} ${innerR} 0 ${largeArc} 0 ${p1.x} ${p1.y} Z`;
}

function labelPos(cx, cy, r, angle) {
    return polarToRect(cx, cy, r, angle);
}

const TypeBadge = ({ type }) => {
    const map = {
        primary: { label: 'Primary', color: '#C6A15B' },
        secondary: { label: 'Secondary', color: '#8A1424' },
        tertiary: { label: 'Tertiary', color: '#4A0810' },
    };
    const { label, color } = map[type] || {};
    return (
        <span style={{
            display: 'inline-block',
            padding: '0.2rem 0.7rem',
            background: `${color}22`,
            border: `1px solid ${color}`,
            borderRadius: '20px',
            color: type === 'tertiary' ? '#F2F2F2' : color,
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
        }}>
            {label}
        </span>
    );
};

// Sub-component for individual slices to map scroll correctly
const WheelSlice = ({ color, startAngle, endAngle, midAngle, isHovered, isSelected, scrollYProgress, setHovered, setSelected, focusedType, i }) => {
    // Map scroll values to animation layers
    // Primary: 0 -> 0.3
    // Secondary: 0.35 -> 0.65
    // Tertiary: 0.7 -> 1.0
    const scrollMap = {
        primary: [0, 0.25, 0.35],
        secondary: [0.35, 0.6, 0.7],
        tertiary: [0.7, 0.9, 1.0],
    };

    const targetScrollPoints = scrollMap[color.type];
    
    // Scale and opacity mapped to scroll
    const scale = useTransform(scrollYProgress, targetScrollPoints, [0, 1.1, 1]);
    const opacity = useTransform(scrollYProgress, targetScrollPoints, [0, 1, 1]);

    const rOuter = (isHovered || isSelected) ? OUTER_R + 18 : OUTER_R;
    const rInner = (isHovered || isSelected) ? INNER_R - 8 : INNER_R;
    const path = slicePath(CX, CY, rInner, rOuter, startAngle, endAngle);

    // Dimming logic: if a focused type is active and this isn't it, dim it.
    const isDimmed = focusedType && focusedType !== color.type;
    
    // Label position
    const lp = labelPos(CX, CY, OUTER_R + 32, midAngle);

    return (
        <g key={color.name} style={{ transformOrigin: '200px 200px' }}>
            <motion.path
                d={path}
                fill={color.hex}
                stroke={P.bg}
                strokeWidth={3}
                style={{ 
                    cursor: 'pointer', 
                    scale, 
                    opacity: isDimmed ? 0.2 : opacity,
                    filter: isDimmed ? 'grayscale(80%) blur(4px)' : 'none'
                }}
                animate={{
                    filter: isSelected && !isDimmed
                        ? `drop-shadow(0 0 20px ${color.hex}cc)`
                        : isHovered && !isDimmed
                            ? `drop-shadow(0 0 10px ${color.hex}88)`
                            : isDimmed ? 'grayscale(80%) blur(4px)' : 'none',
                    transition: { duration: 0.3 }
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(isSelected ? null : { ...color, i })}
            />
            {((isHovered || isSelected) && !isDimmed) && (
                <text
                    x={lp.x}
                    y={lp.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={P.text}
                    fontSize="11"
                    fontWeight="800"
                    style={{ pointerEvents: 'none', textShadow: `0 2px 10px ${P.bg}, 0 2px 5px ${P.bg}` }}
                >
                    {color.name}
                </text>
            )}
        </g>
    );
};


const ColorWheelInteractive = () => {
    const [hovered, setHovered] = useState(null);
    const [selected, setSelected] = useState(null);
    const [focusedType, setFocusedType] = useState(null);
    
    const containerRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const titleY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
    const titleOp = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    const descriptions = {
        primary: 'Primary colors are the foundation of the cinematic palette. They represent raw, irreducible elements in a scene.',
        secondary: 'Secondary colors are created by combining primary lights or pigments, enriching the visual depth.',
        tertiary: 'Tertiary colors fill the gaps, providing subtle gradations that make lighting and shadows feel organic and nuanced.',
    };

    return (
        <div ref={containerRef} style={{ width: '100%', minHeight: '120vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            
            <motion.div style={{ textAlign: 'center', marginBottom: '1rem', y: titleY, opacity: titleOp }}>
                <h3 style={{ fontSize: '1.2rem', color: P.accent, textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0 0 1rem 0' }}>The Assembly</h3>
                <p style={{ color: P.neutral, maxWidth: 500, margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    As you scroll, watch how the wheel constructs itself sequentially. From the raw primary anchors to the nuanced tertiary bridges.
                </p>
                
                {/* Type filters */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                    {['primary', 'secondary', 'tertiary'].map(t => (
                        <button
                            key={t}
                            onMouseEnter={() => setFocusedType(t)}
                            onMouseLeave={() => setFocusedType(null)}
                            style={{
                                background: focusedType === t ? P.surface : 'transparent',
                                border: `1px solid ${focusedType === t ? P.accent : 'rgba(255,255,255,0.1)'}`,
                                color: focusedType === t ? P.text : P.neutral,
                                padding: '0.5rem 1rem',
                                borderRadius: 30,
                                cursor: 'crosshair',
                                textTransform: 'capitalize',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {t} View
                        </button>
                    ))}
                </div>
            </motion.div>


            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4rem',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                position: 'sticky',
                top: '20vh',
            }}>
                {/* SVG Animated Wheel */}
                <div style={{ position: 'relative', flexShrink: 0, width: SIZE, height: SIZE }}>
                    <svg
                        width={SIZE}
                        height={SIZE}
                        viewBox={`0 0 ${SIZE} ${SIZE}`}
                        style={{ overflow: 'visible', filter: `drop-shadow(0 20px 40px ${P.surface}66)` }}
                    >
                        {WHEEL_COLORS.map((color, i) => {
                            const startAngle = i * SLICE_ANGLE - Math.PI / 2;
                            const endAngle = startAngle + SLICE_ANGLE;
                            const midAngle = (startAngle + endAngle) / 2;
                            
                            return (
                                <WheelSlice 
                                    key={color.name}
                                    color={color}
                                    i={i}
                                    startAngle={startAngle}
                                    endAngle={endAngle}
                                    midAngle={midAngle}
                                    isHovered={hovered === i}
                                    isSelected={selected?.i === i}
                                    scrollYProgress={scrollYProgress}
                                    setHovered={setHovered}
                                    setSelected={setSelected}
                                    focusedType={focusedType}
                                />
                            );
                        })}

                        {/* Center hub */}
                        <circle cx={CX} cy={CY} r={INNER_R - 8} fill={P.bg} stroke={P.surface} strokeWidth="2" />
                        <text x={CX} y={CY - 12} textAnchor="middle" fill={P.neutral} fontSize="12" fontWeight="700" letterSpacing="0.1em">
                            COLOR
                        </text>
                        <text x={CX} y={CY + 12} textAnchor="middle" fill={P.neutral} fontSize="12" fontWeight="700" letterSpacing="0.1em">
                            WHEEL
                        </text>
                        {selected && (
                            <>
                                <circle cx={CX} cy={CY} r={INNER_R - 10} fill={selected.hex} opacity={0.15} />
                                <circle cx={CX} cy={CY} r={18} fill={selected.hex} />
                            </>
                        )}
                    </svg>
                </div>

                {/* Info panel */}
                <div style={{ flex: '1', minWidth: '300px', maxWidth: '420px', height: '350px' }}>
                    <AnimatePresence mode="wait">
                        {selected ? (
                            <motion.div
                                key={selected.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                style={{
                                    background: `linear-gradient(145deg, ${P.surface}ee, ${P.bg}ee)`,
                                    border: `1px solid rgba(198,161,91,0.15)`,
                                    borderRadius: '24px',
                                    padding: '2.5rem',
                                    backdropFilter: 'blur(20px)',
                                    boxShadow: `0 24px 60px ${P.bg}`,
                                    height: '100%',
                                    position: 'relative',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.5rem' }}>
                                    <motion.div
                                        layoutId="selectedSwatch"
                                        style={{
                                            width: 56, height: 56,
                                            borderRadius: '16px',
                                            background: selected.hex,
                                            boxShadow: `0 8px 32px ${selected.hex}88`,
                                            flexShrink: 0,
                                        }}
                                    />
                                    <div>
                                        <h3 style={{ color: P.text, margin: '0 0 0.3rem 0', fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em' }}>{selected.name}</h3>
                                        <code style={{ color: P.accent, fontSize: '0.9rem', fontWeight: 600 }}>{selected.hex}</code>
                                    </div>
                                </div>

                                <TypeBadge type={selected.type} />

                                <p style={{ color: P.neutral, fontSize: '1rem', lineHeight: 1.6, marginTop: '1.5rem', marginBottom: 0 }}>
                                    {descriptions[selected.type]}
                                </p>

                                {selected.type === 'secondary' && MIX_INFO.secondary[selected.name] && (
                                   <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: 16 }}>
                                       <div style={{ fontSize: '0.8rem', color: P.neutral, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>Cinematic Mix Point</div>
                                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                           {MIX_INFO.secondary[selected.name].parents.map((p, j) => {
                                               const parentData = WHEEL_COLORS.find(c => c.name === p);
                                               return (
                                                   <span key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span style={{ width: 14, height: 14, background: parentData.hex, borderRadius: '50%', boxShadow: `0 0 8px ${parentData.hex}` }} />
                                                        <span style={{ color: P.text, fontSize: '0.9rem', fontWeight: 600 }}>{p}</span>
                                                        {j === 0 && <span style={{ color: P.neutral, margin: '0 0.2rem' }}>+</span>}
                                                   </span>
                                               )
                                           })}
                                       </div>
                                   </div>
                                )}

                                <button
                                    onClick={() => setSelected(null)}
                                    style={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                        background: 'transparent',
                                        border: 'none',
                                        color: P.neutral,
                                        fontSize: '1.2rem',
                                        cursor: 'pointer',
                                    }}
                                >
                                    ✕
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: `2px dashed rgba(198,161,91,0.15)`,
                                    borderRadius: '24px',
                                    padding: '2rem',
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '1.5rem', opacity: 0.5, filter: 'grayscale(1)' }}>👆</div>
                                <p style={{ color: P.neutral, fontSize: '1.1rem', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                                    Hover a color slice<br />
                                    to isolate it.<br />
                                    <span style={{ color: P.accent, fontSize: '0.9rem' }}>Click to analyze properties.</span>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ColorWheelInteractive;
