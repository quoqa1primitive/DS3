import * as THREE from 'three'
import { Line2 } from "three/examples/jsm/lines/Line2"
import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { useThree, useLoader, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, PerspectiveCamera, SpotLight } from '@react-three/drei';
import { Line, ChangePoint, Rect, TextBox, If } from '../../BasicElements/BasicElements.js';
import { XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from '../../BasicElements/Constants.js';
import { totalFrame, TextComponentHeight } from '../BaseStructure/Constants_DS2.js';
import { useStore } from '../BaseStructure/Store.js';
import {adjustedArr1, adjustedArr2, adjustedArr3, arr1, arr2, arr3, adjustedB1, adjustedA1B2, adjustedA2B3, adjustedA3} from './snpData.js';
import { Text } from "troika-three-text";
import { Line as DreiLine } from '@react-three/drei';

import glsl from 'babel-plugin-glsl/macro'
extend({ Text });

const opts = {
  font: "https://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr5TRG.woff",
  fontSize: 50.0,
  color: "black",
  maxWidth: 5000,
  lineHeight: 1.15,
  letterSpacing: 0,
  textAlign: "left",
  materialType: "MeshBasicMaterial",
};

const yScale = 20;
const xScale = 30;
const lineWidth = 80;
const line1Height = (adjustedArr1[0] - adjustedArr3[0] + adjustedArr1[0]) * yScale;

function AnnotZ({position, text, ...props}) {
  const animation_rl = useStore((state) => state.animation_rl);
  const idx = useStore((state) => state.idx);
  return(
    <>
    <group position={position}>
      <DreiLine points={[[0,0,0], [0, 0, lineWidth]]}
        color={"white"} opacity={animation_rl[0]["animation"][idx].opacity3dAnnot} transparent lineWidth={0.1} 
        dashSize={50} gapSize={80} dashed={false} />  
    </group>
    <group position={[position[0], position[1], position[2]+lineWidth+10]}>
        <text {...opts}
          text={text} fillOpacity={animation_rl[0]["animation"][idx].opacity3dAnnot}
          font={opts.font} fontSize={400} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
    </group>
    </>
  )
}

function HrztAnnotFirst({position=[0,0,0], text, length, adj=0.8, interval=200, ...props}) {
  const animation_rl = useStore((state) => state.animation_rl);
  const idx = useStore((state) => state.idx);
  return(
    <>
    <group position={position}>
      <DreiLine points={[[0, 0, 0], [length, 0, 0]]} 
        color={"white"} opacity={animation_rl[0]["animation"][idx].opacityAxis} transparent lineWidth={0.2} 
        dashSize={60} gapSize={40} dashed={true} />
    </group>
    <group position={[position[0]-interval, position[1], position[2]]}>
        <text {...opts}
          text={text} fillOpacity={1*animation_rl[0]["animation"][idx].opacityAxis}
          font={opts.font} fontSize={180} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
      </group>
    </>
  )
}

function AnnotFirst({position=[0,0,0], text, length, adj=0.8, interval=-200, anchor="center", ...props}){
  const animation_rl = useStore((state) => state.animation_rl);
  const idx = useStore((state) => state.idx);

  const points = useMemo(() => [new THREE.Vector3(0,0,0), new THREE.Vector3(0, -length, 0)], []);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), []);
  const dotGeometry = useMemo(() => new THREE.CircleGeometry(40, 50), []);
  return(
    <>
      <group position={position}>
        <mesh geometry={dotGeometry}>
          <meshBasicMaterial opacity={0.8*animation_rl[0]["animation"][idx].opacityAxis} transparent/>
        </mesh>
        <DreiLine points={[[0, 0, 0], [0, length, 0]]} 
          color={"white"} opacity={adj*animation_rl[0]["animation"][idx].opacityAxis} transparent lineWidth={0.2} 
          dashSize={50} gapSize={100} dashed={false} />
      </group>
      <group position={[position[0], position[1]+length+interval, position[2]]}>
        <text {...opts}
          text={text} fillOpacity={1*animation_rl[0]["animation"][idx].opacityAxis}
          font={opts.font} fontSize={200} color={"rgb(255, 255, 255)"} anchorX={anchor} anchorY="middle"/>
      </group>
    </>
  )
}

