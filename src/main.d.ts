import type { Options as ColorsOptionOptions } from 'colors-option'

/**
 * Options of `chalk-string`
 */
export interface Options {
  /**
   * Whether colors should be enabled/disabled, regardless of terminal
   * support. Colors support is automatically detected, so this is only meant
   * to override that default behavior.
   *
   * @default undefined
   */
  readonly colors?: ColorsOptionOptions['colors']

  /**
   * Stream used to detect colors support.
   * This should be the file or terminal where the colors are output.
   *
   * @default process.stdout
   */
  readonly stream?: ColorsOptionOptions['stream']
}

type BasicStyle =
  | 'bold'
  | 'underline'
  | 'inverse'
  | 'reset'
  | 'dim'
  | 'italic'
  | 'hidden'
  | 'strikethrough'
  | 'visible'

type BasicColors =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'

type Style =
  | BasicStyle
  | BasicColors
  | `${BasicColors}Bright`
  | `hex-${string}`
  | `rgb-${number}-${number}-${number}`
  | `bg${Capitalize<BasicColors>}`
  | `bg${Capitalize<BasicColors>}Bright`
  | `bgHex-${string}`
  | `bgRgb-${number}-${number}-${number}`

/**
 * Space-separated list of styles. Some styles require dash-separated arguments.
 */
export type Styles = Style | `${Style} ${Style}`

/**
 * Add styles to terminal strings.
 *
 * @example
 * ```js
 * chalkString('red')('input') // Same as: chalk.red('input')
 * chalkString('red bold')('input') // Same as: chalk.red.bold('input')
 * chalkString('hex-ffffff')('input') // Same as: chalk.hex('ffffff')('input')
 * chalkString('rgb-10-20-30')('input') // Same as: chalk.rgb(10, 20, 30)('input')
 *
 * chalkString('invalidStyle')('input') // Invalid styles throw an error
 * ```
 */
export default function chalkString(
  styles: Styles,
  options?: Options,
): (input: string) => string
