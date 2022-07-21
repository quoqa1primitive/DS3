import * as THREE from 'three';
import React, { useMemo } from 'react';
import { Line, TextBox, Rect, If, Lerp } from '../../BasicElements/BasicElements.js';
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
const rectWidth = 6;
const rectDepth = 2;
const ratio = 5 / 3;
const color1 = new THREE.Color("#512C8A");
const color2 = new THREE.Color("#2F9B39");

// for animation in progress[2-3-4-5]
// how many datapoints will be marked?
const visibleNum = [12, 6, 9, 12];
// what would be the start index?
const idces = [0, 0, 3, 0];

function AxGr({step, ...props}){
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

      {
        Array(xyzProps.dataA1.length).fill(0).map((x, y) => x + y).map((item, idx) => {
          const currentIdx = Lerp(Lerp(Lerp(idces[0],idces[1],props.progress[3]),idces[2],props.progress[4]),idces[3],props.progress[5]);
          const val = [
            zPadding + (item - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[0] - 1)),
            zPadding + (item - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[1] - 1)),
            zPadding + (item - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[2] - 1)),
            zPadding + (item - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[3] - 1))
          ];
          // for better animation effect, spacing changes later than adjusting the startpoint. modify if visibleNum and startIdx changed
          const currentVal =Lerp(Lerp(Lerp(val[0],val[1],props.progress[3]),val[2],props.progress[4]),val[3],props.progress[5]);

          const visibleCheck = (currentVal <= zPadding + (zLength - 2 * zPadding) + 0.5 * zPadding) && (currentVal >= zPadding - 0.5 * zPadding);
          return <mesh key={idx} position={[currentVal, -tickLength, zLength]}>
            <If if={step >= 4 && visibleCheck}>
              <Line key={idx} color={"black"} start={[0, 0, 0]} end={[0, tickLength, 0]} />
              <TextBox text={1 + 1 * item} anchorX={"center"} anchorY={"top"} />
            </If>
          </mesh>
        })
      }
      <If if={step >= 4}>
        <group position={[zLength / 2, -6, zLength]}>
          <TextBox text={"Month"} anchorX={"center"} anchorY={"bottom"} label={XAXIS1}/>
        </group>
      </If>

    </>, [step, props.progress]);

  const YAxis1 = useMemo(() =>
  <>
    {
      Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
        return <mesh key={idx} position={[-tickLength, item * ((yLength - 2 * yPadding) / (ySteps - 1)), 0]}>
          <If if={step >= 1 && step <= 4}>
            <Line key={idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} /> // Tick
            <TextBox text={0 + 30 * item} anchorX={"right"} anchorY={"middle"} /> // Label
          </If>
          <Line key={idx+100} color={"lightgrey"} start={[tickLength, 0, 0]} end={[xLength + (zLength - xLength) * props.progress[1], 0, 0]} /> // Grid
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
            <Line key={idx} color={"black"} start={[0, 0, 0]} end={[tickLength, 0, 0]} /> // Tick
            <TextBox text={0 + 10 * item} anchorX={"right"} anchorY={"middle"} /> // Label
          </If>
        </mesh>
      })
    }
    <If if={step >= 6}>
      <group position={[-6, yLength / 2, -6]}>
        <TextBox text={"Vegetable + Grain Consumption(%)"} anchorX={"center"} anchorY={"bottom"} label={YAXIS1}/>
      </group>
    </If>
  </>, [props.progress]);

  return(
    <group position={[centerPos[0] - 0.5 * (zLength - xLength) * props.progress[1], centerPos[1], centerPos[2]]}>
      {XAxis1}
      {YAxis1}
      <If if={true}>
        <Line color={"black"} start={[0, 0, zLength]} end={[xLength + (zLength - xLength) * props.progress[1], 0, zLength]} /> // X-Axis
        <Line color={"black"} start={[0, 0, 0]} end={[0, yLength, 0]} /> // Y-Axis
      </If>
    </group>
  )
}

