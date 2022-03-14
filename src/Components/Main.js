import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'

import './Main.css'
import ImmVisComponent1 from './ImmVisComponent1.js';
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

    <div className="PageContents">
      {
        !quiz &&
        <>
          <ImmVisComponent1 overlay={overlay} scroll={scroll} />
          <Overlay1 ref={overlay} overlay={overlay} scroll={scroll} onClick={getQuiz}/>
        </>
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
