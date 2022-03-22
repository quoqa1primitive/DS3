import React, { useRef, useEffect, useState, useImperativeHandle } from 'react';

import './styles/OverlayI.css';
import { TextComponent, text1, text2, text3, text4, text5 } from './BasicElements.js';

function Overlay({ scroll, quiz, onClick, setStatic, setAnimated, setImmersive }, ref){
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
     ref1.current.focus();
    },
    get ref1() {
        return ref1.current;
    },
    get ref2() {
        return ref2.current;
    },
    get ref3() {
        return ref3.current;
    },
    get ref4() {
        return ref4.current;
    },
    get ref5() {
        return ref5.current;
    },
    // ... whatever else one may need
  }));

  return (
    <div
      className="PageControllerI"
      id="pageController"
      ref={ref1}
      onScroll={(e) => {
        scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
      }}>
      <div className="TitleContainer">
        <div className="Title">
          Who Gave My Meat?
        </div>
      </div>
      <div className={"Texts"}>
        <TextComponent id={"text1"} text={text1} left={"60%"} margin={"25vh"} />
        <TextComponent id={"text2"} text={text2} left={"40%"} margin={"75vh"} />
        <TextComponent id={"text3"} text={text3} left={"55%"} margin={"110vh"} />
        <TextComponent id={"text4"} text={text4} left={"25%"} margin={"110vh"} />
        <TextComponent id={"text5"} text={text5} left={"40%"} margin={"45vh"} />
        <button className="Button" ref={ref2} type="button" onClick={()=>{ onClick(); }}> Go to Quiz </button>
        <button className="Button" ref={ref3} type="button" onClick={()=>{ setStatic(); }}> Set Static </button>
        <button className="Button" ref={ref4} type="button" onClick={()=>{ setAnimated(); }}> Set Animated </button>
        <button className="Button" ref={ref5} type="button" onClick={()=>{ setImmersive(); }}> Set Immersive </button>
      </div>
    </div>
  )
}

Overlay = React.forwardRef(Overlay);

export default Overlay
