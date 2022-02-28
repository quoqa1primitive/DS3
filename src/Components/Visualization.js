import React, { useRef, useEffect, useState } from 'react';
import './Visualization.css';

import ImmVisComponent from './ImmVisComponent';
import BarComponent from './BarComponent';

function Visualization(props){
  const [layout, setLayout] = useState(props.layout);
  const [immersive, setImmersive] = useState(props.immersive);

  const CONTENT_WIDTH = 0.7;
  const VIS_HEIGHT = 0.6;
  const VIS_WIDTH = 0.6;
  const [dimension, setDimension] = useState({
    width: window.innerWidth * CONTENT_WIDTH * VIS_WIDTH,
    height: window.innerWidth * CONTENT_WIDTH * VIS_HEIGHT * VIS_WIDTH
  });

  return(
    <div className={"Visualization"}>
      {props.immersive?
        <ImmVisComponent data={props.data} dimension={dimension} index={props.index} steps={props.steps}/>:
        <BarComponent data={props.data} dimension={dimension} index={props.index} steps={props.steps}/>}
    </div>
  );
}


export default Visualization;
