import React, { useRef, useLayoutEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

const MiniMap = (props) => {
  // This reference will give us direct access to the mesh
  const miniMapCameraRef = useRef();
  const { gl, size } = useThree();

  const frustumSize = 500;
  // const aspect = window.innerWidth / window.innerHeight;
  const aspect = size.width / size.height;
  const ratio = 1.0;

  const miniMapLocationLeftPixels = 0;
  const miniMapLocationBottomPixels = 0;

  useLayoutEffect(() => {
    console.log(size);
  }, []);

  useFrame(({ gl, scene, camera }) => {
    // console.log(camera);
    gl.autoClear = true;
    gl.setViewport(0, 0, size.width, size.height);
    gl.setScissor(0, 0, size.width, size.height);
    gl.setScissorTest(true);
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();

    // render minicamera
    gl.setViewport(
      miniMapLocationLeftPixels,
      miniMapLocationBottomPixels,
      size.width * ratio,
      size.height * ratio
    );
    gl.setScissor(
      miniMapLocationLeftPixels,
      miniMapLocationBottomPixels,
      size.width * ratio,
      size.height * ratio
    );
    gl.setScissorTest(true);
    miniMapCameraRef.current.zoom = 6.25;
    miniMapCameraRef.current.position.x = camera.position.x;
    miniMapCameraRef.current.position.y = camera.position.y;
    miniMapCameraRef.current.position.z = camera.position.z;
    miniMapCameraRef.current.rotation.x = camera.rotation.x;
    miniMapCameraRef.current.rotation.y = camera.rotation.y;
    miniMapCameraRef.current.rotation.z = camera.rotation.z;
    miniMapCameraRef.current.rotateOnAxis(camera.up, Math.PI);
    miniMapCameraRef.current.aspect = aspect;
    miniMapCameraRef.current.updateMatrixWorld();
    miniMapCameraRef.current.updateProjectionMatrix();
    gl.render(scene, miniMapCameraRef.current);

    // console.log("%o", camera);
    // console.log("%o", miniMapCameraRef.current);
  }, 1);

  return (
    <>
      <OrthographicCamera
        ref={miniMapCameraRef}
        makeDefault={false}
        position={[0, 0, 1000]}
        near={10000}
        far={50000}
        zoom={5}
      />
    </>
  );
};

export { MiniMap };
