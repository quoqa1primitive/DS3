import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import './StarterComponent.css';
import TextComponent from './TextComponent';

function StarterComponent(){
  return(
    <div className="TitleContainer">
      <div className="Title">
        The Pressure of<br/>
        Working People
      </div>
      <TextComponent
        id="Intro"
        text = {
          `Worker group(age of 15-65) is important class of the specific country. We can see some straight-forward insights out of data about worker groups such like population ratio, working time and income. 
          In below, we will see "ratio of workers compared to total population" of 3 countries and discuss current situation, possible risks and direction of the population related policies.
        `}/>
    </div>
  )
}

export default StarterComponent;
