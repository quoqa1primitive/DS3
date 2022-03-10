import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, PerspectiveCamera, shaderMaterial, useCursor } from '@react-three/drei';
import { Text } from "troika-three-text";
import glsl from 'babel-plugin-glsl/macro';
import fonts from "./fonts";

import "./ImmVisComponent.css"

const STEP_XY = 100;
const STEP_ZY = 101;
const STEP_ZX = 110;

const scale = 4.5;
const tickLength = 0.6;
const speed = 0.035;
const opts = {
  font: "roboto",
  fontSize: "2.5",
  color: "black",
  maxWidth: 300,
  lineHeight: 1,
  letterSpacing: 0,
  textAlign: "justify",
  materialType: "MeshPhongMaterial"
};
const xyzProps = {
  xSteps: 2,  xLength: 57.33,   xPadding: 15,
  ySteps: 11, yLength: 54.398,  yPadding: 0,
  zSteps: 3,  zLength: 100,     zPadding: 10,
  dataA1: [30, 60, 70, 80, 90, 130, 140, 150, 150, 170, 180, 210],
  dataB1: [90, 90, 100, 100, 110, 120, 120, 140, 140, 150, 160, 180],
  dataA2: [60, 60, 60, 55, 55, 55, 50, 50, 50, 45, 40, 40],
  dataB2: [30, 40, 40, 50, 50, 50, 60, 70, 70, 70, 70, 80]
}

extend({ Text });

function Line({ start, end, color }) {
  const ref = useRef();
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  }, [start, end])
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} />
    </line>
  )
}

function TextBox({opts, text, anchorX, anchorY}){
  const ref = useRef();
  useFrame((state) => {
    ref.current.lookAt(new THREE.Vector3(state.camera.position.x, state.camera.position.y, state.camera.position.z));
  })

  return(
    <text {...opts} ref={ref} text={text + ""} font={fonts[opts.font]} anchorX={anchorX} anchorY={anchorY}>
      {opts.materialType === "MeshPhongMaterial" ? (
        <meshPhongMaterial attach="material" color={opts.color} />
      ) : null}
    </text>
  )

}

function Rect({ width, height, depth, color, opacity }){
  let myHeight = height / 5;
  const geometry = new THREE.BoxGeometry(width, myHeight, depth);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry));

  return(
    <>
      <mesh raycast={() => null} position={[0, myHeight / 2, 0]}>
        <boxGeometry args={[width, myHeight, depth]} />
        <meshStandardMaterial color={color} transparent={true} opacity={opacity} />
      </mesh>
      <mesh raycast={() => null} position={[0, myHeight / 2, 0]}>
        <lineSegments geometry={edges} renderOrder={100}>
          <lineBasicMaterial color="lightgrey"/>
        </lineSegments>
      </mesh>
    </>
  )
}

function AxGr({position}){
  const xLength = xyzProps.xLength, yLength = xyzProps.yLength, zLength = xyzProps.zLength;
  const xPadding = xyzProps.xPadding, yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
  const xSteps = xyzProps.xSteps, ySteps = xyzProps.ySteps, zSteps = xyzProps.dataA1.length;

  useFrame((state) => {
    // console.log(state.camera.position);
    state.camera.position.x = state.camera.position.x;
    state.camera.position.y = state.camera.position.y;
    state.camera.position.z = state.camera.position.z;
  })

  const XAxis1 =
    <>
      {
        Array(xSteps).fill(0).map((x, y) => x + y).map((item, idx) => {
          return <mesh key={idx} position={[xPadding + item * ((xLength - 2 * xPadding) / (xSteps - 1)), -tickLength, zLength]}>
              <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} /> // Tick
              <TextBox opts={opts} text={String.fromCharCode(65+item)} anchorX={"center"} anchorY={"top"} /> // Label
              <Line key={idx+100} color={"lightgrey"} start={[0, tickLength, 0]} end={[0, tickLength, -zLength]} /> // Grid
            </mesh>
        })
      }
    </>

  const YAxis1 =
  <>
    {
      Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[-tickLength, item * ((yLength - 2 * yPadding) / (ySteps - 1)), 0]}>
            <Line key={idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} /> // Tick
            <TextBox opts={opts} text={3 + 3 * item} anchorX={"right"} anchorY={"middle"} /> // Label
            <Line key={idx+100} color={"lightgrey"} start={[tickLength, 0, 0]} end={[xLength, 0, 0]} /> // Grid
          </mesh>
      })
    }
  </>

  const ZAxis1 =
  <>
    {
      Array(xyzProps.dataA1.length).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[0, -tickLength, zPadding + item * ((zLength - 2 * zPadding) / (zSteps - 1))]}>
            <Line key={idx} color={"black"} start={[0, 0, 0]} end={[-tickLength, 0, 0]} /> // Tick
            <TextBox opts={opts} text={1 + 1 * item} anchorX={"center"} anchorY={"top"} /> // Label
            <Line key={idx+100} color={"lightgrey"} start={[0, tickLength, 0]} end={[xLength, tickLength, 0]} /> // Grid
          </mesh>
      })
    }
  </>

  return(
    <group position={position}>
      {XAxis1}
      {YAxis1}
      {ZAxis1}
      <Line color={"black"} start={[0, 0, zLength]} end={[xLength, 0, zLength]} /> // X-Axis
      <Line color={"black"} start={[0, 0, 0]} end={[0, yLength, 0]} /> // Y-Axis
      <Line color={"black"} start={[0, 0, 0]} end={[0, 0, zLength]} /> // Z-Axis
      <Line color={"black"} start={[0, 0, 0]} end={[xLength, 0, 0]} /> // Z-Axis2
    </group>
  )
}

