import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import axios from 'axios';
import { useFrame } from '@react-three/fiber'
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import "survey-core/survey.css";
import { StaticNon1, StaticNon2, StaticImm, AnimatedNon, AnimatedImm, ImmersiveNon, ImmersiveImm, EndOfTask} from '../../BasicElements/Constants.js';
import { If } from '../../BasicElements/BasicElements.js';
import '../../BasicElements/Main.css'

import { Overlays } from './Overlays.js';
import { CanvasSI } from './Cond_Static_Imm.js';
import { CanvasAI } from './Cond_Animated_Imm.js';
import { CanvasII } from './Cond_Immersive_Imm.js';
import { CanvasSN } from './Cond_Static_Non.js';
import { CanvasSN2 } from './Cond_Static_Non_2.js';
import { CanvasAN } from './Cond_Animated_Non.js';
import { CanvasIN } from './Cond_Immersive_Non.js';
import Quiz1 from './Quiz1.js';
import Quiz2 from './Quiz2.js';

// import { data } from '../0415Data.js'

function SurveyComponent1(props){
  Survey
    .StylesManager
    .applyTheme("default");

  let json = {
    "title": "Demographic Survey",
    "description": "This is the end page of whole tasks. Please fill out demographic survey and check your completion code.",
    "elements": [
        {
          "type": "radiogroup",
          "name": "GEN",
          "title": "Gender",
          "isRequired": false, "hasNone": false, "colCount": 1,
          "choices": [
            "Male",
            "Female"
          ]
        },
        {
          "type": "radiogroup",
          "name": "AGE",
          "title": "Age",
          "isRequired": true, "hasNone": false, "colCount": 1,
          "choices": [
            " 0-17 years old",
            "18-25",
            "26-35",
            "36-50",
            "51+"
          ]
        },
        {
          "type": "radiogroup",
          "name": "ERP",
          "title": "Please check your proficiency of reading in english.",
          "isRequired": true, "hasNone": false, "colCount": 1,
          "choices": [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Native"
          ]
        },
        {
          "type": "radiogroup",
          "name": "HEL",
          "title": "Please select your highest level of education.",
          "isRequired": true, "hasNone": false, "colCount": 1,
          "choices": [
            "Less than high school",
            "High school or equivalent",
            "Technical or occupational certificate",
            "Associate degree",
            "Some college coursework completed",
            "Bachelor’s degree",
            "Master’s degree",
            "Doctorate"
          ]
        },
        {
          "type": "radiogroup",
          "name": "FOW",
          "title": "How often do you read articles on the web?",
          "isRequired": true, "hasNone": false, "colCount": 1,
          "choices": [
            "Less than 1 article per week",
            "1-10 articles per week",
            "10-20 articles per week",
            "20-50 articles per week",
            "50+ articles per week"
          ]
        },
        {
          "type": "radiogroup",
          "name": "CUD",
          "title": "What kind of input device are you currently using?",
          "isRequired": true, "hasNone": false, "colCount": 1,
          "choices": [
            "Mouse",
            "Touch Display(Tab, Smartphone, etc..)",
            "Touchpad, Trackpad",
            "Trackball",
            "Pen Mouse",
            "Others"
          ]
        }
    ]
  };

  const survey = new Survey.Model(json);
  // Setting up the onComplete behavior
  survey.completedHtml = `<p>Thanks for answering the quizzes.</p>
    <div> Here is your completion code: ` + props.completionCode  + `</div>
  `;
  const sendResults = useCallback((sender)=>{
    let resultData;
    resultData = sender.data;
    resultData["PersonID"] = props.PersonID;
    resultData["type"] = props.type;
    const results = JSON.stringify(resultData);
    // Using axios to send the results to flask server
    axios.get('ajaxGet', {
      params: {
        "action": "log",
        "PersonID": props.PersonID,
        "json":results
      }
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  },[]);
  survey.onComplete.add(sendResults);
  //

  return(
    <div className="SurveyComponent">
      <SurveyReact.Survey model={survey}/>
    </div>
  )
}

function CompletionPage(props){
  return (
    <div className="SurveyContainer">
      <SurveyComponent1 type={props.type} PersonID={props.PersonID} completionCode={props.completionCode}/>
    </div>
  )
}

function Main2(){
  const overlay = useRef();
  const scroll = useRef(0);
  const scrollLog = useRef([]);
  const [sequence, setSequence] = useState([])
  const [quiz1, setQuiz1] = useState(false)
  const [quiz2, setQuiz2] = useState(false)
  const [type, setType] = useState(ImmersiveImm);
  const [completionCode, setCompletionCode] = useState("");
  const [scrollData, setScrollData] = useState([]);

  let PersonID;

  function getQuiz(){
    // scrollLog.current.push(Date.now()); // Check the total elapsed time
    setScrollData(scrollLog.current);
    axios.get('ajaxGet', {
      params: {
        "action": "setQuiz"
      }
    }).then(response => {
      console.log("SUCCESS", response);
      setSequence(response.data.task);
      if(response.data.isQuiz==1){
        setQuiz1(true);
        setQuiz2(false);
        console.log("quiz1 set");
      }else if(response.data.isQuiz==2){
        setQuiz1(false);
        setQuiz2(true);
        console.log("quiz2 set");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    // console.log(data[0])
  },[]);

  useLayoutEffect(()=>{
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
      console.log(response.data);
      if(response.data.isQuiz==1){
        setQuiz1(true);
        setQuiz2(false);
      }else if(response.data.isQuiz==2){
        setQuiz1(false);
        setQuiz2(true);
      }else{
        setQuiz1(false);
        setQuiz2(false);
        console.log("type changed");
        setType(response.data.nextStory);
      }
    }).catch(error => {
      console.log(error);
    });
  }, [])

  return(
    <>
      <If if={quiz1}><Quiz1 ScrollData={scrollData} type={type} PersonID={PersonID}/></If>
      <If if={quiz2}><Quiz2 ScrollData={scrollData} type={type} PersonID={PersonID} Sequence={sequence}/></If>
      <If if={!quiz1 && !quiz2}>
        <div style={{width: "100%", height: "100%"}} className="PageContents">
          <div className="Viz">
            <If if={type == EndOfTask}>
              <CompletionPage completionCode={completionCode} type={type} PersonID={PersonID}/>
            </If>
            <If if={type != EndOfTask}>
              <If if={type == ImmersiveNon}>
                <CanvasIN overlay={overlay} scroll={scroll} />
              </If>
              <If if={type == ImmersiveImm}>
                <CanvasII overlay={overlay} scroll={scroll} />
              </If>
              <If if={type == AnimatedNon}>
                <CanvasAN overlay={overlay} scroll={scroll} />
              </If>
              <If if={type == AnimatedImm}>
                <CanvasAI overlay={overlay} scroll={scroll} />
              </If>
              <Overlays mode={type} ref={overlay} scroll={scroll} scrollLog={scrollLog} onClick={getQuiz} />
            </If>
          </div>
        </div>
      </If>
    </>
  )
}

export default Main2;
