import React, { useRef, useEffect, useState } from 'react';

import './Overlay.css';

const text1 = `올해 A, B 도시의 육류 소비량은 매우 크게 증가하였다.
A 도시는 농축산업 지원정책에 따른,
B 도시는 도시화에 따른 결과였다.
`
const text2 = `월별 소비량은 다음과 같으며,
A 도시는 30t에서 210t으로, B 도시는 90t에서 180t으로
둘 다 비교적 꾸준한 상승세를 보였다.
`
const text3 = `그렇다면 식량 자급자족률도 높아졌을까?
결과는 상반되었다.
A 도시는 30%에서 80%까지 치솟았고,
B 도시는 60%에서 40%로 수치가 감소했다.
`
const text4 = `이를 극복하고자 한다면,
도시화가 진행되는 지역 주변에 농축산업 중점 지역을 형성하여
높은 식량 자급자족률을 통해 원활한 신선식품 공급을 기대할 수 있다.
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
        A, B 도시의 식량 소비
      </div>
    </div>
    <div className={"Texts"}>
      <TextComponent text = {text1}/>
      <TextComponent text = {text2}/>
      <TextComponent text = {text3}/>
      <TextComponent text = {text4}/>
      <button class="Button"
              type="button">
        Go to Quiz
      </button>
    </div>
  </div>
))

export default Overlay
