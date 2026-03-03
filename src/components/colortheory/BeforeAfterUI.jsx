import { motion } from 'framer-motion';
import { useState } from 'react';

const BeforeAfterUI = ({ isKidMode, currentPalette }) => {
    const [sliderValue, setSliderValue] = useState(50);

    // Default "Bad" Palette (Before)
    const badPalette = {
        primary: '#808080',
        secondary: '#505050',
        accent: '#ff0000', // Clashing color
        background: '#333333',
        surface: '#a0a0a0'
    };

    // The Good Palette (After) - dynamically maps from PaletteGenerator if provided, 
    // otherwise falls back to a default active theme.
    // For this implementation, we'll hardcode the mapping if currentPalette isn't passed for simplicity 
    // or rely on a wrapper state. We'll use a fixed appealing Triadic theme if none provided.
    const goodPalette = currentPalette ? {
        primary: currentPalette.colors[0].hex,
        secondary: currentPalette.colors[1].hex,
        accent: currentPalette.colors[2].hex,
        background: currentPalette.colors[3].hex,
        surface: currentPalette.colors[4].hex
    } : {
        primary: '#3b82f6',
        secondary: '#ef4444',
        accent: '#eab308',
        background: '#1e3a8a',
        surface: '#eff6ff'
    };

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
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
            gap: '2rem',
            alignItems: 'center'
        }}>
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '0.5rem' }}>
                    {isKidMode ? "Ta-da! My Magic App Design" : "Step 3: Application & Evidence"}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {isKidMode
                        ? "Slide the magic wand to see how the new paintbox changes from boring to amazing!"
                        : "Use the slider to compare the uncoordinated design (Before) with the applied color scheme (After)."}
                </p>
            </div>

            {/* Interactive Slider Area */}
            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '800px',
                height: '400px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                cursor: 'ew-resize'
            }}>
                {/* BEFORE (Underneath) */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: badPalette.background,
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>
                    {/* Mock UI Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: badPalette.primary }}></div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ width: '60px', height: '10px', background: badPalette.surface, borderRadius: '5px' }}></div>
                            <div style={{ width: '60px', height: '10px', background: badPalette.surface, borderRadius: '5px' }}></div>
                        </div>
                        <div style={{ padding: '0.5rem 1rem', background: badPalette.accent, color: 'white', borderRadius: '8px', fontWeight: 'bold' }}>
                            Action
                        </div>
                    </div>

                    {/* Mock Content */}
                    <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
                        <div style={{ flex: 1, background: badPalette.secondary, borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ width: '70%', height: '24px', background: badPalette.surface, borderRadius: '4px' }}></div>
                            <div style={{ width: '100%', height: '12px', background: badPalette.surface, borderRadius: '4px', opacity: 0.5 }}></div>
                            <div style={{ width: '80%', height: '12px', background: badPalette.surface, borderRadius: '4px', opacity: 0.5 }}></div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ flex: 1, background: badPalette.surface, borderRadius: '16px' }}></div>
                            <div style={{ flex: 1, background: badPalette.surface, borderRadius: '16px' }}></div>
                        </div>
                    </div>
                    {/* Label */}
                    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}>
                        BEFORE (Dull & Clashing)
                    </div>
                </div>

                {/* AFTER (On Top, Clipped) */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: goodPalette.background,
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)`,
                    pointerEvents: 'none' // Let clicks pass to the slider track
                }}>
                    {/* Mock UI Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: goodPalette.primary }}></div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ width: '60px', height: '10px', background: goodPalette.surface, borderRadius: '5px', opacity: 0.5 }}></div>
                            <div style={{ width: '60px', height: '10px', background: goodPalette.surface, borderRadius: '5px', opacity: 0.5 }}></div>
                        </div>
                        <div style={{ padding: '0.5rem 1rem', background: goodPalette.accent, color: goodPalette.background === '#1e3a8a' ? '#000' : '#fff', borderRadius: '8px', fontWeight: 'bold' }}>
                            Action
                        </div>
                    </div>

                    {/* Mock Content */}
                    <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
                        <div style={{ flex: 1, background: goodPalette.secondary, borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ width: '70%', height: '24px', background: goodPalette.surface, borderRadius: '4px' }}></div>
                            <div style={{ width: '100%', height: '12px', background: goodPalette.surface, borderRadius: '4px', opacity: 0.6 }}></div>
                            <div style={{ width: '80%', height: '12px', background: goodPalette.surface, borderRadius: '4px', opacity: 0.6 }}></div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ flex: 1, background: goodPalette.primary, borderRadius: '16px', opacity: 0.2 }}></div>
                            <div style={{ flex: 1, background: goodPalette.accent, borderRadius: '16px', opacity: 0.2 }}></div>
                        </div>
                    </div>
                    {/* Label */}
                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}>
                        AFTER (Applied Scheme)
                    </div>
                </div>

                {/* Slider Input */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'ew-resize',
                        zIndex: 10
                    }}
                />

                {/* Slider Handle Visual */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${sliderValue}%`,
                    width: '4px',
                    background: 'white',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                    zIndex: 5,
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '40px',
                        height: '40px',
                        background: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: '12px'
                    }}>
                        ⬌
                    </div>
                </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
                Hint: Drag the slider handle left and right to see the transformation!
            </p>
        </div>
    );
};

export default BeforeAfterUI;
