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

export const title = `How Can Urbanized City Get Fresh Meat?
`
export const text1 = `X and Y are two nearby cities. During the last year they have gone through different paths. While X became highly urbanized, Y developed infrastructures for agriculture supported by the local government.
`
export const text2 = `Although it is due to different situations, the two cities showed a rapid increase in meat consumption in 2021.
`
export const text3 = `Monthly chart shows that meat consumption in two cities steadily increased. It is noteworthy that X's meat consumption dramatically increased after June.
`
export const text4 = `However, meat export of the two cities shows opposite relationship. X's export fell, while Y's increased.
`
export const text5 = `After May, meat export of Y exceeded that of X. Most of exported meat from Y were consumed by X.
`
export const text6 = `The gap kept increasing till the end of 2021. During that period, Y played a significant role as a meat supplier.
`
export const text7 = `Even though this article only focused on meat consumption and export, the case of cities X and Y implies that various economic exchanges can help smooth urbanizing.
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

export {Line, TextBox, Rect, TextComponent};
