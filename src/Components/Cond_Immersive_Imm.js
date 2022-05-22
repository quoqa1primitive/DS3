import * as THREE from 'three'
import React, { useRef, useEffect, useLayoutEffect, useState, useImperativeHandle, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';

import './styles/Cond_Immersive_Imm.css';
import { Immersive, TextComponent, title, text1, text2, text3, text4, text5, text6, Line, TextBox, Rect, XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from './BasicElements.js';

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
    // console.log(ref1);
    ref1.current.addEventListener('wheel', handleWheel, {passive: false});
    ref1.current.addEventListener('scroll', handleScroll, {passive: true});
  },[])

  function handleWheel(e){
    console.log(e);
    e.preventDefault();
    e.stopPropagation();

    const speed = 1, smooth = 12, limit = 15 / window.devicePixelRatio ;
    const delta = e.wheelDelta
    ref1.current.scrollTop += (Math.abs(delta * speed) > limit? limit * (-delta * speed) / Math.abs(delta * speed) : (-delta * speed))
    console.log(e.target)
    // e.target.scrollTop = Math.max(0, Math.min(e.target.scrollTop, e.target.scrollHeight - window.innerHeight)) // limit scrolling
  }

  function handleScroll(e){
    console.log(e.target.scrollTop);
    scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
    scrollLog.current.push([Date.now() - startTime, scroll.current.toFixed(3)]);
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

const STEP_XY = 100;
const STEP_ZY = 101;
const STEP_ZX = 110;

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

function VisComponent({camera, scroll, ...props}){
  const group = useRef();
  const [step, setStep] = useState(0);
  const [opacity, setOpacity] = useState(0.2);

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

  const durMargin = 0.04;
  const div1 = [sp[0] - durMargin, sp[0] + durMargin];
  const div2 = [sp[1] - durMargin, sp[1] + durMargin];
  const div3 = [sp[2] - durMargin, sp[2] + durMargin * 0.5];
  const div4 = [sp[3] - durMargin * 0.5, sp[3] + durMargin * 0.5];
  const div5 = [sp[4] - durMargin * 0.5, sp[4] + durMargin * 0.5];
  const div6 = [sp[5] - durMargin * 0.5, sp[5] + durMargin * 0.5];


  useFrame(() => {
    const et = scroll.current;

    let bezierFunc = bezier(0.4, 0, 0.4, 1);
    let bzVal = 0;


    if(et < div1[0]){
      setStep(1);
      // bzVal = bezierFunc((et - 0) / div1[0]);
      // group.current.rotation.y = -Math.PI / 6 * (1 - bzVal);
      // group.current.rotation.z = 0;
      // camera.current.position.y = 2000 * (1 - bzVal);
      setOpacity(1.0);
      // camera.current.updateProjectionMatrix();
      group.current.rotation.y = 0;
      group.current.rotation.z = 0;
      camera.current.position.y = 0;
      camera.current.updateProjectionMatrix();
    }else if(et < div1[1]){
      setStep(2);
      setOpacity(1.0);
      group.current.rotation.y = 0;
      group.current.rotation.z = 0;
      camera.current.position.y = 0;
      camera.current.updateProjectionMatrix();
    }else if(et < div2[0]){
      setStep(3);
      let et2 = et - div1[1];
      let dur2 = div2[0] - div1[1];
      bzVal = bezierFunc(et2 / dur2);
      group.current.rotation.y = Math.PI / 2 * bzVal;
      group.current.rotation.z = 0;
      camera.current.position.y = 1000 * Math.sin(bzVal * Math.PI);
      camera.current.updateProjectionMatrix();
    }else if(et < div2[1]){
      setStep(4);
      group.current.rotation.y = Math.PI / 2;
      group.current.rotation.z = 0;
      camera.current.position.y = 1000 * Math.sin(bzVal * Math.PI);
      camera.current.updateProjectionMatrix();
    }else if(et < div3[0]){
      setStep(5);
      let et3 = et - div2[1];
      let dur3 = div3[0] - div2[1];
      bzVal = bezierFunc(et3 / dur3);
      group.current.rotation.y = Math.PI / 2;
      group.current.rotation.z = Math.PI / 2 * bzVal;
      camera.current.position.x = -1000 * Math.sin(bzVal * Math.PI);
      camera.current.updateProjectionMatrix();
    }else if(et < div3[1]){
      setStep(6);
      group.current.rotation.y = Math.PI / 2;
      group.current.rotation.z = Math.PI / 2;
      camera.current.position.x = 0;
    }else if(et < div4[0]){
      setStep(7);
      let et4 = et - div3[1];
      let dur4 = div4[0] - div3[1];
      bzVal = bezierFunc(et4 / dur4);
      group.current.position.setX(30 * bzVal);
      group.current.position.setY(10 * bzVal);
      camera.current.zoom = 6.25 + 5.75 * bzVal;
      setOpacity(1 - 0.8 * bzVal);
      camera.current.updateProjectionMatrix();
    }else if(et < div4[1]){
      setStep(8);
      group.current.position.setX(30);
      group.current.position.setY(10);
      camera.current.zoom = 12.00;
      setOpacity(0.2);
      camera.current.updateProjectionMatrix();
    }else if(et < div5[0]){
      setStep(9);
      let et5 = et - div4[1];
      let dur5 = div5[0] - div4[1];
      bzVal = bezierFunc(et5 / dur5);
      camera.current.zoom = 9.00 + 3.00 * (1 - bzVal);
      group.current.position.setX(30 + -50 * bzVal);
      group.current.position.setY(10 * (1 - bzVal));
      setOpacity(0.2 + 0.8 * bzVal);
      camera.current.updateProjectionMatrix();
    }else if(et < div5[1]){
      setStep(10);
      group.current.position.setX(-20);
      group.current.position.setY(0);
      camera.current.zoom = 9.00;
      setOpacity(1.0);
      camera.current.updateProjectionMatrix();
    }else if(et < div6[0]){
      setStep(11);
      let et6 = et - div5[1];
      let dur6 = div6[0] - div5[1];
      bzVal = bezierFunc(et6 / dur6);
      group.current.position.setX(-20 + 20 * bzVal);
      camera.current.zoom = 6.25 + 2.75 * (1 - bzVal);
      setOpacity(0.2 + 0.8 * (1-bzVal));
      camera.current.updateProjectionMatrix();
    }else{
      setStep(12);
      group.current.position.setX(0);
      camera.current.zoom = 6.25;
      camera.current.updateProjectionMatrix();
    }

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
          <VisComponent camera={mainCamera} scroll={scroll} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export { CanvasII, OverlayII };
