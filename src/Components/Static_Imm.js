import * as THREE from 'three'
import React, { useRef, useEffect, useLayoutEffect, useState, useImperativeHandle, useMemo, Suspense } from 'react'

import './styles/Static_Non.css';
import { TextComponent, text1, text2, text3, text4, text5 } from './BasicElements.js';

import img1 from '../Static-01.jpg';
import img2 from '../Static-02.jpg';
import img3 from '../Static-03.jpg';

function OverlaySI({ type, scroll, scrollLog, quiz, onClick }, ref){
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
      className="PageController PageControllerS"
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
        <div style={{position: "relative", left: "calc(50% - 378px)", marginBottom: "320px"}}>
          <img src={ img1 } width='756px' height='448px' />
          <div className={"TextContainerI"} style={{top:"calc(112px)", left:"calc(756px)"}}>
            <TextComponent id={"text1"} text={text1} />
          </div>
          <div className={"TextContainerI"} style={{top:"calc(448px)", left:"calc(378px - 10vw)"}}>
            <TextComponent id={"text2"} text={text2} />
          </div>
        </div>
        <div style={{position: "relative", left: "calc(50% - 378px)", marginBottom: "320px"}}>
          <img src={ img2 } width='756px' height='448px' />
          <div className={"TextContainerI"} style={{top:"calc(224px)", left:"calc(756px)"}}>
            <TextComponent id={"text3"} text={text3} />
          </div>
        </div>
        <div style={{position: "relative", left: "calc(50% - 378px)", marginBottom: "320px"}}>
          <img src={ img3 } width='756px' height='448px' />
          <div className={"TextContainerI"} style={{top:"calc(112px)", left:"calc(-7.5vw)"}}>
            <TextComponent id={"text4"} text={text4} />
          </div>
          <div className={"TextContainerI"} style={{top:"calc(448px + 30vh)", left:"calc(378px - 10vw)"}}>
            <TextComponent id={"text5"} text={text5} />
          </div>
        </div>
        <button className="Button" ref={ref2} type="button" onClick={()=>{ onClick(); }}> Go to Quiz </button>
      </div>
    </div>
  )
}

OverlaySI = React.forwardRef(OverlaySI);

export { OverlaySI };