function HrztAnnotLast({position=[0,0,0], text, length, interval=100, adj=1, ...props}) {
  const animation_rl = useStore((state) => state.animation_rl);
  const idx = useStore((state) => state.idx);
  // console.log(interval);
  return(
    <>
    <group position={position}>
      <DreiLine points={[[0, 0, 0], [length, 0, 0]]} 
        color={"rgb(150, 150, 150)"} opacity={adj*animation_rl[0]["animation"][idx].opacityLastAxis} transparent lineWidth={0.4} 
        dashSize={20} gapSize={10} dashed={true} />
    </group>
    <group position={[position[0]-interval, position[1], position[2]]}>
        <text {...opts}
          text={text} fillOpacity={animation_rl[0]["animation"][idx].opacityLastAxis}
          font={opts.font} fontSize={55} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
      </group>
    </>
  )
}

function AnnotLast({position=[0,0,0], text, length, interval=10, adj=1, anchor="left", ...props}){
  const animation_rl = useStore((state) => state.animation_rl);
  const idx = useStore((state) => state.idx);
  const dotGeometry = useMemo(() => new THREE.CircleGeometry(10, 50), []);
  const textInterval = interval;
  return(
    <>
      <group position={position}>
        <mesh geometry={dotGeometry}>
          <meshBasicMaterial opacity={animation_rl[0]["animation"][idx].opacityLastAxis} transparent />
        </mesh>
        <DreiLine points={[[0, 0, 0], [0, length, 0]]} 
          color={"white"} opacity={adj*animation_rl[0]["animation"][idx].opacityLastAxis} transparent lineWidth={0.1} 
          dashSize={50} gapSize={100} dashed={false} />
        <group position={[0, length+textInterval, 0]}>
          <text {...opts}
            text={text} fillOpacity={animation_rl[0]["animation"][idx].opacityLastAxis}
            font={opts.font} fontSize={60} color={"rgb(255, 255, 255)"} anchorX={anchor} anchorY="middle"/>
        </group>
      </group>

    </>
  )
}


function Axis({position=[0,0,0], lenY, lenX, ...props}){
  const animation_rl = useStore((state) => state.animation_rl);
  const idx = useStore((state) => state.idx);
  // console.log(animation_rl[0]["animation"][idx].opacityAxis);
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
      <AnnotFirst position={text1Pos} anchor={"left"}  adj={1} text={text1} interval={-350} length={-2500-(adjustedArr1[0]-adjustedArr3[0]+adjustedArr1[0]) * yScale}/>
      <AnnotFirst position={text2Pos} anchor={"right"} adj={1}   text={text2} interval={-350} length={-2500-(adjustedArr2[0]-adjustedArr3[0]+adjustedArr1[0]) * yScale }/>
      <AnnotFirst position={text3Pos} anchor={"left"}  adj={1} text={text3} interval={-350} length={-2500-adjustedArr1[0]*yScale } />
      <HrztAnnotFirst position={[0,0,0]}        text={"2,000"} length={lenX}/>
      <HrztAnnotFirst position={[0,600-100,0]}  text={"2,500"} length={lenX}/>
      <HrztAnnotFirst position={[0,1200-100,0]} text={"3,000"} length={lenX}/>
      <HrztAnnotFirst position={[0,1800-100,0]} text={"3,500"} length={lenX}/>
      <HrztAnnotFirst position={[0,2400-100,0]} text={"4,000"}  length={lenX}/>

    </group>
  , []);
  return(
    <>
    {axis}
    <group position={[position[0]-200,position[1]+2900, position[2]]}>
      <text {...opts}
        text={"S&P 500"} fillOpacity={1*animation_rl[0]["animation"][idx].opacityAxis}
        font={opts.font} fontSize={180} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
      </group>
    </>
  )
}

