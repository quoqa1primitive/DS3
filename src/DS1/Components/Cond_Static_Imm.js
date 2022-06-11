import * as THREE from 'three'
import React, { useRef, useEffect, useLayoutEffect, useState, useImperativeHandle, useMemo, Suspense } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, shaderMaterial, useCursor } from '@react-three/drei';
import { TextComponent, Line, TextBox, Rect } from '../../BasicElements/BasicElements.js'
import { title, text1, text2, text3, text4, text5, XAXIS1, YAXIS1, YAXIS2, ZAXIS1 } from '../../BasicElements/Constants.js';
import '../styles/Cond_Static_Imm.css';

function CanvasSI() {
  return (
    <></>
  )
}

export { CanvasSI};
