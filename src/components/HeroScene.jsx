import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Sparkles, useScroll } from '@react-three/drei';

const HeroScene = () => {
    const meshRef = useRef();
    const scroll = useScroll();

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();

            // Base rotation
            meshRef.current.rotation.x = time * 0.2;
            meshRef.current.rotation.y = time * 0.3;

            // Mouse interaction
            const pointerX = state.pointer.x;
            const pointerY = state.pointer.y;
            meshRef.current.rotation.x += pointerY * 0.5; // Tilt up/down
            meshRef.current.rotation.y += pointerX * 0.5; // Rotate left/right

            // Scroll interaction
            if (scroll) {
                const offset = scroll.offset;
                meshRef.current.rotation.x += offset * Math.PI;
                meshRef.current.position.y = -offset * 2;
                meshRef.current.scale.setScalar(2 - offset * 0.5);
            }
        }
    });

    return (
        <group>
            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                <mesh ref={meshRef} scale={2}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <MeshDistortMaterial
                        color="#200e4a"
                        envMapIntensity={1}
                        clearcoat={1}
                        clearcoatRoughness={0}
                        metalness={0.9}
                        roughness={0.1}
                        distort={0.4} // Strength of distortion
                        speed={2} // Speed of distortion
                    />
                </mesh>
            </Float>

            {/* Environment for reflections */}
            <Environment preset="city" />

            {/* Floating particles for depth */}
            <Sparkles
                count={200}
                scale={12}
                size={2}
                speed={0.4}
                opacity={0.5}
                color="#7c3aed"
            />
        </group>
    );
};

export default HeroScene;
