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
export const title = `Why Happiness is Becoming
more Expensive and Out of Reach?
`
export const text1 = `Nobel prize winning psychologist Daniel Kahneman first described the change point where extra income begins to matter less for happiness.

This is one of the most well-known findings in the economic study of happiness is that, on average, happiness increases with income, but at a certain point diminishing returns set in.
`
export const text2 = `In our new study, published in October 2021, we combined each person’s frequencies into a single happiness score to see how it changed between 2009 and 2019 in relation to household income.

What we've found is that the change point in Australia has been increasing and moving out of reach of most Australians resulting happiness score to decline.
`
export const text3 = `In 2009, the change point and the median income were at around A$48,000.

However, the number of Australians on an income below change point has increased from around 50% to 74% since 2009.
`
export const text4 = `After adjusting for inflation and cost-of-living increases, the change point has soared up from A$48,000 to A$74,000.

At the same time, the median income has lingered at less than A$50,000 per year.
`
export const text5 = `Australians’ happiness is becoming more sensitive to income which is likely to drive further inequities in well-being between the rich and poor in Australia.

Income by itself doesn’t explain a large proportion of the variance in happiness. But it’s still concerning because across the entire population these small changes can be expected to accumulate.
`
