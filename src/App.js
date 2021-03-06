import React, { Component, useState, useRef, useEffect } from 'react';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';
import './App.css';
import { Path } from 'three';

extend({ OrbitControls });

const Spaceship = () => {
  const [model, setModel] = useState();
  useEffect(() => {
    new GLTFLoader().load('/scene.gltf', setModel );
    
  })
  return (
      model ? <primitive object={model.scene} castShadow /> : null
    );
}

const Plane = () => (
   <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
    <planeBufferGeometry attach="geometry" args={[100, 100]} />
    <meshPhysicalMaterial attach="material" color="white" />
   </mesh>
)

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update()
  }); 

  return(
    <orbitControls 
    autoRotate
    maxPolarAngle={Math.PI / 2}
    minPolarAngle={Math.PI / 3}
    args = {[ camera, gl.domElement ]}
    ref={orbitRef}
    />
  )
}

const Box = () => {
  const [Hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale : active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color : Hovered ? "hotpink" : "gray"
  })

  return(
  <a.mesh
    onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}
    onClick={() => setActive(!active)}
    scale={props.scale}
    castShadow
  >
    <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    <a.meshPhysicalMaterial attach="material" color={props.color} />
  </a.mesh>
  )
}

class App extends Component {

  render() {
    return (
      <div>
        <h1>Spaceship Patrol</h1>

        <Canvas camera={{ position: [0, 5, 15] }} onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}>
          <fog attach="fog" args={["black", 30, 50]} />
          <ambientLight intensity={.2} />
          <spotLight position={[0, 20, 20]} penumbra={1} castShadow/>
          <Controls />
          {/* <Box /> */}
          {/* <Plane />  */}
          <Spaceship />
        </Canvas>
      </div>
    );
  }
}

export default App;
