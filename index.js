#!/usr/bin/env node
(async () => {
  const { Drone } = require('dronelib')
  const fs = require('fs')
  const path = require('path')
  const Program = require('./lib/Program')
  const { promisify } = require('util')
  const file = process.argv.slice(2)[0]

  if(!file) {
    console.error("Usage: autodrone [file]\n       Runs the specified file.")
    process.exit(0)
  }

  const filename = path.join(process.cwd(), file)

  const stat = promisify(fs.stat)
  const readFile = promisify(fs.readFile)

  try {
    await stat(filename)
  } catch(e) {
    console.error(`File not found: ${filename}`)
    process.exit(1)
  }

  const text = (await readFile(filename)).toString()
  const drone = new Drone()

  const program = Program.parse(text, drone)
  console.log(`Loaded program ${file} with ${program.instructions.length} instructions...`)
  console.log("Running program...")
  program.run()
  
  program.on("done", () => {
    process.exit(0)
  })
})()