function MainGroup({step, opacity, ...props}){

  const BarGroup = useMemo(() =>
  <group position={[centerPos[0] - 0.5 * (zLength - xLength) * props.progress[1], centerPos[1], centerPos[2]]}>
    {
      xyzProps.dataA1.map((item, idx) => {
        const currentIdx = Lerp(Lerp(Lerp(idces[0],idces[1],props.progress[3]),idces[2],props.progress[4]),idces[3],props.progress[5]);

        const width = [
          rectWidth,
          rectDepth,
          rectDepth * xyzProps.dataA1.length / visibleNum[1],
          rectDepth * xyzProps.dataA1.length / visibleNum[2],
          rectDepth
        ];
        const currentWidth = Lerp(Lerp(Lerp(Lerp(width[0],width[1],props.progress[1]),width[2],props.progress[3]),width[3],props.progress[4]),width[4],props.progress[5]);

        let selector = (idx == 0 || idx == xyzProps.dataA1.length - 1)? 1 : props.progress[1];
        const height = [
          item * selector,
          3 * xyzProps.dataA2[idx]
        ];
        const currentHeight = Lerp(height[0], height[1], props.progress[2]);

        const pos = [
          xPadding + 0 * ((xLength - 2 * xPadding) / (xSteps - 1)) + rectWidth / 1.5 * (idx == 0?  -1 : idx == xyzProps.dataA1.length - 1? 1 : 0),
          zPadding + (idx - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[0] - 1)) - rectDepth / 2,
          zPadding + (idx - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[1] - 1)) - rectDepth * xyzProps.dataA1.length / visibleNum[1] / 2,
          zPadding + (idx - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[2] - 1)) - rectDepth * xyzProps.dataA1.length / visibleNum[2] / 2,
          zPadding + (idx - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[3] - 1)) - rectDepth / 2
        ];
        const currentPos = Lerp(Lerp(Lerp(Lerp(pos[0],pos[1],props.progress[1]),pos[2],props.progress[3]),pos[3],props.progress[4]),pos[4],props.progress[5]);
        const visibleCheck = (currentPos <= zPadding + (zLength - 2 * zPadding) + 0.5 * zPadding) && (currentPos >= zPadding - 0.5 * zPadding);

        return(
          <If if={visibleCheck}>
            <mesh key={idx} position={[currentPos, 0, 0]}>
              <Rect width={currentWidth} height={currentHeight} depth={rectDepth} color={color1}
                opacity={
                  step<=8? (idx >= 5)? opacity : 1
                    : step<=10? (idx > 4)? opacity : (idx < 4)? 1.2 - opacity : 1
                    : (idx < 4)? 1.2 - opacity: 1
                  }
              />
            </mesh>
          </If>
        )
      })
    }
    {
      xyzProps.dataB1.map((item, idx) => {
        const currentIdx = Lerp(Lerp(Lerp(idces[0],idces[1],props.progress[3]),idces[2],props.progress[4]),idces[3],props.progress[5]);

        const width = [
          rectWidth,
          rectDepth,
          rectDepth * xyzProps.dataA1.length / visibleNum[1],
          rectDepth * xyzProps.dataA1.length / visibleNum[2],
          rectDepth
        ];
        const currentWidth = Lerp(Lerp(Lerp(Lerp(width[0],width[1],props.progress[1]),width[2],props.progress[3]),width[3],props.progress[4]),width[4],props.progress[5]);

        let selector = (idx == 0 || idx == xyzProps.dataB1.length - 1)? 1 : props.progress[1];
        const height = [
          item * selector,
          3 * xyzProps.dataB2[idx]
        ];
        const currentHeight = Lerp(height[0], height[1], props.progress[2]);

        const pos = [
          xPadding + 1 * ((xLength - 2 * xPadding) / (xSteps - 1)) + rectWidth / 1.5 * (idx == 0?  -1 : idx == xyzProps.dataA1.length - 1? 1 : 0),
          zPadding + (idx - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[0] - 1)) + rectDepth / 2,
          zPadding + (idx - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[1] - 1)) + rectDepth * xyzProps.dataA1.length / visibleNum[1] / 2,
          zPadding + (idx - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[2] - 1)) + rectDepth * xyzProps.dataA1.length / visibleNum[2] / 2,
          zPadding + (idx - currentIdx) * ((zLength - 2 * zPadding) / (visibleNum[3] - 1)) + rectDepth / 2
        ];
        const currentPos = Lerp(Lerp(Lerp(Lerp(pos[0],pos[1],props.progress[1]),pos[2],props.progress[3]),pos[3],props.progress[4]),pos[4],props.progress[5]);
        const visibleCheck = (currentPos <= zPadding + (zLength - 2 * zPadding) + 0.5 * zPadding) && (currentPos >= zPadding - 0.5 * zPadding);

        return(
          <If if={visibleCheck}>
            <mesh key={idx} position={[currentPos, 0, 0]}>
              <Rect width={currentWidth} height={currentHeight} depth={rectDepth} color={color2}
                opacity={
                  step<=8? (idx >= 5)? opacity : 1
                    : step<=10? (idx > 4 )? opacity : (idx < 4)? 1.2 - opacity : 1
                    : (idx < 4)? 1.2 - opacity: 1
                  }
              />
            </mesh>
          </If>
        )
      })
    }
  </group>, [step, opacity, props.progress]);

  return(
    <>{BarGroup}</>
  )
}

const VisComponent_Animated = React.forwardRef((props, ref) =>{
  return(
    <group position={[0, 0, 0]} ref={ref}>
      <AxGr step={props.step} progress={props.progress} />
      <MainGroup step={props.step} opacity={props.opacity} progress={props.progress} />
    </group>
  );
});

export { VisComponent_Animated };
