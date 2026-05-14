import { completeModule, resetAll } from '../store.js';

export function render(scene) {
  const isFinish = !scene.next;
  const btnLabel = isFinish ? 'Начать заново' : 'Продолжить →';

  return `
    <div class="reward-screen">
      <div class="reward-screen__content">
        <div class="reward-screen__icon">${scene.rewardIcon || '🏆'}</div>
        <div class="reward-screen__label">Награда получена</div>
        <h1 class="reward-screen__name">${scene.rewardName}</h1>
        <p class="reward-screen__description">${scene.description}</p>
        <button class="button button--primary" data-action="next">
          ${btnLabel}
        </button>
      </div>
    </div>
  `;
}

export function mount(scene, { goToScene, goToMenu }) {
  if (scene.module) completeModule(scene.module);

  const btn = document.querySelector('[data-action="next"]');
  btn.addEventListener('click', () => {
    if (scene.next) {
      goToScene(scene.next);
    } else {
      resetAll();
      goToMenu();
    }
  });
}