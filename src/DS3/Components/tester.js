import {adjustedArr} from './snpData.js';
import ReactDOM from 'react-dom'
import { Canvas } from '@react-three/fiber'

const points = [];
for (const element in adjustedArr) {
  points.push( new THREE.Vector3(0, interval, element) );
  interval = interval +10;
} 
// const lineChart = new THREE.BufferGeometry().setFromPoints(points);

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh geometry={lineChart}>
          <lineBasicMaterial/> 
        </mesh>
        
      </Canvas>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))