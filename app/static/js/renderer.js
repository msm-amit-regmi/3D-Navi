// Initialize Three.js scene
let scene, camera, renderer, controls;
let plate, hole;

// Default parameters
const defaultParams = {
    plateWidth: 100,
    plateHeight: 100,
    plateThickness: 5,
    holeDiameter: 20,
    holePositionX: 50,
    holePositionY: 50,
    material: 'aluminum'
};

// Material colors
const materialColors = {
    'aluminum': 0xCCCCCC,
    'steel': 0x777777,
    'stainless-steel': 0xAAAAAA,
    'titanium': 0xBBBBBB,
    'plastic': 0x333333
};

// Initialize the scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
    camera.position.z = 200;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(document.getElementById('renderer').clientWidth, document.getElementById('renderer').clientHeight);
    document.getElementById('renderer').appendChild(renderer.domElement);

    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);

    // Create initial plate with hole
    createPlateWithHole(defaultParams);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start animation loop
    animate();
}

// Create plate with hole
function createPlateWithHole(params) {
    // Remove existing plate if any
    if (plate) {
        scene.remove(plate);
    }

    // Create plate geometry
    const plateGeometry = new THREE.BoxGeometry(
        params.plateWidth,
        params.plateHeight,
        params.plateThickness
    );

    // Create material
    const plateMaterial = new THREE.MeshPhongMaterial({
        color: materialColors[params.material] || materialColors.aluminum,
        shininess: 100,
        flatShading: false
    });

    // Create plate mesh
    plate = new THREE.Mesh(plateGeometry, plateMaterial);
    scene.add(plate);

    // Create hole (cylinder)
    const holeGeometry = new THREE.CylinderGeometry(
        params.holeDiameter / 2,
        params.holeDiameter / 2,
        params.plateThickness + 2,
        32
    );
    const holeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    hole = new THREE.Mesh(holeGeometry, holeMaterial);
    
    // Position hole
    hole.position.x = params.holePositionX - params.plateWidth / 2;
    hole.position.y = params.holePositionY - params.plateHeight / 2;
    hole.rotation.x = Math.PI / 2;
    
    // Use CSG to subtract hole from plate (simplified for this example)
    // In a real application, you would use CSG library or THREE.js boolean operations
    scene.add(hole);

    // Center camera on plate
    camera.lookAt(plate.position);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = document.getElementById('renderer').clientWidth / document.getElementById('renderer').clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.getElementById('renderer').clientWidth, document.getElementById('renderer').clientHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Update model based on form inputs
function updateModel() {
    const params = {
        plateWidth: parseFloat(document.getElementById('plate-width').value),
        plateHeight: parseFloat(document.getElementById('plate-height').value),
        plateThickness: parseFloat(document.getElementById('plate-thickness').value),
        holeDiameter: parseFloat(document.getElementById('hole-diameter').value),
        holePositionX: parseFloat(document.getElementById('hole-position-x').value),
        holePositionY: parseFloat(document.getElementById('hole-position-y').value),
        material: document.getElementById('material').value
    };
    
    createPlateWithHole(params);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Add event listener to update button
    document.getElementById('update-model').addEventListener('click', updateModel);
    
    // Add event listener to get quote button
    document.getElementById('get-quote').addEventListener('click', () => {
        alert('Quote request submitted! We will contact you shortly with pricing information.');
    });
});