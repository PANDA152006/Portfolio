import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Clock, X, Tag } from 'lucide-react';

const Blog = () => {
    const [filter, setFilter] = useState('All');
    const [hoveredPost, setHoveredPost] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    const blogPosts = [
        {
            id: 1,
            title: 'Building Modern Web Apps with React and Vite',
            category: 'Tech',
            excerpt: 'Exploring the power of Vite for lightning-fast development and how it revolutionizes the React development experience.',
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop&q=80',
            date: '2026-02-15',
            readTime: '5 min read',
            color: '#E85D04',
            content: `
                <h3>Introduction</h3>
                <p>Vite has transformed the way we build React applications. With its instant server start and lightning-fast HMR (Hot Module Replacement), development has never been smoother.</p>
                
                <h3>Why Vite?</h3>
                <p>Unlike traditional bundlers, Vite leverages native ES modules in the browser during development. This means:</p>
                <ul>
                    <li>No bundling required during development</li>
                    <li>Instant server start regardless of app size</li>
                    <li>Lightning-fast HMR that stays fast as your app grows</li>
                    <li>Optimized production builds with Rollup</li>
                </ul>

                <h3>Getting Started</h3>
                <p>Setting up a new React project with Vite is incredibly simple. The developer experience is unmatched, and the performance gains are immediately noticeable.</p>

                <h3>Conclusion</h3>
                <p>If you haven't tried Vite yet, now is the perfect time. The ecosystem is mature, the tooling is excellent, and the community is growing rapidly.</p>
            `
        },
        {
            id: 2,
            title: 'Cinematic Storytelling: Lessons from the Field',
            category: 'Film',
            excerpt: 'Key techniques and insights I\'ve learned while creating cinematic content and visual narratives.',
            thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop&q=80',
            date: '2026-02-10',
            readTime: '7 min read',
            color: '#2563EB',
            content: `
                <h3>The Power of Visual Storytelling</h3>
                <p>Every frame tells a story. In filmmaking, we communicate not just through dialogue, but through composition, lighting, and movement.</p>
                
                <h3>Essential Techniques</h3>
                <p>Here are some fundamental techniques that have shaped my approach:</p>
                <ul>
                    <li><strong>Rule of Thirds:</strong> Creating balanced and engaging compositions</li>
                    <li><strong>Leading Lines:</strong> Guiding the viewer's eye through the frame</li>
                    <li><strong>Color Grading:</strong> Setting the mood and emotional tone</li>
                    <li><strong>Camera Movement:</strong> Adding dynamism and energy to scenes</li>
                </ul>

                <h3>The Editing Process</h3>
                <p>Post-production is where the magic happens. It's where we shape the narrative, control pacing, and create emotional impact.</p>

                <h3>Final Thoughts</h3>
                <p>Filmmaking is a continuous learning journey. Every project teaches something new, and that's what makes it so exciting.</p>
            `
        },
        {
            id: 3,
            title: 'Music Production: From Idea to Final Mix',
            category: 'Music',
            excerpt: 'My workflow for creating beats and producing music, from initial inspiration to the final master.',
            thumbnail: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&h=400&fit=crop&q=80',
            date: '2026-02-05',
            readTime: '6 min read',
            color: '#f59e0b',
            content: `
                <h3>The Creative Process</h3>
                <p>Every track starts with an idea - a melody, a rhythm, or just a feeling. The key is capturing that initial spark before it fades.</p>
                
                <h3>My Production Workflow</h3>
                <p>Here's how I typically approach a new track:</p>
                <ol>
                    <li><strong>Sketching:</strong> Laying down the basic idea in FL Studio</li>
                    <li><strong>Arrangement:</strong> Building the structure and progression</li>
                    <li><strong>Sound Design:</strong> Crafting unique sounds and textures</li>
                    <li><strong>Mixing:</strong> Balancing levels and creating space</li>
                    <li><strong>Mastering:</strong> Final polish and loudness optimization</li>
                </ol>

                <h3>Tools and Techniques</h3>
                <p>FL Studio is my DAW of choice, but the tools matter less than understanding the fundamentals of music theory, sound design, and mixing.</p>

                <h3>Keep Creating</h3>
                <p>The most important thing is to keep making music. Every track you finish teaches you something new.</p>
            `
        },
        {
            id: 4,
            title: 'The Intersection of Code and Creativity',
            category: 'Personal',
            excerpt: 'Reflections on balancing technical skills with creative expression across multiple disciplines.',
            thumbnail: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop&q=80',
            date: '2026-02-01',
            readTime: '4 min read',
            color: '#10b981',
            content: `
                <h3>Finding Balance</h3>
                <p>Being both a developer and a creative has its challenges, but it's also incredibly rewarding. Each discipline informs and enhances the other.</p>
                
                <h3>Code as a Creative Medium</h3>
                <p>Programming isn't just about logic and algorithms. It's a form of creative expression. Building beautiful, functional interfaces is an art form.</p>

                <h3>Cross-Pollination of Skills</h3>
                <p>The problem-solving skills from coding help in music production. The creative thinking from filmmaking enhances my approach to web design. Everything connects.</p>

                <h3>Advice for Multi-Disciplinary Creators</h3>
                <ul>
                    <li>Don't feel pressured to choose just one path</li>
                    <li>Let your different skills complement each other</li>
                    <li>Use technology to enhance your creative work</li>
                    <li>Stay curious and keep learning</li>
                </ul>

                <h3>Moving Forward</h3>
                <p>I'm excited to continue exploring the intersection of technology and creativity, and I hope my journey inspires others to do the same.</p>
            `
        },
        {
            id: 5,
            title: 'Mastering Three.js for Interactive Web Experiences',
            category: 'Tech',
            excerpt: 'Creating immersive 3D experiences on the web using Three.js and React Three Fiber.',
            thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop&q=80',
            date: '2026-01-28',
            readTime: '8 min read',
            color: '#E85D04',
            content: `
                <h3>Why Three.js?</h3>
                <p>Three.js brings the power of WebGL to the masses, making it possible to create stunning 3D graphics that run in the browser.</p>
                
                <h3>React Three Fiber</h3>
                <p>Combining Three.js with React through React Three Fiber creates a powerful development experience. You get the declarative nature of React with the visual power of Three.js.</p>

                <h3>Key Concepts</h3>
                <ul>
                    <li><strong>Scenes:</strong> The container for all 3D objects</li>
                    <li><strong>Cameras:</strong> Defining the viewer's perspective</li>
                    <li><strong>Lights:</strong> Illuminating your 3D world</li>
                    <li><strong>Materials:</strong> How objects appear and reflect light</li>
                    <li><strong>Geometry:</strong> The shape of 3D objects</li>
                </ul>

                <h3>Performance Optimization</h3>
                <p>Creating performant 3D experiences requires careful attention to polygon counts, texture sizes, and render optimization.</p>

                <h3>The Future of Web 3D</h3>
                <p>As browsers and devices become more powerful, 3D web experiences will become increasingly common. Now is the perfect time to learn.</p>
            `
        },
        {
            id: 6,
            title: 'Color Grading Techniques for Emotional Impact',
            category: 'Film',
            excerpt: 'How color grading can transform your footage and evoke specific emotions in your audience.',
            thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop&q=80',
            date: '2026-01-20',
            readTime: '6 min read',
            color: '#2563EB',
            content: `
                <h3>The Psychology of Color</h3>
                <p>Colors evoke emotions. Warm tones create intimacy and nostalgia, while cool tones suggest isolation or tension. Understanding this is key to effective color grading.</p>
                
                <h3>My Grading Workflow</h3>
                <ol>
                    <li><strong>Exposure and Contrast:</strong> Getting the technical foundation right</li>
                    <li><strong>Color Balance:</strong> Correcting any unwanted color casts</li>
                    <li><strong>Creative Grading:</strong> Applying the look that serves the story</li>
                    <li><strong>Secondary Adjustments:</strong> Fine-tuning specific areas</li>
                </ol>

                <h3>Tools I Use</h3>
                <p>DaVinci Resolve is my go-to for color grading. Its node-based workflow offers incredible flexibility and control.</p>

                <h3>Learning Resources</h3>
                <p>Study films you love. Analyze their color palettes. Practice recreating looks. The more you grade, the better you'll understand color.</p>
            `
        },
        {
            id: 7,
            title: 'UI/UX Design Principles for Modern Web Apps',
            category: 'Design',
            excerpt: 'Essential design principles that create intuitive and beautiful user experiences.',
            thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&q=80',
            date: '2026-02-12',
            readTime: '6 min read',
            color: '#06b6d4',
            content: `
                <h3>The Foundation of Great Design</h3>
                <p>Great UI/UX design isn't just about making things look pretty—it's about creating experiences that are intuitive, accessible, and delightful to use.</p>
                
                <h3>Core Principles</h3>
                <ul>
                    <li><strong>Consistency:</strong> Maintain visual and functional consistency throughout your interface</li>
                    <li><strong>Hierarchy:</strong> Guide users through content with clear visual hierarchy</li>
                    <li><strong>Feedback:</strong> Provide immediate feedback for user actions</li>
                    <li><strong>Accessibility:</strong> Design for all users, including those with disabilities</li>
                    <li><strong>Simplicity:</strong> Remove unnecessary complexity and focus on core functionality</li>
                </ul>

                <h3>Design Systems</h3>
                <p>Building a design system ensures consistency and speeds up development. Define your colors, typography, spacing, and component patterns early.</p>

                <h3>User-Centered Approach</h3>
                <p>Always design with your users in mind. Conduct user research, create personas, and test your designs with real users.</p>

                <h3>Continuous Improvement</h3>
                <p>Design is never truly finished. Gather feedback, analyze user behavior, and iterate on your designs to continuously improve the experience.</p>
            `
        },
        {
            id: 8,
            title: 'The Art of Typography in Web Design',
            category: 'Design',
            excerpt: 'How typography choices can make or break your design and create powerful visual communication.',
            thumbnail: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=600&h=400&fit=crop&q=80',
            date: '2026-01-25',
            readTime: '5 min read',
            color: '#06b6d4',
            content: `
                <h3>Typography is Communication</h3>
                <p>Typography is more than just choosing fonts—it's about creating hierarchy, establishing tone, and ensuring readability across all devices.</p>
                
                <h3>Choosing Typefaces</h3>
                <p>When selecting fonts for your project:</p>
                <ul>
                    <li><strong>Readability First:</strong> Choose fonts that are easy to read at various sizes</li>
                    <li><strong>Pair Wisely:</strong> Combine fonts that complement each other (usually 2-3 max)</li>
                    <li><strong>Consider Context:</strong> Match your font choices to your brand personality</li>
                    <li><strong>Web Fonts:</strong> Use services like Google Fonts for reliable, fast-loading typefaces</li>
                </ul>

                <h3>Establishing Hierarchy</h3>
                <p>Use size, weight, and spacing to create clear visual hierarchy. Your headings should guide readers through your content naturally.</p>

                <h3>Responsive Typography</h3>
                <p>Ensure your typography scales well across devices. Use relative units (rem, em) and consider implementing fluid typography with clamp().</p>

                <h3>Details Matter</h3>
                <p>Pay attention to line height, letter spacing, and paragraph width. These small details significantly impact readability and overall aesthetic.</p>
            `
        }
    ];

    const categories = ['All', 'Tech', 'Film', 'Music', 'Design', 'Personal'];

    const filteredPosts = filter === 'All'
        ? blogPosts
        : blogPosts.filter(p => p.category === filter);

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
        <div className="page blog" style={{ padding: '120px 20px 60px' }}>
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
                    Blog
                </motion.h2>
                <motion.p
                    variants={cardVariants}
                    style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}
                >
                    Thoughts on development, filmmaking, music, design, and creativity
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

                {/* Blog Posts Grid */}
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '2rem'
                    }}
                >
                    {filteredPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            layout
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            whileHover={{ y: -10 }}
                            onHoverStart={() => setHoveredPost(post.id)}
                            onHoverEnd={() => setHoveredPost(null)}
                            onClick={() => setSelectedPost(post)}
                            style={{
                                background: hoveredPost === post.id
                                    ? `linear-gradient(135deg, ${post.color}22 0%, rgba(255,255,255,0.05) 100%)`
                                    : 'rgba(255,255,255,0.03)',
                                padding: '0',
                                borderRadius: '15px',
                                border: `1px solid ${hoveredPost === post.id ? post.color : 'rgba(255,255,255,0.1)'}`,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Thumbnail */}
                            <div style={{
                                width: '100%',
                                height: '220px',
                                backgroundImage: `url(${post.thumbnail})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative'
                            }}>
                                {/* Category Badge */}
                                <span style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    padding: '0.4rem 0.8rem',
                                    background: post.color,
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                }}>
                                    <Tag size={12} />
                                    {post.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    marginBottom: '0.8rem',
                                    color: hoveredPost === post.id ? post.color : 'white',
                                    transition: 'color 0.3s ease',
                                    lineHeight: '1.4'
                                }}>
                                    {post.title}
                                </h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    marginBottom: '1.2rem',
                                    lineHeight: '1.6',
                                    fontSize: '0.95rem'
                                }}>
                                    {post.excerpt}
                                </p>

                                {/* Meta Info */}
                                <div style={{
                                    display: 'flex',
                                    gap: '1.5rem',
                                    fontSize: '0.85rem',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Calendar size={14} />
                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Clock size={14} />
                                        {post.readTime}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Blog Post Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPost(null)}
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
                            padding: '2rem',
                            overflowY: 'auto'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                maxWidth: '800px',
                                width: '100%',
                                background: 'rgba(13,13,13,0.95)',
                                borderRadius: '20px',
                                padding: '3rem',
                                border: `2px solid ${selectedPost.color}`,
                                position: 'relative',
                                maxHeight: '90vh',
                                overflowY: 'auto'
                            }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedPost(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
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

                            {/* Category Badge */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.5rem 1rem',
                                background: selectedPost.color,
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                marginBottom: '1.5rem'
                            }}>
                                <Tag size={14} />
                                {selectedPost.category}
                            </div>

                            {/* Title */}
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: selectedPost.color, lineHeight: '1.2' }}>
                                {selectedPost.title}
                            </h2>

                            {/* Meta Info */}
                            <div style={{
                                display: 'flex',
                                gap: '2rem',
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                marginBottom: '2rem',
                                paddingBottom: '1.5rem',
                                borderBottom: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={16} />
                                    {new Date(selectedPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Clock size={16} />
                                    {selectedPost.readTime}
                                </span>
                            </div>

                            {/* Featured Image */}
                            <img
                                src={selectedPost.thumbnail}
                                alt={selectedPost.title}
                                style={{
                                    width: '100%',
                                    borderRadius: '12px',
                                    marginBottom: '2rem'
                                }}
                            />

                            {/* Content */}
                            <div
                                style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: '1.05rem',
                                    lineHeight: '1.8'
                                }}
                                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Blog;
