import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Lightbulb, Type, Palette, ArrowRight, ChevronDown } from 'lucide-react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const brands = [
    {
        id: 'netflix',
        name: 'Netflix',
        industry: 'Streaming & Entertainment',
        accentColor: '#e50914',
        accentLight: 'rgba(229,9,20,0.15)',
        tagline: 'Bold. Cinematic. Unmistakable.',
        fontName: 'Netflix Sans',
        fontFamily: '"Arial Black", "Impact", sans-serif',
        fontCategory: 'Custom Sans-Serif',
        fontDescription: 'Custom typeface by Dalton Maag. Heavy, uniform strokes built for screens — from phone thumbnails to 4K TVs.',
        logoSvg: 'netflix',
        callouts: [
            {
                id: 'weight',
                label: 'Uniform Weight',
                // Pin on the thick stroke of the 'N' — left side of logo, vertically centred on text
                x: '42%',
                y: '45%',
                side: 'right',
                detail: 'Every stroke is equally heavy — no thick/thin contrast. Feels bold and cinematic, like a film marquee.',
            },
            {
                id: 'kerning',
                label: 'Tight Kerning',
                // Pin between the T and F letters — horizontal centre of the word
                x: '52%',
                y: '50%',
                side: 'left',
                detail: 'Letters sit very close together. Creates a dense block that reads instantly even at icon size.',
            },
            {
                id: 'arch',
                label: 'Convex Arch',
                // Pin at the bottom edge of the logo text — moved left
                x: '62%',
                y: '62%',
                side: 'left',
                detail: 'A subtle curve at the bottom references CinemaScope — tying the logo to its product: film.',
            },
        ],
        brandValues: ['Entertainment', 'Accessibility', 'Global Scale', 'Original Content'],
        whyItWorks: 'Heavy strokes dominate thumbnails. Tight kerning holds at small sizes. The arch whispers cinema. Every detail earns its place.',
        alternatives: [
            {
                name: 'Vengeance Sans Serif',
                fontFamily: '"Bebas Neue", sans-serif',
                description: 'Seven weights — from Thin to Bold. Bold rivals Netflix Sans in cinematic weight; Outline & Oblique add title-card flair.',
                why: 'One family covers subtitles (Light) to hero titles (Bold) — just like Netflix Sans does today.',
            },
            {
                name: 'Caelan',
                fontFamily: '"Raleway", sans-serif',
                description: 'Three weights: Regular, Round, Bold. Minimalist with a warmer personality than standard geometric sans.',
                why: 'Suited to a more boutique Netflix — premium titles over mass content.',
            },
        ],
    },
    {
        id: 'cartier',
        name: 'Cartier',
        industry: 'Luxury Jewellery & Watches',
        accentColor: '#c8a96e',
        accentLight: 'rgba(200,169,110,0.15)',
        tagline: 'Graceful. Timeless. Handcrafted.',
        fontName: 'Custom Script (Cartier)',
        fontFamily: '"Palatino Linotype", "Book Antiqua", Georgia, serif',
        fontCategory: 'Custom Calligraphic Script',
        fontDescription: 'A bespoke script commissioned by Cartier. Name unknown — completely proprietary. Modelled on pointed-nib calligraphy.',
        logoSvg: 'cartier',
        callouts: [
            {
                id: 'strokes',
                label: 'Thick & Thin Strokes',
                // Pin on the big 'C' swash — top-left of logo where contrast is most dramatic
                x: '38%',
                y: '38%',
                side: 'right',
                detail: 'Bold downstrokes + hairline upstrokes. This contrast = luxury. It mimics a pointed calligraphy nib.',
            },
            {
                id: 'script',
                label: 'Calligraphic Flow',
                // Pin on 'arti' — mid-word where letters connect smoothly
                x: '50%',
                y: '62%',
                side: 'left',
                detail: 'Letters connect like real handwriting. One unbroken sweep — feels like a personal signature.',
            },
            {
                id: 'touch',
                label: 'Finishing Swash',
                // Pin on the tail curl of the final 'r' — far right of logo
                x: '63%',
                y: '58%',
                side: 'left',
                detail: 'The final letter ends in a decorative swash tail — a mark of craftsmanship, not utility.',
            },
        ],
        brandValues: ['Luxury', 'Heritage', 'Craftsmanship', 'Exclusivity'],
        whyItWorks: 'A script logo is a signature. It says: made by hand, just for you — the opposite of mass production.',
        alternatives: [
            {
                name: 'Shelley Andante Script Regular',
                fontFamily: '"Pinyon Script", cursive',
                description: 'Dramatic thick-to-thin contrast. Flowing, unhurried letterforms. Closely echoes the Cartier style.',
                why: 'Near-identical stroke contrast. Works as a stand-in on secondary brand materials.',
            },
            {
                name: 'Shelley Script LT Regular',
                fontFamily: '"Alex Brush", cursive',
                description: 'Lighter, more delicate version. Thinner strokes, airier spacing. Ideal for small print.',
                why: 'Perfect for certificates, packaging, and gold foil embossing.',
            },
        ],
    },
];

