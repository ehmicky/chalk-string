import colorsOption from 'colors-option'
import isPlainObj from 'is-plain-obj'

// Thin wrapper around `chalk` which adds support for specifying styles as
// strings
export default function chalkString(opts = {}) {
  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }

  const chalk = colorsOption(opts)
  return addStyles.bind(undefined, chalk)
}

const addStyles = function (chalk, styles, string) {
  if (typeof styles !== 'string') {
    throw new TypeError(`Styles must be a string, not: ${styles}`)
  }

  if (typeof string !== 'string') {
    throw new TypeError(`Argument must be a string, not: ${string}`)
  }

  const chalkMethod = styles
    .trim()
    .split(STYLE_SEPARATOR)
    .reduce(useChalkMethod, chalk)
  return chalkMethod(string)
}

const STYLE_SEPARATOR = /\s+/u

// Parse a space-separated list of dash-separated methods like:
//   "method otherMethod[-arg-otherArg-...] ..."
const useChalkMethod = function (chalk, style) {
  const [method, ...args] = style.split(ARGS_SEPARATOR)

  if (typeof chalk[method] !== 'function') {
    throw new TypeError(`Style "${style}" is unknown.`)
  }

  const normalizeArgs = ARGS_METHODS[method]
  return normalizeArgs === undefined
    ? getNoArgsChalkMethod(chalk, method, args)
    : getArgsChalkMethod({ chalk, method, args, normalizeArgs })
}

const ARGS_SEPARATOR = '-'

// Chalk method which does not receive any arguments, e.g. `chalk.red(string)`
const getNoArgsChalkMethod = function (chalk, method, args) {
  if (args.length !== 0) {
    throw new TypeError(`No arguments "${args[0]}" allowed with "${method}"`)
  }

  return chalk[method]
}

// Chalk method which receives arguments, e.g. `chalk.rgb(...)(string)`.
// We need to make sure `this` is `chalk` when calling the method.
const getArgsChalkMethod = function ({ chalk, method, args, normalizeArgs }) {
  const argsA = normalizeArgs(args, method)
  return chalk[method](...argsA)
}

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

const normalizeIdentityArgs = function (args) {
  return args
}

// Those chalk methods must receive a dash-separated list of arguments
const ARGS_METHODS = {
  rgb: normalizeRgbArgs,
  bgRgb: normalizeRgbArgs,
  hex: normalizeIdentityArgs,
  bgHex: normalizeIdentityArgs,
}
