import React, { useCallback } from 'react';
import showdown from 'showdown';
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import "survey-core/survey.css";
import "./styles/Quiz.css";
import axios from 'axios';

function SurveyComponent2(props){
  Survey
    .StylesManager
    .applyTheme("default");

  let json = {
    "title": "Quiz & Questionnaire",
    "elements": [
      {
        "type": "radiogroup",
        "name": "M1-1",
        "title": "When did X's Food Consumption most dramatically increase?",
        "isRequired": true,
        "hasNone": false,
        "colCount": 1,
        "choices": [
          "February - March",
          "May - June",
          "August - September",
          "November - December"
        ]
      },
      {
        "type": "radiogroup",
        "name": "M1-2",
        "title": "Do you agree that urbanization lead to particular type of food consumption?",
        "isRequired": true,
        "hasNone": false,
        "colCount": 1,
        "choices": [
          "7 - Strongly agree.",
          "6",
          "5",
          "4 - Neutral",
          "3",
          "2",
          "1 - Strongly disagree",
        ]
      },
      {
        "type": "radiogroup",
        "name": "M2",
        "title": "Did the article compare the amount of flights?",
        "isRequired": true,
        "hasNone": false,
        "colCount": 1,
        "choices": [
          "True",
          "False"
        ]
      },
      {
        "type": "radiogroup",
        "name": "M1-3",
        "title": "Please check how much you pay attention to the existence of errors or inconsistencies <i>in the graph.</i>",
        "isRequired": true,
        "hasNone": false,
        "colCount": 1,
        "choices": [
          "7 - Completely Untrustworthy",
          "6",
          "5",
          "4 - Neutral",
          "3",
          "2",
          "1 - Completely Trustworthy"
        ]
      },
      {
        "type": "radiogroup",
        "name": "M3",
        "title": "The number of cities mentioned in the article is ___",
        "isRequired": true,
        "hasNone": false,
        "colCount": 1,
        "choices": [
          "1",
          "2",
          "3",
          "4"
        ]
      }
    ]
  };

  const survey = new Survey.Model(json);
  // Setting up the onComplete behavior
  survey.completedHtml = `<p>Thanks for answering the quizzes.</p>
    <div>
      <button onclick='window.location.reload(false);'>Next Story</button>
    </div>
  `;

  //Create showdown markdown converter
  var converter = new showdown.Converter();
  survey.onTextMarkdown.add(function(survey, options){
    //convert the markdown text to html
    var str = converter.makeHtml(options.text);
    //remove root paragraphs <p></p>
    str = str.substring(3);
    str = str.substring(0, str.length - 4);
    //set html
    options.html = str;
  });

  const sendResults = useCallback((sender)=>{
    let resultData;
    resultData = sender.data;
    resultData["PersonID"] = props.PersonID;
    resultData["type"] = props.type;
    resultData["scroll"] = props.ScrollData;
    resultData["winHeight"] = window.innerHeight;
    resultData["zoomLevel"] = Math.round(window.devicePixelRatio * 100)
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
      <SurveyReact.Survey
        model={survey}
      />
    </div>
  )
}

function Quiz1(props){
  return(
    <div className="SurveyContainer">
      <SurveyComponent2 ScrollData={props.ScrollData} type={props.type} PersonID={props.PersonID}/>
    </div>
  )
}

export default Quiz1;
