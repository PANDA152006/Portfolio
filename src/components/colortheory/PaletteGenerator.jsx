import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

// HSL to Hex conversion
function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            default: h = ((r - g) / d + 4) / 6;
        }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function generatePalettes(hex) {
    const { h, s, l } = hexToHsl(hex);
    return {
        analogous: [
            hslToHex((h - 30 + 360) % 360, s, l),
            hex,
            hslToHex((h + 30) % 360, s, l),
            hslToHex((h + 15) % 360, s, Math.min(l + 15, 90)),
            hslToHex((h - 15 + 360) % 360, s, Math.max(l - 15, 10)),
        ],
        complementary: [
            hex,
            hslToHex((h + 180) % 360, s, l),
            hslToHex(h, s, Math.min(l + 20, 90)),
            hslToHex((h + 180) % 360, s, Math.min(l + 20, 90)),
            hslToHex(h, Math.max(s - 20, 0), Math.max(l - 20, 10)),
        ],
        triadic: [
            hex,
            hslToHex((h + 120) % 360, s, l),
            hslToHex((h + 240) % 360, s, l),
            hslToHex(h, s, Math.min(l + 25, 90)),
            hslToHex((h + 120) % 360, s, Math.min(l + 25, 90)),
        ],
        monochromatic: [
            hslToHex(h, s, Math.max(l - 30, 8)),
            hslToHex(h, s, Math.max(l - 15, 15)),
            hex,
            hslToHex(h, s, Math.min(l + 15, 88)),
            hslToHex(h, s, Math.min(l + 30, 95)),
        ],
    };
}

const SCHEME_META = {
    analogous: { label: 'Analogous', emoji: '🌊', desc: 'Neighboring hues — calm & cohesive' },
    complementary: { label: 'Complementary', emoji: '⚡', desc: 'Opposite hues — high contrast & vibrant' },
    triadic: { label: 'Triadic', emoji: '🔺', desc: 'Evenly spaced — balanced & dynamic' },
    monochromatic: { label: 'Monochromatic', emoji: '🎨', desc: 'One hue, many shades — elegant & unified' },
};

const Swatch = ({ hex, index }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    // Determine text color based on luminance
    const { l } = hexToHsl(hex);
    const textColor = l > 55 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)';

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, type: 'spring', stiffness: 180 }}
            onClick={handleCopy}
            title={`Copy ${hex}`}
            style={{
                flex: '1',
                minWidth: 60,
                height: 110,
                background: hex,
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0.5rem',
                cursor: 'pointer',
                boxShadow: `0 6px 20px ${hex}44`,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'transform 0.2s',
            }}
            whileHover={{ scale: 1.05, y: -4 }}
        >
            <AnimatePresence>
                {copied ? (
                    <motion.div
                        key="check"
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(4px)', borderRadius: '12px' }}
                    >
                        <Check size={28} color="#F2F2F2" />
                    </motion.div>
                ) : null}
            </AnimatePresence>
            <span style={{
                color: textColor,
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                background: 'rgba(0,0,0,0.12)',
                padding: '2px 6px',
                borderRadius: 6,
                fontFamily: 'monospace',
            }}>
                {hex.toUpperCase()}
            </span>
        </motion.div>
    );
};

const LivePreview = ({ palettes, pickedHex }) => {
    const bg = palettes.monochromatic[0];
    const primary = pickedHex;
    const cta = palettes.complementary[1];
    const textLight = palettes.monochromatic[4];

    return (
        <div style={{
            background: bg,
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.08)',
            minWidth: 240,
            boxShadow: `0 20px 40px ${bg}88`,
        }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                Live Preview
            </div>
            <div style={{ color: textLight, fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                Your Brand
            </div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginBottom: '1rem', lineHeight: 1.55 }}>
                See how your chosen color looks in a real UI layout.
            </div>
            {/* nav-like bar */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
                {[primary, ...palettes.analogous.slice(1, 3)].map((c, i) => (
                    <div key={i} style={{ height: 4, flex: 1, borderRadius: 4, background: c }} />
                ))}
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
                <div style={{
                    background: cta,
                    color: '#F2F2F2',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    flex: 1,
                    textAlign: 'center',
                }}>
                    CTA Button
                </div>
                <div style={{
                    border: `1px solid ${primary}`,
                    color: textLight,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                }}>
                    Outline
                </div>
            </div>
        </div>
    );
};

const PaletteGenerator = () => {
    const [pickedHex, setPickedHex] = useState('#C6A15B');
    const palettes = generatePalettes(pickedHex);

    return (
        <section
            id="playground"
            style={{
                padding: '120px 24px 80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <span style={{
                        display: 'inline-block',
                        padding: '0.4rem 1.2rem',
                        background: 'rgba(107,15,26,0.2)',
                        border: '1px solid rgba(198,161,91,0.3)',
                        borderRadius: '30px',
                        color: '#C6A15B',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                    }}>
                        Interactive Tool
                    </span>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#F2F2F2', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                        Color Playground
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', maxWidth: 480, margin: '0 auto' }}>
                        Pick any color and instantly see all four palette types generated for you.
                    </p>
                </motion.div>

                {/* Color Picker Row */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.2rem',
                    marginBottom: '3rem',
                    flexWrap: 'wrap',
                }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <label htmlFor="colorPicker" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: 600 }}>Base Color</label>
                        <div style={{ position: 'relative', width: 52, height: 52, borderRadius: '12px', overflow: 'hidden', boxShadow: `0 6px 20px ${pickedHex}66`, border: '2px solid rgba(255,255,255,0.1)' }}>
                            <input
                                id="colorPicker"
                                type="color"
                                value={pickedHex}
                                onChange={e => setPickedHex(e.target.value)}
                                style={{
                                    position: 'absolute',
                                    inset: '-4px',
                                    width: '120%',
                                    height: '120%',
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: 'none',
                                }}
                            />
                        </div>
                        <span style={{ color: '#F2F2F2', fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 700 }}>{pickedHex.toUpperCase()}</span>
                    </div>
                </div>

                {/* Palettes + Preview */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', alignItems: 'flex-start', justifyContent: 'center' }}>
                    {/* Palettes grid */}
                    <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {Object.entries(palettes).map(([key, colors]) => {
                            const meta = SCHEME_META[key];
                            return (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    style={{
                                        background: 'rgba(107,15,26,0.12)',
                                        border: '1px solid rgba(198,161,91,0.1)',
                                        borderRadius: '18px',
                                        padding: '1.5rem',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '1.1rem' }}>{meta.emoji}</span>
                                        <div>
                                            <div style={{ color: '#F2F2F2', fontWeight: 700, fontSize: '1rem' }}>{meta.label}</div>
                                            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>{meta.desc}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                                        {colors.map((hex, i) => (
                                            <Swatch key={`${key}-${hex}-${i}`} hex={hex} index={i} />
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Live Preview */}
                    <div style={{ flexShrink: 0 }}>
                        <LivePreview palettes={palettes} pickedHex={pickedHex} />
                    </div>
                </div>

                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem', textAlign: 'center', marginTop: '2rem' }}>
                    Click any swatch to copy its hex value to clipboard.
                </p>
            </div>
        </section>
    );
};

export default PaletteGenerator;
