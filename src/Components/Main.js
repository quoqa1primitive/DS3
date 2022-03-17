import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'

import './Main.css'
import CanvasI from './CanvasI.js';
// import CanvasA from './CanvasA.js';
// import CanvasN from './CanvasN.js';
import Overlay1 from './Overlay1.js';

import Quiz from './Quiz.js'

function Main(){
  const overlay = useRef();
  const scroll = useRef(0);
  const [quiz, setQuiz] = useState(false)

  function getQuiz(){
    setQuiz(true);
  }

  function getViz(){
    setQuiz(false);
  }

  return(
    <div style={{width: "100%", height: "100%"}}className="PageContents">
      {
        !quiz &&
        <div className="Viz">
          <CanvasI overlay={overlay} scroll={scroll} />
          <Overlay1 ref={overlay} overlay={overlay} scroll={scroll} onClick={getQuiz}/>
        </div>
      }
      {
        quiz &&
        <>
          <Quiz />
        </>
      }
    </div>
  )
}

export default Main;
