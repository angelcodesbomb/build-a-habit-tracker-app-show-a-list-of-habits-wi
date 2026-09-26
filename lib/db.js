// Simple in-memory database layer for the habit tracker.
// Persists to localStorage so data survives reloads.

const STORAGE_KEY = "habit-tracker-db";

const seed = [
  { id: 1, name: "Drink 8 glasses of water", streak: 3 },
  { id: 2, name: "Read for 20 minutes", streak: 5 },
  { id: 3, name: "Exercise for 30 minutes", streak: 1 },
];

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch (e) {
    // ignore parse errors and fall back to seed
  }
  return seed.map((h) => ({ ...h }));
}

function save(rows) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  } catch (e) {
    // storage may be unavailable; keep in-memory only
  }
}

let rows = load();

function nextId() {
  return rows.reduce((max, r) => Math.max(max, r.id), 0) + 1;
}

export function getAll() {
  return rows.map((r) => ({ ...r }));
}

export function getById(id) {
  const found = rows.find((r) => r.id === id);
  return found ? { ...found } : null;
}

export function insert(habit) {
  const row = { id: nextId(), name: habit.name, streak: habit.streak || 0 };
  rows = [...rows, row];
  save(rows);
  return { ...row };
}

export function update(id, patch) {
  rows = rows.map((r) => (r.id === id ? { ...r, ...patch } : r));
  save(rows);
  return getById(id);
}

export function remove(id) {
  rows = rows.filter((r) => r.id !== id);
  save(rows);
  return true;
}

export function reset() {
  rows = seed.map((h) => ({ ...h }));
  save(rows);
  return getAll();
}
