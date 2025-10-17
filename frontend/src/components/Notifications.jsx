import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DemoNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [started, setStarted] = useState(false);
  const audioRef = useRef(null);

  // Demo notifications
  const demoNotifications = [
    { type: "job", message: "New job recommended: Frontend Developer at TechNova" },
    { type: "job", message: "New job recommended: Backend Engineer at CloudEdge" },
    { type: "message", message: "HR sent you a message regarding your application" },
  ];

  // Function to add a notification
  const addNotification = (notif) => {
    const newNotif = { ...notif, id: Date.now(), read: false };
    setNotifications((prev) => [newNotif, ...prev]);
    setUnreadCount((prev) => prev + 1);

    // Play sound after user interaction
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => console.log("Audio blocked"));
    }

    toast.info(notif.message, {
      position: "top-right",
      autoClose: 5000,
    });
  };

  // Start demo notifications (after user clicks "Start Demo")
  const startDemo = () => {
    setStarted(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < demoNotifications.length) {
        addNotification(demoNotifications[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <div className="px-6 py-6 max-w-xl mx-auto">
      <audio ref={audioRef} src="/notification-sound.mp3" preload="auto" />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Demo Notifications</h2>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
          >
            Mark all read ({unreadCount})
          </button>
        )}
      </div>

      {!started && (
        <div className="text-center mb-4">
          <button
            onClick={startDemo}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Start Demo Notifications
          </button>
        </div>
      )}

      <ul className="space-y-2 max-h-96 overflow-y-auto">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className={`p-3 rounded-lg border ${
              notif.read ? "bg-gray-100 border-gray-300" : "bg-blue-50 border-blue-300"
            }`}
          >
            <span className="font-medium">
              {notif.type === "job" ? "Job Alert: " : "Message: "}
            </span>
            {notif.message}
          </li>
        ))}
        {notifications.length === 0 && <p className="text-gray-500">No notifications yet.</p>}
      </ul>

      <ToastContainer />
    </div>
  );
}
