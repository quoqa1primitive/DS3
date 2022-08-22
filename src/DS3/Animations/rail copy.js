const stoppers_DS2 =      [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.02, 0.00, 0.00, 0.00, 0.02, 0.00, 0.00, 0.00];
const clipPositions_DS2 = [0.00, 0.06, 0.12, 0.18, 0.24, 0.30, 0.36, 0.44, 0.48, 0.54, 0.60, 0.66, 0.72, 1.00];
// frame                      0,    1,    2,    3,    4,    5,    6,    7,    8,    9,   10,   11,   12,   13,  14

function getClips(){
  let clips = [];
  clips.push({
    "target": "line1", "name": "line1_init",
    "pos": [-50, 700, 40], "rot": [50,0,0], "lookat": [50, 600 - 350, 40], 
    "color": [200, 30, 100]
  });
  clips.push({
    "target": "line1", "name": "p1",
    "pos": [250, 150, 40], "rot": [20,0,0], "lookat": [440, 100 + 40, 40], 
    "color": [0, 0, 0]
  });
  clips.push({
    "target": "line1", "name": "p2",
    "pos": [410, 250, 40], "rot": [90,0,0], "lookat": [480, 150 + 100, 40], 
    "color": [100, 100, 200]
  });
  clips.push({
    "target": "line1", "name": "p3",
    "pos": [440, 220, 40], "rot": [30,0,0], "lookat": [540, 200 + 0, 40], 
    "color": [100, 100, 200]
  });
  clips.push({
    "target": "line1", "name": "p4",
    "pos": [850, -400, 40], "rot": [0,0,0], "lookat": [850, -200 - 100, 40], 
    "color": [100, 100, 200]
  });
  clips.push({
    "target": "line1", "name": "p5",
    "pos": [850, -400, 40], "rot": [90,0,0], "lookat": [750, -200, 1000], 
    "color": [100, 100, 200]
  });
  clips.push({
    "target": "line1", "name": "p6",
    "pos": [850, -400, -740], "rot": [90,0,-100], "lookat": [1580, -400, 40], 
    "color": [100, 100, 200]
  });  
  clips.push({
    "target": "line1", "name": "p7",
    "pos": [850, -400, 40], "rot": [90,0,0], "lookat": [1200, -250 - 10, 40], 
    "color": [100, 100, 200]
  });  
  clips.push({
    "target": "line1", "name": "p8",
    "pos": [1100, -200, 40], "rot": [60,0,0], "lookat": [1400, -200-10, 40], 
    "color": [100, 100, 200]
  });  
  clips.push({
    "target": "line1", "name": "p9",
    "pos": [1500, -0, 40], "rot": [90,0,0], "lookat":[1700, -50, 200], 
    "color": [100, 100, 200]
  });
  clips.push({
    "target": "line1", "name": "p10",
    "pos": [1500, -0, -740], "rot": [90,0,-100], "lookat": [1700, -50, 200], 
    "color": [100, 100, 200]
  });
  clips.push({
    "target": "line1", "name": "p11",
    "pos": [1900, 0, -240], "rot": [90,0,-150], "lookat": [1700, -50, 200], 
    "color": [100, 100, 200]
  });
  clips.push({
    "target": "line1", "name": "p12",
    "pos": [5300, 550, -40], "rot": [90,0,-180], "lookat": [1700, -50, 200], 
    "color": [100, 100, 200]
  });



  clips.push({
    "target": "line2", "name": "p1",
    "pos": [-50, 700, 160+40], "rot": [50,0,0], "lookat": [1700, -50, 200],
  });
  clips.push({
    "target": "line2", "name": "p2",
    "pos": [-50, 700, 160+40], "rot": [20,0,0], "lookat": [1700, -50, 200],
  });
  clips.push({
    "target": "line2", "name": "p1",
    "pos": [-50, 700, 40], "rot": [0,0,0], "lookat": [1700, -50, 200],
  });
  return clips;
}

function getTransitions(){
  let transitions = [];
  let clips = getClips();
  transitions.push({
    "target": "line1",
    "from": {"frame": 1, "clip": "line1_init"}, "to": {"frame": 2, "clip": "p1"},
    "easing": "bezier",
    "motion": { "type": "sin", "attribute":"pos", 
      "args": {
        axis:1, 
        height: 0.2 * (clips[0]["pos"][1] - clips[1]["pos"][1])
      }
    }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 2, "clip": "p1"}, "to": {"frame": 3, "clip": "p2"},
    "easing": "bezier",
    "motion": { "type": "-sin", "attribute":"pos", 
      "args": {
        axis:1, 
        height: 0.2 * (clips[0]["pos"][1] - clips[1]["pos"][1])
      }
    }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 3, "clip": "p2"}, "to": {"frame": 4, "clip": "p3"},
    "easing": "bezier",
    "motion": { "type": "sin", "attribute":"pos", 
      "args": {
        axis:1, 
        height: 0.2 * (clips[0]["pos"][1] - clips[1]["pos"][1])
      }
    }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 4, "clip": "p3"}, "to": {"frame": 5, "clip": "p4"},
    "easing": "bezier",
    "motion": { "type": "sin", "attribute":"pos", 
      "args": {
        axis:1, 
        height: 0.2 * (clips[0]["pos"][1] - clips[1]["pos"][1])
      }
    }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 5, "clip": "p4"}, "to": {"frame": 6, "clip": "p5"},
    "easing": "bezier",
    "motion": { "type": "-sin", "attribute":"pos", 
      "args": {
        axis:1, 
        height: 0.2 * (clips[0]["pos"][1] - clips[1]["pos"][1])
      }
    }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 6, "clip": "p5"}, "to": {"frame": 7, "clip": "p6"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 7, "clip": "p6"}, "to": {"frame": 8, "clip": "p7"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 8, "clip": "p7"}, "to": {"frame": 9, "clip": "p8"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 9, "clip": "p8"}, "to": {"frame": 10, "clip": "p9"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 10, "clip": "p9"}, "to": {"frame": 11, "clip": "p10"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 11, "clip": "p10"}, "to": {"frame": 12, "clip": "p11"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 12, "clip": "p11"}, "to": {"frame": 13, "clip": "p12"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });

  return transitions;
}

export { stoppers_DS2, clipPositions_DS2, getClips, getTransitions };
