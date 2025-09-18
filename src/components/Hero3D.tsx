import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Custom circular arrow component
const CircularArrow = ({ 
  radius = 2, 
  color = "#10b981", 
  position = [0, 0, 0], 
  rotationSpeed = 0.01 
}: {
  radius?: number;
  color?: string;
  position?: [number, number, number];
  rotationSpeed?: number;
}) => {
  const meshRef = useRef<THREE.Group>(null);

  // Create circular arrow geometry
  const { pathGeometry, arrowHeadGeometry } = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0, 0,
      radius, radius,
      0, 2 * Math.PI,
      false,
      0
    );

    const points = curve.getPoints(64);
    const pathGeometry = new THREE.BufferGeometry().setFromPoints(points);
    
    const arrowHeadGeometry = new THREE.ConeGeometry(0.15, 0.4, 8);
    
    return { pathGeometry, arrowHeadGeometry };
  }, [radius]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += rotationSpeed;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Circular path */}
      <line>
        <primitive object={pathGeometry} attach="geometry" />
        <lineBasicMaterial attach="material" color={color} linewidth={3} />
      </line>
      
      {/* Arrow heads */}
      {[0, Math.PI * 2/3, Math.PI * 4/3].map((angle, index) => (
        <mesh
          key={index}
          position={[
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          ]}
          rotation={[0, 0, angle + Math.PI / 2]}
        >
          <primitive object={arrowHeadGeometry} attach="geometry" />
          <meshBasicMaterial attach="material" color={color} />
        </mesh>
      ))}
    </group>
  );
};

// Particle system for transformation effect
const Particles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(100 * 3);
    
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <primitive object={particlesGeometry} attach="geometry" />
      <pointsMaterial
        attach="material"
        color="#10b981"
        size={0.05}
        transparent
        opacity={0.6}
      />
    </points>
  );
};

// Main 3D scene component
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Three interconnected circular arrows */}
      <CircularArrow 
        radius={2.5} 
        color="#10b981" 
        position={[0, 0, 0]} 
        rotationSpeed={0.008} 
      />
      <CircularArrow 
        radius={2} 
        color="#22c55e" 
        position={[0, 0, 0.5]} 
        rotationSpeed={-0.006} 
      />
      <CircularArrow 
        radius={1.5} 
        color="#34d399" 
        position={[0, 0, -0.5]} 
        rotationSpeed={0.01} 
      />
      
      <Particles />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 60 
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Hero3D;