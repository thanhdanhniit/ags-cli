import chalk from "chalk"
import { fetchSkillIndex } from "./utils.js"

export async function listSkills() {

  const index = await fetchSkillIndex()

  console.log(chalk.blue("\nAvailable Skills:\n"))

  index.skills.forEach(skill => {
    console.log(`${skill.name} (${skill.category})`)
  })

  console.log("")
}