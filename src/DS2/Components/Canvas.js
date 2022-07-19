import * as THREE from 'three'
import React, { useRef, useCallback, useEffect, useLayoutEffect, useState, useMemo, Suspense } from 'react'
import { Canvas as THREECanvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei';
import { Sky } from '../../BasicElements/Sky.js';
import { MiniMap } from '../../BasicElements/MiniMap.js';

import * as IMM from '../Animations/Immersive.js';
import * as ANM from '../Animations/Animated.js';
import { Ocean, Disc, Line, ChangePoint, Rect, TextBox, If } from '../../BasicElements/BasicElements.js';
import { statesConverter, AnimationGenerator } from '../../BasicElements/BasicElements.js';
import { xyzProps, XAXIS1, YAXIS1, YAXIS2, ZAXIS1, totalFrame, TextComponentHeight } from '../../BasicElements/Constants2.js';
import { title, text1, text2, text3, text4, text5 } from '../../BasicElements/Constants2.js';
import { Immersive, Animated, Static } from '../../BasicElements/Constants2.js';
import '../styles/Canvas.css';

let scale = 6.25;
const tickLength = 0.6;

const xLength = xyzProps.xLength, yLength = xyzProps.yLength, zLength = 0;
const xPadding = xyzProps.xPadding, yPadding = xyzProps.yPadding, zPadding = 0;
const xSteps = xyzProps.xSteps, ySteps = xyzProps.ySteps, zSteps = 0;
const centerPos = [
  -xLength / 2,
  -yLength / 2,
  -zLength / 2
];
const color_beige = new THREE.Color("#f8f5f0");
const color1 = new THREE.Color("#512C8A");
const color2 = new THREE.Color("#2F9B39");
const color3 = new THREE.Color("#A49096");
const color4 = new THREE.Color("#B4A0A6");
const color_greenTop = new THREE.Color("#328039");
const color_ocean1 = new THREE.Color("#7db5ff");
const color_ocean2 = new THREE.Color("#8cdbed");


function AxGr({step}){
  const XAxis1 = useMemo(() =>
    <>
      {
        Array(xSteps).fill(0).map((x, y) => x + y).map((item, idx) => {
          return <mesh key={idx} position={[xPadding + item * ((xLength - 2 * xPadding) / (xSteps - 1)), -tickLength, zLength]}>
            <If if={true}>
              <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} />
              <TextBox text={0 + idx * 1 + "M"} anchorX={"center"} anchorY={"top"} />
            </If>
          </mesh>
        })
      }
      <If if={true}>
        <group position={[xLength / 2, -6, zLength]}>
          <TextBox text={"Population"} anchorX={"center"} anchorY={"bottom"} label={XAXIS1}/>
        </group>
      </If>
    </>, [step]);

  const YAxis1 = useMemo(() =>
  <>
    {
      Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[-tickLength, xyzProps.yPadding + (item + 1) * (yLength - 2 * yPadding) / ySteps, 0]}>
          <If if={idx % 2 == 0}>
            <Line key={idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} />
            <TextBox text={(idx>=(ySteps-2)?"> ":"") + (5 + 5 * item) + "K"} anchorX={"right"} anchorY={"middle"} />
            <Line key={idx+100} color={"lightgrey"} start={[tickLength, 0, 0]} end={[xLength, 0, 0]} />
          </If>
        </mesh>
      })
    }
    <If if={true}>
      <group position={[-10, yLength / 2, 6]}>
        <TextBox text={"Median Household Income(A$)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS1}/>
      </group>
    </If>
  </>, [step]);

  return(
    <group position={centerPos}>
      {XAxis1}
      {YAxis1}
      <If if={true}>
        <Line color={"black"} start={[0, 0, zLength]} end={[xLength, 0, zLength]} />
        <Line color={"black"} start={[0, 0, 0]} end={[0, yLength, 0]} />
      </If>
      <If if={step >= 2 && step <= 3}>
        <ChangePoint
          color={"black"} linewidth={3} text={"Change Point"}
          start={[0, yLength / 2, zLength+1]}
          end={[xLength, yLength / 2, zLength+1]} />
      </If>
      <If if={step >= 9}>
        <ChangePoint
          color={"black"} linewidth={3} text={"Change Point"}
          start={[0, yLength * 0.74, zLength+1]}
          end={[xLength, yLength * 0.74, zLength+1]} />
      </If>
    </group>
  )
}

