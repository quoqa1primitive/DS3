import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'

import './styles/Main.css'
import CanvasI from './CanvasI.js';
import OverlayI from './OverlayI.js';
import CanvasA from './CanvasA.js';
import OverlayA from './OverlayA.js';
import OverlayS from './OverlayS.js';
// import CanvasA from './CanvasA.js';
import imgA from '../Static.jpg';
import Quiz from './Quiz.js'

function Main(){
  const Static = 100;
  const Animated = 101;
  const Immersive = 110;

  const overlay = useRef();
  const scroll = useRef(0);
  const [quiz, setQuiz] = useState(false)
  const [type, setType] = useState(Immersive);

  function getQuiz(){
    setQuiz(true);
  }

  return(
    <>
      {
        quiz &&
        <>
          <Quiz />
        </>
      }
      {
        !quiz &&
        <div style={{width: "100%", height: "100%"}} className="PageContents">
          <div className="Viz">
          {
            type == Immersive &&
            <>
              <CanvasI overlay={overlay} scroll={scroll} />
              <OverlayI ref={overlay} overlay={overlay} scroll={scroll} onClick={getQuiz} />
            </>
          }
          {
            type == Animated &&
            <>
              <CanvasA overlay={overlay} scroll={scroll} />
              <OverlayA ref={overlay} overlay={overlay} scroll={scroll} onClick={getQuiz} />
            </>
          }
          {
            type == Static &&
            <>
              <OverlayS ref={overlay} overlay={overlay} scroll={scroll} onClick={getQuiz} />
            </>
          }
          </div>
        </div>
      }

    </>
  )
}

// <div style={{width: "100%", height: "100%"}} className="PageContentsN">
//   <div className="VizN">
//     <img src={imgA} style={{flex:1 , width: undefined, height: undefined}}/>
//   </div>
// </div>

export default Main;
