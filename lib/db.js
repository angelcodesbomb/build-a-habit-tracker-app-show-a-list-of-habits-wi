const STORAGE_KEY = "sprout_db";

const SEED_DATA = {
  habits: [
    { id: "h1", name: "Drink water", streak: 5, lastCompleted: "2023-09-25" },
    { id: "h2", name: "Morning meditation", streak: 12, lastCompleted: "2023-09-26" },
    { id: "h3", name: "Read 20 pages", streak: 3, lastCompleted: "2023-09-24" },
    { id: "h4", name: "Exercise", streak: 7, lastCompleted: "2023-09-26" },
    { id: "h5", name: "Write journal", streak: 10, lastCompleted: "2023-09-25" },
    { id: "h6", name: "Learn a language", streak: 2, lastCompleted: "2023-09-23" },
    { id: "h7", name: "No sugar", streak: 15, lastCompleted: "2023-09-26" },
    { id: "h8", name: "Sleep 8 hours", streak: 4, lastCompleted: "2023-09-25" },
    { id: "h9", name: "Practice guitar", streak: 1, lastCompleted: "2023-09-22" },
    { id: "h10", name: "Plan tomorrow", streak: 8, lastCompleted: "2023-09-26" }
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
  return deepClone(_db[table] ?? []);
}

export function getById(table, id) {
  const record = (_db[table] ?? []).find(r => r.id === id);
  return record ? deepClone(record) : null;
}

export function insert(table, record) {
  const newRecord = { ...record };
  if (!newRecord.id) {
    newRecord.id = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString();
  }
  (_db[table] = _db[table] ?? []).push(newRecord);
  saveDb(_db);
  return deepClone(newRecord);
}

export function update(table, id, patch) {
  const collection = _db[table] ?? [];
  const index = collection.findIndex(r => r.id === id);
  if (index === -1) return null;
  const updated = { ...collection[index], ...patch };
  collection[index] = updated;
  saveDb(_db);
  return deepClone(updated);
}

export function remove(table, id) {
  const collection = _db[table] ?? [];
  const index = collection.findIndex(r => r.id === id);
  if (index === -1) return false;
  collection.splice(index, 1);
  saveDb(_db);
  return true;
}

export function reset() {
  _db = deepClone(SEED_DATA);
  saveDb(_db);
}
