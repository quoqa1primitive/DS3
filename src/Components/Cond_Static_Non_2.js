import * as THREE from 'three'
import React, { useRef, useEffect, useLayoutEffect, useState, useImperativeHandle, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';
import { Line, TextBox, Rect, XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from './BasicElements.js'

import './styles/Cond_Static_Non_2.css';
import { TextComponent, text1, text2, text3, text4, text5 } from './BasicElements.js';

import img1 from '../Static-01.jpg';
import img2 from '../Static-02.jpg';
import img3 from '../Static-03.jpg';

function OverlaySN2({ type, scroll, scrollLog, quiz, onClick }, ref){
  const ref1 = useRef();
  const ref2 = useRef();
  const [startTime, setStartTime] = useState(Date.now());

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
      className="PageController PageControllerSN2"
      id="pageController"
      ref={ref1}
      onScroll={(e) => {
        scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
        scrollLog.current.push([Date.now() - startTime, scroll.current]);
      }}>
      <div className="TitleContainer">
        <div className="Title">
          Who Gave My Meat?
        </div>
      </div>
      <div className={"Texts"}>
        <div className={"SubTexts"} style={{marginBottom: "750px"}} >
          <div style={{position: "relative", left: "calc(50% - 213.5px - 200px)", marginBottom: "45px"}}>
            <img src={ img1 } width='427px' height='419px' />
          </div>
          <TextComponent id={"text1"} left={"calc(50% + 420px - 200px)"} margin={"150px"} text={text1.concat('\n', text2)} />
        </div>
        <div className={"SubTexts"} style={{marginBottom: "750px"}} >
          <div style={{ position: "relative", left: "calc(50% - 352.5px - 200px)", marginBottom: "45px" }}>
            <img src={ img2 } width='705px' height='435px' />
          </div>
          <TextComponent id={"text3"} left={"calc(50% + 420px - 200px)"} margin={"150px"} text={text3} />
        </div>
        <div className={"SubTexts"} style={{marginBottom: "0px"}} >
          <div style={{ position: "relative", left: "calc(50% - 352.5px - 200px)", marginBottom: "45px"}}>
            <img src={ img3 } width='705px' height='435px' />
          </div>
          <TextComponent id={"text4"} left={"calc(50% + 420px - 200px)"} margin={"150px"} text={text4.concat('\n', text5)} />
        </div>
        <button className="Button" ref={ref2} type="button" onClick={()=>{ onClick(); }}> Go to Quiz </button>
      </div>
    </div>
  )
}

OverlaySN2 = React.forwardRef(OverlaySN2);

function CanvasSN2(){
  return <></>
}

export { OverlaySN2, CanvasSN2};
