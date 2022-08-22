import * as THREE from 'three';

// DS2 animation
export const totalFrame = 5000;
export const TextComponentHeight = 1000;

// DS2 consts
export const xyzProps = {
  xSteps: 6, xLength: 100, xPadding: 2.5,
  ySteps: 20, yLength: 100, yPadding: 2.5,
  zSteps: 0, zLength: 0, zPadding: 0,
  // 2001 ~ 2019:      01  , 02  , 03  , 04  , 05  , 06  , 07  , 08  , 09  , 10  , 11  , 12  , 13  , 14  , 15  , 16  , 17  , 18  , 19
  dataIncome:         [38.0, 38.0, 39.0, 40.0, 41.0, 42.0, 43.0, 45.0, 46.0, 49.0, 48.0, 47.0, 48.0, 48.0, 48.0, 48.0, 48.0, 49.0, 50.0],
  dataHappiness:      [68.2, 68.3, 68.3, 68.1, 68.1, 68.3, 68.4, 68.4, 68.6, 68.2, 67.9, 68.2, 68.4, 68.3, 67.6, 67.2, 66.9, 66.4, 66.2],
  dataChangePoint:    [43.0, 42.0, 49.0, 49.0, 53.0, 53.0, 48.0, 51.0, 58.0, 56.0, 56.0, 57.0, 64.0, 59.0, 71.0, 67.0, 62.0, 69.0, 74.0],
  dataPopBelowChange: [57.0, 55.0, 64.0, 63.0, 66.0, 63.0, 50.0, 55.0, 60.0, 60.0, 60.0, 59.0, 67.0, 61.0, 74.0, 66.0, 73.0, 72.0, 74.0],
}
export const xLength = xyzProps.xLength,    yLength = xyzProps.yLength,   zLength = xyzProps.zLength;
export const xPadding = xyzProps.xPadding,  yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
export const xSteps = xyzProps.xSteps,      ySteps = xyzProps.ySteps,     zSteps = xyzProps.zSteps;
export const centerPos = [-xyzProps.xLength/2, -xyzProps.yLength/2, -xyzProps.zLength/2];

export const tickLength = 0.6;
export const color_beige = new THREE.Color("#f8f5f0");
export const color1 = new THREE.Color("#512C8A");
export const color2 = new THREE.Color("#2F9B39");
export const color3 = new THREE.Color("#A49096");
export const color4 = new THREE.Color("#B4A0A6");
export const color4_bright = new THREE.Color("#d7ccce");
export const color4_dark = new THREE.Color("#866972");
export const color_greenTop = new THREE.Color("#328039");
export const color_ocean1 = new THREE.Color("#7db5ff");
export const color_ocean2 = new THREE.Color("#8cdbed");
export const color_lineSeg = new THREE.Color("#5B3F36");

// DS2 overlays
export const title = `The Stock Market’s Covid Pattern: 
Faster Recovery From Each Panic
`
export const text1 = ``
export const text2 = ``
export const text3 = ``
export const text4 = ``
export const text5 = ``
