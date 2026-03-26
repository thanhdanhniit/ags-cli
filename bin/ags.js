#!/usr/bin/env node

import { Command } from "commander"
import { installSkill } from "../lib/install.js"
import { listSkills } from "../lib/list.js"

const program = new Command()

program
  .name("ags")
  .description("Antigravity Skill Manager")

program
  .command("install")
  .argument("<skillName>")
  .description("Install a skill")
  .action(installSkill)

program
  .command("list")
  .description("List available skills")
  .action(listSkills)

program.parse()