const cache = new Map();

export async function loadModule(num) {
  const key = `module-${num}`;
  if (cache.has(key)) return cache.get(key);

  const response = await fetch(`content/module-${num}.json`);
  if (!response.ok) throw new Error(`Не загрузился модуль ${num}`);
  const data = await response.json();
  cache.set(key, data);
  return data;
}

export async function loadShared() {
  if (cache.has('shared')) return cache.get('shared');
  const response = await fetch('content/shared.json');
  const data = await response.json();
  cache.set('shared', data);
  return data;
}
