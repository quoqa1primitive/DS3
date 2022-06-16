import * as THREE from 'three'
import React, { useRef, useEffect, useLayoutEffect, useState, useImperativeHandle, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';

import { LineMark, Line, TextBox, Rect, If } from '../../BasicElements/BasicElements.js';
import { statesConverter, AnimationGenerator } from '../../BasicElements/BasicElements.js';
import { xyzProps, XAXIS1, YAXIS1, YAXIS2, ZAXIS1, totalFrame, groupVarNum, camVarNum } from '../../BasicElements/Constants.js';
import { ImmersiveNon, ImmersiveImm } from '../../BasicElements/Constants.js';
import '../styles/Cond_Immersive.css';

let scale = 6.25;
const tickLength = 0.6;

const xLength = xyzProps.xLength, yLength = xyzProps.yLength, zLength = xyzProps.zLength;
const xPadding = xyzProps.xPadding, yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
const xSteps = xyzProps.xSteps, ySteps = xyzProps.ySteps, zSteps = xyzProps.dataA1.length;
const rectDepth = 2;
const ratio = 5 / 3;

function AxGr({step, position}){
  const XAxis1 =
    <>
      {
        Array(xSteps).fill(0).map((x, y) => x + y).map((item, idx) => {
          return <mesh key={idx} position={[xPadding + item * ((xLength - 2 * xPadding) / (xSteps - 1)), -tickLength, zLength]}>
            <If if={step <= 2}>
              <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} /> // Tick
              <TextBox text={String.fromCharCode(88+item)} anchorX={"center"} anchorY={"top"} /> // Label
            </If>
            <If if={step <= 4}>
              <Line key={idx+100} color={"lightgrey"} start={[0, tickLength, 0]} end={[0, tickLength, -zLength]} /> // Grid
            </If>
            <If if={step <= 2}>
              <group position={[-4, (idx==0?xyzProps.dataA1[0]:xyzProps.dataB1[0]) / 5 + 3, 0]}>
                <TextBox text={"Jan."} anchorX={"center"} anchorY={"bottom"} label={null}/> // X-Axis2
              </group>
              <group position={[4, (idx==0?xyzProps.dataA1[xyzProps.dataA1.length - 1]:xyzProps.dataB1[xyzProps.dataB1.length - 1]) / 5 + 3, 0]}>
                <TextBox text={"Dec."} anchorX={"center"} anchorY={"bottom"} label={null}/> // X-Axis2
              </group>
            </If>
          </mesh>
        })
      }
      <If if={step <= 2}>
        <group position={[xLength / 2, -6, zLength]}>
          <TextBox text={"City"} anchorX={"center"} anchorY={"bottom"} label={XAXIS1}/>
        </group>
      </If>
    </>

  const YAxis1 =
  <>
    {
      Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[-tickLength, item * ((yLength - 2 * yPadding) / (ySteps - 1)), 0]}>
          <If if={step >= 1 && step <= 4}>
            <Line key={idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} /> // Tick
            <TextBox text={0 + 30 * item} anchorX={"right"} anchorY={"middle"} /> // Label
          </If>
          <If if={step <= 4}>
            <Line key={idx+100} color={"lightgrey"} start={[tickLength, 0, 0]} end={[xLength, 0, 0]} /> // Grid
          </If>
          <If if={step >= 2 && step <= 5}>
            <Line key={idx+200} color={"lightgrey"} start={[xLength, 0, 0]} end={[xLength, 0, zLength]} /> // Grid
          </If>
        </mesh>
      })
    }
    <If if={step >= 1 && step <= 4}>
      <group position={[-6, yLength / 2, -6]}>
        <TextBox text={"Food Consumption(ton)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS1}/>
      </group>
    </If>
  </>

  const YAxis2 =
  <>
    {
      Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[yPadding + item * ((yLength - 2 * yPadding) / (ySteps - 1)), -tickLength, -tickLength]}>
          <If if={step >= 6}>
            <Line key={idx} color={"black"} start={[0, 0, tickLength]} end={[0, 0, 0]} /> // Tick
            <TextBox text={0 + 10 * item} anchorX={"right"} anchorY={"middle"} /> // Label
          </If>
          <If if={step >= 5}>
              <Line key={idx+100} color={"lightgrey"} start={[0, 0, 0]} end={[0, 0, zLength]} /> // Grid
          </If>
        </mesh>
      })
    }
    <If if={step >= 6}>
      <group position={[xLength / 2, 0, -6]}>
        <TextBox text={"Vegetable + Grain Consumption(%)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS2}/>
      </group>
    </If>
  </>

  const ZAxis1 =
  <>
    {
      Array(xyzProps.dataA1.length).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[0, -tickLength, zPadding + item * ((zLength - 2 * zPadding) / (zSteps - 1))]}>
          <If if={step >= 4}>
            <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} /> // Tick
            <TextBox text={1 + 1 * item} anchorX={"center"} anchorY={"top"} /> // Label
          </If>
          <Line key={idx+100} color={"lightgrey"} start={[0, tickLength, 0]} end={[xLength, tickLength, 0]} /> // Grid
        </mesh>
      })
    }
    <If if={step >= 4}>
      <group position={[-6, -6, zLength / 2]}>
        <TextBox text={"Month"} anchorX={"center"} anchorY={"bottom"} label={ZAXIS1}/>
      </group>
    </If>
  </>

  return(
    <group position={position}>
      {XAxis1}
      {YAxis1}
      {ZAxis1}
      {YAxis2}
      <If if={step <= 4}>
        <Line color={"black"} start={[0, 0, zLength]} end={[xLength, 0, zLength]} /> // X-Axis
        <Line color={"black"} start={[0, 0, 0]} end={[0, yLength, 0]} /> // Y-Axis
      </If>
      <If if={step == 5}>
        <Line color={"black"} start={[xLength, 0, 0]} end={[xLength, yLength, 0]} /> // Second Y-Axis
      </If>
      <Line color={"black"} start={[0, 0, 0]} end={[0, 0, zLength]} /> // Z-Axis
      <If if={step >= 4}>
        <Line color={"black"} start={[0, 0, 0]} end={[xLength, 0, 0]} /> // X-Axis2
      </If>
    </group>
  )
}

