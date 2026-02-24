import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

/* ── Typewriter hook ─────────────────────────────────────────── */
function useTypewriter(text, speed = 38, active = true) {
    const [displayed, setDisplayed] = useState('');
    useEffect(() => {
        if (!active) { setDisplayed(''); return; }
        setDisplayed('');
        let i = 0;
        const id = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) clearInterval(id);
        }, speed);
        return () => clearInterval(id);
    }, [text, active]);
    return displayed;
}

/* ── Radial Mood Dial ────────────────────────────────────────── */
function MoodDial({ meters, color }) {
    const labels = Object.keys(meters);
    const values = Object.values(meters);
    const cx = 110, cy = 110, r = 80;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const points = labels.map((_, i) => {
        const angle = toRad((360 / labels.length) * i - 90);
        const frac = values[i] / 100;
        return [cx + r * frac * Math.cos(angle), cy + r * frac * Math.sin(angle)];
    });
    const webPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + 'Z';
    const gridPath = (frac) => {
        return labels.map((_, i) => {
            const angle = toRad((360 / labels.length) * i - 90);
            return `${i === 0 ? 'M' : 'L'}${(cx + r * frac * Math.cos(angle)).toFixed(1)},${(cy + r * frac * Math.sin(angle)).toFixed(1)}`;
        }).join(' ') + 'Z';
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <svg width="220" height="220" viewBox="0 0 220 220">
                {/* Grid rings */}
                {[0.25, 0.5, 0.75, 1].map((f) => (
                    <path key={f} d={gridPath(f)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                ))}
                {/* Axis lines */}
                {labels.map((_, i) => {
                    const angle = toRad((360 / labels.length) * i - 90);
                    return (
                        <line key={i}
                            x1={cx} y1={cy}
                            x2={(cx + r * Math.cos(angle)).toFixed(1)}
                            y2={(cy + r * Math.sin(angle)).toFixed(1)}
                            stroke="rgba(255,255,255,0.12)" strokeWidth="1"
                        />
                    );
                })}
                {/* Filled polygon */}
                <motion.path
                    d={webPath}
                    fill={`${color}44`}
                    stroke={color}
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
                {/* Dots */}
                {points.map((p, i) => (
                    <motion.circle key={i} cx={p[0]} cy={p[1]} r="4"
                        fill={color}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.07 }}
                    />
                ))}
                {/* Labels */}
                {labels.map((lbl, i) => {
                    const angle = toRad((360 / labels.length) * i - 90);
                    const lx = cx + (r + 22) * Math.cos(angle);
                    const ly = cy + (r + 22) * Math.sin(angle);
                    return (
                        <text key={i} x={lx.toFixed(1)} y={ly.toFixed(1)}
                            textAnchor="middle" dominantBaseline="middle"
                            fontSize="9" fill="rgba(255,255,255,0.6)"
                            style={{ textTransform: 'capitalize' }}
                        >
                            {lbl}
                        </text>
                    );
                })}
            </svg>
            {/* Legend */}
            <div style={{ display: 'grid', gap: '0.5rem' }}>
                {labels.map((lbl, i) => (
                    <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{ width: '30px', height: '6px', borderRadius: '3px', background: `rgba(255,255,255,0.15)`, position: 'relative', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${values[i]}%` }}
                                transition={{ duration: 0.8, delay: i * 0.06 }}
                                style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: color, borderRadius: '3px' }}
                            />
                        </div>
                        <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', textTransform: 'capitalize' }}>{lbl}</span>
                        <span style={{ fontSize: '0.78rem', color: color, fontWeight: 700 }}>{values[i]}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Historical Examples ─────────────────────────────────────── */
function HistoricalExamples({ examples, color }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {examples.map((ex, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    style={{
                        borderRadius: '16px',
                        border: `1.5px solid ${color}44`,
                        overflow: 'hidden',
                        background: 'rgba(0,0,0,0.35)',
                    }}
                >
                    {/* Visual mockup */}
                    <div style={{
                        background: ex.mockupBg,
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: ex.align || 'center',
                        justifyContent: 'center',
                        padding: '1.5rem',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {ex.mockupContent}
                        {/* Era badge */}
                        <span style={{
                            position: 'absolute', top: '10px', right: '10px',
                            background: `${color}33`, border: `1px solid ${color}66`,
                            borderRadius: '20px', padding: '0.2rem 0.7rem',
                            fontSize: '0.68rem', fontWeight: 700, color,
                            letterSpacing: '0.08em',
                        }}>{ex.era}</span>
                    </div>
                    {/* Caption */}
                    <div style={{ padding: '1rem 1.2rem' }}>
                        <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', margin: '0 0 0.3rem 0' }}>
                            {ex.title}
                        </p>
                        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.5 }}>
                            {ex.note}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

/* ── Main Component ──────────────────────────────────────────── */
const FontPsychology = () => {
    const [selected, setSelected] = useState(null);

    const fonts = [
        {
            id: 'garamond',
            name: 'Garamond',
            fontFamily: '"EB Garamond", Garamond, Georgia, serif',
            tagline: 'Wisdom, Grace & Timeless Elegance',
            color: '#c4a96b',
            bg: 'linear-gradient(135deg, #1a1205 0%, #2d2110 50%, #1a1205 100%)',
            accentGlow: '#c4a96b44',
            phrase: '"To design is to communicate clearly by whatever means you can control or master." — Milton Glaser',
            personality: 'Garamond whispers authority without shouting it. Designed in the 16th century for French king Francis I, it carries five centuries of accumulated trust. It says: "This has been thought through."',
            moodMeters: { Elegant: 95, Trustworthy: 90, Formal: 80, Modern: 20, Playful: 8, Bold: 30 },
            traits: ['Classical', 'Scholarly', 'Refined', 'Trustworthy', 'Warm'],
            historicalExamples: [
                {
                    era: '1532',
                    title: 'Les Essais — Michel de Montaigne',
                    note: 'Early French humanist essays. Garamond letterforms defined 16th-century French scholarly publishing.',
                    mockupBg: 'linear-gradient(160deg, #e8dcc8 0%, #d4c4a0 100%)',
                    align: 'flex-start',
                    mockupContent: (
                        <div style={{ width: '100%', fontFamily: '"EB Garamond", Georgia, serif', color: '#2a1a0a' }}>
                            <div style={{ borderBottom: '2px solid #7a5c28', paddingBottom: '0.4rem', marginBottom: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a5c28' }}>De l'Expérience</span>
                                <span style={{ fontSize: '0.55rem', color: '#9a7a48' }}>MDXXXII</span>
                            </div>
                            <p style={{ fontSize: '0.82rem', lineHeight: 1.75, margin: '0 0 0.6rem 0', textIndent: '1.2em' }}>
                                <span style={{ float: 'left', fontSize: '2.8rem', lineHeight: 0.8, marginRight: '0.2rem', fontWeight: 400, color: '#7a5c28' }}>I</span>
                                l n'est désir plus naturel que le désir de connaissance. Nous essayons tous les moyens qui nous y peuvent mener.
                            </p>
                            <p style={{ fontSize: '0.82rem', lineHeight: 1.75, margin: 0, textIndent: '1.2em', color: '#3a2a0a' }}>
                                Quand la raison nous faut, nous y employons l'expérience, qui est un moyen plus foible et moins digne.
                            </p>
                            <div style={{ borderTop: '1px solid #b89a60', marginTop: '0.8rem', paddingTop: '0.4rem', textAlign: 'center', fontSize: '0.6rem', color: '#9a7a48', letterSpacing: '0.1em' }}>— Michel de Montaigne, Essais —</div>
                        </div>
                    ),
                },
                {
                    era: '1997',
                    title: 'Harry Potter — Bloomsbury UK',
                    note: 'Bloomsbury chose Garamond to give the novels a timeless, literary feel that felt both ancient and magical.',
                    mockupBg: 'linear-gradient(160deg, #0a0a1a 0%, #1a1030 100%)',
                    align: 'center',
                    mockupContent: (
                        <div style={{ fontFamily: '"EB Garamond", Georgia, serif', textAlign: 'center', color: '#f0e6b0' }}>
                            <div style={{ width: '100px', height: '3px', background: 'linear-gradient(90deg, transparent, #c4a96b, transparent)', margin: '0 auto 1rem' }} />
                            <p style={{ fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#9a8450', margin: '0 0 0.5rem 0' }}>J. K. Rowling</p>
                            <p style={{ fontSize: '1.6rem', lineHeight: 1.15, margin: '0 0 0.3rem 0', fontWeight: 400, color: '#e8d48a' }}>Harry Potter</p>
                            <p style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#c4a96b', margin: '0 0 1rem 0' }}>and the Philosopher's Stone</p>
                            <div style={{ width: '60px', height: '1px', background: '#c4a96b55', margin: '0 auto 0.8rem' }} />
                            <p style={{ fontSize: '0.72rem', lineHeight: 1.7, color: 'rgba(240,230,176,0.75)', maxWidth: '200px', fontStyle: 'italic' }}>
                                &ldquo;It does not do to dwell on dreams and forget to live.&rdquo;
                            </p>
                            <p style={{ fontSize: '0.58rem', color: '#9a8450', margin: '0.6rem 0 0 0', letterSpacing: '0.1em' }}>BLOOMSBURY · MCMXCVII</p>
                        </div>
                    ),
                },
                {
                    era: '1545',
                    title: 'Royal French Decree — Francis I',
                    note: 'Claude Garamond cut his typefaces specifically for the royal presses of Francis I. This style defined official French state documents.',
                    mockupBg: 'linear-gradient(160deg, #f5edd0 0%, #e8d9aa 100%)',
                    align: 'flex-start',
                    mockupContent: (
                        <div style={{ fontFamily: '"EB Garamond", Georgia, serif', color: '#1a0f00', width: '100%' }}>
                            <div style={{ textAlign: 'center', marginBottom: '0.6rem' }}>
                                <p style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8a6a20', margin: 0 }}>✦ Par le Roy ✦</p>
                                <p style={{ fontSize: '1rem', fontWeight: 400, margin: '0.2rem 0 0 0', color: '#2a1a00' }}>Édit Royal de Fontainebleau</p>
                            </div>
                            <div style={{ borderTop: '1px solid #a07830', borderBottom: '1px solid #a07830', padding: '0.5rem 0', marginBottom: '0.5rem' }}>
                                <p style={{ fontSize: '0.72rem', lineHeight: 1.8, margin: 0, textAlign: 'justify', color: '#3a2500' }}>
                                    François, par la grâce de Dieu, Roy de France. À tous présens et à venir, salut. Voulons et ordonnons que désormais tous actes, &amp; écritures soient en langage maternel français.
                                </p>
                            </div>
                            <p style={{ fontSize: '0.6rem', color: '#8a6a20', margin: 0, textAlign: 'right', fontStyle: 'italic' }}>Donné à Fontainebleau, l'an de grâce 1539</p>
                        </div>
                    ),
                },
            ],
            usedBy: [
                { brand: 'Adobe Garamond', note: 'Adobe\'s flagship document typeface since 1989' },
                { brand: 'Abercrombie & Fitch', note: 'Heritage fashion brand identity' },
                { brand: 'Harry Potter (UK editions)', note: 'Bloomsbury chose it for literary prestige' },
            ],
        },
        {
            id: 'montserrat',
            name: 'Montserrat',
            fontFamily: '"Montserrat", "Helvetica Neue", Arial, sans-serif',
            tagline: 'Confidence, Clarity & Urban Energy',
            color: '#60a5fa',
            bg: 'linear-gradient(135deg, #020c1b 0%, #0f2646 50%, #020c1b 100%)',
            accentGlow: '#60a5fa33',
            phrase: '"Simplicity is the ultimate sophistication." — Leonardo da Vinci',
            personality: 'Montserrat is the voice of modern cities. Inspired by the signage of the Montserrat neighbourhood in Buenos Aires, it blends geometric precision with humanist warmth — perfect for brands that mean business but still want to be liked.',
            moodMeters: { Elegant: 60, Trustworthy: 75, Formal: 55, Modern: 95, Playful: 42, Bold: 80 },
            traits: ['Modern', 'Clean', 'Versatile', 'Confident', 'Geometric'],
            historicalExamples: [
                {
                    era: '1900s',
                    title: 'Buenos Aires Signage — Montserrat Barrio',
                    note: 'Julieta Ulanovsky designed Montserrat by studying the hand-painted signs and lettering in her Buenos Aires neighbourhood.',
                    mockupBg: 'linear-gradient(160deg, #0d1a2e 0%, #1a2f50 100%)',
                    align: 'center',
                    mockupContent: (
                        <div style={{ fontFamily: '"Montserrat", Arial, sans-serif', textAlign: 'center' }}>
                            <div style={{ border: '3px solid #60a5fa', borderRadius: '4px', padding: '1rem 1.5rem', background: 'rgba(96,165,250,0.06)' }}>
                                <p style={{ fontSize: '0.55rem', letterSpacing: '0.4em', color: '#60a5fa99', margin: '0 0 0.3rem 0', textTransform: 'uppercase' }}>Barrio</p>
                                <p style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.1rem 0', letterSpacing: '-0.02em' }}>MONTSERRAT</p>
                                <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #60a5fa, transparent)', margin: '0.3rem 0' }} />
                                <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', color: '#60a5fa', margin: 0, textTransform: 'uppercase' }}>Buenos Aires · Argentina</p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.8rem' }}>
                                {['FARMACIA', 'LIBRERÍA', 'PANADERÍA'].map(s => (
                                    <span key={s} style={{ fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '3px', padding: '0.15rem 0.4rem' }}>{s}</span>
                                ))}
                            </div>
                        </div>
                    ),
                },
                {
                    era: '2014',
                    title: 'Canva — Default UI Typeface',
                    note: 'Canva adopted Montserrat as its primary UI font, making it one of the most-seen typefaces on the modern web.',
                    mockupBg: 'linear-gradient(160deg, #0f172a 0%, #1e293b 100%)',
                    align: 'flex-start',
                    mockupContent: (
                        <div style={{ fontFamily: '"Montserrat", Arial, sans-serif', width: '100%' }}>
                            <div style={{ background: '#1e40af', borderRadius: '8px 8px 0 0', padding: '0.5rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                                <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', marginLeft: '0.5rem', fontWeight: 600 }}>canva.com</span>
                            </div>
                            <div style={{ background: '#f8fafc', borderRadius: '0 0 6px 6px', padding: '0.8rem', color: '#0f172a' }}>
                                <p style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.1em', color: '#6366f1', margin: '0 0 0.2rem 0', textTransform: 'uppercase' }}>Featured Template</p>
                                <p style={{ fontSize: '1.1rem', fontWeight: 900, margin: '0 0 0.3rem 0', lineHeight: 1.1 }}>Design anything,<br />publish everywhere.</p>
                                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                                    <div style={{ background: '#6366f1', borderRadius: '4px', padding: '0.25rem 0.6rem', fontSize: '0.55rem', fontWeight: 700, color: 'white' }}>Create design</div>
                                    <div style={{ border: '1px solid #6366f1', borderRadius: '4px', padding: '0.25rem 0.6rem', fontSize: '0.55rem', fontWeight: 700, color: '#6366f1' }}>Templates</div>
                                </div>
                            </div>
                        </div>
                    ),
                },
                {
                    era: '2017',
                    title: 'Festival Poster — Modern Print',
                    note: 'Montserrat\'s geometric boldness made it the go-to font for music festival posters, balancing impact with legibility.',
                    mockupBg: 'linear-gradient(160deg, #09000f 0%, #180028 100%)',
                    align: 'center',
                    mockupContent: (
                        <div style={{ fontFamily: '"Montserrat", Arial, sans-serif', textAlign: 'center', width: '100%' }}>
                            <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.35em', color: '#a78bfa', margin: '0 0 0.2rem 0', textTransform: 'uppercase' }}>Presents</p>
                            <p style={{ fontSize: '2rem', fontWeight: 900, color: 'white', margin: 0, lineHeight: 1, letterSpacing: '-0.03em' }}>AURORA</p>
                            <p style={{ fontSize: '0.7rem', fontWeight: 900, color: '#60a5fa', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0.1rem 0 0.6rem 0' }}>FESTIVAL</p>
                            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)', margin: '0 auto 0.6rem', width: '80%' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                                {['MAIN STAGE', 'JULY 14–16', 'BARCELONA'].map(t => (
                                    <span key={t} style={{ fontSize: '0.5rem', fontWeight: 800, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.55)' }}>{t}</span>
                                ))}
                            </div>
                        </div>
                    ),
                },
            ],
            usedBy: [
                { brand: 'Canva', note: 'Default heading font — clarity at scale' },
                { brand: 'Nordstrom', note: 'Approachable luxury retail branding' },
                { brand: 'Google Fonts (Top 10)', note: 'One of the most used fonts on the web' },
            ],
        },
        {
            id: 'comic',
            name: 'Comic Sans',
            fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive',
            tagline: 'Fun, Audacious & Unapologetically Itself',
            color: '#facc15',
            bg: 'linear-gradient(135deg, #0f0a00 0%, #1f1500 50%, #0f0a00 100%)',
            accentGlow: '#facc1533',
            phrase: '"Rules are made to be broken — especially in typography." — Unknown',
            personality: 'Comic Sans is the most controversial font ever made. Designed in 1994 to mimic speech bubbles, it became ubiquitous — then infamous. But here\'s the truth: it works. For children, for accessibility, for casual warmth. The joke is on those who dismiss it entirely.',
            moodMeters: { Elegant: 5, Trustworthy: 35, Formal: 3, Modern: 30, Playful: 99, Bold: 55 },
            traits: ['Friendly', 'Casual', 'Accessible', 'Polarising', 'Memorable'],
            historicalExamples: [
                {
                    era: '1994',
                    title: 'Microsoft Bob — The Origin Story',
                    note: 'Comic Sans was created by Vincent Connare in 1994 for Microsoft Bob\'s speech bubbles. It was never shipped in Bob but escaped into Windows 95.',
                    mockupBg: 'linear-gradient(160deg, #1a2800 0%, #2d4400 100%)',
                    align: 'center',
                    mockupContent: (
                        <div style={{ fontFamily: '"Comic Sans MS", cursive', textAlign: 'center' }}>
                            <div style={{ background: '#c0d860', border: '3px solid #5a8000', borderRadius: '12px', padding: '0.8rem 1.2rem', maxWidth: '220px', position: 'relative' }}>
                                <p style={{ fontSize: '0.95rem', color: '#1a2800', margin: '0 0 0.4rem 0', fontWeight: 700 }}>Hi! I'm Rover!</p>
                                <p style={{ fontSize: '0.72rem', color: '#2a3800', margin: 0, lineHeight: 1.5 }}>Welcome to Microsoft Bob. What would you like to do today?</p>
                                {/* Speech bubble tail */}
                                <div style={{ position: 'absolute', bottom: '-14px', left: '30px', width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '6px solid transparent', borderTop: '14px solid #5a8000' }} />
                                <div style={{ position: 'absolute', bottom: '-11px', left: '32px', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '5px solid transparent', borderTop: '12px solid #c0d860' }} />
                            </div>
                            <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', marginTop: '1rem', fontFamily: 'Arial, sans-serif', letterSpacing: '0.1em' }}>MICROSOFT BOB · 1995</p>
                        </div>
                    ),
                },
                {
                    era: '1990s',
                    title: 'Beanie Baby Tags — Ty Inc.',
                    note: 'Ty used Comic Sans on every Beanie Baby heart tag in the late 1990s — one of the most printed uses of the font ever.',
                    mockupBg: 'linear-gradient(160deg, #1a0010 0%, #300020 100%)',
                    align: 'center',
                    mockupContent: (
                        <div style={{ fontFamily: '"Comic Sans MS", cursive', textAlign: 'center' }}>
                            {/* Heart shape */}
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.6rem' }}>
                                <div style={{ background: 'linear-gradient(135deg, #e91e63, #c2185b)', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', position: 'relative', width: '90px', height: '80px', transform: 'rotate(-45deg) scale(0.9)' }}>
                                    <div style={{ position: 'absolute', top: '-44px', left: 0, width: '90px', height: '90px', background: 'linear-gradient(135deg, #e91e63, #c2185b)', borderRadius: '50%' }} />
                                    <div style={{ position: 'absolute', top: 0, right: '-44px', width: '90px', height: '90px', background: 'linear-gradient(135deg, #e91e63, #c2185b)', borderRadius: '50%' }} />
                                </div>
                            </div>
                            <p style={{ fontSize: '1.2rem', color: '#facc15', margin: '0 0 0.2rem 0', fontWeight: 700 }}>Ty</p>
                            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>Beanie Babies®</p>
                            <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.4rem', fontFamily: 'Arial, sans-serif', letterSpacing: '0.08em' }}>circa 1996–2000</p>
                        </div>
                    ),
                },
                {
                    era: '2003',
                    title: 'British Dyslexia Association Guide',
                    note: 'Research showed Comic Sans\'s irregular letterforms are easier to distinguish for dyslexic readers. The BDA officially recommended it.',
                    mockupBg: 'linear-gradient(160deg, #001a10 0%, #002d1a 100%)',
                    align: 'flex-start',
                    mockupContent: (
                        <div style={{ fontFamily: '"Comic Sans MS", cursive', width: '100%', color: '#e8f5e9' }}>
                            <div style={{ background: 'rgba(34,197,94,0.15)', border: '2px solid #22c55e55', borderRadius: '8px', padding: '0.8rem', marginBottom: '0.5rem' }}>
                                <p style={{ fontSize: '0.6rem', fontWeight: 700, color: '#4ade80', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.3rem 0', fontFamily: 'Arial, sans-serif' }}>✓ Dyslexia Friendly</p>
                                <p style={{ fontSize: '1rem', color: 'white', margin: '0 0 0.4rem 0', fontWeight: 700 }}>Reading Support Guide</p>
                                <p style={{ fontSize: '0.72rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                                    Comic Sans has distinct letter shapes — b, d, p, q — that reduce mirror confusion for dyslexic readers.
                                </p>
                            </div>
                            <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', margin: 0, fontFamily: 'Arial, sans-serif' }}>British Dyslexia Association · 2003</p>
                        </div>
                    ),
                },
            ],
            usedBy: [
                { brand: 'Beanie Babies', note: 'The original playful product line' },
                { brand: 'Wii (launch era)', note: 'Nintendo\'s family-first tone of voice' },
                { brand: 'British Dyslexia Association', note: 'Proven readable for dyslexic readers' },
            ],
        },
    ];

    const activeFont = fonts.find(f => f.id === selected);

    return (
        <div style={{ padding: '2rem 0' }}>

            {/* Intro */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ maxWidth: '780px', margin: '0 auto 3.5rem', textAlign: 'center' }}
            >
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    A font speaks before a single word is read. It carries history, personality, and intent.
                    Click each font below to explore its psychology.
                </p>
            </motion.div>

            {/* ── Font Picker Cards ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {fonts.map((font, idx) => {
                    const isActive = selected === font.id;
                    return (
                        <motion.button
                            key={font.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.12 }}
                            whileHover={{ scale: 1.04, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelected(isActive ? null : font.id)}
                            style={{
                                padding: '2.5rem 2rem',
                                background: isActive ? font.bg : 'rgba(255,255,255,0.03)',
                                border: `2px solid ${isActive ? font.color : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: '20px',
                                cursor: 'pointer',
                                textAlign: 'center',
                                boxShadow: isActive ? `0 0 40px ${font.accentGlow}` : 'none',
                                transition: 'all 0.35s ease',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Giant letter watermark */}
                            <div style={{
                                position: 'absolute', top: '-10px', right: '-10px',
                                fontFamily: font.fontFamily, fontSize: '8rem', fontWeight: 900,
                                color: `${font.color}10`, lineHeight: 1, pointerEvents: 'none',
                                userSelect: 'none',
                            }}>Aa</div>

                            <p style={{
                                fontFamily: font.fontFamily,
                                fontSize: '3rem',
                                color: font.color,
                                margin: '0 0 0.5rem 0',
                                lineHeight: 1,
                                fontWeight: font.id === 'comic' ? 700 : 400,
                            }}>
                                {font.name}
                            </p>
                            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 1.2rem 0', fontStyle: 'italic' }}>
                                {font.tagline}
                            </p>
                            {/* Trait pills */}
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {font.traits.slice(0, 3).map(t => (
                                    <span key={t} style={{
                                        padding: '0.25rem 0.65rem',
                                        background: `${font.color}22`,
                                        border: `1px solid ${font.color}55`,
                                        borderRadius: '20px', fontSize: '0.7rem',
                                        color: font.color, fontWeight: 600,
                                    }}>{t}</span>
                                ))}
                            </div>
                            {/* Active indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    style={{
                                        position: 'absolute', bottom: 0, left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '60%', height: '3px',
                                        background: font.color,
                                        borderRadius: '3px 3px 0 0',
                                    }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* ── Immersive Detail Panel ── */}
            <AnimatePresence mode="wait">
                {activeFont && (
                    <motion.div
                        key={activeFont.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.45 }}
                        style={{
                            background: activeFont.bg,
                            borderRadius: '28px',
                            border: `2px solid ${activeFont.color}55`,
                            boxShadow: `0 0 80px ${activeFont.accentGlow}`,
                            overflow: 'hidden',
                        }}
                    >
                        {/* ── Hero Banner ── */}
                        <div style={{
                            padding: '4rem 3rem 3rem',
                            borderBottom: `1px solid ${activeFont.color}22`,
                            textAlign: 'center',
                            position: 'relative',
                        }}>
                            {/* Giant watermark */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: activeFont.fontFamily,
                                fontSize: 'clamp(8rem, 20vw, 16rem)',
                                color: `${activeFont.color}08`,
                                userSelect: 'none', pointerEvents: 'none',
                                fontWeight: activeFont.id === 'comic' ? 700 : 400,
                                lineHeight: 1,
                            }}>
                                {activeFont.name[0]}
                            </div>

                            <motion.p
                                style={{
                                    fontFamily: activeFont.fontFamily,
                                    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                                    color: activeFont.color,
                                    margin: '0 0 0.5rem 0',
                                    lineHeight: 1.1,
                                    position: 'relative',
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {activeFont.name}
                            </motion.p>
                            <p style={{ color: `${activeFont.color}aa`, fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 2.5rem 0', position: 'relative' }}>
                                {activeFont.tagline}
                            </p>

                            {/* Typewriter quote */}
                            <TypewriterQuote text={activeFont.phrase} fontFamily={activeFont.fontFamily} color={activeFont.color} />
                        </div>

                        {/* ── Personality ── */}
                        <div style={{ padding: '3rem', borderBottom: `1px solid ${activeFont.color}22` }}>
                            <SectionLabel color={activeFont.color} text="Psychological Portrait" />
                            <p style={{
                                fontFamily: activeFont.fontFamily,
                                fontSize: '1.25rem', lineHeight: '1.85',
                                color: 'rgba(255,255,255,0.88)',
                                maxWidth: '780px', margin: '0 auto 2rem',
                                textAlign: 'center',
                            }}>
                                {activeFont.personality}
                            </p>
                            {/* All traits */}
                            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {activeFont.traits.map((t, i) => (
                                    <motion.span
                                        key={t}
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.07 }}
                                        style={{
                                            padding: '0.45rem 1.1rem',
                                            background: `${activeFont.color}20`,
                                            border: `1.5px solid ${activeFont.color}`,
                                            borderRadius: '30px', fontSize: '0.88rem',
                                            color: activeFont.color, fontWeight: 700,
                                            fontFamily: activeFont.fontFamily,
                                        }}
                                    >{t}</motion.span>
                                ))}
                            </div>
                        </div>

                        {/* ── Mood Radar ── */}
                        <div style={{ padding: '3rem', borderBottom: `1px solid ${activeFont.color}22` }}>
                            <SectionLabel color={activeFont.color} text="Mood Radar" />
                            <MoodDial meters={activeFont.moodMeters} color={activeFont.color} />
                        </div>

                        {/* ── Historical Examples ── */}
                        <div style={{ padding: '3rem', borderBottom: `1px solid ${activeFont.color}22` }}>
                            <SectionLabel color={activeFont.color} text="In The Pages of History" />
                            <HistoricalExamples examples={activeFont.historicalExamples} color={activeFont.color} />
                        </div>

                        {/* ── Used By ── */}
                        <div style={{ padding: '3rem' }}>
                            <SectionLabel color={activeFont.color} text="Seen In The Wild" />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
                                {activeFont.usedBy.map((u, i) => (
                                    <motion.div
                                        key={u.brand}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ scale: 1.03 }}
                                        style={{
                                            padding: '1.5rem',
                                            background: `${activeFont.color}0f`,
                                            border: `1.5px solid ${activeFont.color}33`,
                                            borderRadius: '14px',
                                        }}
                                    >
                                        <p style={{
                                            fontFamily: activeFont.fontFamily,
                                            fontSize: '1.2rem', fontWeight: 700,
                                            color: activeFont.color,
                                            margin: '0 0 0.4rem 0',
                                        }}>
                                            {u.brand}
                                        </p>
                                        <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>
                                            {u.note}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!selected && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.95rem', marginTop: '1rem' }}
                >
                    ↑ Select a font above to explore its psychology
                </motion.p>
            )}
        </div>
    );
};

/* ── Small helpers ───────────────────────────────────────────── */
function SectionLabel({ color, text }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.8rem' }}>
            <div style={{ flex: 1, height: '1px', background: `${color}33` }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>
                {text}
            </span>
            <div style={{ flex: 1, height: '1px', background: `${color}33` }} />
        </div>
    );
}

function TypewriterQuote({ text, fontFamily, color }) {
    const [show, setShow] = useState(false);
    const ref = useRef(null);
    const displayed = useTypewriter(text, 28, show);

    useEffect(() => {
        const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShow(true); }, { threshold: 0.3 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    // Restart on font change
    useEffect(() => { setShow(false); setTimeout(() => setShow(true), 100); }, [text]);

    return (
        <div ref={ref} style={{
            minHeight: '80px', position: 'relative',
            padding: '1.5rem 2rem',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '14px',
            border: `1px solid ${color}33`,
            maxWidth: '700px', margin: '0 auto',
        }}>
            <p style={{
                fontFamily,
                fontSize: '1.05rem',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.82)',
                margin: 0,
                lineHeight: 1.7,
                minHeight: '2rem',
            }}>
                {displayed}
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.9 }}
                    style={{ display: 'inline-block', width: '2px', height: '1em', background: color, marginLeft: '2px', verticalAlign: 'text-bottom' }}
                />
            </p>
        </div>
    );
}

export default FontPsychology;
