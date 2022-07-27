const stoppers_DS1 = [0.00, 0.00];
const clipPositions_DS1 = [0.00, 1.00];

function getClips(){
  let clips = [];
  clips.push({
    "target": "group1", "name": "group1_init",
    "pos": [0, 0, 0]
  });
  clips.push({
    "target": "group1", "name": "group1_last",
    "pos": [0, 1000, 0]
  });
  return clips;
}

function getTransitions(){
  let transitions = [];
  transitions.push({
    "target": "group1",
    "from": {"frame": 0, "clip": "group1_init"}, "to": {"frame": 1, "clip": "group1_last"},
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
