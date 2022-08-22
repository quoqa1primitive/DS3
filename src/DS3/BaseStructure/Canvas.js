import * as THREE from 'three'
import React, { useRef, useCallback, useEffect, useLayoutEffect, useState, useMemo, Suspense } from 'react'
import { Canvas as THREECanvas, useFrame, useThree } from '@react-three/fiber'

import { OrthoCamera, MiniMap, If, statesConverter, AnimationGenerator } from '../../BasicElements/BasicElements.js';
import { Sky } from '../../BasicElements/Sky.js';
import * as DIS from '../Animations/Distribution.js';
import * as IMM from '../Animations/Immersive.js';
import * as ANM from '../Animations/Animated.js';
import * as RL from '../Animations/rail.js';
import { TextComponent }          from '../Components/Texts.js';
import { VisComponent_Immersive } from '../Components/Viz_Immersive.js';
// import { VisComponent_Animated }  from '../Components/Viz_Animated.js';
import { Immersive, Animated, Static } from '../../BasicElements/Constants.js';
import { totalFrame, TextComponentHeight } from './Constants_DS2.js';
import { useStore } from './Store.js';
import '../styles/Canvas.css';

function Canvas({mode}) {
  // CanvasI는 mode 정보를 받아서 어떤 크기로 Canvas를 만들지 결정합니다.
  // 또한 CanvasComponents; Camera, Viz, Texts의 frame별 행동(animation)을 결정하기 위한 기저 변수들을 memo합니다.
  // 해당 정보는 CanvasI가 eventListener를 통해 얻은 scroll value를 실제 스크롤이 아닌, progress 정도로 변환한 진행 척도와 함께 전달됩니다.
  
  const canvas = useRef();
  const setAnimation_Main = useStore((state)=> state.setAnimation_Main);
  const setAnimation_Dist = useStore((state)=> state.setAnimation_Dist);
  const setAnimation_Rl = useStore((state)=> state.setAnimation_Rl);
  const speed = 0.35, smooth = 12, limit = 2.5 / window.devicePixelRatio;
  let scroll = 0;
  let target = 0;
  const idx = useStore((state) => state.idx);
  const setIdx = useStore((state) => state.setIdx);
  // const [idx, setIdx] = useState(0);

  // animation에 관련한 정보들은 페이지가 처음 읽힐 때 memo가 이루어집니다.(baked)
  const stoppers1      = useMemo(() => mode==Immersive? IMM.stoppers_DS2 : ANM.stoppers_DS2, []);
  const clipPositions1 = useMemo(() => mode==Immersive? IMM.clipPositions_DS2 : ANM.clipPositions_DS2, []);
  const clips1          = useMemo(() => mode==Immersive? IMM.getClips() : ANM.getClips(), []);
  const transitions1    = useMemo(() => mode==Immersive? IMM.getTransitions() : ANM.getTransitions(), []);
  
  const stoppers2      = useMemo(() => DIS.stoppers_Dist2, []);
  const clipPositions2 = useMemo(() => DIS.clipPositions_Dist2, []);
  const clips2          = useMemo(() => DIS.getClips(), []);
  const transitions2    = useMemo(() => DIS.getTransitions(), []);

  const stoppers3      = useMemo(() => RL.stoppers_DS2, []);
  const clipPositions3 = useMemo(() => RL.clipPositions_DS2, []);
  const clips3          = useMemo(() => RL.getClips(), []);
  const transitions3    = useMemo(() => RL.getTransitions(), []);


  // useMemo(() => AnimationGenerator(totalFrame, clipPositions, stoppers, clips, transitions), []);
  const steps1         = useMemo(() => statesConverter(clipPositions1, stoppers1), []);

  // 핸들 휠은 그냥 휠 이벤트가 발견되면 scroll을 계산하고, idx를 찾아서 수정합니다.
  // CanvasI의 유일한 state는 idx입니다! 이는 CanvasComponents로 넘겨지며, 이외의 Components들은 바뀔 일이 없어야 합니다.
  const handleWheel = useCallback((e) => {
    let currentIdx = Math.floor(scroll * totalFrame) == totalFrame? totalFrame-1 : Math.floor(scroll * totalFrame);
    // animation[1] here is camera animation which always has "zoom"
    const delta = e.wheelDelta;
    const normalizedScroll = (Math.abs(delta * speed) > limit ? limit * (-delta * speed) / Math.abs(delta * speed) : (-delta * speed));

    scroll = Math.max(0, Math.min(scroll + normalizedScroll / 1000, 1)); // limit the progress equal or under 1
    let newIdx = Math.floor(scroll * totalFrame) == totalFrame? totalFrame-1 : Math.floor(scroll * totalFrame);
    target = newIdx;
    // console.log(target, idx);
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
      // setIdx(Math.floor(idx + (target - idx) * 0.07));
      setIdx(target);
      // console.log(target);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useLayoutEffect(() =>{
    canvas.current.addEventListener('wheel', handleWheel, {passive: false});
    requestRef.current = requestAnimationFrame(animate);

    setAnimation_Main(AnimationGenerator(totalFrame, clipPositions1, stoppers1, clips1, transitions1));
    setAnimation_Dist(AnimationGenerator(totalFrame, clipPositions2, stoppers2, clips2, transitions2));
    setAnimation_Rl(AnimationGenerator(totalFrame, clipPositions3, stoppers3, clips3, transitions3));
    
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
          <CanvasComponents mode={mode} steps={steps1} />
        </THREECanvas>
      </Suspense>
    </div>
  )
}

function CanvasComponents({mode, steps, ...props}){
  const mainCamera = useRef();
  const mainViz = useRef();
  const mainText = useRef();

  // const {gl} = useThree();
  const textCamPos = new THREE.Vector3(0, 20000,1000);
  const idx = useStore((state) => state.idx);
  const step = useStore((state) => state.step);
  const setStep = useStore((state) => state.setStep);
  const animation_main = useStore((state) => state.animation_main);
  const animation_rl = useStore((state) => state.animation_rl);

  

  const cameraPos = [
    new THREE.Vector3(1, 1, 1)
  ];
  const lookAtPos = [
    new THREE.Vector3(0, 0, 0)
  ];

  useFrame((state, delta) => {
    if(mode == Animated || mode == Immersive){
      let preStep = steps.findIndex((ele) => ele >= idx/totalFrame) - 1;
      setStep(2*Math.floor((preStep-1)/3)+(preStep%3==1?1:2));

      let animation_group1 = animation_main[0]["animation"][idx];
      let animation_camera = animation_main[1]["animation"][idx];
      // let animation_camera = animations[2]["animation"][idx];
      let animation_camera_rl = animation_rl[0]["animation"][idx];
      // console.log(idx);
      let goX = 100*animation_camera_rl.railMove[0];
      let goY = 100*animation_camera_rl.railMove[1];
      if(mainViz.current && mainText.current && mainCamera.current){


        mainCamera.current.position.setX(animation_camera_rl.pos[0]+goX);
        mainCamera.current.position.setY(animation_camera_rl.pos[1]+goY);
        mainCamera.current.position.setZ(animation_camera_rl.pos[2]);
        // mainCamera.current.rotateZ(-Math.PI/2);

        mainCamera.current.lookAt(
          animation_camera_rl.lookAt[0]+animation_camera_rl.lookAtGap+goX,
          animation_camera_rl.lookAt[1]+goY,
          animation_camera_rl.lookAt[2]
        );
        // const axis = animation_camera_rl.quaternion;
        // const angle = animation_camera_rl.quaternion[3]
        // const quaternion = new THREE.Quaternion();
        // quaternion.setFromAxisAngle(new THREE.Vector3(0,0,0).fromArray(axis), Math.PI/180*angle);
        // mainCamera.current.setRotationFromQuaternion(quaternion);

        // console.log(quaternion);
        // mainCamera.current.setRotationFromEuler(new THREE.Euler(
        //   Math.PI/180*animation_camera_rl.rot[0],
        //   Math.PI/180*animation_camera_rl.rot[1],
        //   Math.PI/180*animation_camera_rl.rot[2]
        // ));
        mainCamera.current.rotateZ(Math.PI/180*animation_camera_rl.rot[2]);
        mainCamera.current.rotateY(Math.PI/180*animation_camera_rl.rot[1]);
        mainCamera.current.rotateX(Math.PI/180*animation_camera_rl.rot[0]);
      
     

        mainCamera.current.zoom = animation_camera_rl.zoom;
        mainCamera.current.updateProjectionMatrix();

        // mainCamera.current.position.setZ(4000000);
        // mainCamera.current.position.setX(-4500);
        // mainCamera.current.position.setY(0);
        // mainCamera.current.lookAt(-4500,0,0);

        // mainCamera.current.rotateY(animation_camera_rl.rot[1]);
        mainText.current.position.setX(textCamPos.x);
        mainText.current.position.setY(textCamPos.y + idx / totalFrame * TextComponentHeight + TextComponentHeight * 0.02);
        mainText.current.position.setZ(textCamPos.z - 100);
        mainText.current.lookAt(textCamPos.x, textCamPos.y + idx / totalFrame * TextComponentHeight + TextComponentHeight * 0.02, textCamPos.z);


        // console.log(mainCamera.current.position);
      }
    }
  });

  return(
    <>
      <OrthoCamera ref={mainCamera} />
      <If if={mode == Immersive}>
        <VisComponent_Immersive ref={mainViz} />
        {
          <TextComponent ref={mainText} />
          }
      </If>
      <If if={mode == Animated}>
        {
          <TextComponent ref={mainText} />
          }
      </If>
      <If if={mode == Animated}>

      </If>
      <MiniMap />
    </>
  )
}

export { Canvas };