/* ─────────────────────────────────────────────
   SVG LOGOS
───────────────────────────────────────────── */
const logoMeta = {
    netflix: { src: '/logo-netflix.png', bg: '#000000', padding: '2.5rem 3rem' },
    cartier: { src: '/logo-cartier.png', bg: '#ffffff', padding: '2.5rem 3rem' },
};

const LogoImage = ({ brandId }) => {
    const meta = logoMeta[brandId];
    return (
        <div style={{
            background: meta.bg,
            borderRadius: '12px',
            padding: meta.padding,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}>
            <img
                src={meta.src}
                alt={`${brandId} logo`}
                style={{
                    maxWidth: '340px',
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                }}
            />
        </div>
    );
};

/* ─────────────────────────────────────────────
   CALLOUT PIN
───────────────────────────────────────────── */
const CalloutPin = ({ callout, accent, isActive, onClick }) => {
    return (
        <div
            style={{
                position: 'absolute',
                left: callout.x,
                top: callout.y,
                transform: 'translate(-50%, -50%)',
                zIndex: isActive ? 100 : 10,
            }}
        >
            {/* Pulsing ring */}
            <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    inset: '-6px',
                    borderRadius: '50%',
                    background: accent,
                    opacity: 0.4,
                }}
            />
            {/* Pin dot */}
            <motion.button
                onClick={onClick}
                whileHover={{ scale: 1.25 }}
                style={{
                    position: 'relative',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: isActive ? accent : 'rgba(255,255,255,0.15)',
                    border: `2.5px solid ${accent}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(4px)',
                }}
            >
                <span style={{ color: 'white', fontSize: '11px', fontWeight: 700, lineHeight: 1 }}>
                    {isActive ? '×' : '+'}
                </span>
            </motion.button>

            {/* Label tag */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: '30px',
                            ...(callout.side === 'right' ? { left: '0' } : { right: '0' }),
                            width: '220px',
                            background: 'rgba(10,10,10,0.95)',
                            border: `1.5px solid ${accent}`,
                            borderRadius: '12px',
                            padding: '1rem',
                            boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${accent}33`,
                            zIndex: 20,
                        }}
                    >
                        <p style={{
                            margin: '0 0 0.5rem 0',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: accent,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                        }}>
                            {callout.label}
                        </p>
                        <p style={{
                            margin: 0,
                            fontSize: '0.8rem',
                            color: 'rgba(255,255,255,0.8)',
                            lineHeight: '1.5',
                        }}>
                            {callout.detail}
                        </p>
                        {/* Pointer arrow */}
                        <div style={{
                            position: 'absolute',
                            top: '-7px',
                            ...(callout.side === 'right' ? { left: '10px' } : { right: '10px' }),
                            width: 0,
                            height: 0,
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderBottom: `7px solid ${accent}`,
                        }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* ─────────────────────────────────────────────
   BRAND CARD
───────────────────────────────────────────── */
const BrandCard = ({ brand }) => {
    const [activeCallout, setActiveCallout] = useState(null);
    const [altOpen, setAltOpen] = useState(null);

    const toggleCallout = (id) => setActiveCallout(prev => prev === id ? null : id);
    const toggleAlt = (idx) => setAltOpen(prev => prev === idx ? null : idx);

    return (
        <div>
            {/* ── Logo Anatomy ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '3.5rem' }}
            >
                <h4 style={{
                    fontSize: '1.4rem',
                    marginBottom: '0.5rem',
                    color: brand.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                }}>
                    <Type size={20} />
                    Logo Anatomy
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Click the <span style={{ color: brand.accentColor, fontWeight: 700 }}>+</span> pins to explore specific typographic decisions.
                </p>

                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '20px',
                    border: `1px solid ${brand.accentColor}44`,
                    padding: '3rem 2.5rem',
                    position: 'relative',
                    overflow: 'visible',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '180px',
                }}>
                    {/* Glow behind logo */}
                    <div style={{
                        position: 'absolute',
                        width: '60%',
                        height: '60%',
                        background: brand.accentColor,
                        filter: 'blur(80px)',
                        opacity: 0.06,
                        borderRadius: '50%',
                    }} />

                    <LogoImage brandId={brand.id} />

                    {/* Callout pins – positioned over the logo container */}
                    {brand.callouts.map(c => (
                        <CalloutPin
                            key={c.id}
                            callout={c}
                            accent={brand.accentColor}
                            isActive={activeCallout === c.id}
                            onClick={() => toggleCallout(c.id)}
                        />
                    ))}
                </div>

                {/* Callout legend strip */}
                <div style={{
                    display: 'flex',
                    gap: '0.8rem',
                    marginTop: '1.2rem',
                    flexWrap: 'wrap',
                }}>
                    {brand.callouts.map(c => (
                        <button
                            key={c.id}
                            onClick={() => toggleCallout(c.id)}
                            style={{
                                padding: '0.45rem 1rem',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                borderRadius: '20px',
                                border: `1.5px solid ${activeCallout === c.id ? brand.accentColor : brand.accentColor + '55'}`,
                                background: activeCallout === c.id ? brand.accentLight : 'transparent',
                                color: activeCallout === c.id ? brand.accentColor : 'rgba(255,255,255,0.6)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* ── Font Details ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '3.5rem' }}
            >
                <h4 style={{
                    fontSize: '1.4rem',
                    marginBottom: '1.5rem',
                    color: brand.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                }}>
                    <Palette size={20} />
                    The Typeface
                </h4>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem',
                    marginBottom: '1.5rem',
                }}>
                    {[
                        { label: 'Font Name', value: brand.fontName },
                        { label: 'Category', value: brand.fontCategory },
                    ].map(item => (
                        <div key={item.label} style={{
                            background: 'rgba(255,255,255,0.04)',
                            borderRadius: '12px',
                            padding: '1.2rem 1.5rem',
                            border: `1px solid rgba(255,255,255,0.08)`,
                        }}>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                                {item.label}
                            </p>
                            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'white' }}>
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Preview */}
                <div style={{
                    background: '#0a0a0a',
                    borderRadius: '12px',
                    padding: '1.5rem 2rem',
                    border: `1px solid ${brand.accentColor}33`,
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                }}>
                    <p style={{
                        fontFamily: brand.fontFamily,
                        fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
                        color: brand.accentColor,
                        margin: 0,
                        letterSpacing: brand.id === 'cartier' ? '6px' : '-1px',
                        fontStyle: brand.id === 'cartier' ? 'italic' : 'normal',
                        fontWeight: brand.id === 'netflix' ? '900' : '400',
                    }}>
                        {brand.name}
                    </p>
                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
                        Live font preview — {brand.fontCategory}
                    </p>
                </div>

                <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.85',
                    color: 'rgba(255,255,255,0.85)',
                }}>
                    {brand.fontDescription}
                </p>
            </motion.div>

            {/* ── Why It Works ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    background: brand.accentLight,
                    border: `2px solid ${brand.accentColor}`,
                    borderRadius: '18px',
                    padding: '2rem 2.5rem',
                    marginBottom: '3.5rem',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                    <Lightbulb size={26} color={brand.accentColor} />
                    <h4 style={{ fontSize: '1.3rem', margin: 0, color: brand.accentColor }}>
                        Why It Works
                    </h4>
                </div>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.85', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                    {brand.whyItWorks}
                </p>
            </motion.div>

            {/* ── Brand Values ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '3.5rem' }}
            >
                <h4 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: brand.accentColor }}>
                    Brand Values
                </h4>
                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    {brand.brandValues.map((v, i) => (
                        <span key={i} style={{
                            padding: '0.55rem 1.2rem',
                            background: brand.accentLight,
                            border: `1.5px solid ${brand.accentColor}66`,
                            borderRadius: '20px',
                            fontSize: '0.9rem',
                            color: brand.accentColor,
                            fontWeight: 600,
                        }}>
                            {v}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* ── Alternatives ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h4 style={{
                    fontSize: '1.4rem',
                    marginBottom: '1.5rem',
                    color: brand.accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                }}>
                    <ArrowRight size={20} />
                    Alternative Typefaces
                </h4>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {brand.alternatives.map((alt, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '14px',
                                border: `1.5px solid ${altOpen === idx ? brand.accentColor : 'rgba(255,255,255,0.1)'}`,
                                overflow: 'hidden',
                                transition: 'border-color 0.3s ease',
                            }}
                        >
                            <button
                                onClick={() => toggleAlt(idx)}
                                style={{
                                    width: '100%',
                                    padding: '1.2rem 1.5rem',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    color: 'white',
                                }}
                            >
                                <div style={{ textAlign: 'left' }}>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                        Alternative {idx + 1}
                                    </span>
                                    <p style={{ margin: '0.2rem 0 0', fontSize: '1.05rem', fontWeight: 700, color: altOpen === idx ? brand.accentColor : 'white' }}>
                                        {alt.name}
                                    </p>
                                </div>
                                <motion.div
                                    animate={{ rotate: altOpen === idx ? 180 : 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <ChevronDown size={20} color={brand.accentColor} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {altOpen === idx && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div style={{ padding: '0 1.5rem 1.5rem' }}>
                                            <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }}>
                                                {alt.description}
                                            </p>
                                            {/* Font Preview */}
                                            <div style={{
                                                background: brand.id === 'netflix' ? '#000' : '#fff',
                                                borderRadius: '10px',
                                                padding: '1.2rem 1.5rem',
                                                marginBottom: '1rem',
                                                textAlign: 'center',
                                                border: `1px solid ${brand.accentColor}44`,
                                            }}>
                                                <p style={{
                                                    margin: 0,
                                                    fontFamily: alt.fontFamily,
                                                    fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                                                    color: brand.id === 'netflix' ? '#e50914' : '#1a1a1a',
                                                    letterSpacing: brand.id === 'cartier' ? '4px' : '-1px',
                                                    fontStyle: brand.id === 'cartier' ? 'italic' : 'normal',
                                                    lineHeight: 1.2,
                                                }}>
                                                    {brand.name}
                                                </p>
                                                <p style={{ margin: '0.4rem 0 0', fontSize: '0.7rem', color: brand.id === 'netflix' ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                                    {alt.name}
                                                </p>
                                            </div>
                                            <div style={{
                                                background: brand.accentLight,
                                                borderRadius: '10px',
                                                padding: '0.9rem 1.2rem',
                                                borderLeft: `3px solid ${brand.accentColor}`,
                                            }}>
                                                <p style={{ margin: 0, fontSize: '0.85rem', color: brand.accentColor, fontWeight: 600, marginBottom: '0.3rem' }}>
                                                    Why This Alternative?
                                                </p>
                                                <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.8)' }}>
                                                    {alt.why}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const BrandAnalysis = () => {
    const [activeBrand, setActiveBrand] = useState('netflix');
    const current = brands.find(b => b.id === activeBrand);

    return (
        <div style={{ padding: '2rem 0' }}>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.8',
                    maxWidth: '720px',
                    margin: '0 auto',
                }}>
                    Two brands. Two radically different typographic philosophies.
                    Both unmistakable. Click a brand to explore how their typeface choices
                    shape perception, communicate values, and build identity.
                </p>
            </motion.div>

            {/* Brand Switcher */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '4rem',
            }}>
                {brands.map(b => (
                    <motion.button
                        key={b.id}
                        onClick={() => setActiveBrand(b.id)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            padding: '1rem 2.5rem',
                            borderRadius: '12px',
                            border: `2px solid ${activeBrand === b.id ? b.accentColor : 'rgba(255,255,255,0.1)'}`,
                            background: activeBrand === b.id ? b.accentLight : 'rgba(255,255,255,0.03)',
                            color: activeBrand === b.id ? b.accentColor : 'rgba(255,255,255,0.6)',
                            cursor: 'pointer',
                            fontWeight: 700,
                            fontSize: '1rem',
                            letterSpacing: '0.05em',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.1rem' }}>
                            {b.name}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 400, opacity: 0.7, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                            {b.industry}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Brand Panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeBrand}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                    style={{
                        background: 'rgba(255,255,255,0.02)',
                        borderRadius: '24px',
                        border: `1px solid ${current.accentColor}44`,
                        padding: '3rem',
                    }}
                >
                    {/* Panel header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        marginBottom: '3rem',
                        paddingBottom: '2rem',
                        borderBottom: `1px solid ${current.accentColor}33`,
                    }}>
                        <div style={{
                            width: '5px',
                            height: '60px',
                            borderRadius: '3px',
                            background: current.accentColor,
                            flexShrink: 0,
                        }} />
                        <div>
                            <h3 style={{ fontSize: '2rem', margin: '0 0 0.25rem', color: 'white' }}>
                                {current.name}
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: current.accentColor, fontWeight: 600, fontStyle: 'italic' }}>
                                "{current.tagline}"
                            </p>
                        </div>
                    </div>

                    <BrandCard brand={current} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default BrandAnalysis;
