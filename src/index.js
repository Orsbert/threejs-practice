import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";
import * as dat from "dat.gui";

const gui = new dat.GUI();

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
});

const renderer = new THREE.WebGLRenderer({
  antialising: true,
  alpha: false,
  canvas: undefined
});

const { width, height } = getSize();

const camera = new THREE.PerspectiveCamera(45, width / height);
const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight(0x0000ff, 0.4);

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.PlaneBufferGeometry(1, 1, 512, 512);
const material = new THREE.ShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  uniforms: {
    uTime: { value: 0.2 },
    uBigWavesSpeed: { value: 2.0 },
    uBigWavesElevation: { value: 0.1 },
    uBigWavesFrequency: { value: new THREE.Vector2(4, 5) }
  }
});

gui
  .add(material.uniforms.uBigWavesSpeed, "value")
  .min(1)
  .max(10)
  .step(0.0001)
  .name("uBigWavesSpeed");

gui
  .add(material.uniforms.uBigWavesElevation, "value")
  .min(0)
  .max(1)
  .step(0.0001)
  .name("uBigWavesElevation");

gui
  .add(material.uniforms.uBigWavesFrequency.value, "x")
  .min(0)
  .max(10)
  .step(1)
  .name("uBigWavesFrequencyX");

gui
  .add(material.uniforms.uBigWavesFrequency.value, "y")
  .min(0)
  .max(10)
  .step(1)
  .name("uBigWavesFrequencyY");

const mesh = new THREE.Mesh(geometry, material);

mesh.rotation.x = -0.95;
mesh.rotation.z = -0.6;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
camera.position.z = 1.6;

scene.add(ambientLight, mesh);

const clock = new THREE.Clock();

const update = () => {
  material.uniforms.uTime.value = clock.getElapsedTime();
  renderer.render(scene, camera);
  requestAnimationFrame(update);
};

requestAnimationFrame(update);

global.document.getElementById("app").appendChild(renderer.domElement);
