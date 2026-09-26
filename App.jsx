import React, { useState, useEffect } from "react";
import { getAll, insert, update } from "./lib/db.js";

export default function App() {
  const [habits, setHabits] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const data = getAll();
    setHabits(data);
  }, []);

  const handleToggle = (habit) => {
    const isToday = habit.lastCompleted === today;
    let newStreak = habit.streak;
    let newLastCompleted = habit.lastCompleted;
    if (!isToday) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];
      if (habit.lastCompleted === yesterdayStr) {
        newStreak = habit.streak + 1;
      } else {
        newStreak = 1;
      }
      newLastCompleted = today;
    } else {
      newStreak = habit.streak;
      newLastCompleted = habit.lastCompleted;
    }
    const updated = { ...habit, streak: newStreak, lastCompleted: newLastCompleted };
    update(updated);
    setHabits((prev) => prev.map((h) => (h.id === habit.id ? updated : h)));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const habit = {
      name: newName.trim(),
      description: newDesc.trim(),
      createdAt: today,
      streak: 0,
      lastCompleted: null,
      isActive: true,
    };
    const id = insert(habit);
    setHabits((prev) => [...prev, { ...habit, id }]);
    setNewName("");
    setNewDesc("");
  };

  return (
    <main style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Habit Tracker</h1>
      <section aria-label="Add new habit" style={{ marginBottom: "1rem" }}>
        <form onSubmit={handleAdd} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label>
            Habit Name:
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              aria-label="Habit name"
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              aria-label="Habit description"
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
          <button type="submit" aria-label="Add habit" style={{ width: "fit-content" }}>
            Add Habit
          </button>
        </form>
      </section>
      <section aria-label="Habit list">
        {habits.length === 0 ? (
          <p>No habits yet. Add one above.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {habits.map((habit) => (
              <li key={habit.id} style={{ marginBottom: "0.75rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="checkbox"
                    checked={habit.lastCompleted === today}
                    onChange={() => handleToggle(habit)}
                    aria-label={`Mark ${habit.name} as done for today`}
                  />
                  <span style={{ fontWeight: "bold" }}>{habit.name}</span>
                  {habit.streak > 0 && (
                    <span style={{ marginLeft: "0.5rem", color: "#555" }}>
                      Streak: {habit.streak}
                    </span>
                  )}
                </label>
                {habit.description && (
                  <p style={{ margin: "0.25rem 0 0 1.5rem", fontSize: "0.9rem", color: "#333" }}>
                    {habit.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
