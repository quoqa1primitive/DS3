import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, CycleRaycast, shaderMaterial, useCursor } from '@react-three/drei';
import { Text } from "troika-three-text";
import glsl from 'babel-plugin-glsl/macro';
import fonts from "./fonts";

const opts = {
  font: "roboto",
  fontSize: "1.5",
  color: "black",
  maxWidth: 300,
  lineHeight: 1,
  letterSpacing: 0,
  textAlign: "justify",
  materialType: "MeshPhongMaterial"
};

extend({ Text });

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

function Annotation({xPos, yPos, zPos, opts, text}){
  const ref = useRef();
  useFrame((state) => {
    ref.current.lookAt(new THREE.Vector3(state.camera.position.x, state.camera.position.y, state.camera.position.z));
  })

  let shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(-20, 20);
  shape.lineTo(-5, 20);
  Array(values.length).fill(0).map((x, y) => x + y).map((item, idx) => {
    shape.lineTo(
      xPadding + item * ((xLength - 2 * xPadding) / (values.length - 1)),
      yPadding + values[item] / 100 * yLength + width
    );
  })
  Array(values.length).fill(0).map((x, y) => x + y).map((item, idx) => {
    shape.lineTo(
      xPadding + (values.length - 1 - item) * ((xLength - 2 * xPadding) / (values.length - 1)),
      yPadding + values[(values.length - 1 - item)] / 100 * yLength - width
    );
  })
  const geometry = new THREE.ExtrudeBufferGeometry(shape, { bevelEnabled: false, depth: depth });
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry));

  return(
    <group position={[xPos, yPos, zPos]}>

      <TextBox/>
    </group>
  )
}

function MainGroup({scale, position, target, xyzProps}){
  const xLength = xyzProps.xLength, yLength = xyzProps.yLength, zLength = xyzProps.zLength;
  const xPadding = xyzProps.xPadding, yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
  const xSteps = xyzProps.xSteps, ySteps = xyzProps.ySteps, zSteps = xyzProps.zSteps;
  const tickLength = 0.6 * scale;
  const dpSize = 0.75 *scale;
  const speed = 0.03;

  // useFrame((state) => {
  //   // console.log(state.camera.position);
  //   state.camera.position.x += (xyzProps.xLength * (target[0] + 0.5) - state.camera.position.x) * speed;
  //   state.camera.position.y += (xyzProps.yLength * (target[1] + 0.5) - state.camera.position.y) * speed;
  //   state.camera.position.z += (xyzProps.zLength * (target[2] + 0.5) - state.camera.position.z) * speed;
  //   state.camera.lookAt(new THREE.Vector3(xyzProps.xLength / 2, xyzProps.yLength / 2, xyzProps.zLength / 2));
  // })

  return(
    <group position={position}>
      {
        Array(xSteps).fill(0).map((x, y) => x + y).map((item, idx) => {
          return <mesh position={[xPadding + item * ((xLength - 2 * xPadding) / (xSteps - 1)), -tickLength, zLength]}>
              <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} /> // tick
              <Line key={idx+100} color={"lightgrey"} start={[0, tickLength, 0]} end={[0, tickLength, -zLength]} /> // grid
              <TextBox opts={opts} text={1970 + 5 * item} anchorX={"center"} anchorY={"top"} />
            </mesh>
        })
      }
      {
        Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
          return <mesh position={[-tickLength, item * ((yLength - 2 * yPadding) / (ySteps - 1)), 0]}>
              <Line key={idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} /> // tick
              <Line key={idx+100} color={"lightgrey"} start={[tickLength, 0, 0]} end={[xLength, 0, 0]} /> // grid
              <TextBox opts={opts} text={0 + 10 * item} anchorX={"right"} anchorY={"middle"} />
            </mesh>
        })
      }
      {
        Array(zSteps).fill(0).map((x, y) => x + y).map((item, idx) => {
          return <mesh position={[-tickLength, 0, zPadding + item * ((zLength - 2 * zPadding) / (zSteps - 1))]}>
              <Line key={idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} /> // tick
              <Line key={idx+100} color={"lightgrey"} start={[tickLength, 0, 0]} end={[xLength, 0, 0]} /> // grid
              <TextBox opts={opts} text={String.fromCharCode(65+item)} anchorX={"right"} anchorY={"middle"} />
            </mesh>
        })
      }

      <Line color={"black"} start={[0, 0, zLength]} end={[xLength, 0, zLength]} /> // X-Axis
      <Line color={"black"} start={[0, 0, 0]} end={[0, yLength, 0]} /> // Y-Axis
      <Line color={"black"} start={[0, 0, 0]} end={[0, 0, zLength]} /> // Z-Axis

      <Lines
        values={[101, 99.2, 94.9, 85.5, 77, 70.7, 64.9, 59.9, 55.4, 52.3, 50.3]}
        color={"rgb(42, 46, 91)"} dpSize={dpSize} xPadding={xPadding} xLength={xLength} yPadding={yPadding} yLength={yLength} zPos={zPadding + (zLength - 2 * zPadding) / (zSteps - 1) * 0} />
      <Lines
        values={[82.9, 72.2, 61.2, 52.7, 44.2, 40.9, 38.5, 38.3, 36.6, 36.3, 39.5]}
        color={"rgb(92, 96, 141)"} dpSize={dpSize} xPadding={xPadding} xLength={xLength} yPadding={yPadding} yLength={yLength} zPos={zPadding + (zLength - 2 * zPadding) / (zSteps - 1) * 1} />
      <Lines
        values={[50, 54, 58.6, 54.4, 52.1, 46.8, 43.3, 40.4, 42.2, 49.5, 56]}
        color={"rgb(142, 146, 191)"} dpSize={dpSize} xPadding={xPadding} xLength={xLength} yPadding={yPadding} yLength={yLength} zPos={zPadding + (zLength - 2 * zPadding) / (zSteps - 1) * 2} />
    </group>
  )
}

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

