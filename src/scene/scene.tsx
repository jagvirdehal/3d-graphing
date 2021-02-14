import { Canvas } from 'react-three-fiber';
import Vector from './vector';
import Camera from './camera';
import VectorGroup from './vector-group';

function Scene() {
    return(
        <div className="scene">
            <Canvas>
                <group rotation={[0, 0, 0]}>
                    <axesHelper rotation={[-Math.PI / 2, 0, -Math.PI / 2]}/>
                    <gridHelper />
                    <Vector target={[3, 0, 0]} name="v1" />
                    <VectorGroup />
                </group>
                <ambientLight />
                <pointLight position={[10, 10, 10]}/>
                <Camera />
            </Canvas>
        </div>
    )
}

export default Scene;
