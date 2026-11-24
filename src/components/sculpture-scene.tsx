'use client';

import { Environment, Lightformer, MeshTransmissionMaterial } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BufferAttribute, BufferGeometry, CanvasTexture, CatmullRomCurve3, Group, MathUtils, SRGBColorSpace, Vector3 } from 'three';

const controlPoints = [
  [0.02, 0.12, 0.25], [0.65, 0.44, 0.48], [1.19, 0.98, 0.29],
  [1.18, 1.53, -0.09], [0.76, 1.66, -0.36], [0.31, 1.33, -0.43],
  [0.16, 0.78, -0.33], [0.31, 0.14, -0.21], [0.19, -0.55, -0.21],
  [-0.43, -1.28, -0.25], [-1.21, -1.51, -0.12], [-1.58, -1.18, 0.13],
  [-1.52, -0.61, 0.31], [-1.01, -0.17, 0.32], [-0.45, -0.03, 0.25],
];

function ribbonGeometry() {
  const curve = new CatmullRomCurve3(controlPoints.map(([x, y, z]) => new Vector3(x, y, z)), true);
  const lengthSegments = 144;
  const ringSegments = 22;
  const frames = curve.computeFrenetFrames(lengthSegments, true);
  const position = new Float32Array(lengthSegments * ringSegments * 3);
  const indices: number[] = [];
  const point = new Vector3();
  const offset = new Vector3();

  for (let segment = 0; segment < lengthSegments; segment++) {
    const u = segment / lengthSegments;
    const t = u * Math.PI * 2;
    const twist = t + 0.7 * Math.sin(t + 0.6);
    const width = 0.36 + 0.074 * Math.sin(t * 2 - 0.65);
    curve.getPointAt(u, point);

    for (let ring = 0; ring < ringSegments; ring++) {
      const angle = ring / ringSegments * Math.PI * 2;
      const broad = width * Math.cos(angle);
      const depth = 0.093 * Math.sin(angle);
      offset.copy(point)
        .addScaledVector(frames.normals[segment], broad * Math.cos(twist) - depth * Math.sin(twist))
        .addScaledVector(frames.binormals[segment], broad * Math.sin(twist) + depth * Math.cos(twist));
      const a = segment * ringSegments + ring;
      offset.toArray(position, a * 3);
      const next = ((segment + 1) % lengthSegments) * ringSegments;
      const nextRing = (ring + 1) % ringSegments;
      indices.push(a, segment * ringSegments + nextRing, next + ring, segment * ringSegments + nextRing, next + nextRing, next + ring);
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(position, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.center();
  return geometry;
}

type SceneProps = { onReady: () => void; onFailure: () => void };

function Ribbon({ onReady, onFailure }: SceneProps) {
  const group = useRef<Group>(null);
  const geometry = useMemo(() => ribbonGeometry(), []);
  const { gl } = useThree();
  const elapsed = useRef(0);
  const frames = useRef(0);
  const scroll = useRef(0);

  useEffect(() => {
    function measure() { scroll.current = Math.min(window.scrollY / window.innerHeight, 1); }
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    gl.domElement.addEventListener('webglcontextlost', onFailure);
    return () => {
      gl.domElement.removeEventListener('webglcontextlost', onFailure);
      window.removeEventListener('scroll', measure);
    };
  }, [gl, onFailure]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ pointer }, delta) => {
    if (!group.current) return;
    const step = Math.min(delta, 0.05);
    elapsed.current += step;
    if (++frames.current === 3) onReady();
    const time = elapsed.current;
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, 0.09 - pointer.y * 0.22 + scroll.current * 0.22, 3, step);
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, 0.06 + pointer.x * 0.29 + Math.sin(time * 0.41) * 0.14, 3, step);
    group.current.rotation.z = 0.035 + Math.sin(time * 0.33) * 0.043;
    group.current.position.y = Math.sin(time * 0.53) * 0.045 - scroll.current * 0.24;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <MeshTransmissionMaterial color="#f0ffd6" attenuationColor="#b6d798" attenuationDistance={2.2}
          ior={1.48} roughness={0.10} thickness={0.59} transmission={1} chromaticAberration={0.04}
          anisotropicBlur={0.07} samples={3} resolution={224} envMapIntensity={1.6} />
      </mesh>
    </group>
  );
}

function galleryLight(isDark: boolean, base: string) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 192;
  const context = canvas.getContext('2d');
  if (context) {
    const light = context.createRadialGradient(41, 31, 4, 86, 63, 157);
    light.addColorStop(0, isDark ? '#526b51' : '#fafaf0');
    light.addColorStop(0.62, base);
    light.addColorStop(1, isDark ? '#142218' : '#c8d3b6');
    context.fillStyle = light;
    context.fillRect(0, 0, 192, 192);
    context.translate(103, 117);
    context.rotate(-0.42);
    const windowLight = context.createLinearGradient(-75, 0, 101, 0);
    windowLight.addColorStop(0, '#ffffff00');
    windowLight.addColorStop(0.33, isDark ? '#d2ead830' : '#ffffff6e');
    windowLight.addColorStop(0.52, isDark ? '#d2ead807' : '#ffffff0f');
    windowLight.addColorStop(0.75, isDark ? '#d2ead81d' : '#ffffff39');
    windowLight.addColorStop(1, '#ffffff00');
    context.fillStyle = windowLight;
    context.fillRect(-75, -230, 176, 460);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export default function SculptureScene({ running, onReady, onFailure }: SceneProps & { running: boolean }) {
  function backgroundTint() {
    return getComputedStyle(document.documentElement).getPropertyValue('--art-bg').trim();
  }
  const [background, setBackground] = useState(backgroundTint);
  const texture = useMemo(() => galleryLight(document.documentElement.dataset.theme === 'dark', background), [background]);
  useEffect(() => {
    const observer = new MutationObserver(() => setBackground(backgroundTint()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <Canvas dpr={[1, 1.35]} flat frameloop={running ? 'always' : 'never'}
      camera={{ position: [0, 0, 6.9], fov: 38 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
      <primitive object={texture} attach="background" />
      <Environment frames={1} resolution={128}>
        <Lightformer form="rect" intensity={5} position={[-3, 2.5, 4]} scale={[1.25, 7, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={3.5} position={[4, -1, 1.75]} scale={[1.2, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="circle" intensity={2.2} position={[1, 5, -2]} scale={4} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={1.5} position={[-2, -2, -4]} scale={4} target={[0, 0, 0]} />
      </Environment>
      <Ribbon onReady={onReady} onFailure={onFailure} />
    </Canvas>
  );
}
