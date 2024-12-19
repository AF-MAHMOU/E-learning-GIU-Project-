import React, { useState, useEffect } from "react";

export default function NotificationsPage() {
  const [response, setResponse] = useState<string>("");

  const apiUrl = "/api/notifications";

  const handleApi = async (method: string, endpoint: string, body?: any) => {
    try {
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notifications API</h1>
      <div>
        <button
          onClick={() =>
            handleApi("POST", "", {
              title: "Create Notification",
              content: "Notification has been created",
              userId: "12345",
            })
          }
        >
          Create Notification (Admin/Instructor)
        </button>
      </div>

      <div>
        <button onClick={() => handleApi("GET", "?userId=12345")}>
          Get Notifications (Admin/Instructor/Student)
        </button>
      </div>

      <div>
        <button onClick={() => handleApi("GET", "/notificationID")}>
          Get Notification by ID (Admin/Instructor/Student)
        </button>
      </div>

      <div>
        <button
          onClick={() =>
            handleApi("PUT", "/1", { 
              title: "Update Notifications",
              content: "Notification has been updated",
            })
          }
        >
          Update Notification (Admin Only)
        </button>
      </div>

      <div>
        <button onClick={() => handleApi("DELETE", "/notificationID")}>
          Delete Notification (Admin Only)
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>API Response</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
}