function DiscGroup(props){
  const ref = useRef();

  let scaleWeight = 1;
  let discPosition = xyzProps.yPadding;
  let radius = [10, 12, 15, 18, 42, 35, 31, 19, 11, 5];
  let xMax = 50;
  let height = (xyzProps.yLength - xyzProps.yPadding * 2) / (radius.length);
  let animationSpeed = 1.5;

  const animating = false;

  useFrame((clock) =>{
    if(props.step >= 3 && props.step <= 8 && animating){
      // corner view makes discGroup breathe...?
      ref.current.position.x = xyzProps.xPadding + 2.0 * Math.sin(clock.clock.elapsedTime);
      ref.current.position.y = 0                 + 1.5 * Math.sin(clock.clock.elapsedTime);
      ref.current.position.z = -4                + 2.0 * Math.sin(clock.clock.elapsedTime);

      ref.current.rotation.x = 2.5 * Math.PI / 360 + 0.8 * Math.PI / 360 * Math.sin(animationSpeed * 0.7 * clock.clock.elapsedTime);
      ref.current.rotation.y = 0.0 * Math.PI / 360 + 0.0 * Math.PI / 360 * Math.sin(animationSpeed * 1.3 * clock.clock.elapsedTime + 1);
      ref.current.rotation.z = -2.0 * Math.PI / 360 + 0.0 * Math.PI / 360 * Math.sin(animationSpeed * 0.6 * clock.clock.elapsedTime + 2);
    }else{
      // init the positiona and rotation for legibility
      ref.current.position.x = xyzProps.xPadding + (ref.current.position.x - xyzProps.xPadding) * 0.85;
      ref.current.position.y = 0 + ref.current.position.y * 0.85;
      ref.current.position.z = 0 + ref.current.position.z * 0.85;

      ref.current.rotation.x = 0 + ref.current.rotation.x * 0.85;
      ref.current.rotation.y = 0 + ref.current.rotation.y * 0.85;
      ref.current.rotation.z = 0 + ref.current.rotation.z * 0.85;
    }
  })

  const DiscGroup1 = useMemo(() =>
  <group position={centerPos}>
    <group ref={ref} position={[xyzProps.xPadding, 0, 0]}>
    {
      Array(10).fill(0).map((x, y) => x + y).map((item, idx) => {
        return(
          <Disc
            key={idx}
            bottomPosition={discPosition + (idx+0.5) * height}
            radius={radius[idx] * (xyzProps.xLength - xyzProps.xPadding * 2) / xMax}
            height={height - 0.1}
            color={color_greenTop}
            greenTop={(idx == radius.length-1) || (radius[idx+1] < radius[idx])} />
        );
      })
    }
    </group>
  </group>, []);

  return(
    <>{DiscGroup1}</>
  );
}

function OceanGroup(props){
  const ref = useRef();

  let scaleWeight = 1;
  let radius = [10, 12, 15, 18, 42, 35, 31, 19, 11, 5];
  let height = (xyzProps.yLength - xyzProps.yPadding * 2) / (radius.length);

  useFrame((clock) =>{
    if(props.step >= 3){
      // water level shift
      ref.current.position.y = props.waterLevel * 100 + 0 * Math.sin(0.4 * clock.clock.elapsedTime);
    }else{
      // init the position
      ref.current.position.y = props.waterLevel * 100;
    }
  })

  const OceanGroup1 = useMemo(() =>
    <group ref={ref} position={[0, 0, 4000]}>
      {
        <group position={[0, -xyzProps.yLength/2, 0]}>
          <Rect width={10000} height={1} depth={10000} color={color_ocean2} opacity={0.8}/>
        </group>
      }
      {
        // <Ocean surfacePosition={-xyzProps.yLength/2} />
      }
    </group>, []);

  return(
    <>{OceanGroup1}</>
  );
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

  const titles = [title];
  const texts = [text1, text2, text3, text4, text5];

  return(
    <group ref={ref}>
      <TextGroup texts={titles} type={"title"}
        position={[[0, -0.000 * TextComponentHeight, 0]]} />
      <TextGroup texts={texts} type={"plain"}
        position={[
          [0, -0.160 * TextComponentHeight, 0],
          [0, -0.330 * TextComponentHeight, 0],
          [0, -0.500 * TextComponentHeight, 0],
          [0, -0.700 * TextComponentHeight, 0],
          [0, -0.985 * TextComponentHeight, 0],
        ]} />
    </group>
  );
});

const VisComponent = React.forwardRef((props, ref) =>{
  return(
    <group position={[0, 0, 0]} ref={ref}>
      <AxGr step={props.step} />
      <If if={true}>
        <DiscGroup step={props.step} />
        <OceanGroup waterLevel={props.waterLevel} step={props.step} />
      </If>
    </group>
  )
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
      {
        <ambientLight intensity={0.6} />
      }
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
  const stoppers      = useMemo(() => IMM.stoppers_DS2, []);
  const clipPositions = useMemo(() => IMM.clipPositions_DS2, []);
  const clips         = useMemo(() => IMM.getClips(), []);
  const transitions   = useMemo(() => IMM.getTransitions(), []);
  const animations    = useMemo(() => AnimationGenerator(totalFrame, clipPositions, stoppers, clips, transitions), []);
  const steps         = useMemo(() => statesConverter(clipPositions, stoppers), []);

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

  // here is animation request for make idx smooth
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      // console.log(target);
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setIdx(prevIdx => {
        // console.log(prevIdx);
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
    <div className={"Canvas" + (mode==Immersive?'I': mode==Animated? 'A':'S')}>
      <Suspense fallback={<></>}>
        <THREECanvas
          ref={canvas}
          dpr={Math.max(window.devicePixelRatio, 2)}
          gl={{ alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}
          linear flat
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

  // const {gl} = useThree();

  const [step, setStep] = useState(0);
  const [zoom, setZoom] = useState(6.25);
  const [waterLevel, setWaterLevel] = useState(1);

  useFrame((state, delta) => {
    if(mode == Animated || mode == Immersive){
      let preStep = steps.findIndex((ele) => ele >= idx/totalFrame) - 1;
      setStep(2*Math.floor((preStep-1)/3)+(preStep%3==1?1:2));

      let animation_group1 = animations[0]["animation"][idx];
      let animation_camera = animations[1]["animation"][idx];

      if(mainViz.current && mainText.current && mainCamera.current){
        setWaterLevel(animation_group1.waterLevel);
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
      <VisComponent ref={mainViz} step={step} waterLevel={waterLevel} />
      <TextComponent ref={mainText} />
      <MiniMap />
    </>
  )
}

export { Canvas };
