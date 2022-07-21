import * as THREE from 'three';
import React, { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber'
import { Line, TextBox, Rect, Rect2, If, Lerp } from '../../BasicElements/BasicElements.js';
import { xyzProps, XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from '../../BasicElements/Constants.js';
import { useStore } from '../../BasicElements/Store.js';

const tickLength = 0.6;
const xLength = xyzProps.xLength, yLength = xyzProps.yLength, zLength = xyzProps.zLength;
const xPadding = xyzProps.xPadding, yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
const xSteps = xyzProps.xSteps, ySteps = xyzProps.ySteps, zSteps = xyzProps.dataA1.length;
const centerPos = [
  -xyzProps.xLength / 2,
  -xyzProps.yLength / 2,
  -xyzProps.zLength / 2
];
const color1 = new THREE.Color("#512C8A");
const color2 = new THREE.Color("#2F9B39");

// for animation in progress[2-3-4-5]
// how many datapoints will be marked?
const visibleNum = [12, 6, 9, 12];
// what would be the start index?
const idces = [0, 0, 3, 0];

const AxGr = React.forwardRef((props, ref) => {
  const progress = useStore((state) => state.progress);
  const currentIdx = useStore((state) => state.currentIdx);
  const step = useStore((state) => state.step);

  const XAxis1 = useMemo(() =>
    <>
      {
        Array(xSteps).fill(0).map((x, y) => x + y).map((item, idx) => {
          return <mesh key={idx} position={[xPadding + item * ((xLength - 2 * xPadding) / (xSteps - 1)), -tickLength, zLength]}>
            <If if={step <= 2}>
              <Line key={'XTick1_'+idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} /> // Tick
              <TextBox text={String.fromCharCode(88+item)} anchorX={"center"} anchorY={"top"} /> // Label
            </If>
            <If if={step <= 4}>
              <Line key={'XGrid_'+idx} color={"lightgrey"} start={[0, tickLength, 0]} end={[0, tickLength, -zLength]} /> // Grid
            </If>

            <If if={step <= 2 && idx <= 1}>
              <group position={[-4, (idx==0?xyzProps.dataA1[0]:xyzProps.dataB1[0]) / 5 + 3, 0]}>
                <TextBox key={'XAnn1_'+idx} text={"Jan."} anchorX={"center"} anchorY={"bottom"} label={null}/> // X-Axis2
              </group>
              <group position={[4, (idx==0?xyzProps.dataA1[xyzProps.dataA1.length - 1]:xyzProps.dataB1[xyzProps.dataB1.length - 1]) / 5 + 3, 0]}>
                <TextBox key={'XAnn2_'+idx} text={"Dec."} anchorX={"center"} anchorY={"bottom"} label={null}/> // X-Axis2
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

      {
        Array(xyzProps.dataA1.length).fill(0).map((x, y) => x + y).map((item, idx) => {
          const val = [
            zPadding + (item - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[0] - 1)),
            zPadding + (item - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[1] - 1)),
            zPadding + (item - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[2] - 1)),
            zPadding + (item - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[3] - 1))
          ];
          // for better animation effect, spacing changes later than adjusting the startpoint. modify if visibleNum and startIdx changed
          const currentVal =Lerp(Lerp(Lerp(val[0],val[1],progress[3]),val[2],progress[4]),val[3],progress[5]);
          const visibleCheck = (currentVal <= zPadding + (zLength - 2 * zPadding) + 0.5 * zPadding) && (currentVal >= zPadding - 0.5 * zPadding);

          return <mesh key={idx} position={[currentVal, -tickLength, zLength]}>
            <If if={step >= 4 && visibleCheck}>
              <Line key={'XTick2_'+idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} />
              <TextBox key={'XName2_'+idx} text={1 + 1 * item} anchorX={"center"} anchorY={"top"} />
            </If>
          </mesh>
        })
      }
      <If if={step >= 4}>
        <group position={[zLength / 2, -6, zLength]}>
          <TextBox text={"Month"} anchorX={"center"} anchorY={"bottom"} label={XAXIS1}/>
        </group>
      </If>

    </>, [step, progress]);

  const YAxis1 = useMemo(() =>
  <>
    {
      Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[-tickLength, item * ((yLength - 2 * yPadding) / (ySteps - 1)), 0]}>
          <If if={step >= 1 && step <= 4}>
            <Line key={'YTick1_'+idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} /> // Tick
            <TextBox key={'YLabel1_'+idx} text={0 + 30 * item} anchorX={"right"} anchorY={"middle"} /> // Label
          </If>
          <Line key={'YGrid_'+idx} color={"lightgrey"} start={[tickLength, 0, 0]} end={[xLength + (zLength - xLength) * progress[1], 0, 0]} /> // Grid
        </mesh>
      })
    }
    <If if={step >= 1 && step <= 4}>
      <group position={[-6, yLength / 2, -6]}>
        <TextBox text={"Food Consumption(ton)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS1}/>
      </group>
    </If>

    {
      Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[-tickLength, item * ((yLength - 2 * yPadding) / (ySteps - 1)), 0]}>
          <If if={step >= 6}>
            <Line key={'YTick2_'+idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} /> // Tick
            <TextBox key={'YLabel2_'+idx} text={0 + 10 * item} anchorX={"right"} anchorY={"middle"} /> // Label
          </If>
        </mesh>
      })
    }
    <If if={step >= 6}>
      <group position={[-6, yLength / 2, -6]}>
        <TextBox text={"Vegetable + Grain Consumption(%)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS1}/>
      </group>
    </If>
  </>, [progress]);

  return(
    <group position={[centerPos[0] - 0.5 * (zLength - xLength) * progress[1], centerPos[1], centerPos[2]]}>
      {XAxis1}
      {YAxis1}
      <If if={true}>
        <Line color={"black"} start={[0, 0, zLength]} end={[xLength + (zLength - xLength) * progress[1], 0, zLength]} /> // X-Axis
        <Line color={"black"} start={[0, 0, 0]} end={[0, yLength, 0]} /> // Y-Axis
      </If>
    </group>
  )
});

const MainGroup = React.forwardRef((props, ref) => {
  const group = useRef();
  const rectGroupPos = useStore((state) => state.rectGroupPos);

  useFrame((state, delta) => {
    group.current.position.set(rectGroupPos[0], rectGroupPos[1], rectGroupPos[2]);
  });

  const BarGroup = useMemo(() =>
    <group ref={group} >
      {
        xyzProps.dataA1.map((item, idx) => {
          return(
            <>
              <Rect2
                AB={true}
                key={'RectA'+idx}
                idx={idx}
                item={item}
                color={color1}
              />
              <Rect2
                AB={false}
                key={'RectB'+idx}
                idx={idx}
                item={xyzProps.dataB1[idx]}
                color={color2}
              />
            </>
          )
        })
      }
    </group>
  , []);

  return(
    <>
      {BarGroup}
    </>
  )
});

const VisComponent_Animated = React.forwardRef((props, ref) =>{

  return(
    <group position={[0, 0, 0]} ref={ref}>
      <AxGr />
      <MainGroup />
    </group>
  );
});

export { VisComponent_Animated };
