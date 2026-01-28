import fs from "fs";

const FILE = "notified.json";

export function loadNotified() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
}

export function saveNotified(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}
