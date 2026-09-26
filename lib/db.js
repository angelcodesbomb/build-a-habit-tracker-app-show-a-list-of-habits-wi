const STORAGE_KEY = "sprout_db";

const SEED_DATA = {
  "habits": [
    {
      "id": "h1",
      "name": "Morning Yoga",
      "description": "15‑minute flow to start the day",
      "createdAt": "2024-01-05T08:00:00.000Z",
      "streak": 4,
      "lastCompleted": "2024-09-25T07:30:00.000Z",
      "isActive": true
    },
    {
      "id": "h2",
      "name": "Read Fiction",
      "description": "Read at least 20 pages of a novel",
      "createdAt": "2024-02-12T10:15:00.000Z",
      "streak": 7,
      "lastCompleted": "2024-09-25T20:00:00.000Z",
      "isActive": true
    },
    {
      "id": "h3",
      "name": "Drink Water",
      "description": "Consume 8 glasses of water",
      "createdAt": "2024-03-01T09:00:00.000Z",
      "streak": 12,
      "lastCompleted": "2024-09-25T12:00:00.000Z",
      "isActive": true
    },
    {
      "id": "h4",
      "name": "Evening Walk",
      "description": "30‑minute walk after dinner",
      "createdAt": "2024-04-20T18:30:00.000Z",
      "streak": 2,
      "lastCompleted": "2024-09-24T19:00:00.000Z",
      "isActive": true
    },
    {
      "id": "h5",
      "name": "Meditation",
      "description": "10 minutes of mindfulness",
      "createdAt": "2024-05-15T07:45:00.000Z",
      "streak": 9,
      "lastCompleted": "2024-09-25T07:00:00.000Z",
      "isActive": true
    },
    {
      "id": "h6",
      "name": "Learn Japanese",
      "description": "Study 5 new kanji characters",
      "createdAt": "2024-06-10T14:00:00.000Z",
      "streak": 5,
      "lastCompleted": "2024-09-23T14:30:00.000Z",
      "isActive": true
    },
    {
      "id": "h7",
      "name": "Plant Care",
      "description": "Water indoor plants",
      "createdAt": "2024-07-01T09:30:00.000Z",
      "streak": 3,
      "lastCompleted": "2024-09-25T09:00:00.000Z",
      "isActive": true
    },
    {
      "id": "h8",
      "name": "Sketch Daily",
      "description": "Draw a quick sketch",
      "createdAt": "2024-08-05T16:00:00.000Z",
      "streak": 6,
      "lastCompleted": "2024-09-24T16:45:00.000Z",
      "isActive": true
    },
    {
      "id": "h9",
      "name": "No Sugar",
      "description": "Avoid added sugars for the day",
      "createdAt": "2024-09-01T00:00:00.000Z",
      "streak": 1,
      "lastCompleted": "2024-09-25T23:59:00.000Z",
      "isActive": true
    },
    {
      "id": "h10",
      "name": "Journal",
      "description": "Write 3 sentences about the day",
      "createdAt": "2024-09-10T20:00:00.000Z",
      "streak": 8,
      "lastCompleted": "2024-09-25T21:00:00.000Z",
      "isActive": true
    }
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
  const rec = (_db[table] ?? []).find(r => r.id === id);
  return rec ? deepClone(rec) : null;
}

export function insert(table, record) {
  const newRec = { ...record };
  if (!newRec.id) {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      newRec.id = crypto.randomUUID();
    } else {
      newRec.id = Math.random().toString(36).substr(2, 9);
    }
  }
  _db[table] = _db[table] ?? [];
  _db[table].push(newRec);
  saveDb(_db);
  return deepClone(newRec);
}

export function update(table, id, patch) {
  const arr = _db[table] ?? [];
  const idx = arr.findIndex(r => r.id === id);
  if (idx === -1) return null;
  const updated = { ...arr[idx], ...patch };
  arr[idx] = updated;
  saveDb(_db);
  return deepClone(updated);
}

export function remove(table, id) {
  const arr = _db[table] ?? [];
  const idx = arr.findIndex(r => r.id === id);
  if (idx === -1) return false;
  arr.splice(idx, 1);
  saveDb(_db);
  return true;
}

export function reset() {
  _db = deepClone(SEED_DATA);
  saveDb(_db);
}
