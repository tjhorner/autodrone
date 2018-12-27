# autodrone

**This is beta software!** Everything is subject to change. If you do use this, please make sure you lock to a specific version so there are no breaking changes randomly.

A simple command-line tool utilizing `dronelib` to automate drone flights with a simple scripting language.

## Usage

```
autodrone [file]
  Runs the specified `file`.
```

## Example

```
ENABLE               # Open communication with the drone
WAIT 500             # Make sure the drone is ready
TAKEOFF              # Tell the drone to perform auto take-off
WAIT 3000            # Wait 3 seconds
MOVE FORWARD 126 500 # Move the drone forward at full speed for 0.5 sec
TURN RIGHT 126 500   # Rotate the drone clockwise at full speed for 0.5 sec
MOVE DOWN 126 1000   # Move the drone down at full speed for 1 sec
LAND                 # Tell the drone to attempt to land
DISABLE              # Close communications with the drone
```

## Language Commands

### `ENABLE`

**This will likely be removed in a future version.** This doesn't seem suitable to be controlled from a script -- it should be handled automatically before the script even runs.

You should call this before performing any other commands. It opens communication with the drone.

### `DISABLE`

**This will likely be removed in a future version.** This doesn't seem suitable to be controlled from a script -- it should be handled automatically before the script even runs.

This closes communication with the drone.

### `WAIT [time]`

Wait `time` milliseconds before performing the next command.

### `TAKEOFF` / `LAND`

Tell the drone to attempt auto take-off or landing.

### `MOVE [direction] [speed] [time]`

Moves the drone in `direction` at `speed` for `time` milliseconds, where `direction` is one of:

- `FORWARD`
- `BACKWARD`
- `LEFT`
- `RIGHT`
- `UP`
- `DOWN`

Speed ranges from 0 to 126.

### `TURN [direction] [speed] [time]`

Turns the drone in `direction` at `speed` for `time` milliseconds, where `direction` is one of:

- `LEFT` (counter-clockwise)
- `RIGHT` (clockwise)

Speed ranges from 0 to 126.

## License

This software is licensed under the GNU GPL v3.