function FinalAxis({position=[0,0,0], lenX, ...props}){
  const expire1 = `recovery of the initial impact D+182`;
  const expire2 = `recovery of the Delta variant D+50`;
  const expire3 = `recovery of the Omicron variant D+23`;
  const min1 = `floor at 2237.4`;
  const min2 = `floor at 4307.54`;
  const min3 = `floor at 4513.04`;
  const text3 = `Omicron variant emerges
  (NOV 2021)`;

  const line1Height = (adjustedArr1[0] - adjustedArr3[0] + adjustedArr1[0]) * yScale;
  const gap = 190;
  const minV1 = 24;
  const minV2 = 22;
  const minV3 = 9;

  const exp1Pos = [(adjustedArr1.length - 1) * xScale, line1Height, 0];
  const exp2Pos = [(adjustedArr2.length - 1) * xScale, line1Height, 0];
  const exp3Pos = [(adjustedArr3.length - 1) * xScale, line1Height, 0];
  const min1Pos = [minV1 * xScale, line1Height - (adjustedArr1[0] - adjustedArr1[minV1]) * yScale, 0];
  const min2Pos = [minV2 * xScale, line1Height - (adjustedArr2[0] - adjustedArr2[minV2]) * yScale, 0];
  const min3Pos = [minV3 * xScale, line1Height - (adjustedArr3[0] - adjustedArr3[minV3]) * yScale, 0];
  const axis = useMemo(() =>
    <group position={position}>
      <AnnotLast position={exp1Pos} length={100}    interval={60}  text={expire1} anchor={"right"}  />
      <AnnotLast position={exp2Pos} length={-60}    interval={-30}  text={expire2}  />
      <AnnotLast position={exp3Pos} length={100}   interval={60} text={expire3}  />
      <AnnotLast position={min1Pos} length={50}    interval={60}  text={min1}     />
      <AnnotLast position={min2Pos} length={0}    interval={-65}  text={min2}     />
      <AnnotLast position={min3Pos} length={-230}  interval={-50} text={min3}     />
      <HrztAnnotLast position={[0, line1Height - gap * 0, 0]} adj={2} text={"0%"}   length={lenX}/>
      <HrztAnnotLast position={[0, line1Height - gap * 1, 0]} adj={2} text={"-5%"}  length={lenX}/>
      <HrztAnnotLast position={[0, line1Height - gap * 2, 0]} adj={2} text={"-10%"} length={lenX}/>
      <HrztAnnotLast position={[0, line1Height - gap * 3, 0]} adj={2} text={"-15%"} length={lenX}/>
      <HrztAnnotLast position={[0, line1Height - gap * 4, 0]} adj={2} text={"-20%"} length={lenX}/>
      <HrztAnnotLast position={[0, line1Height - gap * 5, 0]} adj={2} text={"-25%"} length={lenX}/>
      <HrztAnnotLast position={[0, line1Height - gap * 6, 0]} adj={2} text={"-30%"} length={lenX}/>
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
    for(let i = 0; i < len; i++) {
      arr[i][0] = new THREE.Vector3(i * xScale, posArr[i] * yScale, 0)
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
              lookAt
            />
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
  const animation_rl = useStore((state) => state.animation_rl);
  const idx = useStore((state) => state.idx);
 

  const extrudeSettings1 = { depth: lineWidth, bevelEnabled: false, bevelSegments: 1, steps: 2, bevelSize: 1, bevelThickness: 1 };
  const extrudeSettings2 = { depth: lineWidth/16, bevelEnabled: false, bevelSegments: 1, steps: 2, bevelSize: 1, bevelThickness: 1 };

  const interval = 3;
  const chartHeight = 150;
  const chartWidth = 4;

  function arrToShape(arr){
    let points = [];
    for (var i=0; i< arr.length; i++) {
      points.push(new THREE.Vector3(i * xScale, arr[i] * yScale, 0));
    }
    for (var i=0; i< arr.length; i++) {
      let idx = arr.length - 1 - i;
      points.push(new THREE.Vector3(idx * xScale, arr[idx] * yScale - chartWidth, 0));
    }
    return(new THREE.Shape(points));
  }
  const shape1    = arrToShape(adjustedArr1);
  const shape2    = arrToShape(adjustedArr2);
  const shape3    = arrToShape(adjustedArr3);
  const shapeB1   = arrToShape(adjustedB1);
  const shapeA2B3 = arrToShape(adjustedA2B3);
  const shapeA1B2 = arrToShape(adjustedA1B2);
  const shapeA3   = arrToShape(adjustedA3);

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
    const lineAnimation = animation_rl[0]["animation"][idx];
    line1.current.position.set(lineAnimation.pos1[0], lineAnimation.pos1[1], lineAnimation.pos1[2]);
    line2.current.position.set(lineAnimation.pos2[0], lineAnimation.pos2[1], lineAnimation.pos2[2]);
    line3.current.position.set(lineAnimation.pos3[0], lineAnimation.pos3[1], lineAnimation.pos3[2]);

  });

  useLayoutEffect(() => {
    const zDelta = 2 * interval * lineWidth;
    const yDelta = -yScale * (adjustedArr3[0] - adjustedArr1[0]);

    bfr1.current.translateX(-xScale * (adjustedArr2.length + adjustedA2B3.length + adjustedA1B2.length + adjustedArr1.length + adjustedB1.length - 5));
    bfr1.current.translateY(yDelta);
    bfr1.current.translateZ(zDelta);

    line1.current.translateX(-xScale * (adjustedArr2.length + adjustedA2B3.length + adjustedA1B2.length + adjustedArr1.length - 4));
    line1.current.translateY(yDelta);
    line1.current.translateZ(zDelta);

    aftr1bfr2.current.translateX(-xScale * (adjustedArr2.length + adjustedA2B3.length + adjustedA1B2.length - 3));
    aftr1bfr2.current.translateY(yDelta);
    aftr1bfr2.current.translateZ(zDelta);

    line2.current.translateX(-xScale * (adjustedArr2.length + adjustedA2B3.length - 2));
    line2.current.translateY(yDelta);
    line2.current.translateZ(zDelta);

    aftr2bfr3.current.translateX(-xScale * (adjustedA2B3.length - 1));
    aftr2bfr3.current.translateY(yDelta);
    aftr2bfr3.current.translateZ(zDelta);

    line3.current.translateX(0);
    line3.current.translateY(yDelta);
    line3.current.translateZ(zDelta);

    aftr3.current.translateX(xScale * (adjustedArr3.length - 1));
    aftr3.current.translateY(yDelta);
    aftr3.current.translateZ(zDelta);

    grid.current.position.setY(-934);
    grid.current.translateX(-10);
  }, []);

  let rlAnimation = animation_rl[0]["animation"][idx];
  let color1 = new THREE.Color("rgb(" +
    Math.floor(rlAnimation.color1[0]) + "," +
    Math.floor(rlAnimation.color1[1]) + "," +
    Math.floor(rlAnimation.color1[2]) + ")");

  let color2 = new THREE.Color("rgb(" +
    Math.floor(rlAnimation.color2[0]) + "," +
    Math.floor(rlAnimation.color2[1]) + "," +
    Math.floor(rlAnimation.color2[2]) + ")");

  let color3 = new THREE.Color("rgb(" +
    Math.floor(rlAnimation.color3[0]) + "," +
    Math.floor(rlAnimation.color3[1]) + "," +
    Math.floor(rlAnimation.color3[2]) + ")");

  const COLOR_MESH    = new THREE.Color("rgb(110, 110, 110)");
  const COLOR_LINESEG = new THREE.Color("rgb(200, 200, 200)");
  const COLOR_LINE    = new THREE.Color("rgb(160, 160, 160)");

  let mat_mesh = new THREE.MeshStandardMaterial({color: COLOR_MESH, opacity: rlAnimation.opacityExtraLine, transparent: true})
  let mat_lineseg = new THREE.LineBasicMaterial({color: COLOR_LINESEG, opacity: rlAnimation.opacityExtraLine, transparent: true})
  let mat_line = new THREE.LineBasicMaterial({color: COLOR_LINE, opacity: rlAnimation.opacityExtraML, transparent: true})

  return(
    <group position={[0, 0, 0]} ref={ref}>
      {
        <>
          <group ref={line1}>
            <mesh geometry={lineChart1}>
              <meshStandardMaterial attach="material" color={color1} opacity={rlAnimation.opacityLine} transparent />
            </mesh>
            <lineSegments geometry={edges1} renderOrder={100}>
              <lineBasicMaterial attach="material" color={color1} opacity={rlAnimation.opacityLine} transparent />
            </lineSegments>
            <mesh position={[0,0,lineWidth/2]} geometry={middleLine1}>
              <lineBasicMaterial attach="material" color={color1} opacity={rlAnimation.opacityML} transparent />
            </mesh>
          </group>
          <group ref={line2}>
            <mesh geometry={lineChart2}>
              <meshStandardMaterial attach="material" color={color2} opacity={rlAnimation.opacityLine} transparent />
            </mesh>
            <lineSegments geometry={edges2} renderOrder={110}>
              <lineBasicMaterial attach="material" color={color2} opacity={rlAnimation.opacityLine} transparent />
            </lineSegments>
            <mesh position={[0,0,lineWidth/2]} geometry={middleLine2}>
              <lineBasicMaterial attach="material" color={color2} opacity={rlAnimation.opacityML} transparent />
            </mesh>
          </group>
          <group ref={line3}>
            <mesh geometry={lineChart3}>
              <meshStandardMaterial attach="material" color={color3} opacity={rlAnimation.opacityLine} transparent />
            </mesh>
            <lineSegments geometry={edges3} renderOrder={120}>
              <lineBasicMaterial attach="material" color={color3} opacity={rlAnimation.opacityLine} transparent />
            </lineSegments>
            <mesh position={[0,0,lineWidth/2]} geometry={middleLine3}>
              <lineBasicMaterial attach="material" color={color3} opacity={rlAnimation.opacityML} transparent />
            </mesh>
          </group>

          <group ref={aftr2bfr3}>
            <mesh geometry={A2B3} material={mat_mesh} />
            <lineSegments geometry={edgeA2B3} renderOrder={120} material={mat_lineseg} />
            <mesh position={[0,0,lineWidth/2]} geometry={mlA2B3} material={mat_line} />
          </group>

          <group ref={aftr1bfr2}>
            <mesh geometry={A1B2} material={mat_mesh} />
            <lineSegments geometry={edgeA1B2} renderOrder={120} material={mat_lineseg} />
            <mesh position={[0,0,lineWidth/2]} geometry={mlA1B2} material={mat_line} />
          </group>

          <group ref={bfr1}>
            <mesh geometry={B1} material={mat_mesh} />
            <lineSegments geometry={edgeB1} renderOrder={120} material={mat_lineseg} />
            <mesh position={[0,0,lineWidth/2]} geometry={mlB1} material={mat_line} />
          </group>

          <group ref={aftr3}>
            <mesh geometry={A3} material={mat_mesh} />
            <lineSegments geometry={edgeA3} renderOrder={120} material={mat_lineseg} />
            <mesh position={[0,0,lineWidth/2]} geometry={mlA3} material={mat_line} />
          </group>

          <gridHelper ref={grid} args={[14400 * 3, 180 * 3]}>
          <lineBasicMaterial attach="material" color={new THREE.Color("rgb(150, 150, 150)")} opacity={rlAnimation.opacityGrid} transparent />
          </gridHelper>
          <mesh ref={oneJ} geometry={oneJum}>
            <meshBasicMaterial color="red" opacity={0} transparent={true}/>
          </mesh>
          <Axis ref={firstaxis}
            position={[-xScale * (adjustedArr2.length + adjustedA2B3.length + adjustedA1B2.length + adjustedArr1.length + adjustedB1.length - 5), -2500, -150]}
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
