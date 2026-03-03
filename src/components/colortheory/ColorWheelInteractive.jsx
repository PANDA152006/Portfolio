import { motion } from 'framer-motion';
import { useState } from 'react';

const ColorWheelInteractive = ({ isKidMode }) => {
    // Stage 0: Show Boss Colors
    // Stage 1: Show Magic Hugs (Secondary)
    const [stage, setStage] = useState(0);

    const primaryColors = [
        { id: 'red', name: isKidMode ? 'Red Boss' : 'Red', hex: '#ef4444', pos: { top: '10%', left: '50%' } },
        { id: 'blue', name: isKidMode ? 'Blue Boss' : 'Blue', hex: '#3b82f6', pos: { top: '75%', left: '15%' } },
        { id: 'yellow', name: isKidMode ? 'Yellow Boss' : 'Yellow', hex: '#eab308', pos: { top: '75%', left: '85%' } }
    ];

    const secondaryColors = [
        { id: 'purple', name: isKidMode ? 'Purple Hug' : 'Purple', hex: '#a855f7', pos: { top: '42.5%', left: '32.5%' }, parents: ['red', 'blue'] },
        { id: 'orange', name: isKidMode ? 'Orange Hug' : 'Orange', hex: '#f97316', pos: { top: '42.5%', left: '67.5%' }, parents: ['red', 'yellow'] },
        { id: 'green', name: isKidMode ? 'Green Hug' : 'Green', hex: '#22c55e', pos: { top: '75%', left: '50%' }, parents: ['blue', 'yellow'] }
    ];

    const handleNextStage = () => {
        setStage(1);
    };

    const handleReset = () => {
        setStage(0);
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
            alignItems: 'center',
            gap: '2rem'
        }}>
            <div style={{ textAlign: 'center', maxWidth: '600px' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>
                    {stage === 0
                        ? (isKidMode ? "Meet The Boss Colors!" : "Primary Colors")
                        : (isKidMode ? "The Magic Hugs!" : "Secondary Colors")}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                    {stage === 0
                        ? (isKidMode
                            ? "These are the Boss Colors! They are super special because nobody can make them. But guess what? THEY make everyone else!"
                            : "Primary colors cannot be created by mixing other colors. They are the foundation of the color wheel.")
                        : (isKidMode
                            ? "Wow! When two Boss Colors give each other a magic hug, they make a brand new friend! Look who popped out!"
                            : "Secondary colors are created by mixing two primary colors together.")}
                </p>
            </div>

            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '500px',
                aspectRatio: '1',
                margin: '2rem auto'
            }}>
                {/* Connecting Lines for Stage 1 */}
                {stage === 1 && (
                    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                        <motion.path
                            d="M 250 50 L 75 375 L 425 375 Z"
                            fill="transparent"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </svg>
                )}

                {/* Primary Colors */}
                {primaryColors.map((color, index) => (
                    <motion.div
                        key={color.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 15,
                            delay: stage === 0 ? index * 0.2 : 0
                        }}
                        style={{
                            position: 'absolute',
                            top: color.pos.top,
                            left: color.pos.left,
                            transform: 'translate(-50%, -50%)',
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: color.hex,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 0 30px ${color.hex}80`,
                            cursor: 'pointer',
                            zIndex: 2
                        }}
                        whileHover={{ scale: 1.1, rotate: stage === 0 ? [0, -10, 10, -10, 0] : 0 }}
                    >
                        {isKidMode && stage === 0 && (
                            <span style={{ fontSize: '2.5rem' }}>😆</span>
                        )}
                        <span style={{
                            position: 'absolute',
                            bottom: '-35px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            background: 'rgba(0,0,0,0.5)',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            zIndex: 10
                        }}>
                            {color.name}
                        </span>
                    </motion.div>
                ))}

                {/* Secondary Colors */}
                {stage === 1 && secondaryColors.map((color, index) => (
                    <motion.div
                        key={color.id}
                        initial={{ scale: 0, opacity: 0, rotate: -180 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 150,
                            damping: 12,
                            delay: index * 0.4 + 0.5
                        }}
                        style={{
                            position: 'absolute',
                            top: color.pos.top,
                            left: color.pos.left,
                            transform: 'translate(-50%, -50%)',
                            width: '80px',
                            height: '80px',
                            borderRadius: '30%', // slightly different shape
                            background: color.hex,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 0 40px ${color.hex}aa`,
                            zIndex: 1
                        }}
                        whileHover={{ scale: 1.15 }}
                    >
                        {isKidMode && (
                            <span style={{ fontSize: '2rem' }}>✨</span>
                        )}
                        <span style={{
                            position: 'absolute',
                            bottom: '-35px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            fontWeight: '600',
                            whiteSpace: 'nowrap',
                            background: 'rgba(0,0,0,0.5)',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            zIndex: 10
                        }}>
                            {color.name}
                        </span>
                    </motion.div>
                ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
                {stage === 0 ? (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextStage}
                        style={{
                            padding: '1rem 2rem',
                            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                            border: 'none',
                            borderRadius: '50px',
                            color: 'white',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.5)'
                        }}
                    >
                        {isKidMode ? "Make them HUG! 🤗" : "Mix Primary Colors"}
                    </motion.button>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReset}
                        style={{
                            padding: '0.8rem 1.5rem',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '50px',
                            color: 'white',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        {isKidMode ? "Start Over 🔄" : "Reset Wheel"}
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default ColorWheelInteractive;
