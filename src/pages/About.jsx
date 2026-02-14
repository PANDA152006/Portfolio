import { motion } from 'framer-motion';
import { useState } from 'react';
import { Music, Film, Code, Camera } from 'lucide-react';

const About = () => {
    const [activeSkill, setActiveSkill] = useState(null);

    const skills = [
        { name: 'Web Development', icon: Code, color: '#7c3aed', description: 'React, Python' },
        { name: 'Music Production', icon: Music, color: '#ec4899', description: 'FL Studio' },
        { name: 'Filmmaking', icon: Film, color: '#f59e0b', description: 'Cinematography, Editing' },
        { name: 'VFX & Animation', icon: Camera, color: '#10b981', description: 'Motion Graphics, After Effects' }
    ];

    const timeline = [
        { year: '2026- Present', title: 'B.Tech CSE', org: 'UPES Dehradun', desc: '2nd Year Student' },
        { year: '2024', title: 'High School', org: 'S.R.D.A.V Public School', desc: 'Science Stream' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="page about" style={{ padding: '120px 20px 60px' }}>
            <motion.div
                style={{ maxWidth: '1200px', margin: '0 auto' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.h2
                    variants={itemVariants}
                    style={{ fontSize: '3.5rem', marginBottom: '1rem', textAlign: 'center' }}
                >
                    About Me
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem' }}
                >
                    I'm a B.Tech CSE student at UPES Dehradun, passionate about blending technology with creativity.
                </motion.p>

                {/* Skills Grid */}
                <motion.div variants={itemVariants}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>What I Do</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '4rem'
                    }}>
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                onHoverStart={() => setActiveSkill(index)}
                                onHoverEnd={() => setActiveSkill(null)}
                                style={{
                                    background: activeSkill === index
                                        ? `linear-gradient(135deg, ${skill.color}22 0%, rgba(255,255,255,0.05) 100%)`
                                        : 'rgba(255,255,255,0.03)',
                                    padding: '2rem',
                                    borderRadius: '15px',
                                    border: `1px solid ${activeSkill === index ? skill.color : 'rgba(255,255,255,0.1)'}`,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <skill.icon
                                    size={40}
                                    color={skill.color}
                                    style={{ marginBottom: '1rem' }}
                                />
                                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: skill.color }}>{skill.name}</h4>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{skill.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Timeline */}
                <motion.div variants={itemVariants}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Journey</h3>
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    marginBottom: '1rem',
                                    borderLeft: '4px solid var(--accent-color)'
                                }}
                            >
                                <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{item.year}</p>
                                <h4 style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{item.title}</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{item.org} • {item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Hobbies */}
                <motion.div variants={itemVariants} style={{ marginTop: '4rem' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Beyond Code</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        textAlign: 'center'
                    }}>
                        {['Making Music', 'Cinematic Videos', 'Short Films', 'VFX & Animation'].map((hobby, index) => (
                            <motion.div
                                key={hobby}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    padding: '1.5rem',
                                    background: 'rgba(124, 58, 237, 0.1)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(124, 58, 237, 0.3)'
                                }}
                            >
                                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>{hobby}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default About;
