import {adjustedArr1, adjustedArr2, adjustedArr3, arr1, arr2, arr3, adjustedB1, adjustedA1B2, adjustedA2B3} from '../Components/snpData.js';
const xScale = 30;
const yScale = 20;
const lineWidth = 80;
const interval = 3;
const camIntervalX = 1350;
const camIntervalY = 1880;
const xSpace = 1;

const stoppers_DS2 =      [0.01, 0.01, 0.01, 0.00, 0.01, 0.01, 0.00, 0.01, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00,  0.00,  0.01,  0.01,  0.00,  0.00,  0.00,  0.00,  0.00,  0.00,  0.00,  0.00,  0.00,  0.00,  0.00,  0.00];
const clipPositions_DS2 = [0.00, 0.03, 0.06, 0.09, 0.12, 0.15, 0.18, 0.21, 0.24, 0.27, 0.30, 0.33, 0.36, 0.39,  0.42,  0.55,  0.58,  0.61,  0.64,  0.67,  0.70,  0.73,  0.76,  0.79,  0.82,  0.85,  0.88,  0.91,  1.00];
// frame                      0,    1,    2,    3,    4,    5,    6,    7,    8,    9,   10,   11,   12,   13,    14,    15,    16,    17,    18,    19,    20,    21,    22,    23,    24,    25,    26,   27,     28

const points3 = [];
for (var i=0; i< adjustedArr3.length; i++) {
  points3.push( [ i*xScale, (adjustedArr3[i] - 2*adjustedArr3[0] + adjustedArr1[0])*yScale, (2*interval)*lineWidth ] );
}
const points2 = [];
for (var i=0; i< adjustedArr2.length; i++) {
  points2.push( [ i*xScale, (adjustedArr2[i]-2*adjustedArr2[0]+adjustedArr1[0])*yScale , interval*lineWidth ] );
} const points1 = [];
for (var i=0; i< adjustedArr1.length; i++) {
  points1.push( [ i*xScale, (adjustedArr1[i]-adjustedArr1[0])*yScale, 0 ] );
}
const len3 = points3.length;
const len2 = points2.length;
const len1 = points1.length;
const line1PosX = -xScale*(adjustedArr2.length+adjustedA2B3.length+adjustedA1B2.length+adjustedArr1.length-4);
const line1PosY = -(adjustedArr3[0]-adjustedArr1[0])*yScale;
const gap2to1 = (adjustedArr2[0]-adjustedArr1[0])*yScale;
const gap3to1 =(adjustedArr3[0]-adjustedArr1[0])*yScale;

