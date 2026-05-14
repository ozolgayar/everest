import { state, resetAll } from '../store.js';

export function render(scene) {
  const hasProgress = state.currentSceneId && state.currentSceneId !== 'menu';
  const progressText = hasProgress
    ? `<p class="menu-screen__progress">Есть сохранённый прогресс</p>`
    : '';

  const continueBtn = hasProgress
    ? `<button class="button button--primary" data-action="continue">Продолжить</button>`
    : '';

  const startLabel = hasProgress ? 'Начать заново' : 'Начать экспедицию';
  const startClass = hasProgress ? 'button--secondary' : 'button--primary';

  return `
    <div class="menu-screen">
      <div class="menu-screen__bg"></div>
      <div class="menu-screen__content">
        <h1 class="menu-screen__title">Everest Leader</h1>
        <p class="menu-screen__subtitle">
          Игровой курс лидерства для руководителей
        </p>
        <div class="menu-screen__actions">
          ${continueBtn}
          <button class="button ${startClass}" data-action="start">${startLabel}</button>
        </div>
        ${progressText}
      </div>
    </div>
  `;
}

export function mount(scene, { goToScene }) {
  const continueBtn = document.querySelector('[data-action="continue"]');
  const startBtn = document.querySelector('[data-action="start"]');

  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      goToScene(state.currentSceneId);
    });
  }

  startBtn.addEventListener('click', () => {
    resetAll();
    goToScene('scene_M1_intro_anna');
  });
}