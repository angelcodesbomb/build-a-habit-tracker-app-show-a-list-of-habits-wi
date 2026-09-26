import React, { useState } from "react";

export default function AddHabitForm({ onAdd }) {
  const [name, setName] = useState("");

  const styles = {
    form: {
      display: "flex",
      gap: "8px",
      marginBottom: "20px",
    },
    input: {
      flex: 1,
      padding: "10px 12px",
      fontSize: "15px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      outline: "none",
    },
    button: {
      padding: "10px 18px",
      fontSize: "15px",
      fontWeight: 600,
      color: "#ffffff",
      background: "#16a34a",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
  };

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setName("");
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit} aria-label="Add a new habit">
      <input
        type="text"
        style={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Meditate for 10 minutes"
        aria-label="New habit name"
      />
      <button type="submit" style={styles.button} aria-label="Add habit">
        + Add
      </button>
    </form>
  );
}