function getClips(){
  let clips = [];
  clips.push({
    "target": "line1", "name": "only axis",
    "lookAt": [-6700,10000,3999900] ,"pos": [-6700, 10000, 4900000], "rot": [0,0,0], "zoom": 600,
    "lookAtGap":0, "railMove": [0,0],
    "color1": [0,100,0], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY,2*interval*lineWidth],
    "pos2": [-xScale*(adjustedArr2.length+adjustedA2B3.length-2), line1PosY, 2*interval*lineWidth],
    "pos3": [0, line1PosY, 2*interval*lineWidth],
    "opacityLine": 1, "opacityGrid": 0, "opacityML": 0, "opacityAxis": 1, "opacityLastAxis": 0, "opacityExtraML": 1, "opacityExtraLine": 1
  });
  clips.push({
    "target": "line1", "name": "overall graph",
    "lookAt": [-6700,-2500,3999900] ,"pos": [-6700, -2500, 4900000], "rot": [0,0,0], "zoom": 600,
    "lookAtGap":0, "railMove": [0,0],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY,2*interval*lineWidth],
    "pos2": [-xScale*(adjustedArr2.length+adjustedA2B3.length-2), line1PosY, 2*interval*lineWidth],
    "pos3": [0, line1PosY, 2*interval*lineWidth],
    "opacityLine": 1, "opacityGrid": 0, "opacityML": 1, "opacityAxis": 1, "opacityLastAxis": 0, "opacityExtraML": 1, "opacityExtraLine": 1
  });
  clips.push({
    "target": "line1", "name": "enter 3d",
    "lookAt": [-10800,-700,760] ,"pos": [-10800, -700, 5000], "rot": [0,0,0], "zoom": 1,
    "lookAtGap":0, "railMove": [0,0],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY,2*interval*lineWidth],
    "pos2": [-xScale*(adjustedArr2.length+adjustedA2B3.length-2), line1PosY, 2*interval*lineWidth],
    "pos3": [0, line1PosY, 2*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0, "opacityML": 1, "opacityAxis": 1, "opacityLastAxis": 0, "opacityExtraML": 1, "opacityExtraLine": 0.5
  });
  clips.push({
    "target": "line1", "name": "start rotate",
    "lookAt": [-10800,-700,760] ,"pos": [-13530, -760, 760], "rot": [0,0,0], "zoom": 1,
    "lookAtGap":0, "railMove": [0,0],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY,2*interval*lineWidth],
    "pos2": [-xScale*(adjustedArr2.length+adjustedA2B3.length-2), line1PosY, 2*interval*lineWidth],
    "pos3": [0, line1PosY, 2*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 1, "opacityExtraLine": 0.5
  });
  clips.push({
    "target": "line1", "name": "graph move",
    "lookAt": [-10800,-700,760] ,"pos": [-13530, -760, 760], "rot": [0,0,0], "zoom": 1,
    "lookAtGap":0, "railMove": [0,0],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "go to line1",
    "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [0,0,0], "zoom": 1,
    "lookAtGap":1, "railMove": [0,1],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly1",
    "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [-60,0,0], "zoom": 1,
    "lookAtGap":1, "railMove": [2,0],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly2",
    "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [0,0,0], "zoom": 1,
    "lookAtGap":1, "railMove": [3,-4],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly3",
     "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [20,0,0], "zoom": 1,
    "lookAtGap":1, "railMove": [5,-3],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly4",
     "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [-60,0,0], "zoom": 1,
    "lookAtGap":1, "railMove": [6,-3],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly5",
     "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [-60,0,0], "zoom": 1,
    "lookAtGap":1, "railMove": [7.2,-8],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly6",
     "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [-30,0,0], "zoom": 1,
    "lookAtGap":1, "railMove": [8, -9.6],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly7",
    "lookAt": [-13450, -770, 50] ,"pos": [-13450, -770, 50], "rot": [0,-10,0], "zoom": 1,
    "lookAtGap":1, "railMove": [8.5, -11.6],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly8",
    "lookAt": [-13450, -770, 50] ,"pos": [-13450, -770, -300], "rot": [0,0,0], "zoom": 1,
    "lookAtGap":1, "railMove": [8,-5.6],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly9",
    "lookAt": [-13430, -770, 50] ,"pos": [-13350, -770, -2152000], "rot": [0,0,0], "zoom": 2000,
    "lookAtGap":1, "railMove": [8, -5.6],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly10",
    "lookAt": [-13450, -770, 50] ,"pos": [-13450, -770, -1152000], "rot": [0,0,0], "zoom": 1000,
    "lookAtGap":1, "railMove": [13, -8],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly11",
    "lookAt": [-13450, -770, 50] ,"pos": [-13450, -770, -85200], "rot": [0,0,0], "zoom": 100,
    "lookAtGap":1, "railMove": [13, -8],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly12",
    "lookAt": [-13450, -770, 50] ,"pos": [-13450, -770, -85200], "rot": [0,0,0], "zoom": 100,
    "lookAtGap":1, "railMove": [13, -8],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly13",
    "lookAt": [-13450, -770, 50] ,"pos": [-13450, -770, -85200], "rot": [0,0,0], "zoom": 100,
    "lookAtGap":1, "railMove": [13, -8],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly14",
    "lookAt": [-13450, -770, 120] ,"pos": [-13450, -770, -100], "rot": [0,0,0], "zoom": 1,
    "lookAtGap":1, "railMove": [13, -8],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly15",
    "lookAt": [-13450, -770, 120] ,"pos": [-13450, -770, 120], "rot": [30,-90,0], "zoom": 1,
    "lookAtGap":1, "railMove": [13, -8],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly16",
    "lookAt": [-13450, -770, 120] ,"pos": [-13450, -770, 120], "rot": [0,-150,0], "zoom": 1,
    "lookAtGap":1, "railMove": [15, -5],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly17",
    "lookAt": [-13450, -770, 220] ,"pos": [-13450, -770, 220], "rot": [0,-165,0], "zoom": 1,
    "lookAtGap":1, "railMove": [30, -2],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly18",
    "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [-20,-170,0], "zoom": 1,
    "lookAtGap":1, "railMove": [41, -1],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly19",
    "lookAt": [-9450, -770, 760] ,"pos": [-13450, -770, 760], "rot": [-20,-180,0], "zoom": 1,
    "lookAtGap":0, "railMove": [41.5, 1],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "end rotate",
    "lookAt": [-11500, -770, 760] ,"pos": [-11500, -770, 5000], "rot": [0,-360,0], "zoom": 1,
    "lookAtGap":0, "railMove": [0, 0],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "exit 3d",
    "lookAt": [-11500, -1500, 760] ,"pos": [-11500, -1500, 1900000], "rot": [0,-360,0], "zoom": 650,
    "lookAtGap":0, "railMove": [0,0],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "final",
    "lookAt": [-11500, -1500, 760] ,"pos": [-11500, -1500, 1900000], "rot": [0,-360,0], "zoom": 650,
    "lookAtGap":0, "railMove": [0,0],
    "color1": [100,100,240], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });


  return clips;
}

