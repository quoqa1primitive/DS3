import React, { useCallback } from 'react';
import showdown from 'showdown';
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import "survey-core/survey.css";
import "./styles/Quiz.css";
import axios from 'axios';

function SurveyComponent3(props){
  Survey
    .StylesManager
    .applyTheme("default");

  let json = {
    "title": "Questionnaire",
    "elements": [
      {
        "type": "matrixdropdown",
        "name": "UCS",
        "title": "Please fill out the below.",
        "isRequired": true,
        "columns": [
          {
            "name": "col1",
            "cellType": "radiogroup",
            "showInMultipleColumns": true,
            "isRequired": true,
            "choices": [
              {
                "value": -3,
                "text": "&emsp;A was ~&emsp;<br/>"
              },
              {
                "value": -2,
                "text": "&emsp;&emsp; &emsp;&emsp;<br/>"
              },
              {
                "value": -1,
                "text": "&emsp;&emsp;  &emsp;&emsp;<br/>"
              },
              {
                "value": 0,
                "text": "Neutral<br/>"
              },
              {
                "value": 1,
                "text": "&emsp;&emsp;   &emsp;&emsp;<br/>"
              },
              {
                "value": 2,
                "text": "&emsp;&emsp;    &emsp;&emsp;<br/>"
              },
              {
                "value": 3,
                "text": "&emsp;B was ~&emsp;<br/>"
              }
            ]
          },
          {
            "name": "comment",
            "title": "Please describe what made difference(if exists)",
            "isRequired": true,
            "cellType": "comment"
          }
        ],
        "rows": [
          "Which version was<br/> <b>more interesting</b>?",
          "Which version was<br/> <b>more easy to understand</b>?",
          "Which version was<br/> <b>more persuasive</b>?",
          "Which version was<br/> <b>more trustworthy</b>?"
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
    resultData["scroll"] = props.ScrollData.map(([a, b]) => [a, Number(b).toFixed(3)]);
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

function Quiz2(props){
  return(
    <div className="SurveyContainer">
      <SurveyComponent3 ScrollData={props.ScrollData} type={props.type} PersonID={props.PersonID}/>
    </div>
  )
}

export default Quiz2;
