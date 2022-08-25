import create from 'zustand';
import { Static, Animated, Immersive } from '../../BasicElements/Constants.js';

const useStore = create((set) => ({
  idx:0,
  target: 0,
  step: 0,
  steps: [0, 1],
  animation_main: [],
  animation_dist: [],
  animation_rl: [],

  setIdx: (val) => set((state) => {
    return {
      idx: Math.floor(state.idx + (state.target - state.idx)*0.07)
    }
  }),
  setStep: (val) => set((state) => {return {step: val}}),
  setSteps: (val) => set((state) => {return {steps: val}}),
  setTarget: (val) => set((state) => {return {target: val}}),
  setAnimation_Main: (val) => set((state) => {return {animation_main: val}}),
  setAnimation_Dist: (val) => set((state) => {return {animation_dist: val}}),
  setAnimation_Rl: (val) => set((state) => {return {animation_rl: val}}),
}));

export { useStore };
