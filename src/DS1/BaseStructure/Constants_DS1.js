import * as THREE from 'three';

// DS1 animation
export const groupVarNum = 7;
export const camVarNum = 7;
export const totalFrame = 5000;
export const TextComponentHeight = 1000;


// DS1 consts
export const xyzProps = {
  xSteps: 2,  xLength: 60,  xPadding: 15,
  ySteps: 11, yLength: 60,  yPadding: 0,
  zSteps: 3,  zLength: 100, zPadding: 10,
  dataA1: [30, 60, 70, 80, 90, 130, 140, 150, 150, 170, 180, 210],
  dataB1: [90, 90, 100, 100, 110, 120, 120, 140, 140, 150, 160, 180],
  dataA2: [60, 60, 60, 55, 55, 55, 50, 50, 50, 45, 40, 40],
  dataB2: [30, 40, 40, 50, 50, 50, 60, 70, 70, 70, 70, 80]
}
export const xLength = xyzProps.xLength, yLength = xyzProps.yLength, zLength = xyzProps.zLength;
export const xPadding = xyzProps.xPadding, yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
export const xSteps = xyzProps.xSteps, ySteps = xyzProps.ySteps, zSteps = xyzProps.dataA1.length;
export const centerPos = [-xLength / 2, -yLength / 2, -zLength / 2];
export const rectWidth = 6;
export const rectDepth = 2;

export const tickLength = 0.6;
export const color1 = new THREE.Color("#512C8A");
export const color2 = new THREE.Color("#2F9B39");

// DS1 overlays
export const title = `Does Urbanization Affect
Food Consumption Pattern?
`
export const text1 = `X and Y became highly urbanized during the last year. As a result, the graph demonstrates that both X and Y had a noticeable increase in food consumption.
`
export const text2 = `The monthly chart shows in detail that the increasing trends were distinct. While X's food consumption increased noticeably after May, Y's went up steadily.
`
export const text3 = `However, the vegetable and grain consumption timeline revealed the contrasting patterns of the two cities.
`
export const text4 = `In the early of 2021, the ratio of vegetable and grain consumption in both cities were comparable.
`
export const text5 = `Y's ratio has exceeded X's since May. The gap between the two cities kept increasing until the end of 2021.
`
export const text6 = `In sum, urbanization appeared to affect both the total and composition of consumption. However, there was no direct causal relationship with the type of consumption pattern.
`
