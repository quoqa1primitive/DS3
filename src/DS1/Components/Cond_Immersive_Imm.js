import * as THREE from 'three'
import React, { useRef, useEffect, useLayoutEffect, useState, useImperativeHandle, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';

import '../styles/Cond_Immersive_Imm.css';
import { TextComponent, Line, TextBox, Rect } from '../../BasicElements/BasicElements.js';
import { statesConverter, AnimationGenerator } from '../../BasicElements/BasicElements.js';
import { title, text1, text2, text3, text4, text5, text6, XAXIS1, YAXIS1, YAXIS2, ZAXIS1, totalFrame, groupVarNum, camVarNum } from '../../BasicElements/Constants.js';

function OverlayII({ scroll, scrollLog, quiz, onClick }, ref){
  const ref1 = useRef();
  const ref2 = useRef();
  const [startTime, setStartTime] = useState(Date.now());
  const [isFirstButton, setIsFirstButton] = useState(true);

  useImperativeHandle(ref, () => ({
    focus: () => {
     ref1.current.focus();
    },
    get ref1() {
        return ref1.current;
    },
    get ref2() {
        return ref2.current;
    }
    // ... whatever else one may need
  }));

  useEffect(()=>{
    ref1.current.addEventListener('wheel', handleWheel, {passive: false});
    ref1.current.addEventListener('scroll', handleScroll, {passive: true});
  },[])

  function handleWheel(e){
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();

    const speed = 1, smooth = 12, limit = 15 / window.devicePixelRatio ;
    const delta = e.wheelDelta
    ref1.current.scrollTop += (Math.abs(delta * speed) > limit? limit * (-delta * speed) / Math.abs(delta * speed) : (-delta * speed))
    // console.log(e.target)
    // e.target.scrollTop = Math.max(0, Math.min(e.target.scrollTop, e.target.scrollHeight - window.innerHeight)) // limit scrolling
  }

  function handleScroll(e){
    // console.log(e.target.scrollTop);
    scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
    // scrollLog.current.push([Date.now() - startTime, scroll.current.toFixed(3)]);
  }

  return (
    <div
      className="PageController PageControllerII"
      id="pageController"
      ref={ref1}>
      <div className="TitleContainer">
        <div className="Title">{title}</div>
      </div>
      <div className={"Texts"}>
        <TextComponent id={"text1"} text={text1} left={"calc(50% + 240px)"}         margin={"800px"} />
        <TextComponent id={"text2"} text={text2} left={"calc(50% + 450px - 200px)"} margin={"800px"} />
        <TextComponent id={"text3"} text={text3} left={"calc(50% - 450px + 140px)"} margin={"600px"} />
        <TextComponent id={"text4"} text={text4} left={"calc(50% - 450px + 340px)"} margin={"600px"} />
        <TextComponent id={"text5"} text={text5} left={"calc(50% - 450px + 540px)"} margin={"600px"} />
        <TextComponent id={"text6"} text={text6} left={"calc(50% - 450px + 240px)"} margin={"500px"} />
        <div className="ButtonContainer" >
          <button className="Button" ref={ref2} type="button" onClick={()=>{ onClick()}}> Go to Quiz </button>
        </div>
      </div>
    </div>
  )
}

OverlayII = React.forwardRef(OverlayII);

const bezier = require('bezier-easing');

let scale = 6.25;
const tickLength = 0.6;
const speed = 0.035;

const xyzProps = {
  xSteps: 2,  xLength: 60,  xPadding: 15,
  ySteps: 11, yLength: 60,  yPadding: 0,
  zSteps: 3,  zLength: 100, zPadding: 10,
  dataA1: [50, 60, 60, 70, 70, 120, 170, 180, 190, 190, 200, 200],
  dataB1: [40, 40, 50, 60, 60, 80, 80, 100, 100, 120, 130, 140],
  dataA2: [45, 45, 40, 45, 40, 45, 40, 35, 30, 35, 30, 30],
  dataB2: [40, 40, 35, 35, 45, 50, 55, 60, 60, 60, 65, 65]
}

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
              {
                (step <= 2) &&
                <>
                  <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} /> // Tick
                  <TextBox text={String.fromCharCode(88+item)} anchorX={"center"} anchorY={"top"} /> // Label
                </>
              }
              {
                (step <= 4) &&
                <Line key={idx+100} color={"lightgrey"} start={[0, tickLength, 0]} end={[0, tickLength, -zLength]} /> // Grid
              }
              {
                (step <= 2) &&
                <>
                  <group position={[-4, (idx==0?xyzProps.dataA1[0]:xyzProps.dataB1[0]) / 5 + 3, 0]}>
                    <TextBox text={"Jan."} anchorX={"center"} anchorY={"bottom"} label={null}/> // X-Axis2
                  </group>
                  <group position={[4, (idx==0?xyzProps.dataA1[xyzProps.dataA1.length - 1]:xyzProps.dataB1[xyzProps.dataB1.length - 1]) / 5 + 3, 0]}>
                    <TextBox text={"Dec."} anchorX={"center"} anchorY={"bottom"} label={null}/> // X-Axis2
                  </group>
                </>
              }
            </mesh>
        })
      }
      {
        (step <= 2) &&
        <>
          <group position={[xLength / 2, -6, zLength]}>
            <TextBox text={"City"} anchorX={"center"} anchorY={"bottom"} label={XAXIS1}/>
          </group>
        </>
      }
    </>

  const YAxis1 =
  <>
    {
      Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[-tickLength, item * ((yLength - 2 * yPadding) / (ySteps - 1)), 0]}>
            {
              (step >= 1 && step <= 4) &&
              <>
                <Line key={idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} /> // Tick
                <TextBox text={0 + 30 * item} anchorX={"right"} anchorY={"middle"} /> // Label
              </>
            }
            {
              (step <= 4) &&
              <Line key={idx+100} color={"lightgrey"} start={[tickLength, 0, 0]} end={[xLength, 0, 0]} /> // Grid
            }
            {
              (step >= 2 && step <= 5) &&
              <Line key={idx+200} color={"lightgrey"} start={[xLength, 0, 0]} end={[xLength, 0, zLength]} /> // Grid
            }
          </mesh>
      })
    }
    {
      (step >= 1 && step <= 4) &&
      <>
        <group position={[-6, yLength / 2, -6]}>
          <TextBox text={"Food Consumption(ton)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS1}/>
          <>{
            // (step == 4) &&
            // <>
            //   <group position={[0, yLength / 2 - yLength / 10, 6 + zLength / 10]}>
            //     <Rect width={12} height={12} depth={1.2 * ratio} color={new THREE.Color("#512C8A")} />
            //     <TextBox text={"    X"} anchorX={"left"} anchorY={"bottom"} label={XAXIS1}/>
            //   </group>
            //   <group position={[0, yLength / 2 - yLength / 10 - 4, 6 + zLength / 10]}>
            //     <Rect width={12} height={12} depth={1.2 * ratio} color={new THREE.Color("#2F9B39")} />
            //     <TextBox text={"    Y"} anchorX={"left"} anchorY={"bottom"} label={XAXIS1}/>
            //   </group>
            // </>
          }</>
        </group>
      </>
    }
  </>

  const YAxis2 =
  <>
    {
      Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[yPadding + item * ((yLength - 2 * yPadding) / (ySteps - 1)), -tickLength, -tickLength]}>
            {
              (step >= 6) &&
              <>
                <Line key={idx} color={"black"} start={[0, 0, tickLength]} end={[0, 0, 0]} /> // Tick
                <TextBox text={0 + 10 * item} anchorX={"right"} anchorY={"middle"} /> // Label
              </>
            }
            {
              (step >= 5) &&
              <>
                <Line key={idx+100} color={"lightgrey"} start={[0, 0, 0]} end={[0, 0, zLength]} /> // Grid
              </>
            }
          </mesh>
      })
    }
    {
      (step >= 6) &&
      <>
        <group position={[xLength / 2, 0, -6]}>
          <TextBox text={"Vegetable + Grain Consumption(%)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS2}/>
        </group>
      </>
    }
  </>

  const ZAxis1 =
  <>
    {
      Array(xyzProps.dataA1.length).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[0, -tickLength, zPadding + item * ((zLength - 2 * zPadding) / (zSteps - 1))]}>
            {
              (step >= 4) &&
              <>
                <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} /> // Tick
                <TextBox text={1 + 1 * item} anchorX={"center"} anchorY={"top"} /> // Label
              </>
            }
            <Line key={idx+100} color={"lightgrey"} start={[0, tickLength, 0]} end={[xLength, tickLength, 0]} /> // Grid
          </mesh>
      })
    }
    {
      (step >= 4) &&
      <>
        <group position={[-6, -6, zLength / 2]}>
          <TextBox text={"Month"} anchorX={"center"} anchorY={"bottom"} label={ZAXIS1}/>
        </group>
      </>
    }
  </>

  return(
    <group position={position}>
      {XAxis1}
      {YAxis1}
      {ZAxis1}
      {YAxis2}
      {
        (step <= 4) &&
        <>
          <Line color={"black"} start={[0, 0, zLength]} end={[xLength, 0, zLength]} /> // X-Axis
          <Line color={"black"} start={[0, 0, 0]} end={[0, yLength, 0]} /> // Y-Axis
        </>
      }
      {
        (step == 5) &&
        <Line color={"black"} start={[xLength, 0, 0]} end={[xLength, yLength, 0]} /> // Second Y-Axis
      }
      <Line color={"black"} start={[0, 0, 0]} end={[0, 0, zLength]} /> // Z-Axis
      {
        (step >= 4) &&
        <Line color={"black"} start={[0, 0, 0]} end={[xLength, 0, 0]} /> // X-Axis2
      }

    </group>
  )
}

