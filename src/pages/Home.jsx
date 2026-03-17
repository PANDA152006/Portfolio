import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import InteractiveClapperboard from '../components/InteractiveClapperboard';

const Home = () => {
    return (
        <div className="page home">
            <div className="content">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ height: '35vh', minHeight: '300px', width: '100%', cursor: 'pointer', zIndex: 10, position: 'relative' }}
                >
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[10, 10, 10]} intensity={2} />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} />
                        <InteractiveClapperboard />
                    </Canvas>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    style={{ fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto' }}
                >
                    Creative Developer, Filmmaker & Musician crafting digital experiences and visual stories.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}
                >
                    <a href="/about" style={{
                        padding: '0.8rem 2rem',
                        background: 'var(--accent-color)',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: 'white',
                        fontWeight: '600',
                        transition: 'transform 0.2s'
                    }}>
                        About Me
                    </a>
                    <a href="/projects" style={{
                        padding: '0.8rem 2rem',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: 'white',
                        fontWeight: '600',
                        border: '1px solid rgba(255,255,255,0.2)',
                        transition: 'transform 0.2s'
                    }}>
                        View Work
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
