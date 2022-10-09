import ansiStyles from 'ansi-styles'
import test from 'ava'
import chalkString from 'chalk-string'
import hasAnsi from 'has-ansi'
import { each } from 'test-each'

import { STYLES } from './helpers/main.js'

const addStyle = chalkString({ colors: true })
const addNoStyle = chalkString({ colors: false })

const hasStyle = function (string, style) {
  return string.includes(ansiStyles[style].open)
}

each([true, { colors: 0 }, { stream: true }], ({ title }, opts) => {
  test(`Validate options | ${title}`, (t) => {
    t.throws(chalkString.bind(undefined, opts))
  })
})

test('Can apply single style without arguments', (t) => {
  t.true(hasStyle(addStyle('red', 'test'), 'red'))
})

test('Can apply "visible" style', (t) => {
  t.is(addNoStyle('visible', 'test'), '')
})

each(STYLES, ({ title }, style) => {
  test(`Can apply any styles | ${title}`, (t) => {
    t.true(hasAnsi(addStyle(style, 'test')))
  })
})

test('Can apply multiple styles', (t) => {
  const string = addStyle('red bold', 'test')
  t.true(hasStyle(string, 'red'))
  t.true(hasStyle(string, 'bold'))
})

test('Trim style', (t) => {
  t.true(hasStyle(addStyle(' red ', 'test'), 'red'))
})

test('Does not allow non-existing styles', (t) => {
  t.throws(() => addStyle('doesNotExist', 'test'), { message: /is unknown/u })
})

test('Does not allow non-string styles', (t) => {
  t.throws(() => addStyle(true, 'test'), { message: /must be a string/u })
})

test('Does not allow arguments with some styles', (t) => {
  t.throws(() => addStyle('red-255', 'test'), { message: /No arguments/u })
})

test('Ignores multiple arguments', (t) => {
  t.false(addStyle('red', 'one', 'two').includes('two'))
})

test('Does not allow non-string arguments', (t) => {
  t.throws(() => addStyle('red', true), {
    message: /Argument must be a string/u,
  })
})