function MainGroup1({step, position, target}){
  const rectWidth = 6, rectDepth = 2;

  return(
    <group position={position}>
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
  )
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
  const [steps, setSteps] = useState(statesConverter(states, stoppers, new Array(states.length)).states)

  useFrame(() => {
    const et = scroll.current;
    console.log(et);
    let idx = Math.floor(et * totalFrame) == 1000? 999 : Math.floor(et * totalFrame);
    let posX = animations[0][idx];
    let posY = animations[1][idx];
    let rotY = animations[2][idx];
    let rotZ = animations[3][idx];
    let opac = animations[4][idx];

    setStep(steps.findIndex((ele) => ele >= et) - 1)
    group.current.position.setX(posX);
    group.current.position.setY(posY);
    group.current.rotation.y = rotY;
    group.current.rotation.z = rotZ;
    setOpacity(opac);

    let camPosX = animations[5][idx];
    let camPosY = animations[6][idx];
    let camZoom = animations[7][idx];

    camera.current.position.setX(camPosX);
    camera.current.position.setY(camPosY);
    camera.current.zoom = camZoom;

    camera.current.updateProjectionMatrix();
    camera.current.lookAt(0, 0, 0);
  });

  const centerPos = [
    -xyzProps.xLength / 2,
    -xyzProps.yLength / 2,
    -xyzProps.zLength / 2
  ]

  return(
    <group position={[0, 0, 0]} ref={group}>
      <AxGr step={step} position={centerPos} xyzProps={xyzProps} />
      {
        (step < 4) &&
          <MainGroup1 step={step} position={centerPos} xyzProps={xyzProps} />
      }
      {
        (step >= 4) &&
          <MainGroup2 step={step} position={centerPos} xyzProps={xyzProps} opacity={opacity} />
      }
    </group>
  )
}

