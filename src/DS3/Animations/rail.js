import {adjustedArr1, adjustedArr2, adjustedArr3, arr1, arr2, arr3, adjustedB1, adjustedA1B2, adjustedA2B3} from '../Components/snpData.js';
const xScale = 30;
const yScale = 20;
const lineWidth = 80;
const interval = 3;
const camIntervalX = 1350;
const camIntervalY = 1880;
const xSpace = 1;

const stoppers_DS2 =      [0.00, 0.01, 0.00, 0.00, 0.01, 0.01, 0.01, 0.01, 0.01, 0.00, 0.00, 0.01, 0.00, 0.00];
const clipPositions_DS2 = [0.00, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.45, 0.55, 0.65, 0.69, 0.85, 0.90, 1.00];
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
    "lookAt": [-6100,10000,3999900] ,"pos": [-6100, 10000, 4900000], "rot": [0,0,0], "zoom": 600,
    "lookAtGap":0, "railMove": [0,0],
    "color1": [0,100,0], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY,2*interval*lineWidth],
    "pos2": [-xScale*(adjustedArr2.length+adjustedA2B3.length-2), line1PosY, 2*interval*lineWidth],
    "pos3": [0, line1PosY, 2*interval*lineWidth],
    "opacityLine": 1, "opacityGrid": 0, "opacityML": 0, "opacityAxis": 1, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 1, "opacityExtraLine": 1
  });
  clips.push({
    "target": "line1", "name": "overall graph",
    "lookAt": [-6100,-2500,3999900] ,"pos": [-6100, -2500, 4900000], "rot": [0,0,0], "zoom": 600,
    "lookAtGap":0, "railMove": [0,0],
    "color1": [100,100,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY,2*interval*lineWidth],
    "pos2": [-xScale*(adjustedArr2.length+adjustedA2B3.length-2), line1PosY, 2*interval*lineWidth],
    "pos3": [0, line1PosY, 2*interval*lineWidth],
    "opacityLine": 1, "opacityGrid": 0, "opacityML": 1, "opacityAxis": 1, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 1, "opacityExtraLine": 1
  });
  clips.push({
    "target": "line1", "name": "enter 3d",
    "lookAt": [-10800,-700,760] ,"pos": [-10800, -700, 5000], "rot": [0,0,0], "zoom": 1,
    "lookAtGap":0, "railMove": [0,0],
    "color1": [100,100,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY,2*interval*lineWidth],
    "pos2": [-xScale*(adjustedArr2.length+adjustedA2B3.length-2), line1PosY, 2*interval*lineWidth],
    "pos3": [0, line1PosY, 2*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0, "opacityML": 1, "opacityAxis": 0.9, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 1, "opacityExtraLine": 0.5
  });
  clips.push({
    "target": "line1", "name": "start rotate",
    "lookAt": [-10800,-700,760] ,"pos": [-13530, -760, 760], "rot": [-20,0,0], "zoom": 1,
    "lookAtGap":0, "railMove": [0,2],
    "color1": [110,110,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY,2*interval*lineWidth],
    "pos2": [-xScale*(adjustedArr2.length+adjustedA2B3.length-2), line1PosY, 2*interval*lineWidth],
    "pos3": [0, line1PosY, 2*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 1, "opacityExtraLine": 0.5
  });
  clips.push({
    "target": "line1", "name": "line2 move",
    "lookAt": [-10800,-700,760] ,"pos": [-13530, -760, 760], "rot": [-20,0,0], "zoom": 1,
    "lookAtGap":0, "railMove": [0,2],
    "color1": [110,110,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [0, line1PosY, 2*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 1, "opacityExtraLine": 0.5
  });
  clips.push({
    "target": "line1", "name": "line3 move",
    "lookAt": [-10800,-700,760] ,"pos": [-13530, -760, 760], "rot": [-20,0,0], "zoom": 1,
    "lookAtGap":0, "railMove": [0,2],
    "color1": [110,110,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "go to line1",
    "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [0,0,0], "zoom": 1,
    "lookAtGap":1, "railMove": [0,1],
    "color1": [100,100,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "go to min",
    "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [-60,0,0], "zoom": 1,
    "lookAtGap":1, "railMove": [8.3,-10.9],
    "color1": [100,100,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "compare min",
    "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [85,-50,0], "zoom": 1,
    "lookAtGap":1, "railMove": [8.5,-12],
    "color1": [100,100,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "turn 1",
     "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [20,-30,0], "zoom": 1,
    "lookAtGap":1, "railMove": [6,-6],
    "color1": [100,100,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "turn 2",
     "lookAt": [-13450, -770, 220] ,"pos": [-13450, -770, 220], "rot": [0,-130,0], "zoom": 1,
    "lookAtGap":1, "railMove": [7,-5],
    "color1": [100,100,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "go to line1 end",
    "lookAt": [-13450, -770, 520] ,"pos": [-13450, -770, 520], "rot": [-20,-179,0], "zoom": 1,
    "lookAtGap":1, "railMove": [41.5, 1],
    "color1": [100,100,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "end rotate",
    "lookAt": [-13450, -770, 6620] ,"pos": [-13450, -770, 6620], "rot": [0,-270,0], "zoom": 2,
    "lookAtGap":1, "railMove": [21.5, 1],
    "color1": [100,100,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0, 
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "exit 3d",
    "lookAt": [-13450, -770, 4999900] ,"pos": [-13450, -770, 4999900], "rot": [0,-270,0], "zoom": 2000,
    "lookAtGap":1, "railMove": [21.5, -10],
    "color1": [100,100,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 1, "opacityGrid": 0.0, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 1, 
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "fly10",
    "lookAt": [-13450, -770, 4999900] ,"pos": [-13450, -770, 4999900], "rot": [0,-270,0], "zoom": 2000,
    "lookAtGap":1, "railMove": [21.5, -10],
    "color1": [100,100,255], "color2": [100,250,50], "color3": [250,10,102],
    "pos1": [line1PosX, line1PosY, 2*interval*lineWidth],
    "pos2": [line1PosX, line1PosY-gap2to1, 3*interval*lineWidth],
    "pos3": [line1PosX, line1PosY-gap3to1, 4*interval*lineWidth],
    "opacityLine": 0.5, "opacityGrid": 0.0, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 1, 
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });



  return clips;
}

function getTransitions(){
  let transitions = [];
  let clips = getClips();
  transitions.push({
    "target": "line1",
    "from": {"frame": 0, "clip": "only axis"}, "to": {"frame": 1, "clip": "overall graph"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 1, "clip": "overall graph"}, "to": {"frame": 2, "clip": "enter 3d"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 2, "clip": "enter 3d"}, "to": {"frame": 3, "clip": "start rotate"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 3, "clip": "start rotate"}, "to": {"frame": 4, "clip": "line2 move"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 4, "clip": "line2 move"}, "to": {"frame": 5, "clip": "line3 move"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 5, "clip": "line3 move"}, "to": {"frame": 6, "clip": "go to line1"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 6, "clip": "go to line1"}, "to": {"frame": 7, "clip": "go to min"},
    "easing": "bezier",
    "motion": [
      { "type": "sin", "attribute": "pos", "args": {"axis": 1, "height": 700} },
      { "type": "sin", "attribute": "lookAt", "args": {"axis": 1, "height": 700} }
    ]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 7, "clip": "go to min"}, "to": {"frame": 8, "clip": "compare min"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 8, "clip": "compare min"}, "to": {"frame": 9, "clip": "turn 1"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 9, "clip": "turn 1"}, "to": {"frame": 10, "clip": "turn 2"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 10, "clip": "turn 2"}, "to": {"frame": 11, "clip": "go to line1 end"},
    "easing": "bezier",
    "motion": [
      { "type": "-sin", "attribute": "pos", "args": {"axis": 1, "height": 500} },
      { "type": "-sin", "attribute": "lookAt", "args": {"axis": 1, "height": 500} }
    ]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 11, "clip": "go to line1 end"}, "to": {"frame": 12, "clip": "end rotate"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });  transitions.push({
    "target": "line1",
    "from": {"frame": 12, "clip": "end rotate"}, "to": {"frame": 13, "clip": "exit 3d"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });


  return transitions;
}

export { stoppers_DS2, clipPositions_DS2, getClips, getTransitions };
