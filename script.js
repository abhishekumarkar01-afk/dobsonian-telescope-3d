const canvas = document.getElementById('scene');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x030712);

////////////////////////////////////////////////////////
// CAMERA
////////////////////////////////////////////////////////

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(8,5,10);

////////////////////////////////////////////////////////
// RENDERER
////////////////////////////////////////////////////////

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias:true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio,2)
);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

////////////////////////////////////////////////////////
// CONTROLS
////////////////////////////////////////////////////////

const controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.enablePan = false;
controls.maxPolarAngle = Math.PI / 1.9;
controls.minDistance = 4;
controls.maxDistance = 25;

////////////////////////////////////////////////////////
// LIGHTING
////////////////////////////////////////////////////////

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.55
);

scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(
    0xffffff,
    1.8
);

mainLight.position.set(8,12,10);

mainLight.castShadow = true;

mainLight.shadow.mapSize.width = 2048;
mainLight.shadow.mapSize.height = 2048;

scene.add(mainLight);

const rimLight = new THREE.DirectionalLight(
    0x88aaff,
    0.6
);

rimLight.position.set(-10,5,-8);

scene.add(rimLight);

////////////////////////////////////////////////////////
// FLOOR
////////////////////////////////////////////////////////

const floorGeometry = new THREE.PlaneGeometry(
    100,
    100
);

const floorMaterial = new THREE.MeshStandardMaterial({
    color:0x111827,
    roughness:1
});

const floor = new THREE.Mesh(
    floorGeometry,
    floorMaterial
);

floor.rotation.x = -Math.PI / 2;

floor.receiveShadow = true;

floor.position.y = -2.4;

scene.add(floor);

////////////////////////////////////////////////////////
// STARS
////////////////////////////////////////////////////////

const starsGeometry = new THREE.BufferGeometry();

const starVertices = [];

for(let i = 0; i < 5000; i++){

    starVertices.push(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
    );
}

starsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
        starVertices,
        3
    )
);

const starsMaterial = new THREE.PointsMaterial({
    color:0xffffff,
    size:0.18
});

const stars = new THREE.Points(
    starsGeometry,
    starsMaterial
);

scene.add(stars);

////////////////////////////////////////////////////////
// TELESCOPE GROUP
////////////////////////////////////////////////////////

const telescope = new THREE.Group();
scene.add(telescope);

////////////////////////////////////////////////////////
// MATERIALS
////////////////////////////////////////////////////////

const matteBlack = new THREE.MeshStandardMaterial({
    color:0x222222,
    roughness:0.6,
    metalness:0.35
});

const glossyBlack = new THREE.MeshStandardMaterial({
    color:0x111111,
    roughness:0.25,
    metalness:0.8
});

const woodMaterial = new THREE.MeshStandardMaterial({
    color:0x6b4226,
    roughness:0.9
});

const metalMaterial = new THREE.MeshStandardMaterial({
    color:0xb0b0b0,
    metalness:1,
    roughness:0.2
});

const mirrorMaterial = new THREE.MeshStandardMaterial({
    color:0x99ccff,
    emissive:0x113355,
    metalness:1,
    roughness:0.02
});

////////////////////////////////////////////////////////
// MAIN OPTICAL TUBE
////////////////////////////////////////////////////////

const tubeGeometry = new THREE.CylinderGeometry(
    1,
    1,
    9,
    96
);

const tube = new THREE.Mesh(
    tubeGeometry,
    matteBlack
);

tube.castShadow = true;

tube.rotation.z = Math.PI / 2.8;

tube.position.set(0,2,0);

telescope.add(tube);

////////////////////////////////////////////////////////
// FRONT RING
////////////////////////////////////////////////////////

const frontRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.02,0.06,32,100),
    glossyBlack
);

frontRing.rotation.y = Math.PI / 2;
frontRing.position.set(3.8,3.2,0);
frontRing.castShadow = true;

telescope.add(frontRing);

////////////////////////////////////////////////////////
// BACK RING
////////////////////////////////////////////////////////

const backRing = frontRing.clone();
backRing.position.set(-3.8,0.8,0);

telescope.add(backRing);

////////////////////////////////////////////////////////
// PRIMARY MIRROR
////////////////////////////////////////////////////////

const primaryMirror = new THREE.Mesh(
    new THREE.CircleGeometry(0.92,96),
    mirrorMaterial
);

primaryMirror.rotation.y = Math.PI / 2;
primaryMirror.position.set(-4.1,0.75,0);

telescope.add(primaryMirror);

////////////////////////////////////////////////////////
// SECONDARY MIRROR HOLDER
////////////////////////////////////////////////////////

