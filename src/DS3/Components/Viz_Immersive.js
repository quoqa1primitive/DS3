import * as THREE from 'three'
import { Line2 } from "three/examples/jsm/lines/Line2"
import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { useThree, useLoader, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, PerspectiveCamera, SpotLight } from '@react-three/drei';
import { Line, ChangePoint, Rect, TextBox, If } from '../../BasicElements/BasicElements.js';
import { XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from '../../BasicElements/Constants.js';
import { xyzProps, centerPos, xLength, yLength, zLength, xPadding, yPadding, zPadding, xSteps, ySteps, zSteps, tickLength, totalFrame, TextComponentHeight, color4, color4_bright, color4_dark, color_ocean2, color_lineSeg } from '../BaseStructure/Constants_DS2.js';
import { useStore } from '../BaseStructure/Store.js';
import {adjustedArr1, adjustedArr2, adjustedArr3, arr1, arr2, arr3, adjustedB1, adjustedA1B2, adjustedA2B3, adjustedA3} from './snpData.js';
import { Text } from "troika-three-text";
import { Line as DreiLine } from '@react-three/drei';
extend({ Text });

const opts = {
  font: "https://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr5TRG.woff",
  fontSize: 50.0,
  color: "black",
  maxWidth: 65,
  lineHeight: 1.15,
  letterSpacing: 0,
  textAlign: "left",
  materialType: "MeshBasicMaterial",
};

const yScale = 20;
const xScale = 30;
const lineWidth = 80;

function HorizontalAnnotation({position=[0,0,0], text, length, textType, interval, ...props}) {
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(length,0,0)]), []);
  const annot = useMemo(()=>
    <group position={position}>
      <TextBox position={[-interval, 0, 0]} text={text} textType={textType}/>
      <line geometry={geometry}>
        <lineBasicMaterial transparent opacity={0.3} />
      </line>
    </group>
  , []);

  return(
    <>{annot}</>
  )
}

function Annotation({position=[0,0,0], text, length, dotSize=10, yInterval=400, ...props}){
  const animation_rl = useStore((state) => state.animation_rl);
  const idx = useStore((state) => state.idx);

  const points = useMemo(() => [new THREE.Vector3(0,0,0), new THREE.Vector3(0, -length, 0)], []);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), []);
  const dotGeometry = useMemo(() => new THREE.CircleGeometry(dotSize, 50), []);
  const annot = useMemo(()=>
    <group position={position}>
      <mesh geometry={dotGeometry}>
        <meshBasicMaterial/>
      </mesh>
      <line geometry={geometry}>
        <lineDashedMaterial color="white" transparent opacity={0.3} dashSize={5}/>
      </line>
      <DreiLine points={[[0, 0, 0], [0, -length*2, 0]]} color={"white"} lineWidth={1} dashed={true} />
    </group>
  , []);
  return(
    <>
      {annot}
      <group position={position}>
        <text {...opts}
          text={text} fillOpacity={animation_rl[0]["animation"][idx].opacityAxis}
          font={opts.font} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
      </group>
    </>
  )
}

