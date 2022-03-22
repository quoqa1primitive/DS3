import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';
import { Text } from "troika-three-text";
import fonts from "./fonts";

extend({ Text });

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

export const XAXIS1 = 1000;
export const YAXIS1 = 1001;
export const YAXIS2 = 1010;
export const ZAXIS1 = 1011;

export const text1 = `A was chosen as the area with the quickest rate of urbanization. B is the region with the best developed agricultural and animal industries in 2021.

We've discovered some intriguing potential in terms of meat consumption and food self-sufficiency, given that both regions have experienced rapid growth.
`

export const text2 = `First of all, meat consumption in both cities has increased. Kim, who lives in Area B, had this to say about it:
"Perhaps because it's easy to raise, chicken is inexpensive recently, and I eat it often."
`

export const text3 = `As shown in the chart, A showed monthly consumption from 30t to 210t and B from 90t to 180t. Both showed relatively steady increase.
`
export const text4 = `Then, has the self-sufficiency rate of food increased? The results were contrary. While A decreased from 60% to 40%, B soared from 30% to 80%.
`
export const text5 = `To broaden the scope of the preceding example, this means that in regions where significant urbanization occurs, the supply of fresh food does not have to rely on long-distance imports, but can take advantage of both freshness and price by leveraging adjacent locations such as B.
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

export {Line, TextBox, Rect, TextComponent};
