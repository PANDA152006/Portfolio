import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const InteractiveParticles = () => {
    const particlesRef = useRef();
    const mouseRef = useRef({ x: 0, y: 0 });
    const { viewport } = useThree();

    // Create particle geometry
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20;
        const z = (Math.random() - 0.5) * 20;

        positions[i] = x;
        positions[i + 1] = y;
        positions[i + 2] = z;

        originalPositions[i] = x;
        originalPositions[i + 1] = y;
        originalPositions[i + 2] = z;
    }

    // Track mouse position
    const handleMouseMove = (event) => {
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Add event listener
    if (typeof window !== 'undefined') {
        window.addEventListener('mousemove', handleMouseMove);
    }

    useFrame(() => {
        if (!particlesRef.current) return;

        const positions = particlesRef.current.geometry.attributes.position.array;
        const mouseX = mouseRef.current.x * viewport.width / 2;
        const mouseY = mouseRef.current.y * viewport.height / 2;

        for (let i = 0; i < particleCount * 3; i += 3) {
            const px = positions[i];
            const py = positions[i + 1];

            // Calculate distance from mouse
            const dx = mouseX - px;
            const dy = mouseY - py;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Push particles away from cursor
            const force = Math.max(0, 3 - distance);
            if (force > 0) {
                positions[i] -= (dx / distance) * force * 0.05;
                positions[i + 1] -= (dy / distance) * force * 0.05;
            }

            // Smoothly return to original position
            positions[i] += (originalPositions[i] - positions[i]) * 0.05;
            positions[i + 1] += (originalPositions[i + 1] - positions[i + 1]) * 0.05;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#E85D04"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

export default InteractiveParticles;
