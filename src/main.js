import colorsOption from 'colors-option'
import isPlainObj from 'is-plain-obj'

import { ARGS_METHODS } from './args.js'

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

  return method in ARGS_METHODS
    ? getArgsChalkMethod(chalk, method, args)
    : getNoArgsChalkMethod(chalk, method, args)
}

const ARGS_SEPARATOR = '-'

// Chalk method which receives arguments, e.g. `chalk.rgb(...)(string)`.
// We need to make sure `this` is `chalk` when calling the method.
const getArgsChalkMethod = function (chalk, method, args) {
  const argsA = ARGS_METHODS[method](args, method)
  return chalk[method](...argsA)
}

// Chalk method which does not receive any arguments, e.g. `chalk.red(string)`
const getNoArgsChalkMethod = function (chalk, method, args) {
  if (args.length !== 0) {
    throw new TypeError(`No arguments "${args[0]}" allowed with "${method}"`)
  }

  return chalk[method]
}
