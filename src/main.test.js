import ansiStyles from 'ansi-styles'
import test from 'ava'
import chalkString from 'chalk-string'
import hasAnsi from 'has-ansi'
import { each } from 'test-each'

// All allowed styles
const STYLES = [
  'bold',
  'underline',
  'inverse',
  'reset',
  'dim',
  'italic',
  'hidden',
  'strikethrough',
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
  'blackBright',
  'redBright',
  'greenBright',
  'yellowBright',
  'blueBright',
  'magentaBright',
  'cyanBright',
  'whiteBright',
  'hex-ffffff',
  'hex-FFFFFF',
  'rgb-255-255-255',
  'bgBlack',
  'bgRed',
  'bgGreen',
  'bgYellow',
  'bgBlue',
  'bgMagenta',
  'bgCyan',
  'bgWhite',
  'bgGray',
  'bgBlackBright',
  'bgRedBright',
  'bgGreenBright',
  'bgYellowBright',
  'bgBlueBright',
  'bgMagentaBright',
  'bgCyanBright',
  'bgWhiteBright',
  'bgHex-ffffff',
  'bgHex-FFFFFF',
  'bgRgb-255-255-255',
]

const addStyles = (styles) => chalkString(styles, { colors: true })
const addNoStyles = (styles) => chalkString(styles, { colors: false })

const hasStyle = (string, style) => string.includes(ansiStyles[style].open)

each([true, { colors: 0 }, { stream: true }], ({ title }, opts) => {
  test(`Validate options | ${title}`, (t) => {
    t.throws(chalkString.bind(undefined, opts))
  })
})

test('Can apply single style without arguments', (t) => {
  t.true(hasStyle(addStyles('red')('test'), 'red'))
})

test('Can apply "visible" style', (t) => {
  t.is(addNoStyles('visible')('test'), '')
})

each(STYLES, ({ title }, style) => {
  test(`Can apply any styles | ${title}`, (t) => {
    t.true(hasAnsi(addStyles(style)('test')))
  })
})

test('Can apply multiple styles', (t) => {
  const string = addStyles('red bold')('test')
  t.true(hasStyle(string, 'red'))
  t.true(hasStyle(string, 'bold'))
})

test('Trim style', (t) => {
  t.true(hasStyle(addStyles(' red ')('test'), 'red'))
})

test('Does not allow non-existing styles', (t) => {
  t.throws(() => addStyles('doesNotExist')('test'), { message: /is unknown/u })
})

test('Does not allow non-string styles', (t) => {
  t.throws(() => addStyles(true)('test'), { message: /must be a string/u })
})

test('Does not allow arguments with some styles', (t) => {
  t.throws(() => addStyles('red-255')('test'), { message: /No arguments/u })
})

test('Ignores multiple arguments', (t) => {
  t.false(addStyles('red')('one', 'two').includes('two'))
})

test('Does not allow non-string arguments', (t) => {
  t.throws(() => addStyles('red')(true), {
    message: /Argument must be a string/u,
  })
})
