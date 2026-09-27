import React, { useState } from "react";

export default function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, doneToday: !h.doneToday } : h
      )
    );
  };

  const addHabit = (e) => {
    e.preventDefault();
    const trimmed = newHabit.trim();
    if (!trimmed) return;
    const habit = {
      id: Date.now(),
      name: trimmed,
      doneToday: false,
    };
    setHabits((prev) => [...prev, habit]);
    setNewHabit("");
  };

  return (
    <main style={styles.main}>
      <h1 style={styles.title}>Habit Tracker</h1>
      <section style={styles.section} aria-label="Habit list">
        {habits.length === 0 ? (
          <p style={styles.empty}>No habits yet. Add one below!</p>
        ) : (
          <ul style={styles.list}>
            {habits.map((habit) => (
              <li key={habit.id} style={styles.listItem}>
                <label style={styles.label}>
                  <input
                    type="checkbox"
                    checked={habit.doneToday}
                    onChange={() => toggleHabit(habit.id)}
                    aria-label={
                      habit.doneToday
                        ? `Mark ${habit.name} as not done today`
                        : `Mark ${habit.name} as done today`
                    }
                    style={styles.checkbox}
                  />
                  <span style={habit.doneToday ? styles.done : {}}>{habit.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section style={styles.section} aria-label="Add new habit">
        <form onSubmit={addHabit} style={styles.form}>
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="New habit"
            aria-label="Habit name"
            style={styles.input}
          />
          <button type="submit" style={styles.button} aria-label="Add habit">
            Add Habit
          </button>
        </form>
      </section>
    </main>
  );
}

const styles = {
  main: {
    fontFamily: "Arial, sans-serif",
    padding: "1rem",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  section: {
    marginBottom: "1.5rem",
  },
  empty: {
    textAlign: "center",
    color: "#555",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "0.75rem",
  },
  label: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  checkbox: {
    marginRight: "0.5rem",
    width: "1rem",
    height: "1rem",
  },
  done: {
    textDecoration: "line-through",
    color: "#888",
  },
  form: {
    display: "flex",
    gap: "0.5rem",
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};