import * as THREE from 'three';

// DS2 animation
export const totalFrame = 5000;
export const TextComponentHeight = 1000;

// DS2 consts
export const xyzProps = {
  xSteps: 6, xLength: 100, xPadding: 2.5,
  ySteps: 20, yLength: 100, yPadding: 2.5,
  zSteps: 0, zLength: 0, zPadding: 0,
}
export const xLength = xyzProps.xLength,    yLength = xyzProps.yLength,   zLength = xyzProps.zLength;
export const xPadding = xyzProps.xPadding,  yPadding = xyzProps.yPadding, zPadding = xyzProps.zPadding;
export const xSteps = xyzProps.xSteps,      ySteps = xyzProps.ySteps,     zSteps = xyzProps.zSteps;
export const centerPos = [-xyzProps.xLength/2, -xyzProps.yLength/2, -xyzProps.zLength/2];

export const tickLength = 0.6;

// DS2 overlays
export const title = `The Stock Market’s Covid Pattern:
Faster Recovery From Each Panic
`
export const text1 = `Since the outbreak of COVID-19, each new phase of the pandemic tilted the stock market, and the propagation force has become stornger at every turn.

However, despite the adverse condition, the stock market developed tolerance and recovered the fall faster than before. Let's compare three periods of S&P decline due to COVID-19 at different times.`
export const text2 = `The initial emergence of COVID-19 had a first impact at February 19th 2020,
and the emergence of delta and omicron variant started from September 2nd 2021 and November 18th 2021 for each.`
export const text3 = `The virus had a great influence on society as a whole, and the changes
how people shop, travel or even turn up for work are mirrored to the stock market.`
export const text4 = `Although the Omicron variant's impact wasn't negligible, the duration of the fall was shortened compared to that of the Delta variant(the difference is even much bigger when compared to that of the initial emergence of COVID-19).`
export const text5 = `Also, comparing the lowest point of the falls, recent two cases were a drop in the bucket compared to the first impact. The S&P lost 5% and 6%  of it at last two falls. However, when the initial COVID-19 outbreak had reached a global scale, the S&P had lost more than a third of its value from its peak.`
export const text6 = `Each of pandemic-driven volatility in the stock market since February 2020 has shown a pattern of falling less and recovering to a new high faster than before. The market’s recoveries were underpinned by the Federal Reserve’s various measures to keep the financial system and progress on vaccines and other treatments.`
