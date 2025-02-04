'use client'

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect, Suspense } from "react";
import { Euler, Mesh, Quaternion, TextureLoader, Vector3 } from 'three'
import { KeyboardControls, OrbitControls, useGLTF, useKeyboardControls } from '@react-three/drei';
import { Physics, RigidBody, useRapier, RapierRigidBody } from "@react-three/rapier";

import { Rotation } from "@dimforge/rapier3d-compat"

interface Session {
  id: string;
  name?: string;
  color?: string;

  lat?: number;
  lon?: number;
  zoom?: number;

  pos?: number[];
}

export default function App() {

  const [pos, setPos] = useState(
    Array.from(Array(50).keys()).map(v => [(Math.random()), 5, (Math.random() * 1)])
  )

  const [dawg, setDawg] = useState(
    Array.from(Array(1).keys()).map(v => [(Math.random()), 5, (Math.random() * 1)])
  )


  // <div className='relative my-12 h-48 w-full py-6 sm:w-1/2 md:mb-40'>
  return <div>
    This is a basic example
    <div style={{ width: "100%", height: "500px", backgroundColor: "ivory" }}>
      <Canvas >
        <ambientLight intensity={Math.PI / 8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={2} intensity={Math.PI} />
        <Boxx />
        <Dawgg registerRef={() => { }} />
        <OrbitControls />
      </Canvas>
    </div>

    This is an example of using ortographic camera & shadows

    <div style={{ width: "100%", height: "500px", backgroundColor: "ivory" }} onKeyDown={(e) => {
      console.log("KONSOLE LOG", e.target)
    }}>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space", "f"] },
        ]}>
        <Canvas dpr={[1, 2]} shadows orthographic gl={{ alpha: false }} camera={{ fov: 1000, zoom: 26, position: [100 / 2, 100 / 2, 100 / 2] }}>
          <color attach="background" args={['#f6d186']} />
          <ambientLight intensity={Math.PI / 9} />
          <spotLight position={[20, 20, 20]} angle={0.95} penumbra={1} decay={0} intensity={Math.PI} castShadow shadow-mapSize-width={1028} shadow-mapSize-height={1028} />
          <pointLight position={[-50, -50, -40]} decay={0.1} intensity={Math.PI} />
          <directionalLight castShadow />
          <Suspense>
            <Physics gravity={[0, 0, 0]} debug>
              <WhatDaDawgDoinWorld players={[1]} />
            </Physics>
          </Suspense>
          <OrbitControls />
        </Canvas>
      </KeyboardControls>
    </div>

    This is trying a rapier physics engine

    <div style={{ width: "100%", height: "500px", backgroundColor: "ivory" }} onKeyDown={(e) => {
      console.log(e.target)
    }} onClick={() => {
      setPos(Array.from(Array(100).keys()).map(v => [(Math.random()), 5, (Math.random() * 1)]))
    }}>
      <Canvas dpr={[1, 2]} shadows orthographic gl={{ alpha: false }} camera={{ fov: 1000, zoom: 4, position: [100 / 2, 100 / 2, 100 / 2] }}>
        <color attach="background" args={['#f6d186']} />
        <ambientLight intensity={Math.PI / 9} />
        <spotLight position={[80, 80, 20]} angle={0.95} penumbra={0.8} decay={0.1} intensity={Math.PI} castShadow shadow-mapSize-width={1028} shadow-mapSize-height={1028} />
        <pointLight position={[-150, -200, -40]} decay={10} intensity={Math.PI / 1} />
        <directionalLight castShadow />
        <Suspense>
          <Physics gravity={[0, -9.81, 0]} >
            {pos.map(v => (
              <RigidBody
                // restitution={1}
                friction={0.1}
                colliders="ball"
                mass={2}
                key={v.toString()}
              >
                <Boxx position={v} />
              </RigidBody>
            ))
            }
            <RigidBody
              friction={0.0001}
              density={1000}
              restitution={1}
              lockTranslations
            >
              <Platform rotation={[-Math.PI / 2 + 0.1, 0, 0]} />
            </RigidBody>

          </Physics>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div >
  </div >
}

const SPEED = 8
const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()
const rotation = new Vector3()

