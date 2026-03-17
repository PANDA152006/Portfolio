import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Float } from '@react-three/drei';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────
   Shape geometries
───────────────────────────────────────── */
const SHAPES = [
    { name: 'Torus Knot', value: 'torusKnot', icon: '∞', desc: 'A knot wound around a torus' },
    { name: 'Dodecahedron', value: 'dodecahedron', icon: '⬡', desc: '12 pentagonal faces' },
    { name: 'Icosahedron', value: 'icosahedron', icon: '△', desc: '20 equilateral triangles' },
    { name: 'Sphere', value: 'sphere', icon: '○', desc: 'The perfect 3D shape' },
    { name: 'Torus', value: 'torus', icon: '◎', desc: "A donut-shaped surface" },
    { name: 'Cube', value: 'box', icon: '□', desc: '6 faces, 8 vertices' },
    { name: 'Cone', value: 'cone', icon: '△', desc: 'A pointed summit' },
    { name: 'Octahedron', value: 'octahedron', icon: '◇', desc: '8 equilateral triangles' },
    { name: 'Cylinder', value: 'cylinder', icon: '⬜', desc: 'Two circular bases' },
];

const COLORS = [
    { name: 'Gold', value: '#C6A15B' },
    { name: 'Indigo', value: '#4f46e5' },
    { name: 'Burgundy', value: '#8A1424' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'White', value: '#f8fafc' },
];

const ENVS = [
    { name: 'City', value: 'city' },
    { name: 'Sunset', value: 'sunset' },
    { name: 'Dawn', value: 'dawn' },
    { name: 'Night', value: 'night' },
    { name: 'Forest', value: 'forest' },
    { name: 'Studio', value: 'studio' },
];

/* ─────────────────────────────────────────
   3-D Mesh
───────────────────────────────────────── */
const InteractiveShape = ({ shape, color, wireframe, metalness, roughness }) => {
    const geo = {
        box: <boxGeometry args={[2, 2, 2]} />,
        sphere: <sphereGeometry args={[1.3, 64, 64]} />,
        torus: <torusGeometry args={[1, 0.38, 32, 100]} />,
        cone: <coneGeometry args={[1.1, 2.2, 64]} />,
        dodecahedron: <dodecahedronGeometry args={[1.3]} />,
        torusKnot: <torusKnotGeometry args={[0.8, 0.28, 200, 32]} />,
        icosahedron: <icosahedronGeometry args={[1.3, 0]} />,
        octahedron: <octahedronGeometry args={[1.4, 0]} />,
        cylinder: <cylinderGeometry args={[1, 1, 2.2, 64]} />,
    };

    return (
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
            <mesh castShadow>
                {geo[shape]}
                <meshStandardMaterial
                    color={color}
                    metalness={metalness}
                    roughness={roughness}
                    emissive={color}
                    emissiveIntensity={wireframe ? 0 : 0.15}
                    wireframe={wireframe}
                />
            </mesh>
        </Float>
    );
};

/* ─────────────────────────────────────────
   Scene
───────────────────────────────────────── */
const Scene3D = ({ shape, color, wireframe, metalness, roughness, env, autoRotate, rotateSpeed }) => (
    <>
        <color attach="background" args={['#080810']} />
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[-8, -8, -4]} intensity={0.6} color={color} />
        <pointLight position={[8, -4, 4]} intensity={0.4} color="#C6A15B" />

        <Suspense fallback={null}>
            <InteractiveShape
                shape={shape}
                color={color}
                wireframe={wireframe}
                metalness={metalness}
                roughness={roughness}
            />
            <Environment preset={env} />
        </Suspense>

        <EffectComposer>
            <Bloom luminanceThreshold={0.25} luminanceSmoothing={0.9} intensity={0.8} />
            <ChromaticAberration
                offset={new Vector2(0.0005, 0.0005)}
                radialModulation={false}
                modulationOffset={0}
            />
        </EffectComposer>

        <OrbitControls
            enableZoom
            enablePan={false}
            maxDistance={12}
            minDistance={3}
            autoRotate={autoRotate}
            autoRotateSpeed={rotateSpeed}
        />
    </>
);

/* ─────────────────────────────────────────
   Slider component
───────────────────────────────────────── */
const Slider = ({ label, value, min, max, step, onChange }) => (
    <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {label}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-color)', fontWeight: '600' }}>
                {value.toFixed(2)}
            </span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={e => onChange(parseFloat(e.target.value))}
            style={{
                width: '100%',
                appearance: 'none',
                height: '4px',
                borderRadius: '2px',
                background: `linear-gradient(to right, var(--accent-color) ${value * 100}%, rgba(255,255,255,0.12) ${value * 100}%)`,
                outline: 'none',
                cursor: 'pointer',
            }}
        />
    </div>
);

