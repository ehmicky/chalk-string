import ansiStyles from 'ansi-styles'
import test from 'ava'
import chalkString from 'chalk-string'
import hasAnsi from 'has-ansi'
import { each } from 'test-each'

import { STYLES } from './helpers/main.js'

const addStyles = chalkString({ colors: true })
const addNoStyles = chalkString({ colors: false })

const hasStyle = function (string, style) {
  return string.includes(ansiStyles[style].open)
}

each([true, { colors: 0 }, { stream: true }], ({ title }, opts) => {
  test(`Validate options | ${title}`, (t) => {
    t.throws(chalkString.bind(undefined, opts))
  })
})

test('Can apply single style without arguments', (t) => {
  t.true(hasStyle(addStyles('red', 'test'), 'red'))
})

test('Can apply "visible" style', (t) => {
  t.is(addNoStyles('visible', 'test'), '')
})

each(STYLES, ({ title }, style) => {
  test(`Can apply any styles | ${title}`, (t) => {
    t.true(hasAnsi(addStyles(style, 'test')))
  })
})

test('Can apply multiple styles', (t) => {
  const string = addStyles('red bold', 'test')
  t.true(hasStyle(string, 'red'))
  t.true(hasStyle(string, 'bold'))
})

test('Trim style', (t) => {
  t.true(hasStyle(addStyles(' red ', 'test'), 'red'))
})

test('Does not allow non-existing styles', (t) => {
  t.throws(() => addStyles('doesNotExist', 'test'), { message: /is unknown/u })
})

test('Does not allow non-string styles', (t) => {
  t.throws(() => addStyles(true, 'test'), { message: /must be a string/u })
})

test('Does not allow arguments with some styles', (t) => {
  t.throws(() => addStyles('red-255', 'test'), { message: /No arguments/u })
})

each(['rgb', 'rgb-0', 'rgb-0-0', 'rgb-0-0-0-0'], ({ title }, styles) => {
  test(`Validate rgb-* arguments count | ${title}`, (t) => {
    t.throws(addStyles.bind(undefined, styles, 'test'), {
      message: /3 arguments/u,
    })
  })
})

each(
  ['rgb-0-0-a', 'rgb-0-0-', 'rgb-0-0-.0', 'rgb-0-0-0.5'],
  ({ title }, styles) => {
    test(`Validate rgb-* arguments | ${title}`, (t) => {
      t.throws(addStyles.bind(undefined, styles, 'test'), {
        message: /must be an integer/u,
      })
    })
  },
)

test('Validate rgb-* arguments range', (t) => {
  t.throws(addStyles.bind(undefined, 'rgb-0-0-256', 'test'), {
    message: /must be less/u,
  })
})

each(['hex', 'hex-0-0'], ({ title }, styles) => {
  test(`Validate hex-* arguments count | ${title}`, (t) => {
    t.throws(addStyles.bind(undefined, styles, 'test'), {
      message: /one argument/u,
    })
  })
})

test('Validate hex-* argument hash', (t) => {
  t.throws(addStyles.bind(undefined, 'hex-#ffffff', 'test'), { message: /#/u })
})

each(['hex-ff', 'hex-'], ({ title }, styles) => {
  test(`Validate hex-* argument length | ${title}`, (t) => {
    t.throws(addStyles.bind(undefined, styles, 'test'), { message: /3 or 6/u })
  })
})

test('Validate hex-* argument characters', (t) => {
  t.throws(addStyles.bind(undefined, 'hex-ff__ff', 'test'), {
    message: /hexadecimal/u,
  })
})

test('Ignores multiple arguments', (t) => {
  t.false(addStyles('red', 'one', 'two').includes('two'))
})

test('Does not allow non-string arguments', (t) => {
  t.throws(() => addStyles('red', true), {
    message: /Argument must be a string/u,
  })
})