const secondaryHolder = new THREE.Mesh(
    new THREE.BoxGeometry(0.25,0.25,0.5),
    metalMaterial
);

secondaryHolder.position.set(3,3,0);
secondaryHolder.rotation.z = Math.PI / 4;
secondaryHolder.castShadow = true;

telescope.add(secondaryHolder);

////////////////////////////////////////////////////////
// SPIDER VANES
////////////////////////////////////////////////////////

function createSpider(x1,y1,z1,x2,y2,z2){

    const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x1,y1,z1),
        new THREE.Vector3(x2,y2,z2)
    ]);

    const material = new THREE.LineBasicMaterial({
        color:0x999999
    });

    const line = new THREE.Line(
        geometry,
        material
    );

    telescope.add(line);
}

createSpider(3.7,3.2,0,3,3,0);
createSpider(2.3,3.2,0,3,3,0);
createSpider(3,2.4,0,3,3,0);
createSpider(3,4,0,3,3,0);

////////////////////////////////////////////////////////
// FOCUSER
////////////////////////////////////////////////////////

const focuserBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22,0.22,0.6,32),
    glossyBlack
);

focuserBase.rotation.x = Math.PI / 2;

focuserBase.position.set(2.4,3.7,0);

focuserBase.castShadow = true;

telescope.add(focuserBase);

////////////////////////////////////////////////////////
// EYEPIECE
////////////////////////////////////////////////////////

const eyepiece = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15,0.12,0.8,32),
    metalMaterial
);

eyepiece.rotation.x = Math.PI / 2;

eyepiece.position.set(2.4,4.15,0);

eyepiece.castShadow = true;

telescope.add(eyepiece);

////////////////////////////////////////////////////////
// ALTITUDE BEARINGS
////////////////////////////////////////////////////////

const bearingGeometry = new THREE.TorusGeometry(
    1.4,
    0.12,
    32,
    100,
    Math.PI
);

const leftBearing = new THREE.Mesh(
    bearingGeometry,
    woodMaterial
);

leftBearing.rotation.y = Math.PI / 2;
leftBearing.position.set(-0.6,1.8,-1.2);
leftBearing.castShadow = true;

telescope.add(leftBearing);

const rightBearing = leftBearing.clone();
rightBearing.position.z = 1.2;

telescope.add(rightBearing);

////////////////////////////////////////////////////////
// ROCKER BOX
////////////////////////////////////////////////////////

const rockerLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.4,3.5,4),
    woodMaterial
);

rockerLeft.position.set(-1.6,-0.4,-1.8);
rockerLeft.castShadow = true;
rockerLeft.receiveShadow = true;

telescope.add(rockerLeft);

const rockerRight = rockerLeft.clone();
rockerRight.position.z = 1.8;

telescope.add(rockerRight);

const rockerBottom = new THREE.Mesh(
    new THREE.BoxGeometry(4.5,0.35,4.2),
    woodMaterial
);

rockerBottom.position.set(-1.1,-2.1,0);
rockerBottom.castShadow = true;
rockerBottom.receiveShadow = true;

telescope.add(rockerBottom);

////////////////////////////////////////////////////////
// GROUND BOARD
////////////////////////////////////////////////////////

const groundBoard = new THREE.Mesh(
    new THREE.CylinderGeometry(2.8,2.8,0.25,64),
    woodMaterial
);

groundBoard.position.set(-1.1,-2.45,0);

groundBoard.castShadow = true;

groundBoard.receiveShadow = true;

telescope.add(groundBoard);

////////////////////////////////////////////////////////
// SUPPORT KNOBS
////////////////////////////////////////////////////////

function createKnob(x,y,z){

    const knob = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12,0.12,0.25,24),
        metalMaterial
    );

    knob.rotation.z = Math.PI / 2;

    knob.position.set(x,y,z);

    knob.castShadow = true;

    telescope.add(knob);
}

createKnob(-1.4,1.5,-2);
createKnob(-1.4,1.5,2);

////////////////////////////////////////////////////////
// DUST CAP
////////////////////////////////////////////////////////

const dustCap = new THREE.Mesh(
    new THREE.CylinderGeometry(1.02,1.02,0.2,64),
    matteBlack
);

dustCap.rotation.z = Math.PI / 2.8;

dustCap.position.set(3.95,3.25,0);

dustCap.castShadow = true;

telescope.add(dustCap);

////////////////////////////////////////////////////////
// ANIMATION
////////////////////////////////////////////////////////

function animate(){

    requestAnimationFrame(animate);

    stars.rotation.y += 0.0004;

    controls.update();

    renderer.render(scene,camera);
}

animate();

////////////////////////////////////////////////////////
// RESIZE
////////////////////////////////////////////////////////

window.addEventListener('resize',()=>{

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
