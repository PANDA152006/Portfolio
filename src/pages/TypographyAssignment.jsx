import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import TypographyAnatomy from '../components/typography/TypographyAnatomy';
import TypefaceGallery from '../components/typography/TypefaceGallery';
import SerifComparison from '../components/typography/SerifComparison';
import FontPsychology from '../components/typography/FontPsychology';
import ExpressiveTypography from '../components/typography/ExpressiveTypography';
import PosterShowcase from '../components/typography/PosterShowcase';
import BrandAnalysis from '../components/typography/BrandAnalysis';

const TypographyAssignment = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    const sections = [
        { id: 'anatomy', title: 'Typography Anatomy', component: TypographyAnatomy, marks: 10 },
        { id: 'classification', title: 'Typeface Classification', component: TypefaceGallery, marks: 10 },
        { id: 'comparison', title: 'Serif vs Sans-serif', component: SerifComparison, marks: 10 },
        { id: 'psychology', title: 'Psychology of Fonts', component: FontPsychology, marks: 10 },
        { id: 'expressive', title: 'Expressive Typography', component: ExpressiveTypography, marks: 20 },
        { id: 'poster', title: 'Typography Poster', component: PosterShowcase, marks: 20 },
        { id: 'brand', title: 'Brand Identity Analysis', component: BrandAnalysis, marks: 20 }
    ];

    const scrollToSection = (index) => {
        const section = document.getElementById(sections[index].id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setMenuOpen(false);
        }
    };

    return (
        <div className="typography-assignment legacy-theme" ref={containerRef}>
            {/* Progress Bar */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #7c3aed, #ec4899, #f59e0b)',
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
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--accent-color)' }}>
                        Typography Assignment
                    </h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Yash Dutt Sharma
                    </span>
                </div>

                {/* Desktop Navigation */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    '@media (max-width: 768px)': { display: 'none' }
                }}>
                    {sections.map((section, index) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(index)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: activeSection === index ? 'var(--accent-color)' : 'transparent',
                                color: 'white',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
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
                                background: activeSection === index ? 'var(--accent-color)' : 'transparent',
                                color: 'white',
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

            {/* Hero Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '800',
                        letterSpacing: '-0.02em'
                    }}>
                        Understanding the<br />Essence of Typography
                    </h1>

                    <p style={{
                        fontSize: '1.3rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        maxWidth: '600px',
                        margin: '0 auto 2rem'
                    }}>
                        An Interactive Journey Through Type
                    </p>


                    <motion.button
                        onClick={() => scrollToSection(0)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '1rem 2.5rem',
                            background: 'var(--accent-color)',
                            border: 'none',
                            borderRadius: '50px',
                            color: 'white',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            margin: '0 auto'
                        }}
                    >
                        Begin Journey
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

            {/* Assignment Sections */}
            {sections.map((section, index) => {
                const Component = section.component;
                return (
                    <section
                        key={section.id}
                        id={section.id}
                        style={{
                            minHeight: '100vh',
                            padding: '120px 20px 60px',
                            position: 'relative'
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6 }}
                            style={{ maxWidth: '1400px', margin: '0 auto' }}
                        >
                            {/* Section Header */}
                            <div style={{
                                marginBottom: '3rem',
                                textAlign: 'center'
                            }}>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '0.5rem 1rem',
                                    background: 'var(--accent-color)',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    marginBottom: '1rem'
                                }}>
                                    Part {index < 4 ? '1' : '2'}.{index < 4 ? index + 1 : index - 3}
                                </span>
                                <h2 style={{
                                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                    marginBottom: '0.5rem'
                                }}>
                                    {section.title}
                                </h2>
                            </div>

                            {/* Component */}
                            <Component />
                        </motion.div>
                    </section>
                );
            })}

            {/* Footer */}
            <footer style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(13, 13, 13, 0.5)'
            }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Created with React, Framer Motion, and Three.js
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Submission Deadline: February 24, 2025
                </p>
            </footer>
        </div>
    );
};

export default TypographyAssignment;
