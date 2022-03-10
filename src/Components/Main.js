import React, { useRef, useState } from 'react'

import './Main.css'
import ImmVisComponent from './ImmVisComponent.js';
import Overlay from './Overlay.js';

function Main(){
  const overlay = useRef()
  const scroll = useRef(0)

  const [immersive, setImmersive] = useState(true);

  return(
    <>
      <div className="PageSelectors">
        <button id="I" onClick={() => {setImmersive(true);}}>I</button>
        <button id="N" onClick={() => {setImmersive(false);}}>N</button>
      </div>
      <ImmVisComponent overlay={overlay} scroll={scroll} />
      <Overlay ref={overlay} overlay={overlay} scroll={scroll} />
    </>
  )
}

export default Main;
