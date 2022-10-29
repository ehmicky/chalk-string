[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/chalk-string.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/chalk-string)
[![TypeScript](https://img.shields.io/badge/-typed-brightgreen?logo=typescript&colorA=gray&logoColor=0096ff)](/types/main.d.ts)
[![Node](https://img.shields.io/node/v/chalk-string.svg?logo=node.js&logoColor=66cc33)](https://www.npmjs.com/package/chalk-string)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-brightgreen.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-brightgreen.svg?logo=medium)](https://medium.com/@ehmicky)

Chalk with style strings.

[Chalk](https://github.com/chalk/chalk) adds styles to terminal strings.
`chalk-string` is a thin wrapper around it which allows specifying those styles
as a string. This enables user-defined or dynamic styling.

# Example

```js
import chalkString from 'chalk-string'

const addStyles = chalkString()

addStyles('red', 'input') // Same as: chalk.red('input')
addStyles('red bold', 'input') // Same as: chalk.red.bold('input')
addStyles('hex-ffffff', 'input') // Same as: chalk.hex('ffffff')('input')
addStyles('rgb-10-20-30', 'input') // Same as: chalk.rgb(10, 20, 30)('input')

addStyles('invalidStyle', 'input') // Invalid styles throw an error
```

# Install

```bash
npm install chalk-string
```

This package is an ES module and must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## chalkString(options?)

`options` [`Options?`](#options)\
_Return value_: [`addStyles()`](#addstylesstyles-input)

### Options

#### colors

_Type_: `boolean`\
_Default_: `undefined`

Whether colors should be enabled/disabled, regardless of terminal support.
Colors support is automatically detected, so this is only meant to override that
default behavior.

#### stream

_Type_:
[`Stream`](https://nodejs.org/api/stream.html#stream_class_stream_writable)\
_Default_: [`process.stdout`](https://nodejs.org/api/process.html#process_process_stdout)

Stream used to detect colors support. This should be the file or terminal where
the colors are output.

### addStyles(styles, input)

`styles` [`stylesString`](#available-styles)\
`input` `string`\
_Return value_: `string`

Apply [styles](#available-styles) to `input` then return it.

# Available styles

```sh
# Standard styles
bold underline inverse reset

# Those styles do not always work on Windows
dim italic hidden strikethrough

# Hidden when the terminal does not support colors
visible

# Basic colors
black red green yellow blue magenta cyan white gray
blackBright redBright greenBright yellowBright blueBright
magentaBright cyanBright whiteBright

# Advanced colors
hex-ffffff
rgb-255-255-255

# Background colors
bgBlack bgRed bgGreen bgYellow bgBlue bgMagenta bgCyan bgWhite bgGray
bgBlackBright bgRedBright bgGreenBright bgYellowBright bgBlueBright
bgMagentaBright bgCyanBright bgWhiteBright
bgHex-* bgRgb-*
```

# Related projects

- [`colors-option`](https://github.com/ehmicky/colors-option): Let users toggle
  colors.
- [`terminal-theme`](https://github.com/ehmicky/terminal-theme): 🎨 Use a color
  theme for your code's terminal output

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/chalk-string/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/chalk-string/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
