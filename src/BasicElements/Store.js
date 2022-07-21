import create from 'zustand';
import { Lerp } from './BasicElements.js';
import { xyzProps, rectWidth, rectDepth, totalFrame } from './Constants.js';

export const idces = [0, 0, 3, 0];
export const visibleNum = [12, 6, 9, 12];
export const width = [rectWidth, rectDepth, rectDepth * xyzProps.dataA1.length / visibleNum[1], rectDepth * xyzProps.dataA1.length / visibleNum[2], rectDepth];
export const centerPos = [-xyzProps.xLength / 2,-xyzProps.yLength / 2,-xyzProps.zLength / 2];

const useStore = create((set) => ({
  idx:0,
  step: 0,
  steps: [0, 1],
  opacity: 1,
  progress: [0,0,0,0,0,0],
  currentIdx: 0,
  currentWidth: rectWidth,
  rectGroupPos: centerPos,

  setIdx: (val) => set((state) => {
    return {
      idx: val
    }
  }),
  setStep: (val) => set((state) => {
    return {
      step: val
    }
  }),
  setSteps: (val) => set((state) => {
    return {
      steps: val
    }
  }),
  setOpacity: (val) => set((state) => {
    return {
      opacity: val
    }
  }),
  setProgress: (val) => set((state) => {
    // console.log(state.progress, val);
    return {
      progress: val,
      currentIdx: Lerp(Lerp(Lerp(idces[0],idces[1],state.progress[3]),idces[2],state.progress[4]),idces[3],state.progress[5]),
      currentWidth: Lerp(Lerp(Lerp(Lerp(width[0],width[1],state.progress[1]),width[2],state.progress[3]),width[3],state.progress[4]),width[4],state.progress[5]),
      rectGroupPos: [centerPos[0] - 0.5 * (xyzProps.zLength - xyzProps.xLength) * state.progress[1], centerPos[1], centerPos[2]]
    }
  }),
}));

export { useStore };
