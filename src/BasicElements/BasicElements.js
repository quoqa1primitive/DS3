import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';
import { Text } from "troika-three-text";
import fonts from "./fonts";
import { XAXIS1, YAXIS1, YAXIS2, ZAXIS1, totalFrame } from './Constants.js'
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

function getPt(v1, v2, v3, thickness){
  let vector1 = new THREE.Vector2(v2[0] - v1[0], v2[1] - v1[1]);
  let vector2 = new THREE.Vector2(v3[0] - v2[0], v3[1] - v2[1]);

  let angle1 = -vector1.angle() + Math.PI / 2 + Math.PI * 2;
  if(angle1 > (Math.PI * 2)) angle1 -= Math.PI * 2;
  let angle2 = -vector2.angle() + Math.PI / 2 + Math.PI * 2;
  if(angle2 > (Math.PI * 2)) angle2 -= Math.PI * 2;

  let angle = (Math.PI - angle1 + angle2) / 2;
  let newThickness = thickness / Math.sin(angle);

  let vectorP = vector2.clone().normalize().rotateAround(new THREE.Vector2(0, 0), angle).multiplyScalar(newThickness);
  return [vectorP.x/2, vectorP.y/2];
}

function LineMark({ vertices, width, depth, color, opacity }){
	let shape, geometry, mesh, extrudeSetting;
	extrudeSetting = {
		steps: 2,
		depth: depth,
		bevelEnabled: false
	};

  let cLen = vertices.length;
  let tempPt;
  shape = new THREE.Shape();
  let tempPts = []

  tempPts.push(getPt([2*vertices[0][0]-vertices[1][0], vertices[1][1]], vertices[0], vertices[1], width));
  shape.moveTo(vertices[0][0]-tempPts[0][0], vertices[0][1]-tempPts[0][1]);
  shape.lineTo(vertices[0][0]+tempPts[0][0], vertices[0][1]+tempPts[0][1]);

  for(let j=0; j<cLen-2; j++){
    tempPts.push(getPt(vertices[j], vertices[j+1], vertices[j+2], width));
    shape.lineTo(vertices[j+1][0]+tempPts[j+1][0], vertices[j+1][1]+tempPts[j+1][1]);
  }

  tempPts.push(getPt(vertices[cLen-2], vertices[cLen-1], [2*vertices[cLen-1][0]-vertices[cLen-2][0], vertices[cLen-2][1]], width));
  shape.lineTo(vertices[cLen-1][0]+tempPts[cLen-1][0], vertices[cLen-1][1]+tempPts[cLen-1][1]);

  for(let j=cLen-1; j>=0; j--){
    shape.lineTo(vertices[j][0]-tempPts[j][0], vertices[j][1]-tempPts[j][1]);
  }

	// make geometry & mesh
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSetting);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry));

  return(
    <>
      <mesh raycast={() => null}>
        <extrudeGeometry args={[shape, extrudeSetting]} />
        <meshStandardMaterial color={color} transparent={true} opacity={opacity} />
      </mesh>
      <mesh raycast={() => null}>
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

function interpolate(startVal, endVal, duration, time, postType){
  // values => posX, posY, posZ, rotX, rotY, rotZ, opacity
  const bezier = require('bezier-easing');
  let bezierFunc = bezier(0.4, 0, 0.4, 1);

  let progress = time / duration;

  return (postType == 'sin') ? startVal + 1000 * Math.sin(bezierFunc(progress) * Math.PI) :
  (postType == 'bezier')? startVal + (endVal - startVal) * bezierFunc(progress) :
  (postType == 'stopper')? startVal :
  (postType == 'linear')? startVal + (endVal - startVal) * progress : progress;
}

function statesConverter(initStates, stoppers, initValues){
  let states = [], values = [];
  // Required!!!  states[0] = 0, states[-1] = 1
  for(let i=0; i<initStates.length; i++){
    if(i == 0){
      states.push(initStates[i]);
      states.push(initStates[i] + stoppers[i]);
    }else if(i == initStates.length - 1){
      states.push(initStates[i] - stoppers[i]);
      states.push(initStates[i]);
    }else{
      states.push(initStates[i] - stoppers[i]);
      states.push(initStates[i] + stoppers[i]);
    }
    values.push(initValues[i]);
    values.push(initValues[i]);
  }
  return {states: states, values: values};
}

function AnimationGenerator(initStates, stoppers, initValues, posts){
  let animation = [];
  let states_values = statesConverter(initStates, stoppers, initValues);

  for(let i=0; i<totalFrame; i++){
    let currentStep = states_values.states.findIndex((ele) => ele > i / totalFrame) - 1;
    let currentPost = (currentStep % 2 == 1) ? posts[Math.floor(currentStep / 2)] : 'stopper';

    let interpolated = interpolate(
      states_values.values[currentStep],
      states_values.values[currentStep + 1],
      states_values.states[currentStep + 1] - states_values.states[currentStep],
      i / totalFrame - states_values.states[currentStep],
      currentPost
    );
    animation = animation.concat(interpolated)
  }
  return animation;
}

export {Line, TextBox, Rect, LineMark, TextComponent, statesConverter, AnimationGenerator};
