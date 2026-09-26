const STORAGE_KEY = "sprout_db";

const SEED_DATA = {
  habits: [
    { id: "habit_1", name: "Drink water", streak: 5, lastCompleted: "2023-09-20" },
    { id: "habit_2", name: "Morning meditation", streak: 12, lastCompleted: "2023-09-21" },
    { id: "habit_3", name: "Read a book", streak: 8, lastCompleted: "2023-09-19" },
    { id: "habit_4", name: "Exercise", streak: 3, lastCompleted: "2023-09-22" },
    { id: "habit_5", name: "Write journal", streak: 10, lastCompleted: "2023-09-21" },
    { id: "habit_6", name: "Learn a language", streak: 4, lastCompleted: "2023-09-20" },
    { id: "habit_7", name: "Plan the day", streak: 7, lastCompleted: "2023-09-22" },
    { id: "habit_8", name: "No sugar", streak: 2, lastCompleted: "2023-09-18" },
    { id: "habit_9", name: "Walk 10k steps", streak: 6, lastCompleted: "2023-09-21" },
    { id: "habit_10", name: "Sleep before 11pm", streak: 9, lastCompleted: "2023-09-20" }
  ]
};

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function loadDb() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : deepClone(SEED_DATA);
}

function saveDb(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

let _db = loadDb();

export function getAll(table) {
  const records = _db[table] ?? [];
  return deepClone(records);
}

export function getById(table, id) {
  const record = (_db[table] ?? []).find(r => r.id === id);
  return record ? deepClone(record) : null;
}

export function insert(table, record) {
  const newRecord = { ...record };
  if (!newRecord.id) {
    newRecord.id = "id_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
  }
  (_db[table] = _db[table] ?? []).push(newRecord);
  saveDb(_db);
  return deepClone(newRecord);
}

export function update(table, id, patch) {
  const records = _db[table] ?? [];
  const index = records.findIndex(r => r.id === id);
  if (index === -1) return null;
  const updated = { ...records[index], ...patch };
  records[index] = updated;
  saveDb(_db);
  return deepClone(updated);
}

export function remove(table, id) {
  const records = _db[table] ?? [];
  const filtered = records.filter(r => r.id !== id);
  if (filtered.length === records.length) return false;
  _db[table] = filtered;
  saveDb(_db);
  return true;
}

export function reset() {
  _db = deepClone(SEED_DATA);
  saveDb(_db);
}