function MainGroup1({step, position, target}){
  const xStep = 8;
  const rectWidth = 6, rectDepth = 2;

  return <group position={position}>
    {
      xyzProps.dataA1.map((item, idx) => {
        return <mesh key={idx}
          position={[
            xPadding + 0 * ((xLength - 2 * xPadding) / (xSteps - 1)) + rectWidth / (idx == 0?  -1.5 : 1.5),
            0,
            zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) - rectDepth / 2]}>
            <Rect width={rectWidth} height={item} depth={rectDepth} color={new THREE.Color("#512C8A")} opacity={idx==xyzProps.dataA1.length-1?1:1}/>
          </mesh>
      })
    }
    {
      xyzProps.dataB1.map((item, idx) => {
        return <mesh key={idx}
            position={[
              xPadding + 1 * ((xLength - 2 * xPadding) / (xSteps - 1)) + rectWidth / (idx == 0?  -1.5 : 1.5),
              0,
              zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) + rectDepth / 2]}>
            <Rect key={idx} width={rectWidth} height={item} depth={rectDepth} color={new THREE.Color("#2F9B39")} opacity={idx==xyzProps.dataB1.length-1?1:1}/>
          </mesh>
      })
    }
  </group>
}

function MainGroup2({step, position, target, opacity}){
  return(
    <group position={position}>
      {
        xyzProps.dataA1.map((item, idx) => {
          return <mesh
            key={idx}
            position={[
              0 + xyzProps.dataA2[idx] / ratio /2,
              0,
              zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) - rectDepth / 2]}>
              <Rect width={xyzProps.dataA2[idx] / ratio} height={item} depth={rectDepth} color={new THREE.Color("#512C8A")}
                opacity={
                  step<=8? (idx >= 5)? opacity : 1
                    : step<=10? (idx > 4)? opacity : (idx < 4)? 1.2 - opacity : 1
                    : (idx < 4)? 1.2 - opacity: 1
                  }
              />
            </mesh>
        })
      }
      {
        xyzProps.dataB1.map((item, idx) => {
          return <mesh
            key={idx}
            position={[
              0 + xyzProps.dataB2[idx] / ratio / 2,
              0,
              zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) + rectDepth / 2]}>
              <Rect width={xyzProps.dataB2[idx] / ratio} height={item} depth={rectDepth} color={new THREE.Color("#2F9B39")}
                opacity={
                  step<=8? (idx >= 5)? opacity : 1
                    : step<=10? (idx > 4 )? opacity : (idx < 4)? 1.2 - opacity : 1
                    : (idx < 4)? 1.2 - opacity: 1
                  }
              />
            </mesh>
        })
      }
    </group>
  )
}

