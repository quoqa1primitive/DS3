import React, { useRef, useEffect, useLayoutEffect, useState, useImperativeHandle } from 'react'
import { TextComponent, If } from '../../BasicElements/BasicElements.js';
import { title, text1, text2, text3, text4, text5, text6 } from '../../BasicElements/Constants.js';
import '../styles/Cond_Immersive_Imm.css';

function OverlayII({ scroll, scrollLog = [], onClick }, ref){
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

  useEffect(()=>{
    ref1.current.addEventListener('wheel', handleWheel, {passive: false});
    ref1.current.addEventListener('scroll', handleScroll, {passive: true});
  },[])

  function handleWheel(e){
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();

    const speed = 1, smooth = 12, limit = 15 / window.devicePixelRatio ;
    const delta = e.wheelDelta
    ref1.current.scrollTop += (Math.abs(delta * speed) > limit? limit * (-delta * speed) / Math.abs(delta * speed) : (-delta * speed))
    // console.log(e.target)
    // e.target.scrollTop = Math.max(0, Math.min(e.target.scrollTop, e.target.scrollHeight - window.innerHeight)) // limit scrolling
  }

  function handleScroll(e){
    // console.log(e.target.scrollTop);
    scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
    // scrollLog.current.push([Date.now() - startTime, scroll.current.toFixed(3)]);
  }

  return (
    <div
      className="PageController PageControllerII"
      id="pageController"
      ref={ref1}>
      <div className="TitleContainer">
        <div className="Title">{title}</div>
      </div>
      <div className={"Texts"}>
        <TextComponent id={"text1"} text={text1} left={"calc(50% + 240px)"}         margin={"800px"} />
        <TextComponent id={"text2"} text={text2} left={"calc(50% + 450px - 200px)"} margin={"800px"} />
        <TextComponent id={"text3"} text={text3} left={"calc(50% - 450px + 140px)"} margin={"600px"} />
        <TextComponent id={"text4"} text={text4} left={"calc(50% - 450px + 340px)"} margin={"600px"} />
        <TextComponent id={"text5"} text={text5} left={"calc(50% - 450px + 540px)"} margin={"600px"} />
        <TextComponent id={"text6"} text={text6} left={"calc(50% - 450px + 240px)"} margin={"500px"} />
        <div className="ButtonContainer" >
          <button className="Button" ref={ref2} type="button" onClick={()=>{onClick()}}> Go to Quiz </button>
        </div>
      </div>
    </div>
  )
}

OverlayII = React.forwardRef(OverlayII);

export {OverlayII};
