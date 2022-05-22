import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';
import { Text } from "troika-three-text";
import fonts from "./fonts";

extend({ Text });

export const Static = 100;
export const Animated = 101;
export const Immersive = 110;

export const StaticNon1 = 1000;
export const AnimatedNon = 1001;
export const ImmersiveNon = 1010;
export const StaticNon2 = 1011;
export const StaticImm = 1100;
export const AnimatedImm = 1101;
export const ImmersiveImm = 1110;

export const EndOfTask = -1;

const opts = {
  font: "roboto",
  fontSize: "2.5",
  color: "black",
  maxWidth: 300,
  lineHeight: 1,
  letterSpacing: 0,
  textAlign: "justify",
  materialType: "MeshPhongMaterial"
};

export const XAXIS1 = 10000;
export const YAXIS1 = 10001;
export const YAXIS2 = 10010;
export const ZAXIS1 = 10011;

export const title = `Does Urbanization Affect
Food Consumption Pattern?
`
export const text1 = `X and Y became highly urbanized during the last year. As a result, the graph demonstrates that both X and Y had a noticeable increase in food consumption.
`
export const text2 = `The monthly chart shows in detail that the increasing trends were distinct. While X's food consumption increased noticeably after May, Y's went up steadily.
`
export const text3 = `However, the vegetable and grain consumption timeline revealed the contrasting patterns of the two cities.
`
export const text4 = `In the early of 2021, the ratio of vegetable and grain consumption in both cities were comparable.
`
export const text5 = `Y's ratio has exceeded X's since May. The gap between the two cities kept increasing until the end of 2021.
`
export const text6 = `In sum, urbanization appeared to affect both the total and composition of consumption. However, there was no direct causal relationship with the type of consumption pattern.
`

function Line({ start, end, color }) {
  const ref = useRef();
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  }, [start, end])
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} />
    </line>
  )
}

function TextBox({text, anchorX, anchorY, label}){
  const ref = useRef();
  useFrame((state) => {
    ref.current.lookAt(new THREE.Vector3(state.camera.position.x, state.camera.position.y, state.camera.position.z));
    if(label == XAXIS1){
      // ref.current.rotateX(Math.PI / 2);
    }else if(label == YAXIS1){
      ref.current.rotateZ(Math.PI / 2);
    }else if(label == YAXIS2){
      ref.current.rotateZ(Math.PI / 2);
    }else if(label == ZAXIS1){

    }
  })

  return(
    <text {...opts} ref={ref} text={text + ""} font={fonts[opts.font]} anchorX={anchorX} anchorY={anchorY}>
      {opts.materialType === "MeshPhongMaterial" ? (
        <meshPhongMaterial attach="material" color={opts.color} side={THREE.DoubleSide} />
      ) : null}
    </text>
  )
}

function Rect({ width, height, depth, color, opacity }){
  let myHeight = height / 5;
  const geometry = new THREE.BoxGeometry(width, myHeight, depth);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry));

  return(
    <>
      <mesh raycast={() => null} position={[0, myHeight / 2, 0]}>
        <boxGeometry args={[width, myHeight, depth]} />
        <meshStandardMaterial color={color} transparent={true} opacity={opacity} />
      </mesh>
      <mesh raycast={() => null} position={[0, myHeight / 2, 0]}>
        <lineSegments geometry={edges} renderOrder={100}>
          <lineBasicMaterial color="lightgrey"/>
        </lineSegments>
      </mesh>
    </>
  )
}

function TextComponent(props){
  const [string, setString] = useState(props.text);
  const [margin, setMargin] = useState(props.margin);
  const [left, setLeft] = useState(props.left);
  const [top, setTop] = useState(props.top);

  return(
    <div  id={props.id}
          className="TextContainer"
          style={{
            marginBottom: margin,
            left: left,
            top: top
          }}>
      {string}
    </div>
  )
}

// function TextsCollection(props){
//   if(props.texts === "undefined" || props.lefts === "undefined" || props.margins === "undefined"){
//     throw 'not valid textcomponents attributes'
//   }
//
//   const len = props.length;
//
// }

export {Line, TextBox, Rect, TextComponent};
