import * as THREE from 'three'
import { Line2 } from "three/examples/jsm/lines/Line2"
import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, PerspectiveCamera, SpotLight } from '@react-three/drei';
import { Line, ChangePoint, Rect, TextBox, If } from '../../BasicElements/BasicElements.js';
import { XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from '../../BasicElements/Constants.js';
import { xyzProps, centerPos, xLength, yLength, zLength, xPadding, yPadding, zPadding, xSteps, ySteps, zSteps, tickLength, totalFrame, TextComponentHeight, color4, color4_bright, color4_dark, color_ocean2, color_lineSeg } from '../BaseStructure/Constants_DS2.js';
import { useStore } from '../BaseStructure/Store.js';
import {adjustedArr1, adjustedArr2, adjustedArr3, arr1, arr2, arr3, adjustedB1, adjustedA1B2, adjustedA2B3} from './snpData.js';


const VisComponent = React.forwardRef((props, ref) =>{
  const line1 = useRef();
  const line2 = useRef();
  const line3 = useRef();
  const oneJ = useRef();
  const grid = useRef();
  const yplane = useRef();

  const bfr1 = useRef();
  const aftr2bfr3 = useRef();
  const aftr1bfr2 = useRef();
  const camera = useRef();
  // const target = useRef();
  const animation_rl = useStore((state) => state.animation_rl);
  // console.log(animation_rl);
  const idx = useStore((state) => state.idx);

  const lineWidth = 80;
  const extrudeSettings1 = { depth: lineWidth, bevelEnabled: false, bevelSegments: 1, steps: 2, bevelSize: 1, bevelThickness: 1 };
  const extrudeSettings2 = { depth: lineWidth/16, bevelEnabled: false, bevelSegments: 1, steps: 2, bevelSize: 1, bevelThickness: 1 };

  const yScale = 20;
  const xScale = 20;
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

  const lineChart1 = useMemo(()=> new THREE.ExtrudeGeometry(shape1, extrudeSettings1));
  const edges1 = useMemo(()=> new THREE.EdgesGeometry(lineChart1));
  const middleLine1 = useMemo(()=> new THREE.ExtrudeGeometry(shape1, extrudeSettings2));

  const lineChart2 = useMemo(()=> new THREE.ExtrudeGeometry(shape2, extrudeSettings1));
  const edges2 = useMemo(()=> new THREE.EdgesGeometry(lineChart2));
  const middleLine2 = useMemo(()=> new THREE.ExtrudeGeometry(shape2, extrudeSettings2));

  const lineChart3 = useMemo(()=> new THREE.ExtrudeGeometry(shape3, extrudeSettings1));
  const edges3 = useMemo(()=> new THREE.EdgesGeometry(lineChart3));
  const middleLine3 = useMemo(()=> new THREE.ExtrudeGeometry(shape3, extrudeSettings2));


  const A2B3 = useMemo(()=> new THREE.ExtrudeGeometry(shapeA2B3, extrudeSettings1));
  const edgeA2B3 = useMemo(()=> new THREE.EdgesGeometry(A2B3));
  const mlA2B3 = useMemo(()=> new THREE.ExtrudeGeometry(shapeA2B3, extrudeSettings2));

  const A1B2 = useMemo(()=> new THREE.ExtrudeGeometry(shapeA1B2, extrudeSettings1));
  const edgeA1B2 = useMemo(()=> new THREE.EdgesGeometry(A1B2));
  const mlA1B2 = useMemo(()=> new THREE.ExtrudeGeometry(shapeA1B2, extrudeSettings2));

  const B1 = useMemo(()=> new THREE.ExtrudeGeometry(shapeB1, extrudeSettings1));
  const edgeB1 = useMemo(()=> new THREE.EdgesGeometry(B1));
  const mlB1 = useMemo(()=> new THREE.ExtrudeGeometry(shapeB1, extrudeSettings2));
  // const cameraTarget = useMemo(()=> new THREE.BoxGeometry(1,1,1));
  const oneJum = useMemo(()=> new THREE.SphereGeometry(2));

  useFrame(({clock}) => {
    oneJ.current.position.set(5120,450, 40);
  });

  useLayoutEffect(() => {
    // line2.current.translateZ(interval*lineWidth);
    // edge2.current.translateZ(interval*lineWidth);
    // ml2.current.translateZ(interval*lineWidth+lineWidth/2);
    
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

    grid.current.translateY(380);
    // ml1.current.translateZ(lineWidth/2);



    


  }, []);

  function Fense({position=[0, 0, 0], lookAt=true, date, text, anchorX="left", anchorY="middle", ...props}){
    const refPosition = useRef();
    const fenseHeight = 10;
    const dateLine =[];
    dateLine.push(new THREE.Vector3(0, 0, 0));
    dateLine.push(new THREE.Vector3(0,fenseHeight, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints( dateLine );
    const geometry2 = new THREE.BufferGeometry().setFromPoints( dateLine );
    const rail = useMemo(() =>
      <group ref={refPosition} position={position}>
        <line geometry={geometry} position={[0,0,-lineWidth/2]}>
          <lineBasicMaterial color="white" transparent opacity={0.4}/>
        </line>
        <line geometry={geometry2} position={[0,0,lineWidth/2]}>
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
    return(
      arr
    )
  }
  const fenseArr1 = fenseRail(adjustedArr1, arr1);
  // console.log(fenseArr1);

  function LongFense({arr, position}) {
    const rail = useMemo(() =>
      <group position={position}>
        {
        arr.map((point, idx) => {
          return(
            <Fense 
            key={idx} 
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

  // console.log((adjustedArr3[0]-adjustedArr1[0])*yScale);

  const mat = useMemo(() => {return(
    <meshStandardMaterial
      color={
        new THREE.Color("rgb(" + 
        Math.floor(animation_rl[0]["animation"][idx].color[0]) + "," + 
        Math.floor(animation_rl[0]["animation"][idx].color[1]) + "," + 
        Math.floor(animation_rl[0]["animation"][idx].color[2]) + ")")
      }
      opacity={0.5} transparent />
  )}, [idx]);

  console.log(mat.props.color);
  return(
    <group position={[0, 0, 0]} ref={ref}>
      {
        <>
        
        {/* <PerspectiveCamera ref={camera} makeDefault fov={800}far={10000} near={10} /> */}
        <group ref={line1}>
          <mesh geometry={lineChart1} material={mat} />
          <lineSegments geometry={edges1} renderOrder={100} material={mat}/>
          <mesh position={[0,0,lineWidth/2]} geometry={middleLine1} material={mat}/>
        </group>
        <group ref={line2}>
          <mesh geometry={lineChart2}>
            <meshStandardMaterial attach="material" color={new THREE.Color("rgb(" + 
              Math.floor(animation_rl[0]["animation"][idx].color[0]) + "," + 
              Math.floor(animation_rl[0]["animation"][idx].color[1]) + "," + 
              Math.floor(animation_rl[0]["animation"][idx].color[2]) + ")")} opacity={0.3} transparent />
          </mesh>
          <lineSegments geometry={edges2} renderOrder={110}>
            <lineBasicMaterial color={new THREE.Color("rgb(" + 
        Math.floor(animation_rl[0]["animation"][idx].color[0]) + "," + 
        Math.floor(animation_rl[0]["animation"][idx].color[1]) + "," + 
        Math.floor(animation_rl[0]["animation"][idx].color[2]) + ")")} opacity={0.2} transparent/>
          </lineSegments>
          <mesh position={[0,0,lineWidth/2]} geometry={middleLine2}>
            <lineBasicMaterial color={new THREE.Color("rgb(" + 
        Math.floor(animation_rl[0]["animation"][idx].color[0]) + "," + 
        Math.floor(animation_rl[0]["animation"][idx].color[1]) + "," + 
        Math.floor(animation_rl[0]["animation"][idx].color[2]) + ")")}/>
          </mesh>
        </group>
        <group ref={line3}>
          <mesh geometry={lineChart3}>
            <meshStandardMaterial attach="material" color={new THREE.Color("rgb(250, 10, 102)")} opacity={0.4} transparent />
          </mesh>
          <lineSegments geometry={edges3} renderOrder={120}>
            <lineBasicMaterial color={new THREE.Color("rgb(250, 10, 102)")} opacity={0.2} transparent/>
          </lineSegments>
          <mesh position={[0,0,lineWidth/2]} geometry={middleLine3}>
            <lineBasicMaterial color={new THREE.Color("rgb(250, 10, 102)")}/>
          </mesh>
        </group>

        <group ref={aftr2bfr3}>
          <mesh geometry={A2B3}>
            <meshStandardMaterial attach="material" color={new THREE.Color("rgb(200, 200, 200)")} opacity={0.2} transparent />
          </mesh>
          <lineSegments geometry={edgeA2B3} renderOrder={120}>
            <lineBasicMaterial color={new THREE.Color("rgb(200, 200, 200)")} opacity={0.2} transparent/>
          </lineSegments>
          <mesh position={[0,0,lineWidth/2]} geometry={mlA2B3}>
            <lineBasicMaterial color={new THREE.Color("rgb(200, 200, 200)")}/>
          </mesh>
        </group>

        <group ref={aftr1bfr2}>
          <mesh geometry={A1B2}>
            <meshStandardMaterial attach="material" color={new THREE.Color("rgb(200, 200, 200)")} opacity={0.2} transparent />
          </mesh>
          <lineSegments geometry={edgeA1B2} renderOrder={120}>
            <lineBasicMaterial color={new THREE.Color("rgb(200, 200, 200)")} opacity={0.2} transparent/>
          </lineSegments>
          <mesh position={[0,0,lineWidth/2]} geometry={mlA1B2}>
            <lineBasicMaterial color={new THREE.Color("rgb(200, 200, 200)")}/>
          </mesh>
        </group>
        
        <group ref={bfr1}>
          <mesh geometry={B1}>
            <meshStandardMaterial attach="material" color={new THREE.Color("rgb(200, 200, 200)")} opacity={0.2} transparent />
          </mesh>
          <lineSegments geometry={edgeB1} renderOrder={120}>
            <lineBasicMaterial color={new THREE.Color("rgb(200, 200, 200)")} opacity={0.2} transparent/>
          </lineSegments>
          <mesh position={[0,0,lineWidth/2]} geometry={mlB1}>
            <lineBasicMaterial color={new THREE.Color("rgb(200, 200, 200)")}/>
          </mesh>
        </group>

        <gridHelper ref={grid} args={[14400,180]}>
          <lineBasicMaterial color={new THREE.Color("rgb(150, 150, 150)")} opacity={0.5} transparent={true}/>
        </gridHelper>
        <mesh ref={oneJ} geometry={oneJum}>
          <meshBasicMaterial color="red" opacity={0} transparent={true}/>
        </mesh>

        {/* {<LongFense arr={fenseArr1} position={[0,0,40]}/>} */}
        </>

        }
    </group>
  )
});

export { VisComponent as VisComponent_Immersive };