function getTransitions(){
  let transitions = [];
  let clips = getClips();
  transitions.push({
    "target": "line1",
    "from": {"frame": 1, "clip": "only axis"}, "to": {"frame": 2, "clip": "overall graph"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 2, "clip": "overall graph"}, "to": {"frame": 3, "clip": "enter 3d"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 3, "clip": "enter 3d"}, "to": {"frame": 4, "clip": "start rotate"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 4, "clip": "start rotate"}, "to": {"frame": 5, "clip": "graph move"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 5, "clip": "graph move"}, "to": {"frame": 6, "clip": "go to line1"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 6, "clip": "go to line1"}, "to": {"frame": 7, "clip": "fly1"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 7, "clip": "fly1"}, "to": {"frame": 8, "clip": "fly2"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 8, "clip": "fly2"}, "to": {"frame": 9, "clip": "fly3"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 9, "clip": "fly3"}, "to": {"frame": 10, "clip": "fly4"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 10, "clip": "fly4"}, "to": {"frame": 11, "clip": "fly5"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 11, "clip": "fly5"}, "to": {"frame": 12, "clip": "fly6"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 12, "clip": "fly6"}, "to": {"frame": 13, "clip": "fly7"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 13, "clip": "fly7"}, "to": {"frame": 14, "clip": "fly8"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 14, "clip": "fly8"}, "to": {"frame": 15, "clip": "fly9"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 15, "clip": "fly9"}, "to": {"frame": 16, "clip": "fly10"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 16, "clip": "fly10"}, "to": {"frame": 17, "clip": "fly11"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 17, "clip": "fly11"}, "to": {"frame": 18, "clip": "fly12"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 18, "clip": "fly12"}, "to": {"frame": 19, "clip": "fly13"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 19, "clip": "fly13"}, "to": {"frame": 20, "clip": "fly14"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 20, "clip": "fly14"}, "to": {"frame": 21, "clip": "fly15"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 21, "clip": "fly15"}, "to": {"frame": 22, "clip": "fly16"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 22, "clip": "fly16"}, "to": {"frame": 23, "clip": "fly17"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 23, "clip": "fly17"}, "to": {"frame": 24, "clip": "fly18"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 24, "clip": "fly18"}, "to": {"frame": 25, "clip": "fly19"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 25, "clip": "fly19"}, "to": {"frame": 26, "clip": "end rotate"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 26, "clip": "end rotate"}, "to": {"frame": 27, "clip": "exit 3d"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 27, "clip": "exit 3d"}, "to": {"frame": 28, "clip": "final"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });


  return transitions;
}

export { stoppers_DS2, clipPositions_DS2, getClips, getTransitions };
