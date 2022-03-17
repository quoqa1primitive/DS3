import React, { useRef, useEffect, useState, useImperativeHandle } from 'react';

import './Overlay1.css';

const text1 = `2021년동안 A는 농축산업이 가장 발달한 지역,
B는 도시화가 가장 빠르게 일어난 지역으로 선정되었다.

두 지역 모두 빠른 발전을 이뤘다는 공통점이 있는 상황에서
우리는 육류 소비와 식량자족에 관련하여 흥미로운 가능성을 발견했다.
`

const text2 = `첫째로 육류 소비량은 두 도시에서 모두 증가했다.
이와 관련하여 A지역에 거주하는 Kim씨는 다음과 같이 얘기했다.
"금방 기를 수 있는 닭과 같은 육류를 자주 먹게 되었다."
`

const text3 = `월별 소비량은 다음과 같으며,
A는 30t에서 210t으로, B는 90t에서 180t으로
둘 다 비교적 꾸준한 상승세를 보였다.
`
const text4 = `그렇다면 식량 자급자족률도 높아졌을까?
결과는 상반되었다.
A는 60%에서 40%로 감소한 반면,
B는 30%에서 80%까지 치솟았다.
`
const text5 = `위 경우를 일반화하면,
급격한 도시화가 이루어짐에 따라 필요한 신선식품 공급은
복잡한 long distance transportation system이 아닌,
B와 같은 nearby 지역을 활용할 수 있다는 것이다.
`

function TextComponent(props){
  const [string, setString] = useState(props.text);
  const [margin, setMargin] = useState(props.margin);
  const [left, setLeft] = useState(props.left);

  return(
    <div  id={props.id}
          className="TextContainer"
          style={{
            marginBottom: margin,
            left: left
          }}>
      {string}
    </div>
  )
}

function Overlay({ scroll, quiz, onClick }, ref){
  const ref1 = useRef();
  const ref2 = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
     ref1.current.focus();
    },
    get ref1() {
        return ref1.current;
    },
    get ref2() {
        return ref2.current;
    },
    // ... whatever else one may need
  }));

  return (
    <div
      className="PageController"
      id="pageController"
      ref={ref1}
      onScroll={(e) => {
        scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
      }}>
      <div className="TitleContainer">
        <div className="Title">
          Who Gave My Meat?
        </div>
      </div>
      <div className={"Texts"}>
        <TextComponent id={"text1"} text={text1} left={"60%"} margin={"25vh"} />
        <TextComponent id={"text2"} text={text2} left={"40%"} margin={"75vh"} />
        <TextComponent id={"text3"} text={text3} left={"55%"} margin={"110vh"} />
        <TextComponent id={"text4"} text={text4} left={"25%"} margin={"110vh"} />
        <TextComponent id={"text5"} text={text5} left={"40%"} margin={"75vh"} />
        <button className="Button"
                ref={ref2}
                type="button"
                onClick={()=>{
                  console.log("clicked");
                  onClick();
                }}>
          Go to Quiz
        </button>
      </div>
    </div>
  )
}

Overlay = React.forwardRef(Overlay);

export default Overlay
