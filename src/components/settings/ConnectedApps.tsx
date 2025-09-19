import React from "react";

const dummyApps = [
  { name: "Google", linked: true },
  { name: "GitHub", linked: false },
];

export default function ConnectedApps() {
  const [apps, setApps] = React.useState(dummyApps);

  function toggleApp(index) {
    setApps(apps =>
      apps.map((app, i) =>
        i === index ? { ...app, linked: !app.linked } : app
      )
    );
  }

  return (
    <div>
      <h2 className="font-semibold mb-2">Connected Apps</h2>
      <ul>
        {apps.map((app, idx) => (
          <li key={app.name} className="flex items-center justify-between mb-2">
            <span>{app.name}</span>
            <button
              className={`px-2 py-1 rounded ${app.linked ? 'bg-red-500' : 'bg-green-500'} text-white`}
              onClick={() => toggleApp(idx)}
            >
              {app.linked ? "Unlink" : "Link"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
            }
