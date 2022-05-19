import * as THREE from 'three'
import React, { useRef, useEffect, useLayoutEffect, useState, useImperativeHandle, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';
import { Line, TextBox, Rect, XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from './BasicElements.js'

import './styles/Cond_Static_Imm.css';
import { TextComponent, title, text1, text2, text3, text4, text5 } from './BasicElements.js';

import img1 from '../Static-01.jpg';
import img2 from '../Static-02.jpg';
import img3 from '../Static-03.jpg';

function OverlaySI({ scroll, scrollLog, quiz, onClick }, ref){
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
      className="PageController PageControllerSI"
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
        <div style={{position: "relative", left: "calc(50% - 213.5px)", marginBottom: "calc(750px + 120px)"}}>
          <img src={ img1 } width='427px' height='419px' />
          <TextComponent id={"text1"} text={text1} left={"calc(213.5px + 427px - 180px)"} top={"calc(30px + 0px)"} />
          <TextComponent id={"text2"} text={text2} left={"calc(213.5px - 180px)"} top={"calc(30px + 419px)"} />
        </div>
        <div style={{ position: "relative", left: "calc(50% - 352.5px)", marginBottom: "750px" }}>
          <img src={ img2 } width='705px' height='435px' />
          <TextComponent id={"text3"} text={text3} left={"calc(352.5px + 450px - 180px)"} top={"calc(30px + 0px)"} />
        </div>
        <div style={{ position: "relative", left: "calc(50% - 352.5px)", marginBottom: "0px"}}>
          <img src={ img3 } width='705px' height='435px' />
          <TextComponent id={"text4"} text={text4} left={"calc(-180px)"} top={"calc(30px + 0px)"} />
          <TextComponent id={"text5"} text={text5} left={"calc(352.5px - 180px)"} top={"calc(30px + 750px)"} />
        </div>
        {
          isFirstButton &&
          <div className="ButtonContainer" >
            <button className="Button" ref={ref2} type="button" onClick={()=>{ setIsFirstButton(false); }}> Go to Quiz </button>
          </div>
        }
        {
          !isFirstButton &&
          <div className="ButtonContainer" >
            <button className="Button" ref={ref2} type="button" onClick={()=>{ onClick(); setIsFirstButton(true); }}> Go to Quiz </button>
            <div style={{ textAlign: "center", margin: "10px auto 0px auto" }}> ※ If you are ready to take a quiz, ※ <br/> ※ Please press the button again ※ </div>
          </div>
        }
      </div>
    </div>
  )
}

OverlaySI = React.forwardRef(OverlaySI);

function CanvasSI() {
  return (
    <></>
  )
}

export { OverlaySI, CanvasSI};
