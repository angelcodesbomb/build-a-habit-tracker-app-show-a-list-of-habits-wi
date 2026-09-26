import React, { useState, useEffect } from "react";
import { getAll, insert, update } from "./lib/db.js";

export default function App() {
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState("");

  const today = new Date().toISOString().split("T")[0];

  async function loadHabits() {
    const data = await getAll("habits");
    setHabits(data || []);
  }

  useEffect(() => {
    loadHabits();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    await insert("habits", {
      name: newHabitName.trim(),
      streak: 0,
      lastCompleted: null,
    });
    setNewHabitName("");
    loadHabits();
  }

  async function toggleHabit(id, currentStreak, lastCompleted) {
    const isToday = lastCompleted === today;
    const newStreak = isToday ? currentStreak : currentStreak + 1;
    await update("habits", id, {
      streak: newStreak,
      lastCompleted: today,
    });
    loadHabits();
  }

  return (
    <main style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Habit Tracker</h1>
      <form onSubmit={handleAdd} style={{ marginBottom: "1rem" }}>
        <label htmlFor="new-habit" style={{ marginRight: "0.5rem" }}>
          New Habit:
        </label>
        <input
          id="new-habit"
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="Enter habit name"
          aria-label="New habit name"
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit" aria-label="Add habit">
          Add
        </button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {habits.map((habit) => {
          const isCompletedToday = habit.lastCompleted === today;
          return (
            <li
              key={habit.id}
              style={{ marginBottom: "0.5rem", display: "flex", alignItems: "center" }}
            >
              <input
                type="checkbox"
                checked={isCompletedToday}
                onChange={() =>
                  toggleHabit(habit.id, habit.streak, habit.lastCompleted)
                }
                aria-label={
                  `Mark ${habit.name} as ${isCompletedToday ? "not" : "completed"} today`
                }
                style={{ marginRight: "0.5rem" }}
              />
              <span style={{ flexGrow: 1 }}>
                {habit.name} (Streak: {habit.streak})
              </span>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
