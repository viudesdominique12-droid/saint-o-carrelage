"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { useMemo, useRef, useEffect, useState } from "react";
import type { Mesh } from "three";

// §7.2 idée 5+8 — carreau hero 3D draggable + composition murale qui s'assemble.
// Une seule scène : hero tile rotatif au centre + floor avec calepinage en
// dessous, qui changent ensemble avec les contrôles côté React.

type Format = { id: string; w: number; h: number; d: number };
type Tile3D = {
  position: [number, number, number];
  rotation: [number, number, number];
  w: number;
  h: number;
};

type Props = {
  motif: string;
  color: string;
  format: Format;
};

export function TileScene({ motif, color, format }: Props) {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <Canvas
      camera={{ position: [3.2, 2.6, 4.5], fov: 38 }}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={["#f6f4f0"]} />
      <ambientLight intensity={0.42} />
      <directionalLight
        position={[6, 8, 4]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} />

      <HeroTile color={color} format={format} autoRotate={!reduce} />
      <Floor motif={motif} color={color} format={format} />

      <ContactShadows
        position={[0, -0.42, 0]}
        opacity={0.35}
        blur={2.5}
        far={4}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.3}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}

function HeroTile({
  color,
  format,
  autoRotate,
}: {
  color: string;
  format: Format;
  autoRotate: boolean;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y += dt * 0.35;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0.6, 0]} castShadow>
      <boxGeometry args={[format.w, format.d, format.h]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.08} />
    </mesh>
  );
}

function Floor({
  motif,
  color,
  format,
}: {
  motif: string;
  color: string;
  format: Format;
}) {
  const tiles = useMemo<Tile3D[]>(() => {
    if (motif === "chevron") return generateChevron(format);
    return generateDroit(format);
  }, [motif, format]);

  return (
    <group position={[0, -0.4, 0]}>
      {tiles.map((t, i) => (
        <mesh
          key={`${motif}-${i}`}
          position={t.position}
          rotation={t.rotation}
          receiveShadow
        >
          <boxGeometry args={[t.w, 0.04, t.h]} />
          <meshStandardMaterial
            color={color}
            roughness={0.72}
            metalness={0.02}
          />
        </mesh>
      ))}
    </group>
  );
}

// Droit : grille régulière, taille proportionnelle au format choisi
function generateDroit(format: Format): Tile3D[] {
  // Échelle de référence dans la scène 3D
  const w = format.w * 0.7;
  const h = format.h * 0.7;
  const gap = 0.04;
  const cols = 6;
  const rows = 4;
  const tiles: Tile3D[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      tiles.push({
        position: [
          (c - (cols - 1) / 2) * (w + gap),
          0,
          (r - (rows - 1) / 2) * (h + gap),
        ],
        rotation: [0, 0, 0],
        w,
        h,
      });
    }
  }
  return tiles;
}

// Chevron : tuiles allongées tournées ±45° en colonnes alternées
function generateChevron(format: Format): Tile3D[] {
  // Pour le chevron on étire les tuiles : ratio ~1:2.5
  const baseShort = Math.min(format.w, format.h) * 0.45;
  const baseLong = Math.min(format.w, format.h) * 1.4;
  const w = baseShort;
  const h = baseLong;
  const stepX = w * 0.9 * 1.414; // espacement diagonal
  const stepZ = h * 0.5; // imbrication verticale serrée
  const cols = 8;
  const rows = 5;
  const tiles: Tile3D[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const direction = c % 2 === 0 ? 1 : -1;
      tiles.push({
        position: [
          (c - (cols - 1) / 2) * stepX * 0.55,
          0,
          (r - (rows - 1) / 2) * stepZ + (c % 2 === 0 ? 0 : stepZ / 2),
        ],
        rotation: [0, (direction * Math.PI) / 4, 0],
        w,
        h,
      });
    }
  }
  return tiles;
}
