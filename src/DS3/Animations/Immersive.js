const stoppers_DS2 = [0.01, 0.03, 0.01, 0.03, 0.01, 0.01];
const clipPositions_DS2 = [0.00, 0.16, 0.33, 0.50, 0.80, 1.00];

function getClips(){
  let clips = [];
  clips.push({
    "target": "group1", "name": "group1_init",
    "pos": [0, 0, 0], "rot": [0, 0, 0], "waterLevel": 0.5,
  });
  clips.push({
    "target": "group1", "name": "ground_topCorner1",
    "pos": [-10, 0, 0], "rot": [18 * Math.PI/180, -32 * Math.PI/180, 0], "waterLevel": 0.5,
  });
  clips.push({
    "target": "group1", "name": "ground_topCorner2",
    "pos": [10, -10, 0], "rot": [10 * Math.PI/180, -22 * Math.PI/180, 0], "waterLevel": 0.48,
  });
  clips.push({
    "target": "group1", "name": "group1_end1",
    "pos": [10, -10, 0], "rot": [10 * Math.PI/180, -22 * Math.PI/180, 0], "waterLevel": 0.74,
  });
  clips.push({
    "target": "group1", "name": "group1_end2",
    "pos": [0, 0, 0], "rot": [0, 0, 0], "waterLevel": 0.74,
  });

  clips.push({
    "target": "camera", "name": "cam_zoomOut",
    "pos": [0, 0, 6250], "rot": [0, 0, 0], "zoom": 6.25,
  });
  clips.push({
    "target": "camera", "name": "cam_init",
    "pos": [0, 0, 6250], "rot": [0, 0, 0], "zoom": 6.25,
  });
  clips.push({
    "target": "camera", "name": "cam_zoomIn1",
    "pos": [0, 0, 6250], "rot": [0, 0, 0], "zoom": 9.25,
  });
  clips.push({
    "target": "camera", "name": "cam_zoomIn2",
    "pos": [0, 0, 6250], "rot": [0, 0, 0], "zoom": 10.25,
  });
  return clips;
}

function getTransitions(){
  let transitions = [];
  transitions.push({
    "target": "group1",
    "from": {"frame": 1, "clip": "group1_init"}, "to": {"frame": 2, "clip": "ground_topCorner1"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 2, "clip": "ground_topCorner1"}, "to": {"frame": 3, "clip": "ground_topCorner2"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 3, "clip": "ground_topCorner2"}, "to": {"frame": 4, "clip": "group1_end1"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 4, "clip": "group1_end1"}, "to": {"frame": 5, "clip": "group1_end2"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });

  transitions.push({
    "target": "camera",
    "from": {"frame": 0, "clip": "cam_zoomOut"}, "to": {"frame": 1, "clip": "cam_init"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 2, "clip": "cam_init"}, "to": {"frame": 3, "clip": "cam_zoomIn1"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 3, "clip": "cam_zoomIn1"}, "to": {"frame": 4, "clip": "cam_zoomIn1"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 4, "clip": "cam_zoomIn1"}, "to": {"frame": 5, "clip": "cam_zoomOut"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });

  return transitions;
}

export { stoppers_DS2, clipPositions_DS2, getClips, getTransitions };
