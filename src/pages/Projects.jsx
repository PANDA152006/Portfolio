import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Github, Play, X } from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import VideoPlayer from '../components/VideoPlayer';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [hoveredProject, setHoveredProject] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            id: 1,
            title: 'book.food',
            category: 'Web',
            mediaType: 'image',
            thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&q=80',
            description: 'A comprehensive platform for booking food experiences with real-time reservations.',
            tech: ['Vanilla JS', 'Python', 'MongoDB'],
            link: 'https://bhook.food/',
            github: '#',
            color: '#7c3aed'
        },
        {
            id: 2,
            title: 'Cinematic Showreel 2026',
            category: 'Film',
            mediaType: 'video',
            mediaUrl: 'YOUR_CLOUDINARY_VIDEO_URL_HERE', // Replace with actual Cloudinary URL
            thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&h=400&fit=crop&q=80',
            description: 'Collection of cinematic videos showcasing storytelling and visual effects.',
            tech: ['Premiere Pro', 'After Effects', 'Color Grading'],
            link: '#',
            color: '#ec4899'
        },
        {
            id: 3,
            title: 'Afro Shit - Beat',
            category: 'Music',
            mediaType: 'audio',
            mediaUrl: 'https://res.cloudinary.com/dpc4ies0f/video/upload/v1770969023/afro_shit-1_fqqcem.wav', // Replace with actual Cloudinary URL
            artist: 'Panda',
            thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop&q=80',
            description: 'Original composition blending lo-fi and ambient elements.',
            tech: ['FL Studio', 'Mixing', 'Mastering'],
            link: '#',
            color: '#f59e0b'
        },
        {
            id: 4,
            title: 'VFX Motion Graphics',
            category: 'VFX',
            mediaType: 'video',
            mediaUrl: 'YOUR_CLOUDINARY_VIDEO_URL_HERE', // Replace with actual Cloudinary URL
            thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop&q=80',
            description: 'Motion graphics and visual effects projects exploring creative techniques.',
            tech: ['After Effects', 'Cinema 4D', 'Blender'],
            link: '#',
            color: '#10b981'
        }
    ];

    const categories = ['All', 'Web', 'Film', 'Music', 'VFX'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="page projects" style={{ padding: '120px 20px 60px' }}>
            <motion.div
                style={{ maxWidth: '1200px', margin: '0 auto' }}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Header */}
                <motion.h2
                    variants={cardVariants}
                    style={{ fontSize: '3.5rem', marginBottom: '1rem', textAlign: 'center' }}
                >
                    Projects
                </motion.h2>
                <motion.p
                    variants={cardVariants}
                    style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}
                >
                    Explore my work across development, film, music, and visual effects
                </motion.p>

                {/* Filter Buttons */}
                <motion.div
                    variants={cardVariants}
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        marginBottom: '3rem',
                        flexWrap: 'wrap'
                    }}
                >
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '0.7rem 1.5rem',
                                background: filter === cat ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                                color: 'white',
                                border: `1px solid ${filter === cat ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)'}`,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                fontSize: '0.95rem'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '2rem'
                    }}
                >
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            whileHover={{ y: -10 }}
                            onHoverStart={() => setHoveredProject(project.id)}
                            onHoverEnd={() => setHoveredProject(null)}
                            onClick={() => setSelectedProject(project)}
                            style={{
                                background: hoveredProject === project.id
                                    ? `linear-gradient(135deg, ${project.color}22 0%, rgba(255,255,255,0.05) 100%)`
                                    : 'rgba(255,255,255,0.03)',
                                padding: '0',
                                borderRadius: '15px',
                                border: `1px solid ${hoveredProject === project.id ? project.color : 'rgba(255,255,255,0.1)'}`,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Thumbnail */}
                            <div style={{
                                width: '100%',
                                height: '200px',
                                backgroundImage: `url(${project.thumbnail})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative'
                            }}>
                                {/* Play button for media */}
                                {(project.mediaType === 'video' || project.mediaType === 'audio') && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        background: 'rgba(0,0,0,0.7)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <Play size={30} color={project.color} />
                                    </div>
                                )}

                                {/* Category Badge */}
                                <span style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    padding: '0.4rem 0.8rem',
                                    background: project.color,
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                }}>
                                    {project.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '0.8rem',
                                    color: hoveredProject === project.id ? project.color : 'white',
                                    transition: 'color 0.3s ease'
                                }}>
                                    {project.title}
                                </h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    marginBottom: '1.2rem',
                                    lineHeight: '1.6',
                                    fontSize: '0.95rem'
                                }}>
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    flexWrap: 'wrap',
                                    marginBottom: '1rem'
                                }}>
                                    {project.tech.map(tech => (
                                        <span key={tech} style={{
                                            padding: '0.4rem 0.8rem',
                                            background: 'rgba(124, 58, 237, 0.2)',
                                            borderRadius: '6px',
                                            fontSize: '0.8rem',
                                            color: '#a78bfa'
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: project.color,
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                                fontWeight: '600'
                                            }}
                                        >
                                            <ExternalLink size={16} />
                                            View
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                color: 'var(--text-secondary)',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                                fontWeight: '600'
                                            }}
                                        >
                                            <Github size={16} />
                                            Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Media Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.9)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: '900px',
                                width: '100%',
                                background: 'rgba(13,13,13,0.95)',
                                borderRadius: '20px',
                                padding: '2rem',
                                border: `2px solid ${selectedProject.color}`,
                                position: 'relative'
                            }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <X size={24} color="white" />
                            </button>

                            {/* Project Title */}
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: selectedProject.color }}>
                                {selectedProject.title}
                            </h2>

                            {/* Media Player */}
                            {selectedProject.mediaType === 'video' && selectedProject.mediaUrl && (
                                <VideoPlayer
                                    src={selectedProject.mediaUrl}
                                    poster={selectedProject.thumbnail}
                                />
                            )}
                            {selectedProject.mediaType === 'audio' && selectedProject.mediaUrl && (
                                <AudioPlayer
                                    src={selectedProject.mediaUrl}
                                    title={selectedProject.title}
                                    artist={selectedProject.artist || 'Yash Dutt Sharma'}
                                />
                            )}
                            {selectedProject.mediaType === 'image' && (
                                <img
                                    src={selectedProject.thumbnail}
                                    alt={selectedProject.title}
                                    style={{
                                        width: '100%',
                                        borderRadius: '12px',
                                        marginBottom: '1.5rem'
                                    }}
                                />
                            )}

                            {/* Description */}
                            <p style={{
                                color: 'var(--text-secondary)',
                                marginTop: '1.5rem',
                                fontSize: '1.1rem',
                                lineHeight: '1.7'
                            }}>
                                {selectedProject.description}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Projects;
