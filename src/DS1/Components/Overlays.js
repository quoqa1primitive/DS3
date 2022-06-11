import React, { useRef, useEffect, useLayoutEffect, useState, useImperativeHandle } from 'react'
import { TextComponent, If } from '../../BasicElements/BasicElements.js';
import { StaticNon1, StaticNon2, StaticImm, AnimatedNon, AnimatedImm, ImmersiveNon, ImmersiveImm, EndOfTask} from '../../BasicElements/Constants.js';
import { title, text1, text2, text3, text4, text5, text6 } from '../../BasicElements/Constants.js';
import '../styles/Cond_Immersive_Imm.css';

import img1 from '../Static-21.JPG';
import img2 from '../Static-22.JPG';
import img3 from '../Static-23.JPG';

function Overlays({ scroll, scrollLog = [], onClick, mode }, ref){
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
    <>
      <If if={mode == ImmersiveNon}>
        <div className="PageController PageControllerIN" id="pageController" ref={ref1}>
          <div className="TitleContainer"><div className="Title">{title}</div></div>
          <div className={"Texts"}>
            <TextComponent id={"text1"} left={"calc(50% - 200px + 420px)"} text={text1.concat("\n", text2)} margin={"750px"} />
            <TextComponent id={"text3"} left={"calc(50% - 200px + 420px)"} text={text3} margin={"750px"} />
            <TextComponent id={"text4"} left={"calc(50% - 200px + 420px)"} text={text4.concat('\n', text5)} margin={"500px"} />
            <div className="ButtonContainer" >
              <button className="Button" ref={ref2} type="button" onClick={()=>{onClick()}}> Go to Quiz </button>
            </div>
          </div>
        </div>
      </If>
      <If if={mode == ImmersiveImm}>
        <div className="PageController PageControllerII" id="pageController" ref={ref1}>
          <div className="TitleContainer"><div className="Title">{title}</div></div>
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
      </If>
      <If if={mode == AnimatedImm}>
        <div className="PageController PageControllerAI" id="pageController" ref={ref1}>
          <div className="TitleContainer"><div className="Title">{title}</div></div>
          <div className={"Texts"}>
            <TextComponent id={"text1"} text={text1} left={"calc(50% + 240px)"} margin={"240px"} />
            <TextComponent id={"text2"} text={text2} left={"calc(50% - 200px)"} margin={"510px"} />
            <TextComponent id={"text3"} text={text3} left={"calc(50% + 450px - 200px)"} margin={"750px"} />
            <TextComponent id={"text4"} text={text4} left={"calc(50% - 450px - 100px)"} margin={"750px"} />
            <TextComponent id={"text5"} text={text5} left={"calc(50% - 200px)"} margin={"0px"} />
            <div className="ButtonContainer" >
              <button className="Button" ref={ref2} type="button" onClick={()=>{onClick()}}> Go to Quiz </button>
            </div>
          </div>
        </div>
      </If>
      <If if={mode == AnimatedNon}>
        <div className="PageController PageControllerAN" id="pageController" ref={ref1}>
          <div className="TitleContainer"><div className="Title">{title}</div></div>
          <div className={"Texts"}>
            <TextComponent id={"text1"} left={"calc(50% - 200px + 420px)"} text={text1.concat("\n", text2)} margin={"750px"} />
            <TextComponent id={"text3"} left={"calc(50% - 200px + 420px)"} text={text3} margin={"750px"} />
            <TextComponent id={"text4"} left={"calc(50% - 200px + 420px)"} text={text4.concat('\n', text5)} margin={"0px"} />
            <div className="ButtonContainer" >
              <button className="Button" ref={ref2} type="button" onClick={()=>{onClick()}}> Go to Quiz </button>
            </div>
          </div>
        </div>
      </If>
      <If if={mode == StaticImm}>
        <div className="PageController PageControllerSI" id="pageController" ref={ref1}>
          <div className="TitleContainer"><div className="Title">{title}</div></div>
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
            <div className="ButtonContainer" >
              <button className="Button" ref={ref2} type="button" onClick={()=>{onClick()}}> Go to Quiz </button>
            </div>
          </div>
        </div>
      </If>
      <If if={mode == StaticNon1}>
        <div className="PageController PageControllerSN" id="pageController" ref={ref1}>
          <div className="TitleContainer"><div className="Title">{title}</div></div>
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
      </If>
      <If if={mode == StaticNon2}>
        <div className="PageController PageControllerSN2" id="pageController" ref={ref1}>
          <div className="TitleContainer"><div className="Title">{title}</div></div>
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
            <div className="ButtonContainer" >
              <button className="Button" ref={ref2} type="button" onClick={()=>{onClick()}}> Go to Quiz </button>
            </div>
          </div>
        </div>
      </If>

    </>
  )
}

Overlays = React.forwardRef(Overlays);

export {Overlays};
