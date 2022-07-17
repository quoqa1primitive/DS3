import * as THREE from 'three'
import React, { useRef, useLayoutEffect, useState, useMemo, Suspense } from 'react'
import { Canvas, useThree, useLoader, useFrame, extend } from '@react-three/fiber'
import { Water } from './Water.js';
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';
import { Line as DreiLine } from '@react-three/drei';
import { Text } from "troika-three-text";
import fonts from "./fonts";
import { XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from './Constants.js'
extend({ Water, Text });

function Image(){

}

function Ocean({ surfacePosition, ...props }) {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(
    THREE.TextureLoader, "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
  );

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunColor: new THREE.Color("#ffffff"),
      waterColor: new THREE.Color("#7F7F7F"),
      distortionScale: 5,
      side: THREE.DoubleSide,
      format: gl.encoding,
    }),
    [waterNormals]
  );

  useLayoutEffect(() => {
    ref.current.material.toneMapped = false;
    ref.current.material.transparent = true;
    ref.current.material.uniforms.size.value = 2;
    ref.current.material.uniforms.alpha.value = 0.70;
    console.log(ref.current.material);
  },[]);

  useFrame(
    (state, delta) => (ref.current.material.uniforms.time.value += delta * 0.5)
  );

  const water = useMemo(() =>
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      position={[0, surfacePosition, 0]}
    />
  );

  return (
    <>{water}</>
  );
}


function Disc({ bottomPosition, radius, height, color, opacity=1, greenTop=false, ...props }){
  const ref = useRef();
  const color4 = new THREE.Color("#B4A0A6");
  const color4_bright = new THREE.Color("#d7ccce");
  const color4_dark = new THREE.Color("#866972");
  const depth = 100;
  const cylinderGeometry = useMemo(() => new THREE.BoxGeometry(radius, height, depth));
  const edges = useMemo(() => new THREE.EdgesGeometry(cylinderGeometry));

  useLayoutEffect(() => {
    console.log(ref.current);
  }, []);

  return(
    <>
      <mesh ref={ref} raycast={() => null} position={[radius/2, bottomPosition, -depth/2]}>
        <boxGeometry args={[radius, height, depth]} />
        <meshBasicMaterial attachArray={"material"} color={false?color:color4_dark} transparent={true} opacity={opacity} />
        <meshBasicMaterial attachArray={"material"} color={color4} transparent={true} opacity={opacity} />
        <meshBasicMaterial attachArray={"material"} color={color4_bright} transparent={true} opacity={opacity} />
        <meshBasicMaterial attachArray={"material"} color={color4} transparent={true} opacity={opacity} />
        <meshBasicMaterial attachArray={"material"} color={color4} transparent={true} opacity={opacity} />
        <meshBasicMaterial attachArray={"material"} color={color4} transparent={true} opacity={opacity} />
      </mesh>
      <mesh raycast={() => null} position={[radius/2, bottomPosition, -depth/2]}>
        <lineSegments geometry={edges} renderOrder={100}>
          <lineBasicMaterial color={new THREE.Color("#5B3F36")}/>
        </lineSegments>
      </mesh>
    </>
  )
}

function Line({ start, end, color, dashed=false, ...props }) {
  const ref = useRef();
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
    // ref.current.material.linewidth = 5;
    // console.log(ref.current);
    // 아래 함수는 dashed를 나타내기 위해 필요함, material만 지정해준다고 dashed로 변하지 않았음
    ref.current.computeLineDistances();
  }, [start, end])
  return (
    <line ref={ref}>
      <bufferGeometry />
      <If if={props.dashed == true}>
        <lineDashedMaterial dashSize={1} gapSize={0.5} color={color} />
      </If>
      <If if={props.dashed != true}>
        <lineBasicMaterial color={color} />
      </If>
    </line>
  )
}

