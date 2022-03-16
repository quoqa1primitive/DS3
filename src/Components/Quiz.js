import React, { } from 'react';
import * as Survey from "survey-core";
import * as SurveyReact from "survey-react-ui";
import "survey-core/survey.css";
import "./Quiz.css";

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
            "type": "boolean",
            "name": "bool",
            "title": "Please answer the question",
            "label": "(Perceived Persuasiveness) 도시 주변에 농업 중심 지역이 필요할까요?",
            "isRequired": true
        },
        {
          "type": "matrix",
          "name": "Quality",
          "title": "Please indicate if you agree or disagree with the following statements",
          "columns": [
            {
              "value": 1,
              "text": "Strongly Disagree"
            }, {
              "value": 2,
              "text": "Disagree"
            }, {
              "value": 3,
              "text": "Neutral"
            }, {
              "value": 4,
              "text": "Agree"
            }, {
              "value": 5,
              "text": "Strongly Agree"
            }
          ],
          "rows": [
            {
              "value": "affordable",
              "text": "(Interest) 해당 Article은 흥미로웠습니다."
            }, {
              "value": "does what it claims",
              "text": "(Ease of Understanding) 해당 Article은 이해하기 쉬웠습니다."
            }, {
              "value": "better then others",
              "text": "(Time Perception) 해당 Article을 읽으며 시간 가는 줄 몰랐습니다!"
            }, {
              "value": "easy to use",
              "text": "(Perceived Persuasiveness)"
            }, {
              "value": "easy to use",
              "text": "(Perceived Trustworthiness)"
            }
          ]
        },
        {
            "type": "radiogroup",
            "name": "car",
            "title": "(Memorability) 도시 B의 식량 자급률은 왜 올랐나요?",
            "isRequired": true,
            "hasNone": true,
            "colCount": 5,
            "choices": [
                "인구 감소",
                "도시화",
                "농업 지원 정책"
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
      <SurveyComponent1 />
      <SurveyComponent2 />
    </div>
  )
}

export default Quiz;
