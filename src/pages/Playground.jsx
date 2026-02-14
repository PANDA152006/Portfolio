import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Float } from '@react-three/drei';
import { useState, useRef } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ChevronLeft, ChevronRight } from 'lucide-react';


// Simplified monkey head using icosahedron (similar to Suzanne's base shape)
const SuzanneMonkey = ({ color }) => {
    return (
        <mesh>
            <icosahedronGeometry args={[1.2, 1]} />
            <meshStandardMaterial
                color={color}
                metalness={0.8}
                roughness={0.2}
                emissive={color}
                emissiveIntensity={0.2}
                wireframe={false}
            />
        </mesh>
    );
};


const InteractiveShape = ({ shape, color, position }) => {
    const meshRef = useRef();

    const shapes = {
        box: <boxGeometry args={[2, 2, 2]} />,
        sphere: <sphereGeometry args={[1.2, 32, 32]} />,
        torus: <torusGeometry args={[1, 0.4, 16, 100]} />,
        cone: <coneGeometry args={[1, 2, 32]} />,
        dodecahedron: <dodecahedronGeometry args={[1.2]} />,
        torusKnot: <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />,
        monkey: null // Special handling for monkey
    };

    // Handle Suzanne monkey separately
    if (shape === 'monkey') {
        return (
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <SuzanneMonkey color={color} />
            </Float>
        );
    }

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={position}>
                {shapes[shape]}
                <meshStandardMaterial
                    color={color}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
};


const Scene3D = ({ currentShape, currentColor }) => {
    return (
        <>
            <color attach="background" args={['#0a0a0a']} />
            <PerspectiveCamera makeDefault position={[0, 0, 6]} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7c3aed" />

            <InteractiveShape shape={currentShape} color={currentColor} position={[0, 0, 0]} />

            <Environment preset="city" />

            <EffectComposer>
                <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.5} />
            </EffectComposer>

            <OrbitControls
                enableZoom={true}
                enablePan={false}
                maxDistance={10}
                minDistance={3}
                autoRotate
                autoRotateSpeed={2}
            />
        </>
    );
};

const Playground = () => {
    const [currentShape, setCurrentShape] = useState('dodecahedron');
    const [currentColor, setCurrentColor] = useState('#7c3aed');
    const [controlsOpen, setControlsOpen] = useState(true);

    const shapes = [
        { name: 'Suzanne 🐵', value: 'monkey' },
        { name: 'Dodecahedron', value: 'dodecahedron' },
        { name: 'Torus Knot', value: 'torusKnot' },
        { name: 'Sphere', value: 'sphere' },
        { name: 'Torus', value: 'torus' },
        { name: 'Cube', value: 'box' },
        { name: 'Cone', value: 'cone' }
    ];

    const colors = [
        { name: 'Violet', value: '#7c3aed' },
        { name: 'Pink', value: '#ec4899' },
        { name: 'Orange', value: '#f59e0b' },
        { name: 'Green', value: '#10b981' },
        { name: 'Blue', value: '#3b82f6' },
        { name: 'Red', value: '#ef4444' }
    ];

    return (
        <div className="page playground" style={{
            padding: 0,
            height: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Floating Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'absolute',
                    top: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    textAlign: 'center',
                    pointerEvents: 'none'
                }}
            >
                <h2 style={{
                    fontSize: '2.5rem',
                    marginBottom: '0.3rem',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                    Playground
                </h2>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1rem',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                    Drag to rotate • Scroll to zoom
                </p>
            </motion.div>

            {/* 3D Canvas - Full Screen */}
            <div style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0
            }}>
                <Canvas>
                    <Scene3D currentShape={currentShape} currentColor={currentColor} />
                </Canvas>
            </div>

            {/* Floating Controls Panel */}
            <AnimatePresence>
                {controlsOpen && (
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: 'spring', damping: 20 }}
                        style={{
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 100,
                            background: 'rgba(13, 13, 13, 0.9)',
                            backdropFilter: 'blur(20px)',
                            padding: '1.5rem',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.15)',
                            width: '240px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                        }}
                    >
                        {/* Shape Selector */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{
                                fontSize: '1rem',
                                marginBottom: '0.8rem',
                                color: 'var(--accent-color)',
                                fontWeight: '600'
                            }}>
                                Shape
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                {shapes.map(shape => (
                                    <button
                                        key={shape.value}
                                        onClick={() => setCurrentShape(shape.value)}
                                        style={{
                                            padding: '0.6rem',
                                            background: currentShape === shape.value
                                                ? 'var(--accent-color)'
                                                : 'rgba(255,255,255,0.05)',
                                            border: `1px solid ${currentShape === shape.value
                                                ? 'var(--accent-color)'
                                                : 'rgba(255,255,255,0.1)'}`,
                                            borderRadius: '8px',
                                            color: 'white',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            fontWeight: currentShape === shape.value ? '600' : '400',
                                            transition: 'all 0.3s ease',
                                            textAlign: 'left'
                                        }}
                                    >
                                        {shape.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selector */}
                        <div>
                            <h3 style={{
                                fontSize: '1rem',
                                marginBottom: '0.8rem',
                                color: 'var(--accent-color)',
                                fontWeight: '600'
                            }}>
                                Color
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                                {colors.map(color => (
                                    <button
                                        key={color.value}
                                        onClick={() => setCurrentColor(color.value)}
                                        style={{
                                            width: '100%',
                                            aspectRatio: '1',
                                            background: color.value,
                                            border: currentColor === color.value
                                                ? '3px solid white'
                                                : '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            transform: currentColor === color.value ? 'scale(1.05)' : 'scale(1)',
                                            boxShadow: currentColor === color.value ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'
                                        }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => setControlsOpen(!controlsOpen)}
                style={{
                    position: 'absolute',
                    left: controlsOpen ? '280px' : '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 101,
                    background: 'rgba(13, 13, 13, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    width: '40px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
            >
                {controlsOpen ? <ChevronLeft size={20} color="white" /> : <ChevronRight size={20} color="white" />}
            </button>

            {/* Current Selection Display - Bottom Center */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(20px)',
                    padding: '0.8rem 1.8rem',
                    borderRadius: '30px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    zIndex: 10,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                }}
            >
                <span style={{ fontSize: '0.95rem', color: 'white', fontWeight: '500' }}>
                    {shapes.find(s => s.value === currentShape)?.name} •
                    <span style={{ color: currentColor, marginLeft: '0.5rem', fontWeight: '600' }}>
                        {colors.find(c => c.value === currentColor)?.name}
                    </span>
                </span>
            </motion.div>
        </div>
    );
};

export default Playground;
