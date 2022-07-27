import create from 'zustand';
import { Lerp } from '../../BasicElements/BasicElements.js';
import { xyzProps, centerPos, totalFrame } from './Constants_DS2.js';

export const idces = [0, 0, 3, 0];
export const visibleNum = [12, 6, 9, 12];
// export const width = [rectWidth, rectDepth, rectDepth * xyzProps.dataA1.length / visibleNum[1], rectDepth * xyzProps.dataA1.length / visibleNum[2], rectDepth];


const useStore = create((set) => ({
  idx:0,
  step: 0,
  steps: [0, 1],
  waterLevel: 1,
  animation_main: [],
  animation_dist: [],

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
  setWaterLevel: (val) => set((state) => {
    return {
      waterLevel: val
    }
  }),
  setAnimation_Main: (val) => set((state) => {
    return {
      animation_main: val
    }
  }),
  setAnimation_Dist: (val) => set((state) => {
    return {
      animation_dist: val
    }
  }),
}));

export { useStore };