/* ─────────────────────────────────────────
   Section heading inside panel
───────────────────────────────────────── */
const SectionLabel = ({ children }) => (
    <p style={{
        fontSize: '0.7rem',
        fontWeight: '700',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
        margin: '1.2rem 0 0.6rem',
    }}>
        {children}
    </p>
);

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
const Playground = () => {
    const [shapeIdx, setShapeIdx] = useState(0);
    const [colorIdx, setColorIdx] = useState(0);
    const [envIdx, setEnvIdx] = useState(0);
    const [wireframe, setWireframe] = useState(false);
    const [autoRotate, setAutoRotate] = useState(true);
    const [rotateSpeed, setRotateSpeed] = useState(2);
    const [metalness, setMetalness] = useState(0.75);
    const [roughness, setRoughness] = useState(0.2);
    const [panelOpen, setPanelOpen] = useState(true);

    const currentShape = SHAPES[shapeIdx];
    const currentColor = COLORS[colorIdx];
    const currentEnv = ENVS[envIdx];

    const prevShape = useCallback(() => setShapeIdx(i => (i - 1 + SHAPES.length) % SHAPES.length), []);
    const nextShape = useCallback(() => setShapeIdx(i => (i + 1) % SHAPES.length), []);

    /* Keyboard navigation */
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') prevShape();
            if (e.key === 'ArrowRight') nextShape();
            if (e.key === 'w' || e.key === 'W') setWireframe(v => !v);
            if (e.key === 'r' || e.key === 'R') setAutoRotate(v => !v);
            if (e.key === ' ') setPanelOpen(v => !v);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [prevShape, nextShape]);

    return (
        <div style={{
            padding: 0,
            height: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Full-screen 3-D Canvas */}
            <div style={{ position: 'absolute', inset: 0 }}>
                <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }}>
                    <Scene3D
                        shape={currentShape.value}
                        color={currentColor.value}
                        wireframe={wireframe}
                        metalness={metalness}
                        roughness={roughness}
                        env={currentEnv.value}
                        autoRotate={autoRotate}
                        rotateSpeed={rotateSpeed}
                    />
                </Canvas>
            </div>

            {/* ── Floating Header ── */}
            <motion.div
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    top: '88px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    textAlign: 'center',
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            >
                <h2 style={{
                    fontSize: '2.2rem',
                    marginBottom: '0.25rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.55) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: 'none',
                    letterSpacing: '-0.02em',
                }}>
                    Playground
                </h2>
                <p style={{
                    color: 'rgba(255,255,255,0.38)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    margin: 0,
                }}>
                    Drag · Scroll · ← → keys to cycle shapes
                </p>
            </motion.div>

            {/* ── Side Panel ── */}
            <AnimatePresence>
                {panelOpen && (
                    <motion.div
                        key="panel"
                        initial={{ x: -320, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -320, opacity: 0 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                        style={{
                            position: 'absolute',
                            left: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 100,
                            background: 'rgba(8, 8, 18, 0.88)',
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            padding: '1.4rem',
                            borderRadius: '20px',
                            border: '1px solid rgba(255,255,255,0.09)',
                            width: '252px',
                            maxHeight: 'calc(100vh - 160px)',
                            overflowY: 'auto',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
                            scrollbarWidth: 'none',
                        }}
                    >
                        {/* Shape picker */}
                        <SectionLabel>Shape</SectionLabel>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            {SHAPES.map((s, i) => (
                                <button
                                    key={s.value}
                                    onClick={() => setShapeIdx(i)}
                                    style={{
                                        padding: '0.55rem 0.8rem',
                                        background: shapeIdx === i
                                            ? `linear-gradient(135deg, ${currentColor.value}33, ${currentColor.value}18)`
                                            : 'rgba(255,255,255,0.03)',
                                        border: `1px solid ${shapeIdx === i ? currentColor.value + '66' : 'rgba(255,255,255,0.07)'}`,
                                        borderRadius: '10px',
                                        color: shapeIdx === i ? '#fff' : 'rgba(255,255,255,0.5)',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem',
                                        fontWeight: shapeIdx === i ? 600 : 400,
                                        transition: 'all 0.2s ease',
                                        textAlign: 'left',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.6rem',
                                        fontFamily: 'inherit',
                                    }}
                                >
                                    <span style={{ fontSize: '0.95rem', opacity: 0.8 }}>{s.icon}</span>
                                    {s.name}
                                </button>
                            ))}
                        </div>

                        {/* Color picker */}
                        <SectionLabel>Color</SectionLabel>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                            {COLORS.map((c, i) => (
                                <button
                                    key={c.value}
                                    onClick={() => setColorIdx(i)}
                                    title={c.name}
                                    style={{
                                        width: '100%',
                                        aspectRatio: '1',
                                        background: c.value,
                                        border: colorIdx === i ? '2.5px solid white' : '1px solid rgba(255,255,255,0.15)',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        transform: colorIdx === i ? 'scale(1.1)' : 'scale(1)',
                                        boxShadow: colorIdx === i ? `0 0 14px ${c.value}99` : 'none',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Environment preset */}
                        <SectionLabel>Environment</SectionLabel>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                            {ENVS.map((e, i) => (
                                <button
                                    key={e.value}
                                    onClick={() => setEnvIdx(i)}
                                    style={{
                                        padding: '0.45rem',
                                        background: envIdx === i ? `${currentColor.value}28` : 'rgba(255,255,255,0.03)',
                                        border: `1px solid ${envIdx === i ? currentColor.value + '55' : 'rgba(255,255,255,0.07)'}`,
                                        borderRadius: '8px',
                                        color: envIdx === i ? '#fff' : 'rgba(255,255,255,0.45)',
                                        cursor: 'pointer',
                                        fontSize: '0.78rem',
                                        fontWeight: envIdx === i ? 600 : 400,
                                        transition: 'all 0.2s ease',
                                        fontFamily: 'inherit',
                                    }}
                                >
                                    {e.name}
                                </button>
                            ))}
                        </div>

                        {/* Material */}
                        <SectionLabel>Material</SectionLabel>
                        <Slider label="Metalness" value={metalness} min={0} max={1} step={0.01} onChange={setMetalness} />
                        <Slider label="Roughness" value={roughness} min={0} max={1} step={0.01} onChange={setRoughness} />

                        {/* Motion */}
                        <SectionLabel>Motion</SectionLabel>
                        <Slider label="Rotate Speed" value={rotateSpeed} min={0.5} max={8} step={0.1} onChange={setRotateSpeed} />

                        {/* Toggles */}
                        <SectionLabel>Options</SectionLabel>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {[
                                { label: 'Wireframe', state: wireframe, toggle: () => setWireframe(v => !v) },
                                { label: 'Auto-spin', state: autoRotate, toggle: () => setAutoRotate(v => !v) },
                            ].map(({ label, state, toggle }) => (
                                <button
                                    key={label}
                                    onClick={toggle}
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem 0.4rem',
                                        background: state ? `${currentColor.value}33` : 'rgba(255,255,255,0.04)',
                                        border: `1px solid ${state ? currentColor.value + '66' : 'rgba(255,255,255,0.08)'}`,
                                        borderRadius: '10px',
                                        color: state ? '#fff' : 'rgba(255,255,255,0.4)',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        transition: 'all 0.2s ease',
                                        fontFamily: 'inherit',
                                        letterSpacing: '0.02em',
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Panel Toggle ── */}
            <motion.button
                animate={{ left: panelOpen ? '290px' : '20px' }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                onClick={() => setPanelOpen(v => !v)}
                style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 101,
                    background: 'rgba(8, 8, 18, 0.88)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    width: '36px',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                    color: 'white',
                    transition: 'background 0.2s',
                }}
            >
                {panelOpen
                    ? <ChevronLeft size={18} />
                    : <ChevronRight size={18} />
                }
            </motion.button>

            {/* ── Bottom HUD ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                }}
            >
                {/* Prev */}
                <button
                    onClick={prevShape}
                    style={{
                        background: 'rgba(8,8,18,0.85)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'white',
                        transition: 'background 0.2s',
                    }}
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Info pill */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentShape.value + currentColor.value}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            background: 'rgba(8,8,18,0.88)',
                            backdropFilter: 'blur(20px)',
                            padding: '0.7rem 1.6rem',
                            borderRadius: '30px',
                            border: `1px solid ${currentColor.value}44`,
                            boxShadow: `0 0 20px ${currentColor.value}22`,
                            textAlign: 'center',
                            minWidth: '220px',
                        }}
                    >
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                            {currentShape.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.38)', marginTop: '0.15rem', letterSpacing: '0.02em' }}>
                            {currentShape.desc}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Next */}
                <button
                    onClick={nextShape}
                    style={{
                        background: 'rgba(8,8,18,0.85)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'white',
                        transition: 'background 0.2s',
                    }}
                >
                    <ChevronRight size={18} />
                </button>
            </motion.div>

            {/* ── Keyboard Shortcuts hint (top-right) ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{
                    position: 'absolute',
                    top: '88px',
                    right: '24px',
                    zIndex: 10,
                    background: 'rgba(8,8,18,0.7)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '0.7rem 1rem',
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.3)',
                    lineHeight: 1.8,
                    letterSpacing: '0.04em',
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            >
                <div><kbd style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>←→</kbd> Cycle shapes</div>
                <div><kbd style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>W</kbd>  Wireframe</div>
                <div><kbd style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>R</kbd>  Auto-rotate</div>
                <div><kbd style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>Space</kbd> Toggle panel</div>
            </motion.div>

            {/* ── Slider styles (global, injected once) ── */}
            <style>{`
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 13px;
                    height: 13px;
                    border-radius: 50%;
                    background: #fff;
                    cursor: pointer;
                    box-shadow: 0 0 6px rgba(0,0,0,0.5);
                    transition: transform 0.15s ease;
                }
                input[type=range]::-webkit-slider-thumb:hover {
                    transform: scale(1.25);
                }
            `}</style>
        </div>
    );
};

export default Playground;
