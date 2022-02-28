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

  const text1 = `As many of countries are trying to economically support non-worker group like children and elderly depending on various policies, perceived pressure of worker group varies upon combination of population distribution and economic policies such as tax and caring support. This section will show the three types of children and elderly ratio timelines and discuss of simple outline of possible actions for sustainability.
`
  const text2 = `Country A has relatively consistent ratio (around 50) between populations of non-workers and workers. This tells us that in Country A, 2 adults are assigned to support a child or elder. For individuals, when you think of taking care of your children and parents, 2 is not that high and burdensome, which enables individual to plan his/her own life more freely.

    However, with a view of sustainability and growth of population in country, 2 might indicate the danger depending on population ratio of children. In case 2 is derived as the number of children is not enough, the ratio between non-worker and worker can dramatically increase, followed by needs of proper non-worker supporting policies.
`
  const text3 = `Country B had almost same amount of children and elderly with workers from 1970 to 1980. Country B has very low elderly ratio and high children ratio at that time period. This is one of the explicit characteristics of rapidly growing countries. As the time passes, from 1980, those children has become adults, naturally decreasing the children and elderly ratio as they don't have not that many children like their parents did.

  This type of country should be aware of future, which most of population is consists of elderly. For not giving high pressure to adults in 2040 or later in case country B can not reduce the decreasing speed of birth rate, there should be policies like long-term national pension or developing plans of high-value industries to overcome the economic side effects of low worker ratio such like collapse of rural area and insufficient supports for multi-culture working environment.
  `
  const text4 = `Country C's children and elderly ratio also peaked at 1970, and kept decreasing. In contrast to country B, falling has progressed till it reached 36.3 at 2015. As country C is also used to be a rapidly growing country, the elderly ratio will keep increasing as time goes.

  Therefore, if country C desire to keep the density of children as much as that of workers. As the age bandwidth of the workers is three times larger than children's, it would be accomplished with value of ratio at least 33 when only children is considered.

  If country C doesn't feel to keep the total volume of population, such policies to prevent the high pressure on workers like utilizing the extra infrastructures to delay the population centralization and being prepared for large pension or elderly care services are needed.
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
