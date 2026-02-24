import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const CATEGORIES = [
    {
        id: 'serif',
        name: 'Serif',
        color: '#c4a96b',
        bg: 'linear-gradient(135deg,#1a1205,#2d2110)',
        icon: '𝐀',
        tagline: 'Strokes with feet — tradition, trust, gravitas',
        description: 'Serif typefaces carry small decorative strokes (serifs) at the ends of letterforms. Born from Roman inscriptions and refined through centuries of printing, they convey authority, heritage, and scholarly depth. Dominant in books, newspapers, and luxury branding.',
        traits: ['Authoritative', 'Traditional', 'Readable in print', 'Trustworthy'],
        examples: [
            {
                name: 'Garamond',
                style: '"EB Garamond", Georgia, serif',
                year: '1530s',
                use: 'Book publishing, luxury fashion (Abercrombie & Fitch), Harry Potter UK editions',
                specimen: 'The quick brown fox.',
            },
            {
                name: 'Times New Roman',
                style: '"Times New Roman", Times, serif',
                year: '1932',
                use: 'Newspapers, academic papers, legal documents, Microsoft Office default',
                specimen: 'Designed for The Times.',
            },
            {
                name: 'Georgia',
                style: 'Georgia, serif',
                year: '1993',
                use: 'Web body text, The New York Times website, early digital publishing',
                specimen: 'Built for screens.',
            },
        ],
    },
    {
        id: 'sans',
        name: 'Sans-serif',
        color: '#60a5fa',
        bg: 'linear-gradient(135deg,#020c1b,#0f2646)',
        icon: 'A',
        tagline: 'Clean, modern, no strokes — clarity above all',
        description: 'Stripped of serifs, these typefaces feel clean, modern, and approachable. They dominate digital interfaces, road signage, and tech branding because they render crisply at any size. Geometric and humanist subtypes offer different flavours of modernity.',
        traits: ['Modern', 'Clean', 'Digital-first', 'Accessible'],
        examples: [
            {
                name: 'Helvetica',
                style: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                year: '1957',
                use: 'NYC Subway, American Airlines, BMW, NASA — the corporate world\'s go-to',
                specimen: 'Neutrality is power.',
            },
            {
                name: 'Montserrat',
                style: '"Montserrat", Arial, sans-serif',
                year: '2011',
                use: 'Canva, Nordstrom, Google Fonts top 10, music festival posters',
                specimen: 'Urban geometry.',
            },
            {
                name: 'Futura',
                style: '"Futura", "Century Gothic", Arial, sans-serif',
                year: '1927',
                use: 'Nike, Volkswagen, Ikea headlines, Kubrick\'s 2001 title cards',
                specimen: 'Form follows function.',
            },
        ],
    },
    {
        id: 'script',
        name: 'Script',
        color: '#f43f5e',
        bg: 'linear-gradient(135deg,#1a0008,#2d0010)',
        icon: '𝒜',
        tagline: 'Flowing, handwritten elegance',
        description: 'Script typefaces simulate handwriting — from formal copperplate calligraphy to casual brush strokes. They convey personality, warmth, and artistry. Used in wedding stationery, luxury branding, and wherever a human touch is needed.',
        traits: ['Elegant', 'Personal', 'Decorative', 'Emotive'],
        examples: [
            {
                name: 'Lobster',
                style: '"Lobster", cursive',
                year: '2011',
                use: 'Logos, café menus, social media headers — bold retro personality',
                specimen: 'Café au lait.',
            },
            {
                name: 'Pacifico',
                style: '"Pacifico", cursive',
                year: '2011',
                use: 'Surf brands, food trucks, Coca-Cola inspired designs',
                specimen: 'Good vibes.',
            },
            {
                name: 'Zapf Chancery',
                style: '"Zapf Chancery", "URW Chancery L", cursive',
                year: '1979',
                use: 'Formal invitations, diplomas, greeting cards',
                specimen: 'With deepest regards.',
            },
        ],
    },
    {
        id: 'display',
        name: 'Display',
        color: '#a855f7',
        bg: 'linear-gradient(135deg,#0d0020,#1a0040)',
        icon: 'Aa',
        tagline: 'Built for big — bold, expressive, attention-grabbing',
        description: 'Display typefaces are designed for large sizes — headlines, posters, titles. They sacrifice readability at small sizes for visual impact and personality. They set mood instantly, whether dramatic, playful, retro, or futuristic.',
        traits: ['Expressive', 'High-impact', 'Mood-setting', 'Headline-only'],
        examples: [
            {
                name: 'Impact',
                style: 'Impact, "Arial Narrow", sans-serif',
                year: '1965',
                use: 'Internet memes, sports headlines, attention-grabbing posters',
                specimen: 'LOUD AND PROUD.',
            },
            {
                name: 'Playfair Display',
                style: '"Playfair Display", Georgia, serif',
                year: '2011',
                use: 'Magazine covers, editorial design, luxury e-commerce headlines',
                specimen: 'Editorial excellence.',
            },
            {
                name: 'Bebas Neue',
                style: '"Bebas Neue", Impact, sans-serif',
                year: '2010',
                use: 'Fitness brands, movie trailers, tech startup marketing',
                specimen: 'NO COMPROMISE.',
            },
        ],
    },
    {
        id: 'mono',
        name: 'Monospace',
        color: '#4ade80',
        bg: 'linear-gradient(135deg,#001a08,#002d10)',
        icon: '</>',
        tagline: 'Every character the same width — precision, code, machines',
        description: 'Monospace typefaces assign equal horizontal space to every character. Originally designed for typewriters, they became essential in programming because code alignment matters. They signal technical precision and nostalgia for the terminal era.',
        traits: ['Technical', 'Precise', 'Nostalgic', 'Programmer-friendly'],
        examples: [
            {
                name: 'Courier New',
                style: '"Courier New", Courier, monospace',
                year: '1955',
                use: 'Screenplays (Hollywood standard), legal redlines, typewriter aesthetics',
                specimen: 'FADE IN: EXT.',
            },
            {
                name: 'Fira Code',
                style: '"Fira Code", "Courier New", monospace',
                year: '2014',
                use: 'Code editors (VS Code default alternative), developer portfolios',
                specimen: 'const type = "art";',
            },
            {
                name: 'Space Mono',
                style: '"Space Mono", monospace',
                year: '2016',
                use: 'Design tools like Figma\'s UI, tech branding, editorial code features',
                specimen: '01001000 01101001',
            },
        ],
    },
];

