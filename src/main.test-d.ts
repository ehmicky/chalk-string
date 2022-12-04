import { expectType, expectAssignable, expectNotAssignable } from 'tsd'

import chalkString, { Options, Styles } from 'chalk-string'

const addStyles = chalkString()
chalkString({})
expectAssignable<Options>({})

chalkString({ colors: true })
expectAssignable<Options>({ colors: true })
chalkString({ colors: undefined })
expectAssignable<Options>({ colors: undefined })
// @ts-expect-error
chalkString({ colors: 1 })
expectNotAssignable<Options>({ colors: 1 })

chalkString({ stream: process.stderr })
expectAssignable<Options>({ stream: process.stderr })
// @ts-expect-error
chalkString({ stream: true })
expectNotAssignable<Options>({ stream: true })

expectType<string>(addStyles('red', 'input'))
// @ts-expect-error
addStyles()
// @ts-expect-error
addStyles(true)
// @ts-expect-error
addStyles('unknown')
// @ts-expect-error
addStyles('red')
// @ts-expect-error
addStyles('red', true)

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
