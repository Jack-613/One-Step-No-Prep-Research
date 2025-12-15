
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Environment } from '@react-three/drei';
import * as THREE from 'three';

const MaterialParticle = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.1;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.1;
    }
  });

  // Representing filler particles or polymer network nodes
  return (
    <Sphere ref={ref} args={[0.8, 32, 32]} position={position} scale={scale}>
      <meshPhysicalMaterial
        color={color}
        roughness={0.2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        transmission={0.2}
        thickness={1}
      />
    </Sphere>
  );
};

const AbstractBlock = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
       ref.current.rotation.y = t * 0.05;
    }
  });

  return (
    <Box ref={ref} args={[3.5, 3.5, 3.5]} rotation={[0.5, 0.5, 0]}>
      <meshPhysicalMaterial 
        color="#ffffff" 
        transmission={0.6}
        opacity={0.8}
        metalness={0.1}
        roughness={0.1}
        thickness={2}
        transparent
      />
    </Box>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -5, -5]} intensity={0.5} color="#C5A059" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <AbstractBlock />
        </Float>
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           {/* Particles representing the dual network structure */}
           <MaterialParticle position={[-3, 1, 2]} color="#e0e0e0" scale={0.4} />
           <MaterialParticle position={[3, -2, 1]} color="#C5A059" scale={0.5} /> 
           <MaterialParticle position={[2, 3, -2]} color="#ffffff" scale={0.3} />
        </Float>

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export const MaterialStructureScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="city" />
        
        <Float rotationIntensity={0.2} floatIntensity={0.2} speed={1}>
          <group rotation={[0.5, 0.5, 0]}>
            {/* The Ceramic Network (Grid) */}
            <mesh>
                 <boxGeometry args={[3, 3, 3]} />
                 <meshStandardMaterial wireframe color="#cccccc" transparent opacity={0.3} />
            </mesh>
            
            {/* Infiltrated Polymer (Spheres/Nodes) */}
            {[-1, 0, 1].map(x => 
                [-1, 0, 1].map(y => 
                    [-1, 0, 1].map(z => (
                        <Sphere key={`${x}${y}${z}`} args={[0.3, 16, 16]} position={[x, y, z]}>
                            <meshStandardMaterial color={x===0 && y===0 && z===0 ? "#C5A059" : "#ffffff"} roughness={0.4} />
                        </Sphere>
                    ))
                )
            )}
          </group>
        </Float>
      </Canvas>
    </div>
  );
}
