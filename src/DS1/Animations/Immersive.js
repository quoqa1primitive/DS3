const stoppers_DS1 = [0.01, 0.04, 0.04, 0.04, 0.02, 0.02, 0.01];
const clipPositions_DS1 = [0.00, 0.11, 0.32, 0.52, 0.68, 0.83, 1.00];

function getClips(){
  let clips = [];
  clips.push({
    "target": "group1", "name": "group1_init",
    "pos": [0, 0, 0], "rot": [0, 0, 0], "opacity": 1,
  });
  clips.push({
    "target": "group1", "name": "group1_XY",
    "pos": [0, 0, 0], "rot": [0, Math.PI/2, 0], "opacity": 1,
  });
  clips.push({
    "target": "group1", "name": "group1_ZY",
    "pos": [0, 0, 0], "rot": [0, Math.PI/2, Math.PI/2], "opacity": 1,
  });
  clips.push({
    "target": "group1", "name": "group1_zoom1",
    "pos": [-5, 10, 5], "rot": [0, Math.PI/2 + -40 * Math.PI/2 / 90, Math.PI/2], "opacity": 0.2,
  });
  clips.push({
    "target": "group1", "name": "group1_zoom2",
    "pos": [15, 10, 20], "rot": [0, Math.PI/2 + +40 * Math.PI/2 / 90, Math.PI/2], "opacity": 1,
  });
  clips.push({
    "target": "group1", "name": "group1_last",
    "pos": [0, 0, 0], "rot": [0, Math.PI/2, Math.PI/2], "opacity": 0.2,
  });

  clips.push({
    "target": "camera", "name": "cam_init",
    "pos": [0, 0, 6250], "zoom": 6.25,
  });
  clips.push({
    "target": "camera", "name": "cam_zoom1",
    "pos": [0, 500, 6250], "zoom": 15,
  });
  clips.push({
    "target": "camera", "name": "cam_zoom2",
    "pos": [0, 800, 6250], "zoom": 14,
  });
  return clips;
}

function getTransitions(){
  let transitions = [];
  transitions.push({
    "target": "group1",
    "from": {"frame": 1, "clip": "group1_init"}, "to": {"frame": 2, "clip": "group1_XY"},
    "easing": "bezier",
    "motion": {
      "type": "linear", // sin, linear, ...
      "args": {
        // if sin, there must exist height
      }
    }
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 2, "clip": "group1_XY"}, "to": {"frame": 3, "clip": "group1_ZY"},
    "easing": "bezier",
    "motion": {
      "type": "linear", // sin, linear, ...
      "args": {
        // if sin, there must exist height
      }
    }
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 3, "clip": "group1_ZY"}, "to": {"frame": 4, "clip": "group1_zoom1"},
    "easing": "bezier",
    "motion": {
      "type": "linear", // sin, linear, ...
      "args": {
        // if sin, there must exist height
      }
    }
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 4, "clip": "group1_zoom1"}, "to": {"frame": 5, "clip": "group1_zoom2"},
    "easing": "bezier",
    "motion": {
      "type": "linear", // sin, linear, ...
      "args": {
        // if sin, there must exist height
      }
    }
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 5, "clip": "group1_zoom2"},
    "to": {"frame": 6, "clip": "group1_last"},
    "easing": "bezier",
    "motion": {
      "type": "linear", // sin, linear, ...
      "args": {
        // if sin, there must exist height
      }
    }
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 1, "clip": "cam_init"}, "to": {"frame": 2, "clip": "cam_init"},
    "easing": "bezier",
    "motion": {
      "attribute": "pos",
      "type": "sin", // sin, linear, ...
      "args": {
        "axis": 1, // 0=x, 1=y, 2=z, pos should have axis
        "height": 1000 // sin should have height
      }
    }
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 2, "clip": "cam_init"}, "to": {"frame": 3, "clip": "cam_init"},
    "easing": "bezier",
    "motion": {
      "attribute": "pos",
      "type": "sin", // sin, linear, ...
      "args": {
        "axis": 0, // 0=x, 1=y, 2=z, pos should have axis
        "height": -1000 // sin should have height
      }
    }
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 3, "clip": "cam_init"}, "to": {"frame": 4, "clip": "cam_zoom1"},
    "easing": "bezier",
    "motion": {
      "attribute": "pos",
      "type": "sin", // sin, linear, ...
      "args": {
        "axis": 2, // 0=x, 1=y, 2=z, pos should have axis
        "height": 1000 // sin should have height
      }
    }
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 4, "clip": "cam_zoom1"}, "to": {"frame": 5, "clip": "cam_zoom2"},
    "easing": "bezier",
    "motion": {
      "type": "linear", // sin, linear, ...
      "args": {
        // if sin, there must exist height
      }
    }
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 5, "clip": "cam_zoom2"}, "to": {"frame": 6, "clip": "cam_init"},
    "easing": "bezier",
    "motion": {
      "type": "linear", // sin, linear, ...
      "args": {
        // if sin, there must exist height
      }
    }
  });
  return transitions;
}

export { stoppers_DS1, clipPositions_DS1, getClips, getTransitions };
