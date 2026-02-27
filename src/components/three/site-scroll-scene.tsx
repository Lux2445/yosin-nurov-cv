import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
  Color,
  DoubleSide,
  MathUtils,
  Vector3,
  type Group,
  type Mesh,
  type Points,
} from 'three';
import type { ThemeMode } from '@/types/resume';

interface SiteScrollSceneProps {
  theme: ThemeMode;
}

interface Keyframe {
  at: number;
  camera: [number, number, number];
  target: [number, number, number];
}

interface RackData {
  x: number;
  z: number;
  width: number;
  height: number;
  phase: number;
  side: -1 | 1;
}

interface PacketData {
  laneX: number;
  laneY: number;
  speed: number;
  phase: number;
  size: number;
  drift: number;
  spin: number;
  colorMix: number;
}

interface PanelData {
  x: number;
  y: number;
  z: number;
  scale: number;
  tilt: number;
  phase: number;
}

interface RingData {
  radius: number;
  tube: number;
  z: number;
  speed: number;
  tilt: number;
}

const RACK_COUNT = 14;
const PACKET_COUNT = 72;
const PANEL_COUNT = 10;
const RING_COUNT = 5;
const NODE_COUNT = 460;
const EDGE_STRIDE = 31;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const CAMERA_KEYFRAMES: Keyframe[] = [
  { at: 0, camera: [0, 1.5, 11], target: [0, 0, -3] },
  { at: 0.2, camera: [2.4, 1.1, 8.9], target: [0.2, -0.1, -8.2] },
  { at: 0.4, camera: [-2.1, 1.7, 6.9], target: [0, -0.1, -14.5] },
  { at: 0.64, camera: [1.4, 1.15, 5], target: [0, 0, -21.5] },
  { at: 0.84, camera: [-0.8, 1, 4], target: [0, -0.1, -28.5] },
  { at: 1, camera: [0.2, 0.85, 3.2], target: [0, 0, -35.5] },
];

function fract(value: number) {
  return value - Math.floor(value);
}

function pseudoRandom(index: number, seed: number) {
  return fract(Math.sin(index * 127.13 + seed * 311.71) * 43758.5453123);
}

