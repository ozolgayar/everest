export function render(scene) {
  const contextHtml = scene.context
    ? `<div class="choice-screen__context">${scene.context}</div>`
    : '';

  const optionsHtml = scene.options.map((opt, i) => `
    <button
      class="choice-button"
      data-id="${opt.id}"
      data-correct="${opt.isCorrect}"
      style="animation-delay: ${i * 100}ms"
    >
      <span class="choice-button__letter">${String.fromCharCode(65 + i)}</span>
      <span class="choice-button__text">${opt.text}</span>
    </button>
  `).join('');

  return `
    <div class="choice-screen">
      <div class="choice-screen__inner">
        ${contextHtml}
        <h2 class="choice-screen__question">${scene.question}</h2>
        <div class="choice-screen__options">
          ${optionsHtml}
        </div>
        <div class="choice-screen__feedback" id="feedback"></div>
      </div>
    </div>
  `;
}

export function mount(scene, { goToScene }) {
  const buttons = document.querySelectorAll('.choice-button');
  const feedbackBox = document.getElementById('feedback');
  let answered = false;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;

      const optionId = btn.dataset.id;
      const isCorrect = btn.dataset.correct === 'true';
      const option = scene.options.find(o => o.id === optionId);

      // Подсветить выбранный
      btn.classList.add(isCorrect ? 'choice-button--correct' : 'choice-button--wrong');

      // Показать правильный, если ответили неверно
      if (!isCorrect) {
        buttons.forEach(b => {
          if (b.dataset.correct === 'true') {
            b.classList.add('choice-button--show-correct');
          }
        });
      }

      // Затемнить остальные
      buttons.forEach(b => {
        if (b !== btn && b.dataset.correct !== 'true') {
          b.classList.add('choice-button--dim');
        }
        b.disabled = true;
      });

      // Показать фидбек
      const hintHtml = scene.hint
        ? `<div class="hint-card__hint">💡 ${scene.hint}</div>`
        : '';

      feedbackBox.innerHTML = `
        <div class="hint-card fade-in">
          <div class="hint-card__feedback">${option.feedback}</div>
          ${hintHtml}
          <button class="button button--primary choice-screen__continue" data-action="next">
            Продолжить →
          </button>
        </div>
      `;

      // Привязать кнопку
      const nextBtn = feedbackBox.querySelector('[data-action="next"]');
      nextBtn.addEventListener('click', () => {
        goToScene(scene.next);
      });

      // Скролл к фидбеку
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}