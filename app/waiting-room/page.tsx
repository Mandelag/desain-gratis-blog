'use client'

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Mesh } from 'three'
import { OrbitControls, useGLTF, ContactShadows } from '@react-three/drei';


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

    This is an example of using ortographic camera & shadows

    <div style={{ width: "100%", height: "500px", backgroundColor: "ivory" }} onKeyDown={(e) => {
      console.log(e.target)
    }}>
      <Canvas dpr={[1, 2]} shadows orthographic gl={{ alpha: false }} camera={{ fov: 1000, zoom: 32, position: [100 / 2, 100 / 2, 100 / 2] }}>
        <color attach="background" args={['#f6d186']} />
        <ambientLight intensity={Math.PI / 9} />
        <spotLight position={[50, 20, 20]} angle={0.95} penumbra={1} decay={0} intensity={Math.PI} castShadow shadow-mapSize-width={1028} shadow-mapSize-height={1028} />
        <pointLight position={[-50, -50, -40]} decay={5} intensity={Math.PI} />
        <directionalLight castShadow />
        <Dawgg position={[0, 0, 0]} />
        <Dawgg position={[0, 0, 8]} />
        <Dawgg position={[8, 0, 0]} />
        <Boxx position={[12, 4, 0]} />
        <Platform />
        <OrbitControls />
      </Canvas>
    </div>

    This is trying a rapier physics engine

    <div style={{ width: "100%", height: "500px", backgroundColor: "ivory" }} onKeyDown={(e) => {
      console.log(e.target)
    }}>
      <Canvas dpr={[1, 2]} shadows orthographic gl={{ alpha: false }} camera={{ fov: 1000, zoom: 32, position: [100 / 2, 100 / 2, 100 / 2] }}>
        <color attach="background" args={['#f6d186']} />
        <ambientLight intensity={Math.PI / 9} />
        <spotLight position={[50, 20, 20]} angle={0.95} penumbra={1} decay={0} intensity={Math.PI} castShadow shadow-mapSize-width={1028} shadow-mapSize-height={1028} />
        <pointLight position={[-50, -50, -40]} decay={5} intensity={Math.PI} />
        <directionalLight castShadow />
        <Dawgg position={[0, 0, 0]} />
        <Dawgg position={[0, 0, 8]} />
        <Dawgg position={[8, 0, 0]} />
        <Boxx position={[12, 4, 0]} />
        <Platform />
        <OrbitControls />
      </Canvas>
    </div>


  </div>
}

function Platform(props) {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshStandardMaterial color="#ffb385" />
    </mesh>
  )
}

function Dawgg(props) {
  const { scene: whatdedawgdoin } = useGLTF('dog.glb')

  useEffect(() => {
    whatdedawgdoin.traverse(v => v.castShadow = true)
  }, [whatdedawgdoin])

  const meshRef = useRef<Mesh>(null!)
  useFrame((state, delta) => {
    // meshRef.current.rotation.x += delta / 1
    meshRef.current.rotation.y += delta * 1 / 1
    // meshRef.current.rotation.z += delta * 1
  })

  return <primitive castShadow receiveShadow object={whatdedawgdoin.clone()} {...props} ref={meshRef} />
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
    castShadow
  >
    <sphereGeometry />
    <meshStandardMaterial color={hover ? 'green' : 'orange'} roughness={0.0} />
  </mesh>
}