function Axis({position=[0,0,0], lenY, lenX, ...props}){
  const text1 = useMemo(() => `the first impact of COVID-19
  (FEB 2020)`, []);
  const text2 = useMemo(() => `Delta variant emerges
  (SEPT 2021)`, []);
  const text3 = useMemo(() => `Omicron variant emerges
  (NOV 2021)`, []);
  const text1Pos = useMemo(() => [(adjustedB1.length-1)*xScale, 2500 + (adjustedArr1[0]-adjustedArr3[0]+adjustedArr1[0])*yScale, 0], []);
  const text2Pos = useMemo(() => [(adjustedB1.length+adjustedArr1.length+adjustedA1B2.length-3)*xScale, 2500 + (adjustedArr2[0]-adjustedArr3[0]+adjustedArr1[0])*yScale, 0], []);
  const text3Pos = useMemo(() => [(adjustedB1.length+adjustedArr1.length+adjustedA1B2.length+adjustedArr2.length+adjustedA2B3.length-5)*xScale, 2500 + adjustedArr1[0]*yScale, 0], []);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(lenX, 0, 0)]), []);
  const axis = useMemo(() =>
    <group position={position}>
      <line geometry={geometry}>
        <lineDashedMaterial color="white" transparent opacity={1} dashSize={10} gapSize={1000} scale={1}/>
      </line>
      <Annotation position={text1Pos} text={text1} textType={"axis"} length={2500 + (adjustedArr1[0]-adjustedArr3[0]+adjustedArr1[0])*yScale}/>
      <Annotation position={text2Pos} text={text2} textType={"axis"} length={2500 + (adjustedArr2[0]-adjustedArr3[0]+adjustedArr1[0])*yScale }/>
      <Annotation position={text3Pos} text={text3} textType={"axis"} length={2500 + adjustedArr1[0]*yScale } />
      <HorizontalAnnotation position={[0,0,0]}        text={"2,000"} textType={"axis"} interval={600} length={lenX}/>
      <HorizontalAnnotation position={[0,600-100,0]}  text={"2,500"} textType={"axis"} interval={600} length={lenX}/>
      <HorizontalAnnotation position={[0,1200-100,0]} text={"3,000"} textType={"axis"} interval={600} length={lenX}/>
      <HorizontalAnnotation position={[0,1800-100,0]} text={"3,500"} textType={"axis"} interval={600} length={lenX}/>
      <HorizontalAnnotation position={[0,2400-100,0]} text={"4,000"} textType={"axis"} interval={600} length={lenX}/>
    </group>
  , []);
  return(
    <>{axis}</>
  )
}

function FinalAxis({position=[0,0,0], lenX, ...props}){
  const points = [];
  // points.push(new THREE.Vector3( 0,lenY,0 ));
  points.push(new THREE.Vector3( 0,0,0 ));
  points.push(new THREE.Vector3( lenX,0,0 ));
  const expire1 = `recovery of the initial impact D+52`;
  const expire2 = `recovery of the Delta variant D+52`;
  const expire3 = `recovery of the Omicron variant D+52`;
  const min1 = `floor at 2702.3`;
  const min2 = `floor at 2702.3`;
  const min3 = `floor at 2702.3`;
  const text3 = `Omicron variant emerges
  (NOV 2021)`;
  const line1Height = (adjustedArr1[0]-adjustedArr3[0]+adjustedArr1[0])*yScale;
  const gap = 190;
  const minV1 = 24;
  const minV2 = 22;
  const minV3 = 9;

  const exp1Pos = [(adjustedArr1.length-1)*xScale,line1Height,0];
  const exp2Pos = [(adjustedArr2.length-1)*xScale,line1Height,0];
  const exp3Pos = [(adjustedArr3.length-1)*xScale,line1Height,0];
  const min1Pos = [minV1*xScale, line1Height -(adjustedArr1[0]-adjustedArr1[minV1])*yScale,0];
  const min2Pos = [minV2*xScale, line1Height -(adjustedArr2[0]-adjustedArr2[minV2])*yScale,0];
  const min3Pos = [minV3*xScale, line1Height -(adjustedArr3[0]-adjustedArr3[minV3])*yScale,0];
  const axis = useMemo(() =>
    <group position={position}>
      <Annotation position={exp1Pos} length={50} yInterval={20} text={expire1} textType={"finalaxis"} />
      <Annotation position={exp2Pos} length={50} yInterval={20} text={expire2} textType={"finalaxis"} />
      <Annotation position={exp3Pos} length={-50} yInterval={-40} text={expire3} textType={"finalaxis"} />
      <Annotation position={min1Pos} length={50} yInterval={20} text={min1} textType={"finalaxis"} />
      <Annotation position={min2Pos} length={50} yInterval={20} text={min2} textType={"finalaxis"} />
      <Annotation position={min3Pos} length={-400} yInterval={-40} text={min3} textType={"finalaxis"} />
      <HorizontalAnnotation position={[0,line1Height,0]} text={"0%"} textType={"finalaxis"} interval={100} length={lenX}/>
      <HorizontalAnnotation position={[0,line1Height-gap,0]} text={"-5%"} textType={"finalaxis"} interval={100} length={lenX}/>
      <HorizontalAnnotation position={[0,line1Height-gap*2,0]} text={"-10%"} textType={"finalaxis"} interval={100} length={lenX}/>
      <HorizontalAnnotation position={[0,line1Height-gap*3,0]} text={"-15%"} textType={"finalaxis"} interval={100} length={lenX}/>
      <HorizontalAnnotation position={[0,line1Height-gap*4,0]} text={"-20%"} textType={"finalaxis"} interval={100} length={lenX}/>
      <HorizontalAnnotation position={[0,line1Height-gap*5,0]} text={"-25%"} textType={"finalaxis"} interval={100} length={lenX}/>
      <HorizontalAnnotation position={[0,line1Height-gap*6,0]} text={"-30%"} textType={"finalaxis"} interval={100} length={lenX}/>
    </group>
  , []);
  return(
    <>{axis}</>
  )
}

