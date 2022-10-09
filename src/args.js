// Validate and normalize `rgb-*` style
const normalizeRgbArgs = function (args, method) {
  if (args.length !== 3) {
    throw new TypeError(
      `There must be 3 arguments with "${method}", not ${args.length}`,
    )
  }

  const argsA = args.map(Number)
  argsA.forEach((arg, index) => {
    validateRgbArg(arg, args[index], method)
  })
  return argsA
}

const validateRgbArg = function (arg, input, method) {
  if (!Number.isInteger(arg) || String(arg) !== input) {
    throw new TypeError(`Argument "${arg}" must be an integer with "${method}"`)
  }

  if (arg > MAX_RGB) {
    throw new TypeError(
      `Argument "${arg}" must be less than ${MAX_RGB} with "${method}"`,
    )
  }
}

const MAX_RGB = 255

const normalizeHexArgs = function (args, method) {
  if (args.length !== 1) {
    throw new TypeError(
      `There must be exactly one argument with "${method}", not ${args.length}`,
    )
  }

  if (args[0].includes('#')) {
    throw new TypeError(
      `Argument "${args[0]}" must not include # with "${method}"`,
    )
  }

  if (args[0].length !== 3 && args[0].length !== 6) {
    throw new TypeError(
      `Argument "${args[0]}" must have 3 or 6 characters with "${method}"`,
    )
  }

  if (!HEX_REGEXP.test(args[0])) {
    throw new TypeError(
      `Argument "${args[0]}" must be an hexadecimal string with "${method}"`,
    )
  }

  return args
}

const HEX_REGEXP = /^[a-f\d]{3,6}$/iu

// Those chalk methods must receive a dash-separated list of arguments
export const ARGS_METHODS = {
  rgb: normalizeRgbArgs,
  bgRgb: normalizeRgbArgs,
  hex: normalizeHexArgs,
  bgHex: normalizeHexArgs,
}
