import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js';

////////////////////////////
// SCENE
////////////////////////////

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050816);

////////////////////////////
// CAMERA
////////////////////////////

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(7, 5, 10);

////////////////////////////
// RENDERER
////////////////////////////

const canvas = document.getElementById('bg');

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias:false,
    powerPreference:"low-power"
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

////////////////////////////
// CONTROLS
////////////////////////////

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

controls.rotateSpeed = 0.8;

controls.enablePan = false;

////////////////////////////
// LIGHTS
////////////////////////////

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.8
);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    1.2
);

directionalLight.position.set(10,10,10);

scene.add(directionalLight);

////////////////////////////
// GROUND
////////////////////////////

const groundGeometry = new THREE.PlaneGeometry(
    60,
    60
);

const groundMaterial = new THREE.MeshStandardMaterial({
    color:0x111111
});

const ground = new THREE.Mesh(
    groundGeometry,
    groundMaterial
);

ground.rotation.x = -Math.PI / 2;

ground.position.y = -2;

scene.add(ground);

////////////////////////////
// TELESCOPE GROUP
////////////////////////////

const telescopeGroup = new THREE.Group();

scene.add(telescopeGroup);

////////////////////////////
// TUBE
////////////////////////////

const tubeGeometry = new THREE.CylinderGeometry(
    0.8,
    0.8,
    7,
    48
);

const tubeMaterial = new THREE.MeshStandardMaterial({
    color:0x222222,
    metalness:0.4,
    roughness:0.5
});

const tube = new THREE.Mesh(
    tubeGeometry,
    tubeMaterial
);

tube.rotation.z = Math.PI / 2.8;

tube.position.y = 1.8;

telescopeGroup.add(tube);

////////////////////////////
// PRIMARY MIRROR
////////////////////////////

const mirrorGeometry = new THREE.CircleGeometry(
    0.72,
    48
);

const mirrorMaterial = new THREE.MeshStandardMaterial({
    color:0x88ccff,
    emissive:0x113355,
    metalness:1,
    roughness:0.1
});

const primaryMirror = new THREE.Mesh(
    mirrorGeometry,
    mirrorMaterial
);

primaryMirror.rotation.y = Math.PI / 2;

primaryMirror.position.set(-2.8,0.7,0);

telescopeGroup.add(primaryMirror);

////////////////////////////
// SECONDARY MIRROR
////////////////////////////

const secondaryGeometry = new THREE.BoxGeometry(
    0.25,
    0.25,
    0.05
);

const secondaryMaterial = new THREE.MeshStandardMaterial({
    color:0xcccccc
});

const secondaryMirror = new THREE.Mesh(
    secondaryGeometry,
    secondaryMaterial
);

secondaryMirror.position.set(2.1,2.8,0);

secondaryMirror.rotation.z = Math.PI / 4;

telescopeGroup.add(secondaryMirror);

////////////////////////////
// EYEPIECE
////////////////////////////

const eyepieceGeometry = new THREE.CylinderGeometry(
    0.12,
    0.12,
    0.8,
    24
);

const eyepieceMaterial = new THREE.MeshStandardMaterial({
    color:0xb8860b
});

const eyepiece = new THREE.Mesh(
    eyepieceGeometry,
    eyepieceMaterial
);

eyepiece.rotation.z = Math.PI / 2;

eyepiece.position.set(2.5,2.9,0);

telescopeGroup.add(eyepiece);

////////////////////////////
// ROCKER BOX
////////////////////////////

const woodMaterial = new THREE.MeshStandardMaterial({
    color:0x6b3e1e
});

const sideGeometry = new THREE.BoxGeometry(
    0.3,
    2.5,
    3
);

const leftSide = new THREE.Mesh(
    sideGeometry,
    woodMaterial
);

leftSide.position.set(-0.8,-0.5,-1.3);

telescopeGroup.add(leftSide);

const rightSide = new THREE.Mesh(
    sideGeometry,
    woodMaterial
);

rightSide.position.set(-0.8,-0.5,1.3);

telescopeGroup.add(rightSide);

const bottomGeometry = new THREE.BoxGeometry(
    3,
    0.3,
    3
);

const bottomBase = new THREE.Mesh(
    bottomGeometry,
    woodMaterial
);

bottomBase.position.set(-0.8,-1.7,0);

telescopeGroup.add(bottomBase);

////////////////////////////
// STARS
////////////////////////////

const starGeometry = new THREE.BufferGeometry();

const starVertices = [];

for(let i = 0; i < 2500; i++){

    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    const z = (Math.random() - 0.5) * 200;

    starVertices.push(x,y,z);
}

starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
        starVertices,
        3
    )
);

const starMaterial = new THREE.PointsMaterial({
    color:0xffffff,
    size:0.15
});

const stars = new THREE.Points(
    starGeometry,
    starMaterial
);

scene.add(stars);

////////////////////////////
// ANIMATION
////////////////////////////

function animate(){

    requestAnimationFrame(animate);

    telescopeGroup.rotation.y += 0.002;

    controls.update();

    renderer.render(scene, camera);
}

animate();

////////////////////////////
// RESIZE
////////////////////////////

window.addEventListener('resize', () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
