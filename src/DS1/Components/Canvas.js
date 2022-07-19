import * as THREE from 'three'
import React, { useRef, useCallback, useEffect, useLayoutEffect, useState, useImperativeHandle, useMemo, Suspense } from 'react'
import { Canvas as THREECanvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';
import { MiniMap } from '../../BasicElements/MiniMap.js';

import * as IMM from '../Animations/Immersive.js';
import * as ANM from '../Animations/Animated.js';
import { Line, TextBox, Rect, If } from '../../BasicElements/BasicElements.js';
import { statesConverter, AnimationGenerator } from '../../BasicElements/BasicElements.js';
import { xyzProps, XAXIS1, YAXIS1, YAXIS2, ZAXIS1, totalFrame, TextComponentHeight, groupVarNum, camVarNum } from '../../BasicElements/Constants.js';
import { title, text1, text2, text3, text4, text5, text6 } from '../../BasicElements/Constants.js';
import { Immersive, Animated } from '../../BasicElements/Constants.js';
import '../styles/Canvas.css';

let scale = 6.25;
const tickLength = 0.6;

const xLength = xyzProps.xLength, yLength = xyzProps.yLength, zLength = xyzProps.zLength;
const xPadding = xyzProps.xPadding, yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
const xSteps = xyzProps.xSteps, ySteps = xyzProps.ySteps, zSteps = xyzProps.dataA1.length;
const centerPos = [
  -xyzProps.xLength / 2,
  -xyzProps.yLength / 2,
  -xyzProps.zLength / 2
];
const rectDepth = 2;
const ratio = 5 / 3;
const color1 = new THREE.Color("#512C8A");
const color2 = new THREE.Color("#2F9B39");

function AxGr({step}){
  const XAxis1 = useMemo(() =>
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
    </>, [step]);

  const YAxis1 = useMemo(() =>
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
  </>, [step]);

  const YAxis2 = useMemo(() =>
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
  </>, [step]);

  const ZAxis1 = useMemo(() =>
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
  </>, [step]);

  return(
    <group position={centerPos}>
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

function MainGroup1(props){
  const xStep = 8;
  const rectWidth = 6, rectDepth = 2;

  const BarGroup1 = useMemo(() =>
  <group position={centerPos}>
    {
      xyzProps.dataA1.map((item, idx) => {
        return <mesh key={idx}
          position={[
            xPadding + 0 * ((xLength - 2 * xPadding) / (xSteps - 1)) + rectWidth / (idx == 0?  -1.5 : 1.5),
            0,
            zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) - rectDepth / 2]}>
            <Rect width={rectWidth} height={item} depth={rectDepth} color={color1} opacity={idx==xyzProps.dataA1.length-1?1:1}/>
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
            <Rect key={idx} width={rectWidth} height={item} depth={rectDepth} color={color2} opacity={idx==xyzProps.dataB1.length-1?1:1}/>
          </mesh>
      })
    }
  </group>, []);

  return(
    <>{BarGroup1}</>
  );
}

function MainGroup2({step, opacity}){

  const BarGroup2 = useMemo(() =>
  <group position={centerPos}>
    {
      xyzProps.dataA1.map((item, idx) => {
        return <mesh
          key={idx}
          position={[
            0 + xyzProps.dataA2[idx] / ratio /2,
            0,
            zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) - rectDepth / 2]}>
            <Rect width={xyzProps.dataA2[idx] / ratio} height={item} depth={rectDepth} color={color1}
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
            <Rect width={xyzProps.dataB2[idx] / ratio} height={item} depth={rectDepth} color={color2}
              opacity={
                step<=8? (idx >= 5)? opacity : 1
                  : step<=10? (idx > 4 )? opacity : (idx < 4)? 1.2 - opacity : 1
                  : (idx < 4)? 1.2 - opacity: 1
                }
            />
          </mesh>
      })
    }
  </group>, [step, opacity]);

  return(
    <>{BarGroup2}</>
  )
}

function TextGroup({texts, position, type}){

  return (
    <group>{
      texts.map((text, idx) =>
        <TextBox
          key={"textBox_"+type+idx}
          text={text}
          textType={type}
          position={position[idx]}
          lookAt={false}
          anchorX={"center"}
          anchorY={"top"}
        />
      )}
    </group>
  )
}

const TextComponent = React.forwardRef((props, ref) =>{

  const textPos = [-xyzProps.xLength / 2, -xyzProps.yLength / 2, -xyzProps.zLength / 2];
  const xWidth = -2*textPos[0]
  const titles = [title];
  const texts = [text1, text2, text3, text4, text5, text6];

  return(
    <group ref={ref}>
      <TextGroup texts={titles} type={"title"}
        position={[[0, -0.000 * TextComponentHeight, 0]]} />
      <TextGroup texts={texts} type={"plain"}
        position={[
          [0, -0.100 * TextComponentHeight, 0],
          [xWidth*0.75, -0.320 * TextComponentHeight, 0],
          [0, -0.480 * TextComponentHeight, 0],
          [0, -0.640 * TextComponentHeight, 0],
          [0, -0.830 * TextComponentHeight, 0],
          [0, -1.000 * TextComponentHeight, 0],
        ]} />
    </group>
  );
});

const VisComponent = React.forwardRef((props, ref) =>{
  return(
    <group position={[0, 0, 0]} ref={ref}>
      <AxGr step={props.step} />
      <If if={props.step < 4}>
        <MainGroup1 />
      </If>
      <If if={props.step >= 4}>
        <MainGroup2 step={props.step} opacity={props.opacity} />
      </If>
    </group>
  );
});

const OrthoCamera = React.forwardRef((props, ref) => {
  return(
    <>
      <OrthographicCamera ref={ref} makeDefault
        position={[0, 0, 1000]}
        near={0}
        far={50000}
        zoom={props.zoom}
        />
      <OrbitControls
        camera={ref.current}
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        zoomSpeed={0.25/props.zoom}
        style={{zIndex: 5}}/>
      <ambientLight
        intensity={0.6}/>
    </>
  );
});

function Canvas({mode}) {
  // CanvasI는 mode 정보를 받아서 어떤 크기로 Canvas를 만들지 결정합니다.
  // 또한 CanvasComponents; Camera, Viz, Texts의 frame별 행동(animation)을 결정하기 위한 기저 변수들을 memo합니다.
  // 해당 정보는 CanvasI가 eventListener를 통해 얻은 scroll value를 실제 스크롤이 아닌, progress 정도로 변환한 진행 척도와 함께 전달됩니다.

  const canvas = useRef();
  const speed = 0.35, smooth = 12, limit = 2.5 / window.devicePixelRatio;
  let scroll = 0;
  let target = 0;
  const [idx, setIdx] = useState(0);

  // animation에 관련한 정보들은 페이지가 처음 읽힐 때 memo가 이루어집니다.(baked)
  const stoppers        = useMemo(() => IMM.stoppers_DS1, []);
  const clipPositions   = useMemo(() => IMM.clipPositions_DS1, []);
  const clips           = useMemo(() => IMM.getClips(), []);
  const transitions     = useMemo(() => IMM.getTransitions(), []);
  const animations      = useMemo(() => AnimationGenerator(totalFrame, clipPositions, stoppers, clips, transitions), []);
  const steps           = useMemo(() => statesConverter(clipPositions, stoppers), []);

  // 핸들 휠은 그냥 휠 이벤트가 발견되면 scroll을 계산하고, idx를 찾아서 수정합니다.
  // CanvasI의 유일한 state는 idx입니다! 이는 CanvasComponents로 넘겨지며, 이외의 Components들은 바뀔 일이 없어야 합니다.
  const handleWheel = useCallback((e) => {
    let currentIdx = Math.floor(scroll * totalFrame) == totalFrame? totalFrame-1 : Math.floor(scroll * totalFrame);
    // animation[1] here is camera animation which always has "zoom"
    const delta = e.wheelDelta;
    const normalizedScroll = (Math.abs(delta * speed) > limit ? limit * (-delta * speed) / Math.abs(delta * speed) : (-delta * speed));

    scroll = Math.max(0, Math.min(scroll + normalizedScroll / 1000, 1)); // limit the progress equal or under 1
    let newIdx = Math.floor(scroll * totalFrame) == totalFrame? totalFrame-1 : Math.floor(scroll * totalFrame);
    if(idx != newIdx){
      target = newIdx;
      // console.log("idx changed to: ", idx, newIdx);
    }
  }, [speed, limit, totalFrame]);

  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      console.log(target);
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setIdx(prevIdx => {
        console.log(prevIdx);
        return (Math.floor(prevIdx + (target - prevIdx) * 0.07))}
      );
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useLayoutEffect(() =>{
    canvas.current.addEventListener('wheel', handleWheel, {passive: false});
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className={"Canvas" + (mode==Immersive?'I': mode==Animated?'A':'S')}>
      <Suspense fallback={<></>}>
        <THREECanvas
          ref={canvas}
          dpr={Math.max(window.devicePixelRatio, 2)}
          gl={{ alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}
          >
          <CanvasComponents mode={mode} idx={idx} steps={steps} animations={animations} />
        </THREECanvas>
      </Suspense>
    </div>
  )
}

function CanvasComponents({mode, idx, steps, animations, ...props}){
  const mainCamera = useRef();
  const mainViz = useRef();
  const mainText = useRef();

  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState(6.25);
  const [opacity, setOpacity] = useState(1);

  useFrame((state, delta) => {
    if(mode == Animated || mode == Immersive){
      let preStep = steps.findIndex((ele) => ele >= idx/totalFrame) - 1;
      setStep(2*Math.floor((preStep-1)/3)+(preStep%3==1?1:2));

      let animation_group1 = animations[0]["animation"][idx];
      let animation_camera = animations[1]["animation"][idx];

      if(mainViz.current && mainText.current && mainCamera.current){
        setOpacity(animation_group1.opacity);
        mainViz.current.position.setX(animation_group1.pos[0]);
        mainViz.current.position.setY(animation_group1.pos[1]);
        mainViz.current.position.setZ(animation_group1.pos[2]);
        mainViz.current.rotation.x = animation_group1.rot[0];
        mainViz.current.rotation.y = animation_group1.rot[1];
        mainViz.current.rotation.z = animation_group1.rot[2];

        setZoom(animation_camera.zoom);
        mainCamera.current.position.setX(animation_camera.pos[0]);
        mainCamera.current.position.setY(animation_camera.pos[1]);
        mainCamera.current.position.setZ(animation_camera.pos[2]);
        mainCamera.current.zoom = animation_camera.zoom;
        mainCamera.current.updateProjectionMatrix();
        mainCamera.current.lookAt(0, 0, 0);

        mainText.current.position.multiply(new THREE.Vector3(0, 0, 0));
        mainText.current.position.setY(idx / totalFrame * TextComponentHeight);
        mainText.current.position.multiply(new THREE.Vector3(
          0, 1, 0
        )).add(new THREE.Vector3(
            mainCamera.current.position.x,
            mainCamera.current.position.y,
            mainCamera.current.position.z
          ).normalize().multiplyScalar(20000)
        ).add(new THREE.Vector3(
          mainCamera.current.position.x,
          mainCamera.current.position.y,
          mainCamera.current.position.z
        ));
        mainText.current.lookAt(mainCamera.current.position.x, mainCamera.current.position.y, mainCamera.current.position.z);
      }
    }
  });

  return(
    <>
      <OrthoCamera ref={mainCamera} zoom={zoom} />
      <VisComponent ref={mainViz} step={step} opacity={opacity} />
      <TextComponent ref={mainText} />
      <MiniMap />
    </>
  )
}

export { Canvas };
