import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/controls/OrbitControls.js';

//////////////////////
// SCENE
//////////////////////

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050816);

//////////////////////
// CAMERA
//////////////////////

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

camera.position.set(6,5,10);

//////////////////////
// RENDERER
//////////////////////

const renderer = new THREE.WebGLRenderer({
    antialias:true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(renderer.domElement);

//////////////////////
// CONTROLS
//////////////////////

const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

//////////////////////
// LIGHTS
//////////////////////

const ambient = new THREE.AmbientLight(
    0xffffff,
    0.7
);

scene.add(ambient);

const dirLight = new THREE.DirectionalLight(
    0xffffff,
    1
);

dirLight.position.set(10,10,10);

scene.add(dirLight);

//////////////////////
// GROUND
//////////////////////

const groundGeo = new THREE.PlaneGeometry(
    50,
    50
);

const groundMat = new THREE.MeshStandardMaterial({
    color:0x1b1b1b
});

const ground = new THREE.Mesh(
    groundGeo,
    groundMat
);

ground.rotation.x = -Math.PI/2;

ground.position.y = -2;

scene.add(ground);

//////////////////////
// TELESCOPE TUBE
//////////////////////

const tubeGeo = new THREE.CylinderGeometry(
    0.8,
    0.8,
    7,
    64
);

const tubeMat = new THREE.MeshStandardMaterial({
    color:0x222222,
    metalness:0.4,
    roughness:0.5
});

const tube = new THREE.Mesh(
    tubeGeo,
    tubeMat
);

tube.rotation.z = Math.PI/2.8;

tube.position.y = 1.8;

scene.add(tube);

//////////////////////
// PRIMARY MIRROR
//////////////////////

const mirrorGeo = new THREE.CircleGeometry(
    0.72,
    64
);

const mirrorMat = new THREE.MeshStandardMaterial({
    color:0x88ccff,
    emissive:0x224466,
    metalness:1,
    roughness:0.1
});

const mirror = new THREE.Mesh(
    mirrorGeo,
    mirrorMat
);

mirror.rotation.y = Math.PI/2;

mirror.position.set(-2.8,0.7,0);

scene.add(mirror);

//////////////////////
// SECONDARY MIRROR
//////////////////////

const secGeo = new THREE.BoxGeometry(
    0.25,
    0.25,
    0.05
);

const secMat = new THREE.MeshStandardMaterial({
    color:0xcccccc
});

const secondary = new THREE.Mesh(
    secGeo,
    secMat
);

secondary.position.set(2.1,2.8,0);

secondary.rotation.z = Math.PI/4;

scene.add(secondary);

//////////////////////
// EYEPIECE
//////////////////////

const eyeGeo = new THREE.CylinderGeometry(
    0.12,
    0.12,
    0.8,
    32
);

const eyeMat = new THREE.MeshStandardMaterial({
    color:0xb8860b
});

const eyepiece = new THREE.Mesh(
    eyeGeo,
    eyeMat
);

eyepiece.rotation.z = Math.PI/2;

eyepiece.position.set(2.5,2.9,0);

scene.add(eyepiece);

//////////////////////
// ROCKER BOX
//////////////////////

const baseMat = new THREE.MeshStandardMaterial({
    color:0x6b3e1e
});

const sideGeo = new THREE.BoxGeometry(
    0.3,
    2.5,
    3
);

const leftSide = new THREE.Mesh(
    sideGeo,
    baseMat
);

leftSide.position.set(-0.8,-0.5,-1.3);

scene.add(leftSide);

const rightSide = new THREE.Mesh(
    sideGeo,
    baseMat
);

rightSide.position.set(-0.8,-0.5,1.3);

scene.add(rightSide);

const bottomGeo = new THREE.BoxGeometry(
    3,
    0.3,
    3
);

const bottom = new THREE.Mesh(
    bottomGeo,
    baseMat
);

bottom.position.set(-0.8,-1.7,0);

scene.add(bottom);

//////////////////////
// STARS
//////////////////////

const starGeo = new THREE.BufferGeometry();

const starVertices = [];

for(let i=0;i<3000;i++){

    starVertices.push(
        (Math.random()-0.5)*200,
        (Math.random()-0.5)*200,
        (Math.random()-0.5)*200
    );

}

starGeo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
        starVertices,
        3
    )
);

const starMat = new THREE.PointsMaterial({
    color:0xffffff,
    size:0.2
});

const stars = new THREE.Points(
    starGeo,
    starMat
);

scene.add(stars);

//////////////////////
// ANIMATION
//////////////////////

function animate(){

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene,camera);

}

animate();

//////////////////////
// RESIZE
//////////////////////

window.addEventListener('resize',()=>{

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