function LongFense({arr, position}) {
  function Fense({position=[0, 0, 0], lookAt=true, date, text, anchorX="left", anchorY="middle", ...props}){
    const refPosition = useRef();
    const fenseHeight = 10;
    const geom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, fenseHeight, 0)]);
    const rail = useMemo(() =>
      <group ref={refPosition} position={position}>
        <line geometry={geom} position={[0,0,-lineWidth/2]}>
          <lineBasicMaterial color="white" transparent opacity={0.4}/>
        </line>
        <line geometry={geom} position={[0,0,lineWidth/2]}>
          <lineBasicMaterial color="white" transparent opacity={0.4}/>
        </line>
        <TextBox position={[0, fenseHeight + 3, lineWidth/2-7]} text={text} lookAt={lookAt}/>
        <TextBox position={[0, fenseHeight + 1, -lineWidth/2-7]} text={date} lookAt={lookAt}/>
      </group>
    , []);
    return(
      <>{rail}</>
    )
  }

  function fenseRail(posArr, textArr){
    const len = posArr.length;
    const arr = Array.from(Array(len), () => new Array(3));
    for (let i=0; i<len; i++) {
      arr[i][0] = new THREE.Vector3( i*xScale, posArr[i]*yScale, 0 )
      arr[i][1] = textArr[i][0];
      arr[i][2] = textArr[i][1];
    }
    return(arr);
  }
  const fenseArr1 = fenseRail(adjustedArr1, arr1);

  const rail = useMemo(() =>
    <group position={position}>
      {
        arr.map((point, idx) => {
          return(
            <Fense
            key={"Fense" + idx}
            position={point[0]}
            text={point[1]}
            date={point[2]}
            lookAt={true}/>
          );
        })
      }
    </group>
  , []);
  return(
    <>{rail}</>
  )
}

