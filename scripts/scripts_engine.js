import { setScene } from './store.js';

const screenLoaders = {
  menu:   () => import('./screens/menu.js'),
  dialog: () => import('./screens/dialog.js'),
  choice: () => import('./screens/choice.js'),
  diary:  () => import('./screens/diary.js'),
  reward: () => import('./screens/reward.js'),
};

const APP = document.getElementById('app');

let currentScenes = [];

export function setScenes(scenes) {
  currentScenes = scenes;
}

export function findScene(sceneId) {
  return currentScenes.find(s => s.id === sceneId);
}

export async function renderScene(scene) {
  if (!scene) {
    showError('Сцена не найдена');
    return;
  }

  const loader = screenLoaders[scene.type];
  if (!loader) {
    showError(`Неизвестный тип сцены: ${scene.type}`);
    return;
  }

  setScene(scene.id);

  // Плавный переход
  APP.classList.add('app--fading');
  await wait(200);

  try {
    const module = await loader();
    const html = module.render(scene);
    APP.innerHTML = html;
    if (module.mount) module.mount(scene, { goToScene, goToMenu });
  } catch (e) {
    console.error(e);
    showError('Ошибка загрузки экрана');
  }

  APP.classList.remove('app--fading');
  window.scrollTo(0, 0);
}

export function goToScene(sceneId) {
  const scene = findScene(sceneId);
  renderScene(scene);
}

export function goToMenu() {
  renderScene({ id: 'menu', type: 'menu' });
}

function showError(msg) {
  APP.innerHTML = `<div class="error-screen"><h2>${msg}</h2></div>`;
}

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}