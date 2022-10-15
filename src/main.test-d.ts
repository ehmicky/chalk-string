import { expectType, expectAssignable } from 'tsd'

import chalkString, { Options } from './main.js'

expectType<object>(chalkString(true))

chalkString(true, {})
expectAssignable<Options>({})