const majuMundur = new Vector3()
const kanankiri = new Vector3()

function WhatDaDawgDoinWorld({ players }) {
  const refs = useRef<{ [id: string]: RapierRigidBody | null }>({});
  const playerState = useRef<{ [id: string]: any }>({});

  const [, get] = useKeyboardControls()

  const rapier = useRapier()

  const W = useRef(1)

  const three = useThree()

  // main render loop
  useFrame((state, delta) => {



    // @ts-ignore
    // state.events.update()


    const ref: RapierRigidBody = refs.current['0']
    const st: any = playerState.current['0']


    // console.log(ref.rawSet)

    const { forward, backward, left, right, jump } = get()
    // const velocity = ref.linvel()

    // movement
    frontVector.set(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0))
    sideVector.set((left ? 1 : 0) - (right ? 1 : 0), 0, 0)
    // direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)


    const rot = ref.rotation()

    const q = new Quaternion(rot.x, rot.y, rot.z, rot.w)
    const v = new Vector3(0, 0, (forward ? 1 : 0) - (backward ? 1 : 0)).multiplyScalar(SPEED).applyQuaternion(q)
    // three.
    ref.setLinvel(v, false)

    // console.log(v)
    // ref.setRotation({ x: rot.x, y: rot.y, z: rot.z, w: W.current }, false)
    // W.current += 0.1
    // console.log(rot)

    // ref.setLinvel({ x: majuMundur.x, y: majuMundur.y, z: majuMundur.z }, false)

    // console.log(majuMundur)

    // console.log(ref)
    // ref.translatez(new Vector3(0, 0, 1), false)
    kanankiri.set(0, 1, 0).multiplyScalar(SPEED * ((left ? 1 : 0) + (right ? -1 : 0)))
    ref.setAngvel({ x: kanankiri.x, y: kanankiri.y, z: kanankiri.z }, false)

    // ref.setAng

    return
  })

  return <>
    {players.map((arr, i) => (
      <RigidBody
        restitution={-1}
        // friction={0.1}
        enabledRotations={[false, true, false]}
        // colliders="ball"
        colliders="cuboid"
        mass={20}
        key={i.toString()}
        ref={(ref) => {
          console.log(ref)
          refs.current[`${i}`] = ref
          playerState.current[i.toString()] = {}
        }}
        position={[(Math.random() * 20) - 10, 0, (Math.random() * 20 - 10)]}
        onCollisionEnter={(evt) => {
          playerState.current[i.toString()].grounded = true
        }}
        onCollisionExit={(evt) => {
          playerState.current[i.toString()].grounded = false
        }}
      >
        <Dawgg />
      </RigidBody>))
    }
    <RigidBody
      friction={0.0001}
      density={1000}
      restitution={1}
      lockTranslations
    >
      <Platform rotation={[-Math.PI / 2 + 0.1, 0, 0]} />
    </RigidBody>
  </>
}


function Platform(props) {
  const colorMap = useLoader(TextureLoader, '/kayutua.png')
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
      <boxGeometry args={[100, 100, 0.5]} />
      <meshStandardMaterial {...props} map={colorMap} />
    </mesh>
  )
}

function Dawgg(props) {
  const { registerRef } = props;
  const { scene: whatdedawgdoin } = useGLTF('/dog.glb')

  const ref = useRef<Mesh>(null!)

  useEffect(() => {
    whatdedawgdoin.traverse(v => v.castShadow = true)
  }, [whatdedawgdoin])

  return <primitive ref={ref} object={whatdedawgdoin.clone()} {...props} />
}

function Boxx(
  props
) {
  const meshRef = useRef<Mesh>(null!)
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  const [radius, setRadius] = useState(Math.random() * 2 + 0.5)

  return <mesh
    onClick={(event) => setActive(!active)}
    onPointerOver={(event) => setHover(true)}
    onPointerOut={(event) => setHover(false)}
    ref={meshRef}
    {...props}
    castShadow
  >
    <sphereGeometry args={[radius]} />
    <meshStandardMaterial color={hover ? 'green' : 'orange'} roughness={0} />
    {/* <meshPhongMaterial color={hover ? 0xff00ff : 0x880088} /> */}
  </mesh>
}
