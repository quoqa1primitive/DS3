import * as THREE from 'three'
import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { useThree, useLoader, useFrame } from '@react-three/fiber'
import { Line, ChangePoint, Rect, TextBox, If } from '../../BasicElements/BasicElements.js';
import { XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from '../../BasicElements/Constants.js';
import { xyzProps, centerPos, xLength, yLength, zLength, xPadding, yPadding, zPadding, xSteps, ySteps, zSteps, tickLength, totalFrame, TextComponentHeight, color4, color4_bright, color4_dark, color_ocean2, color_lineSeg } from '../BaseStructure/Constants_DS2.js';
import { useStore } from '../BaseStructure/Store.js';

function Disc({ bottomPosition, height, idx, opacity=1, ...props }){
  const main = useRef();
  const ref = useRef();
  const index = useStore((state) => state.idx);
  const animation_dist = useStore((state) => state.animation_dist)[0]["animation"];
  const xMax = 50;
  let radius = 1;

  const depth = 100;
  const cylinderGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1));
  const edges = useMemo(() => new THREE.EdgesGeometry(cylinderGeometry));

  useLayoutEffect(() => {

  }, []);

  useFrame((state, delta) => {
    // console.log(animation_dist[index], index, idx);
    radius = animation_dist[index].dist[idx] * (xyzProps.xLength - xyzProps.xPadding * 2) / xMax;
    main.current.scale.set(radius, height * 0.8, depth);
    main.current.position.set(radius/2, bottomPosition, -depth/2);
  });

  return(
    <group ref={main}>
      <mesh ref={ref} raycast={() => null} >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial attachArray={"material"} color={false?color4:color4_dark} transparent={true} opacity={opacity} />
        <meshBasicMaterial attachArray={"material"} color={color4} transparent={true} opacity={opacity} />
        <meshBasicMaterial attachArray={"material"} color={color4_bright} transparent={true} opacity={opacity} />
        <meshBasicMaterial attachArray={"material"} color={color4} transparent={true} opacity={opacity} />
        <meshBasicMaterial attachArray={"material"} color={color4} transparent={true} opacity={opacity} />
        <meshBasicMaterial attachArray={"material"} color={color4} transparent={true} opacity={opacity} />
      </mesh>
      <mesh raycast={() => null} >
        <lineSegments geometry={edges} renderOrder={100}>
          <lineBasicMaterial color={color_lineSeg}/>
        </lineSegments>
      </mesh>
    </group>
  )
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

function AxGr({props}){
  const step = useStore((state) => state.step);

  const XAxis1 = useMemo(() =>
    <>
      {
        Array(xSteps).fill(0).map((x, y) => x + y).map((item, idx) => {
          return <mesh key={idx} position={[xPadding + item * ((xLength - 2 * xPadding) / (xSteps - 1)), -tickLength, zLength]}>
            <If if={true}>
              <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} />
              <TextBox text={0 + idx * 1 + "M"} anchorX={"center"} anchorY={"top"} />
            </If>
          </mesh>
        })
      }
      <If if={true}>
        <group position={[xLength / 2, -6, zLength]}>
          <TextBox text={"Population"} anchorX={"center"} anchorY={"bottom"} label={XAXIS1}/>
        </group>
      </If>
    </>, [step]);

  const YAxis1 = useMemo(() =>
  <>
    {
      Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[-tickLength, xyzProps.yPadding + (item + 1) * (yLength - 2 * yPadding) / ySteps, 0]}>
          <If if={idx % 2 == 0}>
            <Line key={idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} />
            <TextBox text={(idx>=(ySteps-2)?"> ":"") + (5 + 5 * item) + "K"} anchorX={"right"} anchorY={"middle"} />
            <Line key={idx+100} color={"lightgrey"} start={[tickLength, 0, 0]} end={[xLength, 0, 0]} />
          </If>
        </mesh>
      })
    }
    <If if={true}>
      <group position={[-10, yLength / 2, 6]}>
        <TextBox text={"Median Household Income(A$)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS1}/>
      </group>
    </If>
  </>, [step]);

  return(
    <group position={centerPos}>
      {XAxis1}
      {YAxis1}
      <If if={true}>
        <Line color={"black"} start={[0, 0, zLength]} end={[xLength, 0, zLength]} />
        <Line color={"black"} start={[0, 0, 0]} end={[0, yLength, 0]} />
      </If>
      <If if={step >= 2 && step <= 3}>
        <ChangePoint
          color={"black"} linewidth={3} text={"Change Point"}
          start={[0, yLength / 2, zLength+1]}
          end={[xLength, yLength / 2, zLength+1]} />
      </If>
      <If if={step >= 9}>
        <ChangePoint
          color={"black"} linewidth={3} text={"Change Point"}
          start={[0, yLength * 0.74, zLength+1]}
          end={[xLength, yLength * 0.74, zLength+1]} />
      </If>
    </group>
  )
}