export default function TypefaceGallery() {
    const [active, setActive] = useState('serif');
    const [preview, setPreview] = useState('');
    const [showPlayground, setShowPlayground] = useState(false);
    const cat = CATEGORIES.find(c => c.id === active);

    // Text shown in specimen: live preview if set, else the default specimen
    const specimenFor = (ex) => preview.trim() ? preview : ex.specimen;

    return (
        <div style={{ padding: '2rem 0' }}>

            {/* Intro */}
            <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8',
                    maxWidth: '780px', margin: '0 auto 3rem', textAlign: 'center',
                }}
            >
                Typefaces are grouped into five major classifications. Each carries its own voice,
                history, and context. Click a category to explore its characteristics and examples.
            </motion.p>

            {/* Category tab pills */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
                {CATEGORIES.map((c, i) => {
                    const isA = active === c.id;
                    return (
                        <motion.button
                            key={c.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActive(c.id)}
                            style={{
                                padding: '0.6rem 1.6rem',
                                borderRadius: '50px',
                                border: `2px solid ${isA ? c.color : 'rgba(255,255,255,0.12)'}`,
                                background: isA ? `${c.color}22` : 'rgba(255,255,255,0.03)',
                                color: isA ? c.color : 'rgba(255,255,255,0.55)',
                                fontWeight: isA ? 700 : 400,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                boxShadow: isA ? `0 0 16px ${c.color}44` : 'none',
                                transition: 'all 0.25s',
                                letterSpacing: '0.03em',
                            }}
                        >
                            {c.name}
                        </motion.button>
                    );
                })}
            </div>

            {/* Main panel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.28 }}
                    style={{
                        background: cat.bg,
                        border: `1.5px solid ${cat.color}44`,
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: `0 0 60px ${cat.color}22`,
                    }}
                >
                    {/* Header */}
                    <div style={{ padding: '2.5rem 2.5rem 1.5rem', borderBottom: `1px solid ${cat.color}22` }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {/* Big specimen letter */}
                            <div style={{
                                fontSize: '5rem', lineHeight: 1, color: cat.color,
                                fontFamily: cat.examples[0].style,
                                textShadow: `0 0 40px ${cat.color}55`,
                                flexShrink: 0,
                            }}>
                                {cat.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '2.2rem', margin: '0 0 0.3rem 0', color: 'white', fontWeight: 700 }}>
                                    {cat.name}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: cat.color, margin: '0 0 1rem 0', fontStyle: 'italic' }}>
                                    {cat.tagline}
                                </p>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: '1.75', margin: 0, maxWidth: '680px' }}>
                                    {cat.description}
                                </p>
                            </div>
                        </div>

                        {/* Trait tags */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.2rem' }}>
                            {cat.traits.map(t => (
                                <span key={t} style={{
                                    padding: '0.3rem 0.9rem',
                                    borderRadius: '20px',
                                    border: `1px solid ${cat.color}66`,
                                    background: `${cat.color}18`,
                                    fontSize: '0.78rem', fontWeight: 600, color: cat.color,
                                    letterSpacing: '0.04em',
                                }}>{t}</span>
                            ))}
                        </div>
                    </div>

                    {/* Example cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        padding: '2rem 2.5rem',
                    }}>
                        {cat.examples.map((ex, i) => (
                            <motion.div
                                key={ex.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -4, scale: 1.01 }}
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: `1px solid ${cat.color}33`,
                                    borderRadius: '16px',
                                    padding: '1.8rem',
                                    display: 'flex', flexDirection: 'column', gap: '0.8rem',
                                }}
                            >
                                {/* Specimen text */}
                                <p style={{
                                    fontFamily: ex.style,
                                    fontSize: '1.8rem',
                                    color: 'rgba(255,255,255,0.9)',
                                    margin: 0, lineHeight: 1.2,
                                    transition: 'font-family 0.2s',
                                }}>
                                    {specimenFor(ex)}
                                </p>

                                {/* Name + year */}
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: cat.color }}>
                                        {ex.name}
                                    </span>
                                    <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
                                        {ex.year}
                                    </span>
                                </div>

                                {/* Use */}
                                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6', margin: 0 }}>
                                    {ex.use}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* ══ FONT PLAYGROUND ══════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginTop: '3rem' }}
            >
                {/* Toggle header */}
                <button
                    onClick={() => setShowPlayground(v => !v)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.7rem',
                        width: '100%', background: 'none', border: 'none',
                        cursor: 'pointer', padding: '0', marginBottom: '1.5rem',
                    }}
                >
                    <div style={{
                        flex: 1, height: '1px',
                        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.12))',
                    }} />
                    <span style={{
                        padding: '0.5rem 1.4rem', borderRadius: '50px',
                        border: `2px solid ${showPlayground ? '#a855f7' : 'rgba(255,255,255,0.15)'}`,
                        background: showPlayground ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.03)',
                        color: showPlayground ? '#a855f7' : 'rgba(255,255,255,0.5)',
                        fontSize: '0.88rem', fontWeight: 700, letterSpacing: '0.04em',
                        whiteSpace: 'nowrap', transition: 'all 0.25s',
                        boxShadow: showPlayground ? '0 0 18px #a855f744' : 'none',
                    }}>
                        {showPlayground ? '✕ Close Playground' : '🎮 Font Playground — type anything'}
                    </span>
                    <div style={{
                        flex: 1, height: '1px',
                        background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.12))',
                    }} />
                </button>

                <AnimatePresence>
                    {showPlayground && (
                        <motion.div
                            key="playground"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden' }}
                        >
                            {/* Input */}
                            <div style={{
                                position: 'relative', marginBottom: '2rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1.5px solid rgba(168,85,247,0.4)',
                                borderRadius: '16px', overflow: 'hidden',
                                boxShadow: '0 0 30px rgba(168,85,247,0.12)',
                            }}>
                                <div style={{
                                    padding: '0.6rem 1.2rem 0',
                                    fontSize: '0.68rem', letterSpacing: '0.1em',
                                    textTransform: 'uppercase', color: 'rgba(168,85,247,0.7)',
                                    fontWeight: 700,
                                }}>Type your text — preview updates live</div>
                                <input
                                    type="text"
                                    value={preview}
                                    onChange={e => setPreview(e.target.value)}
                                    placeholder="e.g. Typography is art..."
                                    autoFocus
                                    style={{
                                        width: '100%', padding: '0.9rem 1.2rem 1rem',
                                        background: 'transparent', border: 'none', outline: 'none',
                                        color: 'white', fontSize: '1.2rem',
                                        fontFamily: '"Montserrat", Arial, sans-serif',
                                        boxSizing: 'border-box',
                                    }}
                                />
                                {preview && (
                                    <button
                                        onClick={() => setPreview('')}
                                        style={{
                                            position: 'absolute', right: '1rem', top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'rgba(255,255,255,0.1)', border: 'none',
                                            borderRadius: '50%', width: '28px', height: '28px',
                                            color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                                            fontSize: '0.9rem', lineHeight: 1,
                                        }}
                                    >✕</button>
                                )}
                            </div>

                            {/* All fonts grid */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {CATEGORIES.map(cat => (
                                    <div key={cat.id}>
                                        {/* Category label */}
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                                            marginBottom: '1rem',
                                        }}>
                                            <div style={{
                                                width: '10px', height: '10px', borderRadius: '50%',
                                                background: cat.color,
                                                boxShadow: `0 0 8px ${cat.color}`,
                                            }} />
                                            <span style={{
                                                fontSize: '0.7rem', fontWeight: 700,
                                                letterSpacing: '0.12em', textTransform: 'uppercase',
                                                color: cat.color,
                                            }}>{cat.name}</span>
                                            <div style={{ flex: 1, height: '1px', background: `${cat.color}22` }} />
                                        </div>

                                        {/* Font rows */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                            {cat.examples.map(ex => (
                                                <motion.div
                                                    key={ex.name}
                                                    whileHover={{ x: 4 }}
                                                    style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '160px 1fr',
                                                        alignItems: 'center', gap: '1.5rem',
                                                        background: 'rgba(255,255,255,0.02)',
                                                        border: `1px solid ${cat.color}22`,
                                                        borderRadius: '12px',
                                                        padding: '1rem 1.5rem',
                                                    }}
                                                >
                                                    {/* Font name */}
                                                    <div>
                                                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: cat.color }}>
                                                            {ex.name}
                                                        </div>
                                                        <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.2rem' }}>
                                                            {ex.year} · {cat.name}
                                                        </div>
                                                    </div>
                                                    {/* Live specimen */}
                                                    <div style={{
                                                        fontFamily: ex.style,
                                                        fontSize: '1.6rem',
                                                        color: 'rgba(255,255,255,0.88)',
                                                        lineHeight: 1.3,
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        textOverflow: 'ellipsis',
                                                    }}>
                                                        {preview.trim() ? preview : ex.specimen}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