function clamp(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function lerpVec3(
  from: [number, number, number],
  to: [number, number, number],
  t: number,
) {
  return [
    MathUtils.lerp(from[0], to[0], t),
    MathUtils.lerp(from[1], to[1], t),
    MathUtils.lerp(from[2], to[2], t),
  ] as const;
}

function sampleKeyframes(
  value: number,
  frames: Keyframe[],
  key: 'camera' | 'target',
) {
  if (value <= frames[0].at) {
    return frames[0][key];
  }

  for (let i = 0; i < frames.length - 1; i += 1) {
    const current = frames[i];
    const next = frames[i + 1];
    if (value <= next.at) {
      const span = next.at - current.at;
      const t = span === 0 ? 0 : (value - current.at) / span;
      return lerpVec3(current[key], next[key], t);
    }
  }

  return frames[frames.length - 1][key];
}

function buildRacks() {
  return Array.from({ length: RACK_COUNT }, (_, index): RackData => {
    const side = index % 2 === 0 ? -1 : 1;
    const lane = Math.floor(index / 2) % 4;
    const depth = Math.floor(index / 2);
    const x = side * (3.3 + lane * 0.52 + pseudoRandom(index, 1) * 0.22);
    const z = -3.2 - depth * 2.7;
    const width = 0.62 + pseudoRandom(index, 2) * 0.34;
    const height = 1.7 + pseudoRandom(index, 3) * 2.1;
    const phase = pseudoRandom(index, 4) * Math.PI * 2;
    return { x, z, width, height, phase, side };
  });
}

function buildPackets() {
  return Array.from({ length: PACKET_COUNT }, (_, index): PacketData => ({
    laneX: (pseudoRandom(index, 5) - 0.5) * 4.3,
    laneY: (pseudoRandom(index, 6) - 0.5) * 2.4,
    speed: 0.2 + pseudoRandom(index, 7) * 1.2,
    phase: pseudoRandom(index, 8),
    size: 0.028 + pseudoRandom(index, 9) * 0.08,
    drift: 0.08 + pseudoRandom(index, 10) * 0.25,
    spin: 0.6 + pseudoRandom(index, 11) * 1.25,
    colorMix: pseudoRandom(index, 12),
  }));
}

function buildPanels() {
  return Array.from({ length: PANEL_COUNT }, (_, index): PanelData => {
    const side = index % 2 === 0 ? -1 : 1;
    const x = side * (1.9 + pseudoRandom(index, 13) * 1.35);
    const y = 1.15 + pseudoRandom(index, 14) * 1.55;
    const z = -2.2 - index * 1.95;
    const scale = 0.75 + pseudoRandom(index, 15) * 0.7;
    const tilt = (pseudoRandom(index, 16) - 0.5) * 0.45;
    const phase = pseudoRandom(index, 17) * Math.PI * 2;
    return { x, y, z, scale, tilt, phase };
  });
}

function buildRings() {
  return Array.from({ length: RING_COUNT }, (_, index): RingData => {
    const radius = 1.38 + index * 0.45;
    const tube = 0.026 + (index % 3) * 0.011;
    const z = -2.7 - index * 2.6;
    const speed = (index % 2 === 0 ? 1 : -1) * (0.18 + index * 0.05);
    const tilt = (pseudoRandom(index, 18) - 0.5) * 0.6;
    return { radius, tube, z, speed, tilt };
  });
}

function buildNodePositions() {
  const positions = new Float32Array(NODE_COUNT * 3);

  for (let i = 0; i < NODE_COUNT; i += 1) {
    const ratio = i / (NODE_COUNT - 1);
    const theta = GOLDEN_ANGLE * i;
    const radius = 6 + pseudoRandom(i, 19) * 11;
    const vertical = (pseudoRandom(i, 20) - 0.5) * 6;
    positions[i * 3] = Math.cos(theta) * radius * 0.34;
    positions[i * 3 + 1] = vertical;
    positions[i * 3 + 2] = -4 - ratio * 36 + (pseudoRandom(i, 21) - 0.5) * 2;
  }

  return positions;
}

function buildEdgePositions(nodePositions: Float32Array) {
  const edgePositions = new Float32Array(NODE_COUNT * 6);
  let cursor = 0;

  for (let i = 0; i < NODE_COUNT; i += 1) {
    const fromIndex = i * 3;
    const to = (i + EDGE_STRIDE) % NODE_COUNT;
    const toIndex = to * 3;
    edgePositions[cursor] = nodePositions[fromIndex];
    edgePositions[cursor + 1] = nodePositions[fromIndex + 1];
    edgePositions[cursor + 2] = nodePositions[fromIndex + 2];
    edgePositions[cursor + 3] = nodePositions[toIndex];
    edgePositions[cursor + 4] = nodePositions[toIndex + 1];
    edgePositions[cursor + 5] = nodePositions[toIndex + 2];
    cursor += 6;
  }

  return edgePositions;
}

const RACKS = buildRacks();
const PACKETS = buildPackets();
const PANELS = buildPanels();
const RINGS = buildRings();
const NODE_POSITIONS = buildNodePositions();
const EDGE_POSITIONS = buildEdgePositions(NODE_POSITIONS);

function SceneContent({ theme }: SiteScrollSceneProps) {
  const rootRef = useRef<Group>(null);
  const coreRef = useRef<Group>(null);
  const shellRef = useRef<Mesh>(null);
  const ringRefs = useRef<Array<Mesh | null>>([]);
  const rackRefs = useRef<Array<Mesh | null>>([]);
  const packetRefs = useRef<Array<Mesh | null>>([]);
  const panelRefs = useRef<Array<Mesh | null>>([]);
  const networkPointsRef = useRef<Points>(null);
  const networkEdgesRef = useRef<Group>(null);
  const smoothedProgress = useRef(0);
  const scrollTrackRef = useRef(1);
  const focusPoint = useMemo(() => new Vector3(), []);
  const fogColor = useMemo(() => new Color(), []);
  const { camera, pointer, scene } = useThree();

  useEffect(() => {
    const updateScrollTrack = () => {
      const track = document.documentElement.scrollHeight - window.innerHeight;
      scrollTrackRef.current = track > 0 ? track : 1;
    };

    updateScrollTrack();
    window.addEventListener('resize', updateScrollTrack);

    return () => {
      window.removeEventListener('resize', updateScrollTrack);
    };
  }, []);

  useFrame((state, delta) => {
    const rawProgress = clamp(window.scrollY / scrollTrackRef.current, 0, 1);
    smoothedProgress.current = MathUtils.damp(
      smoothedProgress.current,
      rawProgress,
      6.4,
      delta,
    );
    const p = smoothedProgress.current;
    const elapsed = state.clock.elapsedTime;

    if (rootRef.current) {
      rootRef.current.position.z = -p * 16;
      rootRef.current.rotation.y = p * 0.24 + pointer.x * 0.12;
      rootRef.current.rotation.x = pointer.y * 0.06;
    }

    if (coreRef.current) {
      const scale = 1 + p * 0.26 + Math.sin(elapsed * 1.45 + p * 4) * 0.04;
      coreRef.current.position.z = -2.8 - p * 10;
      coreRef.current.rotation.x += delta * (0.7 + p * 0.42);
      coreRef.current.rotation.y += delta * (0.9 + p * 0.66);
      coreRef.current.scale.set(scale, scale, scale);
    }

    if (shellRef.current) {
      const shellScale = 1.12 + p * 0.36;
      shellRef.current.position.z = -2.8 - p * 10;
      shellRef.current.rotation.y -= delta * (0.22 + p * 0.44);
      shellRef.current.rotation.z += delta * 0.12;
      shellRef.current.scale.set(shellScale, shellScale, shellScale);
    }

    for (let i = 0; i < ringRefs.current.length; i += 1) {
      const ring = ringRefs.current[i];
      if (!ring) {
        continue;
      }
      const ringData = RINGS[i];
      const pulse = 1 + Math.sin(elapsed * 1.1 + i * 0.8 + p * 8) * 0.07 + p * 0.08;
      ring.position.z = ringData.z - p * 6;
      ring.rotation.x = ringData.tilt + pointer.y * 0.2;
      ring.rotation.y += delta * ringData.speed * (1 + p * 0.5);
      ring.scale.set(pulse, pulse, pulse);
    }

    for (let i = 0; i < rackRefs.current.length; i += 1) {
      const rack = rackRefs.current[i];
      if (!rack) {
        continue;
      }
      const rackData = RACKS[i];
      const pulse = 1 + Math.sin(elapsed * 1.65 + rackData.phase + p * 4) * 0.08;
      rack.position.x = rackData.x + pointer.x * 0.16;
      rack.position.y = -1.6 + (rackData.height * pulse) * 0.5;
      rack.position.z = rackData.z - p * 4.6;
      rack.rotation.y = rackData.side * (0.08 + pointer.x * 0.09);
      rack.rotation.x = pointer.y * 0.04;
      rack.scale.set(1, rackData.height * pulse, 1);
    }

    for (let i = 0; i < panelRefs.current.length; i += 1) {
      const panel = panelRefs.current[i];
      if (!panel) {
        continue;
      }
      const panelData = PANELS[i];
      panel.position.x = panelData.x + pointer.x * 0.35;
      panel.position.y = panelData.y + Math.sin(elapsed * 1.25 + panelData.phase) * 0.16;
      panel.position.z = panelData.z - p * 5.4;
      panel.rotation.x = -0.12 + pointer.y * 0.2;
      panel.rotation.y =
        panelData.tilt + Math.sin(elapsed * 0.54 + panelData.phase) * 0.18;
      const panelScale = panelData.scale + Math.sin(elapsed * 1.4 + panelData.phase) * 0.06;
      panel.scale.set(panelScale, panelScale, panelScale);
    }

    for (let i = 0; i < packetRefs.current.length; i += 1) {
      const packet = packetRefs.current[i];
      if (!packet) {
        continue;
      }
      const packetData = PACKETS[i];
      const cycle = fract(elapsed * packetData.speed + packetData.phase + p * 1.3);
      const z = 2 - cycle * 46;
      const wobble = Math.sin(elapsed * 2.1 + packetData.phase * Math.PI * 2) * packetData.drift;
      packet.position.x = packetData.laneX + wobble + pointer.x * 0.24;
      packet.position.y =
        packetData.laneY +
        Math.cos(elapsed * 1.9 + packetData.phase * Math.PI * 2) * 0.16 +
        pointer.y * 0.18;
      packet.position.z = z - p * 7.5;
      packet.rotation.x += delta * (1 + packetData.spin);
      packet.rotation.y += delta * (1.2 + packetData.spin * 0.7);
    }

    if (networkPointsRef.current) {
      networkPointsRef.current.rotation.y = elapsed * 0.035 + p * 0.58;
      networkPointsRef.current.rotation.x = pointer.y * 0.12;
      networkPointsRef.current.position.z = -8 - p * 9;
    }

    if (networkEdgesRef.current) {
      networkEdgesRef.current.rotation.y = -elapsed * 0.022 + p * 0.4;
      networkEdgesRef.current.rotation.x = pointer.y * 0.08;
      networkEdgesRef.current.position.z = -8 - p * 9;
    }

    const sampledCamera = sampleKeyframes(p, CAMERA_KEYFRAMES, 'camera');
    const sampledTarget = sampleKeyframes(p, CAMERA_KEYFRAMES, 'target');
    camera.position.set(
      MathUtils.damp(camera.position.x, sampledCamera[0] + pointer.x * 0.8, 8.8, delta),
      MathUtils.damp(camera.position.y, sampledCamera[1] + pointer.y * 0.52, 8.8, delta),
      MathUtils.damp(camera.position.z, sampledCamera[2], 8.8, delta),
    );

    focusPoint.set(
      sampledTarget[0] + pointer.x * 0.2,
      sampledTarget[1] + pointer.y * 0.16,
      sampledTarget[2],
    );
    camera.lookAt(focusPoint);

    const hue = theme === 'dark' ? 0.54 : 0.57;
    const saturation = theme === 'dark' ? 0.55 : 0.5;
    const lightness = theme === 'dark' ? 0.062 + p * 0.028 : 0.93 - p * 0.045;
    fogColor.setHSL(hue, saturation, clamp(lightness, 0.05, 0.96));
    if (scene.fog) {
      scene.fog.color.copy(fogColor);
    }
  });

  const signal = theme === 'dark' ? '#2dd7ff' : '#196dff';
  const compute = theme === 'dark' ? '#87ffbe' : '#1fa877';
  const accent = theme === 'dark' ? '#ff9b62' : '#ff7f2f';
  const frame = theme === 'dark' ? '#d2e5ff' : '#f6fbff';
  const rack = theme === 'dark' ? '#112f52' : '#deebff';
  const rackEmissive = theme === 'dark' ? '#2d86c9' : '#6f8dd6';
  const panel = theme === 'dark' ? '#7df2cb' : '#57c79f';
  const edgeOpacity = theme === 'dark' ? 0.24 : 0.16;
  const pointOpacity = theme === 'dark' ? 0.8 : 0.52;

  return (
    <>
      <fog
        attach="fog"
        args={theme === 'dark' ? ['#06111f', 7, 52] : ['#eaf3ff', 8, 52]}
      />

      <group ref={rootRef}>
        <group ref={coreRef}>
          <mesh>
            <boxGeometry args={[1.9, 1.3, 1.9]} />
            <meshStandardMaterial
              color={frame}
              emissive={signal}
              emissiveIntensity={theme === 'dark' ? 0.36 : 0.16}
              metalness={0.86}
              roughness={0.24}
            />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[1.24, 0.18, 1.24]} />
            <meshStandardMaterial
              color={theme === 'dark' ? '#12315a' : '#d9e9ff'}
              emissive={compute}
              emissiveIntensity={theme === 'dark' ? 0.42 : 0.18}
              metalness={0.68}
              roughness={0.32}
            />
          </mesh>
          <mesh position={[0, -0.28, 0]}>
            <octahedronGeometry args={[0.35, 1]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={theme === 'dark' ? 0.56 : 0.22}
              roughness={0.2}
              metalness={0.62}
            />
          </mesh>
        </group>

        <mesh ref={shellRef}>
          <icosahedronGeometry args={[2.3, 2]} />
          <meshStandardMaterial
            color={signal}
            emissive={signal}
            emissiveIntensity={theme === 'dark' ? 0.2 : 0.09}
            wireframe
            transparent
            opacity={0.42}
          />
        </mesh>

        {RINGS.map((ringData, index) => (
          <mesh
            key={`ring-${ringData.z}`}
            ref={(node) => {
              ringRefs.current[index] = node;
            }}
            position={[0, 0, ringData.z]}
            rotation={[ringData.tilt, 0, 0]}
          >
            <torusGeometry args={[ringData.radius, ringData.tube, 14, 78]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? signal : compute}
              transparent
              opacity={0.72}
            />
          </mesh>
        ))}

        {RACKS.map((rackData, index) => (
          <mesh
            key={`rack-${rackData.z}`}
            ref={(node) => {
              rackRefs.current[index] = node;
            }}
            position={[rackData.x, -0.2, rackData.z]}
          >
            <boxGeometry args={[rackData.width, 1, rackData.width]} />
            <meshStandardMaterial
              color={rack}
              emissive={rackEmissive}
              emissiveIntensity={theme === 'dark' ? 0.36 : 0.16}
              metalness={0.72}
              roughness={0.34}
            />
          </mesh>
        ))}

        {PANELS.map((panelData, index) => (
          <mesh
            key={`panel-${panelData.z}`}
            ref={(node) => {
              panelRefs.current[index] = node;
            }}
            position={[panelData.x, panelData.y, panelData.z]}
            rotation={[0, panelData.tilt, 0]}
          >
            <planeGeometry args={[1.56, 0.9]} />
            <meshBasicMaterial
              color={panel}
              side={DoubleSide}
              transparent
              opacity={0.3}
            />
          </mesh>
        ))}

        {PACKETS.map((packetData, index) => (
          <mesh
            key={`packet-${packetData.phase}-${index}`}
            ref={(node) => {
              packetRefs.current[index] = node;
            }}
            position={[packetData.laneX, packetData.laneY, 0]}
          >
            <boxGeometry args={[packetData.size, packetData.size, packetData.size]} />
            <meshBasicMaterial
              color={packetData.colorMix > 0.68 ? accent : signal}
            />
          </mesh>
        ))}

        <mesh position={[0, -2.2, -18]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, 70, 30, 64]} />
          <meshBasicMaterial
            color={theme === 'dark' ? '#5db9e8' : '#89b6f6'}
            wireframe
            transparent
            opacity={theme === 'dark' ? 0.13 : 0.1}
          />
        </mesh>
      </group>

      <group ref={networkEdgesRef}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[EDGE_POSITIONS, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={theme === 'dark' ? '#7de3ff' : '#4f81cc'}
            transparent
            opacity={edgeOpacity}
          />
        </lineSegments>
      </group>

      <points ref={networkPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[NODE_POSITIONS, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={theme === 'dark' ? '#99f0ff' : '#4f7fc8'}
          size={0.03}
          sizeAttenuation
          transparent
          opacity={pointOpacity}
        />
      </points>
    </>
  );
}

function SceneBackground({ theme }: { theme: ThemeMode }) {
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor(theme === 'dark' ? '#040e1a' : '#e9f4ff', 1);
  }, [gl, theme]);

  return null;
}

export function SiteScrollScene({ theme }: SiteScrollSceneProps) {
  return (
    <Canvas
      dpr={[0.8, 1.2]}
      camera={{ position: [0, 1.5, 11], fov: 42 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <SceneBackground theme={theme} />
      <ambientLight intensity={theme === 'dark' ? 0.38 : 0.55} />
      <pointLight
        position={[3.6, 2.2, 4]}
        intensity={theme === 'dark' ? 1.26 : 0.9}
        color={theme === 'dark' ? '#60dcff' : '#6d9dff'}
      />
      <pointLight
        position={[-4.4, -1.2, -8]}
        intensity={theme === 'dark' ? 0.82 : 0.54}
        color={theme === 'dark' ? '#84ffbd' : '#3eb68b'}
      />
      <directionalLight
        position={[0, 5, 2]}
        intensity={theme === 'dark' ? 0.46 : 0.34}
      />
      <SceneContent theme={theme} />
    </Canvas>
  );
}

export default SiteScrollScene;