function VisComponent({camera, scroll, states, stoppers, animations, ...props}){
  const group = useRef();
  const [step, setStep] = useState(0);
  const [opacity, setOpacity] = useState(0.2);
  const [steps, setSteps] = useState(statesConverter(states, stoppers));

  useFrame(() => {
    const et = scroll.current;
    // console.log(et);
    let idx = Math.floor(et * totalFrame) == totalFrame? totalFrame-1 : Math.floor(et * totalFrame);
    let animation_group1 = animations[0]["animation"][idx];
    let animation_camera = animations[1]["animation"][idx];

    let preStep = steps.findIndex((ele) => ele >= et) - 1;
    setStep(2*Math.floor((preStep-1)/3)+(preStep%3==1?1:2));

    group.current.position.setX(animation_group1.pos[0]);
    group.current.position.setY(animation_group1.pos[1]);
    group.current.position.setZ(animation_group1.pos[2]);
    group.current.rotation.x = animation_group1.rot[0];
    group.current.rotation.y = animation_group1.rot[1];
    group.current.rotation.z = animation_group1.rot[2];
    setOpacity(animation_group1.opacity);

    camera.current.position.setX(animation_camera.pos[0]);
    camera.current.position.setY(animation_camera.pos[1]);
    camera.current.position.setZ(animation_camera.pos[2]);
    camera.current.zoom = animation_camera.zoom;

    camera.current.updateProjectionMatrix();
    camera.current.lookAt(0, 0, 0);
  });

  const centerPos = [
    -xyzProps.xLength / 2,
    -xyzProps.yLength / 2,
    -xyzProps.zLength / 2
  ]

  const xStep = 10;
  return(
    <group position={[0, 0, 0]} ref={group}>
      <AxGr step={step} position={centerPos} xyzProps={xyzProps} />
      <If if={step < 4}>
        <MainGroup1 step={step} position={centerPos} xyzProps={xyzProps} />
      </If>
      <If if={step >= 4}>
          <MainGroup2 step={step} position={centerPos} xyzProps={xyzProps} opacity={opacity} />
      </If>
    </group>
  )
}

