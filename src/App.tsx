import React, {
 Suspense, useMemo, useRef, useState,
} from 'react';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  FaceTracker,
  HeadMaskMesh,
  ZapparCamera,
  ZapparCanvas,
  Loader,
  Pipeline,
  Types
} from '@zappar/zappar-react-three-fiber';
import helmetSrc from './assets/z_helmet.glb';

function Model() {
  const [gltf, set] = useState<GLTF>();
  useMemo(() => new GLTFLoader().load(helmetSrc, set), []);

  if (gltf) {
    const { scene } = gltf;
    const Helmet = scene.getObjectByName('Helmet');
    return <primitive position={[0.25, -1.25, 0.1]} object={Helmet} />;
  }
  return null;
}

function App() {
  const faceTrackerGroup = useRef<Types.FaceAnchorGroup>();
  const pipeline = new Pipeline();
  return (
    <ZapparCanvas>
      <ZapparCamera pipeline={pipeline} userFacing rearCameraMirrorMode="css" />
      <FaceTracker ref={faceTrackerGroup} pipeline={pipeline}>
        <Suspense fallback={null}>
          <HeadMaskMesh trackerGroup={faceTrackerGroup} />
          <Model />
        </Suspense>
      </FaceTracker>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      <Loader />
    </ZapparCanvas>
  );
}

export default App;
