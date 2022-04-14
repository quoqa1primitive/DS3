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
    "title": "Questionnaire",
    "elements": [
      {
        "type": "matrix",
        "name": "UCS",
        "title": "Please fill out the below.",
        "isRequired": true,
        "columns": [
          {
            "value": 1,
            "text": "Strongly <br /> disagree",
          },{
            "value": 2,
            "text": "&nbsp;&nbsp;",
          },{
            "value": 3,
            "text": "Disagree",
          },{
            "value": 4,
            "text": "&nbsp;&nbsp;",
          },{
            "value": 5,
            "text": "Neutral",
          },{
            "value": 6,
            "text": "&nbsp;&nbsp;",
          },{
            "value": 7,
            "text": "Agree",
          },{
            "value": 8,
            "text": "&nbsp;&nbsp;",
          },{
            "value": 9,
            "text": "Strongly <br /> agree",
          },
        ],
        "rows": [
          "Reading the article was very interesting.",
          "The article was easy to understand.",
          "I totally agree with the message of the article.",
          "The article was really trustworthy."
        ]
      },
      {
        "type": "radiogroup",
        "name": "TP",
        "title": "Please select the estimated range of how long you spent while reading.",
        "isRequired": true,
        "hasNone": false,
        "colCount": 1,
        "choices": [
          "0  ≤   ＜ 10 sec",
          "10 ≤   ＜ 20 sec",
          "20 ≤   ＜ 30 sec",
          "30 ≤   ＜ 40 sec",
          "40 ≤   ＜ 50 sec",
          "50 ≤    ",
        ]
      },
      {
        "type": "radiogroup",
        "name": "M1",
        "title": "Which is the reason why B's Food Self-Sufficiency increased?",
        "isRequired": true,
        "hasNone": true,
        "colCount": 1,
        "choices": [
          "Decreased Population",
          "Urbanization",
          "Agricultural Growth"
        ]
      },
      {
        "type": "radiogroup",
        "name": "M2",
        "title": "Did the article compare the amount of energy consumption?",
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

function Quiz(props){
  return(
    <div className="SurveyContainer">
      <SurveyComponent2 ScrollData={props.ScrollData} type={props.type} PersonID={props.PersonID}/>
    </div>
  )
}

export default Quiz;
