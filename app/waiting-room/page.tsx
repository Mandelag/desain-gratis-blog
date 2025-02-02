'use client'

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Mesh } from 'three'
import { OrbitControls, useGLTF } from '@react-three/drei';


export default function App() {


  // <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
  return <div>
    This is a basic example
    <div style={{ width: "100%", height: "500px", backgroundColor: "ivory" }}>
      <Canvas >
        <ambientLight intensity={Math.PI / 8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={2} intensity={Math.PI} />
        <Boxx />
        <Dawgg />
        <OrbitControls />
      </Canvas>
    </div>

    This is an example of using ortographic camera

    <div style={{ width: "100%", height: "500px", backgroundColor: "ivory" }}>
      <Canvas orthographic camera={{ fov: 1000, zoom: 50, position: [100 / 2, 100 / 2, 100 / 2] }}>
        <ambientLight intensity={Math.PI / 4} />
        <spotLight position={[10, 10, 10]} angle={0.95} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={2} intensity={Math.PI} />
        <Dawgg position={[0, 2, 2]} />
        <Dawgg position={[7, 2, 2]} />
        <Boxx position={[0, 8, 3]} />
        <OrbitControls />
      </Canvas>
    </div>


  </div>
}

function Dawgg(props) {
  const { scene: whatdedawgdoin } = useGLTF('dog.glb')

  const meshRef = useRef<Mesh>(null!)
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta / 1
    meshRef.current.rotation.y += delta * 1 / 1
    meshRef.current.rotation.z += delta * 1
  })

  return <primitive object={whatdedawgdoin.clone()} {...props} ref={meshRef} />
}

function Boxx(
  props
) {
  const meshRef = useRef<Mesh>(null!)
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);


  useEffect(() => {
    if (!hover) {
      return
    }
    console.log("HOVERFED!")
  }, [hover])

  useFrame((state, delta) => (meshRef.current.rotation.x += delta / 8))
  return <mesh
    onClick={(event) => setActive(!active)}
    onPointerOver={(event) => setHover(true)}
    onPointerOut={(event) => setHover(false)}
    ref={meshRef}
    {...props}
  >
    <sphereGeometry />
    <meshStandardMaterial color={hover ? 'green' : 'orange'} roughness={0.0} wireframe />
  </mesh>
}
