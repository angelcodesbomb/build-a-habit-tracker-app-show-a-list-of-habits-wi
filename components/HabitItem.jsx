import React from "react";

export default function HabitItem({ habit, onToggle, onDelete }) {
  const done = habit.streak > 0;

  const styles = {
    row: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 16px",
      borderBottom: "1px solid #e5e7eb",
      background: done ? "#f0fdf4" : "#ffffff",
    },
    checkbox: {
      width: "24px",
      height: "24px",
      cursor: "pointer",
      accentColor: "#16a34a",
      flexShrink: 0,
    },
    name: {
      flex: 1,
      fontSize: "16px",
      color: done ? "#166534" : "#1f2937",
      textDecoration: done ? "line-through" : "none",
      fontWeight: 500,
    },
    streak: {
      fontSize: "13px",
      color: "#6b7280",
      background: "#f3f4f6",
      padding: "4px 10px",
      borderRadius: "999px",
      whiteSpace: "nowrap",
    },
    deleteBtn: {
      background: "transparent",
      border: "none",
      color: "#ef4444",
      cursor: "pointer",
      fontSize: "14px",
      padding: "4px 8px",
      borderRadius: "6px",
    },
  };

  return (
    <li style={styles.row}>
      <input
        type="checkbox"
        style={styles.checkbox}
        checked={done}
        onChange={() => onToggle(habit.id)}
        aria-label={done ? "Mark " + habit.name + " as not done" : "Mark " + habit.name + " as done"}
      />
      <span style={styles.name}>{habit.name}</span>
      <span style={styles.streak} aria-label="Streak of " + habit.streak + " days">
        🔥 {habit.streak} day{habit.streak === 1 ? "" : "s"}
      </span>
      <button
        type="button"
        style={styles.deleteBtn}
        onClick={() => onDelete(habit.id)}
        aria-label={"Delete habit " + habit.name}
      >
        ✕
      </button>
    </li>
  );
}
