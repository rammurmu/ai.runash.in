import React from "react";

export default function PersonalizationSettings({ theme, setTheme, accentColor, setAccentColor }) {
  return (
    <div>
      <h2 className="font-semibold mb-2">Personalization</h2>
      <div>
        <label>Theme</label>
        <select value={theme} onChange={e => setTheme(e.target.value)}>
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div>
        <label>Accent Color</label>
        <select value={accentColor} onChange={e => setAccentColor(e.target.value)}>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="green">Green</option>
          <option value="orange">Orange</option>
        </select>
      </div>
    </div>
  );
        }
