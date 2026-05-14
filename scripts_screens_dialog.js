export function render(scene) {
  const speakerName = getSpeakerName(scene.speaker);
  const initial = speakerName.charAt(0).toUpperCase();

  return `
    <div class="dialog-screen">
      <div class="dialog-screen__inner">
        <div class="dialog-card slide-in-up">
          <div class="dialog-card__avatar">${initial}</div>
          <div class="dialog-card__body">
            <div class="dialog-card__speaker">${speakerName}</div>
            <div class="dialog-card__text">${scene.text}</div>
            <button class="button button--primary" data-action="next">
              Продолжить →
            </button>
          </div>
        </div>
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

function getSpeakerName(speaker) {
  const names = {
    anna: 'Анна',
    navigator: 'Навигатор',
    hero: 'Ты',
  };
  return names[speaker] || speaker || 'Голос';
}