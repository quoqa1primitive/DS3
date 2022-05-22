import * as THREE from 'three'
import React, { useRef, useEffect, useLayoutEffect, useState, useImperativeHandle, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';
import { Line, TextBox, Rect, XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from './BasicElements.js'

import './styles/Cond_Static_Non.css';
import { TextComponent, title, text1, text2, text3, text4, text5, text6 } from './BasicElements.js';

import img1 from '../Static-21.JPG';
import img2 from '../Static-22.JPG';
import img3 from '../Static-23.JPG';

function OverlaySN({ scroll, scrollLog, quiz, onClick }, ref){
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

  return (
    <div
      className="PageController PageControllerSN"
      id="pageController"
      ref={ref1}
      onScroll={(e) => {
        scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
        scrollLog.current.push([Date.now() - startTime, scroll.current]);
      }}>
      <div className="TitleContainer">
        <div className="Title">
          {title}
        </div>
      </div>
      <div className={"Texts"}>
        <div style={{position: "relative", left: "calc(50% - 213.5px)", marginBottom: "45px"}}>
          <img src={ img1 } width='427px' height='419px' />
        </div>
        <TextComponent id={"text1"} left={"calc(50% - 180px)"} margin={"150px"} text={text1} />
        <div style={{ position: "relative", left: "calc(50% - 352.5px)", marginBottom: "45px" }}>
          <img src={ img2 } width='705px' height='435px' />
        </div>
        <TextComponent id={"text3"} left={"calc(50% - 180px)"} margin={"150px"} text={text2} />
        <div style={{ position: "relative", left: "calc(50% - 352.5px)", marginBottom: "45px"}}>
          <img src={ img3 } width='705px' height='435px' />
        </div>
        <TextComponent id={"text4"} left={"calc(50% - 180px)"} margin={"150px"} text={text3.concat('\n', text4).concat('\n', text5)} />
        <TextComponent id={"text4"} left={"calc(50% - 180px)"} margin={"0px"} text={text6} />
        <div className="ButtonContainer" >
          <button className="Button" ref={ref2} type="button" onClick={()=>{ onClick()}}> Go to Quiz </button>
        </div>
      </div>
    </div>
  )
}

OverlaySN = React.forwardRef(OverlaySN);

function CanvasSN(){
  return <></>
}

export { OverlaySN, CanvasSN};
