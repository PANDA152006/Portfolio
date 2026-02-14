import { Canvas } from '@react-three/fiber';
import { OrbitControls, ScrollControls } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import HeroScene from './HeroScene';
import ParallaxBackground from './ParallaxBackground';

const GlobalCanvas = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: false }}>
                <Suspense fallback={null}>
                    <color attach="background" args={['#050505']} />

                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />

                    {/* Static Background */}
                    <ParallaxBackground />

                    {/* Scroll Controls wrapper for Hero Scene */}
                    {isHome && (
                        <ScrollControls pages={0} damping={0.1}>
                            <HeroScene />
                        </ScrollControls>
                    )}

                    {/* Post Processing Effects */}
                    <EffectComposer>
                        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                        <Noise opacity={0.02} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>

                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default GlobalCanvas;
