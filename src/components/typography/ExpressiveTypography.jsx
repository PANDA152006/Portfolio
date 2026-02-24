import { motion } from 'framer-motion';
import { Smile, Frown, Zap, Heart } from 'lucide-react';

const ExpressiveTypography = () => {

    const emotions = [
        {
            id: 'joy',
            name: 'Joy & Playful',
            icon: Smile,
            color: '#7dd3fc',
            image: '/expressive-joy.png',
            description: 'Rounded bubble letterforms with a mint-to-blue gradient. The soft, inflated shapes feel approachable and childlike — pure delight.',
            principles: [
                'Bubbly, rounded letterforms',
                'Gradient colour flow (mint → sky blue)',
                'Wide, generous spacing',
                'No sharp edges — everything is soft',
                'Lowercase feel, even in caps'
            ],
        },
        {
            id: 'fear',
            name: 'Fear & Haunted',
            icon: Frown,
            color: '#ef4444',
            image: '/expressive-fear.png',
            description: 'Dripping blood-red letterforms on pitch black. The melting strokes trigger immediate unease — horror made typographic.',
            principles: [
                'Drip strokes simulate melting / bleeding',
                'High contrast: pure red on pure black',
                'Irregular baseline creates instability',
                'Jagged, organic edges signal danger',
                'All caps amplifies intensity'
            ],
        },
        {
            id: 'anger',
            name: 'Angry & Aggressive',
            icon: Zap,
            color: '#ef4444',
            image: '/expressive-angry.png',
            description: 'Heavy slab-bold red text slammed to the left. The compressed weight and blunt letterforms feel confrontational and forceful.',
            principles: [
                'Maximum weight — ultra-bold slab',
                'Tight tracking — no breathing room',
                'Left-aligned block creates a wall of force',
                'All caps with zero ornamentation',
                'Red on black = danger + dominance'
            ],
        },
        {
            id: 'vibe',
            name: 'Calm & Still',
            icon: Heart,
            color: '#ec4899',
            image: '/expressive-vibe.png',
            description: 'A casual script with a blue-to-pink gradient. The hand-drawn quality feels relaxed and current — effortlessly cool.',
            principles: [
                'Script font = informal, personal energy',
                'Gradient from cool blue to warm pink',
                'Relaxed, slightly irregular letterforms',
                'Mixed cap-height adds rhythm',
                'The phrase itself is culturally loaded'
            ],
        },
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
                    Typography can convey emotion without relying on words. Through careful manipulation of form,
                    weight, spacing, and colour, we can create powerful emotional expressions.
                </p>
                <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--accent-color)',
                    fontStyle: 'italic'
                }}>
                    Each poster below was hand-crafted to express a distinct emotion through type alone.
                </p>
            </motion.div>

            {/* Emotion Compositions */}
            <div style={{ display: 'grid', gap: '4rem' }}>
                {emotions.map((emotion, index) => (
                    <motion.div
                        key={emotion.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '25px',
                            padding: '3rem',
                            border: `2px solid ${emotion.color}33`,
                            position: 'relative',
                        }}
                    >
                        {/* Emotion Header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '2rem'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: emotion.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <emotion.icon size={28} color="white" />
                            </div>
                            <h3 style={{ fontSize: '2rem', margin: 0, color: emotion.color }}>
                                {emotion.name}
                            </h3>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '3rem',
                            alignItems: 'center'
                        }}>
                            {/* Poster Image */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    boxShadow: `0 12px 40px ${emotion.color}33`,
                                    border: `1.5px solid ${emotion.color}44`,
                                }}
                            >
                                <img
                                    src={emotion.image}
                                    alt={`${emotion.name} typography poster`}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                    }}
                                />
                            </motion.div>

                            {/* Design Explanation */}
                            <div>
                                <p style={{
                                    fontSize: '1.05rem',
                                    lineHeight: '1.8',
                                    color: 'rgba(255,255,255,0.9)',
                                    marginBottom: '2rem'
                                }}>
                                    {emotion.description}
                                </p>

                                <h4 style={{
                                    fontSize: '1.1rem',
                                    marginBottom: '1rem',
                                    color: emotion.color
                                }}>
                                    Design Principles Applied:
                                </h4>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    display: 'grid',
                                    gap: '0.7rem'
                                }}>
                                    {emotion.principles.map((principle, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.08 }}
                                            style={{
                                                padding: '0.7rem 1rem',
                                                background: `${emotion.color}18`,
                                                borderLeft: `3px solid ${emotion.color}`,
                                                borderRadius: '6px',
                                                fontSize: '0.9rem',
                                                color: 'rgba(255,255,255,0.85)'
                                            }}
                                        >
                                            {principle}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>


            {/* Interactive Canvas */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    marginTop: '4rem',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '20px',
                    padding: '3rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    textAlign: 'center'
                }}
            >
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    Key Takeaways
                </h3>
                <p style={{
                    fontSize: '1.05rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.8',
                    maxWidth: '800px',
                    margin: '0 auto 2rem'
                }}>
                    Expressive typography combines multiple design elements to create emotional impact:
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '2rem'
                }}>
                    {[
                        { title: 'Form', desc: 'Shape and structure of letterforms' },
                        { title: 'Weight', desc: 'Thickness and visual mass' },
                        { title: 'Spacing', desc: 'Kerning, tracking, and leading' },
                        { title: 'Color', desc: 'Hue, saturation, and contrast' },
                        { title: 'Movement', desc: 'Animation and dynamic effects' },
                        { title: 'Composition', desc: 'Arrangement and hierarchy' }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            style={{
                                padding: '1.5rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            <h4 style={{
                                fontSize: '1.2rem',
                                marginBottom: '0.5rem',
                                color: 'var(--accent-color)'
                            }}>
                                {item.title}
                            </h4>
                            <p style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                margin: 0
                            }}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ExpressiveTypography;
