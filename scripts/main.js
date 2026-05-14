import { state } from './store.js';
import { renderScene, setScenes, findScene, goToMenu } from './engine.js';
import { loadModule } from './content-loader.js';

async function init() {
  try {
    // Загружаем модуль 1 (для MVP)
    const moduleData = await loadModule(1);
    setScenes(moduleData.scenes);

    // Если есть сохранённый прогресс — продолжаем
    if (state.currentSceneId && state.currentSceneId !== 'menu') {
      const scene = findScene(state.currentSceneId);
      if (scene) {
        renderScene(scene);
        return;
      }
    }

    // Иначе показываем меню
    goToMenu();
  } catch (e) {
    console.error('Ошибка инициализации:', e);
    document.getElementById('app').innerHTML = `
      <div class="error-screen">
        <h2>Не удалось загрузить курс</h2>
        <p>${e.message}</p>
        <p style="margin-top:16px;color:#999">
          Подсказка: открой проект через локальный сервер, а не двойным кликом по index.html
        </p>
      </div>
    `;
  }
}

init();
