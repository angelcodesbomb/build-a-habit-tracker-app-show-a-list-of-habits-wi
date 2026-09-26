const STORAGE_KEY = "sprout_db";

const SEED_DATA = {
  habits: [
    { id: "h1", name: "Drink Water", streak: 5, lastCompleted: "2024-09-25" },
    { id: "h2", name: "Morning Jog", streak: 12, lastCompleted: "2024-09-24" },
    { id: "h3", name: "Read Book", streak: 3, lastCompleted: "2024-09-25" },
    { id: "h4", name: "Meditate", streak: 7, lastCompleted: "2024-09-23" },
    { id: "h5", name: "Write Journal", streak: 10, lastCompleted: "2024-09-25" },
    { id: "h6", name: "Practice Guitar", streak: 2, lastCompleted: null },
    { id: "h7", name: "Learn Spanish", streak: 4, lastCompleted: "2024-09-22" },
    { id: "h8", name: "Sleep 8 Hours", streak: 15, lastCompleted: "2024-09-25" },
    { id: "h9", name: "No Sugar", streak: 9, lastCompleted: "2024-09-24" },
    { id: "h10", name: "Plan Day", streak: 6, lastCompleted: "2024-09-25" }
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

function getAll(table) {
  return deepClone(_db[table] ?? []);
}

function getById(table, id) {
  const rec = (_db[table] ?? []).find(r => r.id === id);
  return rec ? deepClone(rec) : null;
}

function insert(table, record) {
  const newRec = { ...record };
  if (!newRec.id) {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      newRec.id = crypto.randomUUID();
    } else {
      newRec.id = Math.random().toString(36).substr(2, 9);
    }
  }
  _db[table] = (_db[table] ?? []).concat(newRec);
  saveDb(_db);
  return deepClone(newRec);
}

function update(table, id, patch) {
  const arr = _db[table] ?? [];
  const idx = arr.findIndex(r => r.id === id);
  if (idx === -1) return null;
  const updated = { ...arr[idx], ...patch };
  arr[idx] = updated;
  saveDb(_db);
  return deepClone(updated);
}

function remove(table, id) {
  const arr = _db[table] ?? [];
  const idx = arr.findIndex(r => r.id === id);
  if (idx === -1) return false;
  arr.splice(idx, 1);
  saveDb(_db);
  return true;
}

function reset() {
  _db = deepClone(SEED_DATA);
  saveDb(_db);
}

export { getAll, getById, insert, update, remove, reset };