function MainGroup1({position, target}){
  const xLength = xyzProps.xLength, yLength = xyzProps.yLength, zLength = xyzProps.zLength;
  const xPadding = xyzProps.xPadding, yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
  const xSteps = xyzProps.xSteps, ySteps = xyzProps.ySteps, zSteps = xyzProps.dataA1.length;
  const rectWidth = 6, rectDepth = 2;

  return(
    <group position={position}>
      {
        xyzProps.dataA1.map((item, idx) => {
          return <mesh key={idx}
            position={[
              xPadding + 0 * ((xLength - 2 * xPadding) / (xSteps - 1)) + rectWidth / (idx == 0?  -1.5 : 1.5),
              0,
              zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) - rectDepth / 2
            ]}>
              <Rect width={rectWidth} height={item} depth={rectDepth} color={new THREE.Color("rgb(0, 255, 0)")} opacity={idx==xyzProps.dataA1.length-1?1:1}/>
            </mesh>
        })
      }
      {
        xyzProps.dataB1.map((item, idx) => {
          return <mesh key={idx}
              position={[xPadding + 1 * ((xLength - 2 * xPadding) / (xSteps - 1)), 0, zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) + rectDepth / 2]}
            >
                  <Rect key={idx} width={rectWidth} height={item} depth={rectDepth} color={new THREE.Color("rgb(255, 0, 0)")} opacity={idx==xyzProps.dataB1.length-1?1:1}/>
            </mesh>
        })
      }
    </group>
  )
}

function MainGroup2({position, target}){
  const xLength = xyzProps.xLength, yLength = xyzProps.yLength, zLength = xyzProps.zLength;
  const xPadding = xyzProps.xPadding, yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
  const xSteps = xyzProps.xSteps, ySteps = xyzProps.ySteps, zSteps = xyzProps.dataA1.length;
  const rectDepth = 2;

  return(
    <group position={position}>
      {
        xyzProps.dataA1.map((item, idx) => {
          return <mesh
            key={idx}
            position={[
              0 + xyzProps.dataA2[idx] / 2,
              0,
              zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) - rectDepth / 2]}>
              <Rect width={xyzProps.dataA2[idx]} height={item} depth={rectDepth} color={new THREE.Color("rgb(0, 255, 0)")} opacity={idx==xyzProps.dataA1.length-1?1:1}/>
            </mesh>
        })
      }
      {
        xyzProps.dataB1.map((item, idx) => {
          return <mesh
            key={idx}
            position={[
              0 + xyzProps.dataB2[idx] / 2,
              0,
              zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) + rectDepth / 2]}>
              <Rect width={xyzProps.dataB2[idx]} height={item} depth={rectDepth} color={new THREE.Color("rgb(255, 0, 0)")} opacity={idx==xyzProps.dataB1.length-1?1:1}/>
            </mesh>
        })
      }
    </group>
  )
}

function VisComponent({scroll, ...props}){
  const group = useRef()

  useFrame(() => {
    const et = scroll.current
    // console.log(et);
    group.current.position.y = Math.sin((et) / 2) * 50
    group.current.rotation.x = Math.sin((et) / 3) * 50
    group.current.rotation.y = Math.cos((et) / 2) * 50
    group.current.rotation.z = Math.sin((et) / 3) * 50
  });

  return(
    <group ref={group}>
      <AxGr position={[0, 0, 0]} xyzProps={xyzProps} />
      <MainGroup1 position={[0, 0, 0]} xyzProps={xyzProps} />
    </group>
  )
}

function ImmVisComponent({overlay, scroll}) {
  const canvas = useRef();
  const mainCamera = useRef();

  return (
    <div className={"Visualization"} style={{display: "flex", flexDirection:"column"}}>
      <div style={{fontSize: "20px"}}> Children and Elderly per 100 Adults </div>
      <Canvas
        ref={canvas}
        onCreated={(state) => state.events.connect(overlay.current)}
        style={{width: window.offsetWidth, height: window.offsetWidth*1.2}}
        dpr={Math.max(window.devicePixelRatio, 2)}>
        <OrthographicCamera ref={mainCamera} makeDefault
          position={[xyzProps.xLength / 2, xyzProps.yLength / 2, 1000 * scale]}
          near={0}
          far={50000 * scale}
          zoom={1 * scale}
          />
        <OrbitControls
          camera={mainCamera.current}
          enablePan={true}
          enableZoom={false}
          zoomSpeed={0.25/scale}
          style={{zIndex: 5}}/>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <VisComponent scroll={scroll} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ImmVisComponent;
