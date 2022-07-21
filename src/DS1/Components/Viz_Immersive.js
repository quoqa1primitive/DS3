import * as THREE from 'three';
import React, { useMemo, useLayoutEffect } from 'react';
import { Line, TextBox, Rect, If } from '../../BasicElements/BasicElements.js';
import { useStore, idces, visibleNum } from '../../BasicElements/Store.js';
import { xyzProps, XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from '../../BasicElements/Constants.js';

const tickLength = 0.6;
const xLength = xyzProps.xLength, yLength = xyzProps.yLength, zLength = xyzProps.zLength;
const xPadding = xyzProps.xPadding, yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
const xSteps = xyzProps.xSteps, ySteps = xyzProps.ySteps, zSteps = xyzProps.dataA1.length;
const centerPos = [
  -xyzProps.xLength / 2,
  -xyzProps.yLength / 2,
  -xyzProps.zLength / 2
];
const rectDepth = 2;
const rectWidth = 6;
const xStep = 8;
const ratio = 5 / 3;
const color1 = new THREE.Color("#512C8A");
const color2 = new THREE.Color("#2F9B39");

function AxGr({props}){
  const step = useStore((state) => state.step);

  const XAxis1 = useMemo(() =>
    <>
      {
        Array(xSteps).fill(0).map((x, y) => x + y).map((item, idx) => {
          return <mesh key={idx} position={[xPadding + item * ((xLength - 2 * xPadding) / (xSteps - 1)), -tickLength, zLength]}>
            <If if={step <= 2}>
              <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} /> // Tick
              <TextBox text={String.fromCharCode(88+item)} anchorX={"center"} anchorY={"top"} /> // Label
            </If>
            <If if={step <= 4}>
              <Line key={idx+100} color={"lightgrey"} start={[0, tickLength, 0]} end={[0, tickLength, -zLength]} /> // Grid
            </If>
            <If if={step <= 2}>
              <group position={[-4, (idx==0?xyzProps.dataA1[0]:xyzProps.dataB1[0]) / 5 + 3, 0]}>
                <TextBox text={"Jan."} anchorX={"center"} anchorY={"bottom"} label={null}/> // X-Axis2
              </group>
              <group position={[4, (idx==0?xyzProps.dataA1[xyzProps.dataA1.length - 1]:xyzProps.dataB1[xyzProps.dataB1.length - 1]) / 5 + 3, 0]}>
                <TextBox text={"Dec."} anchorX={"center"} anchorY={"bottom"} label={null}/> // X-Axis2
              </group>
            </If>
          </mesh>
        })
      }
      <If if={step <= 2}>
        <group position={[xLength / 2, -6, zLength]}>
          <TextBox text={"City"} anchorX={"center"} anchorY={"bottom"} label={XAXIS1}/>
        </group>
      </If>
    </>, [step]);

  const YAxis1 = useMemo(() =>
  <>
    {
      Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[-tickLength, item * ((yLength - 2 * yPadding) / (ySteps - 1)), 0]}>
          <If if={step >= 1 && step <= 4}>
            <Line key={idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} /> // Tick
            <TextBox text={0 + 30 * item} anchorX={"right"} anchorY={"middle"} /> // Label
          </If>
          <If if={step <= 4}>
            <Line key={idx+100} color={"lightgrey"} start={[tickLength, 0, 0]} end={[xLength, 0, 0]} /> // Grid
          </If>
          <If if={(step >= 2 && step <= 4) || (step == 5 && idx != 0)}>
            <Line key={idx+200} color={"lightgrey"} start={[xLength, 0, 0]} end={[xLength, 0, zLength]} /> // Grid
          </If>
        </mesh>
      })
    }
    <If if={step >= 1 && step <= 4}>
      <group position={[-6, yLength / 2, -6]}>
        <TextBox text={"Food Consumption(ton)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS1}/>
      </group>
    </If>
  </>, [step]);

  const YAxis2 = useMemo(() =>
  <>
    {
      Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[yPadding + item * ((yLength - 2 * yPadding) / (ySteps - 1)), -tickLength, -tickLength]}>
          <If if={step >= 6}>
            <Line key={idx} color={"black"} start={[0, 0, tickLength]} end={[0, 0, 0]} /> // Tick
            <TextBox text={0 + 10 * item} anchorX={"right"} anchorY={"middle"} /> // Label
          </If>
          <If if={step == 5 && idx != 0}>
              <Line key={idx+100} color={"lightgrey"} start={[0, tickLength, tickLength]} end={[0, tickLength, zLength]} />
          </If>
          <If if={step >= 6}>
              <Line key={idx+100} color={"lightgrey"} start={[0, -8*rectDepth, 0]} end={[0, -8*rectDepth, zLength]} />
              <Line key={idx+1000} color={"lightgrey"} start={[0, 0, 0]} end={[0, -8*rectDepth, 0]} />
          </If>
        </mesh>
      })
    }
    <If if={step >= 6}>
      <group position={[xLength / 2, 0, -6]}>
        <TextBox text={"Vegetable + Grain Consumption(%)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS2}/>
      </group>
    </If>
  </>, [step]);

  const ZAxis1 = useMemo(() =>
  <>
    {
      Array(xyzProps.dataA1.length).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[0, -tickLength, zPadding + item * ((zLength - 2 * zPadding) / (zSteps - 1))]}>
          <If if={step >= 4}>
            <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} /> // Tick
            <TextBox text={1 + 1 * item} anchorX={"center"} anchorY={"top"} /> // L abel
          </If>

        </mesh>
      })
    }
    <If if={step >= 4}>
      <group position={[-6, -6, zLength / 2]}>
        <TextBox text={"Month"} anchorX={"center"} anchorY={"bottom"} label={ZAXIS1}/>
      </group>
    </If>
  </>, [step]);

  return(
    <group position={centerPos}>
      {XAxis1}
      {YAxis1}
      {ZAxis1}
      {YAxis2}
      <If if={step <= 4}>
        <Line color={"black"} start={[0, 0, zLength]} end={[xLength, 0, zLength]} /> // X-Axis
        <Line color={"black"} start={[0, 0, 0]} end={[0, yLength, 0]} /> // Y-Axis
      </If>
      <If if={step == 5}>
        <Line color={"black"} start={[xLength, 0, 0]} end={[xLength, yLength, 0]} /> // Second Y-Axis
      </If>
      <Line color={"black"} start={[0, 0, 0]} end={[0, 0, zLength]} /> // Z-Axis
      <If if={step >= 4}>
        <Line color={"black"} start={[0, 0, 0]} end={[xLength, 0, 0]} /> // X-Axis2
      </If>
    </group>
  )
}