function ChangePoint({ text, start, end, color, linewidth, ...props }) {
  return(
    <>
      <DreiLine
        points={[start, end]}
        color={color}
        lineWidth={linewidth}
        dashed={true}
      />
      <TextBox position={end} text={text} />
    </>
  )
}

function TextBox({position=[0, 0, 0], lookAt=true, text, textType="default", anchorX="left", anchorY="middle", label, ...props}){
  const refPosition = useRef();
  const ref = useRef();
  const opts = useMemo(() => getOpts(textType));
  function getOpts(type){
    return type == "title"? {
      font: "Noto Sans",
      fontSize: 7.5,
      color: "black",
      maxWidth: 100,
      lineHeight: 1.15,
      letterSpacing: 0,
      textAlign: "center",
      materialType: "MeshBasicMaterial",
    } : type == "plain"? {
        font: "Noto Sans",
        fontSize: 2.5,
        color: "black",
        maxWidth: 65,
        lineHeight: 1.15,
        letterSpacing: 0,
        textAlign: "left",
        materialType: "MeshBasicMaterial",
        outlineColor: new THREE.Color("rgb(248, 245, 240)"),
        outlineOpacity: 0.50,
        outlineWidth: 0.75,
        outlineBlur: 5,
    } : {
      font: "Noto Sans",
      fontSize: 2.5,
      color: "black",
      maxWidth: 65,
      lineHeight: 1.15,
      letterSpacing: 0,
      textAlign: "left",
      materialType: "MeshBasicMaterial",
      // below outline is added for removal of white outline when having a background of shader material plane
      outlineColor: new THREE.Color("rgb(0, 0, 0)"),
      outlineWidth: 0.00,
    }
  }

  useFrame((state) => {
    if(lookAt){
      ref.current.lookAt(new THREE.Vector3(state.camera.position.x, state.camera.position.y, state.camera.position.z));
    }
    // console.log(textType)
    if((textType=="title") || (textType=="plain")) {
      ref.current.scale.set(
        6.25/state.camera.zoom,
        6.25/state.camera.zoom,
        1
      );
      refPosition.current.position.setComponent(1, position[1] * 6.25 / state.camera.zoom)
    }
    if(label == XAXIS1){
      // ref.current.rotateX(Math.PI / 2);
    }else if(label == YAXIS1){
      ref.current.rotateZ(Math.PI / 2);
    }else if(label == YAXIS2){
      ref.current.rotateZ(Math.PI / 2);
    }else if(label == ZAXIS1){

    }
  })

  useLayoutEffect(() => {
    console.log(ref.current);
  }, []);

  return(
    <group ref={refPosition} position={position}>
      <text {...opts}
        ref={ref}
        text={text + ""}
        font={fonts[opts.font]}
        anchorX={anchorX}
        anchorY={anchorY}>
        {opts.materialType === "MeshBasicMaterial" ? (
          <meshBasicMaterial attach="material" color={opts.color} side={THREE.DoubleSide} />
        ) : null}
      </text>
    </group>
  )
}

