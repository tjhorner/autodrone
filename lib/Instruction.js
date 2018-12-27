class Instruction {
  constructor(command, parameters, program) {
    this.command = command
    this.parameters = parameters
    this.program = program
  }

  async run() {
    console.log(`  ${this.command} ${this.parameters.join(" ")}`)

    return new Promise((resolve, reject) => {
      switch(this.command) {
        // Enable drone comms
        case "ENABLE":
          this.program.drone.enable()
          resolve()
          break
        // Disable drone comms
        case "DISABLE":
          this.program.drone.disable()
          resolve()
          break
        // Auto takeoff/land
        case "TAKEOFF":
        case "LAND":
          this.program.drone.takeOff()
          resolve()
          break
        // Wait x milliseconds
        case "WAIT":
          setTimeout(() => {
            resolve()
          }, parseInt(this.parameters[0]))
          break
        // Move up/down/left/right/forward/backward
        case "MOVE":
          switch(this.parameters[0]) {
            case "UP":
              var prop = "throttle"
              var sign = "pos"
              break
            case "DOWN":
              var prop = "throttle"
              var sign = "neg"
              break
            case "LEFT":
              var prop = "leftRight"
              var sign = "neg"
              break
            case "RIGHT":
              var prop = "leftRight"
              var sign = "pos"
              break
            case "FORWARD":
              var prop = "forwardBackward"
              var sign = "pos"
              break
            case "BACKWARD":
              var prop = "forwardBackward"
              var sign = "neg"
              break
          }

          if(sign === "pos")
            this.program.drone[prop] = 128 + parseInt(this.parameters[1])
          else
            this.program.drone[prop] = 128 - parseInt(this.parameters[1])

          setTimeout(() => {
            this.program.drone[prop] = 128
            resolve()
          }, parseInt(this.parameters[2]))
          break
        // Turn left/right
        case "TURN":
          if(this.parameters[0] === "RIGHT")
            this.program.drone.turn = 128 + parseInt(this.parameters[1])
          else
            this.program.drone.turn = 128 - parseInt(this.parameters[1])

          setTimeout(() => {
            this.program.drone.turn = 128
            resolve()
          }, parseInt(this.parameters[2]))
          break
        default:
          console.log(`Unknown command: ${this.command}`)
          break
      }
    })
  }
}

module.exports = Instruction