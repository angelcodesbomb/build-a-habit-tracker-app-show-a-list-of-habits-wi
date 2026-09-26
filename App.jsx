import React, { useState, useEffect } from "react";
import { getAll, insert, update } from "./lib/db.js";

export default function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    const data = await getAll();
    setHabits(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    await insert({ name: newHabit.trim(), streak: 0, lastCompleted: null });
    setNewHabit("");
    loadHabits();
  };

  const handleToggle = async (habit) => {
    const today = new Date().toISOString().split("T")[0];
    let newStreak = habit.streak;
    if (habit.lastCompleted !== today) {
      newStreak = habit.streak + 1;
    }
    await update(habit.id, { streak: newStreak, lastCompleted: today });
    loadHabits();
  };

  return (
    <main style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Habit Tracker</h1>
      <form onSubmit={handleAdd} style={{ marginBottom: "1rem" }}>
        <label htmlFor="habitInput" style={{ marginRight: "0.5rem" }}>
          New Habit:
        </label>
        <input
          id="habitInput"
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          aria-label="New habit name"
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit" aria-label="Add habit">
          Add
        </button>
      </form>
      <section>
        {habits.map((h) => (
          <article
            key={h.id}
            style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}
          >
            <input
              type="checkbox"
              checked={h.lastCompleted === new Date().toISOString().split("T")[0]}
              onChange={() => handleToggle(h)}
              aria-label={`Mark ${h.name} as done`}
              style={{ marginRight: "0.5rem" }}
            />
            <span style={{ flexGrow: 1 }}>{h.name}</span>
            <span style={{ marginLeft: "0.5rem" }}>Streak: {h.streak}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
