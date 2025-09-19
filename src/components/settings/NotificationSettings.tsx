import React from "react";

export default function NotificationSettings() {
  const [emailNotif, setEmailNotif] = React.useState(true);
  const [pushNotif, setPushNotif] = React.useState(false);

  return (
    <div>
      <h2 className="font-semibold mb-2">Notifications</h2>
      <div className="flex flex-col gap-2">
        <label>
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={e => setEmailNotif(e.target.checked)}
          />
          Email Notifications
        </label>
        <label>
          <input
            type="checkbox"
            checked={pushNotif}
            onChange={e => setPushNotif(e.target.checked)}
          />
          Push Notifications
        </label>
      </div>
    </div>
  );
      }
