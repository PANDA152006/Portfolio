import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import ColorWheelInteractive from '../components/colortheory/ColorWheelInteractive';
import SchemeSimulator from '../components/colortheory/SchemeSimulator';
import PaletteGenerator from '../components/colortheory/PaletteGenerator';
import BeforeAfterUI from '../components/colortheory/BeforeAfterUI';

const ColorTheory = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isKidMode, setIsKidMode] = useState(true);
    const [currentPalette, setCurrentPalette] = useState(null);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Sections for the assignment
    const sections = [
        {
            id: 'colors',
            title: isKidMode ? 'The Boss Colors & Magic Hugs' : 'Primary & Secondary Colors',
            kidTitle: 'The Boss Colors & Magic Hugs',
            teacherTitle: 'Primary & Secondary Colors',
            marks: 7
        },
        {
            id: 'schemes',
            title: isKidMode ? 'Color Playground' : 'Color Schemes',
            kidTitle: 'Color Playground',
            teacherTitle: 'Color Schemes',
            marks: 7
        },
        {
            id: 'palette',
            title: isKidMode ? 'Magic Paintbox' : 'Palette Application',
            kidTitle: 'Magic Paintbox',
            teacherTitle: 'Palette Application',
            marks: 10
        },
        {
            id: 'before-after',
            title: isKidMode ? 'Ta-da! My Design' : 'Before & After UI',
            kidTitle: 'Ta-da! My Design',
            teacherTitle: 'Before & After UI',
            marks: 10
        }
    ];

    const scrollToSection = (index) => {
        const section = document.getElementById(sections[index].id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setMenuOpen(false);
            setActiveSection(index);
        }
    };

    return (
        <div className="color-theory-assignment" ref={containerRef}>
            {/* Progress Bar */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
                    transformOrigin: '0%',
                    scaleX: scrollYProgress,
                    zIndex: 1001
                }}
            />

            {/* Sticky Navigation */}
            <nav style={{
                position: 'fixed',
                top: '4px',
                left: 0,
                right: 0,
                background: 'rgba(13, 13, 13, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1rem 2rem',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#8b5cf6' }}>
                        Color Theory Lab
                    </h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'none', '@media (min-width: 640px)': { display: 'inline' } }}>
                        Yash Dutt Sharma
                    </span>
                </div>

                {/* Kid/Teacher Mode Toggle */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '30px',
                    padding: '0.25rem',
                    gap: '0.25rem'
                }}>
                    <button
                        onClick={() => setIsKidMode(true)}
                        style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '20px',
                            border: 'none',
                            background: isKidMode ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : 'transparent',
                            color: isKidMode ? 'white' : 'rgba(255, 255, 255, 0.5)',
                            fontWeight: isKidMode ? '600' : '400',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Kid Mode
                    </button>
                    <button
                        onClick={() => setIsKidMode(false)}
                        style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '20px',
                            border: 'none',
                            background: !isKidMode ? 'linear-gradient(135deg, #3b82f6, #10b981)' : 'transparent',
                            color: !isKidMode ? 'white' : 'rgba(255, 255, 255, 0.5)',
                            fontWeight: !isKidMode ? '600' : '400',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Teacher Mode
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        display: 'none',
                        '@media (max-width: 768px)': { display: 'block' },
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'fixed',
                            top: '70px',
                            left: 0,
                            right: 0,
                            background: 'rgba(13, 13, 13, 0.98)',
                            backdropFilter: 'blur(10px)',
                            padding: '1rem',
                            zIndex: 999,
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        {sections.map((section, index) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(index)}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    padding: '1rem',
                                    background: activeSection === index ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                                    color: activeSection === index ? '#8b5cf6' : 'white',
                                    border: 'none',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    fontSize: '0.95rem'
                                }}
                            >
                                {index + 1}. {section.title}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ marginBottom: '2rem' }}
                    >
                        <span style={{ fontSize: '4rem' }}>🎨✨</span>
                    </motion.div>

                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '800',
                        letterSpacing: '-0.02em',
                        lineHeight: '1.1'
                    }}>
                        {isKidMode ? "Welcome to the\nMagic Color Playground!" : "Color Theory:\nFundamentals & Application"}
                    </h1>

                    <p style={{
                        fontSize: '1.3rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        maxWidth: '600px',
                        margin: '0 auto 2rem',
                        lineHeight: '1.6'
                    }}>
                        {isKidMode
                            ? "Let's learn how colors give each other hugs and form amazing families!"
                            : "An interactive exploration of the color wheel, schemes, and UI application."}
                    </p>

                    <motion.button
                        onClick={() => scrollToSection(0)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '1rem 2.5rem',
                            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                            border: 'none',
                            borderRadius: '50px',
                            color: 'white',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            margin: '0 auto',
                            boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.5)'
                        }}
                    >
                        {isKidMode ? "Let's Play!" : "Start Learning"}
                        <ChevronDown size={20} />
                    </motion.button>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        bottom: '2rem',
                        opacity: 0.5
                    }}
                >
                    <ChevronDown size={32} />
                </motion.div>
            </section>

            {/* Sections Content Area */}
            {/* The individual components will be mapped here */}
            {sections.map((section, index) => (
                <section
                    key={section.id}
                    id={section.id}
                    style={{
                        minHeight: '100vh',
                        padding: '100px 20px 60px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '0.5rem 1.5rem',
                            background: 'rgba(139, 92, 246, 0.1)',
                            color: '#8b5cf6',
                            borderRadius: '30px',
                            fontWeight: 'bold',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            marginBottom: '1rem'
                        }}>
                            Part {index < 2 ? 'A' : 'B'}: {section.marks} Marks
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            margin: 0,
                            background: 'linear-gradient(90deg, #fff, #a78bfa)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            {section.title}
                        </h2>
                    </div>
                    {/* Component Rendering */}
                    <div style={{ width: '100%', maxWidth: '1200px' }}>
                        {section.id === 'colors' && <ColorWheelInteractive isKidMode={isKidMode} />}
                        {section.id === 'schemes' && <SchemeSimulator isKidMode={isKidMode} />}
                        {section.id === 'palette' && <PaletteGenerator isKidMode={isKidMode} onPaletteChange={setCurrentPalette} />}
                        {section.id === 'before-after' && <BeforeAfterUI isKidMode={isKidMode} currentPalette={currentPalette} />}
                        {(!['colors', 'schemes', 'palette', 'before-after'].includes(section.id)) && (
                            <div style={{
                                width: '100%',
                                height: '60vh',
                                background: 'rgba(255,255,255,0.02)',
                                borderRadius: '24px',
                                border: '1px dashed rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'rgba(255,255,255,0.3)',
                                fontSize: '1.2rem'
                            }}>
                                [Interactive {section.title} Component will go here]
                            </div>
                        )}
                    </div>
                </section>
            ))}

            {/* Footer */}
            <footer style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(13, 13, 13, 0.8)'
            }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Assignment: Applications of Color Theory (CSGG2012P)
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Built with React & Framer Motion by YASH
                </p>
            </footer>
        </div>
    );
};

export default ColorTheory;
