import React, { useRef, useEffect, useState } from 'react';

import './Overlay.css';

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

function TextComponent(props){
  const [string, setString] = useState(props.text);

  return(
    <div className="TextContainer">
      {string}
    </div>
  )
}

const Overlay = React.forwardRef(({ scroll }, ref) => (
  <div
    className="PageController"
    ref={ref}
    onScroll={(e) => {
      scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
    }}>
    <div className="TitleContainer">
      <div className="Title">
        식량 소비에 관하여
      </div>
    </div>
    <div className={"Texts"}>
      <TextComponent text = {text1}/>
      <TextComponent text = {text2}/>
      <TextComponent text = {text3}/>
      <TextComponent text = {text4}/>
    </div>
    <div className={"QuizButton"}>

    </div>
  </div>
))

export default Overlay
