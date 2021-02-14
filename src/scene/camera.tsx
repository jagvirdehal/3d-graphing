import { useRef, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CameraProps, extend, ReactThreeFiber, useFrame, useThree } from 'react-three-fiber';
import * as SETTINGS from './settings';

extend({ OrbitControls });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'orbitControls': ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
        }
    }
}

function Camera(props : CameraProps) {
    const {
        camera,
        gl: { domElement },
    } = useThree();

    const controls = useRef<OrbitControls>();
    useFrame((state) => {
        if (controls.current) {
            controls.current.update();
            controls.current.autoRotate = SETTINGS.CAMERA_AUTO_ROTATE;
        }
    });

    return (
        <orbitControls ref={controls} args={[camera, domElement]}/>
    )
}

export default Camera;
