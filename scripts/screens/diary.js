export function render(scene) {
  return `
    <div class="diary-screen">
      <div class="diary-card slide-in-up">
        <div class="diary-card__date">${scene.date || 'Запись в дневнике'}</div>
        <div class="diary-card__text">${scene.text}</div>
        <button class="button" data-action="next">
          Закрыть дневник →
        </button>
      </div>
    </div>
  `;
}

export function mount(scene, { goToScene }) {
  const btn = document.querySelector('[data-action="next"]');
  btn.addEventListener('click', () => {
    goToScene(scene.next);
  });
}