function Rect({ width, height, depth, color, opacity }){
  let myHeight = height / 5;
  const geometry = useMemo(() => new THREE.BoxGeometry(width, myHeight, depth));
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

function transitionsExtender(transitions, target, lastFrame){
  let newTransitions = [];
  transitions.forEach(element =>{
    if(element.target == target){
      newTransitions.push(element);
    }
  });
  for(let i=0; i<=lastFrame; i++){
    let now = newTransitions.find(element => element.from.frame <= i && element.to.frame > i);
    if(now == undefined){ // is not included in any of transitions
      for(let j=i; j<=lastFrame; j++){ // then find nearest next transition
        let nextTransition = newTransitions.find(element => element.from.frame == j);
        if(nextTransition != undefined){
          newTransitions.push({
            "target": target,
            "from": {"frame": i, "clip": nextTransition.from.clip},
            "to": {"frame": j, "clip": nextTransition.from.clip},
            "easing": "bezier", "motion": {"type": "linear"}
          });
          break; // if found, break for loop and keep searching not included frame(i)
        }else if(nextTransition == undefined && j==lastFrame && i!=lastFrame){
          // if not found until the last, copy the last clip
          let nextTransition = newTransitions.find(element => element.to.frame == i);
          newTransitions.push({
            "target": target,
            "from": {"frame": i, "clip": nextTransition.to.clip},
            "to": {"frame": lastFrame, "clip": nextTransition.to.clip},
            "easing": "bezier", "motion": {"type": "linear"}
          });
        }
      }
    }
  }
  return newTransitions;
}

function getClipData(clips, target, name){
  return clips.find(element => (element.target == target && element.name == name));
}

function interpolate(startVal, endVal, duration, time, postType, motion){
  function calcInterpolation(startVal, endVal, progress, postType){
    let easedVal = (postType == 'bezier')? startVal + (endVal - startVal) * bezierFunc(progress) :
      (postType == 'stopper')? startVal :
      (postType == 'linear')? startVal + (endVal - startVal) * progress : progress
    return easedVal;
  }

  const bezier = require('bezier-easing');
  const bezierFunc = bezier(0.4, 0, 0.4, 1);
  const progress = time / duration;

  let interpolatedVal = {};
  for(const property in startVal){
    if(Array.isArray(startVal[property])){
      let arr = [];
      for(let i=0; i<startVal[property].length; i++){
        arr.push(calcInterpolation(startVal[property][i], endVal[property][i], progress, postType, motion));
      }
      interpolatedVal[property] = arr;
    }else if(property != "target" && property != "name"){
      interpolatedVal[property] = calcInterpolation(startVal[property], endVal[property], progress, postType, motion);
    }
  }

  if(motion.type == "sin"){
    interpolatedVal[motion.attribute][motion.args.axis] += motion.args.height * Math.sin(bezierFunc(progress) * Math.PI);
  }

  interpolatedVal.name = startVal.name;
  interpolatedVal.target = startVal.target;
  // console.log(interpolatedVal);

  return interpolatedVal;
}

function statesConverter(initStates, stoppers){
  let states = [];
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
      states.push(initStates[i]);
      states.push(initStates[i] + stoppers[i]);
    }
  }
  return states;
}

function AnimationGenerator(totalFrame, initStates, stoppers, clips, transitions){
  let targets = ["group1", "camera"];
  let states = statesConverter(initStates, stoppers);
  let animations = [];

  for(let t=0; t<targets.length; t++){
    let newTransition = transitionsExtender(transitions, targets[t] ,initStates.length - 1);
    let animation = [];
    for(let i=0; i<totalFrame; i++){
      let currentStep = states.findIndex((ele) => ele > i / totalFrame) - 1;
      let timeframe = Math.floor((currentStep+1)/3);
      let transition = newTransition.find(element => (element.from.frame*3 <= currentStep && element.to.frame*3 > currentStep));
      let startClip = getClipData(clips, targets[t], transition.from.clip);
      let endClip = getClipData(clips, targets[t], transition.to.clip);

      if(currentStep == transition.from.frame*3){
        animation = animation.concat(startClip);
      }else if(currentStep == transition.to.frame*3-1){
        animation = animation.concat(endClip);
      }else{
        animation = animation.concat(interpolate(
          startClip,
          endClip,
          states[transition.to.frame*3-1]-states[transition.from.frame*3+1],
          i/totalFrame-states[transition.from.frame*3+1],
          transition.easing,
          transition.motion
        ));
      }
    }
    animations.push({
      "target": targets[t],
      "animation": animation
    });
  }
  console.log(animations)
  return animations;
}

function If(props){
  return <>{props.if && props.children}</>;
};

export {Ocean, Disc, Line, ChangePoint, TextBox, Rect, LineMark, TextComponent, statesConverter, AnimationGenerator, If};
