import * as BABYLON from 'babylonjs';
import './styles/style.scss';

import { addSystems } from './galaxy';
import { addExamplesToScene } from './example';

const canvasId: string = '3d-map-canvas';

// Destroy any already present canvases (due to HMR)
const elements = document.body.getElementsByTagName('canvas');
for (let i = 0; i < elements.length; i++) {
  elements[i].remove();
}

// Create the canvas object
const canvas = document.createElement('canvas');
canvas.id = canvasId;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const engineOptions: BABYLON.EngineOptions = {
  preserveDrawingBuffer: true,
  stencil: true
};
const engine: BABYLON.Engine = new BABYLON.Engine(canvas, true, engineOptions);

const createScene = function(): BABYLON.Scene {
  const scene: BABYLON.Scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera('camera1', 0, 0, 0, new BABYLON.Vector3(0, 5, -10), scene);
  // const camera: BABYLON.FreeCamera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, false);

  // Always attach the light for now
  const light: BABYLON.Light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

  //   addExamplesToScene(scene);
  addSystems(scene);

  return scene;
};

const scene: BABYLON.Scene = createScene();

// Run the optimiser to try and maintain a good FPS count
BABYLON.SceneOptimizer.OptimizeAsync(scene);

// Render loop
engine.runRenderLoop(() => {
  scene.render();
});

// Set an event handler for canvas/window resize

window.addEventListener('resize', () => {
  engine.resize();
});
