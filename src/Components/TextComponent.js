import React, { useRef, useEffect, useState } from 'react';
import './TextComponent.css';

function TextComponent(props){
  const [string, setString] = useState(props.text);

  return(
    <div id={props.id?props.id:""} className="TextContainer">
      {string}
    </div>
  )
}

export default TextComponent;
