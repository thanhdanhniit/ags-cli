import fs from "fs"

const LOCK_PATH = ".antigravity/skills.lock"

export function readLockFile() {
  if (!fs.existsSync(LOCK_PATH)) {
    return { skills: {} }
  }

  return JSON.parse(fs.readFileSync(LOCK_PATH))
}

export function writeLockFile(data) {
  fs.writeFileSync(LOCK_PATH, JSON.stringify(data, null, 2))
}