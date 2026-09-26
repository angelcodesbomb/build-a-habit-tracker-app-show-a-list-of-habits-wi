import React, { useState, useCallback } from "react";
import { getAll, insert, update, remove } from "./lib/db.js";
import HabitItem from "./components/HabitItem.jsx";
import AddHabitForm from "./components/AddHabitForm.jsx";

export default function App() {
  const [habits, setHabits] = useState(() => getAll());

  const refresh = useCallback(() => {
    setHabits(getAll());
  }, []);

  const handleAdd = useCallback(
    (name) => {
      insert({ name, streak: 0 });
      refresh();
    },
    [refresh]
  );

  const handleToggle = useCallback(
    (id) => {
      const habit = habits.find((h) => h.id === id);
      if (!habit) return;
      const newStreak = habit.streak > 0 ? 0 : habit.streak + 1;
      update(id, { streak: newStreak });
      refresh();
    },
    [habits, refresh]
  );

  const handleDelete = useCallback(
    (id) => {
      remove(id);
      refresh();
    },
    [refresh]
  );

  const doneCount = habits.filter((h) => h.streak > 0).length;

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f9fafb",
      padding: "24px 16px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#1f2937",
    },
    container: {
      maxWidth: "560px",
      margin: "0 auto",
    },
    header: {
      marginBottom: "20px",
    },
    title: {
      fontSize: "28px",
      fontWeight: 700,
      margin: "0 0 6px 0",
      color: "#111827",
    },
    subtitle: {
      fontSize: "15px",
      color: "#6b7280",
      margin: 0,
    },
    progress: {
      fontSize: "14px",
      color: "#374151",
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "10px 14px",
      marginBottom: "16px",
    },
    list: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "10px",
      overflow: "hidden",
    },
    empty: {
      padding: "32px 16px",
      textAlign: "center",
      color: "#9ca3af",
      fontSize: "15px",
    },
  };

  return (
    <div style={styles.page}>
      <main style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Habit Tracker</h1>
          <p style={styles.subtitle}>Build better habits, one day at a time.</p>
        </header>

        <div style={styles.progress} role="status">
          {habits.length === 0
            ? "No habits yet. Add your first one below!"
            : doneCount + " of " + habits.length + " habits completed today."}
        </div>

        <AddHabitForm onAdd={handleAdd} />

        {habits.length === 0 ? (
          <div style={styles.empty}>Your list is empty. Start by adding a habit above.</div>
        ) : (
          <ul style={styles.list} aria-label="List of habits">
            {habits.map((habit) => (
              <HabitItem
                key={habit.id}
                habit={habit}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
