// Particle Background with Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('particle-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

// Particle System
const particleCount = 300;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

    velocities[i * 3] = (Math.random() - 0.5) * 0.1;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMaterial = new THREE.PointsMaterial({
    color: 0xA78BFA,
    size: 0.5,
    transparent: true,
    opacity: 0.6
});
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

function animateParticles() {
    const positions = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];

        if (Math.abs(positions[i * 3]) > 50 || Math.abs(positions[i * 3 + 1]) > 50 || Math.abs(positions[i * 3 + 2]) > 50) {
            positions[i * 3] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        }
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize Handler
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Voice Button Interaction with Custom Audio
document.querySelector('.voice-btn').addEventListener('click', () => {
    const audio = new Audio('assests/voice.wav'); // Path to your recorded audio
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
        // Fallback to text-to-speech if audio fails
        const msg = new SpeechSynthesisUtterance('welcome to the universe of AI innovation! I’m Junaid Sharif, let’s connect and explore the future together!');
        window.speechSynthesis.speak(msg);
    });
});

// Smooth Scroll for Navigation
document.querySelectorAll('.nav-card').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Optional: Subtle Sway Animation for Cards
function animateCards() {
    const cards = document.querySelectorAll('.nav-card');
    cards.forEach(card => {
        const angle = Math.sin(Date.now() * 0.001 + card.offsetTop) * 2;
        card.style.transform = `translateX(-20px) rotate(${angle - 5}deg)`;
    });
    requestAnimationFrame(animateCards);
}

animateCards();