'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import StarField from './StarField';

function Moon() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create moon texture
  const moonTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext('2d');
    if (context) {
      // Base color with slight variation
      const baseColor = '#e6e6e6';
      context.fillStyle = baseColor;
      context.fillRect(0, 0, 1024, 1024);

      // Add noise for surface texture
      for (let i = 0; i < 10000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const size = Math.random() * 2;
        context.fillStyle = `rgba(220, 220, 220, ${Math.random() * 0.1})`;
        context.fillRect(x, y, size, size);
      }

      // Add craters with more realistic appearance
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const radius = Math.random() * 30 + 10;
        
        // Crater shadow with gradient
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(180, 180, 180, 0.8)');
        gradient.addColorStop(0.5, 'rgba(200, 200, 200, 0.4)');
        gradient.addColorStop(1, 'rgba(220, 220, 220, 0)');
        
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        
        // Crater rim highlight
        context.strokeStyle = 'rgba(240, 240, 240, 0.3)';
        context.lineWidth = 2;
        context.beginPath();
        context.arc(x, y, radius * 0.8, 0, Math.PI * 2);
        context.stroke();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  return (
    <mesh ref={meshRef} scale={1.5}>
      <sphereGeometry args={[1, 128, 128]} />
      <meshStandardMaterial 
        map={moonTexture}
        roughness={0.9}
        metalness={0.05}
        bumpScale={0.05}
      />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [4, 4, 4], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4444ff" />
        <StarField />
        <Moon />
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
} 