import React, { } from 'react';
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import "survey-core/survey.css";
import "./styles/Quiz.css";

function SurveyComponent1(){
  Survey
    .StylesManager
    .applyTheme("default");

  let json = {
    "elements": [
        {
            "type": "boolean",
            "name": "bool",
            "title": "Please answer the question",
            "label": "Are you 21 or older?",
            "isRequired": true
        }
    ]
};

  const survey = new Survey.Model(json);

  return(
    <div className="SurveyComponent">
      <SurveyReact.Survey
        model={survey}
      />
    </div>
  )
}

function SurveyComponent2(){
  Survey
    .StylesManager
    .applyTheme("default");

  let json = {
    "elements": [
        {
            "type": "matrixdropdown",
            "name": "Feelings",
            "title": "Please fill out the below.",

            "columns": [
                {
                    "name": "col1",
                    "cellType": "radiogroup",
                    "showInMultipleColumns": true,
                    "isRequired": true,
                    "choices": ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"]
                }
            ],
            "rows": [
                "(Interest) Reading the article was interesting.",
                "(Ease of Understanding) The article was easy to understand.",
                "(Perceived Persuasiveness) I agree with the message of the article.",
                "(Perceived Trustworthiness) The article was trustworthy."
            ]
        },
        {
            "type": "radiogroup",
            "name": "tp",
            "title": "(Time Perception) Please select the estimated range of how long you spent while reading.",
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
            "name": "m1",
            "title": "(Memorability) Which is the reason why B's Food Self-Sufficiency increased?",
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
            "name": "m2",
            "title": "(Memorability) Did the article compare the chicken consumption of two cities?",
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
            "name": "m3",
            "title": "(Memorability) The number of cities mentioned in the article is ___",
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

  return(
    <div className="SurveyComponent">
      <SurveyReact.Survey
        model={survey}
      />
    </div>
  )
}

function Quiz(){
  return(
    <div className="SurveyContainer">
      <SurveyComponent2 />
    </div>
  )
}

export default Quiz;
