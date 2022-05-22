import * as THREE from 'three'
import React, { useRef, useEffect, useLayoutEffect, useState, useImperativeHandle, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';
import { Line, TextBox, Rect, XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from './BasicElements.js'

import './styles/Cond_Static_Non_2.css';
import { TextComponent, title, text1, text2, text3, text4, text5, text6 } from './BasicElements.js';

import img1 from '../Static-11.JPG';
import img2 from '../Static-12.JPG';
import img3 from '../Static-13.JPG';

function OverlaySN2({ scroll, scrollLog, quiz, onClick }, ref){
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
      className="PageController PageControllerSN2"
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
        <div className={"SubTexts"} style={{marginBottom: "400px"}} >
          <div style={{position: "relative", left: "calc(50% - 213.5px - 200px)", marginBottom: "45px"}}>
            <img src={ img1 } width='427px' height='419px' />
          </div>
          <TextComponent id={"text1"} left={"calc(50% + 420px - 200px)"} margin={"150px"} text={text1} />
        </div>
        <div className={"SubTexts"} style={{marginBottom: "400px"}} >
          <div style={{ position: "relative", left: "calc(50% - 352.5px - 200px)", marginBottom: "45px" }}>
            <img src={ img2 } width='705px' height='435px' />
          </div>
          <TextComponent id={"text3"} left={"calc(50% + 420px - 200px)"} margin={"150px"} text={text2} />
        </div>
        <div className={"SubTexts"} style={{marginBottom: "0px"}} >
          <div style={{ position: "relative", left: "calc(50% - 352.5px - 200px)", marginBottom: "45px"}}>
            <img src={ img3 } width='705px' height='435px' />
          </div>
          <TextComponent id={"text4"} left={"calc(50% + 420px - 200px)"} margin={"150px"} text={text3.concat('\n', text4).concat('\n', text5).concat('\n', text6)} />
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

OverlaySN2 = React.forwardRef(OverlaySN2);

function CanvasSN2(){
  return <></>
}

export { OverlaySN2, CanvasSN2};
