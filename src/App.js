import React, { Component, useState, useRef } from 'react';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber';
import { useSpring, a, useSprings } from 'react-spring/three';
import './App.css';

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update()
  }); 

  return(
    <orbitControls 
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
  >
    <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
    <a.meshBasicMaterial attach="material" color={props.color} />
  </a.mesh>
  )
}

class App extends Component {

  render() {
    return (
      <Canvas>
        <Controls />
        <Box />
      </Canvas>
    );
  }
}

export default App;