const VisComponent = React.forwardRef((props, ref) =>{
  const line1 = useRef();
  const line2 = useRef();
  const line3 = useRef();
  const oneJ = useRef();
  const grid = useRef();
  const yplane = useRef();
  const firstaxis = useRef();
  const finalaxis = useRef();
  const bfr1 = useRef();
  const aftr2bfr3 = useRef();
  const aftr1bfr2 = useRef();
  const aftr3 = useRef();
  // const target = useRef();
  const animation_rl = useStore((state) => state.animation_rl);
  // console.log(animation_rl);
  const idx = useStore((state) => state.idx);

  const extrudeSettings1 = { depth: lineWidth, bevelEnabled: false, bevelSegments: 1, steps: 2, bevelSize: 1, bevelThickness: 1 };
  const extrudeSettings2 = { depth: lineWidth/16, bevelEnabled: false, bevelSegments: 1, steps: 2, bevelSize: 1, bevelThickness: 1 };

  const interval = 3;
  const chartHeight = 150;
  const chartWidth = 1;

  function arrToShape(arr){
    let points = [];
    for (var i=0; i< arr.length; i++) {
      points.push( new THREE.Vector3( i*xScale, arr[i]*yScale, 0 ) );
    }
    for (var i=0; i< arr.length; i++) {
      let idx = arr.length -1 - i;
      points.push( new THREE.Vector3( idx*xScale, arr[idx]*yScale - chartWidth, 0) );
    }
    return( new THREE.Shape(points) );
  }

  const shape1 = arrToShape(adjustedArr1);
  const shape2 = arrToShape(adjustedArr2);
  const shape3 = arrToShape(adjustedArr3);
  const shapeB1 = arrToShape(adjustedB1);
  const shapeA2B3 = arrToShape(adjustedA2B3);
  const shapeA1B2 = arrToShape(adjustedA1B2);
  const shapeA3 = arrToShape(adjustedA3);

  const lineChart1  = useMemo(()=> new THREE.ExtrudeGeometry(shape1, extrudeSettings1), []);
  const edges1      = useMemo(()=> new THREE.EdgesGeometry(lineChart1), []);
  const middleLine1 = useMemo(()=> new THREE.ExtrudeGeometry(shape1, extrudeSettings2), []);

  const lineChart2  = useMemo(()=> new THREE.ExtrudeGeometry(shape2, extrudeSettings1), []);
  const edges2      = useMemo(()=> new THREE.EdgesGeometry(lineChart2), []);
  const middleLine2 = useMemo(()=> new THREE.ExtrudeGeometry(shape2, extrudeSettings2), []);

  const lineChart3  = useMemo(()=> new THREE.ExtrudeGeometry(shape3, extrudeSettings1), []);
  const edges3      = useMemo(()=> new THREE.EdgesGeometry(lineChart3), []);
  const middleLine3 = useMemo(()=> new THREE.ExtrudeGeometry(shape3, extrudeSettings2), []);

  const A3        = useMemo(()=> new THREE.ExtrudeGeometry(shapeA3, extrudeSettings1), []);
  const edgeA3    = useMemo(()=> new THREE.EdgesGeometry(A3), []);
  const mlA3      = useMemo(()=> new THREE.ExtrudeGeometry(shapeA3, extrudeSettings2), []);

  const A2B3      = useMemo(()=> new THREE.ExtrudeGeometry(shapeA2B3, extrudeSettings1), []);
  const edgeA2B3  = useMemo(()=> new THREE.EdgesGeometry(A2B3), []);
  const mlA2B3    = useMemo(()=> new THREE.ExtrudeGeometry(shapeA2B3, extrudeSettings2), []);

  const A1B2      = useMemo(()=> new THREE.ExtrudeGeometry(shapeA1B2, extrudeSettings1), []);
  const edgeA1B2  = useMemo(()=> new THREE.EdgesGeometry(A1B2), []);
  const mlA1B2    = useMemo(()=> new THREE.ExtrudeGeometry(shapeA1B2, extrudeSettings2), []);

  const B1        = useMemo(()=> new THREE.ExtrudeGeometry(shapeB1, extrudeSettings1), []);
  const edgeB1    = useMemo(()=> new THREE.EdgesGeometry(B1), []);
  const mlB1      = useMemo(()=> new THREE.ExtrudeGeometry(shapeB1, extrudeSettings2), []);
  // const cameraTarget = useMemo(()=> new THREE.BoxGeometry(1,1,1), []);
  const oneJum = useMemo(()=> new THREE.SphereGeometry(2), []);

  useFrame((state, delta) => {
    line1.current.position.setX(animation_rl[0]["animation"][idx].pos1[0]);
    line1.current.position.setY(animation_rl[0]["animation"][idx].pos1[1]);
    line1.current.position.setZ(animation_rl[0]["animation"][idx].pos1[2]);

    line2.current.position.setX(animation_rl[0]["animation"][idx].pos2[0]);
    line2.current.position.setY(animation_rl[0]["animation"][idx].pos2[1]);
    line2.current.position.setZ(animation_rl[0]["animation"][idx].pos2[2]);

    line3.current.position.setX(animation_rl[0]["animation"][idx].pos3[0]);
    line3.current.position.setY(animation_rl[0]["animation"][idx].pos3[1]);
    line3.current.position.setZ(animation_rl[0]["animation"][idx].pos3[2]);

    // console.log(line3.current.position);
  });

  useLayoutEffect(() => {
    aftr3.current.translateX(xScale*(adjustedArr3.length-1));
    aftr3.current.translateZ(2*interval*lineWidth);
    aftr3.current.translateY(-(adjustedArr3[0]-adjustedArr1[0])*yScale);

    line3.current.translateZ(2*interval*lineWidth);
    line3.current.translateY(-(adjustedArr3[0]-adjustedArr1[0])*yScale);

    aftr2bfr3.current.translateX(-xScale*(adjustedA2B3.length-1));
    aftr2bfr3.current.translateZ(2*interval*lineWidth);
    aftr2bfr3.current.translateY(-(adjustedArr3[0]-adjustedArr1[0])*yScale);

    line2.current.translateY(-(adjustedArr3[0]-adjustedArr1[0])*yScale);
    line2.current.translateX(-xScale*(adjustedArr2.length+adjustedA2B3.length-2));
    line2.current.translateZ(2*interval*lineWidth);

    aftr1bfr2.current.translateY(-(adjustedArr3[0]-adjustedArr1[0])*yScale);
    aftr1bfr2.current.translateX(-xScale*(adjustedArr2.length+adjustedA2B3.length+adjustedA1B2.length-3));
    aftr1bfr2.current.translateZ(2*interval*lineWidth);

    line1.current.translateY(-(adjustedArr3[0]-adjustedArr1[0])*yScale);
    line1.current.translateX(-xScale*(adjustedArr2.length+adjustedA2B3.length+adjustedA1B2.length+adjustedArr1.length-4));
    line1.current.translateZ(2*interval*lineWidth);

    bfr1.current.translateY(-(adjustedArr3[0]-adjustedArr1[0])*yScale);
    bfr1.current.translateX(-xScale*(adjustedArr2.length+adjustedA2B3.length+adjustedA1B2.length+adjustedArr1.length+adjustedB1.length-5));
    bfr1.current.translateZ(2*interval*lineWidth);

    grid.current.position.setY(-930);
    // firstaxis.current.rotateY(Math.PI/2);
    // ml1.current.translateZ(lineWidth/2);

  }, []);

  return(
    <group position={[0, 0, 0]} ref={ref}>
      {
        <>
          <group ref={line1}>
            <mesh geometry={lineChart1}>
              <meshStandardMaterial attach="material" color={new THREE.Color("rgb(" +
                Math.floor(animation_rl[0]["animation"][idx].color1[0]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color1[1]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color1[2]) + ")")}
                opacity={animation_rl[0]["animation"][idx].opacityLine} transparent />
            </mesh>
            <lineSegments geometry={edges1} renderOrder={100}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(" +
                Math.floor(animation_rl[0]["animation"][idx].color1[0]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color1[1]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color1[2]) + ")")}
                opacity={animation_rl[0]["animation"][idx].opacityLine} transparent />
            </lineSegments>
            <mesh position={[0,0,lineWidth/2]} geometry={middleLine1}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(" +
                Math.floor(animation_rl[0]["animation"][idx].color1[0]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color1[1]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color1[2]) + ")")}
                opacity={animation_rl[0]["animation"][idx].opacityML} transparent />
            </mesh>
          </group>
          <group ref={line2}>
            <mesh geometry={lineChart2}>
              <meshStandardMaterial attach="material" color={new THREE.Color("rgb(" +
                Math.floor(animation_rl[0]["animation"][idx].color2[0]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color2[1]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color2[2]) + ")")}
                opacity={animation_rl[0]["animation"][idx].opacityLine} transparent />
            </mesh>
            <lineSegments geometry={edges2} renderOrder={110}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(" +
                Math.floor(animation_rl[0]["animation"][idx].color2[0]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color2[1]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color2[2]) + ")")}
                opacity={animation_rl[0]["animation"][idx].opacityLine} transparent />
            </lineSegments>
            <mesh position={[0,0,lineWidth/2]} geometry={middleLine2}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(" +
                Math.floor(animation_rl[0]["animation"][idx].color2[0]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color2[1]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color2[2]) + ")")}
                opacity={animation_rl[0]["animation"][idx].opacityML} transparent />
            </mesh>
          </group>
          <group ref={line3}>
            <mesh geometry={lineChart3}>
              <meshStandardMaterial attach="material" color={new THREE.Color("rgb(" +
                Math.floor(animation_rl[0]["animation"][idx].color3[0]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color3[1]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color3[2]) + ")")}
                opacity={animation_rl[0]["animation"][idx].opacityLine} transparent />
            </mesh>
            <lineSegments geometry={edges3} renderOrder={120}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(" +
                Math.floor(animation_rl[0]["animation"][idx].color3[0]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color3[1]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color3[2]) + ")")}
                opacity={animation_rl[0]["animation"][idx].opacityLine} transparent />
            </lineSegments>
            <mesh position={[0,0,lineWidth/2]} geometry={middleLine3}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(" +
                Math.floor(animation_rl[0]["animation"][idx].color3[0]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color3[1]) + "," +
                Math.floor(animation_rl[0]["animation"][idx].color3[2]) + ")")}
                opacity={animation_rl[0]["animation"][idx].opacityML} transparent />
            </mesh>
          </group>

          <group ref={aftr2bfr3}>
            <mesh geometry={A2B3}>
              <meshStandardMaterial attach="material" color={new THREE.Color("rgb(110,110,110)")}
                opacity={animation_rl[0]["animation"][idx].opacityExtraLine} transparent />
            </mesh>
            <lineSegments geometry={edgeA2B3} renderOrder={120}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(200,200,200)")}
                opacity={animation_rl[0]["animation"][idx].opacityExtraLine} transparent />
            </lineSegments>
            <mesh position={[0,0,lineWidth/2]} geometry={mlA2B3}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(160,160,160)")}
                opacity={animation_rl[0]["animation"][idx].opacityExtraML} transparent />
            </mesh>
          </group>

          <group ref={aftr1bfr2}>
            <mesh geometry={A1B2}>
              <meshStandardMaterial attach="material" color={new THREE.Color("rgb(110,110,110)")}
                opacity={animation_rl[0]["animation"][idx].opacityExtraLine} transparent />
            </mesh>
            <lineSegments geometry={edgeA1B2} renderOrder={120}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(200,200,200)")}
                opacity={animation_rl[0]["animation"][idx].opacityExtraLine} transparent />
            </lineSegments>
            <mesh position={[0,0,lineWidth/2]} geometry={mlA1B2}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(160,160,160)")}
                opacity={animation_rl[0]["animation"][idx].opacityExtraML} transparent />
            </mesh>
          </group>

          <group ref={bfr1}>
            <mesh geometry={B1}>
              <meshStandardMaterial attach="material" color={new THREE.Color("rgb(110,110,110)")}
                opacity={animation_rl[0]["animation"][idx].opacityExtraLine} transparent />
            </mesh>
            <lineSegments geometry={edgeB1} renderOrder={120}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(200,200,200)")}
                opacity={animation_rl[0]["animation"][idx].opacityExtraLine} transparent />
            </lineSegments>
            <mesh position={[0,0,lineWidth/2]} geometry={mlB1}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(160,160,160)")}
                opacity={animation_rl[0]["animation"][idx].opacityExtraML} transparent />
            </mesh>
          </group>

          <group ref={aftr3}>
            <mesh geometry={A3}>
              <meshStandardMaterial attach="material" color={new THREE.Color("rgb(110,110,110)")}
                opacity={animation_rl[0]["animation"][idx].opacityExtraLine} transparent />
            </mesh>
            <lineSegments geometry={edgeA3} renderOrder={120}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(200,200,200)")}
                opacity={animation_rl[0]["animation"][idx].opacityExtraLine} transparent />
            </lineSegments>
            <mesh position={[0,0,lineWidth/2]} geometry={mlA3}>
              <lineBasicMaterial attach="material" color={new THREE.Color("rgb(160,160,160)")}
                opacity={animation_rl[0]["animation"][idx].opacityExtraML} transparent />
            </mesh>
          </group>

          <gridHelper ref={grid} args={[14400 * 3, 180 * 3]}>
          <lineBasicMaterial attach="material" color={new THREE.Color("rgb(150, 150, 150)")}
                opacity={animation_rl[0]["animation"][idx].opacityGrid} transparent />
          </gridHelper>
          <mesh ref={oneJ} geometry={oneJum}>
            <meshBasicMaterial color="red" opacity={0} transparent={true}/>
          </mesh>
          <Axis ref={firstaxis}
            position={[-xScale * (adjustedArr2.length + adjustedA2B3.length + adjustedA1B2.length + adjustedArr1.length + adjustedB1.length - 5), -2500, -100]}
            lenY={3000}
            lenX={xScale*(adjustedArr2.length+adjustedA2B3.length+adjustedA1B2.length+adjustedArr1.length+adjustedB1.length+adjustedA3.length-6)+1200} />
          <FinalAxis ref={finalaxis} position={[-xScale*(adjustedArr2.length+adjustedA2B3.length+adjustedA1B2.length+adjustedArr1.length-4),0,-100]}
          lenX={adjustedArr1.length*xScale+150}/>
        </>
      }
    </group>
  )
});

export { VisComponent as VisComponent_Immersive };
