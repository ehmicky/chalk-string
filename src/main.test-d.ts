import {
  expectType,
  expectAssignable,
  expectNotAssignable,
  expectError,
} from 'tsd'

import chalkString, { Options, Styles } from './main.js'

const chalk = chalkString()
chalkString({})
expectAssignable<Options>({})

chalkString({ colors: true })
expectAssignable<Options>({ colors: true })
chalkString({ colors: undefined })
expectAssignable<Options>({ colors: undefined })
expectError(chalkString({ colors: 1 }))
expectNotAssignable<Options>({ colors: 1 })

chalkString({ stream: process.stderr })
expectAssignable<Options>({ stream: process.stderr })
expectError(chalkString({ stream: true }))
expectNotAssignable<Options>({ stream: true })

expectType<string>(chalk('red', 'input'))
expectError(chalk())
expectError(chalk(true))
expectError(chalk('unknown'))
expectError(chalk('red'))
expectError(chalk('red', true))

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