function DataPoint({size, pos}){
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  useCursor(hovered)
  return (
    <mesh
      ref={ref}
      position={[pos.x, pos.y, pos.z]}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={(e) => setHovered(false)}>
      <sphereGeometry args={[size, 32, 16]} />
      <meshStandardMaterial color={"rgb(50, 50, 50)"} roughness={1} transparent opacity={hovered? "1" : "0"} />
    </mesh>
  )
}

function Lines({values, color, xPadding, xLength, yPadding, yLength, zPos, dpSize}){
  const width = 0.3, depth = 5;
  let shape = new THREE.Shape();
  shape.moveTo(xPadding, yPadding + values[0] / 100 * yLength - width);
  Array(values.length).fill(0).map((x, y) => x + y).map((item, idx) => {
    shape.lineTo(
      xPadding + item * ((xLength - 2 * xPadding) / (values.length - 1)),
      yPadding + values[item] / 100 * yLength + width
    );
  })
  Array(values.length).fill(0).map((x, y) => x + y).map((item, idx) => {
    shape.lineTo(
      xPadding + (values.length - 1 - item) * ((xLength - 2 * xPadding) / (values.length - 1)),
      yPadding + values[(values.length - 1 - item)] / 100 * yLength - width
    );
  })
  const geometry = new THREE.ExtrudeBufferGeometry(shape, { bevelEnabled: false, depth: depth });
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry));
  const ColorShiftMaterial = shaderMaterial(
    {
      color1: new THREE.Color("darkblue"),
      color2: new THREE.Color("lightbeige"),
      bboxMin: new THREE.Vector3(0, 0, 0),
      bboxMax: new THREE.Vector3(0, yLength, 0)
    },
    glsl`
      uniform vec3 bboxMin;
      uniform vec3 bboxMax;

      varying vec2 vUv;

      void main() {
        vUv.y = (position.y - bboxMin.y) / (bboxMax.y - bboxMin.y);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    glsl`
      uniform vec3 color1;
      uniform vec3 color2;

      varying vec2 vUv;

      void main() {

        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
    `
  )
  extend({ ColorShiftMaterial })

  return (
    <>
      <mesh position={[0, 0, zPos - depth / 2]}>
        <extrudeBufferGeometry args={[shape, { bevelEnabled: false, depth: depth }]} />
        <colorShiftMaterial  attach="material" />
      </mesh>
      <mesh position={[0, 0, zPos - depth / 2]}>
        <lineSegments geometry={edges} renderOrder={100}>
          <lineBasicMaterial color="lightgrey"/>
        </lineSegments>
      </mesh>
      {
        Array(values.length).fill(0).map((x, y) => x + y).map((item, idx) => {
          return <DataPoint
              key={idx}
              size={dpSize}
              pos={{
                x: xPadding + item * ((xLength - 2 * xPadding) / (values.length - 1)),
                y: yPadding + values[item] / 100 * yLength,
                z: zPos
              }}
            />
        })
      }
    </>
  )
}

function ImmVisComponent({...props}) {
  const ref = useRef();
  const mainCamera = useRef();
  const [{ objects, cycle }, set] = useState({ objects: [], cycle: 0 })
  const [dimension, setDimension] = useState(props.dimension);
  const [data, setData] = useState(props.data);

  const scale = 1.5;
  const xyzProps = {
    xSteps: 11,
    ySteps: 11,
    zSteps: 3,
    xLength: 57.33 * scale,
    yLength: 34.398 * scale,
    zLength: 20 * scale,
    xPadding: 3.07125 * scale,
    yPadding: 0 * scale,
    zPadding: 2 * scale
  }
  let target = [0, 0, 4.5]

  let animator = "Animator-" + props.index;
  let radioName = animator + "-radio";

  function animate(radio){
    let state = -1;
    Array.prototype.forEach.call(document.getElementsByClassName(animator), (el, idx) => {
      if(el.checked){
        state = idx-1;
        console.log(state);
        if(state == 0){
          target = [1, 1, 3.5];
        }else if(state == 1){
          target = [0, 0, 4.5]
        }else if(state == 2){
          target = [0, 4.5, 0]
        }
      }
    });
  }
  // useLayoutEffect(() => {
  //   ref.current.camera.lookAt();
  // }, [lookAt])


  return (
    <div style={{display: "flex", flexDirection:"column"}}>
      <div>
        {Array(props.steps).fill(1).map((x) => x).map((item) => (
          <input type="radio" className={animator} name={radioName} onChange={animate(this)} key={Math.floor(Math.random()*(99999-1))} value={item} />
        ))}
      </div>
      <div style={{fontSize: "20px"}}> Children and Elderly per 100 Adults </div>
      <Canvas ref={ref} style={{width: dimension.width, height: dimension.height * 1.2}} dpr={Math.max(window.devicePixelRatio, 2)}>
        <PerspectiveCamera ref={mainCamera} makeDefault
          position={[xyzProps.xLength / 2, xyzProps.yLength / 2, 100 * scale]}
          fov={20 * scale}
          far={50000 * scale}
          />
        <CycleRaycast onChanged={(objects, cycle) => set({ objects, cycle })} />
        <OrbitControls
          camera={mainCamera.current}
          enablePan={true}
          enableZoom={true}
          zoomSpeed={0.25/scale}
          style={{zIndex: 5}}/>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MainGroup scale={scale} position={[0, 0, 0]} target={target} xyzProps={xyzProps}/>
      </Canvas>
    </div>
  )
}

export default ImmVisComponent;
