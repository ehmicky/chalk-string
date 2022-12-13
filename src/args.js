// Validate and normalize `rgb-*` style
const normalizeRgbArgs = (args, method) => {
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

const validateRgbArg = (arg, input, method) => {
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

// Validate and normalize `hex-*` style
const normalizeHexArgs = (args, method) => {
  if (args.length !== 1) {
    throw new TypeError(
      `There must be exactly one argument with "${method}", not ${args.length}`,
    )
  }

  validateHexArg(args[0], method)
  return args
}

const validateHexArg = (arg, method) => {
  if (arg.includes('#')) {
    throw new TypeError(`Argument "${arg}" must not include # with "${method}"`)
  }

  if (!HEX_LENGTH.has(arg.length)) {
    throw new TypeError(
      `Argument "${arg}" must have 3 or 6 characters with "${method}"`,
    )
  }

  if (!HEX_REGEXP.test(arg)) {
    throw new TypeError(
      `Argument "${arg}" must be an hexadecimal string with "${method}"`,
    )
  }
}

// eslint-disable-next-line no-magic-numbers
const HEX_LENGTH = new Set([3, 6])
const HEX_REGEXP = /^[a-f\d]{3,6}$/iu

// Those chalk methods must receive a dash-separated list of arguments
export const ARGS_METHODS = {
  rgb: normalizeRgbArgs,
  bgRgb: normalizeRgbArgs,
  hex: normalizeHexArgs,
  bgHex: normalizeHexArgs,
}
