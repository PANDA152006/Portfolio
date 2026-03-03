import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const PaletteGenerator = ({ isKidMode, onPaletteChange }) => {
    const [copiedHex, setCopiedHex] = useState(null);
    const [activeScheme, setActiveScheme] = useState('triadic');

    const palettes = {
        triadic: {
            name: isKidMode ? 'The Triangle Team Palette' : 'Triadic Scheme (Primary: Blue)',
            colors: [
                { hex: '#3b82f6', role: 'Primary', kidRole: 'Boss' }, // Blue
                { hex: '#ef4444', role: 'Secondary', kidRole: 'Sidekick' }, // Red
                { hex: '#eab308', role: 'Accent', kidRole: 'Sparkle' }, // Yellow
                { hex: '#1e3a8a', role: 'Background', kidRole: 'Big Sky' }, // Dark Blue
                { hex: '#eff6ff', role: 'Text/Surface', kidRole: 'Cloud' } // Light Blue
            ]
        },
        complementary: {
            name: isKidMode ? 'The Super Opposites Palette' : 'Complementary Scheme (Green/Red)',
            colors: [
                { hex: '#10b981', role: 'Primary', kidRole: 'Boss' }, // Emerald
                { hex: '#f43f5e', role: 'Secondary', kidRole: 'Sidekick' }, // Rose
                { hex: '#fbbf24', role: 'Accent', kidRole: 'Sparkle' }, // Amber
                { hex: '#064e3b', role: 'Background', kidRole: 'Big Forest' }, // Dark Emerald
                { hex: '#ecfdf5', role: 'Text/Surface', kidRole: 'Snow' } // Light Emerald
            ]
        }
    };

    const currentPalette = palettes[activeScheme];

    const handleCopy = (hex) => {
        navigator.clipboard.writeText(hex);
        setCopiedHex(hex);
        setTimeout(() => setCopiedHex(null), 2000);
    };

    const handleSchemeChange = (scheme) => {
        setActiveScheme(scheme);
        if (onPaletteChange) {
            onPaletteChange(palettes[scheme]);
        }
    };

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '0.5rem' }}>
                        {isKidMode ? "Your Magic Paintbox!" : "Step 2: Create a Color Palette"}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {isKidMode
                            ? "Pick a team of colors to paint your picture!"
                            : "Defining roles for a selected 5-color scheme (HEX values included)."}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '16px' }}>
                    {Object.keys(palettes).map((scheme) => (
                        <button
                            key={scheme}
                            onClick={() => handleSchemeChange(scheme)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: activeScheme === scheme ? 'var(--accent-color)' : 'transparent',
                                color: activeScheme === scheme ? 'white' : 'var(--text-secondary)',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: activeScheme === scheme ? 'bold' : 'normal',
                                textTransform: 'capitalize',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {scheme}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <h4 style={{ color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>
                    {currentPalette.name}
                </h4>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    justifyContent: 'center'
                }}>
                    <AnimatePresence mode="popLayout">
                        {currentPalette.colors.map((color, index) => (
                            <motion.div
                                key={`${activeScheme}-${color.hex}`}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                transition={{ delay: index * 0.1, type: 'spring' }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    alignItems: 'center',
                                    width: '140px'
                                }}
                            >
                                <motion.div
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    style={{
                                        width: '100%',
                                        aspectRatio: '1',
                                        background: color.hex,
                                        borderRadius: '20px',
                                        boxShadow: `0 10px 20px -5px ${color.hex}80`,
                                        position: 'relative',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: color.hex === '#ecfdf5' || color.hex === '#eff6ff' ? '1px solid rgba(0,0,0,0.1)' : 'none'
                                    }}
                                    onClick={() => handleCopy(color.hex)}
                                >
                                    <AnimatePresence>
                                        {copiedHex === color.hex ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                style={{
                                                    background: 'rgba(255,255,255,0.9)',
                                                    padding: '8px',
                                                    borderRadius: '50%',
                                                    color: '#10b981'
                                                }}
                                            >
                                                <Check size={24} />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                                style={{
                                                    background: 'rgba(0,0,0,0.5)',
                                                    padding: '8px',
                                                    borderRadius: '50%',
                                                    color: 'white'
                                                }}
                                            >
                                                <Copy size={24} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                                        {color.hex.toUpperCase()}
                                    </div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        {isKidMode ? color.kidRole : color.role}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default PaletteGenerator;
