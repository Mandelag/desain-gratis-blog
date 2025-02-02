'use client'

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Mesh } from 'three'
import { OrbitControls } from '@react-three/drei';


export default function App() {

  // <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
  return <div>
    <div style={{ width: "100%", height: "500px" }}>
      <Canvas >
        <ambientLight intensity={Math.PI / 8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={2} intensity={Math.PI} />
        <Boxx />
        <OrbitControls />
      </Canvas>
    </div>
  </div>
}
function Boxx(

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
  return <>
    <mesh
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      ref={meshRef}
    >
      <sphereGeometry />
      <meshStandardMaterial color={hover ? 'green' : 'orange'} roughness={0.0} wireframe />
    </mesh>
  </>
}
