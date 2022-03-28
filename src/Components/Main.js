import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Static, Animated, Immersive, EndOfTask} from './BasicElements.js';

import './styles/Main.css'
import CanvasI from './CanvasI.js';
import OverlayI from './OverlayI.js';
import CanvasA from './CanvasA.js';
import OverlayA from './OverlayA.js';
import OverlayS from './OverlayS.js';
import Quiz from './Quiz.js';
import axios from 'axios';

function Main(){
  const overlay = useRef();
  const scroll = useRef(0);
  const scrollLog = useRef([]);
  const [quiz, setQuiz] = useState(false)
  const [type, setType] = useState(Static);
  const [layoutType, setLayoutType] = useState(Immersive);
  const [completionCode, setCompletionCode] = useState("");
  const [scrollData, setScrollData] = useState([]);

  let PersonID;

  function getQuiz(){
    setQuiz(true);
    scrollLog.current.push(Date.now()); // Check the total elapsed time
    setScrollData(scrollLog.current);
  }

  useEffect(()=>{
    axios.get('ajaxGet', {
      params: {
        "action": "fetchNextStory"
      }
    }).then(response => {
      console.log("SUCCESS", response);
      if (response.data.nextStory==EndOfTask) {
        setCompletionCode(response.data.CompletionCode);
      } else {
        PersonID = response.data.PersonID;
      }
      setType(response.data.nextStory);
    }).catch(error => {
      console.log(error);
    });
  }, [])

  return(
    <>
      {
        quiz &&
        <>
          <Quiz ScrollData={scrollData} type={type} PersonID={PersonID}/>
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
              <OverlayI ref={overlay} type={layoutType} overlay={overlay} scroll={scroll} scrollLog={scrollLog} onClick={getQuiz} />
            </>
          }
          {
            type == Animated &&
            <>
              <CanvasA overlay={overlay} scroll={scroll} />
              <OverlayA ref={overlay} type={layoutType} overlay={overlay} scroll={scroll} scrollLog={scrollLog} onClick={getQuiz} />
            </>
          }
          {
            type == Static &&
            <>
              <OverlayS ref={overlay} type={layoutType} overlay={overlay} scroll={scroll} scrollLog={scrollLog} onClick={getQuiz} />
            </>
          }
          {
            type == EndOfTask &&
            <div>
              All tasks done! Here is your completion code: <b>{completionCode}</b><br/>
              Don't forget to submit it to the AMT task.
            </div>
          }
          </div>
        </div>
      }

    </>
  )
}

export default Main;
