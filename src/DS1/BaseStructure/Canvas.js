import * as THREE from 'three'
import React, { useRef, useCallback, useLayoutEffect, useState, useMemo, Suspense } from 'react'
import { Canvas as THREECanvas, useFrame } from '@react-three/fiber'

import * as IMM from '../Animations/Immersive.js';
import * as ANM from '../Animations/Animated.js';
import { TextComponent }          from '../Components/Texts.js';
import { VisComponent_Immersive } from '../Components/Viz_Immersive.js';
import { VisComponent_Animated }  from '../Components/Viz_Animated.js';
import { MiniMap }                              from '../../BasicElements/MiniMap.js';
import { OrthoCamera, If }                      from '../../BasicElements/BasicElements.js';
import { statesConverter, AnimationGenerator }  from '../../BasicElements/BasicElements.js';
import { useStore }                             from '../../BasicElements/Store.js';
import { totalFrame, TextComponentHeight }      from '../../BasicElements/Constants.js';
import { Immersive, Animated }                  from '../../BasicElements/Constants.js';
import '../styles/Canvas.css';

function Canvas({mode}) {
  // Canvas는 mode 정보를 받아서 어떤 Canvas를 만들지 결정합니다.
  // 또한 CanvasComponents; Camera, Viz, Texts의 frame별 행동(animation)을 결정하기 위한 기저 변수들을 memo합니다.
  // 해당 정보는 Canvas가 eventListener를 통해 얻은 scroll value를 실제 스크롤이 아닌, progress 정도로 변환한 진행 척도와 함께 전달됩니다.
  const canvas = useRef();
  const speed = 0.35, smooth = 12, limit = 2.5 / window.devicePixelRatio;
  let scroll = 0;
  let target = 0;
  // const idx = useStore((state) => state.idx);
  // const setIdx = useStore((state) => state.setIdx);
  const [idx, setIdx] = useState(0);

  // animation에 관련한 정보들은 페이지가 처음 읽힐 때 memo가 이루어집니다.(baked)
  const stoppers        = useMemo(() => mode==Immersive? IMM.stoppers_DS1 : ANM.stoppers_DS1, []);
  const clipPositions   = useMemo(() => mode==Immersive? IMM.clipPositions_DS1 : ANM.clipPositions_DS1, []);
  const clips           = useMemo(() => mode==Immersive? IMM.getClips() : ANM.getClips(), []);
  const transitions     = useMemo(() => mode==Immersive? IMM.getTransitions() : ANM.getTransitions(), []);
  const animations      = useMemo(() => AnimationGenerator(totalFrame, clipPositions, stoppers, clips, transitions), []);
  const steps           = useMemo(() => statesConverter(clipPositions, stoppers), []);

  // 핸들 휠은 그냥 휠 이벤트가 발견되면 scroll을 계산하고, idx를 찾아서 수정합니다.
  // CanvasI의 유일한 state는 idx입니다! 이는 CanvasComponents로 넘겨지며, 이외의 Components들은 바뀔 일이 없어야 합니다.
  const handleWheel = useCallback((e) => {
    let currentIdx = Math.floor(scroll * totalFrame) == totalFrame? totalFrame-1 : Math.floor(scroll * totalFrame);
    // animation[1] here is camera animation which always has "zoom"
    const delta = e.wheelDelta;
    const normalizedScroll = (Math.abs(delta * speed) > limit ? limit * (-delta * speed) / Math.abs(delta * speed) : (-delta * speed));

    scroll = Math.max(0, Math.min(scroll + normalizedScroll / 1000, 1));
    // setScroll(0.2);
    // console.log(scroll);
    let newIdx = Math.floor(scroll * totalFrame) == totalFrame? totalFrame-1 : Math.floor(scroll * totalFrame);
    if(idx != newIdx){
      target = newIdx;
    }
  }, [speed, limit, totalFrame]);

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

  const step = useStore((state) => state.step);
  const setStep = useStore((state) => state.setStep);
  const [zoom, setZoom] = useState(6.25);
  const progress = useStore((state) => state.progress);
  const setProgress = useStore((state) => state.setProgress);
  const opacity = useStore((state) => state.opacity);
  const setOpacity = useStore((state) => state.setOpacity);
  // const [progress, setProgress] = useState([0, 0, 0, 0, 0, 0]);

  const vec3 = new THREE.Vector3();

  useLayoutEffect(() =>{
    console.log("CanvasComponents rerendered");
  }, [])

  useFrame((state, delta) => {
    if(mode == Animated || mode == Immersive){
      let preStep = steps.findIndex((ele) => ele >= idx/totalFrame) - 1;
      setStep(2*Math.floor((preStep-1)/3)+(preStep%3==1?1:2));

      let animation_group1 = animations[0]["animation"][idx];
      let animation_camera = animations[1]["animation"][idx];

      if(mainViz.current && mainText.current && mainCamera.current){
        // mode에 따라 다른 animation 대상이 정해집니다.
        if(mode == Immersive){
          setOpacity(animation_group1.opacity);
          mainViz.current.position.setX(animation_group1.pos[0]);
          mainViz.current.position.setY(animation_group1.pos[1]);
          mainViz.current.position.setZ(animation_group1.pos[2]);
          mainViz.current.rotation.x = animation_group1.rot[0] || 0;
          mainViz.current.rotation.y = animation_group1.rot[1] || 0;
          mainViz.current.rotation.z = animation_group1.rot[2] || 0;
        }else if(mode == Animated){
          setOpacity(animation_group1.opacity);
          setProgress(animation_group1.progress);
        }

        // always update Camera & TextComponent
        mainCamera.current.position.setX(animation_camera.pos[0]);
        mainCamera.current.position.setY(animation_camera.pos[1]);
        mainCamera.current.position.setZ(animation_camera.pos[2]);
        if(mode == Immersive){
          mainCamera.current.zoom = animation_camera.zoom;
        }
        mainCamera.current.updateProjectionMatrix();
        mainCamera.current.lookAt(0, 0, 0);

        mainText.current.position.multiply(vec3.set(0, 0, 0));
        mainText.current.position.setY(idx / totalFrame * TextComponentHeight);
        mainText.current.position.multiply(vec3.set(
          0, 1, 0
        )).add(vec3.set(
            mainCamera.current.position.x,
            mainCamera.current.position.y,
            mainCamera.current.position.z
          ).normalize().multiplyScalar(20000)
        ).add(vec3.set(
            mainCamera.current.position.x,
            mainCamera.current.position.y,
            mainCamera.current.position.z
          )
        );
        mainText.current.lookAt(mainCamera.current.position.x, mainCamera.current.position.y, mainCamera.current.position.z);
      }
    }
  });

  // VisComponent는 각자 Animation을 결정하기 위한 prop을 적절하게 받아야 하며 이는 위에 useFrame과 일관성이 있어야 합니다.
  return(
    <>
      <OrthoCamera ref={mainCamera} />
      <If if={mode == Immersive}>
        <VisComponent_Immersive ref={mainViz} />
      </If>
      <If if={mode == Animated}>
        <VisComponent_Animated ref={mainViz} />
      </If>
      <TextComponent ref={mainText} />
      <MiniMap />
    </>
  )
}

export { Canvas };
