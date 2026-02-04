// INITIAL SETUP
const scroll = new Lenis({
    lerp: 0.08, // Smoothness
    smooth: true,
    direction: 'vertical',
});

function raf(time) {
    scroll.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// SHADERS (The "Magic" Liquid Effect)
const vertexShader = `
    uniform float uTime;
    uniform vec2 uHover;
    uniform float uHoverState;
    uniform float uScrollSpeed;
    
    varying vec2 vUv;

    void main() {
        vUv = uv;
        vec3 newPos = position;

        // DISTORTION FORMULA: Bend the plane based on scroll speed
        newPos.y += sin(uv.x * 3.14159) * uScrollSpeed * 0.02;
        newPos.z += sin(uv.y * 10.0 + uTime) * 0.05;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
`;

const fragmentShader = `
    uniform sampler2D uImage;
    uniform float uTime;
    uniform float uScrollSpeed;
    varying vec2 vUv;

    void main() {
        vec2 uv = vUv;

        // RGB SHIFT EFFECT (Chromatic Aberration) based on speed
        float shift = uScrollSpeed * 0.01;
        float r = texture2D(uImage, uv + vec2(shift, 0.0)).r;
        float g = texture2D(uImage, uv).g;
        float b = texture2D(uImage, uv - vec2(shift, 0.0)).b;

        vec3 color = vec3(r, g, b);
        gl_FragColor = vec4(color, 1.0);
    }
`;

// THREE.JS SCENE SETUP
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const fov = 2 * Math.atan((window.innerHeight / 2) / 600) * (180 / Math.PI);

camera.position.z = 600;
camera.fov = fov;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('gl').appendChild(renderer.domElement);

// IMAGE MANAGER
const images = [...document.querySelectorAll('.gallery-item img')];
const meshes = [];

// Wait for images to load before creating 3D objects
imagesLoaded(document.body, () => {
    images.forEach((img, index) => {
        createMesh(img, index);
    });
    render();
});

function createMesh(img, index) {
    const geometry = new THREE.PlaneGeometry(1, 1, 32, 32); // 32 segments for smooth distortion
    const texture = new THREE.TextureLoader().load(img.src);
    
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uImage: { value: texture },
            uTime: { value: 0 },
            uScrollSpeed: { value: 0 },
            uHover: { value: new THREE.Vector2(0.5, 0.5) },
            uHoverState: { value: 0 }
        },
        side: THREE.DoubleSide
        // wireframe: true // Uncomment to see the "Matrix"
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    meshes.push({
        mesh,
        img,
        element: img.parentElement
    });
}

// ANIMATION LOOP
let currentScroll = 0;
let targetScroll = 0;

function render() {
    targetScroll = scroll.scroll; // Get Lenis scroll position
    currentScroll = THREE.MathUtils.lerp(currentScroll, targetScroll, 0.1);
    
    // Calculate Speed for Distortion
    const scrollSpeed = targetScroll - currentScroll;

    meshes.forEach(({ mesh, element }) => {
        // Sync HTML position to 3D World
        const bounds = element.getBoundingClientRect();
        
        // Convert HTML pixels to Three.js units
        mesh.scale.set(bounds.width, bounds.height, 1);
        
        // Position mesh relative to window center
        mesh.position.y = (window.innerHeight / 2) - bounds.top - (bounds.height / 2);
        mesh.position.x = bounds.left - (window.innerWidth / 2) + (bounds.width / 2);

        // Pass Uniforms to Shader
        mesh.material.uniforms.uTime.value += 0.05;
        mesh.material.uniforms.uScrollSpeed.value = scrollSpeed;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// HANDLE RESIZE
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.fov = 2 * Math.atan((window.innerHeight / 2) / 600) * (180 / Math.PI);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