function CanvasII({overlay, scroll}) {
  const canvas = useRef();
  const mainCamera = useRef();
  const [states_values, setStates_values] = useState([])
  const [states, setStates] = useState([0.00, 0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 1.00]);
  const [stoppers, setStoppers] = useState([0.00, 0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 1.00]);
  const [animations, setAnimations] = useState([]);

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
    }

    for(let i=0; i<length; i++){
      sp[i] = texts[i] / (document.getElementById("pageController").scrollHeight - window.innerHeight);
    }

    setStates([0.00, sp[0], sp[1], sp[2], sp[3], sp[4], sp[5], 1.00]);
    setStoppers([0.00, 0.04, 0.04, 0.04, 0.02, 0.02, 0.02, 0.00]);
  }, []);

  useEffect(() =>{
    console.log("setGroupAnimation");

    let posts_1 = ['bezier', 'bezier', 'bezier', 'bezier', 'bezier', 'bezier', 'bezier'];
    let posts_2 = ['bezier', 'sin', 'bezier', 'bezier', 'bezier', 'bezier', 'bezier'];
    let posts_3 = ['bezier', 'bezier', 'sin', 'bezier', 'bezier', 'bezier', 'bezier'];

    let animations = [];
    let groupVals = [];

    let groupVal_posX = [0, 0, 0, 0, 30, -20, 0, 0];
    animations.push(AnimationGenerator(states, stoppers, groupVal_posX, posts_1));

    let groupVal_posY = [0, 0, 0, 0, 10, 0, 0, 0];
    animations.push(AnimationGenerator(states, stoppers, groupVal_posY, posts_1));

    let groupVal_rotX = [0, 0, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2];
    animations.push(AnimationGenerator(states, stoppers, groupVal_rotX, posts_1));

    let groupVal_rotY = [0, 0, 0, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2, Math.PI/2];
    animations.push(AnimationGenerator(states, stoppers, groupVal_rotY, posts_1));

    let groupVal_opac = [1, 1, 1, 1, 0.2, 1.0, 0.2, 0.2];
    animations.push(AnimationGenerator(states, stoppers, groupVal_opac, posts_1));

    let camVal_posX = [0, 0, 0, 0, 0, 0, 0, 0];
    animations.push(AnimationGenerator(states, stoppers, camVal_posX, posts_3));

    let camVal_posY = [0, 0, 0, 0, 0, 0, 0, 0];
    animations.push(AnimationGenerator(states, stoppers, camVal_posY, posts_2));

    let camVal_zoom = [6.25, 6.25, 6.25, 6.25, 12, 9, 6.25, 6.25];
    animations.push(AnimationGenerator(states, stoppers, camVal_zoom, posts_1));

    setAnimations(animations)

    console.log(animations);
  }, [states, stoppers])

  return (
    <div className={"CanvasII"}>
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

export { CanvasII, OverlayII };
