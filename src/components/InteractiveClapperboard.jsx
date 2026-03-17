import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useCursor } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveClapperboard = () => {
    const groupRef = useRef();
    const stickRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    // Target rotation for the stick
    const stickTargetRot = clicked ? 0 : 0.4;
    
    useCursor(hovered);

    useFrame((state, delta) => {
        if (!groupRef.current || !stickRef.current) return;

        // Make the entire clapperboard gently follow the mouse
        const pointerX = state.pointer.x * 0.3;
        const pointerY = state.pointer.y * 0.3;
        
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y, 
            pointerX, 
            0.1
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x, 
            -pointerY, 
            0.1
        );

        // Snap the stick down when clicked
        stickRef.current.rotation.z = THREE.MathUtils.lerp(
            stickRef.current.rotation.z,
            stickTargetRot,
            0.3
        );
    });

    return (
        <group 
            ref={groupRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => {
                setClicked(true);
                setTimeout(() => setClicked(false), 200); // Auto reset snap
            }}
            scale={1.5}
            position={[0.8, 0, 0]}
        >
            {/* Main Board Base */}
            <mesh position={[0, -0.6, 0]}>
                <boxGeometry args={[3.2, 2, 0.1]} />
                <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.2} />
            </mesh>

            {/* Board Stripes */}
            {[-1.3, -0.4, 0.5, 1.4].map((x, i) => (
                <mesh key={`stripe-${i}`} position={[x, 0.5, 0.06]}>
                    <planeGeometry args={[0.4, 0.15]} />
                    <meshBasicMaterial color={i % 2 === 0 ? '#F2F2F2' : '#0B0B0B'} />
                </mesh>
            ))}

            {/* Clapper Stick (Hinged at left) */}
            <group ref={stickRef} position={[-1.6, 0.4, 0]}>
                <mesh position={[1.6, 0.3, 0]}>
                    <boxGeometry args={[3.2, 0.3, 0.1]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.2} />
                </mesh>
                
                {/* Stick Stripes */}
                {[-1.3, -0.4, 0.5, 1.4].map((x, i) => (
                    <mesh key={`stick-stripe-${i}`} position={[x + 1.6, 0.3, 0.06]} rotation={[0, 0, 0.3]}>
                        <planeGeometry args={[0.5, 0.3]} />
                        <meshBasicMaterial color={i % 2 === 0 ? '#F2F2F2' : '#0B0B0B'} />
                    </mesh>
                ))}
            </group>

            {/* Hinge Link */}
            <mesh position={[-1.5, 0.5, 0.08]}>
                <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]} />
                <meshStandardMaterial color="#C6A15B" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Typography */}
            <Text
                position={[-1.35, -0.2, 0.06]}
                fontSize={0.2}
                color="#C6A15B"
                anchorX="left"
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
            >
                DIRECTOR:
            </Text>
            <Text
                position={[0, -0.2, 0.06]}
                fontSize={0.28}
                color="#F2F2F2"
                anchorX="left"
                fontWeight={900}
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhjp-Ek-_EeA.woff"
            >
                PANDA
            </Text>

            <Text
                position={[-1.35, -0.7, 0.06]}
                fontSize={0.15}
                color="#B8B8B8"
                anchorX="left"
            >
                SCENE
            </Text>
            <Text
                position={[-1.35, -1.0, 0.06]}
                fontSize={0.25}
                color="#F2F2F2"
                anchorX="left"
                fontWeight={700}
            >
                01
            </Text>

            <Text
                position={[-0.3, -0.7, 0.06]}
                fontSize={0.15}
                color="#B8B8B8"
                anchorX="left"
            >
                TAKE
            </Text>
            <Text
                position={[-0.3, -1.0, 0.06]}
                fontSize={0.25}
                color="#F2F2F2"
                anchorX="left"
                fontWeight={700}
            >
                V.1
            </Text>

            <Text
                position={[0.55, -0.7, 0.06]}
                fontSize={0.15}
                color="#B8B8B8"
                anchorX="left"
            >
                DATE
            </Text>
            <Text
                position={[0.55, -1.0, 0.06]}
                fontSize={0.18}
                color="#F2F2F2"
                anchorX="left"
                fontWeight={700}
            >
                {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}
            </Text>

        </group>
    );
};

export default InteractiveClapperboard;
