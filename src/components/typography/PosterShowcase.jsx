import { motion } from 'framer-motion';
import { useState } from 'react';
import { ZoomIn, Layers, Type, Palette } from 'lucide-react';

const PosterShowcase = () => {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [selectedAnnotation, setSelectedAnnotation] = useState(null);

    const annotations = [
        {
            id: 'logotype',
            title: 'Vertical Logotype',
            description: '"PANDA" is set vertically in bold yellow against deep blue — a strong typographic identity that anchors the left column and commands immediate attention.',
            position: { top: '38%', left: '3%' },
            color: '#f59e0b'
        },
        {
            id: 'colorblocking',
            title: 'Bold Color Blocking',
            description: 'Deep cobalt blue, sky blue, and yellow create a high-contrast triadic palette. Color zones guide the eye through distinct sections of information.',
            position: { top: '8%', right: '5%' },
            color: '#3b82f6'
        },
        {
            id: 'typography',
            title: 'Mixed Weight Typography',
            description: '"Developer, Editor" uses a heavy sans-serif weight against a dark background for contrast. Body copy uses a lighter weight for readability.',
            position: { bottom: '28%', left: '5%' },
            color: '#7c3aed'
        },
        {
            id: 'layout',
            title: 'Grid & Organic Shapes',
            description: 'A strict two-column grid is softened by fluid organic curves at the bottom, balancing structure with dynamism — a key principle of modern poster design.',
            position: { bottom: '8%', right: '5%' },
            color: '#10b981'
        }
    ];

    return (
        <div style={{ padding: '2rem 0' }}>
            {/* Introduction */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    maxWidth: '900px',
                    margin: '0 auto 4rem',
                    textAlign: 'center'
                }}
            >
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.8',
                    marginBottom: '1.5rem'
                }}>
                    This A4 poster demonstrates the power of typography in design through careful attention to
                    hierarchy, contrast, balance, and whitespace. Click on the hotspots to explore design decisions.
                </p>
            </motion.div>

            {/* Zoom Controls */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                marginBottom: '2rem'
            }}>
                <button
                    onClick={() => setZoomLevel(1)}
                    style={{
                        padding: '0.7rem 1.5rem',
                        background: zoomLevel === 1 ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${zoomLevel === 1 ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Fit to Screen
                </button>
                <button
                    onClick={() => setZoomLevel(1.5)}
                    style={{
                        padding: '0.7rem 1.5rem',
                        background: zoomLevel === 1.5 ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${zoomLevel === 1.5 ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <ZoomIn size={16} />
                    Zoom 150%
                </button>
            </div>

            {/* Poster Display */}
            <motion.div
                style={{
                    maxWidth: '900px',
                    margin: '0 auto 4rem',
                    position: 'relative',
                    overflow: 'auto',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <motion.div
                    animate={{ scale: zoomLevel }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '100%',
                        maxWidth: '500px',
                        margin: '0 auto',
                        display: 'block',
                        transformOrigin: 'top center',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        borderRadius: '12px',
                        overflow: 'visible'
                    }}
                >
                    {/* Actual Poster Image */}
                    <img
                        src="/typography-poster.png"
                        alt="PANDA Typography Poster"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            borderRadius: '12px'
                        }}
                    />

                    {/* Interactive Hotspots */}
                    {annotations.map((annotation) => {
                        // Determine smart popup direction based on pin position
                        const isRight = annotation.position.right !== undefined;
                        const isBottom = annotation.position.bottom !== undefined;

                        const popupStyle = {
                            position: 'absolute',
                            width: '210px',
                            padding: '0.9rem 1rem',
                            background: 'rgba(10,10,10,0.96)',
                            border: `2px solid ${annotation.color}`,
                            borderRadius: '12px',
                            boxShadow: '0 8px 28px rgba(0,0,0,0.6)',
                            zIndex: 50,
                            // Horizontal: right-edge pins open left, left-edge pins open right
                            ...(isRight ? { right: '28px' } : { left: '28px' }),
                            // Vertical: bottom pins open upward, top pins open downward
                            ...(isBottom ? { bottom: '28px' } : { top: '28px' }),
                        };

                        return (
                            <motion.div
                                key={annotation.id}
                                style={{
                                    position: 'absolute',
                                    ...annotation.position,
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '50%',
                                    background: annotation.color,
                                    border: '3px solid white',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                                    zIndex: selectedAnnotation === annotation.id ? 50 : 5,
                                }}
                                whileHover={{ scale: 1.3 }}
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                                onClick={() => setSelectedAnnotation(selectedAnnotation === annotation.id ? null : annotation.id)}
                            >
                                {selectedAnnotation === annotation.id && (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        style={popupStyle}
                                    >
                                        <h4 style={{
                                            fontSize: '0.85rem',
                                            marginBottom: '0.4rem',
                                            color: annotation.color,
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.06em'
                                        }}>
                                            {annotation.title}
                                        </h4>
                                        <p style={{
                                            fontSize: '0.78rem',
                                            color: 'rgba(255,255,255,0.85)',
                                            margin: 0,
                                            lineHeight: '1.5'
                                        }}>
                                            {annotation.description}
                                        </p>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>

            {/* Design Breakdown */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                    Design Breakdown
                </h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {[
                        {
                            icon: Layers,
                            title: 'Typographic Identity',
                            color: '#7c3aed',
                            points: [
                                '"PANDA" set vertically as a bold display logotype',
                                'High-contrast yellow on deep blue for maximum impact',
                                'Text as a graphic element anchoring the composition'
                            ]
                        },
                        {
                            icon: Type,
                            title: 'Font & Weight Contrast',
                            color: '#ec4899',
                            points: [
                                'Heavy sans-serif weight for role titles (Developer, Editor)',
                                'Light body copy for bio text maintains readability',
                                'Weight contrast creates clear typographic hierarchy'
                            ]
                        },
                        {
                            icon: Palette,
                            title: 'Color & Layout',
                            color: '#f59e0b',
                            points: [
                                'Triadic palette: cobalt blue, sky blue, and yellow',
                                'Two-column grid separates identity from content',
                                'Organic curves at base soften the rigid grid structure'
                            ]
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            style={{
                                background: `linear-gradient(135deg, ${item.color}22 0%, rgba(255,255,255,0.03) 100%)`,
                                padding: '2rem',
                                borderRadius: '15px',
                                border: `2px solid ${item.color}`
                            }}
                        >
                            <item.icon size={32} color={item.color} style={{ marginBottom: '1rem' }} />
                            <h4 style={{
                                fontSize: '1.3rem',
                                marginBottom: '1rem',
                                color: item.color
                            }}>
                                {item.title}
                            </h4>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'grid',
                                gap: '0.8rem'
                            }}>
                                {item.points.map((point, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            fontSize: '0.95rem',
                                            color: 'var(--text-secondary)',
                                            lineHeight: '1.6',
                                            paddingLeft: '1rem',
                                            borderLeft: `2px solid ${item.color}33`
                                        }}
                                    >
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default PosterShowcase;
