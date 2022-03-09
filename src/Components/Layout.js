import React, { useState, useEffect } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import './Layout.css'

import StarterComponent from './StarterComponent';
import Visualization from './Visualization';
import BarComponent from './BarComponent';
import TextComponent from './TextComponent';

function Layout(props){
  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const [layout, setLayout] = useState(props.layout);
  const [immersive, setImmersive] = useState(props.immersive);

  const SCROLLER_OFFSET = 0.54;
  const blurred = 1;

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
    Array.prototype.forEach.call(document.getElementsByClassName("Animator-1"), (el, idx) => {
      if(idx == data - 1){
        el.checked = true;
      }
    });
  };

  const onStepExit = ({ data }) => {
  }

  const text1 = `육류 소비량은 증가하고 있다.
  A 도시는 농축산업 지원정책에 따른 식습관 변화였고,
  B 도시는 도시화의 진행에 따라 빠른 속도로 증가했다.
`
  const text2 = `월별 소비량은 다음과 같으며,
  A 도시의 육류 소비량은 30t에서 210t으로,
  B 도시의 육류 소비량 또한 90t에서 180t으로 둘 다 꾸준한 상승세를 보였다.
`
  const text3 = `이에 반해 식량 자급자족률은 서로 상반된 결과를 가졌다.
  A 도시는 30%에서 80%까지 치솟았고,
  B 도시는 60%에서 40%로 수치가 감소했다.
  `
  const text4 = `이를 통해, 도시화가 진행될 때는 주변에 농축산업 중점 지역을 형성하면
  높은 식량 자급자족률을 통해 주변 도시로의 원활한 공급을 기대할 수 있다.
    `

  return (
    <>
      <StarterComponent/>
      <div className={"Content"}>
        <Visualization data={props.data} immersive={props.immersive} layout={props.layout} index={1} steps={6}/>
        <div className="Texts" style={props.layout == "EC"?{marginLeft: "-10%", position: "relative"}:{}}>
          <Scrollama offset={SCROLLER_OFFSET} onStepEnter={onStepEnter} onStepExit={onStepExit} debug={false}>
            <Step  data={1} key={1}>
              <div id="Step1" className="InStepElement">
                <TextComponent
                  text = {text1}/>
              </div>
            </Step>
            <Step data={2} key={2}>
              <div id="Step2" className="InStepElement">
                <TextComponent
                  text = {text2}/>
              </div>
            </Step>
            <Step data={3} key={3}>
              <div id="Step3" className="InStepElement">
                <TextComponent
                  text = {text3}/>
              </div>
            </Step>
            <Step data={4} key={4}>
              <div id="Step4" className="InStepElement">
                <TextComponent
                  text = {text4}/>
              </div>
            </Step>
          </Scrollama>
        </div>
      </div>
      <div className={"QuizButton"}>

      </div>
    </>
  );
}

export default Layout;