function MainGroup1(props){


  const BarGroup1 = useMemo(() =>
  <group position={centerPos}>
    {
      xyzProps.dataA1.map((item, idx) => {
        return <mesh key={idx}
          position={[
            xPadding + 0 * ((xLength - 2 * xPadding) / (xSteps - 1)) + rectWidth / (idx == 0?  -1.5 : 1.5),
            0,
            zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) - rectDepth / 2]}>
            <Rect width={rectWidth} height={item} depth={rectDepth} color={color1} opacity={idx==xyzProps.dataA1.length-1?1:1}/>
          </mesh>
      })
    }
    {
      xyzProps.dataB1.map((item, idx) => {
        return <mesh key={idx}
            position={[
              xPadding + 1 * ((xLength - 2 * xPadding) / (xSteps - 1)) + rectWidth / (idx == 0?  -1.5 : 1.5),
              0,
              zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) + rectDepth / 2]}>
            <Rect key={idx} width={rectWidth} height={item} depth={rectDepth} color={color2} opacity={idx==xyzProps.dataB1.length-1?1:1}/>
          </mesh>
      })
    }
  </group>, []);

  return(
    <>{BarGroup1}</>
  );
}

function MainGroup2({prop}){
  const step = useStore((state) => state.step);
  const opacity = useStore((state) => state.opacity);

  const BarGroup2 = useMemo(() =>
  <group position={centerPos}>
    {
      xyzProps.dataA1.map((item, idx) => {
        return <mesh
          key={idx}
          position={[
            0 + xyzProps.dataA2[idx] / ratio /2,
            0,
            zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) - rectDepth / 2]}>
            <Rect width={xyzProps.dataA2[idx] / ratio} height={step<=5?item:-8*rectDepth} depth={rectDepth} color={color1}
              opacity={
                step<=8? (idx >= 5)? opacity : 1
                  : step<=10? (idx > 4)? opacity : (idx < 4)? 1.2 - opacity : 1
                  : (idx < 4)? 1.2 - opacity: 1
                }
            />
          </mesh>
      })
    }
    {
      xyzProps.dataB1.map((item, idx) => {
        return <mesh
          key={idx}
          position={[
            0 + xyzProps.dataB2[idx] / ratio / 2,
            0,
            zPadding + idx * ((zLength - 2 * zPadding) / (zSteps - 1)) + rectDepth / 2]}>
            <Rect width={xyzProps.dataB2[idx] / ratio} height={step<=5?item:-8*rectDepth} depth={rectDepth} color={color2}
              opacity={
                step<=8? (idx >= 5)? opacity : 1
                  : step<=10? (idx > 4 )? opacity : (idx < 4)? 1.2 - opacity : 1
                  : (idx < 4)? 1.2 - opacity: 1
                }
            />
          </mesh>
      })
    }
  </group>, [step, opacity]);

  return(
    <>{BarGroup2}</>
  )
}

const VisComponent_Immersive = React.forwardRef((props, ref) =>{
  const step = useStore((state) => state.step);
  useLayoutEffect(() => {
    console.log("Imm case rerendered");
  }, [])
  return(
    <group position={[0, 0, 0]} ref={ref}>
      <AxGr />
      <If if={step < 4}>
        <MainGroup1 />
      </If>
      <If if={step >= 4}>
        <MainGroup2 opacity={props.opacity} />
      </If>
    </group>
  );
});

export { VisComponent_Immersive };
