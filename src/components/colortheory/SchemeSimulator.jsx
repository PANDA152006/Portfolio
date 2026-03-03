import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const SchemeSimulator = ({ isKidMode }) => {
    const [activeScheme, setActiveScheme] = useState('monochromatic');

    const schemes = [
        {
            id: 'monochromatic',
            title: isKidMode ? 'The Color Family' : 'Monochromatic',
            description: isKidMode
                ? "This is a family! They are all Blue, but some are light like the sky (baby), and some are dark like the ocean (daddy)."
                : "A monochromatic color scheme uses variations in lightness and saturation of a single color.",
            icon: isKidMode ? '👨‍👩‍👦' : '⚪',
            colors: ['#eff6ff', '#93c5fd', '#3b82f6', '#1d4ed8', '#172554']
        },
        {
            id: 'analogous',
            title: isKidMode ? 'Next-Door Neighbors' : 'Analogous',
            description: isKidMode
                ? "These colors live right next door to each other! They always get along and look peaceful together."
                : "Analogous color schemes use colors that are next to each other on the color wheel. They usually match well and create serene and comfortable designs.",
            icon: isKidMode ? '🏡' : '🤝',
            colors: ['#22c55e', '#84cc16', '#eab308'] // Green, Yellow-Green, Yellow
        },
        {
            id: 'complementary',
            title: isKidMode ? 'The Super Opposites' : 'Complementary',
            description: isKidMode
                ? "These colors live far away from each other! But when they play together, they are SUPER BRIGHT and exciting!"
                : "Colors that are opposite each other on the color wheel are considered to be complementary colors. The high contrast of complementary colors creates a vibrant look.",
            icon: isKidMode ? '⚡' : '⬌',
            colors: ['#ef4444', '#22c55e'] // Red, Green
        },
        {
            id: 'triadic',
            title: isKidMode ? 'The Triangle Team' : 'Triadic',
            description: isKidMode
                ? "Three colors that are perfectly spread out. Together, they make a super fun and balanced team!"
                : "A triadic color scheme uses colors that are evenly spaced around the color wheel. They tend to be quite vibrant, even if you use pale or unsaturated versions.",
            icon: isKidMode ? '🔺' : '▵',
            colors: ['#ef4444', '#3b82f6', '#eab308'] // Red, Blue, Yellow
        }
    ];

    const currentScheme = schemes.find(s => s.id === activeScheme);

    return (
        <div style={{
            width: '100%',
            padding: '2rem',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
        }}>
            {/* Scheme Selector */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {schemes.map(scheme => (
                    <motion.button
                        key={scheme.id}
                        onClick={() => setActiveScheme(scheme.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '1rem 1.5rem',
                            background: activeScheme === scheme.id ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${activeScheme === scheme.id ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`,
                            borderRadius: '16px',
                            color: activeScheme === scheme.id ? '#a78bfa' : 'white',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{scheme.icon}</span>
                        {scheme.title}
                    </motion.button>
                ))}
            </div>

            {/* Stage Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeScheme}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '20px',
                        padding: '3rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2rem',
                        border: '1px dashed rgba(255,255,255,0.05)'
                    }}
                >
                    <div style={{ textAlign: 'center', maxWidth: '700px' }}>
                        <h4 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1rem' }}>
                            {currentScheme.title}
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            {currentScheme.description}
                        </p>
                    </div>

                    {/* Interactive Color Demonstration */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: activeScheme === 'complementary' ? '4rem' : '1.5rem',
                        minHeight: '200px',
                        flexWrap: 'wrap'
                    }}>
                        {currentScheme.colors.map((color, idx) => (
                            <motion.div
                                key={`${activeScheme}-${idx}`}
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 15,
                                    delay: idx * 0.1
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    boxShadow: `0 0 30px ${color}80`
                                }}
                                style={{
                                    width: activeScheme === 'complementary' ? '120px' : '100px',
                                    height: activeScheme === 'complementary' ? '120px' : '100px',
                                    borderRadius: activeScheme === 'monochromatic' ? '16px' : '50%',
                                    background: color,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                                    position: 'relative',
                                    cursor: 'pointer'
                                }}
                            >
                                {/* Adding kid-friendly elements based on active scheme */}
                                {isKidMode && activeScheme === 'monochromatic' && (
                                    <span style={{ fontSize: '1.5rem', mixBlendMode: 'overlay' }}>
                                        {idx === 0 ? '👶' : idx === currentScheme.colors.length - 1 ? '👴' : '🧍'}
                                    </span>
                                )}
                                {isKidMode && activeScheme === 'analogous' && (
                                    <span style={{ fontSize: '1.5rem', mixBlendMode: 'overlay' }}>🏠</span>
                                )}
                                {isKidMode && activeScheme === 'complementary' && (
                                    <span style={{ fontSize: '2rem', mixBlendMode: 'overlay' }}>⚡</span>
                                )}
                                {isKidMode && activeScheme === 'triadic' && (
                                    <span style={{ fontSize: '1.5rem', mixBlendMode: 'overlay' }}>⭐</span>
                                )}

                                {/* Label for teacher mode */}
                                {!isKidMode && (
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '-30px',
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.8rem',
                                        background: 'rgba(0,0,0,0.5)',
                                        padding: '4px 8px',
                                        borderRadius: '8px'
                                    }}>
                                        {color.toUpperCase()}
                                    </span>
                                )}
                            </motion.div>
                        ))}

                        {/* Special connections for specific schemes */}
                        {activeScheme === 'complementary' && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: '100px', opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                style={{
                                    position: 'absolute',
                                    height: '4px',
                                    background: 'linear-gradient(90deg, #ef4444, #22c55e)',
                                    zIndex: 0
                                }}
                            />
                        )}

                        {activeScheme === 'analogous' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '40px',
                                    display: 'flex',
                                    gap: '1.5rem',
                                    zIndex: 0
                                }}
                            >
                                <span style={{ color: 'rgba(255,255,255,0.2)' }}>〰️〰️</span>
                                <span style={{ color: 'rgba(255,255,255,0.2)' }}>〰️〰️</span>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default SchemeSimulator;
