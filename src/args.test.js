import test from 'ava'
import chalkString from 'chalk-string'
import { each } from 'test-each'

const addStyles = chalkString({ colors: true })

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
