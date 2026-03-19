#!/usr/bin/env node
import pc from 'picocolors'
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, cpSync } from 'node:fs'
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const VALID_NAME_REGEX = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/

async function main() {
  const args = process.argv.slice(2)
  const projectName = args.find((a) => !a.startsWith('--')) ?? 'my-gardener-app'
  const useExamples = args.includes('--examples')

  // Validate project name
  if (!VALID_NAME_REGEX.test(projectName)) {
    console.error(pc.red(`✖ Invalid project name: "${projectName}"`))
    console.error(pc.dim('  Project name must be a valid npm package name'))
    process.exit(1)
  }

  const TEMPLATE_DIR = resolve(__dirname, useExamples ? './templates/full' : './templates/minimal')
  const templateLabel = useExamples
    ? 'Full FSD Gardener Planner (with examples)'
    : 'Minimal FSD starter (auth + shared UI)'

  // Welcome
  console.log()
  console.log(pc.green(pc.bold('  🌱 Creating FSD Gardener Planner')))
  console.log()
  console.log(pc.cyan(`  Mode:     ${templateLabel}`))
  console.log(pc.cyan(`  Project:  ${projectName}`))
  console.log()

  try {
    // Copy template
    console.log(pc.dim('  ⏳ Copying template...'))
    const dest = resolve(process.cwd(), projectName)
    cpSync(TEMPLATE_DIR, dest, { recursive: true })

    // Update package.json name
    console.log(pc.dim('  ⏳ Configuring project...'))
    const pkgPath = join(dest, 'package.json')
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
    pkg.name = projectName
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

    // Install dependencies
    console.log(pc.dim('  ⏳ Installing dependencies...'))
    try {
      execSync('pnpm install', { cwd: dest, stdio: 'inherit' })
    } catch {
      console.log(pc.yellow('  ⚠ pnpm not found, trying npm...'))
      execSync('npm install', { cwd: dest, stdio: 'inherit' })
    }

    // Success message
    console.log()
    console.log(pc.green(pc.bold('  ✓ Project created successfully!')))
    console.log()
    if (useExamples) {
      console.log(pc.cyan('  Includes: Leaflet map, todo CRUD, FSD entity examples'))
    } else {
      console.log(pc.cyan('  Includes: Auth pages, shared Button + Layout, empty FSD layers'))
      console.log(pc.dim('  Tip: run with --examples to scaffold the full gardener planner'))
    }
    console.log()
    console.log(pc.cyan('  Next steps:'))
    console.log(pc.dim(`    cd ${projectName}`))
    console.log(pc.dim('    pnpm dev'))
    console.log()
  } catch (error) {
    console.error(pc.red(`✖ Error: ${error instanceof Error ? error.message : 'Unknown error'}`))
    process.exit(1)
  }
}

main()