function CanvasI({mode, overlay, scroll}) {
  const canvas = useRef();
  const mainCamera = useRef();
  const [stateCalculated, setStateCalculated] = useState(false)
  const stoppers = useMemo(() => [0.01, 0.04, 0.04, 0.04, 0.02, 0.02, 0.02, 0.01]);
  const [states, setStates] = useState([0.00, 0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 1.00]);
  const [animations, setAnimations] = useState([]);
  const clips = useMemo(() => getClips());
  const transitions = useMemo(() => getTransitions());

  function getClips(){
    let clips = [];
    clips.push({
      "target": "group1", "name": "group1_init",
      "pos": [0, 0, 0], "rot": [0, 0, 0], "opacity": 1,
    });
    clips.push({
      "target": "group1", "name": "group1_XY",
      "pos": [0, 0, 0], "rot": [0, Math.PI/2, 0], "opacity": 1,
    });
    clips.push({
      "target": "group1", "name": "group1_ZY",
      "pos": [0, 0, 0], "rot": [0, Math.PI/2, Math.PI/2], "opacity": 1,
    });
    clips.push({
      "target": "group1", "name": "group1_zoom1",
      "pos": [30, 10, 0], "rot": [0, Math.PI/2, Math.PI/2], "opacity": 0.2,
    });
    clips.push({
      "target": "group1", "name": "group1_zoom2",
      "pos": [-20, 0, 0], "rot": [0, Math.PI/2, Math.PI/2], "opacity": 1,
    });
    clips.push({
      "target": "group1", "name": "group1_last",
      "pos": [0, 0, 0], "rot": [0, Math.PI/2, Math.PI/2], "opacity": 0.2,
    });

    clips.push({
      "target": "camera", "name": "cam_init",
      "pos": [0, 0, 6250], "rot": [0, 0, 0], "zoom": 6.25,
    });
    clips.push({
      "target": "camera", "name": "cam_zoom1",
      "pos": [0, 0, 6250], "rot": [0, 0, 0], "zoom": 12,
    });
    clips.push({
      "target": "camera", "name": "cam_zoom2",
      "pos": [0, 0, 6250], "rot": [0, 0, 0], "zoom": 9,
    });
    return clips;
  }
  function getTransitions(){
    let transitions = [];
    transitions.push({
      "target": "group1",
      "from": {"frame": 1, "clip": "group1_init"}, "to": {"frame": 2, "clip": "group1_XY"},
      "easing": "bezier",
      "motion": {
        "type": "linear", // sin, linear, ...
        "args": {
          // if sin, there must exist height
        }
      }
    });
    transitions.push({
      "target": "group1",
      "from": {"frame": 2, "clip": "group1_XY"}, "to": {"frame": 3, "clip": "group1_ZY"},
      "easing": "bezier",
      "motion": {
        "type": "linear", // sin, linear, ...
        "args": {
          // if sin, there must exist height
        }
      }
    });
    transitions.push({
      "target": "group1",
      "from": {"frame": 3, "clip": "group1_ZY"}, "to": {"frame": 4, "clip": "group1_zoom1"},
      "easing": "bezier",
      "motion": {
        "type": "linear", // sin, linear, ...
        "args": {
          // if sin, there must exist height
        }
      }
    });
    transitions.push({
      "target": "group1",
      "from": {"frame": 4, "clip": "group1_zoom1"}, "to": {"frame": 5, "clip": "group1_zoom2"},
      "easing": "bezier",
      "motion": {
        "type": "linear", // sin, linear, ...
        "args": {
          // if sin, there must exist height
        }
      }
    });
    transitions.push({
      "target": "group1",
      "from": {"frame": 5, "clip": "group1_zoom2"}, "to": {"frame": 6, "clip": "group1_last"},
      "easing": "bezier",
      "motion": {
        "type": "linear", // sin, linear, ...
        "args": {
          // if sin, there must exist height
        }
      }
    });
    transitions.push({
      "target": "camera",
      "from": {"frame": 1, "clip": "cam_init"}, "to": {"frame": 2, "clip": "cam_init"},
      "easing": "bezier",
      "motion": {
        "attribute": "pos",
        "type": "sin", // sin, linear, ...
        "args": {
          "axis": 1, // 0=x, 1=y, 2=z, pos should have axis
          "height": 1000 // sin should have height
        }
      }
    });
    transitions.push({
      "target": "camera",
      "from": {"frame": 2, "clip": "cam_init"}, "to": {"frame": 3, "clip": "cam_init"},
      "easing": "bezier",
      "motion": {
        "attribute": "pos",
        "type": "sin", // sin, linear, ...
        "args": {
          "axis": 0, // 0=x, 1=y, 2=z, pos should have axis
          "height": -1000 // sin should have height
        }
      }
    });
    transitions.push({
      "target": "camera",
      "from": {"frame": 3, "clip": "cam_init"}, "to": {"frame": 4, "clip": "cam_zoom1"},
      "easing": "bezier",
      "motion": {
        "type": "linear", // sin, linear, ...
        "args": {
          // if sin, there must exist height
        }
      }
    });
    transitions.push({
      "target": "camera",
      "from": {"frame": 4, "clip": "cam_zoom1"}, "to": {"frame": 5, "clip": "cam_zoom2"},
      "easing": "bezier",
      "motion": {
        "type": "linear", // sin, linear, ...
        "args": {
          // if sin, there must exist height
        }
      }
    });
    transitions.push({
      "target": "camera",
      "from": {"frame": 5, "clip": "cam_zoom2"}, "to": {"frame": 6, "clip": "cam_init"},
      "easing": "bezier",
      "motion": {
        "type": "linear", // sin, linear, ...
        "args": {
          // if sin, there must exist height
        }
      }
    });

    return transitions;
  }

  useLayoutEffect(() => {
    console.log("setStates");
    const length = 6;
    let boxes = [], texts = [], sp = [];
    for(let i=0; i<length; i++){
      boxes[i] = document.getElementById("text" + (i+1).toString()).getBoundingClientRect();
    }
    const scrollHeight = scroll.current * (document.getElementById("pageController").scrollHeight - window.innerHeight);

    for(let i=0; i<length; i++){
      texts[i] = scrollHeight - window.innerHeight * 0.5 + boxes[i].top + boxes[i].height * 0.5 + 100;
      sp[i] = texts[i] / (document.getElementById("pageController").scrollHeight - window.innerHeight);
    }

    setStates([0.00, sp[0], sp[1], sp[2], sp[3], sp[4], sp[5], 1.00]);
    setStateCalculated(true);
  }, []);

  useEffect(() =>{
    if(stateCalculated){
      setAnimations(AnimationGenerator(states, stoppers, clips, transitions));
    }
  }, [states])

  return (
    <div className={"CanvasI" + (mode==ImmersiveNon?'N':'I')}>
      <Canvas
        ref={canvas}
        onCreated={(state) => state.events.connect(overlay.current.ref1)}
        dpr={Math.max(window.devicePixelRatio, 2)}>
        <OrthographicCamera ref={mainCamera} makeDefault
          position={[0, 0, 1000 * scale]}
          near={0}
          far={50000 * scale}
          zoom={1 * scale}
          />
        <OrbitControls
          camera={mainCamera.current}
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          zoomSpeed={0.25/scale}
          style={{zIndex: 5}}/>
        <ambientLight
          intensity={0.5}/>
        <Suspense fallback={null}>
          <VisComponent
            states={states}
            camera={mainCamera}
            states={states}
            stoppers={stoppers}
            animations={animations}
            scroll={scroll} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export { CanvasI };