import fs from "fs"
import path from "path"
import axios from "axios"
import chalk from "chalk"
import { fetchSkillIndex } from "./utils.js"

const BASE_URL =
  "https://raw.githubusercontent.com/thanhdanhniit/company-ai-skills/main/"

const SKILL_DIR = ".antigravity/skills"
const LOCK_FILE = ".antigravity/skills.lock"

export async function installSkill(skillArg) {

  const [skillName, requestedVersion] = skillArg.split("@")

  const index = await fetchSkillIndex()

  const skill = index.skills.find(
    s => s.name.toLowerCase() === skillName.toLowerCase()
  )

  if (!skill) {
    console.log(chalk.red(`Skill ${skillName} not found`))
    return
  }

  const version = requestedVersion || skill.latest

  if (!skill.versions[version]) {
    console.log(chalk.red(`Version ${version} not found`))
    return
  }

  const skillPath = skill.versions[version]
  const url = BASE_URL + skillPath

  console.log(chalk.blue(`Installing ${skillName}@${version}`))

  const res = await axios.get(url)

  ensureDirectories()

  const targetFile = path.join(SKILL_DIR, `${skillName}.md`)
  fs.writeFileSync(targetFile, res.data)

  updateLockFile(skillName, version)

  console.log(chalk.green(`Installed ${skillName}@${version}`))
}

function ensureDirectories() {

  if (!fs.existsSync(".antigravity")) {
    fs.mkdirSync(".antigravity")
  }

  if (!fs.existsSync(SKILL_DIR)) {
    fs.mkdirSync(SKILL_DIR)
  }
}

function updateLockFile(skillName, version) {

  let lockData = { skills: {} }

  if (fs.existsSync(LOCK_FILE)) {
    lockData = JSON.parse(fs.readFileSync(LOCK_FILE))
  }

  lockData.skills[skillName] = version

  fs.writeFileSync(
    LOCK_FILE,
    JSON.stringify(lockData, null, 2)
  )
}