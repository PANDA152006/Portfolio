import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

/* ══════════════════════════════════════════════════════════════
   Serif vs Sans-serif — three required comparison dimensions:
   1. Historical Development
   2. Readability & Legibility
   3. Applications in Print & Digital
══════════════════════════════════════════════════════════════ */

const TABS = [
    { id: 'history', label: '📜 Historical Development' },
    { id: 'readability', label: '👁 Readability & Legibility' },
    { id: 'applications', label: '🖨 Print & Digital Use' },
];

/* ── 1. HISTORY ── */
const HistoryContent = () => {
    const timeline = [
        {
            era: 'c. 113 AD',
            event: 'Roman Inscriptions',
            type: 'serif',
            detail: 'Serifs emerged from Roman stone-carvers who chiselled finishing strokes at stroke ends on monuments like Trajan\'s Column. These marks guided chisel direction and balanced compositions.',
            example: 'Trajan Pro',
            exFont: '"Times New Roman", serif',
        },
        {
            era: '1455',
            event: 'Gutenberg\'s Press',
            type: 'serif',
            detail: 'Moveable type inherited Roman letterforms with serifs. Gutenberg\'s 42-line Bible used blackletter; later typefaces by Garamond and Caslon refined the serif into the elegant old-style tradition.',
            example: 'Garamond',
            exFont: '"EB Garamond", Georgia, serif',
        },
        {
            era: '1816',
            event: 'First Sans-serif Typeface',
            type: 'sans',
            detail: 'William Caslon IV created the first commercially printed sans-serif. Called "Egyptian" by critics (derided as "grotesque"), it was dismissed as primitive — serifs were seen as essential to civilised type.',
            example: 'Caslon Egyptian',
            exFont: 'Arial, sans-serif',
        },
        {
            era: '1927',
            event: 'Bauhaus & Futura',
            type: 'sans',
            detail: 'Paul Renner\'s Futura embodied Bauhaus philosophy: pure geometric forms with no historical baggage. Sans-serifs became symbols of modernity, rationalism, and the machine age.',
            example: 'Futura',
            exFont: '"Century Gothic", Arial, sans-serif',
        },
        {
            era: '1957',
            event: 'Helvetica — The Universal Font',
            type: 'sans',
            detail: 'Max Miedinger\'s Helvetica became the face of Swiss Modernism — and then global corporate identity. Its claim: total neutrality, zero personality. It became impossible to ignore.',
            example: 'Helvetica',
            exFont: '"Helvetica Neue", Arial, sans-serif',
        },
        {
            era: '1993',
            event: 'Digital Age & Screen Fonts',
            type: 'both',
            detail: 'Matthew Carter designed Georgia (serif) and Verdana (sans-serif) specifically for low-resolution screens. The web era forced a rethink: serifs struggled on pixels; sans-serifs thrived.',
            example: 'Georgia & Verdana',
            exFont: 'Georgia, serif',
        },
    ];

    return (
        <div style={{ padding: '2rem 0' }}>
            <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                {/* Spine */}
                <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
                    background: 'linear-gradient(to bottom, #c4a96b, #60a5fa)',
                }} />

                {timeline.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                            position: 'relative',
                            marginBottom: '2rem',
                            paddingLeft: '2rem',
                        }}
                    >
                        {/* Dot */}
                        <div style={{
                            position: 'absolute', left: '-1.55rem', top: '0.3rem',
                            width: '12px', height: '12px', borderRadius: '50%',
                            background: item.type === 'serif' ? '#c4a96b' : item.type === 'sans' ? '#60a5fa' : '#a855f7',
                            border: '2px solid rgba(6,6,20,1)',
                            boxShadow: `0 0 8px ${item.type === 'serif' ? '#c4a96b' : item.type === 'sans' ? '#60a5fa' : '#a855f7'}`,
                        }} />

                        {/* Era chip */}
                        <span style={{
                            display: 'inline-block', padding: '0.2rem 0.7rem',
                            borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700,
                            letterSpacing: '0.08em',
                            background: item.type === 'serif' ? '#c4a96b22' : item.type === 'sans' ? '#60a5fa22' : '#a855f722',
                            border: `1px solid ${item.type === 'serif' ? '#c4a96b44' : item.type === 'sans' ? '#60a5fa44' : '#a855f744'}`,
                            color: item.type === 'serif' ? '#c4a96b' : item.type === 'sans' ? '#60a5fa' : '#a855f7',
                            marginBottom: '0.4rem',
                        }}>
                            {item.era} · {item.type === 'serif' ? 'Serif' : item.type === 'sans' ? 'Sans-serif' : 'Both'}
                        </span>

                        <h4 style={{ margin: '0.2rem 0 0.5rem', fontSize: '1.1rem', color: 'rgba(255,255,255,0.88)' }}>
                            {item.event}
                        </h4>
                        <p style={{ margin: '0 0 0.6rem', fontSize: '0.87rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.65' }}>
                            {item.detail}
                        </p>
                        <span style={{
                            fontFamily: item.exFont, fontSize: '1.1rem',
                            color: item.type === 'serif' ? '#c4a96b' : item.type === 'sans' ? '#60a5fa' : '#a855f7',
                        }}>
                            {item.example}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

