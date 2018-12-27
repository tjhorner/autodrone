const EventEmitter = require('events')
const Instruction = require('./Instruction')

class Program extends EventEmitter {
  constructor(drone) {
    super()
    this._currentInstruction = 0
    this.instructions = [ ]
    this.drone = drone
  }

  run() {
    this.nextInstruction()
  }

  async nextInstruction() {
    await this.instructions[this._currentInstruction].run()

    if(this.instructions.length - 1 === this._currentInstruction) {
      this._currentInstruction = 0
      this.emit("done")
    } else {
      this._currentInstruction++
      this.nextInstruction()
    }
  }

  static parse(text, drone) {
    const lines = text.split("\n")
    const program = new Program(drone)

    lines.forEach(line => {
      var lineSplit = line.split(" ")

      if(lineSplit.indexOf("#") !== -1)
        lineSplit = lineSplit.slice(0, lineSplit.indexOf("#"))
      
      const command = lineSplit[0]
      const parameters = lineSplit.slice(1, lineSplit.length)

      program.instructions.push(new Instruction(command, parameters, program))
    })
    
    return program
  }
}

module.exports = Program