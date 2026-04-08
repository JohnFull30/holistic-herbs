// src/deviceId.js
export function getDeviceId() {
  const key = "countdown_device_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto?.randomUUID?.() || String(Math.random()).slice(2) + Date.now();
    localStorage.setItem(key, id);
  }
  return id;
}
