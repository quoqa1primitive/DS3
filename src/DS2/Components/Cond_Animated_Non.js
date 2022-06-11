import * as THREE from 'three'
import React, { useRef, useEffect, useLayoutEffect, useState, useImperativeHandle, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';

import { Line, TextBox, Rect, TextComponent } from '../../BasicElements/BasicElements.js'
import { XAXIS1, YAXIS1, YAXIS2, ZAXIS1, title, text1, text2, text3, text4, text5 } from '../../BasicElements/Constants.js'
import '../styles/Cond_Animated_Non.css';

const bezier = require('bezier-easing');

const STEP_XY = 100;
const STEP_ZY = 101;
const STEP_ZX = 110;

const scale = 6.25;
const tickLength = 0.6;
const speed = 0.035;

const xyzProps = {
  xSteps: 2,  xLength: 60,  xPadding: 15,
  ySteps: 11, yLength: 60,  yPadding: 0,
  zSteps: 3,  zLength: 100, zPadding: 10,
  dataA1: [30, 60, 70, 80, 90, 130, 140, 150, 150, 170, 180, 210],
  dataB1: [90, 90, 100, 100, 110, 120, 120, 140, 140, 150, 160, 180],
  dataA2: [60, 60, 60, 55, 55, 55, 50, 50, 50, 45, 40, 40],
  dataB2: [30, 40, 40, 50, 50, 50, 60, 70, 70, 70, 70, 80]
}

const xLength = xyzProps.xLength, yLength = xyzProps.yLength, zLength = xyzProps.zLength;
const xPadding = xyzProps.xPadding, yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
const xSteps = xyzProps.xSteps, ySteps = xyzProps.ySteps, zSteps = xyzProps.dataA1.length;

function Rect2({ width, height, depth, color, opacity }){
  return(
    <mesh raycast={() => null} position={[0, height / 10, 0]}>
      <boxGeometry args={[width, height / 5, depth]} />
      <meshStandardMaterial color={color} transparent={true} opacity={opacity} />
    </mesh>
  )
}

function VisComponent({camera, scroll, ...props}){
  const group = useRef();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState({a: 1, b: 1, c: 1});
  const [centerPos, setCenterPos] = useState([-xyzProps.xLength / 2, -xyzProps.yLength / 2, -xyzProps.zLength / 2])

  const rectWidth = 6, rectDepth = 2, ratio = 3;

  const box1 = document.getElementById("text1").getBoundingClientRect();
  const box3 = document.getElementById("text3").getBoundingClientRect();
  const box4 = document.getElementById("text4").getBoundingClientRect();
  const scrollHeight = scroll.current * (document.getElementById("pageController").scrollHeight - window.innerHeight);

  const text1 = scrollHeight + box1.top - window.innerHeight * 0.5 + 100 + box1.height * 0.5;
  const text3 = scrollHeight + box3.top - window.innerHeight * 0.5 + 100 + box3.height * 0.5;
  const text4 = scrollHeight + box4.top - window.innerHeight * 0.5 + 100 + box4.height * 0.5;

  const sp_1 = text1 / (document.getElementById("pageController").scrollHeight - window.innerHeight);
  const sp_2 = text3 / (document.getElementById("pageController").scrollHeight - window.innerHeight);
  const sp_3 = text4 / (document.getElementById("pageController").scrollHeight - window.innerHeight);

  useFrame(() => {
    const et = scroll.current;

    let bezierFunc = bezier(0.4, 0, 0.4, 1);
    let bzVal = 0;
    const durMargin = 0.03;

    if(et < (sp_1 - durMargin)){
      setStep(1);
      setProgress({a: 0, b: 0, c: 0});
    }else if(et < (sp_1 + durMargin)){
      setStep(2);
      setProgress({a: 0, b: 0, c: 0});
    }else if(et < (sp_2 - durMargin)){
      setStep(3);
      let et2 = et - sp_1 - durMargin;
      let dur2 = sp_2 - durMargin - sp_1 - durMargin;
      bzVal = bezierFunc(et2 / dur2);
      setProgress({a: bzVal, b: bzVal, c: 0});
    }else if(et < (sp_2 + durMargin)){
      setStep(4);
      setProgress({a: 1, b: 1, c: 0});
    }else if(et < (sp_3 - durMargin)){
      setStep(5);
      let et3 = et - sp_2 - durMargin;
      let dur3 = sp_3 - durMargin - sp_2 - durMargin;
      bzVal = bezierFunc(et3 / dur3);
      setProgress({a: 1, b: 1, c: bzVal});
    }else if(et < (sp_3 + durMargin)){
      setStep(6);
      setProgress({a: 1, b: 1, c: 1});
    }

    setCenterPos([
      progress.b * -xyzProps.zLength / 2 + (1 - progress.b) * -xyzProps.xLength / 2,
      -xyzProps.yLength / 2,
      -xyzProps.zLength / 2
    ]);
    camera.current.lookAt(0, 0, 0);
  });

  return(
    <group ref={group}>
      <group position={centerPos}>
        <>
          {
            Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
              return (
                <mesh key={idx} position={[-tickLength, item * ((yLength - 2 * yPadding) / (ySteps - 1)), 0]}>
                  {
                    (step >=2 && step <= 4) &&
                    <>
                      <Line key={idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} /> // Tick
                      <TextBox text={0 + 30 * item} anchorX={"right"} anchorY={"middle"} /> // Label
                    </>
                  }
                  {
                    (step >= 6) &&
                    <>
                      <Line key={idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} /> // Tick
                      <TextBox text={0 + 10 * item} anchorX={"right"} anchorY={"middle"} /> // Label
                    </>
                  }
                  <Line key={idx+100} color={"lightgrey"} start={[tickLength, 0, -200]} end={[(1 - progress.b) * xLength + progress.b * zLength, 0, -200]} /> // Grid
                </mesh>
              )
            })
          }
          {
            (step >= 2 && step <= 4) &&
            <>
              <group position={[-6, yLength / 2, -6]}>
                <TextBox text={"Meat Consumption(ton)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS1}/>
              </group>
            </>
          }
          {
            (step >= 6) &&
            <>
              <group position={[-6, yLength / 2, -6]}>
                <TextBox text={"Food Self-Sufficiency(%)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS2}/>
              </group>
            </>
          }
        </>
        <>
          {
            Array(xSteps).fill(0).map((x, y) => x + y).map((item, idx) => {
              return(
                <mesh key={idx} position={[xPadding + item * ((xLength - 2 * xPadding) / (xSteps - 1)), -tickLength, zLength]}>
                {
                  (step <= 2) &&
                  <>
                    <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} /> // Tick
                    <TextBox text={String.fromCharCode(88+item)} anchorX={"center"} anchorY={"top"} /> // Label
                  </>
                }
                {
                  (step == 2) &&
                  <>
                    <group position={[-4, (idx==0?xyzProps.dataA1[0]:xyzProps.dataB1[0]) / 5 + 3, 0]}>
                      <TextBox text={"Jan."} anchorX={"center"} anchorY={"bottom"} label={null}/>
                    </group>
                    <group position={[4, (idx==0?xyzProps.dataA1[xyzProps.dataA1.length - 1]:xyzProps.dataB1[xyzProps.dataB1.length - 1]) / 5 + 3, 0]}>
                      <TextBox text={"Dec."} anchorX={"center"} anchorY={"bottom"} label={null}/>
                    </group>
                  </>
                }
                </mesh>
              )
            })
          }
          {
            Array(xyzProps.dataA1.length).fill(0).map((x, y) => x + y).map((item, idx) => {
              return <mesh key={idx} position={[zPadding + item * ((zLength - 2 * zPadding) / (zSteps - 1)), -tickLength,0]}>
                  {
                    (step >= 4) &&
                    <>
                      <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} /> // Tick
                      <TextBox text={1 + 1 * item} anchorX={"center"} anchorY={"top"} /> // Label
                    </>
                  }
                </mesh>
            })
          }
          {
            (step <= 2) &&
            <>
              <group position={[xLength / 2, -6, 0]}>
                <TextBox text={"City"} anchorX={"center"} anchorY={"bottom"} label={XAXIS1}/>
              </group>
            </>
          }
          {
            (step >= 4) &&
            <>
              <group position={[zLength / 2, -6, 0]}>
                <TextBox text={"Month"} anchorX={"center"} anchorY={"bottom"} label={ZAXIS1}/>
              </group>
            </>
          }
        </>
        {
          (step >= 2) &&
          <Line color={"black"} start={[0, 0, 0]} end={[0, yLength, 0]} /> // Y-Axis
        }
        <Line color={"black"} start={[0, 0, 0]} end={[(1 - progress.b) * xLength + progress.b * zLength, 0, 0]} /> // X-Axis

      </group>
      <group position={centerPos}>
        {
          <>
            <mesh key={0} position={[
              (xPadding + 0 * ((xLength - 2 * xPadding) / (xSteps - 1)) + rectWidth / -1.5) * (1 - progress.b) + (zPadding + 0 * ((zLength - 2 * zPadding) / (zSteps - 1)) - rectDepth / 2) * progress.b
              , 0, -100]}>
              <Rect2
                width={rectWidth * (1 - progress.b) + rectDepth * progress.b}
                height={(1 - progress.c) * xyzProps.dataA1[0] + progress.c * xyzProps.dataA2[0] * ratio}
                depth={rectDepth} color={new THREE.Color("#512C8A")} opacity={1} />
            </mesh>
            <mesh key={1} position={[
              (xPadding + 0 * ((xLength - 2 * xPadding) / (xSteps - 1)) + rectWidth / 1.5) * (1 - progress.b) + (zPadding + (xyzProps.dataA1.length - 1) * ((zLength - 2 * zPadding) / (zSteps - 1)) - rectDepth / 2) * progress.b
              , 0, -100]}>
              <Rect2
                width={rectWidth * (1 - progress.b) + rectDepth * progress.b}
                height={(1 - progress.c) * xyzProps.dataA1[xyzProps.dataA1.length - 1] + progress.c * xyzProps.dataA2[xyzProps.dataA2.length - 1] * ratio}
                depth={rectDepth} color={new THREE.Color("#512C8A")} opacity={1} />
            </mesh>
            <mesh key={2} position={[
              (xPadding + 1 * ((xLength - 2 * xPadding) / (xSteps - 1)) + rectWidth / -1.5) * (1 - progress.b) + (zPadding + 0 * ((zLength - 2 * zPadding) / (zSteps - 1)) + rectDepth / 2) * progress.b
              , 0, -100]}>
              <Rect2
                width={rectWidth * (1 - progress.b) + rectDepth * progress.b}
                height={(1 - progress.c) * xyzProps.dataB1[0] + progress.c * xyzProps.dataB2[0] * ratio}
                depth={rectDepth} color={new THREE.Color("#2F9B39")} opacity={1} />
            </mesh>
            <mesh key={3} position={[
              (xPadding + 1 * ((xLength - 2 * xPadding) / (xSteps - 1)) + rectWidth / 1.5) * (1 - progress.b) + (zPadding + (xyzProps.dataA1.length - 1) * ((zLength - 2 * zPadding) / (zSteps - 1)) + rectDepth / 2) * progress.b
              , 0, -100]}>
              <Rect2
                width={rectWidth * (1 - progress.b) + rectDepth * progress.b}
                height={(1 - progress.c) * xyzProps.dataB1[xyzProps.dataB1.length - 1] + progress.c * xyzProps.dataB2[xyzProps.dataB2.length - 1] * ratio}
                depth={rectDepth} color={new THREE.Color("#2F9B39")} opacity={1} />
            </mesh>
          </>
        }
        {
          xyzProps.dataA1.map((item, idx) => {
            return (
              <>
              {
                (idx != 0 && idx != xyzProps.dataA1.length - 1) &&
                <mesh key={idx} position={[(1 - progress.b) * (xPadding + 0 * ((xLength - 2 * xPadding) / (xSteps - 1))) + progress.b * (zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) - rectDepth / 2), 0, -100]}>
                  <Rect2 width={rectDepth} height={progress.b * ((1 - progress.c) * item + progress.c * xyzProps.dataA2[idx] * ratio)} depth={rectWidth} color={new THREE.Color("#512C8A")} opacity={1}/>
                </mesh>
              }
              </>
            )
          })
        }
        {
          xyzProps.dataB1.map((item, idx) => {
            return (
              <>
              {
                (idx != 0 && idx != xyzProps.dataA1.length - 1) &&
                <mesh key={idx} position={[(1 - progress.b) * (xPadding + 1 * ((xLength - 2 * xPadding) / (xSteps - 1))) + progress.b * (zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) + rectDepth / 2), 0, -100]}>
                  <Rect2 key={idx} width={rectDepth} height={progress.b * ((1 - progress.c) * item + progress.c * xyzProps.dataB2[idx] * ratio)} depth={rectWidth} color={new THREE.Color("#2F9B39")} opacity={1}/>
                </mesh>
              }
              </>
            )
          })
        }
      </group>
    </group>
  )
}

function CanvasAN({overlay, scroll}) {
  const canvas = useRef();
  const mainCamera = useRef();

  return (
    <div className={"CanvasAN"}>
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

export { CanvasAN };