function DiscGroup(props){
  const ref = useRef();
  const step = useStore((state) => state.step);

  let scaleWeight = 1;
  let discPosition = xyzProps.yPadding;
  let height = (xyzProps.yLength - xyzProps.yPadding * 2) / 10;
  let animationSpeed = 1.5;

  const animating = false;

  useFrame((clock) =>{
    if(step >= 3 && step <= 8 && animating){
      // corner view makes discGroup breathe...?
      ref.current.position.x = xyzProps.xPadding + 2.0 * Math.sin(clock.clock.elapsedTime);
      ref.current.position.y = 0                 + 1.5 * Math.sin(clock.clock.elapsedTime);
      ref.current.position.z = -4                + 2.0 * Math.sin(clock.clock.elapsedTime);

      ref.current.rotation.x = 2.5 * Math.PI / 360 + 0.8 * Math.PI / 360 * Math.sin(animationSpeed * 0.7 * clock.clock.elapsedTime);
      ref.current.rotation.y = 0.0 * Math.PI / 360 + 0.0 * Math.PI / 360 * Math.sin(animationSpeed * 1.3 * clock.clock.elapsedTime + 1);
      ref.current.rotation.z = -2.0 * Math.PI / 360 + 0.0 * Math.PI / 360 * Math.sin(animationSpeed * 0.6 * clock.clock.elapsedTime + 2);
    }else{
      // init the positiona and rotation for legibility
      ref.current.position.x = xyzProps.xPadding + (ref.current.position.x - xyzProps.xPadding) * 0.85;
      ref.current.position.y = 0 + ref.current.position.y * 0.85;
      ref.current.position.z = 0 + ref.current.position.z * 0.85;

      ref.current.rotation.x = 0 + ref.current.rotation.x * 0.85;
      ref.current.rotation.y = 0 + ref.current.rotation.y * 0.85;
      ref.current.rotation.z = 0 + ref.current.rotation.z * 0.85;
    }


  })

  const DiscGroup1 = useMemo(() =>
  <group position={centerPos}>
    <group ref={ref} position={[xyzProps.xPadding, 0, 0]}>
    {
      Array(10).fill(0).map((x, y) => x + y).map((item, idx) => {
        return(
          <Disc
            key={idx}
            idx={idx}
            bottomPosition={discPosition + (idx+0.5) * height}
            height={height - 0.1} />
        );
      })
    }
    </group>
  </group>, []);

  return(
    <>{DiscGroup1}</>
  );
}

function OceanGroup(props){
  const ref = useRef();
  const step = useStore((state) => state.step);
  const waterLevel = useStore((state) => state.waterLevel);

  let scaleWeight = 1;
  let radius = [10, 12, 15, 18, 42, 35, 31, 19, 11, 5];
  let height = (xyzProps.yLength - xyzProps.yPadding * 2) / (radius.length);

  useFrame((clock) =>{
    if(step >= 3){
      // water level shift
      ref.current.position.y = waterLevel * 100 + 0 * Math.sin(0.4 * clock.clock.elapsedTime);
    }else{
      // init the position
      ref.current.position.y = waterLevel * 100;
    }
  })

  const OceanGroup1 = useMemo(() =>
    <group ref={ref} position={[0, 0, 4000]}>
      {
        <group position={[0, -xyzProps.yLength/2, 0]}>
          <Rect width={10000} height={1} depth={10000} color={color_ocean2} opacity={0.8}/>
        </group>
      }
    </group>, []);

  return(
    <>{OceanGroup1}</>
  );
}

const VisComponent = React.forwardRef((props, ref) =>{
  return(
    <group position={[0, 0, 0]} ref={ref}>
      <AxGr />
      <DiscGroup />
      <OceanGroup />
    </group>
  )
});

export { VisComponent as VisComponent_Immersive };
