import axios from "axios"

export const SKILL_INDEX_URL =
  "https://raw.githubusercontent.com/thanhdanhniit/company-ai-skills/main/index.json"

export async function fetchSkillIndex() {
  const res = await axios.get(SKILL_INDEX_URL)
  return res.data
}

export function getSkillRawUrl(path) {
  return `https://raw.githubusercontent.com/thanhdanhniit/company-ai-skills/main/${path}`
}