/* ── 2. READABILITY ── */
const ReadabilityContent = () => {
    const aspects = [
        {
            title: 'Serifs in Print',
            side: 'serif',
            icon: '📰',
            verdict: 'Advantage: Print',
            points: [
                'Serifs create a subtle horizontal "rail" that guides the eye across long lines of body text.',
                'Books, newspapers, and academic journals traditionally use serif fonts — Times, Caslon, Palatino.',
                'Studies (e.g., Tinker & Paterson, 1929) concluded serifs aid reading speed in long-form print.',
                'The hairline strokes in serif fonts are reproduced faithfully by high-resolution print technology.',
            ],
            specimen: {
                text: '"It was the best of times, it was the worst of times."',
                font: '"EB Garamond", Georgia, serif',
                note: 'Garamond — the classic novel font',
            },
        },
        {
            title: 'Sans-serifs on Screen',
            side: 'sans',
            icon: '🖥',
            verdict: 'Advantage: Screen',
            points: [
                'On low-resolution screens, hairline serif details blur or disappear — creating visual noise.',
                'Sans-serifs render crisply at small sizes because every stroke is thick enough to survive pixel grids.',
                'UI/UX design overwhelmingly uses sans-serif: iOS (San Francisco), Android (Roboto), Google (Product Sans).',
                'At large display sizes (60px+) the readability difference becomes negligible.',
            ],
            specimen: {
                text: '"Design is intelligence made visible."',
                font: '"Montserrat", Arial, sans-serif',
                note: 'Montserrat — clean screen reading',
            },
        },
        {
            title: 'Legibility at Small Sizes',
            side: 'sans',
            icon: '🔬',
            verdict: 'Advantage: Sans-serif',
            points: [
                'Legibility (recognising individual letters) favours sans-serifs below 12px — fewer details to lose.',
                'Open counters and simple shapes make "a", "e", "g" easier to distinguish at tiny sizes.',
                'Exception: slab-serifs (Courier, Rockwell) maintain legibility due to thick uniform serifs.',
            ],
            specimen: {
                text: 'The quick brown fox jumps over the lazy dog.',
                font: 'Arial, sans-serif',
                note: 'Arial at body size — clear and open',
            },
        },
        {
            title: 'Long-form Reading',
            side: 'serif',
            icon: '📖',
            verdict: 'Advantage: Serif',
            points: [
                'After decades of reading novels in serif type, readers associate the letterform rhythm with focused reading.',
                'Medium and Substack both default to serif for articles (Georgia, Charter).',
                'The "serif rail" effect is especially pronounced with wide line lengths (80+ chars per line).',
            ],
            specimen: {
                text: 'In the beginning was the Word, and the Word was with God.',
                font: 'Georgia, serif',
                note: 'Georgia — the web\'s primary reading font',
            },
        },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px,1fr))', gap: '1.5rem', padding: '2rem 0' }}>
            {aspects.map((a, i) => (
                <motion.div
                    key={a.title}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    style={{
                        background: a.side === 'serif'
                            ? 'linear-gradient(135deg,#1a1205,#2d2110)'
                            : 'linear-gradient(135deg,#020c1b,#0f2646)',
                        border: `1.5px solid ${a.side === 'serif' ? '#c4a96b44' : '#60a5fa44'}`,
                        borderRadius: '18px', padding: '1.8rem',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.7rem' }}>
                        <span style={{ fontSize: '1.4rem' }}>{a.icon}</span>
                        <h4 style={{ margin: 0, fontSize: '1rem', color: 'rgba(255,255,255,0.88)' }}>{a.title}</h4>
                    </div>

                    <span style={{
                        display: 'inline-block', padding: '0.2rem 0.7rem', borderRadius: '12px',
                        fontSize: '0.72rem', fontWeight: 700,
                        background: a.side === 'serif' ? '#c4a96b22' : '#60a5fa22',
                        border: `1px solid ${a.side === 'serif' ? '#c4a96b55' : '#60a5fa55'}`,
                        color: a.side === 'serif' ? '#c4a96b' : '#60a5fa',
                        marginBottom: '1rem',
                    }}>{a.verdict}</span>

                    <ul style={{ margin: '0 0 1rem', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {a.points.map((pt, j) => (
                            <li key={j} style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6' }}>
                                {pt}
                            </li>
                        ))}
                    </ul>

                    {/* Specimen */}
                    <div style={{
                        background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '1rem',
                        borderLeft: `3px solid ${a.side === 'serif' ? '#c4a96b' : '#60a5fa'}`,
                    }}>
                        <p style={{
                            fontFamily: a.specimen.font, fontSize: '0.95rem',
                            color: 'rgba(255,255,255,0.8)', margin: '0 0 0.4rem', lineHeight: '1.5',
                            fontStyle: 'italic',
                        }}>{a.specimen.text}</p>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>{a.specimen.note}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

/* ── 3. APPLICATIONS ── */
const ApplicationsContent = () => {
    const apps = [
        {
            domain: 'Books & Long-form Print',
            winner: 'Serif',
            winnerColor: '#c4a96b',
            reason: 'The horizontal rhythm of serifs guides the eye across wide columns. Publishers have used Garamond, Caslon, Bembo, and Palatino for centuries.',
            serifExamples: ['Harry Potter (Garamond)', 'The New York Times body (Georgia)', 'Harvard Law Review (Century Schoolbook)'],
            sansExamples: ['Comic books (Bangers)', 'Technical manuals (Arial)', 'IKEA catalogues (Futura — controversially changed to Verdana in 2009)'],
            serifFont: 'Georgia, serif',
            sansFont: 'Arial, sans-serif',
        },
        {
            domain: 'Newspaper & Magazine',
            winner: 'Serif (body) + Sans (headline)',
            winnerColor: '#a855f7',
            reason: 'Editorial design has always mixed both: serif body text for reading depth, bold sans-serif headlines for hierarchy and contrast.',
            serifExamples: ['The Economist (Chronicle Text)', 'National Geographic (body)', 'TIME Magazine body text'],
            sansExamples: ['Vogue headlines (Didot headline)', 'WIRED (Interstate)', 'The Guardian headlines (Guardian Sans)'],
            serifFont: '"Times New Roman", serif',
            sansFont: '"Helvetica Neue", Arial, sans-serif',
        },
        {
            domain: 'Digital Interfaces (UI/UX)',
            winner: 'Sans-serif',
            winnerColor: '#60a5fa',
            reason: 'Screens demand clarity at all resolutions. System UI fonts — San Francisco (Apple), Roboto (Google), Segoe UI (Microsoft) — are all sans-serif.',
            serifExamples: ['Medium articles (Georgia)', 'Notion body text (Georgia fallback)', 'Amazon product descriptions (Georgia)'],
            sansExamples: ['iOS (San Francisco)', 'Android (Roboto)', 'Google Workspace (Google Sans)', 'Facebook (Helvetica Neue)'],
            serifFont: 'Georgia, serif',
            sansFont: '"Helvetica Neue", Arial, sans-serif',
        },
        {
            domain: 'Luxury & Fashion Branding',
            winner: 'Serif',
            winnerColor: '#c4a96b',
            reason: 'Serifs signal tradition, craftsmanship, and premium quality. Thin hairline serifs (Didot, Bodoni) define the visual language of luxury.',
            serifExamples: ['Vogue (Didot wordmark)', 'Tiffany & Co. (custom serif)', 'Louis Vuitton (Brown Pro Serif)'],
            sansExamples: ['Chanel (sans wordmark)', 'Bottega Veneta (sans)', 'Saint Laurent (Helvetica)'],
            serifFont: 'Georgia, serif',
            sansFont: '"Helvetica Neue", Arial, sans-serif',
        },
        {
            domain: 'Tech & Startup Branding',
            winner: 'Sans-serif',
            winnerColor: '#60a5fa',
            reason: 'Tech companies project modernity, accessibility, and speed — all coded into geometric or humanist sans-serif logos.',
            serifExamples: ['IBM (slab-serif in heritage materials)', 'Medium (Sohne Serif)', 'Notion (occasional serif accents)'],
            sansExamples: ['Google (Product Sans)', 'Apple (San Francisco)', 'Uber (Uber Move)', 'Airbnb (Cereal)'],
            serifFont: '"Times New Roman", serif',
            sansFont: '"Montserrat", Arial, sans-serif',
        },
        {
            domain: 'Wayfinding & Signage',
            winner: 'Sans-serif',
            winnerColor: '#60a5fa',
            reason: 'Signs must be read at speed, from a distance, under variable lighting. Serifs create noise; sans-serifs read instantly.',
            serifExamples: ['Some heritage rail networks (UK railway)', 'Older US highway signs (Highway Gothic is technically sans…)', 'British motorway has serifs in some historic fonts'],
            sansExamples: ['London Underground (Johnston Sans)', 'Heathrow Airport (Frutiger)', 'US Interstate Highways (Highway Gothic)', 'Olympics signage (custom sans)'],
            serifFont: 'Georgia, serif',
            sansFont: 'Arial, sans-serif',
        },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem 0' }}>
            {apps.map((app, i) => (
                <motion.div
                    key={app.domain}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    style={{
                        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '16px', padding: '1.5rem',
                    }}
                >
                    {/* Domain */}
                    <div style={{ gridColumn: '1 / -1', marginBottom: '0.5rem' }}>
                        <span style={{
                            display: 'inline-block', padding: '0.25rem 0.8rem', borderRadius: '12px',
                            fontSize: '0.73rem', fontWeight: 700,
                            background: `${app.winnerColor}22`, border: `1px solid ${app.winnerColor}55`,
                            color: app.winnerColor, marginBottom: '0.4rem',
                        }}>✓ {app.winner} wins</span>
                        <h4 style={{ margin: '0 0 0.3rem', fontSize: '1.05rem', color: 'rgba(255,255,255,0.88)' }}>{app.domain}</h4>
                        <p style={{ margin: 0, fontSize: '0.83rem', color: 'rgba(255,255,255,0.45)', lineHeight: '1.55' }}>{app.reason}</p>
                    </div>

                    {/* Serif column */}
                    <div style={{ borderTop: `2px solid #c4a96b44`, paddingTop: '0.8rem' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#c4a96b', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>SERIF</div>
                        {app.serifExamples.map((ex, j) => (
                            <div key={j} style={{
                                fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)',
                                fontFamily: app.serifFont, marginBottom: '0.3rem',
                            }}>• {ex}</div>
                        ))}
                    </div>

                    {/* Sans column */}
                    <div style={{ borderTop: `2px solid #60a5fa44`, paddingTop: '0.8rem' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#60a5fa', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>SANS-SERIF</div>
                        {app.sansExamples.map((ex, j) => (
                            <div key={j} style={{
                                fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)',
                                fontFamily: app.sansFont, marginBottom: '0.3rem',
                            }}>• {ex}</div>
                        ))}
                    </div>

                    {/* Visual specimen */}
                    <div style={{
                        borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.8rem',
                        display: 'flex', flexDirection: 'column', gap: '0.4rem', justifyContent: 'flex-end',
                    }}>
                        <p style={{ fontFamily: app.serifFont, fontSize: '1.1rem', color: '#c4a96b', margin: 0 }}>
                            Typography
                        </p>
                        <p style={{ fontFamily: app.sansFont, fontSize: '1.1rem', color: '#60a5fa', margin: 0 }}>
                            Typography
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

/* ════════════════════════════════════════════════════════════════ */
export default function SerifComparison() {
    const [activeTab, setActiveTab] = useState('history');

    return (
        <div style={{ padding: '2rem 0' }}>

            {/* Intro + visual comparison banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem',
                    marginBottom: '3rem', maxWidth: '860px', margin: '0 auto 3rem',
                }}
            >
                {/* Serif side */}
                <div style={{
                    background: 'linear-gradient(135deg,#1a1205,#2d2110)',
                    border: '1.5px solid #c4a96b44',
                    borderRadius: '18px', padding: '2rem', textAlign: 'center',
                }}>
                    <p style={{ fontFamily: '"EB Garamond", Georgia, serif', fontSize: '4rem', margin: '0 0 0.5rem', color: '#c4a96b', lineHeight: 1 }}>Aa</p>
                    <h3 style={{ margin: '0 0 0.4rem', color: '#c4a96b', fontSize: '1.2rem' }}>Serif</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: '1.5' }}>
                        With decorative strokes at stroke ends.<br />
                        Example: <em style={{ fontFamily: 'Georgia, serif' }}>EB Garamond</em>
                    </p>
                </div>
                {/* Sans side */}
                <div style={{
                    background: 'linear-gradient(135deg,#020c1b,#0f2646)',
                    border: '1.5px solid #60a5fa44',
                    borderRadius: '18px', padding: '2rem', textAlign: 'center',
                }}>
                    <p style={{ fontFamily: '"Montserrat", Arial, sans-serif', fontSize: '4rem', margin: '0 0 0.5rem', color: '#60a5fa', lineHeight: 1 }}>Aa</p>
                    <h3 style={{ margin: '0 0 0.4rem', color: '#60a5fa', fontSize: '1.2rem' }}>Sans-serif</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: '1.5' }}>
                        Without serif strokes — clean terminals.<br />
                        Example: <span style={{ fontFamily: 'Arial, sans-serif' }}>Montserrat</span>
                    </p>
                </div>
            </motion.div>

            {/* Tab bar */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
                {TABS.map(tab => {
                    const isA = activeTab === tab.id;
                    return (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '0.65rem 1.6rem',
                                borderRadius: '50px',
                                border: `2px solid ${isA ? '#a855f7' : 'rgba(255,255,255,0.12)'}`,
                                background: isA ? 'rgba(168,85,247,0.18)' : 'rgba(255,255,255,0.03)',
                                color: isA ? '#a855f7' : 'rgba(255,255,255,0.5)',
                                fontWeight: isA ? 700 : 400,
                                fontSize: '0.9rem', cursor: 'pointer',
                                boxShadow: isA ? '0 0 20px #a855f744' : 'none',
                                transition: 'all 0.25s',
                            }}
                        >
                            {tab.label}
                        </motion.button>
                    );
                })}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                >
                    {activeTab === 'history' && <HistoryContent />}
                    {activeTab === 'readability' && <ReadabilityContent />}
                    {activeTab === 'applications' && <ApplicationsContent />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
