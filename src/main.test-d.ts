import { stderr } from 'node:process'

import chalkString, { type Options, type Styles } from 'chalk-string'
import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

chalkString('red', {})
expectAssignable<Options>({})

chalkString('red', { colors: true })
expectAssignable<Options>({ colors: true })
chalkString('red', { colors: undefined })
expectAssignable<Options>({ colors: undefined })
// @ts-expect-error
chalkString('red', { colors: 1 })
expectNotAssignable<Options>({ colors: 1 })

chalkString('red', { stream: stderr })
expectAssignable<Options>({ stream: stderr })
// @ts-expect-error
chalkString('red', { stream: true })
expectNotAssignable<Options>({ stream: true })

// @ts-expect-error
chalkString()
// @ts-expect-error
chalkString(true)
// @ts-expect-error
chalkString('unknown')
// @ts-expect-error
chalkString('red', true)
// @ts-expect-error
chalkString('red', {}, true)

const addStyles = chalkString('red')
expectType<string>(addStyles('input'))
// @ts-expect-error
addStyles()
// @ts-expect-error
addStyles(true)
// @ts-expect-error
addStyles('input', true)

expectAssignable<Styles>('red')
expectAssignable<Styles>('red blue')
expectAssignable<Styles>('bold')
expectAssignable<Styles>('redBright')
expectAssignable<Styles>('bgRed')
expectAssignable<Styles>('bgRedBright')
expectAssignable<Styles>('hex-ffffff')
expectAssignable<Styles>('bgHex-ffffff')
expectAssignable<Styles>('rgb-10-10-10')
expectAssignable<Styles>('bgRgb-10-10-10')
expectNotAssignable<Styles>('other')
expectNotAssignable<Styles>('hex')
expectNotAssignable<Styles>('rgb-a-a-a')
expectNotAssignable<Styles>('rgb-10-10')
