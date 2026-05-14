const STORAGE_KEY = 'everest-leader-state';

const defaultState = {
  currentSceneId: '',
  currentModule: 1,
  completedModules: [],
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Не удалось сохранить состояние:', e);
  }
}

export const state = loadState();

export function setScene(sceneId) {
  state.currentSceneId = sceneId;
  saveState();
}

export function setModule(num) {
  state.currentModule = num;
  saveState();
}

export function completeModule(num) {
  if (!state.completedModules.includes(num)) {
    state.completedModules.push(num);
    saveState();
  }
}

export function resetAll() {
  Object.assign(state, defaultState);
  saveState();
}