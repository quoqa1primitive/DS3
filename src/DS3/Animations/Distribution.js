const stoppers_Dist2 = [0.01, 0.00, 0.00, 0.00, 0.00, 0.01];
const clipPositions_Dist2 = [0.00, 0.50, 0.58, 0.65, 0.72, 0.80, 1.00];

function getClips(){
  let clips = [];
  clips.push({
    "target": "dist", "name": "group1_0",
    "dist": [10, 12, 15, 18, 42, 35, 31, 19, 11, 5]
  });
  clips.push({
    "target": "dist", "name": "ground_1",
    "dist": [10, 12, 14, 19, 41, 35, 30, 20, 12, 6]
  });
  clips.push({
    "target": "dist", "name": "ground_2",
    "dist": [10, 13, 15, 18, 42, 34, 32, 18, 12, 6]
  });
  clips.push({
    "target": "dist", "name": "group1_3",
    "dist": [11, 14, 16, 20, 44, 36, 34, 19, 13, 7]
  });
  clips.push({
    "target": "dist", "name": "group1_4",
    "dist": [11, 15, 18, 21, 43, 34, 33, 18, 12, 6]
  });
  return clips;
}

function getTransitions(){
  let transitions = [];
  transitions.push({
    "target": "dist",
    "from": {"frame": 1, "clip": "group1_0"}, "to": {"frame": 2, "clip": "ground_1"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "dist",
    "from": {"frame": 2, "clip": "ground_1"}, "to": {"frame": 3, "clip": "ground_2"},
    "easing": "linear",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "dist",
    "from": {"frame": 3, "clip": "ground_2"}, "to": {"frame": 4, "clip": "group1_3"},
    "easing": "linear",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "dist",
    "from": {"frame": 3, "clip": "group1_3"}, "to": {"frame": 4, "clip": "group1_4"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });


  return transitions;
}

export { stoppers_Dist2, clipPositions_Dist2, getClips, getTransitions };
